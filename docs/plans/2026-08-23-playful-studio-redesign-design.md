# Portfolio Redesign — "Playful Studio"

Date: 2026-08-23
Status: Approved

## Goal

Complete rebuild of the portfolio site (safwansayeed.in) in the candy neo-brutalist
language of the Birthday project, with the 3D room from Portfolio-v2 as a
performance-safe side feature. All existing data preserved. All dead code removed.
Fully responsive, fast on old devices.

## Sources

- **Birthday** (`/Users/safwansayeed/Coding/Birthday`): visual language, theme system,
  circular reveal switching, confetti engine, pet mascot, easing personality.
- **Portfolio-v2** (`/Users/safwansayeed/Coding/Portfolio-v2`): `room.glb` + fish idle
  animation, mouse-parallax pattern — minus its performance pitfalls.
- **Portfolio** (this repo): all content/data, EmailJS contact flow, CI/CD.

## Decisions made with user

- Approach A "Playful Studio" chosen over refined/evolution variants.
- 3 full themes with circular reveal switching.
- 3D room = lazy-loaded diorama below the fold (not hero).
- `prettier` and `gh-pages` stay installed (category move to devDependencies only,
  nothing removed; deploy via gh-pages continues to work).
- ESLint flat config, CI.yml, CD.yml workflows untouched.
- EmailJS service/template/public-key stay inline in Contact.tsx (public-by-design).
- `Randomfavicon.js` rotator stays.

## Theme system

Three full palettes as ~17 semantic CSS custom properties on `<html[data-theme]>`,
identical role structure; `--pop: #ffc928` gold constant across all three.
Roles: bg, surface, ink, edge, accent, on-accent, pop, on-pop, mint, rose, muted,
grid-line, overlay (+ color-scheme).

| Role | Paper | Midnight | Matcha |
|---|---|---|---|
| Positioning | warm daylight workshop | cozy night coding | fresh garden studio |
| bg | warm cream | deep teal-navy | soft sage cream |
| surface | paper white | slate teal | pale mint |
| ink | deep navy | warm ivory | dark plum |
| accent | rust red | peach orange | forest teal |

Switching: View Transitions API circular clip-path reveal anchored at the clicked
button's center (650ms cubic-bezier(0.22,1,0.36,1)); flushSync fallback when
unsupported or prefers-reduced-motion. Inline head script applies persisted theme
(localStorage) before first paint — no FOUC.

## Visual language

- Hard offset shadows only, zero blur: 3px chips → 6px cards → 10px modals.
- Thick 2–3px flat borders in `--edge`; sharp corners default; curves reserved for
  organic elements (pet, avatar blob).
- Press physics on all buttons: hover translate(2px,2px) + shadow shrink; active
  deeper translate, no shadow.
- Graph-paper grid texture at low alpha via two linear-gradients at `--grid-line`.
- Deliberate tilts: −1.2° ticker band, ±4° polaroid frames, rotated tape strips.
- Overshoot beziers cubic-bezier(0.2,1.4,0.4,1) family for entrances/pops.
- No gradients anywhere (user requirement); flat fills only.

## Typography

Archivo Black (display caps), Space Grotesk (body), Caveat (handwritten accents) —
single Google Fonts request, preconnect, display=swap. Fluid clamp() sizes.

## Page structure (all data preserved verbatim)

