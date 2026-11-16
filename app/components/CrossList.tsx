"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Ce que l'atelier ne fait pas : chaque croix arrive en tournant, puis sa ligne glisse à côté. */
export function CrossList({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={item} className="flex items-start gap-4">
          <motion.span
            aria-hidden
            className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-orange"
            initial={reduce ? false : { scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.2 + i * 0.25 }}
          >
            <svg viewBox="0 0 12 12" className="size-3">
              <path d="M3 3l6 6M9 3l-6 6" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" />
            </svg>
          </motion.span>
          <motion.span
            className="text-[clamp(1.15rem,2vw,1.4rem)] leading-snug font-bold"
            initial={reduce ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.25 }}
          >
            {item}
          </motion.span>
        </li>
      ))}
    </ul>
  );
}
