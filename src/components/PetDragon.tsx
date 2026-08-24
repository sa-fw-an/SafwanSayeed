import { useCallback, useEffect, useRef, useState } from "react";
import { burst } from "@/lib/confetti";
import { prefersReducedMotion } from "@/lib/device";

const LINES = [
  "dragons ship faster",
  "careful, pixels ahead",
  "hire this dragon",
  "free rides below deck",
  "still compiling…",
];

type Pass = {
  id: number;
  dir: 1 | -1;
  yFrac: number;
  amp: number;
  duration: number;
};

const rand = <T,>(xs: readonly T[]): T =>
  xs[Math.floor(Math.random() * xs.length)];

/**
 * Pixel-art studio dragon. Flies swooping passes over the page on a
 * randomized cadence — pure rAF transform writes, one element, no layout
 * cost. Skipped entirely under reduced motion.
 */
export function PetDragon() {
  const [pass, setPass] = useState<Pass | null>(null);
  const [line, setLine] = useState<string | null>(null);
  const elRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const bubbleTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let raf = 0;
    let startTime = 0;

    const spawn = () =>
      setPass({
        id: Date.now(),
        dir: Math.random() < 0.5 ? 1 : -1,
        yFrac: 0.18 + Math.random() * 0.45,
        amp: 30 + Math.random() * 70,
        duration: 9000 + Math.random() * 6000,
      });

    const tick = (now: number) => {
      if (!pass || !elRef.current) return;
      if (!startTime) startTime = now;
      const t = (now - startTime) / pass.duration;
      if (t >= 1) {
        elRef.current.style.opacity = "0";
        raf = 0;
        timer.current = window.setTimeout(spawn, 5000 + Math.random() * 9000);
        setPass(null);
        startTime = 0;
        return;
      }
      // ease-in-out across the screen + layered sine swoops
      const ease = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      const x = pass.dir === 1 ? ease * 108 - 4 : 104 - ease * 108;
      const y =
        pass.yFrac * 100 +
        Math.sin(t * Math.PI * 2 * 1.5) *
          (pass.amp / window.innerHeight) *
          100 +
        Math.sin(t * Math.PI * 2 * 4.3) * 0.6;
      const tilt =
        Math.cos(t * Math.PI * 2 * 1.5) *
        (pass.dir === 1 ? 8 : -8) *
        (pass.amp / 100);
      const el = elRef.current;
      el.style.opacity = "1";
      el.style.transform = `translate(${x}vw, ${y}vh) rotate(${tilt.toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };

    if (pass) {
      raf = requestAnimationFrame(tick);
    } else if (!timer.current) {
      timer.current = window.setTimeout(spawn, 2500);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(timer.current);
      timer.current = undefined;
    };
  }, [pass]);

  useEffect(() => () => window.clearTimeout(bubbleTimer.current), []);

  const onClick = useCallback((e: React.MouseEvent) => {
    burst(e.clientX, e.clientY, 60);
    setLine(rand(LINES));
    window.clearTimeout(bubbleTimer.current);
    bubbleTimer.current = window.setTimeout(() => setLine(null), 2600);
  }, []);

  if (!pass || prefersReducedMotion()) return null;

  return (
    <div
      key={pass.id}
      ref={elRef}
      className="dragon"
      style={{ opacity: 0 }}
      role="presentation"
    >
      {line && <span className="dragon__bubble">{line}</span>}
      {!line && <span className="dragon__hint">CLICK ME!</span>}
      <button
        type="button"
        className={`dragon__btn${pass.dir === -1 ? " dragon__btn--flip" : ""}`}
        aria-label="A pixel dragon — click it"
        onClick={onClick}
      >
        <DragonSprite />
      </button>
    </div>
  );
}

const P = 5; // pixel size

function Px({
  x,
  y,
  c,
  w = 1,
  h = 1,
}: {
  x: number;
  y: number;
  c: string;
  w?: number;
  h?: number;
}) {
  return <rect x={x * P} y={y * P} width={w * P} height={h * P} fill={c} />;
}

function DragonSprite() {
  // Palette flows from the active theme via CSS custom properties.
  const BODY = "var(--pet-body)";
  const SHADE = "var(--pet-shade)";
  const BELLY = "var(--pet-belly)";
  const WING = "var(--pet-wing)";
  const MEM = "var(--pet-membrane)";
  const BONE = "var(--pet-bone)";

  return (
    <svg
      width={P * 20}
      height={P * 14}
      viewBox={`0 0 ${P * 20} ${P * 14}`}
      aria-hidden="true"
    >
      {/* ===== wings — two flap frames toggled by steps() ===== */}
      <g className="dragon__wing dragon__wing--up">
        <Px x={5} y={1} c={MEM} w={8} h={2} />
        <Px x={4} y={3} c={WING} w={7} h={2} />
        <Px x={6} y={0} c={BONE} w={1} h={2} />
        <Px x={9} y={0} c={BONE} w={1} h={1} />
        <Px x={12} y={2} c={SHADE} w={1} h={2} />
      </g>
      <g className="dragon__wing dragon__wing--down">
        <Px x={4} y={10} c={WING} w={8} h={2} />
        <Px x={3} y={12} c={MEM} w={6} h={1} />
        <Px x={11} y={11} c={SHADE} w={1} h={2} />
      </g>

      {/* ===== tail — curls down and back up ===== */}
      <Px x={4} y={8} c={SHADE} w={2} h={2} />
      <Px x={3} y={10} c={BODY} w={2} h={2} />
      <Px x={2} y={11} c={BODY} w={2} h={1} />
      <Px x={1} y={10} c={BODY} w={2} h={2} />
      <Px x={1} y={9} c={BELLY} />
      {/* tail spike */}
      <Px x={0} y={9} c={BONE} />

      {/* ===== body ===== */}
      <Px x={5} y={5} c={SHADE} w={9} h={5} />
      <Px x={5} y={6} c={BODY} w={9} h={3} />
      {/* belly plates */}
      <Px x={6} y={8} c={BELLY} w={7} h={1} />
      <Px x={7} y={9} c={BELLY} w={4} h={1} />
      {/* white spike row along the spine */}
      <Px x={6} y={4} c={BONE} />
      <Px x={8} y={4} c={BONE} />
      <Px x={10} y={4} c={BONE} />

      {/* tucked legs + claws */}
      <Px x={7} y={10} c={SHADE} w={2} h={2} />
      <Px x={10} y={10} c={SHADE} w={2} h={2} />
      <Px x={7} y={12} c={BONE} />
      <Px x={11} y={12} c={BONE} />

      {/* ===== neck — arches up toward the head ===== */}
      <Px x={13} y={3} c={SHADE} w={3} h={4} />
      <Px x={13} y={4} c={BODY} w={3} h={2} />
      <Px x={13} y={6} c={BELLY} w={2} h={1} />
      {/* neck spikes */}
      <Px x={13} y={2} c={BONE} />
      <Px x={15} y={2} c={BONE} />

      {/* ===== head — open jaw, teeth, brow ===== */}
      <Px x={15} y={1} c={SHADE} w={4} h={3} />
      <Px x={16} y={1} c={BODY} w={3} h={2} />
      {/* snout tip */}
      <Px x={18} y={2} c={BODY} w={1} h={1} />
      {/* horns sweeping back */}
      <Px x={14} y={0} c={BONE} w={2} h={1} />
      <Px x={13} y={1} c={BONE} />
      {/* eye: gold sclera, dark pupil */}
      <Px x={17} y={2} c="#ffc928" />
      <Px x={17} y={2} c="var(--ink)" w={1} h={1} />
      {/* open jaw gap */}
      <Px x={16} y={3} c="#5f0e0a" w={3} h={1} />
      {/* upper teeth */}
      <Px x={16} y={3} c={BONE} />
      <Px x={18} y={3} c={BONE} />
      {/* lower jaw */}
      <Px x={15} y={4} c={SHADE} w={3} h={1} />
      <Px x={17} y={4} c={BODY} w={1} h={1} />
      <Px x={15} y={4} c={BONE} />

      {/* flame puff at the mouth */}
      <g className="dragon__flame">
        <Px x={19} y={3} c="#ff9a5c" />
        <Px x={19} y={4} c="#ffc928" />
      </g>
    </svg>
  );
}
