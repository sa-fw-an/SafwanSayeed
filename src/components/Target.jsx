/* eslint-disable react/no-unknown-property */
import { Float, useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const Target = ({ rotation = [0, Math.PI / 5, 0], scale = 1.5, ...props }) => {
  const targetRef = useRef();
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf",
  );

  useEffect(() => {
    if (!targetRef.current) return;

    const animation = gsap.to(targetRef.current.position, {
      y: targetRef.current.position.y + 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
    });

    return () => animation.kill();
  }, []);

  return (
    <Float floatIntensity={1}>
      <mesh {...props} ref={targetRef} rotation={rotation} scale={scale}>
        <primitive object={scene} />
      </mesh>
    </Float>
  );
};

export default Target;
