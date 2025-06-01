import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import { myProjects } from "../constants/project.js";
import CanvasLoader from "../components/Loading.jsx";
import DemoComputer from "../components/DemoComputer.jsx";

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) =>
      direction === "previous"
        ? (prevIndex - 1 + myProjects.length) % myProjects.length
        : (prevIndex + 1) % myProjects.length,
    );
  };

  useGSAP(() => {
    gsap.fromTo(
      ".animatedText",
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.2, ease: "power2.inOut" },
    );
  }, [selectedProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <section className="c-space my-20" id="projects">
      <p className="head-text">My Projects</p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 text-[#BEC1CF] min-h-[650px]">
          <img
            src={currentProject.spotlight}
            alt="spotlight"
            className="absolute top-0 right-0 w-full h-96 object-cover rounded-xl"
          />

          <div className="z-10 relative">
            <div
              className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
              style={currentProject.logoStyle}
            >
              <img
                className="w-10 h-10 shadow-sm"
                src={currentProject.logo}
                alt="logo"
              />
            </div>

            <div className="flex flex-col gap-5 text-white-600 my-5">
              <p className="text-white text-2xl font-semibold animatedText">
                {currentProject.title}
              </p>
              <p className="animatedText">{currentProject.desc}</p>
              <p className="animatedText">{currentProject.subdesc}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 overflow-x-auto">
              {currentProject.tags.map((tag) => (
                <div
                  key={tag.name}
                  className="tech-logo flex justify-center items-center"
                >
                  <img
                    src={tag.path}
                    alt={tag.name}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            <a
              className="flex items-center gap-2 cursor-pointer text-white-600 mt-5 text-white"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
            >
              <p>Check Out</p>
              <img
                src="./assets/arrow-up.png"
                alt="arrow"
                className="w-3 h-3"
              />
            </a>
          </div>

          <div className="mt-auto pt-8 w-full">
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center">
                <p className="text-white mb-2">Previous</p>
                <button
                  className="arrow-btn flex items-center justify-center"
                  onClick={() => handleNavigation("previous")}
                >
                  <img src="./assets/left-arrow.png" alt="previous project" />
                </button>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-white mb-2">Next</p>
                <button
                  className="arrow-btn flex items-center justify-center"
                  onClick={() => handleNavigation("next")}
                >
                  <img
                    src="./assets/right-arrow.png"
                    alt="next project"
                    className="w-4 h-4"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
          <Canvas>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={3} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer texture={currentProject.texture} />
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Projects;
