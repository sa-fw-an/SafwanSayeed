/* eslint-disable react/no-unknown-property */
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const CAMERA_TARGET = [0, 0, 20];
const DAMP_FACTOR = 0.25;
const ROTATION_DIVISOR = { x: 5, y: 3 };

function HeroCamera({ isMobile = false, children }) {
  const containerRef = useRef();

  useFrame((state, delta) => {
    const { camera, pointer } = state;
    // Smoothly move the camera to its target position
    easing.damp3(camera.position, CAMERA_TARGET, DAMP_FACTOR, delta);

    // On desktop, add a subtle parallax rotation
    if (!isMobile && containerRef.current) {
      const targetRot = [
        -pointer.y / ROTATION_DIVISOR.y,
        pointer.x / ROTATION_DIVISOR.x,
        0,
      ];
      easing.dampE(
        containerRef.current.rotation,
        targetRot,
        DAMP_FACTOR,
        delta,
      );
    }
  });

  return (
    <group ref={containerRef} dispose={null}>
      {children}
    </group>
  );
}

HeroCamera.displayName = "HeroCamera";
export default React.memo(HeroCamera);
