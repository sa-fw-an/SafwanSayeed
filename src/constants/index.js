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
    title: 'Project Name',
    desc: 'Project Description',
    subdesc:
      'Project SubDescription',
    href: './',
    texture: './textures/project/project1.mp4',
    logo: './assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#2A1816',
      border: '0.2px solid #36201D',
      boxShadow: '0px 0px 60px 0px #AA3C304D',
    },
    spotlight: './assets/spotlight1.png',
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
        name: 'TypeScript',
        path: './assets/typescript.png',
      },
      {
        id: 4,
        name: 'Framer Motion',
        path: './assets/framer.png',
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
    title: "",
    icon: './assets/framer.svg',
    animation: 'victory',
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
    animation: 'salute',
  },*/
];
