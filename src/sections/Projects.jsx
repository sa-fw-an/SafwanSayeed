/* eslint-disable react/no-unknown-property */
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import { myProjects } from "../constants/project.js";
import CanvasLoader from "../components/Loading.jsx";
import DemoComputer from "../components/DemoComputer.jsx";

const Projects = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleNextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % myProjects.length);
  };

  const handlePrevProject = () => {
    setCurrentProjectIndex(
      (prev) => (prev - 1 + myProjects.length) % myProjects.length,
    );
  };

  const handleProjectIndicatorClick = (index) => {
    setCurrentProjectIndex(index);
  };

  const currentProject = myProjects[currentProjectIndex];

  useGSAP(() => {
    gsap.fromTo(
      ".project-content",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
    );
  }, [currentProjectIndex]);

  useGSAP(() => {
    gsap.fromTo(
      ".computer-canvas",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
    );
  }, [currentProjectIndex]);

  return (
    <section ref={sectionRef} className="c-space my-20" id="projects">
      {/* Header */}
      <div className="mb-12">
        <div className="text-left">
          <p
            className={`head-text text-white-600 transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            My Projects
          </p>
        </div>
      </div>

      {/* Main Project Display */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 mb-8">
        {/* Project Details */}
        <div className="project-content order-1 lg:order-1 flex flex-col justify-center">
          <div className="relative p-8 shadow-2xl shadow-black-200 text-white min-h-[400px] lg:min-h-[600px] bg-black-200 rounded-xl">
            <img
              src={currentProject.spotlight}
              alt="spotlight"
              className="absolute top-0 right-0 w-full h-96 object-cover rounded-xl"
            />

            <div className="z-10 relative">
              <div
                className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg mb-6"
                style={currentProject.logoStyle}
              >
                <img
                  className="w-10 h-10 shadow-sm"
                  src={currentProject.logo}
                  alt="logo"
                />
              </div>

              <div className="flex flex-col gap-5 text-white mb-8">
                <p className="text-white text-2xl md:text-3xl font-semibold">
                  {currentProject.title}
                </p>
                <p className="text-white text-base leading-relaxed">
                  {currentProject.desc}
                </p>
                <p className="text-white text-sm leading-relaxed opacity-90">
                  {currentProject.subdesc}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-8 overflow-x-auto">
                {currentProject.tags.slice(0, 8).map((tag) => (
                  <div
                    key={tag.name}
                    className="tech-logo flex justify-center items-center"
                    title={tag.name}
                  >
                    <img
                      src={tag.path}
                      alt={tag.name}
                      className="object-contain"
                    />
                  </div>
                ))}
                {currentProject.tags.length > 8 && (
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-black-300 text-white-600 text-xs">
                    +{currentProject.tags.length - 8}
                  </div>
                )}
              </div>

              <a
                className="flex items-center gap-2 cursor-pointer text-white hover:text-blue-400 transition-colors"
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
          </div>
        </div>

        {/* 3D Computer Model */}
        <div className="computer-canvas order-2 lg:order-2">
          <div className="border border-black-300 bg-black-200 rounded-xl h-[400px] md:h-[500px] lg:h-[600px]">
            <Canvas>
              <ambientLight intensity={1} />
              <directionalLight position={[10, 10, 5]} intensity={3} />
              <Center>
                <Suspense fallback={<CanvasLoader />}>
                  <group
                    scale={2}
                    position={[0, -3, 0]}
                    rotation={[0, -0.1, 0]}
                  >
                    <DemoComputer texture={currentProject.texture} />
                  </group>
                </Suspense>
              </Center>
              <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
            </Canvas>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-6">
          <button
            onClick={handlePrevProject}
            className="flex items-center gap-2 px-4 py-2 bg-black-200 hover:bg-black-100 border border-black-300 hover:border-white rounded-full transition-all duration-300 transform hover:scale-105"
            title="Previous Project"
          >
            <img
              src="./assets/left-arrow.png"
              alt="previous"
              className="w-4 h-4"
            />
            <span className="text-white text-sm font-medium">Previous</span>
          </button>

          <button
            onClick={handleNextProject}
            className="flex items-center gap-2 px-4 py-2 bg-black-200 hover:bg-black-100 border border-black-300 hover:border-white rounded-full transition-all duration-300 transform hover:scale-105"
            title="Next Project"
          >
            <span className="text-white text-sm font-medium">Next</span>
            <img
              src="./assets/right-arrow.png"
              alt="next"
              className="w-4 h-4"
            />
          </button>
        </div>

        {/* Project Indicators */}
        <div className="flex items-center gap-2 px-4 py-2 bg-black-200 rounded-full border border-black-300">
          {myProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => handleProjectIndicatorClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentProjectIndex
                  ? "bg-green-700 scale-125"
                  : "bg-white hover:bg-yellow-500 scale-100"
              }`}
              title={`Project ${index + 1}: ${myProjects[index].title}`}
            />
          ))}
        </div>

        {/* Project Counter */}
        <div className="text-white-600 text-sm font-medium">
          <span className="text-white">{currentProjectIndex + 1}</span> /{" "}
          {myProjects.length}
        </div>
      </div>
    </section>
  );
};

export default Projects;
