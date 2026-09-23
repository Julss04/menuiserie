"use server";

import { validateBooking, type Booking, type BookingInput, type BookingResult } from "@/lib/booking";
import { saveBooking } from "@/lib/server/bookingStore";
import { notifyNewBooking } from "@/lib/server/notify";

export async function createBooking(input: BookingInput): Promise<BookingResult> {
  if (input.site) return { ok: false, error: "La demande n'a pas pu être envoyée." };
  const clean: BookingInput = {
    besoin: input.besoin,
    creneauId: String(input.creneauId ?? ""),
    creneau: String(input.creneau ?? "").trim(),
    nom: String(input.nom ?? "").trim(),
    prenom: String(input.prenom ?? "").trim(),
    email: String(input.email ?? "").trim(),
    telephone: String(input.telephone ?? "").trim(),
  };
  const problem = validateBooking(clean);
  if (problem) return { ok: false, error: problem };

  const booking: Booking = { ...clean, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  try {
    await saveBooking(booking);
  } catch (error) {
    console.error("Réservation non enregistrée", error);
    return {
      ok: false,
      error: "La demande n'a pas pu être enregistrée. Réessayez dans un instant ou passez à l'atelier.",
    };
  }
  // L'e-mail est un plus : son échec ne doit pas faire perdre la réservation, déjà enregistrée.
  try {
    await notifyNewBooking(booking);
  } catch (error) {
    console.error("Notification de réservation non envoyée", error);
  }
  return { ok: true, booking };
}
