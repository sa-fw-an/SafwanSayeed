import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { detectTier } from "@/lib/device";
import { burstHearts } from "@/lib/confetti";

const RoomScene = lazy(() => import("@/three/RoomScene"));

/** Catches WebGL/context failures and swaps in the illustrated fallback. */
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return <FlatPackOffice reason="3D unavailable on this device" />;
    return this.props.children;
  }
}

function FlatPackOffice({ reason }: { reason: string }) {
  return (
    <div className="diorama__stage diorama__fallback" role="note">
      <div className="diorama__doodle" aria-hidden="true">
        <span className="diorama__desk" />
        <span className="diorama__monitor" />
        <span className="diorama__plant" />
        <span className="diorama__fish" />
      </div>
      <p className="hand diorama__fallback-note">
        {reason} — enjoy this flat-pack office instead.
      </p>
    </div>
  );
}

export default function StudioPage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const bubbleTimer = useRef<number | undefined>(undefined);
  const tier = detectTier();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true);
        setActive(entry.isIntersecting && !document.hidden);
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(stage);

    const onVisibility = () => document.hidden && setActive(false);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const onHotspot = useCallback((fact: string, x: number, y: number) => {
    burstHearts(x, y);
    setBubble(fact);
    window.clearTimeout(bubbleTimer.current);
    bubbleTimer.current = window.setTimeout(() => setBubble(null), 3500);
  }, []);

  return (
    <section className="section page-studio">
      <div className="shell">
        <SectionHeading
          eyebrow="The Studio"
          title="Where It Happens"
          subtitle="My desk in glorious three dimensions. Drag to spin it, click anything that looks suspicious."
        />

        <div ref={stageRef} className="card studio-stage">
          {tier === "low" ? (
            <FlatPackOffice reason="Skipped the heavy stuff to keep things speedy" />
          ) : mounted ? (
            <SceneBoundary>
              <Suspense
                fallback={
                  <div className="studio-stage__loading hand">
                    unpacking furniture…
                  </div>
                }
              >
                <div className="studio-stage__canvas">
                  <RoomScene
                    active={active}
                    tier={tier}
                    onHotspot={onHotspot}
                  />
                </div>
              </Suspense>
            </SceneBoundary>
          ) : (
            <div className="studio-stage__loading hand">
              something's swimming this way…
            </div>
          )}

          {bubble && (
            <p className="studio-stage__bubble hand" role="status">
              {bubble}
            </p>
          )}
        </div>

        <ul className="studio-hints" aria-hidden="true">
          <li className="chip">🖱 drag to spin</li>
          <li className="chip">👆 click things</li>
          <li className="chip">🐠 he's busy, be nice</li>
        </ul>
      </div>
    </section>
  );
}
