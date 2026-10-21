import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import type { Booking } from "@/lib/booking";

const COLLECTION = "reservations";

function firestore(): Firestore | null {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) return null;
  const app =
    getApps()[0] ??
    initializeApp({
      credential: cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        // Vercel stocke la clé sur une ligne : on remet les vrais retours à la ligne.
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  return getFirestore(app);
}

/** Vrai quand les réservations sont réellement enregistrées (Firebase configuré). */
export function isStorageConfigured() {
  return firestore() !== null;
}

// Sans Firebase (développement local), les réservations restent en mémoire du serveur.
const memory: Booking[] = [];

export async function saveBooking(booking: Booking): Promise<void> {
  const db = firestore();
  if (!db) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Firebase n'est pas configuré : la réservation ne peut pas être enregistrée.");
    }
    memory.unshift(booking);
    return;
  }
  await db.collection(COLLECTION).doc(booking.id).set(booking);
}

export async function listBookings(limit = 200): Promise<Booking[]> {
  const db = firestore();
  if (!db) return memory.slice(0, limit);
  const snapshot = await db.collection(COLLECTION).orderBy("createdAt", "desc").limit(limit).get();
  return snapshot.docs.map((doc) => doc.data() as Booking);
}
