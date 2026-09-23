export const ADDRESS = "161 rue du Mesnil, 50400 Granville";

type Block = { start: number; end: number };

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

export const OPENING_HOURS_LABELS: { day: string; hours: string }[] = [
  { day: "Mercredi", hours: "10h–12h · 14h–18h" },
  { day: "Jeudi", hours: "14h–18h" },
  { day: "Vendredi", hours: "14h–18h" },
  { day: "Samedi", hours: "10h–12h · 14h–18h" },
];

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
