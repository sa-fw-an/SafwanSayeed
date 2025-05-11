/* eslint-disable react/no-unknown-property */
import React, { memo } from "react";
import { Float, useGLTF } from "@react-three/drei";

const MODEL_PATH = "./models/react.glb";
const GROUP_POSITION = [8, 8, 0];
const GROUP_SCALE = [0.3, 0.3, 0.3];
const MESH_TRANSFORM = {
  position: [-8, 0.079, 0.181],
  rotation: [0, 0, -Math.PI / 2],
  scale: [0.392, 0.392, 0.527],
};

function ReactLogo(props) {
  const { nodes, materials } = useGLTF(MODEL_PATH);

  return (
    <Float floatIntensity={1}>
      <group
        position={GROUP_POSITION}
        scale={GROUP_SCALE}
        dispose={null}
        {...props}
      >
        <mesh
          geometry={nodes["React-Logo_Material002_0"].geometry}
          material={materials["Material.002"]}
          position={MESH_TRANSFORM.position}
          rotation={MESH_TRANSFORM.rotation}
          scale={MESH_TRANSFORM.scale}
        />
      </group>
    </Float>
  );
}

useGLTF.preload(MODEL_PATH);

export default memo(ReactLogo);
