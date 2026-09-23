import { createBooking } from "@/app/actions";
import type { BookingInput, BookingResult } from "./booking";

export { NEED_TYPES } from "./booking";
export type { Booking, BookingInput, NeedType } from "./booking";

/**
 * Point d'entrée unique de l'envoi d'une réservation depuis le site :
 * enregistrement (Firebase) et e-mail à l'association, côté serveur.
 */
export function submitBooking(input: BookingInput): Promise<BookingResult> {
  return createBooking(input);
}
