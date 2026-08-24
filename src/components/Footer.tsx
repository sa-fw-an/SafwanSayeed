import { profile, socialLinks } from "@/data/profile";
import { ROUTES, useRouter, type Route } from "@/lib/router";

const LABELS: Record<Route, string> = {
  "/": "Home",
  "/work": "Work",
  "/journey": "Journey",
  "/studio": "Studio",
  "/contact": "Contact",
};

const FOOTER_TICKER = [
  "Thanks for scrolling",
  "See you in the inbox",
  "Open to work",
  "Ship something cool today",
];

export function Footer() {
  const { navigate } = useRouter();

  const go = (r: Route) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(r);
  };

  return (
    <footer className="footer">
      <div className="footer-ticker" aria-hidden="true">
        <div className="footer-ticker__track">
          {[0, 1].map((half) => (
            <span className="footer-ticker__group" key={half}>
              {FOOTER_TICKER.map((t) => (
                <span
                  className="footer-ticker__item display"
                  key={`${half}-${t}`}
                >
                  {t} <span className="footer-ticker__star">★</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="shell footer__grid">
        <div className="footer__brand">
          <p className="display footer__logo">
            SS<span>.</span>
          </p>
          <p className="hand footer__sub">
            built with too much coffee and just enough sleep
          </p>
          <span className="stamp footer__loc">📍 {profile.location}</span>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h3 className="eyebrow footer__head">Sitemap</h3>
          <ul className="footer__list">
            {ROUTES.map((r) => (
              <li key={r}>
                <a href={`#${r}`} className="footer__link" onClick={go(r)}>
                  {LABELS[r]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h3 className="eyebrow footer__head">Elsewhere</h3>
          <ul className="footer__list">
            {socialLinks.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__link footer__link--social"
                >
                  <img
                    src={s.icon}
                    alt=""
                    width="16"
                    height="16"
                    loading="lazy"
                  />
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="eyebrow footer__head">Say hello</h3>
          <a href={`mailto:${profile.email}`} className="footer__mail hand">
            {profile.email}
          </a>
          <img
            className="footer__hits"
            src="https://hits.sh/safwansayeed.live.svg?style=flat&label=Views&color=E07A5F&labelColor=252525"
            alt="View count"
            width="120"
            height="20"
            loading="lazy"
          />
        </div>
      </div>

      <div className="shell footer__bar">
        <p className="footer__copy eyebrow">
          © {new Date().getFullYear()} Safwan Sayeed
        </p>
        <button
          type="button"
          className="btn btn--icon footer__top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      </div>
    </footer>
  );
}
