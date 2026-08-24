export type Tier = "low" | "medium" | "high";

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Device capability tier. "low" skips WebGL entirely (CSS fallback instead). */
export function detectTier(): Tier {
  if (typeof navigator === "undefined") return "medium";
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 4;
  const mem = nav.deviceMemory ?? 4;
  if (mem <= 2 || cores <= 2) return "low";
  if (mem <= 4 || cores <= 4) return "medium";
  return "high";
}

export function dprFor(tier: Tier): number {
  const dpr = window.devicePixelRatio || 1;
  const cap = tier === "high" ? 1.5 : tier === "medium" ? 1 : 0.75;
  return Math.min(dpr, cap);
}
