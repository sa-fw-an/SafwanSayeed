/* eslint-disable react/no-unknown-property */
import { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Developer from "../components/Developer.jsx";
import CanvasLoader from "../components/Loading.jsx";
import { workExperiences } from "../constants/work.js";

const WorkExperience = () => {
  const [animationName, setAnimationName] = useState("idle");
  const [activeExperience, setActiveExperience] = useState(null);
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

  const handleHover = (index, animation) => {
    setActiveExperience(index);
    setAnimationName(animation.toLowerCase());
  };

  const handleLeave = () => {
    setActiveExperience(null);
    setAnimationName("idle");
  };

  const isActive = (index) => activeExperience === index;

  return (
    <section ref={sectionRef} className="c-space my-20" id="work">
      <div className="w-full text-white-600">
        <p
          className={`head-text transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          My Work Experience
        </p>

        <div className="work-container">
          <div className="work-canvas">
            <Canvas>
              <ambientLight intensity={7} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <directionalLight position={[10, 10, 10]} intensity={1} />
              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
              <Suspense fallback={<CanvasLoader />}>
                <Developer
                  position-y={-3}
                  scale={3}
                  animationName={animationName}
                />
              </Suspense>
            </Canvas>
          </div>

          <div className="work-content">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {[...workExperiences].reverse().map((item, index) => (
                <div
                  key={item.name}
                  onClick={() => handleHover(index, item.animation)}
                  onPointerOver={() => handleHover(index, item.animation)}
                  onPointerOut={handleLeave}
                  className={`work-content_container group relative overflow-hidden transform transition-all duration-500 ease-out ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"} ${isActive(index) ? "scale-105 z-10" : "scale-100"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-white-600/5 via-transparent to-white-600/5 transition-opacity duration-500 ${isActive(index) ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  />

                  <div className="flex flex-col h-full justify-start items-center py-2 relative z-10">
                    <div
                      className={`work-content_logo relative transition-all duration-500 transform ${isActive(index) ? "scale-110 shadow-2xl shadow-white/10" : "scale-100 group-hover:scale-105"}`}
                    >
                      <div
                        className={`absolute -inset-1 rounded-xl bg-gradient-to-br from-white-600/20 to-white-400/20 blur-md transition-opacity duration-500 ${isActive(index) ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}
                      />
                      <img
                        className="w-full h-full relative z-10 rounded-lg"
                        src={item.icon}
                        alt={item.name}
                      />
                    </div>

                    <div
                      className={`work-content_bar relative transition-all duration-500 ${isActive(index) ? "bg-gradient-to-b from-white-600 to-white-400 shadow-lg shadow-white/20" : ""}`}
                    >
                      <div
                        className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-3 h-3 rounded-full border-2 transition-all duration-500 ${isActive(index) ? "bg-white-600 border-white-600 scale-125 shadow-lg shadow-white/30" : "bg-white-500 border-white-500 scale-100"}`}
                      />
                    </div>
                  </div>

                  <div className="sm:p-5 px-2.5 py-5 relative z-10">
                    <p
                      className={`font-bold text-white-800 text-xl mb-3 transition-all duration-300 ${isActive(index) ? "text-white-600" : ""}`}
                    >
                      {item.name}
                    </p>

                    <div
                      className={`text-sm mb-5 flex flex-wrap items-center gap-2 transition-all duration-300 ${isActive(index) ? "text-white-600" : "text-white-500"}`}
                    >
                      <span className="font-semibold">{item.pos}</span>
                      <span className="text-white-400">•</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs border transition-all duration-300 ${isActive(index) ? "bg-white-600/10 border-white-600/30 text-white-600" : "bg-white-400/5 border-white-400/20 text-white-400"}`}
                      >
                        {item.duration}
                      </span>
                    </div>

                    <p
                      className={`leading-relaxed transition-all duration-500 ${isActive(index) ? "text-white-600" : "text-white-500 group-hover:text-white-600"}`}
                    >
                      {item.title}
                    </p>

                    {item.skills && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.skills.map((skill, skillIndex) => (
                          <span
                            key={skill}
                            className={`px-2 py-1 text-xs rounded-md border transition-all duration-300 ${isActive(index) ? "bg-white-600/10 border-white-600/30 text-white-600" : "bg-white-400/5 border-white-400/20 text-white-400 hover:bg-white-500/10"}`}
                            style={{ transitionDelay: `${skillIndex * 50}ms` }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className={`absolute inset-0 rounded-lg border transition-all duration-500 ${isActive(index) ? "border-white-600/40 shadow-xl shadow-white/5" : "border-transparent group-hover:border-white-400/20"}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
