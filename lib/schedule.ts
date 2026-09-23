export const ADDRESS = "161 rue du Mesnil, 50400 Granville";

export type Block = { start: number; end: number };

// Horaires fixes de l'atelier, indexés par getDay() (0 = dimanche).
export const OPENING_HOURS: Record<number, Block[]> = {
  3: [
    { start: 10, end: 12 },
    { start: 14, end: 18 },
  ],
  4: [{ start: 14, end: 18 }],
  5: [{ start: 14, end: 18 }],
  6: [
    { start: 10, end: 12 },
    { start: 14, end: 18 },
  ],
};

const DAY_NAMES = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

/** La semaine du lundi au dimanche, pour l'affichage des horaires. */
export const WEEK = [1, 2, 3, 4, 5, 6, 0].map((index) => ({
  index,
  name: DAY_NAMES[index].charAt(0).toUpperCase() + DAY_NAMES[index].slice(1),
  blocks: OPENING_HOURS[index] ?? [],
}));

/** Phrase courte qui dit si l'atelier est ouvert, ou quand il ouvre. */
export function openStatus(now: Date): { open: boolean; label: string } {
  const hour = now.getHours() + now.getMinutes() / 60;
  const today = OPENING_HOURS[now.getDay()] ?? [];
  const current = today.find((b) => hour >= b.start && hour < b.end);
  if (current) return { open: true, label: `Ouvert maintenant, jusqu'à ${current.end}h` };
  const later = today.find((b) => hour < b.start);
  if (later) return { open: false, label: `Ouvre aujourd'hui à ${later.start}h` };
  for (let offset = 1; offset <= 7; offset++) {
    const day = (now.getDay() + offset) % 7;
    const blocks = OPENING_HOURS[day];
    if (blocks) {
      const when = offset === 1 ? "demain" : DAY_NAMES[day];
      return { open: false, label: `Prochaine ouverture ${when} à ${blocks[0].start}h` };
    }
  }
  return { open: false, label: "Fermé" };
}

export type Slot = { id: string; label: string };

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

/** Créneaux d'une heure sur les `days` prochains jours d'ouverture. */
export function upcomingSlots(from: Date, days = 14): Slot[] {
  const slots: Slot[] = [];
  for (let offset = 1; offset <= days; offset++) {
    const date = new Date(from);
    date.setDate(from.getDate() + offset);
    const blocks = OPENING_HOURS[date.getDay()];
    if (!blocks) continue;
    const dayLabel = dateFormat.format(date);
    const isoDay = date.toISOString().slice(0, 10);
    for (const { start, end } of blocks) {
      for (let hour = start; hour < end; hour++) {
        slots.push({
          id: `${isoDay}T${String(hour).padStart(2, "0")}`,
          label: `${dayLabel.charAt(0).toUpperCase()}${dayLabel.slice(1)} · ${hour}h–${hour + 1}h`,
        });
      }
    }
  }
  return slots;
}
