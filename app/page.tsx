import Image from "next/image";
import { BookingForm } from "./components/BookingForm";
import { ChainLine } from "./components/ChainLine";
import { ArrowDisc, Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Reveal } from "./components/Reveal";
import { ScrollWheel } from "./components/ScrollWheel";
import { TextReveal } from "./components/TextReveal";
import { SiteHeader } from "./components/SiteHeader";
import { WeekTimeline } from "./components/WeekTimeline";
import { ADDRESS } from "@/lib/schedule";

const STEPS = [
  {
    title: "Vous réservez",
    text: "Un créneau d'une heure pendant nos ouvertures, en une minute et sans compte.",
  },
  {
    title: "On répare ensemble",
    text: "Un bénévole vous montre le geste. C'est vous qui tenez la clé, nous qui tenons le vélo.",
  },
  {
    title: "Vous repartez autonome",
    text: "Avec un vélo qui roule, et de quoi faire la prochaine réparation seul·e.",
  },
];

const SERVICES = [
  {
    title: "Bilan complet",
    text: "On passe le vélo en revue ensemble : serrages, jeu de direction, usure, sécurité. Vous savez quoi surveiller.",
    tag: "Pour démarrer",
  },
  {
    title: "Freins & pneus",
    text: "Crevaison, patins usés, câble qui frotte : démontage, réglage, remontage, avec nos outils.",
    tag: "Réparations courantes",
  },
  {
    title: "Transmission",
    text: "Chaîne qui saute, vitesses capricieuses : nettoyage, réglage du dérailleur, pièces à changer.",
    tag: "Chaîne, dérailleur",
  },
  {
    title: "Achat d'un vélo reconditionné",
    text: "Des vélos donnés, remis en état à l'atelier et vendus à petit prix, au fil des arrivages.",
    tag: "En flux tendu",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />

        {/* L'atelier */}
        <section id="atelier" className="scroll-mt-20 px-4 py-24 sm:px-6 md:py-32">
          <div className="mx-auto max-w-7xl">
            <TextReveal
              className="max-w-4xl text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em]"
              segments={[
                { text: "Ici, on ne dépose pas son vélo." },
                { text: "On le répare, accompagné.", className: "text-encre" },
              ]}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed">
                L&apos;Annexe fait circuler les savoirs, les outils et les pièces pour que les vélos
                roulent plus longtemps. C&apos;est une association : pas de dépôt,
                juste un établi et quelqu&apos;un pour vous montrer.
              </p>
            </Reveal>

            <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
              <ChainLine />
              {STEPS.map((step, i) => (
                <li key={step.title}>
                  <Reveal delay={0.15 + i * 0.12}>
                    <span className="relative z-10 flex size-[3.25rem] items-center justify-center rounded-full border-[5px] border-jaune bg-bleu font-titre text-xl font-bold text-white tabular-nums">
                      {i + 1}
                    </span>
                    <h3 className="mt-6 text-2xl tracking-[-0.02em]">{step.title}</h3>
                    <p className="mt-2 max-w-xs text-[17px] leading-relaxed">{step.text}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-20 bg-bleu-100 px-4 py-24 sm:px-6 md:py-32">
          <div className="mx-auto max-w-7xl">
            <TextReveal
              className="text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em]"
              segments={[{ text: "Ce qu'on vient faire à l'atelier" }]}
            />
            <ul className="mt-12 border-t-2 border-bleu-900/80">
              {SERVICES.map((service, i) => (
                <li key={service.title} className="border-b border-bleu-300">
                  <Reveal delay={i * 0.06} from={-32}>
                    <a
                      href="#reserver"
                      className="group relative isolate -mx-4 grid items-center gap-x-8 gap-y-3 px-4 py-7 md:grid-cols-[1.1fr_1.4fr_auto] md:py-9"
                    >
                      {/* Au survol, le bleu balaie la ligne dans le sens de la flèche. */}
                      <span
                        aria-hidden
                        className="absolute inset-0 -z-10 bg-bleu-900 [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)] motion-reduce:transition-none"
                      />
                      <h3 className="text-[clamp(1.6rem,3vw,2.4rem)] leading-tight tracking-[-0.025em] transition-[color,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:text-white group-focus-visible:text-white">
                        {service.title}
                      </h3>
                      <p className="max-w-xl text-[17px] leading-relaxed transition-colors duration-500 group-hover:text-white group-focus-visible:text-white">
                        <span className="mb-1 block text-sm font-bold text-bleu-900 transition-colors duration-500 group-hover:text-jaune group-focus-visible:text-jaune">
                          {service.tag}
                        </span>
                        {service.text}
                      </p>
                      <ArrowDisc className="hidden size-12 md:inline-flex" />
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Vélos reconditionnés */}
        <section className="relative isolate overflow-hidden bg-jaune px-4 py-24 sm:px-6 md:py-28">
          <ScrollWheel />
          <div className="mx-auto max-w-7xl">
            <Reveal className="max-w-2xl">
              <TextReveal
                className="text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em] text-bleu-900"
                segments={[{ text: "Des vélos reconditionnés, au fil des arrivages." }]}
              />
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-encre">
                Les vélos qu&apos;on nous donne sont remis en état à l&apos;atelier, puis vendus à
                petit prix. Il n&apos;y a pas de stock fixe : ils partent comme ils arrivent. Le
                plus simple est de réserver un créneau « achat » pour voir ce qui est prêt.
              </p>
              <a
                href="#reserver"
                className="group mt-9 inline-flex items-center gap-3 rounded-full bg-bleu-900 py-3.5 pr-4 pl-7 font-titre text-lg font-bold text-white transition-colors hover:bg-bleu"
              >
                Venir voir les vélos
                <ArrowDisc />
              </a>
            </Reveal>
          </div>
        </section>

        {/* Horaires & adresse */}
        <section id="horaires" className="scroll-mt-20 px-4 py-24 sm:px-6 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <Reveal>
                <TextReveal
                  className="text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em]"
                  segments={[{ text: "Quand passer" }]}
                />
                <p className="mt-4 mb-10 max-w-xl text-lg">
                  Quatre jours par semaine, du mercredi au samedi.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <WeekTimeline />
              </Reveal>
            </div>
            <Reveal delay={0.2} className="lg:pt-[7.5rem]">
              <div className="rounded-[1.75rem] bg-bleu p-7 text-white sm:p-9">
                <h3 className="text-2xl text-white">Où nous trouver</h3>
                <p className="mt-4 text-xl leading-snug">
                  161 rue du Mesnil
                  <br />
                  50400 Granville
                </p>
                <p className="mt-4 leading-relaxed">
                  L&apos;atelier vélo de l&apos;association Tri-Marrant.
                </p>
                <a
                  href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(ADDRESS)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-8 inline-flex items-center gap-3 rounded-full bg-jaune py-3 pr-3 pl-6 font-bold text-encre transition-colors hover:bg-jaune-600"
                >
                  Voir sur la carte
                  <ArrowDisc className="size-8" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Réservation */}
        <section id="reserver" className="relative isolate scroll-mt-16 overflow-hidden bg-bleu-900 px-4 py-24 sm:px-6 md:py-32">
          <svg aria-hidden viewBox="0 0 800 800" className="absolute -right-72 -bottom-72 -z-10 w-[56rem] max-w-none opacity-[0.12]">
            {[380, 290, 200].map((r) => (
              <circle key={r} cx={400} cy={400} r={r} fill="none" stroke="#efb023" strokeWidth={r === 380 ? 30 : 2} />
            ))}
          </svg>
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
            <Reveal>
              <TextReveal
                className="text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em] text-white"
                segments={[{ text: "Réserver un créneau" }]}
              />
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white">
                Choisissez ce qui vous amène et l&apos;heure qui vous arrange. Un bénévole vous
                confirme le rendez-vous par e-mail.
              </p>
              <p className="mt-6 max-w-md leading-relaxed text-bleu-200">
                Pas de compte à créer. Venez avec votre vélo, on s&apos;occupe des outils.
              </p>
            </Reveal>
            <Reveal delay={0.12} from={56}>
              <BookingForm />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-bleu px-4 py-12 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="p-1.5">
            <Image src="/brand/lannexe-logo-blanc.svg" alt="L'Annexe, Tri-Marrant.Ose" width={275} height={61} className="h-14 w-auto" />
          </div>
          <p className="max-w-md text-[15px] leading-relaxed sm:text-right">
            Atelier vélo participatif de l&apos;association Tri-Marrant
            <br />
            {ADDRESS}
          </p>
        </div>
      </footer>
    </>
  );
}
