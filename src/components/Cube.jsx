/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect, useMemo } from "react";
import { Float, useGLTF, useTexture } from "@react-three/drei";
import gsap from "gsap";

const CUBE_MODEL = "./models/cube.glb";
const CUBE_TEXTURE = "./textures/cube.png";

function Cube({
  position = [9, -4, 0],
  rotation = [2.6, 0.8, -1.8],
  scale = 0.74,
  ...props
}) {
  const { nodes } = useGLTF(CUBE_MODEL);
  const matcapTexture = useTexture(CUBE_TEXTURE);

  const meshRef = useRef();
  const originalRot = useRef({ x: rotation[0], y: rotation[1] });

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const tl = gsap
      .timeline({ repeat: -1, repeatDelay: 0.5 })
      .to(mesh.rotation, {
        y: "+=" + Math.PI * 2,
        x: "-=" + Math.PI * 2,
        duration: 2.5,
        ease: "none",
      });

    return () => {
      tl.kill();
    };
  }, []);

  const handlePointerOver = () => {
    const mesh = meshRef.current;
    if (!mesh) return;
    gsap.to(mesh.rotation, {
      x: "+=2",
      y: "+=2",
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const handlePointerOut = () => {
    const mesh = meshRef.current;
    if (!mesh) return;
    gsap.to(mesh.rotation, {
      x: originalRot.current.x,
      y: originalRot.current.y,
      duration: 1.5,
      ease: "power2.out",
    });
  };

  return (
    <Float floatIntensity={2}>
      <group
        dispose={null}
        position={position}
        rotation={rotation}
        scale={scale}
        {...props}
      >
        <mesh
          ref={meshRef}
          geometry={nodes.Cube.geometry}
          castShadow
          receiveShadow
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <meshMatcapMaterial matcap={matcapTexture} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

Cube.displayName = "Cube";

useGLTF.preload(CUBE_MODEL);

export default React.memo(Cube);
