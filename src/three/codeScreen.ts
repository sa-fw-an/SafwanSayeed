import * as THREE from "three";

/**
 * Live-typed "code editor" screen rendered to a canvas — replaces v2's
 * 15 MB video texture with zero network payload while keeping the monitor
 * feeling alive.
 */
export class CodeScreen {
  readonly texture: THREE.CanvasTexture;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private lines: string[] = [];
  private queue: string[] = [];
  private acc = 0;

  private static SCRIPT = [
    "const ship = async () => {",
    "  await tests.run({ fearless: true });",
    "  // TODO: fix the fix",
    "  return deploy('main');",
    "}",
    "",
    "npm run build ✓ 3.2s",
    "git push origin main",
    "// it works on my machine™",
    "review.approved(by: 'safwan')",
    "docker compose up -d",
    "✓ 42 tests passed",
    "cargo: coffee, refilled",
  ];

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 512;
    this.canvas.height = 320;
    this.ctx = this.canvas.getContext("2d")!;
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.magFilter = THREE.NearestFilter;
    this.texture.generateMipmaps = false;
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.draw();
  }

  /** Advance the typing animation; call every frame, throttled internally. */
  update(delta: number) {
    this.acc += delta;
    if (this.acc < 0.14) return;
    this.acc = 0;

    if (this.queue.length === 0 && Math.random() < 0.06) {
      this.queue = [...CodeScreen.SCRIPT]
        .sort(() => Math.random() - 0.5)
        .slice(0, 9);
      this.lines = [];
    }
    if (this.queue.length > 0) {
      this.lines.push(this.queue.shift()!);
      if (this.lines.length > 9) this.lines.shift();
      this.draw();
    } else {
      this.draw(); // keep cursor blinking
    }
  }

  private draw() {
    const c = this.ctx;
    c.fillStyle = "#0d1117";
    c.fillRect(0, 0, 512, 320);

    // traffic lights
    ["#ff5f56", "#ffbd2e", "#27c93f"].forEach((col, i) => {
      c.fillStyle = col;
      c.beginPath();
      c.arc(24 + i * 26, 22, 7, 0, Math.PI * 2);
      c.fill();
    });
    c.fillStyle = "#8b949e";
    c.font = "600 16px monospace";
    c.fillText("main.ts — portfolio", 110, 28);

    const colors = ["#79c0ff", "#a5d6ff", "#ffa657", "#7ee787", "#d2a8ff"];
    this.lines.forEach((line, i) => {
      c.fillStyle = colors[i % colors.length];
      c.fillText(line, 20, 64 + i * 26);
    });

    // blinking caret on the next line
    const caretOn = Math.floor(Date.now() / 500) % 2 === 0;
    if (caretOn) {
      c.fillStyle = "#7ee787";
      c.fillRect(20, 64 + this.lines.length * 26 - 14, 12, 20);
    }

    this.texture.needsUpdate = true;
  }
}
