import { useState } from "react";
import { profile } from "@/data/profile";
import { projects, type Project } from "@/data/projects";
import { skills, marqueeRows } from "@/data/skills";
import { Ticker } from "@/components/Ticker";
import { Marquee } from "@/components/Marquee";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ProjectGrid";
import { Modal } from "@/components/ui/Modal";
import { useRouter } from "@/lib/router";

const FEATURED_IDS = [1, 2];
const featured = FEATURED_IDS.map((id) =>
  projects.find((p) => p.id === id),
).filter((p): p is Project => Boolean(p));

export default function HomePage() {
  const { navigate } = useRouter();
  const [selected, setSelected] = useState<Project | null>(null);
  const letters = [...profile.name];
  const [rowA, rowB] = marqueeRows();

  const skillChips = (row: typeof rowA) =>
    row.map((s) => (
      <span className="skill-chip chip" key={s.name}>
        <img src={s.path} alt="" width="20" height="20" loading="lazy" />
        {s.name}
      </span>
    ));

  return (
    <>
      <section className="hero section">
        <div className="shell hero__inner">
          <div className="hero__copy">
            <span className="stamp hero__eyebrow">{profile.eyebrow}</span>
            <h1 className="display hero__name" aria-label={profile.name}>
              {letters.map((ch, i) => (
                <span
                  key={`${ch}-${i}`}
                  aria-hidden="true"
                  className="hero__letter"
                  style={{ animationDelay: `${i * 55}ms` }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h1>
            <p className="hand hero__tagline">
              {profile.tagline}
              <svg
                className="hero__underline"
                viewBox="0 0 220 14"
                aria-hidden="true"
              >
                <path
                  d="M4 10 C 60 2, 150 12, 216 5"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  pathLength="100"
                />
              </svg>
            </p>
            <p className="hero__intro">{profile.intro}</p>
            <div className="hero__ctas">
              <Button variant="accent" onClick={() => navigate("/work")}>
                See the Work
              </Button>
              <Button variant="ghost" onClick={() => navigate("/studio")}>
                Tour the Studio
              </Button>
            </div>
          </div>

          <div className="hero__side" aria-hidden="true">
            <RotatingBadge />
            <div className="hero__sticker stamp">est. bangalore</div>
            <div className="hero__sticker stamp">ships on fridays</div>
          </div>
        </div>
      </section>

      <Ticker />

      <section className="section">
        <div className="shell">
          <ul className="stat-strip" aria-label="Quick stats">
            <li className="card stat">
              <strong className="display stat__num stat__num--word">
                Countless
              </strong>
              <span>projects shipped</span>
            </li>
            <li className="card stat">
              <strong className="display stat__num">{skills.length}</strong>
              <span>tools in the belt</span>
            </li>
            <li className="card stat">
              <strong className="display stat__num">'25</strong>
              <span>GSoC contributor</span>
            </li>
            <li className="card stat">
              <strong className="display stat__num stat__num--word">
                Way too many
              </strong>
              <span>AI tokens consumed</span>
            </li>
          </ul>

          <div className="home-featured__head">
            <h2 className="display title-pop home-featured__title">
              Fresh out of the oven
            </h2>
            <Button variant="pop" onClick={() => navigate("/work")}>
              All projects →
            </Button>
          </div>
          <div className="home-featured">
            {featured.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                slot="bento__cell--wide"
                onOpen={() => setSelected(p)}
              />
            ))}
          </div>

          <div className="toolbox home-toolbox">
            <h2 className="display title-pop toolbox__title">The Toolbox</h2>
            <p className="eyebrow toolbox__label">
              {skills.length} things I've broken and fixed
            </p>
          </div>
          <div className="toolbox__rows home-toolbox__rows">
            <Marquee items={skillChips(rowA)} />
            <Marquee reverse duration={44} items={skillChips(rowB)} />
            <Button
              variant="ghost"
              className="toolbox__more"
              onClick={() => navigate("/journey")}
            >
              Full journey →
            </Button>
          </div>

          <button
            type="button"
            className="card studio-teaser"
            onClick={() => navigate("/studio")}
          >
            <svg
              className="studio-teaser__fish"
              viewBox="0 0 48 32"
              aria-hidden="true"
            >
              <path
                d="M4 16 C 12 6, 30 6, 40 16 C 30 26, 12 26, 4 16 Z M40 16 L 46 9 L 46 23 Z"
                fill="var(--rose)"
                stroke="var(--edge)"
                strokeWidth="2.5"
              />
              <circle cx="14" cy="14" r="2.2" fill="var(--edge)" />
            </svg>
            <span className="studio-teaser__text">
              <span className="display studio-teaser__title">
                There's a 3D room down here.
              </span>
              <span className="hand studio-teaser__sub">
                yes, there's a fish — drag it around, click everything
              </span>
            </span>
            <span className="btn btn--accent" aria-hidden="true">
              Enter ↘
            </span>
          </button>
        </div>
      </section>

      {selected && (
        <Modal
          open
          onClose={() => setSelected(null)}
          labelledBy={`project-${selected.id}`}
        >
          <article>
            <header className="modal__head">
              {selected.logo && (
                <img
                  src={selected.logo}
                  alt=""
                  width="52"
                  height="52"
                  className="modal__logo"
                />
              )}
              <h3
                id={`project-${selected.id}`}
                className="display modal__title"
              >
                {selected.title}
              </h3>
            </header>
            <img src={selected.banner} alt="" className="modal__banner" />
            <p className="modal__desc">{selected.desc}</p>
            <p className="modal__subdesc">{selected.subdesc}</p>
            <footer className="modal__actions">
              <Button
                href={selected.href}
                variant="accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub ↗
              </Button>
            </footer>
          </article>
        </Modal>
      )}
    </>
  );
}

function RotatingBadge() {
  return (
    <svg className="hero__badge" viewBox="0 0 120 120" role="presentation">
      <defs>
        <path
          id="badge-circle"
          d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
        />
      </defs>
      <circle
        cx="60"
        cy="60"
        r="56"
        fill="var(--pop)"
        stroke="var(--edge)"
        strokeWidth="3"
      />
      <g className="hero__badge-spin">
        <text
          className="hero__badge-text"
          textLength="268"
          lengthAdjust="spacingAndGlyphs"
        >
          <textPath href="#badge-circle">OPEN TO WORK ✦ LET'S BUILD ✦</textPath>
        </text>
      </g>
      <text
        x="60"
        y="70"
        textAnchor="middle"
        className="display hero__badge-center"
      >
        ★
      </text>
    </svg>
  );
}
