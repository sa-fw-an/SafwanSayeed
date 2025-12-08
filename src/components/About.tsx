import { memo, useMemo } from "react";
import { skills } from "@/data/skills";
import Reveal from "@/components/Reveal";

const About = memo(() => {
  // Memoize skills to prevent unnecessary rerenders
  const skillsList = useMemo(() => [...skills, ...skills], []);

  return (
    <section id="about" className="py-20 md:py-24 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Content */}
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-center mb-16">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="w-72 h-72 rounded-2xl bg-linear-to-br from-accent to-accent-secondary p-1">
                <div className="w-full h-full rounded-2xl bg-bg-elevated flex items-center justify-center">
                  <span className="font-display text-6xl text-accent">S</span>
                </div>
              </div>
            </div>

            {/* About Text */}
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-text-primary mb-6">
                About Me
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-4">
                I'm an{" "}
                <span className="text-text-primary font-medium">
                  Undergraduate Student
                </span>{" "}
                pursuing a B.E in Computer Science and Engineering. I'm
                passionate about coding and love building things that live on
                the internet.
              </p>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                I specialize in{" "}
                <span className="text-accent">Web Development</span>,{" "}
                <span className="text-accent-secondary">Blockchain</span>,
                <span className="text-accent-tertiary"> Android Apps</span>, and{" "}
                <span className="text-accent">Game Development</span>. I enjoy
                exploring innovative solutions and creating engaging experiences
                through technology.
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-5 py-3 bg-bg-elevated rounded-lg text-sm text-text-secondary">
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Bangalore, India
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-[#282828] rounded-lg text-sm text-[#A0A0A0]">
                  <svg
                    className="w-5 h-5 text-accent-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  Open to Remote Work
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-[#242424] rounded-lg text-sm text-[#A0A0A0]">
                  <svg
                    className="w-5 h-5 text-accent-tertiary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  GSoC 2025 Contributor
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Tech Stack */}
        <Reveal delay={0.2}>
          <div
            className="overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <p className="text-center text-sm text-text-muted uppercase tracking-widest mb-6">
              Technologies I Work With
            </p>
            <div className="flex gap-8 animate-marquee gpu-accelerated">
              {skillsList.map((skill, index) => (
                <div
                  key={`${skill.name}-${index}`}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-bg-elevated rounded-full whitespace-nowrap text-sm text-text-secondary"
                >
                  <img
                    src={skill.path}
                    alt={skill.name}
                    className="w-5 h-5 object-contain"
                    loading="lazy"
                  />
                  <span className="leading-none">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
});

export default About;
