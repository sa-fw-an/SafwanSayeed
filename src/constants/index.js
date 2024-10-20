export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '#home',
  },
  {
    id: 2,
    name: 'About',
    href: '#about',
  },
  {
    id: 3,
    name: 'Work',
    href: '#work',
  },
  {
    id: 4,
    name: 'Contact',
    href: '#contact',
  },
];

export const clientReviews = [
  {
    id: 1,
    name: 'Test Name',
    position: 'Test Positon',
    img: './assets/review1.png',
    review:
      'Review',
  },
];

export const myProjects = [
  {
    title: '3D Web Models Portfolio',
    desc: 'A visually stunning portfolio showcasing intricate 3D web models with a focus on responsive design and exceptional user interface.',
    subdesc:
      'This portfolio features a collection of cool and interactive 3D models, allowing users to explore and engage with each design. Built with HTML, CSS, JavaScript, and other cutting-edge technologies, the site ensures a seamless experience across devices, highlighting creativity and technical prowess in 3D modeling and web development.',
    href: 'https://github.com/sa-fw-an/Portfolio',
    texture: './textures/project/3dportfolio.mp4',
    logo: './assets/portfolio.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    spotlight: './assets/spotlight5.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: './assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: './assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'JavaScript',
        path: './assets/javascript.svg',
      },
      {
        id: 4,
        name: 'Html',
        path: './assets/html.svg',
      },
      {
        id: 5,
        name: 'Vite',
        path: './assets/vite.svg',
      },
      {
        id: 6,
        name: 'Framer Motion',
        path: './assets/framer.png',
      },
    ],
  },
  {
    title: 'Flask Blog',
    desc: 'A dynamic blog website developed using Flask, featuring SQL for database management and a user-friendly interface built with HTML and CSS.',
    subdesc:
      'This blog application allows users to create, update, delete, and link posts effortlessly. With a clean and responsive design, users can easily navigate through articles, engage with content, and manage their posts seamlessly. The integration of SQL ensures efficient data handling, making it a robust platform for blogging.',
    href: 'https://github.com/sa-fw-an/Blog',
    texture: './textures/project/blog.mp4',
    logo: './assets/flask.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    spotlight: './assets/spotlight4.png',
    tags: [
      {
        id: 1,
        name: 'Python',
        path: './assets/python.svg',
      },
      {
        id: 2,
        name: 'Html',
        path: './assets/html.svg',
      },
      {
        id: 3,
        name: 'CSS',
        path: './assets/css.svg',
      },
      {
        id: 4,
        name: 'Flask',
        path: './assets/flask.png',
      },
      {
        id: 5,
        name: 'SQL',
        path: './assets/sql.png',
      },
    ],
  },
  {
    title: 'Snake Game',
    desc: 'Snake Game is a modern take on the classic arcade game where players guide a snake to collect food and grow longer while avoiding obstacles.',
    subdesc:
      'Built with Python and Pygame, this game challenges players to navigate a snake using simple controls while collecting food and increasing in size. The objective is to survive as long as possible without hitting the walls or the snakes own body. With vibrant visuals and smooth gameplay, Snake Game offers a fun, nostalgic experience for all ages.',
    href: 'https://github.com/sa-fw-an/SnakeGame',
    texture: './textures/project/snakegame.mp4',
    logo: './assets/snakegame.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    spotlight: './assets/spotlight3.png',
    tags: [
      {
        id: 1,
        name: 'Python',
        path: './assets/python.svg',
      },
    ],
  },
  {
    title: 'BirthdayWish',
    desc: 'BirthdayWish is a vibrant web application designed to help you send heartfelt birthday wishes to your loved ones.',
    subdesc:
      'Featuring lively music and captivating animations, the website allows users to create personalized birthday messages that are both fun and memorable. Built using HTML, CSS, and JavaScript, BirthdayWish combines creativity with technology, making it easy to celebrate special moments with style.',
    href: 'https://sa-fw-an.github.io/BirthdayWish/',
    texture: './textures/project/birthday.mp4',
    logo: './assets/birthday-logo.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    spotlight: './assets/spotlight1.png',
    tags: [
      {
        id: 1,
        name: 'Html',
        path: './assets/html.svg',
      },
      {
        id: 2,
        name: 'CSS',
        path: './assets/css.svg',
      },
      {
        id: 3,
        name: 'JavaScript',
        path: './assets/javascript.svg',
      },
    ],
  },
  {
    title: 'WatchTry',
    desc: 'WatchTry is an innovative mobile application that allows users to experience a wide range of watches virtually, enabling them to visualize how each watch looks on their wrist without making a purchase.',
    subdesc:
      'With advanced augmented reality (AR) technology, WatchTry lets users browse through an extensive collection of watches, select their favorites, and see them in real time. The app provides a user-friendly interface, detailed watch specifications, and the option to share their virtual try-ons with friends, making the watch shopping experience engaging and informed.',
    href: 'https://github.com/sa-fw-an/ARTryOn',
    texture: './textures/project/watch.mp4',
    logo: './assets/watch-logo.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    spotlight: './assets/spotlight1.png',
    tags: [
      {
        id: 1,
        name: 'C#',
        path: './assets/csharp.svg',
      },
      {
        id: 2,
        name: 'Unity',
        path: './assets/unity.svg',
      },
    ],
  },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'Firevera',
    pos: 'Software Web Developer',
    duration: '2024- 1 Month',
    title: "Developed a web application using Django for the backend and Next.js for the frontend.The project features a user authentication system with registration and login capabilities. I implemented a calculator to assess the environmental impact and calculate the renewability factor for companies. Additionally, I designed and built the entire database from scratch, ensuring efficient data management and retrieval. This project highlights my skills in full-stack development and database management.",
    icon: './assets/firevera.jpg',
    animation: 'salute',
  },
  /*{
    id: 2,
    name: 'Company name',
    pos: 'Role',
    duration: 'Time',
    title: "Worked As",
    icon: './assets/yourpic.svg',
    animation: 'clapping',
  },
  {
    id: 3,
    name: 'Company name',
    pos: 'Role',
    duration: 'Time',
    title: "Worked As",
    icon: './assets/yourpic.svg',
    animation: 'victory',
  },*/
];
