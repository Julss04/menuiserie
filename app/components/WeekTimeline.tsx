"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WEEK } from "@/lib/schedule";
import { useNow } from "@/lib/useNow";

const FIRST = 9;
const LAST = 19;
const pct = (hour: number) => `${((hour - FIRST) / (LAST - FIRST)) * 100}%`;
const TICKS = [10, 12, 14, 16, 18];

/** Les horaires dessinés comme une semaine : chaque barre est une plage d'ouverture. */
export function WeekTimeline() {
  const now = useNow();
  const reduce = useReducedMotion();
  const today = now?.getDay();
  const hourNow = now ? now.getHours() + now.getMinutes() / 60 : null;

  return (
    <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_24px_60px_-40px_rgba(35,110,118,0.55)] sm:p-7">
      <div className="grid grid-cols-[5.5rem_1fr] gap-x-3 sm:grid-cols-[7rem_1fr]">
        <div />
        <div className="relative mb-2 h-5 text-xs font-bold text-encre/70 tabular-nums">
          {TICKS.map((h) => (
            <span key={h} className="absolute -translate-x-1/2" style={{ left: pct(h) }}>
              {h}h
            </span>
          ))}
        </div>

        {WEEK.map((day, row) => {
          const isToday = day.index === today;
          const closed = day.blocks.length === 0;
          return (
            <div key={day.name} className="contents">
              <div
                className={`flex items-center gap-2 py-2.5 text-[15px] font-bold ${
                  closed ? "text-encre/60" : "text-bleu-900"
                }`}
              >
                {day.name}
              </div>
              <div
                className={`relative my-1 rounded-full ${isToday ? "bg-jaune-200" : "bg-bleu-100"} ${
                  closed ? "opacity-70" : ""
                }`}
              >
                {TICKS.map((h) => (
                  <span key={h} aria-hidden className="absolute inset-y-1 w-px bg-bleu-200" style={{ left: pct(h) }} />
                ))}
                {closed && (
                  <span className="absolute inset-y-0 left-3 flex items-center text-xs font-bold text-encre/70">
                    Fermé
                  </span>
                )}
                {day.blocks.map((b) => (
                  <motion.span
                    key={b.start}
                    className="absolute inset-y-1 flex items-center justify-center rounded-full bg-bleu text-[11px] font-bold whitespace-nowrap text-white tabular-nums sm:text-xs"
                    style={{ left: pct(b.start), width: `calc(${pct(b.end)} - ${pct(b.start)})`, originX: 0 }}
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: row * 0.06 }}
                  >
                    <span className="hidden sm:inline">
                      {b.start}h–{b.end}h
                    </span>
                  </motion.span>
                ))}
                {isToday && hourNow !== null && hourNow > FIRST && hourNow < LAST && (
                  <span
                    aria-label="Heure actuelle"
                    className="absolute -inset-y-1 w-0.5 rounded bg-orange-900"
                    style={{ left: pct(hourNow) }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {today !== undefined && (
        <p className="mt-4 text-sm text-encre/80">
          La ligne jaune, c&apos;est aujourd&apos;hui.
        </p>
      )}
    </div>
  );
}
