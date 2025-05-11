/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations, useVideoTexture } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MODEL_PATH = "./models/computer.glb";
const DEFAULT_VIDEO = "./textures/project/project1.mp4";

const SCREEN_SETTINGS = {
  count: 143,
  position: [5.658, 1.643, 0.812],
  rotation: [Math.PI / 2, 0, 0],
  scale: [0.923, 0.855, 0.855],
};

const TOWER_LIGHTS = [
  {
    name: "Tower-light-007",
    position: [16.089, -3.47, -14.495],
    rotation: [Math.PI / 2, 0, 0],
    scale: 0.963,
  },
  {
    name: "Tower-light-008",
    position: [15.155, -3.47, -14.495],
    rotation: [Math.PI / 2, 0, 0],
    scale: 0.963,
  },
];

function DemoComputer(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(MODEL_PATH);
  useAnimations(animations, group);
  const videoTex = useVideoTexture(props.texture || DEFAULT_VIDEO);

  useEffect(() => {
    if (videoTex) videoTex.flipY = false;
  }, [videoTex]);

  useGSAP(() => {
    const tween = gsap.from(group.current.rotation, {
      y: Math.PI / 2,
      duration: 1,
      ease: "power3.out",
    });
    return () => tween.kill();
  }, [videoTex]);

  const screenGroups = useMemo(
    () =>
      Array.from({ length: SCREEN_SETTINGS.count }, (_, i) => {
        const name = `Screen${String(i + 1).padStart(3, "0")}`;
        return (
          <group
            key={name}
            name={name}
            position={SCREEN_SETTINGS.position}
            rotation={SCREEN_SETTINGS.rotation}
            scale={SCREEN_SETTINGS.scale}
          />
        );
      }),
    [],
  );

  return (
    <group ref={group} dispose={null} {...props}>
      <group name="Scene">
        <mesh
          name="monitor-screen"
          geometry={nodes["monitor-screen"].geometry}
          material={nodes["monitor-screen"].material}
          position={[0.127, 1.831, 0.511]}
          rotation={[1.571, -0.005, 0.031]}
          scale={[0.661, 0.608, 0.401]}
        >
          <meshBasicMaterial map={videoTex} toneMapped={false} />
        </mesh>

        <group
          name="RootNode"
          position={[0, 1.093, 0]}
          rotation={[-Math.PI / 2, 0, -0.033]}
          scale={0.045}
        >
          {screenGroups}

          {TOWER_LIGHTS.map(({ name, position, rotation, scale }) => (
            <group
              key={name}
              name={name}
              position={position}
              rotation={rotation}
              scale={scale}
            />
          ))}
        </group>

        <group
          name="Monitor-B-_computer_0"
          position={[0.266, 1.132, 0.051]}
          rotation={[0, -0.033, 0]}
          scale={[0.042, 0.045, 0.045]}
        >
          {[
            ["Monitor-B-_computer_0_1", "computer"],
            ["Monitor-B-_computer_0_2", "base__0"],
            ["Monitor-B-_computer_0_3", "Material_36"],
            ["Monitor-B-_computer_0_4", "Material_35"],
            ["Monitor-B-_computer_0_5", "Material_34"],
            ["Monitor-B-_computer_0_6", "keys"],
            ["Monitor-B-_computer_0_7", "keys2"],
            ["Monitor-B-_computer_0_8", "Material_37"],
          ].map(([meshName, matKey]) => (
            <mesh
              key={meshName}
              name={meshName}
              geometry={nodes[meshName].geometry}
              material={materials[matKey]}
            />
          ))}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

export default React.memo(DemoComputer);
