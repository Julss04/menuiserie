"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { TREFOIL_CENTER, TREFOIL_DOT, TREFOIL_LOOPS, TREFOIL_VIEWBOX } from "@/lib/trefoil";

/**
 * Le symbole Tri-Marrant en grand : il entre en tournant, puis continue
 * de tourner au rythme du défilement, comme le cycle qu'il représente.
 * Le tracé reste celui de la charte ; seule sa rotation est animée.
 */
export function Trefoil({ progress, className }: { progress?: MotionValue<number>; className?: string }) {
  const ref = useRef<SVGGElement>(null);
  const reduce = useReducedMotion();
  const intro = useMotionValue(reduce ? 0 : -240);
  const fallback = useMotionValue(0);
  const scrollTurn = useTransform(progress ?? fallback, [0, 1], [0, reduce ? 0 : 160]);
  const angle = useTransform(() => intro.get() + scrollTurn.get());

  useEffect(() => {
    if (reduce) return;
    const controls = animate(intro, 0, { duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 });
    return () => controls.stop();
  }, [intro, reduce]);

  useEffect(() => {
    const apply = (deg: number) =>
      ref.current?.setAttribute("transform", `rotate(${deg.toFixed(2)} ${TREFOIL_CENTER.x} ${TREFOIL_CENTER.y})`);
    apply(angle.get());
    return angle.on("change", apply);
  }, [angle]);

  return (
    <motion.svg
      viewBox={TREFOIL_VIEWBOX}
      aria-hidden
      className={className}
      initial={reduce ? false : { scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <g ref={ref}>
        {TREFOIL_LOOPS.map((d) => (
          <path key={d} d={d} fill="currentColor" />
        ))}
      </g>
      <path d={TREFOIL_DOT} fill="#edad35" />
    </motion.svg>
  );
}
