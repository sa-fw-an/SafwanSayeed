import { describe, expect, it } from "vitest";
import { revealVars } from "../theme";

/**
 * Regression guard for the HiDPI reveal-origin bug.
 *
 * Chromium sizes the ::view-transition pseudo-element's box in device pixels
 * while a clip-path length is in CSS pixels, so a px origin lands at 1/dpr of
 * the intended spot — and a px-based implementation still looks perfect on a
 * dpr-1 machine. The unit assertion is the only thing that actually catches it.
 */
describe("revealVars", () => {
  const W = 1126;
  const H = 800;

  it("emits every value as a percentage, never px/vw/vh", () => {
    const v = revealVars(915, 32, W, H);
    for (const value of [v.x, v.y, v.radius]) {
      expect(value).toMatch(/%$/);
      expect(value).not.toMatch(/px|vw|vh/);
    }
  });

  it("puts the origin at the click point's share of the viewport", () => {
    const v = revealVars(915, 32, W, H);
    expect(v.x).toBe(`${(915 / W) * 100}%`);
    expect(v.y).toBe(`${(32 / H) * 100}%`);
  });

  it("centres correctly regardless of viewport size", () => {
    for (const [w, h] of [
      [1126, 800],
      [390, 844],
      [2560, 1440],
    ]) {
      const v = revealVars(w / 2, h / 2, w, h);
      expect(v.x).toBe("50%");
      expect(v.y).toBe("50%");
    }
  });

  it("scales the radius against sqrt(w^2+h^2)/sqrt(2), so it reaches the farthest corner", () => {
    // A circle() percentage radius resolves against that reference length.
    const reference = Math.hypot(W, H) / Math.SQRT2;
    // Origin in a corner: farthest corner is the full diagonal.
    const corner = revealVars(0, 0, W, H);
    expect(parseFloat(corner.radius)).toBeCloseTo(
      (Math.hypot(W, H) / reference) * 100,
      6,
    );

    // Centre origin: farthest corner is half the diagonal.
    const centre = revealVars(W / 2, H / 2, W, H);
    expect(parseFloat(centre.radius)).toBeCloseTo(
      (Math.hypot(W, H) / 2 / reference) * 100,
      6,
    );

    // Never smaller than full coverage of the viewport from that point.
    expect(parseFloat(corner.radius)).toBeGreaterThan(
      parseFloat(centre.radius),
    );
  });

  it("stays within the 150% CSS fallback default in the worst case", () => {
    // tokens.css defaults --reveal-radius to 150%; a corner origin is the
    // largest a real reveal ever gets (sqrt(2) = 141.4%).
    expect(parseFloat(revealVars(0, 0, W, H).radius)).toBeLessThan(150);
    expect(parseFloat(revealVars(W, H, W, H).radius)).toBeLessThan(150);
  });
});
