import { useReveal } from "@/lib/useReveal";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ eyebrow, title, subtitle }: Props) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="section-heading reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="display title-pop section-heading__title">{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  );
}
