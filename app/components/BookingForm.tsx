"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { NEED_TYPES, useBookings, type Booking, type NeedType } from "@/lib/bookings";
import { upcomingSlots } from "@/lib/schedule";

const noop = () => () => {};
const todayKey = () => new Date().toDateString();

const inputClass =
  "w-full rounded-lg border border-bleu-300 bg-white px-3 py-2.5 text-encre placeholder:text-encre/50 focus:border-bleu focus:outline-none focus:ring-2 focus:ring-bleu-200";

export function BookingForm() {
  const { submitBooking } = useBookings();
  // Les créneaux dépendent de la date du visiteur : calculés côté client uniquement.
  const today = useSyncExternalStore(noop, todayKey, () => null);
  const slots = useMemo(() => (today ? upcomingSlots(new Date(today)) : []), [today]);

  const [besoin, setBesoin] = useState<NeedType>("bilan");
  const [sending, setSending] = useState(false);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSending(true);
    const booking = await submitBooking({
      nom: String(data.get("nom")),
      prenom: String(data.get("prenom")),
      email: String(data.get("email")),
      telephone: String(data.get("telephone")),
      besoin,
      creneau: slots.find((s) => s.id === data.get("creneau"))?.label ?? "",
    });
    setSending(false);
    setConfirmed(booking);
  }

  if (confirmed) {
    return (
      <div role="status" className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="font-titre text-2xl font-bold text-bleu-900">
          Merci {confirmed.prenom}, c&apos;est noté !
        </p>
        <p className="mt-3">
          Votre demande pour <strong>{NEED_TYPES[confirmed.besoin].toLowerCase()}</strong> le{" "}
          <strong>{confirmed.creneau}</strong> a bien été envoyée. Un bénévole vous confirmera le
          rendez-vous par e-mail.
        </p>
        <button
          type="button"
          onClick={() => setConfirmed(null)}
          className="mt-6 rounded-full border-2 border-bleu-900 px-5 py-2 font-bold text-bleu-900 hover:bg-bleu-100"
        >
          Faire une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <fieldset>
        <legend className="mb-3 font-bold text-bleu-900">De quoi avez-vous besoin ?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(NEED_TYPES) as NeedType[]).map((key) => (
            <label
              key={key}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 transition-colors ${
                besoin === key
                  ? "border-bleu bg-bleu-100 text-bleu-900"
                  : "border-bleu-200 hover:border-bleu-400"
              }`}
            >
              <input
                type="radio"
                name="besoin"
                value={key}
                checked={besoin === key}
                onChange={() => setBesoin(key)}
                className="accent-bleu"
              />
              <span className="font-bold">{NEED_TYPES[key]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-bold">Prénom</span>
          <input name="prenom" required autoComplete="given-name" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-bold">Nom</span>
          <input name="nom" required autoComplete="family-name" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-bold">E-mail</span>
          <input name="email" type="email" required autoComplete="email" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-bold">Téléphone</span>
          <input name="telephone" type="tel" required autoComplete="tel" className={inputClass} />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-bold">Créneau</span>
        <select name="creneau" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Choisissez un créneau
          </option>
          {slots.map((slot) => (
            <option key={slot.id} value={slot.id}>
              {slot.label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-full bg-bleu-900 px-6 py-3.5 font-titre text-lg font-bold text-white transition-colors hover:bg-bleu disabled:opacity-60 sm:w-auto"
      >
        {sending ? "Envoi…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}
