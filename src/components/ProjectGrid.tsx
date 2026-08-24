import { useMemo, useState } from "react";
import {
  categories,
  projects,
  type CategoryId,
  type Project,
} from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/cn";
import { useReveal } from "@/lib/useReveal";

const PAGE_SIZE = 5;

/** Bento slot per position on the page: featured 2×2, two tall, two wide. */
const SLOTS = [
  "bento__cell--featured",
  "bento__cell--tall",
  "bento__cell--tall",
  "bento__cell--wide",
  "bento__cell--wide",
] as const;

export function ProjectGrid() {
  const [category, setCategory] = useState<CategoryId>("all");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const gridRef = useReveal<HTMLDivElement>();

  const filtered = useMemo(
    () =>
      category === "all"
        ? projects
        : projects.filter((p) => p.category === category),
    [category],
  );

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );

  const pick = (id: CategoryId) => {
    setCategory(id);
    setPage(0);
  };

  return (
    <>
      <div
        className="filters"
        role="group"
        aria-label="Filter projects by category"
      >
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={cn(
              "filter-pill display",
              category === c.id && "is-active",
            )}
            aria-pressed={category === c.id}
            onClick={() => pick(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="reveal bento">
        {visible.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            slot={SLOTS[i % SLOTS.length]}
            onOpen={() => setSelected(p)}
          />
        ))}
        {visible.length < PAGE_SIZE &&
          Array.from({ length: PAGE_SIZE - visible.length }, (_, i) => (
            <div key={`ghost-${i}`} className="bento__ghost" aria-hidden="true">
              more soon…
            </div>
          ))}
      </div>

      {pageCount > 1 && (
        <nav className="pagination" aria-label="Project pages">
          <button
            type="button"
            className="btn btn--icon"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            aria-label="Previous page"
          >
            ←
          </button>
          <span className="pagination__dots">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                className={cn("pagination__dot", i === page && "is-active")}
                aria-label={`Page ${i + 1}`}
                aria-current={i === page ? "page" : undefined}
                onClick={() => setPage(i)}
              />
            ))}
          </span>
          <span className="pagination__count eyebrow">
            {page + 1} / {pageCount}
          </span>
          <button
            type="button"
            className="btn btn--icon"
            disabled={page === pageCount - 1}
            onClick={() => setPage(page + 1)}
            aria-label="Next page"
          >
            →
          </button>
        </nav>
      )}

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
            <ul className="modal__tags" aria-label="Technologies used">
              {selected.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
            <footer className="modal__actions">
              <Button
                href={selected.href}
                variant="accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub ↗
              </Button>
              {selected.href.includes("github.io") && (
                <Button
                  href={selected.href}
                  variant="pop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo ↗
                </Button>
              )}
            </footer>
          </article>
        </Modal>
      )}
    </>
  );
}

export function ProjectCard({
  project,
  slot,
  onOpen,
}: {
  project: Project;
  slot?: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className={`card bento__cell${slot ? ` ${slot}` : ""}`}
      onClick={onOpen}
    >
      <span className="bento__banner-wrap">
        <img
          src={project.banner}
          alt=""
          loading="lazy"
          className="bento__banner"
        />
        {project.logo && (
          <img
            src={project.logo}
            alt=""
            width="44"
            height="44"
            className="bento__logo"
          />
        )}
      </span>
      <span className="bento__body">
        <span className="stamp bento__stamp">{project.category}</span>
        <span className="display bento__title">{project.title}</span>
        <span className="bento__desc">{project.desc}</span>
        <span className="bento__tags">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="chip chip--mini">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="chip chip--mini">+{project.tags.length - 3}</span>
          )}
        </span>
      </span>
    </button>
  );
}
