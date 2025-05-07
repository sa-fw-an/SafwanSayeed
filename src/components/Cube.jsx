/* eslint-disable react/no-unknown-property */
import { useRef, useEffect } from "react";
import { Float, useGLTF, useTexture } from "@react-three/drei";
import gsap from "gsap";

const Cube = ({
  position = [9, -4, 0],
  rotation = [2.6, 0.8, -1.8],
  scale = 0.74,
  ...props
}) => {
  const { nodes } = useGLTF("./models/cube.glb");
  const texture = useTexture("./textures/cube.png");
  const cubeRef = useRef();

  useEffect(() => {
    if (!cubeRef.current) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    tl.to(cubeRef.current.rotation, {
      y: `+=${Math.PI * 2}`,
      x: `-=${Math.PI * 2}`,
      duration: 2.5,
    });

    return () => tl.kill();
  }, []);

  const handlePointerOver = () => {
    if (cubeRef.current) {
      gsap.to(cubeRef.current.rotation, { x: "+=2", y: "+=2", duration: 0.8 });
    }
  };

  const handlePointerOut = () => {
    if (cubeRef.current) {
      gsap.to(cubeRef.current.rotation, {
        x: `-=${Math.PI * 2}`,
        y: `+=${Math.PI * 2}`,
        duration: 2.5,
      });
    }
  };

  return (
    <Float floatIntensity={2}>
      <group
        position={position}
        rotation={rotation}
        scale={scale}
        dispose={null}
        {...props}
      >
        <mesh
          ref={cubeRef}
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <meshMatcapMaterial matcap={texture} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
};

useGLTF.preload("./models/cube.glb");

export default Cube;
