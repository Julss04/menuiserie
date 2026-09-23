import { OPENING_HOURS } from "./schedule";

export const NEED_TYPES = {
  bilan: "Bilan complet",
  "freins-pneus": "Freins / pneus",
  transmission: "Transmission",
  achat: "Achat d'un vélo reconditionné",
} as const;

export type NeedType = keyof typeof NEED_TYPES;

export type BookingInput = {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  besoin: NeedType;
  /** Identifiant du créneau, par ex. « 2026-09-24T14 » (jour et heure de début). */
  creneauId: string;
  /** Libellé lisible du créneau, tel qu'affiché au visiteur. */
  creneau: string;
  /** Champ piège invisible : rempli seulement par les robots de spam. */
  site?: string;
};

export type Booking = BookingInput & {
  id: string;
  createdAt: string;
};

export type BookingResult = { ok: true; booking: Booking } | { ok: false; error: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLOT = /^(\d{4})-(\d{2})-(\d{2})T(\d{2})$/;

/** Vérifie une demande côté serveur ; renvoie un message lisible en cas de problème. */
export function validateBooking(input: BookingInput, now = new Date()): string | null {
  const text = (v: unknown, max: number) => typeof v === "string" && v.trim().length > 0 && v.length <= max;
  if (!text(input.prenom, 80) || !text(input.nom, 80)) return "Indiquez votre prénom et votre nom.";
  if (!text(input.email, 200) || !EMAIL.test(input.email.trim())) return "L'adresse e-mail n'est pas valide.";
  if (!text(input.telephone, 30) || input.telephone.replace(/\D/g, "").length < 6)
    return "Le numéro de téléphone n'est pas valide.";
  if (typeof input.besoin !== "string" || !Object.hasOwn(NEED_TYPES, input.besoin))
    return "Choisissez ce qui vous amène.";

  const match = SLOT.exec(input.creneauId ?? "");
  if (!match || !text(input.creneau, 120)) return "Choisissez un créneau.";
  const [, y, m, d, h] = match.map(Number);
  const start = new Date(y, m - 1, d, h);
  const blocks = OPENING_HOURS[start.getDay()] ?? [];
  const open = blocks.some((b) => h >= b.start && h < b.end);
  if (!open) return "Ce créneau ne correspond pas aux horaires de l'atelier.";
  // Marge d'une journée pour les fuseaux horaires ; les créneaux proposés commencent demain.
  if (start.getTime() < now.getTime() - 24 * 3600 * 1000) return "Ce créneau est déjà passé.";
  return null;
}
