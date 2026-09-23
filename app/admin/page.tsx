import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { NEED_TYPES } from "@/lib/booking";
import { isStorageConfigured, listBookings } from "@/lib/server/bookingStore";

export const metadata: Metadata = {
  title: "Réservations — L'Annexe",
  robots: { index: false, follow: false },
};

const createdFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Paris",
});

export default async function AdminPage() {
  // Liste lue à chaque visite, jamais figée au moment du build.
  await connection();
  const bookings = await listBookings();
  const stored = isStorageConfigured();

  return (
    <div className="min-h-screen">
      <header className="bg-bleu">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="p-1.5">
            <Image
              src="/brand/lannexe-logo-blanc.svg"
              alt="L'Annexe — retour au site"
              width={275}
              height={61}
              className="h-10 w-auto"
            />
          </Link>
          <span className="rounded-full bg-jaune px-3 py-1 text-sm font-bold text-encre">
            Espace bénévoles
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-3xl">Demandes de réservation</h1>
          <p className="text-sm font-bold text-bleu-900 tabular-nums">
            {bookings.length} demande{bookings.length > 1 ? "s" : ""}
          </p>
        </div>
        {!stored && (
          <p className="mt-4 rounded-xl bg-jaune-200 px-4 py-3 text-sm">
            Mode test : Firebase n&apos;est pas encore branché, les demandes ne sont gardées que tant
            que le serveur tourne.
          </p>
        )}

        {bookings.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
            <p className="font-titre text-xl font-bold text-bleu-900">Aucune demande pour l&apos;instant</p>
            <p className="mt-2">Les réservations faites sur le site apparaîtront ici, les plus récentes en haut.</p>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl bg-white shadow-sm">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-bleu-100 text-bleu-900">
                <tr>
                  <th className="px-4 py-3">Reçue le</th>
                  <th className="px-4 py-3">Personne</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Besoin</th>
                  <th className="px-4 py-3">Créneau</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bleu-100">
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td className="px-4 py-3 whitespace-nowrap tabular-nums">
                      {createdFormat.format(new Date(b.createdAt))}
                    </td>
                    <td className="px-4 py-3 font-bold">
                      {b.prenom} {b.nom}
                    </td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${b.email}`} className="text-bleu-900 underline underline-offset-2">
                        {b.email}
                      </a>
                      <br />
                      <a href={`tel:${b.telephone.replace(/\s/g, "")}`} className="tabular-nums">
                        {b.telephone}
                      </a>
                    </td>
                    <td className="px-4 py-3">{NEED_TYPES[b.besoin]}</td>
                    <td className="px-4 py-3">{b.creneau}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
