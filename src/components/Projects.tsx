import { useState, useEffect } from "react";
import { projects, categories, type Project } from "@/data/projects";
import Reveal from "@/components/Reveal";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!project) return null;

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
            {project.logo && (
              <div className="w-12 h-12 bg-bg-elevated rounded-lg flex items-center justify-center shrink-0 border border-border p-2">
                <img
                  src={project.logo}
                  alt={`${project.title} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div>
              <h3 className="font-display text-2xl font-semibold text-text-primary mb-2">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs text-text-secondary bg-bg-elevated rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#6B6B6B] hover:text-[#F5F5F5] transition-colors shrink-0"
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
          <p className="text-[#A0A0A0] mb-4">{project.desc}</p>
          <p className="text-[#F5F5F5] leading-relaxed mb-6">
            {project.subdesc}
          </p>

          {/* Actions */}
          <div className="flex gap-4 flex-wrap">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E07A5F] text-[#0F0F0F] font-medium rounded-lg hover:bg-[#c96a52] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              View on GitHub
            </a>
            {project.href.includes("github.io") && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#434242] text-[#F5F5F5] font-medium rounded-lg hover:bg-[#262626] transition-colors"
              >
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PROJECTS_PER_PAGE = 5;

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const currentProjects = filteredProjects.slice(
    currentPage * PROJECTS_PER_PAGE,
    (currentPage + 1) * PROJECTS_PER_PAGE,
  );

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Bento grid layout pattern (5 items per page)
  // Layout on desktop (4 cols x 3 rows):
  // [  Large 2x2   ] [ Tall 1x2 ] [ Tall 1x2 ]
  // [             ] [          ] [          ]
  // [    Wide 2x1    ] [    Wide 2x1       ]
  const getGridClass = (index: number) => {
    const pattern = [
      "md:col-span-2 md:row-span-2 col-span-2 row-span-2", // Large featured (left)
      "col-span-1 md:row-span-2 row-span-1", // Right top 1 - tall card
      "col-span-1 md:row-span-2 row-span-1", // Right top 2 - tall card
      "col-span-2 row-span-1", // Bottom left wide
      "col-span-2 row-span-1", // Bottom right wide
    ];
    return pattern[index] || "col-span-1 row-span-1";
  };

  return (
    <section id="projects" className="py-20 md:py-24 bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-text-primary mb-4">
              Selected Work
            </h2>
            <p className="text-lg text-text-secondary max-w-xl mx-auto">
              A collection of projects that showcase my skills in web
              development, mobile apps, blockchain, and more.
            </p>
          </div>
        </Reveal>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 text-sm rounded-full border transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-accent border-accent text-bg-primary"
                  : "bg-transparent border-border text-text-secondary hover:border-accent hover:text-accent"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Bento Grid - 4 columns, 3 rows */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:grid-rows-[200px_200px_180px] auto-rows-[180px] mb-8">
          {Array.from({ length: 5 }).map((_, index) => {
            const project = currentProjects[index];
            const gridClass = getGridClass(index);

            if (!project) {
              // Empty placeholder to maintain grid structure
              return (
                <div
                  key={`empty-${index}`}
                  className={`${gridClass} rounded-xl bg-bg-secondary/30 border border-bg-elevated border-dashed`}
                />
              );
            }

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`${gridClass} group relative bg-bg-secondary rounded-xl overflow-hidden border border-border cursor-pointer transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/10`}
              >
                {/* Banner Background Image */}
                <img
                  src={`/assets/banners/banner${(index % 5) + 1}.png`}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                  loading="lazy"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-linear-to-t from-bg-secondary via-bg-secondary/60 to-transparent" />

                {/* Project Logo */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-bg-elevated rounded-lg flex items-center justify-center overflow-hidden border border-border shadow-lg z-20">
                  {project.logo ? (
                    <img
                      src={project.logo}
                      alt={`${project.title} logo`}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <span className="font-display text-xl text-accent">
                      {project.title.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <div className="bg-linear-to-t from-bg-primary/90 via-bg-primary/60 to-transparent absolute inset-0" />
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p
                      className={`text-sm text-text-secondary line-clamp-2 ${gridClass.includes("row-span-2") ? "" : "hidden sm:block"}`}
                    >
                      {project.desc}
                    </p>
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tags
                        .slice(0, gridClass.includes("row-span-2") ? 4 : 2)
                        .map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs text-text-muted bg-bg-elevated/80 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      {project.tags.length >
                        (gridClass.includes("row-span-2") ? 4 : 2) && (
                        <span className="px-2 py-0.5 text-xs text-text-muted bg-bg-elevated/80 rounded-full">
                          +
                          {project.tags.length -
                            (gridClass.includes("row-span-2") ? 4 : 2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                currentPage === 0
                  ? "border-[#242424] text-[#6B6B6B] cursor-not-allowed"
                  : "border-[#353535] text-[#A0A0A0] hover:border-[#E07A5F] hover:text-[#E07A5F]"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-sm">Previous</span>
            </button>

            {/* Page Indicators */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    currentPage === index
                      ? "bg-[#E07A5F] w-6"
                      : "bg-[#343434] hover:bg-[#454545]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage >= totalPages - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                currentPage >= totalPages - 1
                  ? "border-[#262626] text-[#6B6B6B] cursor-not-allowed"
                  : "border-[#323232] text-[#A0A0A0] hover:border-[#E07A5F] hover:text-[#E07A5F]"
              }`}
            >
              <span className="text-sm">Next</span>
              <svg
                className="w-4 h-4"
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
            </button>
          </div>
        )}

        {/* Page Counter */}
        <p className="text-center text-sm text-[#6B6B6B] mt-4">
          {currentPage + 1} / {totalPages}
        </p>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
