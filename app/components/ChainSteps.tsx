"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

type Step = { title: string; text: string };

const EASE = [0.16, 1, 0.3, 1] as const;

// Plateau dentelé, calculé (même dessin que celui du vélo de l'accueil).
function gearPath(r: number, teeth: number, depth: number) {
  const points: string[] = [];
  const step = (Math.PI * 2) / (teeth * 4);
  for (let i = 0; i < teeth * 4; i++) {
    const radius = i % 4 < 2 ? r : r - depth;
    const a = i * step;
    points.push(`${(32 + radius * Math.cos(a)).toFixed(1)},${(32 + radius * Math.sin(a)).toFixed(1)}`);
  }
  return `M${points.join("L")}Z`;
}
const GEAR = gearPath(30, 14, 5);

/** Un plateau qui tourne avec le défilement et s'allume quand la chaîne l'atteint. */
function Sprocket({ n, turn, active }: { n: number; turn: MotionValue<number>; active: MotionValue<number> }) {
  const ref = useRef<SVGPathElement>(null);
  useMotionValueEvent(turn, "change", (deg) => {
    ref.current?.setAttribute("transform", `rotate(${(deg * (n % 2 ? -1 : 1)).toFixed(1)} 32 32)`);
  });
  const fill = useTransform(active, [0, 1], ["#c2e7eb", "#ff6542"]);
  return (
    <svg viewBox="0 0 64 64" className="size-14 sm:size-16" aria-hidden>
      <motion.path ref={ref} d={GEAR} style={{ fill }} />
      <circle cx={32} cy={32} r={20} className="fill-bleu" />
      <circle cx={32} cy={32} r={20} fill="none" stroke="#efb023" strokeWidth={4} />
      <text x={32} y={39} textAnchor="middle" className="fill-white font-titre text-[20px] font-bold">
        {n}
      </text>
    </svg>
  );
}

function StepRow({ step, i, count, progress, turn }: { step: Step; i: number; count: number; progress: MotionValue<number>; turn: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const at = i / Math.max(1, count - 1);
  const active = useTransform(progress, [at - 0.08, at], [0, 1]);
  return (
    <li className="relative grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-8">
      <div className="relative z-10">
        <Sprocket n={i + 1} turn={turn} active={active} />
      </div>
      <motion.div
        className="grid gap-x-10 gap-y-2 pt-2 pb-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] md:pb-16"
        initial={reduce ? false : { opacity: 0, x: 48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <h3 className="text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight tracking-[-0.025em]">{step.title}</h3>
        <p className="max-w-xl text-[17px] leading-relaxed md:pt-1.5">{step.text}</p>
      </motion.div>
    </li>
  );
}

/**
 * Le déroulé d'une venue, monté comme une chaîne de vélo : la chaîne se tend
 * au fil de la lecture et chaque plateau tourne avec le défilement.
 */
export function ChainSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 65%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const turn = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 540]);
  const chainShift = useTransform(scrollYProgress, (v) => `${reduce ? 0 : v * 240}px`);

  return (
    <ol ref={ref} className="relative">
      {/* La chaîne : maillons au repos, puis la partie tendue qui se remplit. */}
      <span
        aria-hidden
        className="absolute top-8 bottom-8 left-[1.6rem] w-2 -translate-x-1/2 rounded-full bg-[repeating-linear-gradient(180deg,var(--color-bleu-200)_0_12px,transparent_12px_18px)] sm:left-8"
      />
      <motion.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : progress, originY: 0, backgroundPositionY: chainShift }}
        className="absolute top-8 bottom-8 left-[1.6rem] w-2 -translate-x-1/2 rounded-full bg-[repeating-linear-gradient(180deg,var(--color-bleu)_0_12px,transparent_12px_18px)] sm:left-8"
      />
      {steps.map((s, i) => (
        <StepRow key={s.title} step={s} i={i} count={steps.length} progress={progress} turn={turn} />
      ))}
    </ol>
  );
}
