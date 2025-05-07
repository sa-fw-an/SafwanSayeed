/* eslint-disable react/no-unknown-property */
import { Float, useGLTF } from "@react-three/drei";
import { useMemo } from "react";

const ReactLogo = (props) => {
  const { nodes, materials } = useGLTF("./models/react.glb");

  const position = useMemo(() => [0, 0.079, 0.181], []);
  const rotation = useMemo(() => [0, 0, -Math.PI / 2], []);
  const scale = useMemo(() => [0.392, 0.392, 0.527], []);

  return (
    <Float floatIntensity={1}>
      <group position={[8, 8, 0]} scale={0.3} {...props} dispose={null}>
        <mesh
          geometry={nodes["React-Logo_Material002_0"].geometry}
          material={materials["Material.002"]}
          position={position}
          rotation={rotation}
          scale={scale}
        />
      </group>
    </Float>
  );
};

useGLTF.preload("./models/react.glb");

export default ReactLogo;
