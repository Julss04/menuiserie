import "server-only";
import { Resend } from "resend";
import { NEED_TYPES, type Booking } from "@/lib/booking";

/**
 * Prévient l'association par e-mail. Sans clé Resend, ne fait rien :
 * la réservation reste enregistrée et visible dans /admin.
 */
export async function notifyNewBooking(booking: Booking): Promise<void> {
  const { RESEND_API_KEY, BOOKING_NOTIFY_TO, BOOKING_NOTIFY_FROM } = process.env;
  if (!RESEND_API_KEY || !BOOKING_NOTIFY_TO) return;

  const besoin = NEED_TYPES[booking.besoin];
  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: BOOKING_NOTIFY_FROM || "L'Annexe <onboarding@resend.dev>",
    to: BOOKING_NOTIFY_TO.split(",").map((s) => s.trim()),
    replyTo: booking.email,
    subject: `Nouvelle réservation : ${besoin}, ${booking.creneau}`,
    text: [
      `${booking.prenom} ${booking.nom} a demandé un créneau à L'Annexe.`,
      "",
      `Besoin : ${besoin}`,
      `Créneau : ${booking.creneau}`,
      `E-mail : ${booking.email}`,
      `Téléphone : ${booking.telephone}`,
      "",
      "Répondez directement à cet e-mail pour confirmer le rendez-vous.",
    ].join("\n"),
  });
  if (error) throw new Error(`Envoi de l'e-mail impossible : ${error.message}`);
}
