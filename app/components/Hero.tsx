"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Bicycle } from "./Bicycle";
import { OpenStatus } from "./OpenStatus";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Le vélo entre en roulant depuis la gauche, puis continue d'avancer au défilement.
  const arrival = useMotionValue(reduce ? 0 : -900);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rolled = useTransform(scrollYProgress, [0, 1], [0, 620]);
  const distance = useTransform(() => arrival.get() + rolled.get());
  const roadShift = useTransform(distance, (d) => -(d % 48));
  // Les anneaux du fond remontent moins vite que la page et tournent : effet de profondeur.
  const ringsY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 220]);
  const ringsTurn = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  useEffect(() => {
    if (reduce) return;
    const controls = animate(arrival, 0, { duration: 1.6, ease: EASE, delay: 0.15 });
    return () => controls.stop();
  }, [arrival, reduce]);

  const line = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: "105%" },
          animate: { y: "0%" },
          transition: { duration: 0.9, ease: EASE, delay },
        };

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-bleu pt-28 text-white sm:pt-32"
    >
      {/* Fond : les anneaux du logo, en très grand. */}
      <motion.svg
        aria-hidden
        viewBox="0 0 800 800"
        style={{ y: ringsY, rotate: ringsTurn }}
        className="absolute -top-40 -left-60 -z-10 w-[62rem] max-w-none opacity-[0.16]"
      >
        {[380, 300, 220, 140].map((r) => (
          <circle key={r} cx={400} cy={400} r={r} fill="none" stroke="#fff1d7" strokeWidth={r === 380 ? 34 : 2} />
        ))}
        {/* Une encoche sur l'anneau extérieur rend sa rotation visible. */}
        <rect x={392} y={2} width={16} height={36} rx={4} fill="#efb023" />
      </motion.svg>
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 -z-10 hidden w-[46%] bg-bleu-900/35 lg:block"
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <motion.div style={{ y: textY }} className="relative z-10 pb-4 lg:pb-28">
          <h1 className="text-[clamp(2.75rem,7.2vw,5.75rem)] leading-[0.98] tracking-[-0.035em] text-white">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...line(0.05)}>
                Votre vélo,
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...line(0.15)}>
                c&apos;est vous
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block text-jaune" {...line(0.25)}>
                qui le réparez.
              </motion.span>
            </span>
          </h1>
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
          >
            <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-white sm:text-xl">
              L&apos;Annexe est l&apos;atelier vélo participatif de Tri-Marrant à Granville. Un
              bénévole vous guide, les outils et les pièces de réemploi sont là : vous repartez
              avec un vélo qui roule, et le geste en plus.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#reserver"
                className="group inline-flex items-center gap-3 rounded-full bg-jaune py-3.5 pr-4 pl-7 font-titre text-lg font-bold text-encre shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] transition-colors hover:bg-jaune-600"
              >
                Réserver un créneau
                <ArrowDisc />
              </a>
              <OpenStatus />
            </div>
          </motion.div>
        </motion.div>

        <div className="relative flex items-end lg:pt-10">
          <div className="w-full pb-6 lg:pb-16">
            <Bicycle distance={distance} />
          </div>
        </div>
      </div>

      {/* La route : ses tirets défilent avec le vélo. */}
      <div aria-hidden className="relative h-10 overflow-hidden bg-bleu-900">
        <motion.div
          style={{ x: roadShift }}
          className="absolute top-1/2 -right-12 -left-12 h-1 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,var(--color-beige)_0_24px,transparent_24px_48px)] opacity-60"
        />
      </div>
    </section>
  );
}

/** Le rond fléché du logo, réutilisé comme pictogramme d'action. */
export function ArrowDisc({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex size-9 items-center justify-center rounded-full border-[3px] border-jaune-900 bg-bleu text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 ${className}`}
    >
      <svg viewBox="0 0 20 20" className="size-4" aria-hidden>
        <path d="M3 10h11M10 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
