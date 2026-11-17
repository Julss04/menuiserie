"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Longueur du cercle sur lequel court le texte (rayon 46) : le texte est ajusté pour le remplir
// exactement, sans se chevaucher. Garder un texte court (environ 30 caractères).
const CIRCLE_LENGTH = Math.round(2 * Math.PI * 46 - 2);

/** Tampon circulaire dont le texte tourne au fil du défilement. */
export function Stamp({ text, center, className = "" }: { text: string; center: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-60, reduce ? -60 : 200]);

  return (
    <div ref={ref} aria-hidden className={`relative size-32 sm:size-36 ${className}`}>
      <motion.svg viewBox="0 0 120 120" style={{ rotate }} className="absolute inset-0 size-full">
        <defs>
          <path id="stamp-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <circle cx={60} cy={60} r={58} className="fill-jaune" />
        <text className="fill-bleu-900 font-titre text-[11.5px] font-bold tracking-[0.18em] uppercase">
          <textPath href="#stamp-circle" textLength={CIRCLE_LENGTH} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </motion.svg>
      <span className="absolute inset-0 flex items-center justify-center font-titre text-2xl font-bold text-bleu-900">
        {center}
      </span>
    </div>
  );
}
