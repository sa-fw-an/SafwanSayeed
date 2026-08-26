import { getContext, MembraneSynth, PolySynth, Synth, start } from "tone";
import type { ThemeName } from "@/lib/theme";

/**
 * Tiny UI sound kit on Tone.js.
 *
 * - Every button/link click gets a soft blip.
 * - Theme swaps play a short motif unique to the theme.
 * - The dragon gets a little fanfare.
 *
 * Audio starts lazily inside the first real user gesture (browser
 * autoplay policy), everything is delegated from one document-level
 * listener, and every path is failure-safe — sound must never break UX.
 */

type Voice = {
  synth: PolySynth<Synth>;
  thump: MembraneSynth;
};

let voice: Voice | null = null;
let booting = false;

async function boot() {
  if (voice || booting) return;
  booting = true;
  try {
    // Some browsers leave the context suspended even after a gesture;
    // never wait on it forever, and never queue notes into a suspended
    // context — they'd all dump at once on a later resume ("stuck music").
    await Promise.race([
      start(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("audio-boot-timeout")), 2500),
      ),
    ]);
    if (getContext().state !== "running") return;
    voice = {
      synth: new PolySynth(Synth, {
        oscillator: { type: "triangle" },
        envelope: { attack: 0.005, decay: 0.18, sustain: 0.05, release: 0.2 },
      }).toDestination(),
      thump: new MembraneSynth({
        pitchDecay: 0.03,
        octaves: 4,
        envelope: { attack: 0.001, decay: 0.25, sustain: 0, release: 0.2 },
      }).toDestination(),
    };
    voice.synth.volume.value = -16;
    voice.thump.volume.value = -14;
  } catch {
    // No audio available — stay silent forever, by design.
    voice = null;
  } finally {
    booting = false;
  }
}

/** Staggered arpeggio helper — each note fires `spacing` after the previous. */
function arp(notes: string[], spacing = 0.06) {
  notes.forEach((note, i) => {
    window.setTimeout(
      () => {
        try {
          voice?.synth.triggerAttackRelease(note, 0.16, undefined, 0.7);
        } catch {
          /* ignore */
        }
      },
      i * spacing * 1000,
    );
  });
}

/** Soft tick for generic clicks. */
export function playClick() {
  if (!voice) return;
  try {
    voice.synth.triggerAttackRelease("B5", 0.04, undefined, 0.25);
  } catch {
    /* ignore */
  }
}

/** Motif per theme — same family of sound, different mood. */
export function playThemeCue(theme: ThemeName) {
  switch (theme) {
    case "paper":
      arp(["C5", "E5", "G5", "C6"], 0.07);
      break;
    case "midnight":
      arp(["A3", "C4", "E4", "A4"], 0.1);
      break;
    case "matcha":
      arp(["D4", "F4", "A4", "D5"], 0.08);
      break;
  }
}

/** Dragon fanfare: quick pentatonic run + landing thump. */
export function playDragonCue() {
  if (!voice) return;
  arp(["G4", "B4", "D5", "G5", "B5"], 0.055);
  window.setTimeout(() => {
    try {
      voice?.thump.triggerAttackRelease("C2", 0.2, undefined, 0.5);
    } catch {
      /* ignore */
    }
  }, 280);
}

/**
 * One delegated listener drives everything: boots audio inside the first
 * gesture, ticks on clicks, and reacts to theme swaps. Theme-picker rows
 * are excluded — their motif plays instead of the generic tick.
 */
export function initGlobalSound() {
  const onClick = (e: PointerEvent) => {
    const target = e.target as HTMLElement | null;
    const hit = target?.closest("button, a");
    if (!hit) return;
    void boot().then(() => {
      if (hit.classList.contains("dragon__btn")) playDragonCue();
      else if (!hit.classList.contains("theme-picker__row")) playClick();
    });
  };

  const onThemeChange = (e: Event) => {
    void boot().then(() => playThemeCue((e as CustomEvent<ThemeName>).detail));
  };

  document.addEventListener("pointerdown", onClick, true);
  window.addEventListener("themechange", onThemeChange);
  return () => {
    document.removeEventListener("pointerdown", onClick, true);
    window.removeEventListener("themechange", onThemeChange);
  };
}
