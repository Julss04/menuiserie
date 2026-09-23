"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const WORDS = ["Bilan complet", "Freins & pneus", "Transmission", "Vélos reconditionnés", "Pièces de réemploi"];

// Quatre séries identiques : décaler d'un quart de la largeur boucle sans raccord.
const LOOP = 25;
// Vitesse de base, en % de la largeur totale par seconde (une série en ~19 s).
const BASE_SPEED = 1.3;

const wrap = (v: number) => (((v % LOOP) + LOOP) % LOOP) - LOOP;

/**
 * Bandeau qui glisse en continu. Il accélère quand on fait défiler la page
 * et change de sens quand on remonte, comme une roue libre.
 */
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();

  const offset = useMotionValue(0);
  const direction = useRef(1);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-2000, 0, 2000], [-5, 0, 5], { clamp: false });
  const x = useTransform(offset, (v) => `${wrap(v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    const step = direction.current * BASE_SPEED * (delta / 1000) * (1 + Math.abs(b));
    offset.set(offset.get() - step);
  });

  const run = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
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
      className="overflow-hidden bg-jaune py-5 font-titre text-[clamp(1.5rem,3.4vw,2.5rem)] font-bold tracking-[-0.02em] text-bleu-900"
    >
      <motion.div className="flex w-max" style={{ x: reduce ? 0 : x }}>
        {run(false)}
        {run(true)}
        {run(true)}
        {run(true)}
      </motion.div>
    </div>
  );
}
