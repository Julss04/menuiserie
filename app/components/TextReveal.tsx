"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Segment = { text: string; className?: string };

/**
 * Titre dont les mots montent un à un derrière un masque, comme les lignes
 * de l'accueil. Le texte reste un seul titre pour les lecteurs d'écran.
 */
export function TextReveal({
  as: Tag = "h2",
  segments,
  className,
}: {
  as?: "h2" | "h3";
  segments: Segment[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const label = segments.map((s) => s.text).join(" ");
  const words = segments.flatMap((s) => s.text.split(" ").map((w) => ({ w, className: s.className })));

  if (reduce) {
    return (
      <Tag className={className}>
        {segments.map((s, i) => (
          <span key={i} className={s.className}>
            {i > 0 ? " " : ""}
            {s.text}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={label}>
      <motion.span
        aria-hidden
        className="block"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ staggerChildren: 0.045 }}
      >
        {words.map(({ w, className: wordClass }, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={`inline-block ${wordClass ?? ""}`}
              variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
