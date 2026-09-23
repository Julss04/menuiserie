import Image from "next/image";
import { BookingForm } from "./components/BookingForm";
import { Header } from "./components/Header";
import { ADDRESS, OPENING_HOURS_LABELS } from "@/lib/schedule";

const SERVICES = [
  {
    title: "Bilan complet",
    text: "On passe votre vélo en revue ensemble : réglages, usure, sécurité. Vous repartez en sachant quoi surveiller.",
    accent: "bg-bleu",
  },
  {
    title: "Freins & pneus",
    text: "Crevaison, patins usés, câble qui frotte : on vous montre le geste et vous le faites avec nos outils.",
    accent: "bg-jaune",
  },
  {
    title: "Transmission",
    text: "Chaîne qui saute, vitesses capricieuses : nettoyage, réglage du dérailleur, remplacement des pièces.",
    accent: "bg-orange",
  },
  {
    title: "Vélos reconditionnés",
    text: "Des vélos donnés, remis en état par l'atelier et vendus à petit prix, au fil des arrivages.",
    accent: "bg-bleu-900",
  },
];

const STEPS = [
  { n: "1", title: "Vous réservez", text: "Choisissez un créneau pendant nos horaires d'ouverture." },
  { n: "2", title: "On répare ensemble", text: "Un bénévole vous accompagne, c'est vous qui avez les mains dans le cambouis." },
  { n: "3", title: "Vous repartez autonome", text: "Avec un vélo qui roule et un savoir-faire en plus." },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Accueil */}
        <section className="relative overflow-hidden bg-bleu text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.2fr_1fr] md:py-24">
            <div>
              <p className="mb-4 inline-block rounded-full bg-jaune px-3 py-1 text-sm font-bold text-encre">
                Atelier vélo participatif · Granville
              </p>
              <h1 className="text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
                Réparez votre vélo, avec un coup de main.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/90">
                À L&apos;Annexe, on ne dépose pas son vélo : on le répare soi-même, accompagné par
                les bénévoles de Tri-Marrant. Outils, pièces de réemploi et bonne humeur fournis.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#reserver"
                  className="rounded-full bg-jaune px-6 py-3 font-titre text-lg font-bold text-encre transition-colors hover:bg-jaune-600"
                >
                  Réserver un créneau
                </a>
                <a
                  href="#horaires"
                  className="rounded-full border-2 border-white px-6 py-3 font-bold text-white transition-colors hover:bg-white/10"
                >
                  Voir les horaires
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="rounded-3xl bg-bleu-900/40 p-8 sm:p-12">
                <Image
                  src="/brand/lannexe-logo-blanc.svg"
                  alt=""
                  width={275}
                  height={61}
                  className="h-auto w-64 sm:w-80"
                />
              </div>
            </div>
          </div>
          <div aria-hidden className="h-3 bg-[linear-gradient(90deg,var(--color-jaune)_0_33%,var(--color-orange)_33%_66%,var(--color-bleu-400)_66%)]" />
        </section>

        {/* Comment ça marche */}
        <section id="atelier" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 md:py-20">
          <h2 className="text-3xl sm:text-4xl">Comment ça marche</h2>
          <p className="mt-3 max-w-2xl">
            L&apos;Annexe est un atelier associatif : on fait circuler les savoirs, les outils et les
            pièces pour que les vélos roulent plus longtemps.
          </p>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.n} className="rounded-2xl bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-jaune bg-bleu font-titre text-lg font-bold text-white">
                  {step.n}
                </span>
                <h3 className="mt-4 text-xl">{step.title}</h3>
                <p className="mt-2">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Services */}
        <section className="bg-bleu-100">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <h2 className="text-3xl sm:text-4xl">Ce qu&apos;on fait à l&apos;atelier</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((service) => (
                <article key={service.title} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className={`h-2 ${service.accent}`} />
                  <div className="p-6">
                    <h3 className="text-xl">{service.title}</h3>
                    <p className="mt-2 text-[15px]">{service.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-8 rounded-xl border-l-4 border-orange bg-white px-5 py-4">
              <strong className="text-bleu-900">Vélos reconditionnés :</strong> ils sont vendus en
              flux tendu, selon les dons et les réparations. Passez nous voir ou réservez un créneau
              « achat » pour voir ce qui est disponible.
            </p>
          </div>
        </section>

        {/* Horaires & adresse */}
        <section id="horaires" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 md:py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl sm:text-4xl">Horaires d&apos;ouverture</h2>
              <dl className="mt-8 divide-y divide-bleu-200 rounded-2xl bg-white px-6 shadow-sm">
                {OPENING_HOURS_LABELS.map(({ day, hours }) => (
                  <div key={day} className="flex items-center justify-between gap-4 py-4">
                    <dt className="font-bold text-bleu-900">{day}</dt>
                    <dd>{hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl">Nous trouver</h2>
              <div className="mt-8 rounded-2xl bg-bleu-900 p-6 text-white shadow-sm">
                <p className="font-titre text-xl font-bold">L&apos;Annexe — Tri-Marrant</p>
                <p className="mt-2 text-white/90">{ADDRESS}</p>
                <a
                  href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(ADDRESS)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block rounded-full bg-jaune px-5 py-2 font-bold text-encre hover:bg-jaune-600"
                >
                  Ouvrir la carte
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Réservation */}
        <section id="reserver" className="scroll-mt-20 bg-jaune-200">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
            <h2 className="text-3xl sm:text-4xl">Réserver un créneau</h2>
            <p className="mt-3 mb-8">
              Sans compte, en une minute. Un bénévole vous confirme le rendez-vous par e-mail.
            </p>
            <BookingForm />
          </div>
        </section>
      </main>

      <footer className="bg-bleu text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6">
          <Image
            src="/brand/lannexe-logo-blanc.svg"
            alt="L'Annexe — Tri-Marrant.Ose"
            width={275}
            height={61}
            className="h-12 w-auto"
          />
          <p className="text-sm text-white/90">
            Atelier vélo participatif de l&apos;association Tri-Marrant · {ADDRESS}
          </p>
        </div>
      </footer>
    </>
  );
}
