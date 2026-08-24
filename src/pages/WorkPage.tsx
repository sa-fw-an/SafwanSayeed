import { ProjectGrid } from "@/components/ProjectGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STAMPS = [
  "shipped a lot of production-grade projects",
  "too many AI tokens consumed",
  "countless late nights",
  "bugs: fixed eventually",
] as const;

export default function WorkPage() {
  return (
    <section className="section page-work">
      <div className="shell">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Work"
          subtitle="Builds across web, mobile, blockchain and games. Click any card for the full story."
        />

        <ul className="work-stamps" aria-label="Field notes">
          {STAMPS.map((s, i) => (
            <li
              key={s}
              className="stamp work-stamp"
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              {s}
            </li>
          ))}
        </ul>

        <ProjectGrid />
      </div>
    </section>
  );
}
