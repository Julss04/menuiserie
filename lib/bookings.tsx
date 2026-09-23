"use client";

import { createContext, useCallback, useContext, useState } from "react";

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
  creneau: string;
};

export type Booking = BookingInput & {
  id: string;
  createdAt: string;
  demo: boolean;
};

// Données fictives de démonstration : ce ne sont pas de vraies réservations.
const SEED_BOOKINGS: Booking[] = [
  {
    id: "demo-1",
    nom: "Exemple",
    prenom: "Camille",
    email: "camille@exemple.fr",
    telephone: "06 00 00 00 01",
    besoin: "bilan",
    creneau: "Mercredi · 10h–11h",
    createdAt: "2026-09-20T09:12:00",
    demo: true,
  },
  {
    id: "demo-2",
    nom: "Exemple",
    prenom: "Yanis",
    email: "yanis@exemple.fr",
    telephone: "06 00 00 00 02",
    besoin: "freins-pneus",
    creneau: "Jeudi · 15h–16h",
    createdAt: "2026-09-21T17:40:00",
    demo: true,
  },
  {
    id: "demo-3",
    nom: "Exemple",
    prenom: "Louise",
    email: "louise@exemple.fr",
    telephone: "06 00 00 00 03",
    besoin: "achat",
    creneau: "Samedi · 11h–12h",
    createdAt: "2026-09-22T11:05:00",
    demo: true,
  },
];

type BookingsContextValue = {
  bookings: Booking[];
  submitBooking: (input: BookingInput) => Promise<Booking>;
};

const BookingsContext = createContext<BookingsContextValue | null>(null);

export function BookingsProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(SEED_BOOKINGS);

  // Point d'entrée unique de l'envoi : à remplacer par une écriture Firestore.
  const submitBooking = useCallback(async (input: BookingInput) => {
    const booking: Booking = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      demo: false,
    };
    setBookings((current) => [booking, ...current]);
    return booking;
  }, []);

  return (
    <BookingsContext.Provider value={{ bookings, submitBooking }}>
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  const value = useContext(BookingsContext);
  if (!value) throw new Error("useBookings doit être utilisé dans BookingsProvider");
  return value;
}
