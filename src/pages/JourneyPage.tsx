import { Timeline } from "@/components/Timeline";
import { Marquee } from "@/components/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { marqueeRows, skills } from "@/data/skills";

export default function JourneyPage() {
  const [rowA, rowB] = marqueeRows();

  return (
    <section className="section page-journey">
      <div className="shell">
        <SectionHeading
          eyebrow="Journey"
          title="Experience"
          subtitle="My professional journey and contributions to the tech community. Click a ticket for the full itinerary."
        />
        <Timeline />

        <div className="toolbox">
          <h2 className="display title-pop toolbox__title">The Toolbox</h2>
          <p className="eyebrow toolbox__label">
            {skills.length} things I've broken and fixed
          </p>
        </div>
        <div className="toolbox__rows">
          <Marquee
            items={rowA.map((s) => (
              <span className="skill-chip chip" key={s.name}>
                <img
                  src={s.path}
                  alt=""
                  width="20"
                  height="20"
                  loading="lazy"
                />
                {s.name}
              </span>
            ))}
          />
          <Marquee
            reverse
            duration={44}
            items={rowB.map((s) => (
              <span className="skill-chip chip" key={s.name}>
                <img
                  src={s.path}
                  alt=""
                  width="20"
                  height="20"
                  loading="lazy"
                />
                {s.name}
              </span>
            ))}
          />
        </div>
      </div>
    </section>
  );
}
