import { memo } from "react";

const Hero = memo(() => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <p className="text-lg text-accent mb-4 animate-fade-in-up">
              Hi there, I'm
            </p>
            <h1
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[#F5F5F5] mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Safwan Sayeed
            </h1>
            <p
              className="text-xl md:text-2xl text-[#A0A0A0] mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Building dreams with code.
            </p>
            <div
              className="flex gap-4 flex-wrap justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-accent text-[#0F0F0F] rounded-lg hover:bg-[#c96a52] hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-transparent text-[#F5F5F5] border border-[#454545] rounded-lg hover:bg-[#2c2c2c] hover:border-[#6B6B6B] transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* 3D Floating Geometric Shapes */}
          <div
            className="flex justify-center items-center lg:justify-end py-10 lg:py-0 relative"
            style={{ perspective: "1200px" }}
          >
            {/* Central glow */}
            <div className="absolute w-[350px] h-[350px] bg-accent/15 rounded-full blur-[100px]" />

            {/* 3D Scene Container - GPU accelerated */}
            <div
              className="relative w-[450px] h-[450px]"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              {/* CUBE 1 - Large terracotta (ROTATES) */}
              <div
                className="absolute top-[50%] left-[50%]"
                style={{
                  transformStyle: "preserve-3d",
                  animation: "cube-orbit-1 25s ease-in-out infinite",
                }}
              >
                <div
                  className="w-20 h-20"
                  style={{
                    transformStyle: "preserve-3d",
                    animation: "cube-rotate 10s linear infinite",
                  }}
                >
                  <div
                    className="absolute w-20 h-20 bg-linear-to-br from-[#E07A5F] to-[#c96a52] opacity-80 border border-[#E07A5F]/50"
                    style={{ transform: "translateZ(40px)" }}
                  />
                  <div
                    className="absolute w-20 h-20 bg-linear-to-br from-[#E07A5F] to-[#c96a52] opacity-70 border border-[#E07A5F]/50"
                    style={{ transform: "rotateY(180deg) translateZ(40px)" }}
                  />
                  <div
                    className="absolute w-20 h-20 bg-linear-to-br from-[#E07A5F] to-[#c96a52] opacity-75 border border-[#E07A5F]/50"
                    style={{ transform: "rotateY(90deg) translateZ(40px)" }}
                  />
                  <div
                    className="absolute w-20 h-20 bg-linear-to-br from-[#E07A5F] to-[#c96a52] opacity-65 border border-[#E07A5F]/50"
                    style={{ transform: "rotateY(-90deg) translateZ(40px)" }}
                  />
                  <div
                    className="absolute w-20 h-20 bg-linear-to-br from-[#E07A5F] to-[#c96a52] opacity-60 border border-[#E07A5F]/50"
                    style={{ transform: "rotateX(90deg) translateZ(40px)" }}
                  />
                  <div
                    className="absolute w-20 h-20 bg-linear-to-br from-[#E07A5F] to-[#c96a52] opacity-50 border border-[#E07A5F]/50"
                    style={{ transform: "rotateX(-90deg) translateZ(40px)" }}
                  />
                </div>
              </div>

              {/* CUBE 2 - Medium cream (ROTATES) */}
              <div
                className="absolute top-[50%] left-[50%]"
                style={{
                  transformStyle: "preserve-3d",
                  animation: "cube-orbit-2 30s ease-in-out infinite",
                }}
              >
                <div
                  className="w-14 h-14"
                  style={{
                    transformStyle: "preserve-3d",
                    animation: "cube-rotate 12s linear infinite reverse",
                  }}
                >
                  <div
                    className="absolute w-14 h-14 bg-linear-to-br from-[#F2CC8F] to-[#e0b87a] opacity-80 border border-[#F2CC8F]/50"
                    style={{ transform: "translateZ(28px)" }}
                  />
                  <div
                    className="absolute w-14 h-14 bg-linear-to-br from-[#F2CC8F] to-[#e0b87a] opacity-70 border border-[#F2CC8F]/50"
                    style={{ transform: "rotateY(180deg) translateZ(28px)" }}
                  />
                  <div
                    className="absolute w-14 h-14 bg-linear-to-br from-[#F2CC8F] to-[#e0b87a] opacity-75 border border-[#F2CC8F]/50"
                    style={{ transform: "rotateY(90deg) translateZ(28px)" }}
                  />
                  <div
                    className="absolute w-14 h-14 bg-linear-to-br from-[#F2CC8F] to-[#e0b87a] opacity-65 border border-[#F2CC8F]/50"
                    style={{ transform: "rotateY(-90deg) translateZ(28px)" }}
                  />
                  <div
                    className="absolute w-14 h-14 bg-linear-to-br from-[#F2CC8F] to-[#e0b87a] opacity-60 border border-[#F2CC8F]/50"
                    style={{ transform: "rotateX(90deg) translateZ(28px)" }}
                  />
                  <div
                    className="absolute w-14 h-14 bg-linear-to-br from-[#F2CC8F] to-[#e0b87a] opacity-50 border border-[#F2CC8F]/50"
                    style={{ transform: "rotateX(-90deg) translateZ(28px)" }}
                  />
                </div>
              </div>

              {/* CUBE 3 - Small sage green (ROTATES) */}
              <div
                className="absolute top-[50%] left-[50%]"
                style={{
                  transformStyle: "preserve-3d",
                  animation: "cube-orbit-3 22s ease-in-out infinite reverse",
                }}
              >
                <div
                  className="w-10 h-10"
                  style={{
                    transformStyle: "preserve-3d",
                    animation: "cube-rotate 14s linear infinite",
                  }}
                >
                  <div
                    className="absolute w-10 h-10 bg-linear-to-br from-[#81B29A] to-[#5a8a73] opacity-80 border border-[#81B29A]/50"
                    style={{ transform: "translateZ(20px)" }}
                  />
                  <div
                    className="absolute w-10 h-10 bg-linear-to-br from-[#81B29A] to-[#5a8a73] opacity-70 border border-[#81B29A]/50"
                    style={{ transform: "rotateY(180deg) translateZ(20px)" }}
                  />
                  <div
                    className="absolute w-10 h-10 bg-linear-to-br from-[#81B29A] to-[#5a8a73] opacity-75 border border-[#81B29A]/50"
                    style={{ transform: "rotateY(90deg) translateZ(20px)" }}
                  />
                  <div
                    className="absolute w-10 h-10 bg-linear-to-br from-[#81B29A] to-[#5a8a73] opacity-65 border border-[#81B29A]/50"
                    style={{ transform: "rotateY(-90deg) translateZ(20px)" }}
                  />
                  <div
                    className="absolute w-10 h-10 bg-linear-to-br from-[#81B29A] to-[#5a8a73] opacity-60 border border-[#81B29A]/50"
                    style={{ transform: "rotateX(90deg) translateZ(20px)" }}
                  />
                  <div
                    className="absolute w-10 h-10 bg-linear-to-br from-[#81B29A] to-[#5a8a73] opacity-50 border border-[#81B29A]/50"
                    style={{ transform: "rotateX(-90deg) translateZ(20px)" }}
                  />
                </div>
              </div>

              {/* SPHERE 1 - Large sage (NO ROTATION - just moves in space) */}
              <div
                className="absolute top-[50%] left-[50%] w-16 h-16 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #c8e0d5, #81B29A 40%, #5a8a73 80%, #3d6b54)",
                  boxShadow:
                    "0 0 50px rgba(129, 178, 154, 0.5), inset -8px -8px 20px rgba(0,0,0,0.3), inset 5px 5px 15px rgba(255,255,255,0.4)",
                  animation: "sphere-orbit-2 18s ease-in-out infinite",
                }}
              />

              {/* SPHERE 2 - Medium terracotta (NO ROTATION) */}
              <div
                className="absolute top-[50%] left-[50%] w-12 h-12 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 25% 25%, #f5a08a, #E07A5F 35%, #c25a3f 75%, #8f3d2a)",
                  boxShadow:
                    "0 0 40px rgba(224, 122, 95, 0.5), inset -6px -6px 15px rgba(0,0,0,0.35), inset 4px 4px 12px rgba(255,255,255,0.35)",
                  animation: "sphere-orbit-4 22s ease-in-out infinite reverse",
                }}
              />

              {/* SPHERE 3 - Large cream (NO ROTATION) */}
              <div
                className="absolute top-[50%] left-[50%] w-14 h-14 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 25%, #fff8e8, #F2CC8F 35%, #d4ae6a 70%, #a8864a)",
                  boxShadow:
                    "0 0 45px rgba(242, 204, 143, 0.5), inset -7px -7px 18px rgba(0,0,0,0.3), inset 5px 5px 14px rgba(255,255,255,0.45)",
                  animation: "sphere-orbit-6 26s ease-in-out infinite",
                }}
              />

              {/* SPHERE 4 - Small terracotta (NO ROTATION) */}
              <div
                className="absolute top-[50%] left-[50%] w-8 h-8 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 28% 28%, #f5a08a, #E07A5F 40%, #b85e49 80%)",
                  boxShadow:
                    "0 0 30px rgba(224, 122, 95, 0.4), inset -4px -4px 10px rgba(0,0,0,0.3), inset 3px 3px 8px rgba(255,255,255,0.3)",
                  animation: "sphere-orbit-7 20s ease-in-out infinite",
                }}
              />

              {/* SPHERE 5 - Small sage (NO ROTATION) */}
              <div
                className="absolute top-[50%] left-[50%] w-10 h-10 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #d0e8dc, #81B29A 40%, #6a9f85 75%)",
                  boxShadow:
                    "0 0 35px rgba(129, 178, 154, 0.45), inset -5px -5px 12px rgba(0,0,0,0.25), inset 4px 4px 10px rgba(255,255,255,0.35)",
                  animation: "sphere-orbit-8 30s ease-in-out infinite reverse",
                }}
              />

              {/* Tiny decorative spheres (NO ROTATION) */}
              <div
                className="absolute w-4 h-4 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #f5a08a, #E07A5F)",
                  boxShadow: "0 0 15px rgba(224, 122, 95, 0.4)",
                  animation: "sphere-dot-1 12s linear infinite",
                  top: "50%",
                  left: "50%",
                }}
              />
              <div
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #c8e0d5, #81B29A)",
                  boxShadow: "0 0 12px rgba(129, 178, 154, 0.4)",
                  animation: "sphere-dot-2 14s linear infinite reverse",
                  top: "50%",
                  left: "50%",
                }}
              />
              <div
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #fff8e8, #F2CC8F)",
                  boxShadow: "0 0 12px rgba(242, 204, 143, 0.4)",
                  animation: "sphere-dot-3 16s linear infinite",
                  top: "50%",
                  left: "50%",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6B6B6B] text-sm animate-bounce-slow z-10">
        <span>Scroll down</span>
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
});

export default Hero;
