// Experience data extracted from Data folder
export interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
  details: string[];
  skills: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Google Summer of Code 2025",
    role: "Contributor",
    duration: "May 2025 - Sep 2025",
    description:
      "Built a core execution engine for a block-based musical coding platform—creating a custom interpreter, AST, and real-time scheduler.",
    details: [
      "Designed and implemented a custom Abstract Syntax Tree (AST) for representing musical code blocks",
      "Built a real-time scheduler for precise timing of musical events and playback",
      "Created a custom interpreter to execute block-based musical programs",
      "Honed systems design and algorithm optimization skills through complex audio scheduling challenges",
      "Collaborated with the open-source community and mentors to deliver production-ready code",
    ],
    skills: [
      "JavaScript",
      "TypeScript",
      "Audio APIs",
      "Interpreter Design",
      "Open Source",
    ],
    logo: "/assets/work/gsoc.svg",
  },
  {
    id: 2,
    company: "Sugar Labs",
    role: "Open Source Maintainer / Technical Lead",
    duration: "Feb 2025 - Present",
    description:
      "Maintainer and Member of the Sugar Labs organization, contributing to the development and maintenance of Sugar Labs Web Dev projects.",
    details: [
      "Lead technical decisions and code reviews for web development projects",
      "Mentor new contributors and help onboard them to the codebase",
      "Implement new features and fix bugs across multiple repositories",
      "Coordinate with the broader Sugar Labs community on project roadmaps",
      "Write documentation and maintain project health through CI/CD improvements",
    ],
    skills: [
      "React",
      "JavaScript",
      "Open Source",
      "Code Review",
      "Technical Leadership",
    ],
    logo: "/assets/work/sugar.svg",
  },
  {
    id: 3,
    company: "Firevera",
    role: "Software Web Developer",
    duration: "Oct 2024 - Nov 2024",
    description:
      "Developed a full-stack web application using Django and Next.js, featuring user authentication, environmental impact calculator, and database management.",
    details: [
      "Built RESTful APIs using Django REST Framework for backend services",
      "Implemented responsive frontend interfaces using Next.js and React",
      "Created user authentication system with secure session management",
      "Developed an environmental impact calculator feature from scratch",
      "Designed and managed PostgreSQL database schema for the application",
    ],
    skills: ["Django", "Next.js", "React", "PostgreSQL", "REST APIs"],
    logo: "/assets/work/firevera.jpg",
  },
];
