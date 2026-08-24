import { tickerItems } from "@/data/profile";

export function Ticker() {
  const track = [
    ...tickerItems,
    ...tickerItems,
    ...tickerItems,
    ...tickerItems,
  ];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {[0, 1].map((half) => (
          <span className="ticker__group" key={half}>
            {track.map((item, i) => (
              <span className="ticker__item display" key={`${half}-${i}`}>
                {item}
                <span className="ticker__star">★</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
