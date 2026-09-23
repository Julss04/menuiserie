"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NEED_TYPES, submitBooking, type Booking, type NeedType } from "@/lib/bookings";
import { upcomingSlots } from "@/lib/schedule";
import { useNow } from "@/lib/useNow";
import { ArrowDisc } from "./Hero";

const inputClass =
  "w-full rounded-xl border-2 border-bleu-200 bg-white px-4 py-3 text-encre transition-colors placeholder:text-encre/50 hover:border-bleu-400 focus:border-bleu focus:outline-none";

const EASE = [0.16, 1, 0.3, 1] as const;

export function BookingForm() {
  const reduce = useReducedMotion();
  // Les créneaux dépendent de la date du visiteur : calculés côté client uniquement.
  const now = useNow();
  const day = now?.toDateString() ?? null;
  const slots = useMemo(() => (day ? upcomingSlots(new Date(day)) : []), [day]);

  const [besoin, setBesoin] = useState<NeedType>("bilan");
  const [sending, setSending] = useState(false);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const creneauId = String(data.get("creneau") ?? "");
    setSending(true);
    setError(null);
    try {
      const result = await submitBooking({
        nom: String(data.get("nom")),
        prenom: String(data.get("prenom")),
        email: String(data.get("email")),
        telephone: String(data.get("telephone")),
        besoin,
        creneauId,
        creneau: slots.find((s) => s.id === creneauId)?.label ?? "",
        site: String(data.get("site") ?? ""),
      });
      if (result.ok) setConfirmed(result.booking);
      else setError(result.error);
    } catch {
      setError("La connexion a échoué. Vérifiez votre accès à internet et réessayez.");
    } finally {
      setSending(false);
    }
  }

  const slide = reduce
    ? {}
    : {
        initial: { opacity: 0, x: 60 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -60 },
        transition: { duration: 0.45, ease: EASE },
      };

  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-beige shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
      <AnimatePresence mode="wait" initial={false}>
        {confirmed ? (
          <motion.div key="merci" role="status" className="p-7 sm:p-10" {...slide}>
            <motion.span
              className="flex size-14 items-center justify-center rounded-full border-[5px] border-jaune bg-bleu text-white"
              initial={reduce ? false : { scale: 0.4, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            >
              <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
                <motion.path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                />
              </svg>
            </motion.span>
            <p className="mt-6 font-titre text-3xl font-bold tracking-[-0.02em] text-bleu-900">
              Merci {confirmed.prenom}, c&apos;est noté.
            </p>
            <p className="mt-4 max-w-md text-lg leading-relaxed">
              Votre demande « {NEED_TYPES[confirmed.besoin].toLowerCase()} » pour le{" "}
              <strong>{confirmed.creneau}</strong> est envoyée. Un bénévole vous confirme le
              rendez-vous par e-mail à {confirmed.email}.
            </p>
            <button
              type="button"
              onClick={() => setConfirmed(null)}
              className="mt-8 rounded-full border-2 border-bleu-900 px-6 py-2.5 font-bold text-bleu-900 transition-colors hover:bg-bleu-900 hover:text-white"
            >
              Faire une autre demande
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="space-y-7 p-6 sm:p-9" {...slide}>
            <fieldset>
              <legend className="mb-3 font-titre text-lg font-bold text-bleu-900">
                Qu&apos;est-ce qui vous amène ?
              </legend>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {(Object.keys(NEED_TYPES) as NeedType[]).map((key) => {
                  const active = besoin === key;
                  return (
                    <label
                      key={key}
                      className={`relative flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3.5 font-bold transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-jaune ${
                        active
                          ? "border-bleu bg-bleu text-white"
                          : "border-bleu-200 bg-white text-encre hover:border-bleu-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="besoin"
                        value={key}
                        checked={active}
                        onChange={() => setBesoin(key)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden
                        className={`size-4 shrink-0 rounded-full border-2 ${
                          active ? "border-jaune bg-jaune shadow-[inset_0_0_0_3px_#2f818e]" : "border-bleu-300"
                        }`}
                      />
                      {NEED_TYPES[key]}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-bleu-900">Prénom</span>
                <input id="prenom" name="prenom" required autoComplete="given-name" className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-bleu-900">Nom</span>
                <input id="nom" name="nom" required autoComplete="family-name" className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-bleu-900">E-mail</span>
                <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-bleu-900">Téléphone</span>
                <input id="telephone" name="telephone" type="tel" required autoComplete="tel" className={inputClass} />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-bleu-900">Créneau</span>
              <select id="creneau" name="creneau" required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  {slots.length ? "Choisissez un créneau" : "Chargement des créneaux…"}
                </option>
                {slots.map((slot) => (
                  <option key={slot.id} value={slot.id}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </label>

            {/* Piège à robots : invisible pour les visiteurs, ignoré par les lecteurs d'écran. */}
            <input name="site" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />

            {error && (
              <p role="alert" className="rounded-xl bg-orange-100 px-4 py-3 font-bold text-orange-900">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-bleu-900 py-3.5 pr-4 pl-7 font-titre text-lg font-bold text-white transition-colors hover:bg-bleu disabled:opacity-60 sm:w-auto"
            >
              {sending ? "Envoi…" : "Envoyer ma demande"}
              <ArrowDisc />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
