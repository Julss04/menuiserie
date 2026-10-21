"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Reveal } from "./Reveal";

type Step = { year: string; title: string; text: string };

/** Frise verticale : le trait se remplit au fil de la lecture. */
export function Timeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative ml-3 space-y-14 sm:ml-6">
      <span aria-hidden className="absolute top-2 bottom-2 -left-px w-1 rounded-full bg-bleu-200" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : fill, originY: 0 }}
        className="absolute top-2 bottom-2 -left-px w-1 rounded-full bg-bleu"
      />
      {steps.map((s, i) => (
        <li key={s.year} className="relative pl-10 sm:pl-14">
          <span
            aria-hidden
            className="absolute top-1.5 -left-[0.7rem] size-6 rounded-full border-[5px] border-jaune bg-bleu"
          />
          <Reveal delay={i * 0.04} from={-32}>
            <p className="font-titre text-[clamp(2.2rem,5vw,3.5rem)] leading-none font-bold tracking-[-0.03em] text-bleu tabular-nums">
              {s.year}
            </p>
            <h3 className="mt-3 text-2xl tracking-[-0.02em]">{s.title}</h3>
            <p className="mt-2 max-w-xl text-lg leading-relaxed">{s.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
