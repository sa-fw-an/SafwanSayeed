type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  color: string;
  shape: "rect" | "circle" | "heart" | "star";
  life: number;
  maxLife: number;
};

const GRAVITY = 0.13;
const DRAG = 0.99;

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let rafId = 0;

function palette(): string[] {
  const styles = getComputedStyle(document.documentElement);
  const read = (v: string) => styles.getPropertyValue(v).trim() || "#ffc928";
  return [
    read("--pop"),
    read("--accent"),
    read("--mint"),
    read("--rose"),
    "#ffffff",
  ];
}

function setupCanvas() {
  if (canvas) return;
  canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:90;";
  document.body.appendChild(canvas);
  ctx = canvas.getContext("2d");
  resize();
  window.addEventListener("resize", resize);
}

function resize() {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawHeart(
  c: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  rot: number,
) {
  c.save();
  c.translate(x, y);
  c.rotate(rot);
  c.beginPath();
  c.moveTo(0, s * 0.35);
  c.bezierCurveTo(s, -s * 0.45, s * 1.9, s * 0.55, 0, s * 1.6);
  c.bezierCurveTo(-s * 1.9, s * 0.55, -s, -s * 0.45, 0, s * 0.35);
  c.fill();
  c.restore();
}

function drawStar(
  c: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
  rot: number,
) {
  c.save();
  c.translate(x, y);
  c.rotate(rot);
  c.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? s : s * 0.45;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    c.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  c.closePath();
  c.fill();
  c.restore();
}

function tick() {
  if (!ctx || !canvas) return;
  const c = ctx;
  c.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter((p) => {
    p.life++;
    p.vy += GRAVITY;
    p.vx *= DRAG;
    p.vy *= DRAG;
    p.x += p.vx + Math.sin(p.life * 0.08) * 0.6;
    p.y += p.vy;
    p.rot += p.vr;
    const fadeStart = p.maxLife * 0.72;
    if (p.life > fadeStart) {
      c.globalAlpha = Math.max(
        0,
        1 - (p.life - fadeStart) / (p.maxLife - fadeStart),
      );
    }
    c.fillStyle = p.color;
    if (p.shape === "circle") {
      c.beginPath();
      c.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
      c.fill();
    } else if (p.shape === "heart") {
      drawHeart(c, p.x, p.y, p.size / 2, p.rot);
    } else if (p.shape === "star") {
      drawStar(c, p.x, p.y, p.size / 2, p.rot);
    } else {
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rot);
      c.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      c.restore();
    }
    c.globalAlpha = 1;
    return p.life < p.maxLife && p.y < window.innerHeight + 60;
  });
  if (particles.length === 0) {
    teardown();
    return;
  }
  rafId = requestAnimationFrame(tick);
}

function teardown() {
  cancelAnimationFrame(rafId);
  particles = [];
  window.removeEventListener("resize", resize);
  canvas?.remove();
  canvas = null;
  ctx = null;
}

function spawn(
  count: number,
  origin: { x: number; y: number },
  opts: { power: number; heartsOnly?: boolean },
) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  setupCanvas();
  const colors = palette();
  const shapes: Particle["shape"][] = opts.heartsOnly
    ? ["heart"]
    : ["rect", "circle", "heart", "star"];
  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
    const speed = opts.power * (0.5 + Math.random());
    particles.push({
      x: origin.x,
      y: origin.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 6 + Math.random() * 8,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      life: 0,
      maxLife: 130 + Math.random() * 70,
    });
  }
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(tick);
}

export function burst(x: number, y: number, count = 90) {
  spawn(count, { x, y }, { power: 11 });
}

export function burstHearts(x: number, y: number, count = 26) {
  spawn(count, { x, y }, { power: 9, heartsOnly: true });
}
