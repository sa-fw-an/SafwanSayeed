# Safwan Sayeed — Portfolio

Personal portfolio of [Safwan Sayeed](https://safwansayeed.in) — software developer
into web, blockchain, Android, and games.

Built with React 19 + TypeScript + Vite 8. One hand-written semantic CSS system
(three full color themes: Paper / Midnight / Matcha), zero UI frameworks. The 3D
workspace diorama (three.js + a Draco-compressed room model) loads in its own lazy
chunk only when scrolled near, and skips itself entirely on low-end devices.

## Stack

- **React 19** + **TypeScript**
- **Vite 8** (Rolldown-powered)
- Pure CSS custom properties — no Tailwind, no CSS-in-JS
- **three.js / @react-three/fiber / @react-three/drei** — lazy-loaded diorama only
- **@emailjs/browser** — contact form

## Develop

```bash
npm install
npm run dev        # dev server (prints the local URL)
```

## Verify & ship

```bash
npm run lint       # ESLint
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build locally
npm run deploy     # build + publish dist/ to GitHub Pages (safwansayeed.in)
```

CI runs lint on every push; CD builds and deploys `main` via GitHub Actions.

## Structure

```
src/
├── components/   sections + fixed chrome (navbar, hero, projects, pet cat…)
│   └── ui/       shared primitives (Button, Modal, SectionHeading)
├── three/        lazy 3D room scene (loaded only when approached)
├── lib/          theme switching, confetti engine, reveal hook, device tiers
├── data/         all site content (profile, projects, skills, experience)
└── styles/       tokens → base → animations → chrome → sections
```
