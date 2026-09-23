"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

const WHEEL_R = 104;
const REAR = { x: 132, y: 262 };
const FRONT = { x: 478, y: 262 };
const BB = { x: 296, y: 262 };
const SEAT = { x: 256, y: 128 };
const HEAD_TOP = { x: 436, y: 118 };
const HEAD_BOTTOM = { x: 448, y: 158 };

// Arrondi au centième : même valeur au rendu serveur et dans le navigateur.
const r2 = (n: number) => Math.round(n * 100) / 100;

// Plateau dentelé, calculé plutôt que dessiné à la main.
function gearPath(cx: number, cy: number, r: number, teeth: number, depth: number) {
  const points: string[] = [];
  const step = (Math.PI * 2) / (teeth * 4);
  for (let i = 0; i < teeth * 4; i++) {
    const radius = i % 4 < 2 ? r : r - depth;
    const a = i * step;
    points.push(`${(cx + radius * Math.cos(a)).toFixed(1)},${(cy + radius * Math.sin(a)).toFixed(1)}`);
  }
  return `M${points.join("L")}Z`;
}

// Rotation SVG autour d'un point exact, appliquée sans passer par React à chaque image.
function Spin({
  angle,
  cx,
  cy,
  children,
  className,
  strokeWidth,
}: {
  angle: MotionValue<number>;
  cx: number;
  cy: number;
  children: React.ReactNode;
  className?: string;
  strokeWidth?: number;
}) {
  const ref = useRef<SVGGElement>(null);
  useMotionValueEvent(angle, "change", (deg) => {
    ref.current?.setAttribute("transform", `rotate(${deg.toFixed(2)} ${cx} ${cy})`);
  });
  return (
    <g ref={ref} className={className} strokeWidth={strokeWidth}>
      {children}
    </g>
  );
}

function Wheel({ cx, cy, rotate }: { cx: number; cy: number; rotate: MotionValue<number> }) {
  const spokes = Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2;
    return (
      <line
        key={i}
        x1={cx}
        y1={cy}
        x2={r2(cx + (WHEEL_R - 12) * Math.cos(a))}
        y2={r2(cy + (WHEEL_R - 12) * Math.sin(a))}
      />
    );
  });
  return (
    <g>
      <circle cx={cx} cy={cy} r={WHEEL_R} className="stroke-jaune" strokeWidth={14} fill="none" />
      <Spin angle={rotate} cx={cx} cy={cy} className="stroke-beige/70" strokeWidth={1.6}>
        <circle cx={cx} cy={cy} r={WHEEL_R - 12} fill="none" strokeWidth={3} />
        {spokes}
        {/* Valve : repère qui rend la rotation lisible. */}
        <rect x={cx - 3} y={cy - WHEEL_R + 3} width={6} height={10} rx={2} className="fill-orange stroke-none" />
      </Spin>
      <circle cx={cx} cy={cy} r={9} className="fill-beige" />
    </g>
  );
}

/**
 * Vélo en trait, aux couleurs de la charte. `distance` (px) le fait rouler :
 * il avance et ses roues tournent exactement de la distance parcourue.
 */
export function Bicycle({ distance }: { distance: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const wheelTurn = useTransform(distance, (d) => (reduce ? 0 : (d / (2 * Math.PI * WHEEL_R)) * 360));
  const crankTurn = useTransform(wheelTurn, (w) => w * 0.6);
  const x = useTransform(distance, (d) => (reduce ? 0 : d));

  return (
    <motion.svg
      viewBox="0 0 620 380"
      role="img"
      aria-label="Un vélo dessiné aux couleurs de L'Annexe"
      style={{ x }}
      className="h-auto w-full overflow-visible"
    >
      <g className="stroke-beige" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Cadre */}
        <path d={`M${REAR.x} ${REAR.y}L${BB.x} ${BB.y}L${SEAT.x} ${SEAT.y}Z`} />
        <path d={`M${SEAT.x} ${SEAT.y}L${HEAD_TOP.x} ${HEAD_TOP.y}L${HEAD_BOTTOM.x} ${HEAD_BOTTOM.y}L${BB.x} ${BB.y}`} />
        {/* Fourche */}
        <path d={`M${HEAD_BOTTOM.x} ${HEAD_BOTTOM.y}L${FRONT.x} ${FRONT.y}`} />
        {/* Tige de selle et selle */}
        <path d={`M${SEAT.x} ${SEAT.y}L${SEAT.x - 10} ${SEAT.y - 32}`} />
        <path d={`M${SEAT.x - 44} ${SEAT.y - 36}L${SEAT.x + 18} ${SEAT.y - 36}`} strokeWidth={12} />
        {/* Potence et guidon */}
        <path d={`M${HEAD_TOP.x} ${HEAD_TOP.y}L${HEAD_TOP.x - 12} ${HEAD_TOP.y - 34}L${HEAD_TOP.x + 30} ${HEAD_TOP.y - 40}`} />
      </g>

      <Wheel cx={REAR.x} cy={REAR.y} rotate={wheelTurn} />
      <Wheel cx={FRONT.x} cy={FRONT.y} rotate={wheelTurn} />

      {/* Chaîne */}
      <path
        d={`M${REAR.x} ${REAR.y - 14}L${BB.x} ${BB.y - 30}M${REAR.x} ${REAR.y + 14}L${BB.x} ${BB.y + 30}`}
        className="stroke-beige/60"
        strokeWidth={3}
        strokeDasharray="5 4"
      />
      {/* Plateau et manivelle */}
      <Spin angle={crankTurn} cx={BB.x} cy={BB.y}>
        <path d={gearPath(BB.x, BB.y, 34, 18, 5)} className="fill-orange" />
        <circle cx={BB.x} cy={BB.y} r={20} className="fill-bleu" />
        <path d={`M${BB.x} ${BB.y}L${BB.x + 40} ${BB.y + 40}`} className="stroke-beige" strokeWidth={9} strokeLinecap="round" />
        <path d={`M${BB.x + 30} ${BB.y + 42}L${BB.x + 54} ${BB.y + 42}`} className="stroke-beige" strokeWidth={8} strokeLinecap="round" />
      </Spin>
    </motion.svg>
  );
}
