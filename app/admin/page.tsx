"use client";

import Image from "next/image";
import Link from "next/link";
import { NEED_TYPES, useBookings } from "@/lib/bookings";

const createdFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export default function AdminPage() {
  const { bookings } = useBookings();

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
            Tableau de bord · démo
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl">Demandes de réservation</h1>
        <p className="mt-2 mb-6 rounded-lg border-l-4 border-orange bg-white px-4 py-3 text-sm">
          Démonstration sans back-office : les lignes marquées « exemple » sont fictives, et les
          demandes envoyées depuis le site ne sont gardées que dans cet onglet.
        </p>

        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
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
                <tr key={b.id} className={b.demo ? "text-encre/70" : ""}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {createdFormat.format(new Date(b.createdAt))}
                  </td>
                  <td className="px-4 py-3 font-bold">
                    {b.prenom} {b.nom}
                    {b.demo ? (
                      <span className="ml-2 rounded bg-jaune-200 px-1.5 py-0.5 text-xs font-bold">
                        exemple
                      </span>
                    ) : (
                      <span className="ml-2 rounded bg-bleu-200 px-1.5 py-0.5 text-xs font-bold text-bleu-900">
                        nouvelle
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {b.email}
                    <br />
                    {b.telephone}
                  </td>
                  <td className="px-4 py-3">{NEED_TYPES[b.besoin]}</td>
                  <td className="px-4 py-3">{b.creneau}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
