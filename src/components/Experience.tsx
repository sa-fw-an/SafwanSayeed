import { useState, useEffect, memo } from "react";
import { experiences, type Experience } from "@/data/experience";
import Reveal from "@/components/Reveal";

interface ExperienceModalProps {
  experience: Experience | null;
  onClose: () => void;
}

const ExperienceModal = ({ experience, onClose }: ExperienceModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!experience) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-bg-secondary rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-border animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="shrink-0 p-6 border-b border-border flex justify-between items-start">
          <div className="pr-4 flex items-start gap-4">
            {experience.logo && (
              <div className="w-14 h-14 bg-bg-elevated rounded-xl flex items-center justify-center shrink-0 border border-border p-2">
                <img
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div>
              <h3 className="font-display text-2xl font-semibold text-text-primary mb-1">
                {experience.role}
              </h3>
              <p className="text-accent text-lg mb-2">{experience.company}</p>
              <p className="text-sm text-text-muted">{experience.duration}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary transition-colors shrink-0"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6">
          <p className="text-text-secondary mb-6">{experience.description}</p>

          <h4 className="text-text-primary font-semibold mb-3">
            Key Responsibilities & Achievements:
          </h4>
          <ul className="space-y-3 mb-6">
            {experience.details.map((detail, index) => (
              <li key={index} className="flex gap-3 text-text-secondary">
                <span className="text-accent mt-1.5 shrink-0">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          <h4 className="text-text-primary font-semibold mb-3">
            Technologies Used:
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm text-text-secondary bg-bg-elevated rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperienceSection = memo(() => {
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  return (
    <section id="experience" className="py-20 md:py-24 bg-[#0F0F0F]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#F5F5F5] mb-4">
              Experience
            </h2>
            <p className="text-lg text-[#A0A0A0] max-w-xl mx-auto">
              My professional journey and contributions to the tech community.
            </p>
          </div>
        </Reveal>

        {/* Experience Cards - Clean Layout */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#E07A5F] via-[#E07A5F] to-[#E07A5F]/20" />

          {/* Experience Items */}
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-8 md:pl-20">
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-8 top-6 w-3 h-3 bg-[#E07A5F] rounded-full -translate-x-[5px] ring-4 ring-[#0F0F0F]" />

                {/* Card */}
                <div
                  onClick={() => setSelectedExperience(exp)}
                  className="bg-bg-secondary rounded-xl border border-border p-6 cursor-pointer hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 group"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Left: Logo + Info */}
                    <div className="flex items-start gap-4">
                      {/* Company Logo */}
                      <div className="w-14 h-14 bg-bg-elevated rounded-xl flex items-center justify-center shrink-0 group-hover:bg-bg-elevated/80 transition-colors border border-border overflow-hidden p-2">
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="font-display text-xl text-accent">
                            {exp.company.charAt(0)}
                          </span>
                        )}
                      </div>

                      {/* Role & Company */}
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-accent transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-accent-secondary font-medium mb-2">
                          {exp.company}
                        </p>
                        <p className="text-sm text-text-muted">
                          {exp.duration}
                        </p>
                      </div>
                    </div>

                    {/* Right: Arrow */}
                    <div className="hidden md:flex items-center text-text-muted group-hover:text-accent transition-colors">
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary text-sm mt-4 leading-relaxed line-clamp-2">
                    {exp.description}
                  </p>

                  {/* Skills Preview */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs text-text-secondary bg-bg-elevated rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {exp.skills.length > 4 && (
                      <span className="px-2.5 py-1 text-xs text-text-muted">
                        +{exp.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Modal */}
      {selectedExperience && (
        <ExperienceModal
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </section>
  );
});

export default ExperienceSection;
