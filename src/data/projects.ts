// Project data extracted from Data folder
export interface Project {
  id: number;
  title: string;
  desc: string;
  subdesc: string;
  href: string;
  texture?: string;
  logo?: string;
  logoStyle?: {
    backgroundColor: string;
    border: string;
    boxShadow: string;
  };
  spotlight?: string;
  category: "web" | "mobile" | "blockchain" | "game" | "other";
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "AI Chat Application",
    desc: "Engineered a feature-rich, ChatGPT-like application with advanced file processing, multi-model support, and robust user management.",
    subdesc:
      "This AI-powered chat application provides a comprehensive ChatGPT experience with enhanced functionalities. It supports multi-format file processing (PDFs, images, documents), intelligent document analysis with GPT-4 Vision, and an advanced memory system using vector embeddings. The application features real-time streaming responses, a mobile-responsive design with ARIA accessibility, context-aware conversations, and seamless integration with OpenAI's latest models, all built upon a scalable and modern tech stack.",
    href: "https://github.com/sa-fw-an/ChatGpt-Clone",
    texture: "/textures/project/gpt-clone.mp4",
    logo: "/assets/project/gpt-logo.svg",
    logoStyle: {
      backgroundColor: "#0D1117",
      border: "0.2px solid #30363D",
      boxShadow: "0px 0px 60px 0px #10A37F4D",
    },
    spotlight: "/assets/spotlight1.png",
    category: "web",
    tags: ["Next.js", "React", "TypeScript", "MongoDB", "OpenAI"],
  },
  {
    id: 2,
    title: "Blockchain Voting System",
    desc: "A decentralized voting system leveraging blockchain technology to ensure secure, transparent, and anonymous electoral processes.",
    subdesc:
      "This project implements a blockchain-based voting platform using Ethereum smart contracts and web3.js. It provides a decentralized solution for voter registration, ballot creation, and automated vote tallying. By leveraging the inherent immutability and transparency of blockchain, the system effectively prevents electoral fraud and manipulation, establishing a trustworthy environment for conducting fair and reliable elections.",
    href: "https://github.com/IlluminatorBlock/Blockchain",
    texture: "/textures/project/voting.mp4",
    logo: "/assets/project/vote-logo.svg",
    logoStyle: {
      backgroundColor: "#2A1816",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
    spotlight: "/assets/spotlight1.png",
    category: "blockchain",
    tags: ["React", "Solidity", "Ethereum", "Django", "TensorFlow"],
  },
  {
    id: 3,
    title: "RAG-ChatBot",
    desc: "Developed a Retrieval-Augmented Generation (RAG) chatbot using Streamlit, ChromaDB, and large language models for dynamic, context-aware Q&A.",
    subdesc:
      "Engineered a sophisticated RAG chatbot capable of ingesting and processing various document formats (PDF, TXT, DOCX) and web URLs to build a persistent knowledge base in ChromaDB. The application integrates configurable LLMs via the Groq API and uses Sentence-Transformers for embeddings to deliver accurate, context-aware responses. It features automatic fact extraction, conversation history management with SQLite, and optional web search augmentation for time-sensitive queries.",
    href: "https://github.com/sa-fw-an/RAG-ChatBot",
    texture: "/textures/project/rag-chatbot.mov",
    logo: "/assets/project/chatbot-logo.svg",
    logoStyle: {
      backgroundColor: "#0B1624",
      border: "0.2px solid #1A2433",
      boxShadow: "0px 0px 60px 0px #2248704D",
    },
    spotlight: "/assets/spotlight2.png",
    category: "web",
    tags: ["Python", "Streamlit", "ChromaDB", "LLM"],
  },
  {
    id: 4,
    title: "Android RAT Tool",
    desc: "Developed a tool for generating, patching, and managing Android Meterpreter payloads with compatibility for modern Android versions.",
    subdesc:
      "This educational tool streamlines the creation and deployment of Android Meterpreter payloads. It features a command-line interface to build, patch, sign, and manage APKs, and to launch Metasploit handlers. The patching functionality adds a visible UI to payloads, ensuring compatibility and functionality on the latest Android versions. The project demonstrates skills in Python scripting, security tool development, and understanding of Android application structure.",
    href: "https://github.com/sa-fw-an/Android-RAT",
    texture: "/textures/project/androidrat.mov",
    logo: "/assets/project/android-rat-logo.svg",
    logoStyle: {
      backgroundColor: "#0D1117",
      border: "0.2px solid #30363D",
      boxShadow: "0px 0px 60px 0px #10A37F4D",
    },
    spotlight: "/assets/spotlight4.png",
    category: "other",
    tags: ["Python", "Metasploit", "Android", "Security"],
  },
  {
    id: 5,
    title: "Jump Ball - Android Game",
    desc: "Designed and developed an endless runner Android game featuring smooth 60 FPS rendering, progressive difficulty, and persistent high score tracking.",
    subdesc:
      "Built with Android Studio, Kotlin, and Jetpack Compose, Jump Ball offers a visually engaging, one-tap control experience. The game features realistic ball physics, beautiful gradient visuals, and accurate collision detection. Progressive gameplay increases speed and challenge over time, while high scores are stored persistently for replay value. Demonstrates expertise in mobile development, UI design, and game logic.",
    href: "https://github.com/sa-fw-an/JumpBall-Android",
    texture: "/textures/project/jumpball.mp4",
    logo: "/assets/project/jumpball-logo.svg",
    logoStyle: {
      backgroundColor: "#4285F4",
      border: "0.2px solid #1A2433",
      boxShadow: "0px 0px 60px 0px #2248704D",
    },
    spotlight: "/assets/spotlight5.png",
    category: "game",
    tags: ["Kotlin", "Android Studio", "Jetpack Compose"],
  },
  {
    id: 6,
    title: "MERN Chat App",
    desc: "Built a full-stack, real-time chat application using the MERN stack, featuring secure user authentication and private messaging.",
    subdesc:
      "This chat application enables users to register, log in securely, and engage in real-time conversations. The backend, built with Node.js, Express, and MongoDB, manages user data and messaging, while the React frontend provides a clean and intuitive user interface. Real-time functionality is powered by Socket.io, ensuring instant message delivery and a seamless communication experience.",
    href: "https://github.com/sa-fw-an/ChatApp",
    texture: "/textures/project/chatapp.mp4",
    logo: "/assets/project/chatapp-logo.svg",
    logoStyle: {
      backgroundColor: "#2A1816",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
    spotlight: "/assets/spotlight3.png",
    category: "web",
    tags: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
  },
  {
    id: 7,
    title: "Markdown Parser",
    desc: "Developed a powerful Markdown parser with modern web technologies, enabling live editing, real-time previewing, and file download capabilities.",
    subdesc:
      "This Markdown parser provides a seamless editing experience with a feature-rich, dual-panel interface for writing and previewing Markdown content in real time. Built with React and TypeScript, it supports full GitHub Flavored Markdown (GFM), syntax highlighting, custom alerts, and YouTube embeds. The application is designed for high performance and responsiveness, making it an ideal tool for developers and content creators.",
    href: "https://sa-fw-an.github.io/markdown-parser",
    texture: "/textures/project/mdparser.mov",
    logo: "/assets/project/mdparser-logo.svg",
    logoStyle: {
      backgroundColor: "#0B1624",
      border: "0.2px solid #1A2433",
      boxShadow: "0px 0px 60px 0px #2248704D",
    },
    spotlight: "/assets/spotlight5.png",
    category: "web",
    tags: ["React", "TypeScript", "Vite", "Framer Motion"],
  },
  {
    id: 8,
    title: "Weather Forecast - Android App",
    desc: "Modern Android app providing real-time weather data and location-based forecasts with an intuitive UI.",
    subdesc:
      "Developed using Android Studio, Kotlin, and Jetpack Compose. Features include dynamic weather icons, smooth animations, and API-powered updates for accurate local and global weather information.",
    href: "https://github.com/sa-fw-an/Weather-Android",
    texture: "/textures/project/weather.mp4",
    logo: "/assets/project/weather-logo.svg",
    logoStyle: {
      backgroundColor: "#4299E1",
      border: "0.2px solid #1A2433",
      boxShadow: "0px 0px 60px 0px #2248704D",
    },
    spotlight: "/assets/spotlight3.png",
    category: "mobile",
    tags: ["Kotlin", "Android Studio", "Jetpack Compose", "API"],
  },
  {
    id: 9,
    title: "Flask Blog Website",
    desc: "Developed a dynamic, full-featured blog website using the Flask framework, with comprehensive CRUD functionality and user authentication.",
    subdesc:
      "This blog application allows users to register, log in, and manage their own posts through a clean and responsive user interface. The backend is powered by Flask and uses Flask-SQLAlchemy for database operations with a SQLite database. The project demonstrates proficiency in backend development, database management, and building secure, user-centric web applications.",
    href: "https://github.com/sa-fw-an/Blog",
    texture: "/textures/project/blog.mp4",
    logo: "/assets/project/blog-logo.svg",
    logoStyle: {
      backgroundColor: "#2A1816",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
    spotlight: "/assets/spotlight1.png",
    category: "web",
    tags: ["Python", "Flask", "SQLite", "HTML", "CSS"],
  },
  {
    id: 10,
    title: "Watch TryOn AR App",
    desc: "Developed an innovative AR mobile application allowing users to virtually try on watches, enhancing the online shopping experience.",
    subdesc:
      "This augmented reality application, built with Unity and C#, enables users to visualize watches on their wrist in real time. The app features a wide collection of virtual watches and provides a user-friendly interface for browsing and trying on different models. This project showcases skills in augmented reality development, mobile application design, and creating immersive, interactive user experiences with Unity.",
    href: "https://github.com/sa-fw-an/ARTryOn",
    texture: "/textures/project/watch.mp4",
    logo: "/assets/project/watch-logo.svg",
    logoStyle: {
      backgroundColor: "#2A1816",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
    spotlight: "/assets/spotlight5.png",
    category: "mobile",
    tags: ["Unity", "C#", "AR", "Mobile"],
  },
  {
    id: 11,
    title: "Snake Game",
    desc: "Developed a modern version of the classic Snake game using Python and the Pygame library, featuring scoring and a complete game loop.",
    subdesc:
      "This project is an implementation of the classic Snake game, built from scratch using Python and Pygame. It features responsive controls, a scoring system, and a game-over screen with options to restart or quit. The game showcases skills in object-oriented programming, game logic development, and handling user input and graphics rendering within a game loop.",
    href: "https://github.com/sa-fw-an/SnakeGame",
    texture: "/textures/project/snakegame.mp4",
    logo: "/assets/project/snake-logo.svg",
    logoStyle: {
      backgroundColor: "#2A1816",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
    spotlight: "/assets/spotlight3.png",
    category: "game",
    tags: ["Python", "Pygame"],
  },
  {
    id: 12,
    title: "3D Models Website",
    desc: "Designed and developed a visually stunning portfolio website to showcase intricate 3D models, with a focus on responsive design and user interaction.",
    subdesc:
      "This portfolio project features a collection of interactive 3D models, rendered using Three.js. The website is built with modern frontend technologies including React, Vite, and Tailwind CSS, ensuring a seamless and engaging user experience across all devices. It highlights technical skills in 3D modeling, web development, and creating dynamic user interfaces.",
    href: "https://sa-fw-an.github.io/Portfolio/",
    texture: "/textures/project/3dportfolio.mp4",
    logo: "/assets/project/portfolio-logo.svg",
    logoStyle: {
      backgroundColor: "#2A1816",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
    spotlight: "/assets/spotlight5.png",
    category: "web",
    tags: ["React", "Three.js", "Vite", "TailwindCSS"],
  },
];

export const categories = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "blockchain", label: "Blockchain" },
  { id: "game", label: "Games" },
];
