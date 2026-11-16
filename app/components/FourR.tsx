"use client";

import { motion, useReducedMotion } from "framer-motion";

type Item = { title: string; text: string };

const EASE = [0.16, 1, 0.3, 1] as const;

/** Les 4R : chaque « R » arrive en roulant, puis le mot se déroule. */
export function FourR({ items }: { items: Item[] }) {
  const reduce = useReducedMotion();
  return (
    <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {items.map((r, i) => (
        <motion.div
          key={r.title}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ staggerChildren: 0.15, delayChildren: i * 0.12 }}
        >
          <dt className="flex items-baseline font-titre text-[clamp(2rem,3.6vw,2.8rem)] leading-none font-bold tracking-[-0.03em] text-bleu">
            <motion.span
              className="inline-flex size-[1.25em] items-center justify-center rounded-full bg-orange text-white"
              variants={reduce ? {} : { hidden: { x: -60, rotate: -360, opacity: 0 }, shown: { x: 0, rotate: 0, opacity: 1 } }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              R
            </motion.span>
            <span className="overflow-hidden pl-1">
              <motion.span
                className="inline-block"
                variants={reduce ? {} : { hidden: { x: "-110%" }, shown: { x: "0%" } }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {r.title.slice(1)}
              </motion.span>
            </span>
          </dt>
          <motion.dd
            className="mt-4 text-[17px] leading-relaxed"
            variants={reduce ? {} : { hidden: { opacity: 0, y: 12 }, shown: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {r.text}
          </motion.dd>
        </motion.div>
      ))}
    </dl>
  );
}
