/**
 * The room model, presented like Portfolio-v2: raw GLB at a fixed scale
 * under the tilted orthographic camera. Adds v2's showmanship:
 * staggered pop-in reveal, scroll-scrubbed zoom + turntable, and a
 * perpetual idle sway so the diorama never sits still.
 */
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { CodeScreen } from "./codeScreen";
import { factKeyFor, HOTSPOT_FACTS } from "./hotspots";
import { prefersReducedMotion } from "@/lib/device";

useGLTF.setDecoderPath("/draco/");

/** Same scale table as v2's SCENE_CONSTANTS.ROOM_SCALE. */
const ROOM_SCALE = { desktop: 0.11, mobile: 0.07 };
/** Half the camera's vertical world view (RoomScene's FRUSTUM / 2). */
const FRUSTUM_HALF = 2.5;
const isCompact = () => window.matchMedia("(max-width: 720px)").matches;

const PART_CANDIDATES: Record<string, string[]> = {
  cube: ["Cube", "cube"],
  aquarium: ["Aquarium", "aquarium", "FishTank", "fish_tank"],
  computer: ["Computer", "computer", "PC", "pc"],
  screen: ["Screen", "screen", "Monitor_Screen"],
  chair: ["Chair", "chair"],
  fish: ["Fish", "fish"],
  mailbox: ["Mailbox", "mailbox"],
  lamp: ["Lamp", "lamp"],
  flower1: ["Flower1", "flower1", "Flower_1"],
  flower2: ["Flower2", "flower2", "Flower_2"],
  clock: ["Clock", "clock"],
  shelves: ["Shelves", "shelves", "Shelf", "shelf"],
  floor_items: ["Floor_Items", "floor_items", "FloorItems"],
  desks: ["Desks", "desks", "Desk", "desk", "Table", "table"],
  table_stuff: ["Table_Stuff", "table_stuff", "TableStuff"],
  mini_floor: ["Mini_Floor", "mini_floor"],
  floor_first: ["FloorFirst", "floorfirst", "Floor_First", "floor_first"],
  floor_second: ["FloorSecond", "floorsecond", "Floor_Second", "floor_second"],
  floor_third: ["FloorThird", "floorthird", "Floor_Third", "floor_third"],
  dirt: ["Dirt", "dirt"],
  body: ["Body", "body", "Room", "room"],
};

/** Reveal order for the furniture cascade (the cube leads separately). */
const REVEAL_ORDER = [
  "body",
  "mini_floor",
  "floor_first",
  "floor_second",
  "floor_third",
  "dirt",
  "desks",
  "table_stuff",
  "computer",
  "screen",
  "chair",
  "shelves",
  "clock",
  "floor_items",
  "aquarium",
  "fish",
  "mailbox",
  "lamp",
  "flower1",
  "flower2",
];

const POP_STAGGER = 0.11;
const POP_DURATION = 0.65;
/** The cube gets the stage to itself before the room cascades in. */
const CUBE_LEAD = 0.85;
/** Back-out overshoot — the v2 "boing". */
const popEase = (x: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2;
};

type Pop = {
  obj: THREE.Object3D;
  at: number;
  dur: number;
  base: THREE.Vector3;
  /** When set, the part spins in as it scales: base rotation + turns. */
  spin: { base: number; turns: number } | null;
};

/** Authored scales, captured once — StrictMode/HMR re-runs must never
 * re-clone a hidden part's 0.0001 scale as the original. */
const authoredScales = new WeakMap<THREE.Object3D, THREE.Vector3>();

type Props = {
  shadows: boolean;
  fancyGlass: boolean;
  onHotspot?: (fact: string, clientX: number, clientY: number) => void;
};

