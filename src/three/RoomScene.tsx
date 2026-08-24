/**
 * Studio room scene — v2's proven presentation, ported wholesale:
 * orthographic isometric camera, v2's light rig (theme-reactive), and the
 * known-good render pipeline: continuous frameloop with visibility-driven
 * pausing via the `active` prop.
 */
import { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  ACESFilmicToneMapping,
  SRGBColorSpace,
  type OrthographicCamera,
} from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import RoomModel from "./RoomModel";
import type { Tier } from "@/lib/device";
import { dprFor } from "@/lib/device";
import { currentTheme, type ThemeName } from "@/lib/theme";

// Rect-area lights render black without their uniforms table initialised.
RectAreaLightUniformsLib.init();

/** Vertical world-units visible at zoom 1 — same as v2's CAMERA_CONSTANTS.FRUSTUM. */
const FRUSTUM = 5;
/** Slight punch-in over v2's zoom 1 so the diorama fills the wide stage card. */
const ZOOM = 1.25;
/** Same pose as v2's DEFAULT_POSITION / DEFAULT_ROTATION_X. */
const CAM_POS: [number, number, number] = [0, 6.5, 10];
const CAM_TILT_X = -Math.PI / 6;

/**
 * R3F rewrites ortho frustums to ±size/2 pixels on every resize unless the
 * camera is manual — so we own the projection entirely and mirror v2's
 * setupOrthographicCamera: aspect-wide frustum, fixed pose.
 */
function OrthoRoomCamera() {
  const camera = useThree((s) => s.camera) as OrthographicCamera;
  const size = useThree((s) => s.size);

  useEffect(() => {
    const aspect = size.width / size.height;
    camera.left = (-aspect * FRUSTUM) / 2;
    camera.right = (aspect * FRUSTUM) / 2;
    camera.top = FRUSTUM / 2;
    camera.bottom = -FRUSTUM / 2;
    camera.position.set(...CAM_POS);
    camera.rotation.set(CAM_TILT_X, 0, 0);
    camera.zoom = ZOOM;
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

/**
 * v2's Lights.jsx, made theme-aware for our three themes: midnight gets the
 * dim lavender-tinted mood, paper/matcha the bright daylight rig.
 */
function RoomLights() {
  const [theme, setTheme] = useState<ThemeName>(currentTheme());

  useEffect(() => {
    const onChange = (e: Event) =>
      setTheme((e as CustomEvent<ThemeName>).detail);
    window.addEventListener("themechange", onChange);
    return () => window.removeEventListener("themechange", onChange);
  }, []);

  const dark = theme === "midnight";
  const color = dark ? "#ebdaef" : "#ffffff";

  return (
    <>
      <ambientLight color={color} intensity={dark ? 0.5 : 1} />
      <directionalLight
        color={color}
        position={[-4, 9, 5]}
        intensity={dark ? 0.5 : 3}
        castShadow
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-normalBias={0.05}
      />
      <spotLight position={[9, -1, -5]} angle={12} penumbra={5} intensity={1} />
      <rectAreaLight
        color="#ffffff"
        intensity={1}
        width={0.5}
        height={0.7}
        position={[8, 3, 1]}
      />
    </>
  );
}

export default function RoomScene({
  active,
  tier,
  onHotspot,
}: {
  active: boolean;
  tier: Tier;
  onHotspot?: (fact: string, clientX: number, clientY: number) => void;
}) {
  const shadows = tier === "high";

  return (
    <Canvas
      orthographic
      frameloop={active ? "always" : "never"}
      dpr={dprFor(tier)}
      shadows={shadows}
      /* manual: we drive left/right/top/bottom + pose in <OrthoRoomCamera /> */
      camera={{
        zoom: ZOOM,
        position: CAM_POS,
        near: -50,
        far: 50,
        manual: true,
      }}
      gl={{
        antialias: tier !== "low",
        alpha: true,
        powerPreference: tier === "high" ? "high-performance" : "low-power",
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 0.95,
        outputColorSpace: SRGBColorSpace,
      }}
      style={{ touchAction: "pan-y" }}
    >
      <OrthoRoomCamera />
      <RoomLights />
      <Suspense fallback={null}>
        <RoomModel
          shadows={shadows}
          fancyGlass={tier === "high"}
          onHotspot={onHotspot}
        />
      </Suspense>
    </Canvas>
  );
}
