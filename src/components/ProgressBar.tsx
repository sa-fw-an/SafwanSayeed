import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/device";

/** Fixed top progress bar driven by the --sp custom property (0 → 1). */
export function ProgressBar() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--sp",
        max > 0 ? String(window.scrollY / max) : "0",
      );
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="progress-bar" aria-hidden="true">
      <div className="progress-bar__fill">
        <span className="progress-bar__knob" />
      </div>
    </div>
  );
}