export default function RoomModel({ shadows, fancyGlass, onHotspot }: Props) {
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const screen = useRef<CodeScreen | null>(null);
  const hotspots = useRef<THREE.Object3D[]>([]);
  const rot = useRef({ current: 0, target: 0 });
  const lastMouse = useRef(0);
  const groupRef = useRef<THREE.Group>(null);
  const pops = useRef<Pop[]>([]);
  const popClock = useRef(0);
  /** Full-size bounds captured before the reveal hides anything — the
   * auto-fit must never measure the half-revealed room. */
  const localBox = useRef<THREE.Box3 | null>(null);
  const mouseRot = useRef(0);
  const chair = useRef<{
    obj: THREE.Object3D;
    base: number;
    popEnd: number;
  } | null>(null);
  /** Camera zoom / group y measured by the auto-fit — motion layers on top. */
  const baseZoom = useRef(1.25);
  const baseY = useRef(0.7);
  const gltf = useGLTF("/models/room.glb", true);
  const { gl, camera, size } = useThree();
  const [scale, setScale] = useState(() =>
    isCompact() ? ROOM_SCALE.mobile : ROOM_SCALE.desktop,
  );

  // Track compact-mode flips (resize / orientation) like v2's Room.jsx.
  useEffect(() => {
    const onResize = () =>
      setScale(isCompact() ? ROOM_SCALE.mobile : ROOM_SCALE.desktop);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const scene = gltf.scene;
    scene.position.set(0, 0, 0);
    scene.rotation.set(0, 0, 0);

    if (shadows) {
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });
    }

    // Clear aquarium glass — v2's recipe, gated by device tier.
    const lcName = (s: string | undefined) => s?.toLowerCase() ?? "";
    const found: Record<string, THREE.Object3D> = {};
    scene.traverse((child) => {
      for (const [key, candidates] of Object.entries(PART_CANDIDATES)) {
        if (
          !found[key] &&
          candidates.some((n) => lcName(n) === lcName(child.name))
        ) {
          found[key] = child;
        }
      }
    });

    if (found.aquarium) {
      const target =
        (found.aquarium.children[0] as THREE.Mesh) ?? found.aquarium;
      if ((target as THREE.Mesh).material) {
        (target as THREE.Mesh).material = new THREE.MeshPhysicalMaterial({
          color: 0x549dd2,
          roughness: 0,
          ior: 3,
          transparent: true,
          depthWrite: false,
          depthTest: false,
          ...(fancyGlass ? { transmission: 1, opacity: 1 } : { opacity: 0.35 }),
        });
      }
    }

    // Live-typed code screen instead of the 15 MB video texture.
    const screenTarget =
      found.screen ??
      (found.computer?.children.find((c) =>
        lcName(c.name).includes("screen"),
      ) as THREE.Mesh) ??
      null;
    if (screenTarget && (screenTarget as THREE.Mesh).material) {
      screen.current = new CodeScreen();
      (screenTarget as THREE.Mesh).material = new THREE.MeshBasicMaterial({
        map: screen.current.texture,
      });
    }

    if (gltf.animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(gltf.animations[0]);
      action.timeScale = 0.9;
      action.play();
    }

    // Capture full-size bounds BEFORE the reveal hides anything. setFromObject
    // measures in world space (group scale already baked in), so convert back
    // to group-local space — the fit re-applies group.matrixWorld later.
    scene.updateMatrixWorld(true);
    localBox.current = new THREE.Box3()
      .setFromObject(scene)
      .applyMatrix4(groupRef.current!.matrixWorld.clone().invert());

    // Pop-in reveal: the cube takes the stage first (spinning in), then the
    // room cascades in — v2's entrance. Authored scales are captured the
    // first time a part is seen (WeakMap) — re-running this effect under
    // StrictMode/HMR must never re-clone an already-hidden 0.0001 scale as
    // the "original", or the room stays microscopic forever.
    if (!prefersReducedMotion()) {
      const rest = REVEAL_ORDER.map((key) => found[key]).filter(Boolean);
      const popOf = (obj: THREE.Object3D): Pop => {
        if (!authoredScales.has(obj))
          authoredScales.set(obj, obj.scale.clone());
        return {
          obj,
          at: 0,
          dur: POP_DURATION,
          spin: null,
          base: authoredScales.get(obj)!,
        };
      };
      // The cube takes the stage first with a slow spin-in; the desk chair
      // does a full 360° as it lands; everything else cascades.
      const chairPop = found.chair ? popOf(found.chair) : null;
      pops.current = [
        ...(found.cube
          ? [
              {
                ...popOf(found.cube),
                at: 0,
                dur: 1.4,
                spin: { base: found.cube.rotation.y, turns: 1.5 },
              },
            ]
          : []),
        ...rest.map((obj, i) => {
          if (found.chair && obj === found.chair && chairPop) {
            return {
              ...chairPop,
              at: CUBE_LEAD + i * POP_STAGGER,
              dur: 1.2,
              spin: { base: found.chair.rotation.y, turns: 1 },
            };
          }
          return { ...popOf(obj), at: CUBE_LEAD + i * POP_STAGGER };
        }),
      ];
      for (const p of pops.current)
        p.obj.scale.copy(p.base).multiplyScalar(0.0001);
      popClock.current = 0;
      if (chairPop) {
        const chairEntry = pops.current.find((p) => p.obj === found.chair);
        if (chairEntry) {
          chair.current = {
            obj: found.chair,
            base: found.chair.rotation.y,
            popEnd: chairEntry.at + chairEntry.dur,
          };
        }
      } else {
        chair.current = null;
      }
    }

    // Hotspot picking via manual raycast against known fun parts.
    const hotspotKeys = new Set(Object.keys(HOTSPOT_FACTS));
    hotspots.current = Object.entries(found)
      .filter(([key]) => hotspotKeys.has(key))
      .map(([, obj]) => obj);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onPointerDown = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      pointer.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(hotspots.current, true);
      const key = hits.length > 0 ? factKeyFor(hits[0].object) : null;
      if (key) onHotspot?.(HOTSPOT_FACTS[key], e.clientX, e.clientY);
    };
    gl.domElement.addEventListener("pointerdown", onPointerDown);

    const onMouseMove = (event: MouseEvent) => {
      lastMouse.current = performance.now();
      mouseRot.current =
        (((event.clientX - window.innerWidth / 2) * 2) / window.innerWidth) *
        0.05;
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      gl.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("mousemove", onMouseMove);
      mixer.current?.stopAllAction();
      mixer.current = null;
      screen.current = null;
      pops.current = [];
      chair.current = null;
    };
  }, [gltf, shadows, fancyGlass, gl, camera, onHotspot]);

  // Auto-fit: project the room's full-size bounds (captured at setup, so the
  // reveal never skews it) and set the ortho zoom + vertical offset so the
  // diorama is centred with breathing room on any canvas shape.
  useEffect(() => {
    const group = groupRef.current;
    const box = localBox.current;
    if (!group || group.scale.x === 0 || !box || box.isEmpty()) return;
    group.updateMatrixWorld(true);
    camera.updateMatrixWorld();

    const cornerLocal = new THREE.Vector3();
    const corner = new THREE.Vector3();
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    for (let i = 0; i < 8; i++) {
      cornerLocal.set(
        i & 1 ? box.max.x : box.min.x,
        i & 2 ? box.max.y : box.min.y,
        i & 4 ? box.max.z : box.min.z,
      );
      corner.copy(cornerLocal).applyMatrix4(group.matrixWorld).project(camera);
      minX = Math.min(minX, corner.x);
      maxX = Math.max(maxX, corner.x);
      minY = Math.min(minY, corner.y);
      maxY = Math.max(maxY, corner.y);
    }
    const ndcW = maxX - minX;
    const ndcH = maxY - minY;
    if (ndcW <= 0 || ndcH <= 0) return;

    const z0 = camera.zoom;
    const fitZoom = THREE.MathUtils.clamp(
      Math.min((2 * 0.86 * z0) / ndcW, (2 * 0.8 * z0) / ndcH),
      0.85,
      2.4,
    );
    camera.zoom = fitZoom;
    camera.updateProjectionMatrix();
    baseZoom.current = fitZoom;

    // Re-project at the fitted zoom and lift the group so the room's centre
    // sits at the canvas centre.
    camera.updateMatrixWorld();
    const centre = box
      .getCenter(new THREE.Vector3())
      .applyMatrix4(group.matrixWorld)
      .project(camera);
    baseY.current = 0.7 - (centre.y * FRUSTUM_HALF) / fitZoom;
    group.position.y = baseY.current;
  }, [gltf, camera, size, scale]);

  useFrame((state, delta) => {
    // Pop-in choreography on the frame clock (pauses with the tab).
    if (pops.current.length > 0) {
      popClock.current += delta;
      pops.current = pops.current.filter((p) => {
        const t = (popClock.current - p.at) / p.dur;
        if (t <= 0) return true;
        const e = popEase(Math.min(t, 1));
        p.obj.scale.copy(p.base).multiplyScalar(e);
        if (p.spin)
          p.obj.rotation.y = p.spin.base + (1 - e) * Math.PI * 2 * p.spin.turns;
        return t < 1;
      });
    }

    // Motion blend: mouse parallax when engaged; a bounded v2-style sway
    // when idle (never a free spin — the room must always face the camera).
    // Scroll deliberately does NOT move the room — it read as jitter.
    const idle = performance.now() - lastMouse.current > 4000;
    const idleSway = Math.sin(state.clock.elapsedTime * 0.35) * 0.06;
    const target = idle ? idleSway : mouseRot.current;
    rot.current.current = THREE.MathUtils.lerp(
      rot.current.current,
      target,
      0.08,
    );
    state.scene.rotation.y = rot.current.current;

    // Perpetual bob — the diorama breathes.
    const group = groupRef.current;
    if (group)
      group.position.y =
        baseY.current + Math.sin(state.clock.elapsedTime * 0.8) * 0.025;

    // Desk chair — 360° spin-in during its pop, then a gentle swivel that
    // ramps in smoothly so the handoff never snaps.
    if (chair.current) {
      const settled = THREE.MathUtils.clamp(
        (popClock.current - chair.current.popEnd) / 1.5,
        0,
        1,
      );
      chair.current.obj.rotation.y =
        chair.current.base +
        Math.sin(state.clock.elapsedTime * 0.5) * 0.35 * settled;
    }

    mixer.current?.update(delta * 0.9);
    screen.current?.update(delta);
  });

  return (
    <group ref={groupRef} position={[0, 0.7, 0]} scale={scale}>
      <primitive object={gltf.scene} />
    </group>
  );
}
