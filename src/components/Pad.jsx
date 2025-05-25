/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Pad(props) {
  const group = useRef();
  const { scene } = useGLTF("/models/pad.glb");

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/pad.glb");
