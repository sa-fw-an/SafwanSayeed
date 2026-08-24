export type ThemeName = "paper" | "midnight" | "matcha";
export const THEMES: ThemeName[] = ["paper", "midnight", "matcha"];
const KEY = "portfolio-theme";

/**
 * Theme swap with a circular reveal expanding from whatever the user clicked
 * — same choreography as the Birthday site: CSS-var-driven keyframes over
 * the View Transitions API, 650ms ease-out. Falls back to an equivalent
 * manual overlay where the API is missing, and to an instant swap under
 * reduced motion.
 */
const REVEAL_CLASS = "theme-reveal";
const REVEAL_MS = 650;

let revealSeq = 0;

export function currentTheme(): ThemeName {
  const t = document.documentElement.dataset.theme;
  return THEMES.includes(t as ThemeName) ? (t as ThemeName) : "paper";
}

function persist(theme: ThemeName) {
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // Storage unavailable (private mode etc.) — theme applies for this session only.
  }
}

function commit(theme: ThemeName) {
  document.documentElement.dataset.theme = theme;
  persist(theme);
  window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
}

/** Radius from the origin point to the farthest viewport corner. */
function cornerRadius(x: number, y: number) {
  const { innerWidth: w, innerHeight: h } = window;
  return Math.max(
    Math.hypot(x, y),
    Math.hypot(w - x, y),
    Math.hypot(x, h - y),
    Math.hypot(w - x, h - y),
  );
}

function setOriginVars(x: number, y: number) {
  const root = document.documentElement;
  root.style.setProperty("--reveal-x", `${x}px`);
  root.style.setProperty("--reveal-y", `${y}px`);
  root.style.setProperty("--reveal-radius", `${cornerRadius(x, y)}px`);
}

/** No View Transitions API: overlay disc that expands from the click point. */
function circleFallback(next: ThemeName, x: number, y: number) {
  const probe = document.createElement("div");
  probe.dataset.theme = next;
  probe.style.cssText = "position:absolute;visibility:hidden;";
  document.body.appendChild(probe);
  const newBg =
    getComputedStyle(probe).getPropertyValue("background-color") || "#ffc928";
  probe.remove();

  const r = cornerRadius(x, y);
  const veil = document.createElement("div");
  veil.style.cssText = `position:fixed;inset:0;z-index:9999;pointer-events:none;background:${newBg};`;
  document.body.appendChild(veil);
  veil
    .animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${r}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: REVEAL_MS,
        easing: "cubic-bezier(.22,1,.36,1)",
        fill: "forwards",
      },
    )
    .finished.then(() => commit(next))
    .then(
      () =>
        veil.animate({ opacity: [1, 0] }, { duration: 150, fill: "forwards" })
          .finished,
    )
    .then(() => veil.remove())
    .catch(() => {
      commit(next);
      veil.remove();
    });
}

/** Origin point of an element, falling back to viewport center. */
function originPoint(el?: HTMLElement | null) {
  if (!el) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

const RING_ID = "reveal-ring";

/**
 * Shockwave ring that rides exactly on the expanding circle's edge — the
 * new-theme layer is a live render, so a same-timing ring in the page sits
 * precisely on the clip boundary. This keeps even subtle swaps (paper ↔
 * matcha, both pale) clearly visible.
 */
function pulseRing(x: number, y: number, r: number) {
  let ring = document.getElementById(RING_ID);
  if (!ring) {
    ring = document.createElement("div");
    ring.id = RING_ID;
    ring.setAttribute("aria-hidden", "true");
    document.documentElement.appendChild(ring);
  }
  const d = r * 2;
  ring.style.cssText = `left:${x - r}px;top:${y - r}px;width:${d}px;height:${d}px;`;
  ring.classList.remove("reveal-ring--go");
  void ring.offsetWidth; // restart the animation
  ring.classList.add("reveal-ring--go");
}

/**
 * Swap the active theme with a circular reveal expanding from the clicked
 * element (Birthday-site choreography).
 */
export function applyTheme(next: ThemeName, originEl?: HTMLElement | null) {
  const reduced =
    typeof matchMedia !== "undefined" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reduced motion: instant swap. Missing API: manual disc with same feel.
  if (reduced) {
    commit(next);
    return;
  }
  if (!document.startViewTransition) {
    const { x, y } = originPoint(originEl);
    pulseRing(x, y, cornerRadius(x, y));
    circleFallback(next, x, y);
    return;
  }

  const root = document.documentElement;
  const { x, y } = originPoint(originEl);
  const radius = cornerRadius(x, y);

  // Re-trigger the keyframes cleanly on rapid consecutive swaps.
  revealSeq += 1;
  const seq = revealSeq;
  root.classList.remove(REVEAL_CLASS);
  setOriginVars(x, y);
  void root.offsetWidth; // flush styles so the animation restarts
  root.classList.add(REVEAL_CLASS);
  pulseRing(x, y, radius);

  const transition = document.startViewTransition(() => commit(next));
  transition.finished
    .finally(() => {
      if (revealSeq === seq) root.classList.remove(REVEAL_CLASS);
    })
    .catch(() => {});
}
