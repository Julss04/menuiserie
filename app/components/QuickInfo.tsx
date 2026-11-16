"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export type QuickInfoIcon = "pin" | "box" | "phone" | "clock" | "coin";

export type QuickInfoItem = {
  /** La question que se pose le visiteur, en clair. */
  question: string;
  /** La réponse, en gros. */
  answer: React.ReactNode;
  /** Où aller pour en savoir plus : toute la case y mène. */
  href: string;
  linkLabel: string;
  icon: QuickInfoIcon;
  external?: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;
const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Petites icônes dessinées, chacune avec son animation d'arrivée. */
function Icon({ name, reduce }: { name: QuickInfoIcon; reduce: boolean }) {
  const view = { once: true, amount: 0.8 } as const;
  switch (name) {
    case "pin":
      // L'épingle tombe sur la carte et rebondit.
      return (
        <svg viewBox="0 0 32 32" className="size-7 overflow-visible">
          <motion.ellipse cx={16} cy={28} rx={5} ry={1.6} className="fill-bleu-900/20" initial={reduce ? false : { scale: 0 }} whileInView={{ scale: 1 }} viewport={view} transition={{ delay: 0.55, duration: 0.3 }} />
          <motion.g
            initial={reduce ? false : { y: -26, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={view}
            transition={{ type: "spring", stiffness: 420, damping: 11, delay: 0.25 }}
          >
            <path d="M16 27s-8-7.6-8-14a8 8 0 0 1 16 0c0 6.4-8 14-8 14z" {...STROKE} />
            <circle cx={16} cy={13} r={3} {...STROKE} />
          </motion.g>
        </svg>
      );
    case "box":
      // Le carton s'ouvre : le rabat se soulève.
      return (
        <svg viewBox="0 0 32 32" className="size-7 overflow-visible">
          <path d="M6 13h20v13H6z" {...STROKE} />
          <path d="M13 17h6" {...STROKE} />
          <motion.path
            d="M4 13l3-5h18l3 5"
            {...STROKE}
            style={{ originX: "50%", originY: "100%" }}
            initial={reduce ? false : { rotate: 0, y: 0 }}
            whileInView={reduce ? undefined : { rotate: [0, -14, 0, -8, 0], y: [0, -4, 0, -2, 0] }}
            viewport={view}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.35 }}
          />
        </svg>
      );
    case "phone":
      // Le téléphone sonne de temps en temps.
      return (
        <motion.svg
          viewBox="0 0 32 32"
          className="size-7 overflow-visible"
          animate={reduce ? undefined : { rotate: [0, -14, 12, -10, 8, -4, 0] }}
          transition={{ duration: 0.9, ease: "easeInOut", repeat: Infinity, repeatDelay: 3.2, delay: 0.8 }}
        >
          <path d="M9 5l4 1 2 6-3 2a14 14 0 0 0 6 6l2-3 6 2 1 4c0 2-2 4-4 4C14 27 5 18 5 9c0-2 2-4 4-4z" {...STROKE} />
        </motion.svg>
      );
    case "clock":
      // Les aiguilles tournent jusqu'à l'heure.
      return (
        <svg viewBox="0 0 32 32" className="size-7 overflow-visible">
          <circle cx={16} cy={16} r={11} {...STROKE} />
          <motion.path
            d="M16 16V9"
            {...STROKE}
            style={{ originX: "16px", originY: "16px" }}
            initial={reduce ? false : { rotate: -360 }}
            whileInView={{ rotate: 0 }}
            viewport={view}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
          />
          <motion.path
            d="M16 16l5 3"
            {...STROKE}
            style={{ originX: "16px", originY: "16px" }}
            initial={reduce ? false : { rotate: -90 }}
            whileInView={{ rotate: 0 }}
            viewport={view}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
          />
        </svg>
      );
    case "coin":
      // La pièce tourne sur elle-même avant de se poser.
      return (
        <motion.svg
          viewBox="0 0 32 32"
          className="size-7 overflow-visible"
          initial={reduce ? false : { rotateY: 540 }}
          whileInView={{ rotateY: 0 }}
          viewport={view}
          transition={{ duration: 1.3, ease: EASE, delay: 0.3 }}
        >
          <circle cx={16} cy={16} r={11} {...STROKE} />
          <path d="M20 11.5a5.5 5.5 0 1 0 0 9M10 14.5h7M10 17.5h7" {...STROKE} />
        </motion.svg>
      );
  }
}

/**
 * Bandeau « L'essentiel » : les trois réponses qu'on cherche en arrivant,
 * en gros caractères. Toute la case est cliquable.
 */
export function QuickInfo({ items }: { items: QuickInfoItem[] }) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section aria-label="L'essentiel" className="px-4 pt-16 sm:px-6 md:pt-20">
      <ul className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
        {items.map((item, i) => {
          const content = (
            <>
              <div className="flex items-start justify-between gap-4">
                <p className="pt-1 font-bold text-bleu-900">{item.question}</p>
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-bleu-100 text-bleu-900 transition-colors duration-300 group-hover:bg-jaune group-focus-visible:bg-jaune">
                  <Icon name={item.icon} reduce={reduce} />
                </span>
              </div>
              <div className="mt-1 font-titre text-[clamp(1.35rem,2.4vw,1.7rem)] leading-snug font-bold text-encre">
                {item.answer}
              </div>
              <span className="mt-auto inline-flex items-center gap-2 pt-5 font-bold text-bleu-900 underline decoration-2 underline-offset-4 group-hover:text-bleu">
                {item.linkLabel}
                <svg
                  viewBox="0 0 20 20"
                  className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5"
                  aria-hidden
                >
                  <path d="M4 10h11M11 5l5 5-5 5" {...STROKE} />
                </svg>
              </span>
            </>
          );
          const cardClass =
            "group flex h-full flex-col rounded-[1.5rem] border-2 border-bleu-200 bg-white p-6 transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1.5 hover:border-bleu hover:shadow-[0_22px_45px_-28px_rgba(35,110,118,0.7)] focus-visible:border-bleu sm:p-7";
          return (
            <motion.li
              key={item.question}
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
            >
              {item.external ? (
                <a href={item.href} className={cardClass}>
                  {content}
                </a>
              ) : (
                <Link href={item.href} className={cardClass}>
                  {content}
                </Link>
              )}
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
