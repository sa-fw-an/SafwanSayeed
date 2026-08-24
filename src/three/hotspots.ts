import type * as THREE from "three";

/** Clickable room parts and the nonsense they say. */
export const HOTSPOT_FACTS: Record<string, string> = {
  fish: "Captain Bubbles. Runs the deploy pipeline.",
  aquarium: "Open-plan office for one very busy fish.",
  chair: "Ergonomically rotated 4π during construction.",
  computer: "Where the magic (and the Stack Overflow) happens.",
  screen: "Live footage of me shipping.",
  cube: "The original mascot. It spins when nobody watches.",
  mailbox: "SLA: replies within 3–5 business naps.",
  lamp: "Provides 100% of the ambient motivation.",
  flower1: "Watered with leftover cold brew.",
  flower2: "The resilient one. Somehow thriving.",
};

const KEYWORDS = Object.keys(HOTSPOT_FACTS);

/**
 * Walk up the parent chain from a hit object until a name matches a
 * hotspot keyword; returns the fact key or null.
 */
export function factKeyFor(obj: THREE.Object3D | null): string | null {
  let node: THREE.Object3D | null = obj;
  while (node) {
    const lc = (node.name || "").toLowerCase();
    const key = KEYWORDS.find((k) => lc.includes(k));
    if (key) return key;
    node = node.parent;
  }
  return null;
}
