import { useEffect, useRef, useState } from "react";
import { THEMES, applyTheme, currentTheme, type ThemeName } from "@/lib/theme";
import { cn } from "@/lib/cn";

const META: Record<
  ThemeName,
  { glyph: string; label: string; hint: string; swatch: [string, string] }
> = {
  paper: {
    glyph: "☀",
    label: "Paper",
    hint: "warm daylight",
    swatch: ["#f6e7c8", "#b82e0b"],
  },
  midnight: {
    glyph: "☾",
    label: "Midnight",
    hint: "after dark",
    swatch: ["#061923", "#ff9a5c"],
  },
  matcha: {
    glyph: "❋",
    label: "Matcha",
    hint: "fresh mint",
    swatch: ["#e8efd9", "#2e6e4e"],
  },
};

/** Labeled theme picker with a reveal panel — no mystery swatch dots. */
export function ThemeSwitcher() {
  const [active, setActive] = useState<ThemeName>(currentTheme());
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onOutside);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onOutside);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick =
    (theme: ThemeName) => (e: React.MouseEvent<HTMLButtonElement>) => {
      setActive(theme);
      applyTheme(theme, e.currentTarget);
      setOpen(false);
    };

  return (
    <div className="theme-picker" ref={rootRef}>
      <button
        type="button"
        className="btn btn--pop theme-picker__toggle"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen(!open)}
      >
        <span aria-hidden="true">{META[active].glyph}</span>
        <span className="theme-picker__label">{META[active].label}</span>
        <span className="theme-picker__chev" aria-hidden="true">
          {open ? "▴" : "▾"}
        </span>
      </button>

      {open && (
        <ul
          className="card theme-picker__panel"
          role="listbox"
          aria-label="Color theme"
        >
          {THEMES.map((t) => (
            <li key={t} role="option" aria-selected={active === t}>
              <button
                type="button"
                className={cn("theme-picker__row", active === t && "is-active")}
                onClick={pick(t)}
              >
                <span className="theme-picker__swatches" aria-hidden="true">
                  <i style={{ background: META[t].swatch[0] }} />
                  <i style={{ background: META[t].swatch[1] }} />
                </span>
                <span className="theme-picker__name">
                  <strong>{META[t].label}</strong>
                  <small>{META[t].hint}</small>
                </span>
                <span className="theme-picker__check" aria-hidden="true">
                  {active === t ? "✓" : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
