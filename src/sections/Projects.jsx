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
  const [expandedProject, setExpandedProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef();
  const modalRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && expandedProject !== null) {
        setExpandedProject(null);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [expandedProject]);

  const handleModalBackdropClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setExpandedProject(null);
    }
  };

  const handleProjectClick = (index) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const handleShowMore = () => {
    setShowAllProjects(true);
  };

  const handleShowLess = () => {
    setShowAllProjects(false);
  };

  const isCardActive = (index) => hoveredCard === index;

  useEffect(() => {
    if (expandedProject !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [expandedProject]);

  useGSAP(() => {
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
    );
  }, [showAllProjects]);

  useGSAP(() => {
    if (expandedProject !== null) {
      gsap.fromTo(
        ".expanded-content",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
      );
    }
  }, [expandedProject]);

  const projectsToShow = showAllProjects ? myProjects : myProjects.slice(0, 6);
  const hasMoreProjects = myProjects.length > 6;

  return (
    <section ref={sectionRef} className="c-space my-20" id="projects">
      <div className="text-center mb-12">
        <div className="w-full text-white-600">
          <p
            className={`head-text transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            My Projects
          </p>
        </div>
      </div>

      {/* Expanded Project View */}
      {expandedProject !== null && (
        <div
          className="fixed inset-0 bg-black/0 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleModalBackdropClick}
        >
          <div
            ref={modalRef}
            className="expanded-content bg-black/90 rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto border border-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Close Button */}
              <button
                onClick={() => setExpandedProject(null)}
                className="float-right text-white hover:text-white-600 text-2xl mb-4 p-2 hover:bg-black-300 rounded-full transition-colors"
                title="Close (ESC)"
              >
                ✕
              </button>

              <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 clear-both">
                {/* Project Details */}
                <div className="flex flex-col relative p-8 shadow-2xl shadow-black-200 text-white min-h-[650px] bg-black-200 rounded-xl">
                  <img
                    src={myProjects[expandedProject].spotlight}
                    alt="spotlight"
                    className="absolute top-0 right-0 w-full h-96 object-cover rounded-xl"
                  />

                  <div className="z-10 relative">
                    <div
                      className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
                      style={myProjects[expandedProject].logoStyle}
                    >
                      <img
                        className="w-10 h-10 shadow-sm"
                        src={myProjects[expandedProject].logo}
                        alt="logo"
                      />
                    </div>

                    <div className="flex flex-col gap-5 text-white my-5">
                      <p className="text-white text-2xl font-semibold">
                        {myProjects[expandedProject].title}
                      </p>
                      <p className="text-white">
                        {myProjects[expandedProject].desc}
                      </p>
                      <p className="text-white">
                        {myProjects[expandedProject].subdesc}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 overflow-x-auto">
                      {myProjects[expandedProject].tags.map((tag) => (
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
                      className="flex items-center gap-2 cursor-pointer text-white mt-5 hover:text-blue-400 transition-colors"
                      href={myProjects[expandedProject].href}
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

                {/* 3D Computer */}
                <div className="border border-black-300 bg-black-200 rounded-xl h-96 md:h-full">
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
                          <DemoComputer
                            texture={myProjects[expandedProject].texture}
                          />
                        </group>
                      </Suspense>
                    </Center>
                    <OrbitControls
                      maxPolarAngle={Math.PI / 2}
                      enableZoom={false}
                    />
                  </Canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 px-4">
        {projectsToShow.map((project, index) => (
          <div
            key={index}
            className={`project-card group cursor-pointer transform transition-all duration-500 ease-out ${
              isCardActive(index)
                ? "scale-105 z-20"
                : "scale-100 hover:scale-102"
            }`}
            style={{
              transformOrigin: "center center",
            }}
            onClick={() => handleProjectClick(index)}
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={handleCardLeave}
          >
            {/* Glow effect overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-600/5 transition-opacity duration-500 rounded-xl ${
                isCardActive(index)
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            />

            <div
              className={`relative bg-black-200 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 border ${
                isCardActive(index)
                  ? "shadow-blue-500/20 border-blue-400/40"
                  : "shadow-black-300 hover:shadow-black-100 border-blue-900 hover:border-white"
              }`}
            >
              {/* Project Content */}
              <div className="p-6 min-h-[200px] flex flex-col relative z-10">
                {/* Logo and Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg relative transition-all duration-500 transform ${
                      isCardActive(index)
                        ? "scale-110"
                        : "scale-100 group-hover:scale-105"
                    }`}
                    style={project.logoStyle}
                  >
                    {/* Glow effect for logo */}
                    <div
                      className={`absolute -inset-1 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-400/20 blur-md transition-opacity duration-500 ${
                        isCardActive(index)
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-60"
                      }`}
                    />
                    <img
                      className="w-8 h-8 shadow-sm relative z-10"
                      src={project.logo}
                      alt="logo"
                    />
                  </div>
                  <h3
                    className={`text-xl font-semibold transition-all duration-300 ${
                      isCardActive(index)
                        ? "text-blue-400"
                        : "text-white group-hover:text-blue-400"
                    }`}
                  >
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p
                  className={`text-sm mb-6 line-clamp-3 flex-grow transition-all duration-500 ${
                    isCardActive(index)
                      ? "text-white"
                      : "text-white group-hover:text-white"
                  }`}
                >
                  {project.desc}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.tags.slice(0, 4).map((tag, tagIndex) => (
                    <div
                      key={tag.name}
                      className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                        isCardActive(index)
                          ? "bg-blue-600/10 border border-blue-600/30"
                          : "bg-black-300 hover:bg-black-100"
                      }`}
                      style={{ transitionDelay: `${tagIndex * 50}ms` }}
                      title={tag.name}
                    >
                      <img
                        src={tag.path}
                        alt={tag.name}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  ))}
                  {project.tags.length > 4 && (
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-lg text-xs transition-all duration-300 ${
                        isCardActive(index)
                          ? "bg-blue-600/10 border border-blue-600/30 text-blue-400"
                          : "bg-black-300 text-white-600"
                      }`}
                    >
                      +{project.tags.length - 4}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-auto">
                  <button
                    className={`text-sm font-medium transition-colors ${
                      isCardActive(index)
                        ? "text-blue-300"
                        : "text-blue-400 hover:text-blue-300"
                    }`}
                  >
                    View Details
                  </button>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      isCardActive(index)
                        ? "text-white"
                        : "text-white-600 hover:text-white"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Check Out</span>
                    <img
                      src="./assets/arrow-up.png"
                      alt="arrow"
                      className="w-3 h-3"
                    />
                  </a>
                </div>
              </div>

              {/* Enhanced border effect */}
              <div
                className={`absolute inset-0 rounded-xl border transition-all duration-500 pointer-events-none ${
                  isCardActive(index)
                    ? "border-blue-400/40 shadow-xl shadow-blue-500/5"
                    : "border-transparent group-hover:border-blue-400/20"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      {hasMoreProjects && (
        <div
          className={`text-center mt-12 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {!showAllProjects ? (
            <button
              onClick={handleShowMore}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              Show More Projects ({myProjects.length - 6} more)
            </button>
          ) : (
            <button
              onClick={handleShowLess}
              className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Show Less
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default Projects;
