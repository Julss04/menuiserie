"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/** Une chaîne qui se tend entre les étapes quand la section entre à l'écran. */
export function ChainLine() {
  const ref = useRef<HTMLDivElement>(null);
  // Observé sur le conteneur : l'élément découpé à 100 % n'aurait aucune surface visible.
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  return (
    <div ref={ref} aria-hidden className="absolute top-[1.375rem] right-[30%] left-[2%] hidden h-2 md:block">
      <motion.div
        className="h-full rounded-full bg-[repeating-linear-gradient(90deg,var(--color-bleu)_0_16px,transparent_16px_24px)]"
        initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
        animate={inView ? { clipPath: "inset(0 0% 0 0)" } : undefined}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
    </div>
  );
}
