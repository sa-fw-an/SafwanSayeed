import type { ReactNode } from "react";

/** Infinite horizontal marquee. Items are rendered twice for a seamless loop. */
export function Marquee({
  items,
  reverse = false,
  duration = 38,
}: {
  items: ReactNode[];
  reverse?: boolean;
  duration?: number;
}) {
  return (
    <div className="marquee">
      <div
        className="marquee__track"
        style={{
          animation: `${reverse ? "ticker-scroll-rev" : "ticker-scroll"} ${duration}s linear infinite`,
        }}
      >
        {[0, 1].map((half) => (
          <span className="marquee__group" key={half}>
            {items.map((node, i) => (
              <span key={`${half}-${i}`} className="marquee__item">
                {node}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
