/* eslint-disable react/no-unknown-property */
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { PerspectiveCamera } from "@react-three/drei";
import Cube from "../components/Cube.jsx";
import Rings from "../components/Rings.jsx";
import ReactLogo from "../components/ReactLogo.jsx";
import Button from "../components/Button.jsx";
import Target from "../components/Target.jsx";
import CanvasLoader from "../components/Loading.jsx";
import HeroCamera from "../components/HeroCamera.jsx";
import { calculateSizes } from "../constants/index.js";
import { Pad } from "../components/Pad.jsx";

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section
      className="min-h-screen w-full flex flex-col relative overflow-hidden"
      id="home"
      aria-label="Hero section"
    >
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3 text-center">
        <p
          className="sm:text-3xl text-xl font-medium text-white font-generalsans"
          aria-label="Introduction"
        >
          Hi, I am Safwan Sayeed <span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient" aria-label="Tagline">
          Building dreams with code.
        </p>
      </div>

      <div className="w-full h-full absolute inset-0">
        <Canvas shadows className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 40]} />

            <HeroCamera isMobile={isMobile}>
              <Pad
                scale={sizes.deskScale}
                position={sizes.deskPosition}
                rotation={[0.3, 0, 0]}
              />
            </HeroCamera>

            <group>
              <Target position={sizes.targetPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
              <Rings position={sizes.ringPosition} />
              <Cube position={sizes.cubePosition} />
            </group>

            <ambientLight intensity={2} />
            <directionalLight position={[10, 10, 10]} intensity={2} />
            <pointLight position={[0, 8, 15]} intensity={1} color="#ffffff" />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <a
          href="#about"
          className="w-fit"
          aria-label="Navigate to about section"
        >
          <Button
            name="Let's work together"
            isBeam
            containerClass="sm:w-fit w-full sm:min-w-96"
          />
        </a>
      </div>
    </section>
  );
};

export default Hero;
