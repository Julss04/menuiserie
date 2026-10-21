"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Grande roue de fond qui tourne pendant qu'on fait défiler sa section. */
export function ScrollWheel() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-120, reduce ? -120 : 240]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute top-1/2 -right-24 -z-10 hidden w-[40rem] max-w-none -translate-y-1/2 opacity-90 lg:block"
    >
      <motion.svg viewBox="0 0 400 400" style={{ rotate }} className="block w-full">
        <circle cx={200} cy={200} r={170} fill="none" stroke="#2f818e" strokeWidth={34} />
        {Array.from({ length: 24 }, (_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={200}
              y1={200}
              x2={Math.round((200 + 150 * Math.cos(a)) * 100) / 100}
              y2={Math.round((200 + 150 * Math.sin(a)) * 100) / 100}
              stroke="#236e76"
              strokeWidth={2}
              opacity={0.5}
            />
          );
        })}
        <rect x={193} y={20} width={14} height={22} rx={3} fill="#ff6542" />
        <circle cx={200} cy={200} r={18} fill="#236e76" />
      </motion.svg>
      </div>
  );
}