Fixed chrome: ThemeSwitcher (top-right), ProgressBar (top, knob rides edge),
ParallaxField (fixed SVG shapes behind content, rAF-throttled passive scroll),
PetCat (see below). Single-page anchor nav (#home #about #projects #experience
#contact) preserved.

1. Hero — letter-by-letter staggered name reveal (55ms/letter), Caveat tagline,
   CTAs, scroll cue nudge.
2. Ticker — slanted marquee strip.
3. About — taped polaroid avatar, bio paragraphs, highlight chips.
4. Skills — two opposite-direction infinite sticker marquees (43 skills).
5. Projects — bento grid, category filter pills, pagination, modal; all 12 projects.
6. Workspace Diorama — lazy 3D room with swimming fish (below fold).
7. Experience — timeline ticket cards + detail modals; all 3 entries verbatim.
8. Contact — form + info cards; EmailJS send kept inline; confetti burst on success.
9. Footer — inverted edge-color footer, socials, hits.sh badge.

## Pet cat

SVG cat sprinting across viewport bottom at random 45–90s intervals: tail-wave,
staggered-leg gallop gait, body bob, dust puffs, speech bubble pops. Click → heart
confetti burst. Pure CSS keyframes + minimal JS scheduling; never dispatched under
reduced motion.

## Confetti

Dependency-free canvas engine ported from Birthday (DPR-aware, single rAF loop,
gravity/drag/wobble, life-based fade). Mounted only while particles are alive;
bursts on contact success and pet click; hearts palette per theme accents.

## 3D Diorama plan

- Deps added: `three`, `@react-three/fiber`, `@react-three/drei` in separate lazy
  chunk loaded only when diorama within ~400px of viewport (IntersectionObserver +
  React.lazy). `room.glb` (428KB Draco) copied into public/models; ONE draco decoder
  path shipped.
- Fixes vs Portfolio-v2:
  - Pause render loop when canvas off-screen or tab hidden (frameloop control).
  - No `transmission` glass material (simple transparent physical/basic material).
  - Static emissive screen texture instead of 15MB video texture.
  - Shadow maps ≤1024 desktop, disabled on mobile/low tier.
  - DPR caps: 1.5 desktop / 1 laptop / 0.75 mobile-low.
  - Real LOW tier (deviceMemory < 4 or cores ≤ 4): WebGL skipped entirely, an
    illustrated CSS fallback panel renders instead.
  - Fish AnimationMixer @0.9×; mouse-parallax lerp rotation preserved.
  - Pop-in of room parts via useFrame lerp scale-in (no GSAP dependency added).

## Architecture

Tailwind removed entirely; one semantic CSS system (custom properties + component
classes) organized under src/styles/: tokens.css, base.css, components.css,
sections.css, animations.css. Rationale: ends the dual token/hex-utility drift that
made the old site inconsistent; Birthday proves maintainability at this scale.

```
src/
├── lib/        theme.ts · confetti.ts · useReveal.ts · device.ts
├── components/ ui/(Modal·Button·SectionHeading) · Navbar · Hero · Ticker ·
│               About · Skills · Projects · Diorama · Experience · Contact ·
│               Footer · PetCat · ThemeSwitcher · ProgressBar · ParallaxField
├── three/      RoomScene.tsx · RoomModel.tsx
└── data/       profile.ts (bio/nav/social merged) · projects.ts · skills.ts · experience.ts
```

Shared `Modal` replaces duplicate ProjectModal/ExperienceModal shells.
Minimal `useReveal` hook (IntersectionObserver fade+rise) replaces over-general Reveal.

## Deletions (each explainable)

1. `zod` dependency — zero imports anywhere.
2. Tailwind deps + plugin — replaced by single CSS system above.
3. `texture`/`spotlight`/`logoStyle` fields in projects.ts — never rendered by any
   component and point to files that do not exist (no public/textures/, no
   spotlight*.png). Recoverable from git history.
4. ~150 lines dead CSS: .reveal/.visible/.reveal-delay-*, .stagger-children,
   blob-morph/amoeba/gradient-shift/blob-rotate/float keyframes, unused sphere-orbit
   variants, .font-body.
5. Trivial memoization: static-array useMemo in About, memo() wrappers on prop-less
   components.
6. Duplicate modal shells → shared Modal.
7. Emoji-laden placeholder copy → tasteful rewrite.
8. Stale README claims + wrong package.json homepage URL fixed.

Kept intentionally: prettier + gh-pages (devDependencies), eslint + CI.yml + CD.yml,
EmailJS inline creds, Randomfavicon.js + favicon set, hits.sh badge, all banners/
logos/social/work assets, CNAME.

## Security posture

- Form inputs validated client-side (trim, length caps) before EmailJS send.
- rel="noopener noreferrer" audited on all external links.
- No dangerouslySetInnerHTML; no secrets beyond EmailJS public identifiers (public-by-design).
- Pragmatic CSP meta documented with its tradeoffs (inline guard script requires
  unsafe-inline allowance; noted honestly rather than faked strictness).

## Responsiveness & performance

- Fluid clamp() type; breakpoints 900/720/480; verified at 320px width.
- Bento grid 4→2→1 columns; icon-only controls ≤720px; full-width hero CTAs mobile.
- ≥44px touch targets; safe-area insets for fixed chrome; viewport-fit=cover.
- prefers-reduced-motion: ambient animations disabled, reveals instant, parallax and
  pet skipped, theme reveal bypassed.
- Fonts preconnected + swap; images lazy with dimensions; confetti canvas unmounted
  when idle; three.js isolated in lazy chunk so it never loads unless approached.
- Targets: Lighthouse ≥90 mobile; no layout shift from fonts/images.

## Verification

- `npm run lint`, `tsc -b`, `npm run build` all clean.
- Manual matrix: Chrome desktop + 320/768/1280 widths × 3 themes × reduced-motion.
- Dev server started; report port to user.
