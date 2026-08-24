import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/device";

type Shape = {
  kind: "heart" | "star" | "ring" | "bolt";
  left: string;
  top: string;
  size: number;
  speed: number;
  color: string;
};

const SHAPES: Shape[] = [
  {
    kind: "star",
    left: "6%",
    top: "12%",
    size: 34,
    speed: 0.14,
    color: "var(--pop)",
  },
  {
    kind: "heart",
    left: "88%",
    top: "18%",
    size: 30,
    speed: 0.22,
    color: "var(--rose)",
  },
  {
    kind: "ring",
    left: "10%",
    top: "62%",
    size: 26,
    speed: 0.1,
    color: "var(--mint)",
  },
  {
    kind: "bolt",
    left: "92%",
    top: "58%",
    size: 28,
    speed: 0.3,
    color: "var(--pop)",
  },
  {
    kind: "star",
    left: "48%",
    top: "8%",
    size: 22,
    speed: 0.18,
    color: "var(--accent)",
  },
  {
    kind: "heart",
    left: "70%",
    top: "82%",
    size: 26,
    speed: 0.26,
    color: "var(--mint)",
  },
];

function ShapeSvg({ kind, color }: { kind: Shape["kind"]; color: string }) {
  switch (kind) {
    case "heart":
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
          <path
            d="M12 21C5 16 2 11.5 2 7.8 2 4.9 4.3 3 6.8 3 8.9 3 10.9 4.3 12 6 13.1 4.3 15.1 3 17.2 3 19.7 3 22 4.9 22 7.8c0 3.7-3 8.2-10 13.2z"
            fill={color}
            stroke="var(--edge)"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
          <path
            d="M12 2l2.6 6.3L21 9l-5 4.4L17.5 20 12 16.5 6.5 20 8 13.4 3 9l6.4-.7z"
            fill={color}
            stroke="var(--edge)"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "ring":
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
          <circle
            cx="12"
            cy="12"
            r="8"
            fill="none"
            stroke={color}
            strokeWidth="4"
          />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
          <path
            d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
            fill={color}
            stroke="var(--edge)"
            strokeWidth="1.5"
          />
        </svg>
      );
  }
}

/**
 * Fixed decorative field behind all content. Shapes drift with scroll
 * via transform-only writes in a single rAF-throttled listener.
 */
export function ParallaxField() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const els = document.querySelectorAll<HTMLElement>("[data-parallax-speed]");
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      els.forEach((el) => {
        const s = Number(el.dataset.parallaxSpeed ?? 0.2);
        el.style.transform = `translateY(${y * s}px) rotate(${y * s * 0.08}deg)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="parallax-field" aria-hidden="true">
      {SHAPES.map((s, i) => (
        <span
          key={i}
          className={`parallax-field__slot float-${["a", "b", "c"][i % 3]}`}
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
        >
          <span data-parallax-speed={s.speed} className="parallax-field__shape">
            <ShapeSvg kind={s.kind} color={s.color} />
          </span>
        </span>
      ))}
    </div>
  );
}
