"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CountUp } from "./CountUp";

type Tier = { name: string; price: number; note?: string };

const EASE = [0.16, 1, 0.3, 1] as const;

/** Les tarifs d'adhésion : les montants comptent jusqu'à leur valeur, les tuiles se soulèvent au survol. */
export function PriceTiles({ tiers }: { tiers: Tier[] }) {
  const reduce = useReducedMotion();
  return (
    <dl className="grid grid-cols-2 gap-3">
      {tiers.map((t, i) => (
        <motion.div
          key={t.name}
          className="group flex flex-col rounded-2xl bg-bleu-100 p-4 transition-[background-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:bg-bleu hover:shadow-[0_18px_40px_-20px_rgba(35,110,118,0.8)] sm:p-5"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
        >
          <dt className="text-sm font-bold text-bleu-900 transition-colors group-hover:text-jaune sm:text-base">{t.name}</dt>
          <dd className="mt-1 font-titre text-[clamp(2rem,4vw,2.75rem)] leading-none font-bold whitespace-nowrap text-bleu transition-colors group-hover:text-white">
            <CountUp value={t.price} /> €
          </dd>
          {t.note && (
            <dd className="mt-2 text-xs leading-snug text-encre/80 transition-colors group-hover:text-white/85 sm:text-sm">{t.note}</dd>
          )}
        </motion.div>
      ))}
    </dl>
  );
}
