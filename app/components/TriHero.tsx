"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDisc } from "./Hero";
import { Trefoil } from "./Trefoil";

const EASE = [0.16, 1, 0.3, 1] as const;

// Les trois boucles du symbole, lues comme le cycle de la ressourcerie.
const CYCLE = [
  { label: "Vous donnez", className: "top-[4%] left-1/2 -translate-x-1/2" },
  { label: "On trie, on répare", className: "right-[-2%] bottom-[10%]" },
  { label: "Ça repart", className: "bottom-[10%] left-[-2%]" },
];

export function TriHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const ringsY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 200]);

  const line = (delay: number) =>
    reduce
      ? {}
      : { initial: { y: "105%" }, animate: { y: "0%" }, transition: { duration: 0.9, ease: EASE, delay } };

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-bleu pt-28 pb-16 text-white sm:pt-32 lg:pb-24">
      <motion.svg
        aria-hidden
        viewBox="0 0 800 800"
        style={{ y: ringsY }}
        className="absolute -bottom-96 -left-72 -z-10 w-[64rem] max-w-none opacity-[0.14]"
      >
        {[380, 300, 220, 140].map((r) => (
          <circle key={r} cx={400} cy={400} r={r} fill="none" stroke="#fff1d7" strokeWidth={r === 380 ? 34 : 2} />
        ))}
      </motion.svg>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <motion.div style={{ y: textY }} className="relative z-10">
          <h1 className="text-[clamp(2.75rem,7vw,5.6rem)] leading-[0.98] tracking-[-0.035em] text-white">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...line(0.05)}>
                Vos objets
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...line(0.15)}>
                ont encore
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block text-jaune" {...line(0.25)}>
                une histoire.
              </motion.span>
            </span>
          </h1>
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
          >
            <p className="mt-7 max-w-[34rem] text-lg leading-relaxed sm:text-xl">
              Tri-Marrant est la ressourcerie solidaire du pays granvillais. On récupère ce dont vous
              n&apos;avez plus besoin, on le remet en état et on le revend à petit prix, avec des
              salarié·es en insertion et des dizaines de bénévoles.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
              <Link
                href="/donner"
                className="group inline-flex items-center gap-3 rounded-full bg-jaune py-3.5 pr-4 pl-7 font-titre text-lg font-bold text-encre shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] transition-colors hover:bg-jaune-600"
              >
                Donner des objets
                <ArrowDisc />
              </Link>
              <Link
                href="/boutiques"
                className="rounded-full border-2 border-white px-6 py-3 font-bold text-white transition-colors hover:bg-white hover:text-bleu-900"
              >
                Venir chiner
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
          <Trefoil progress={scrollYProgress} className="absolute inset-[14%] h-auto w-[72%] text-beige" />
          {CYCLE.map((step, i) => (
            <motion.span
              key={step.label}
              className={`absolute rounded-full bg-bleu-900 px-4 py-2 text-sm font-bold whitespace-nowrap text-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)] sm:text-base ${step.className}`}
              initial={reduce ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.9 + i * 0.18 }}
            >
              {step.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
