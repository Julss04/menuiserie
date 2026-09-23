"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Fait glisser un bloc depuis la gauche (le sens de la flèche du logo)
 * quand il entre à l'écran. Sans animation si le visiteur l'a demandé.
 */
export function Reveal({
  children,
  delay = 0,
  from = -56,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  from?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: from }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
