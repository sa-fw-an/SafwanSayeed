import { useState } from "react";
import { experiences, type Experience } from "@/data/experience";
import { Modal } from "@/components/ui/Modal";

export function Timeline() {
  const [selected, setSelected] = useState<Experience | null>(null);

  return (
    <>
      <div className="timeline">
        {experiences.map((exp) => (
          <article key={exp.id} className="timeline__item">
            <span className="timeline__node" aria-hidden="true" />
            <button
              type="button"
              className="card ticket"
              onClick={() => setSelected(exp)}
            >
              <span className="ticket__logo-wrap">
                <img
                  src={exp.logo}
                  alt=""
                  width="48"
                  height="48"
                  loading="lazy"
                  className="ticket__logo"
                />
              </span>
              <span className="ticket__main">
                <span className="display ticket__company">{exp.company}</span>
                <span className="ticket__role">{exp.role}</span>
                <span className="chip chip--mini ticket__duration">
                  {exp.duration}
                </span>
                <span className="ticket__desc">{exp.description}</span>
                <span className="ticket__skills">
                  {exp.skills.slice(0, 4).map((s) => (
                    <span key={s} className="chip chip--mini">
                      {s}
                    </span>
                  ))}
                  {exp.skills.length > 4 && (
                    <span className="chip chip--mini">
                      +{exp.skills.length - 4}
                    </span>
                  )}
                </span>
              </span>
            </button>
          </article>
        ))}
      </div>

      {selected && (
        <Modal
          open
          onClose={() => setSelected(null)}
          labelledBy={`exp-${selected.id}`}
        >
          <article>
            <header className="modal__head">
              <img
                src={selected.logo}
                alt=""
                width="52"
                height="52"
                className="modal__logo"
              />
              <div>
                <h3 id={`exp-${selected.id}`} className="display modal__title">
                  {selected.company}
                </h3>
                <p className="modal__role">{selected.role}</p>
                <p className="eyebrow">{selected.duration}</p>
              </div>
            </header>
            <ul className="modal__bullets">
              {selected.details.map((d) => (
                <li key={d.slice(0, 24)}>{d}</li>
              ))}
            </ul>
            <ul className="modal__tags" aria-label="Skills used">
              {selected.skills.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </article>
        </Modal>
      )}
    </>
  );
}
