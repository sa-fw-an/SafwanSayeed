import { useEffect, useState } from "react";
import { ROUTES, useRouter, type Route } from "@/lib/router";
import { cn } from "@/lib/cn";

const LABELS: Record<Route, string> = {
  "/": "Home",
  "/work": "Work",
  "/journey": "Journey",
  "/studio": "Studio",
  "/contact": "Contact",
};

export function Navbar() {
  const { route, navigate } = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    // Freeze the page behind the fullscreen menu.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const go = (to: Route) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate(to);
  };

  return (
    <>
      <header className="navbar navbar--solid">
        <div className="shell navbar__inner">
          <a
            href="#/"
            className="navbar__logo display"
            onClick={go("/")}
            aria-label="Home"
          >
            SS<span className="navbar__logo-dot">.</span>
          </a>
          <nav className="navbar__links" aria-label="Primary">
            {ROUTES.map((r) => (
              <a
                key={r}
                href={`#${r}`}
                className={cn(
                  "navbar__link display",
                  route === r && "is-active",
                )}
                aria-current={route === r ? "page" : undefined}
                onClick={go(r)}
              >
                {LABELS[r]}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className={cn("navbar__burger", open && "is-open")}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {open && (
        <div className="mobile-menu" role="dialog" aria-label="Navigation menu">
          {ROUTES.map((r, i) => (
            <a
              key={r}
              href={`#${r}`}
              className={cn(
                "mobile-menu__link display",
                route === r && "is-active",
              )}
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={go(r)}
            >
              {LABELS[r]}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
