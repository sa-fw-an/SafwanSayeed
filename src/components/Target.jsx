/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect, memo } from "react";
import { Float, useGLTF } from "@react-three/drei";
import gsap from "gsap";

const MODEL_URL =
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf";
const FLOAT_INTENSITY = 1;
const BOB_DISTANCE = 0.5;
const BOB_DURATION = 1.5;

function Target({ rotation = [0, Math.PI / 5, 0], scale = 1.5, ...props }) {
  const groupRef = useRef();
  const { scene } = useGLTF(MODEL_URL);

  useEffect(() => {
    const mesh = groupRef.current;
    if (!mesh) return;

    const baseY = mesh.position.y;
    const tl = gsap.timeline({ repeat: -1, yoyo: true }).to(mesh.position, {
      y: baseY + BOB_DISTANCE,
      duration: BOB_DURATION,
      ease: "sine.inOut",
    });

    return () => tl.kill();
  }, []);

  return (
    <Float floatIntensity={FLOAT_INTENSITY}>
      <group
        ref={groupRef}
        rotation={rotation}
        scale={scale}
        dispose={null}
        {...props}
      >
        <primitive object={scene} />
      </group>
    </Float>
  );
}

useGLTF.preload(MODEL_URL);

export default memo(Target);
