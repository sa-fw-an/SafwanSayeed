/* eslint-disable react/no-unknown-property */
import { Float, useTexture } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Rings = ({ position = [0, 0, 0] }) => {
  const refList = useRef([]);
  const texture = useTexture("./textures/rings.png");

  useEffect(() => {
    if (refList.current.length === 0) return;

    refList.current.forEach((ring) => {
      ring.position.set(...position);
    });

    const animation = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    animation.to(
      refList.current.map((ring) => ring.rotation),
      {
        y: `+=${Math.PI * 2}`,
        x: `-=${Math.PI * 2}`,
        duration: 2.5,
        stagger: 0.15,
      },
    );

    return () => animation.kill();
  }, [position]);

  return (
    <Float floatIntensity={1}>
      <group scale={0.5} position={position}>
        {[...Array(4)].map((_, index) => (
          <mesh
            key={index}
            ref={(mesh) => {
              if (mesh && !refList.current.includes(mesh)) {
                refList.current.push(mesh);
              }
            }}
          >
            <torusGeometry args={[(index + 1) * 0.5, 0.1]} />
            <meshMatcapMaterial matcap={texture} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

export default Rings;
