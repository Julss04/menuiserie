"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["Bilan complet", "Freins & pneus", "Transmission", "Vélos reconditionnés", "Pièces de réemploi"];

/** Bandeau qui glisse en continu ; s'arrête hors de l'écran et au survol. */
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const run = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {WORDS.map((word) => (
        <span key={word} className="flex items-center gap-10 whitespace-nowrap">
          {word}
          <svg viewBox="0 0 40 40" className="size-9 shrink-0" aria-hidden>
            <circle cx={20} cy={20} r={16} fill="#2f818e" stroke="#fff1d7" strokeWidth={4} />
            <path d="M11 20h15M21 14l6 6-6 6" fill="none" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={ref}
      className="group overflow-hidden bg-jaune py-5 font-titre text-[clamp(1.5rem,3.4vw,2.5rem)] font-bold tracking-[-0.02em] text-bleu-900"
    >
      <div
        className="flex w-max animate-[marquee_38s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationPlayState: visible ? undefined : "paused" }}
      >
        {run}
        <div aria-hidden className="flex">
          {run}
        </div>
      </div>
    </div>
  );
}
