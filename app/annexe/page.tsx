import type { Metadata } from "next";
import Link from "next/link";
import { ChainSteps } from "../components/ChainSteps";
import { ArrowDisc, Hero } from "../components/Hero";
import { Marquee } from "../components/Marquee";
import { OpenStatus } from "../components/OpenStatus";
import { PriceTiles } from "../components/PriceTiles";
import { QuickInfo } from "../components/QuickInfo";
import { Reveal } from "../components/Reveal";
import { CrossList } from "../components/CrossList";
import { Stamp } from "../components/Stamp";
import { TextReveal } from "../components/TextReveal";
import { WeekTimeline } from "../components/WeekTimeline";
import { ADHESION, NOT_HANDLED, SUGGESTED_PRICES, VISIT_STEPS } from "@/lib/annexe";
import { ADDRESS } from "@/lib/schedule";

export const metadata: Metadata = {
  title: "L'Annexe, atelier vélo participatif",
  description:
    "Réparez vous-même votre vélo, aidé·e par l'équipe, à L'Annexe, l'atelier d'autoréparation de Tri-Marrant à Granville. Adhésion dès 10 €, pièces de seconde main à prix libre.",
};

const MARQUEE = ["Ici, le mécano, c'est vous", "Entraide", "Pièces de seconde main", "Prix libre", "Réemploi"];

export default function AnnexePage() {
  return (
    <>
      <Hero />
      <Marquee words={MARQUEE} />
      <QuickInfo
        items={[
          {
            question: "Est-ce ouvert ?",
            answer: (
              <span className="text-bleu-900">
                <OpenStatus tone="light" />
              </span>
            ),
            href: "/annexe#horaires",
            linkLabel: "Tous les horaires",
          },
          {
            question: "Où est l'atelier ?",
            answer: ADDRESS,
            href: `https://www.openstreetmap.org/search?query=${encodeURIComponent(ADDRESS)}`,
            linkLabel: "Voir sur la carte",
            external: true,
          },
          {
            question: "Combien ça coûte ?",
            answer: "Adhésion dès 10 € par an, puis prix libre",
            href: "/annexe#tarifs",
            linkLabel: "Voir les tarifs",
          },
        ]}
      />

      {/* L'atelier */}
      <section id="atelier" className="scroll-mt-20 px-4 py-24 sm:px-6 md:py-32">
        <div className="mx-auto max-w-7xl">
          <TextReveal
            className="max-w-4xl text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em]"
            segments={[{ text: "Ici, le mécano…" }, { text: "c'est vous !", className: "text-encre" }]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed">
              L&apos;atelier est ouvert à toute personne qui veut devenir aussi autonome que possible
              pour réparer et entretenir son vélo. Le fonctionnement est simple : on y trouve de tout,
              mais il faut y mettre du sien. Pour le coup de main, comptez sur l&apos;équipe de
              technicien·nes bénévoles et salarié·es, et sur vos propres qualités insoupçonnées.
            </p>
          </Reveal>

          <div className="mt-16">
            <ChainSteps steps={VISIT_STEPS} />
          </div>
        </div>
      </section>

      {/* Affluence et limites */}
      <section className="relative isolate overflow-hidden bg-bleu px-4 py-24 text-white sm:px-6 md:py-32">
        <svg aria-hidden viewBox="0 0 800 800" className="absolute -top-80 -left-72 -z-10 w-[60rem] max-w-none opacity-[0.12]">
          {[380, 300, 220].map((r) => (
            <circle key={r} cx={400} cy={400} r={r} fill="none" stroke="#fff1d7" strokeWidth={r === 380 ? 34 : 2} />
          ))}
        </svg>
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <TextReveal
              className="text-[clamp(2.4rem,5.4vw,4.5rem)] leading-[1] tracking-[-0.035em] text-white"
              segments={[{ text: "Sans" }, { text: "rendez-vous.", className: "text-jaune" }]}
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed">
                Venez aux horaires d&apos;ouverture, avec votre vélo. Vous êtes nombreuses et nombreux à
                venir et les places sont limitées : selon l&apos;affluence, il faudra peut-être patienter
                un peu ou repasser.
              </p>
              <p className="mt-4 max-w-lg text-lg leading-relaxed">
                Venez donc avec votre patience et votre bonne humeur !
              </p>
              <div className="mt-8 inline-flex rounded-full bg-bleu-900/60 px-5 py-3">
                <OpenStatus />
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} from={56}>
            <div className="rounded-[2rem] bg-beige p-8 text-encre shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] sm:p-10">
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] leading-tight tracking-[-0.025em]">
                Ce que l&apos;atelier ne fait pas
              </h2>
              <p className="mt-3 mb-7 leading-relaxed">Nous ne sommes pas équipés pour :</p>
              <CrossList items={NOT_HANDLED} />
              <p className="mt-8 border-t border-bleu-200 pt-5 leading-relaxed">
                Et l&apos;équipe ne répare pas à votre place : <strong className="text-bleu-900">elle vous aide à le faire.</strong>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="scroll-mt-20 px-4 py-24 sm:px-6 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <TextReveal
                className="text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em]"
                segments={[{ text: "Adhésion et prix libre" }]}
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed">
                  On adhère une fois par an pour accéder à l&apos;atelier, puis on participe librement à
                  chaque passage.
                </p>
              </Reveal>
            </div>
            <Stamp text="Participation libre · Selon vos moyens · " center="Prix libre" className="hidden md:block" />
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            {/* Adhésion */}
            <Reveal>
              <div className="flex h-full flex-col rounded-[1.75rem] bg-white p-7 shadow-[0_24px_60px_-40px_rgba(35,110,118,0.55)] sm:p-9">
                <div className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-[5px] border-jaune bg-bleu font-titre text-lg font-bold text-white">
                    1
                  </span>
                  <h3 className="text-2xl tracking-[-0.02em]">L&apos;adhésion, pour un an</h3>
                </div>
                <p className="mt-4 leading-relaxed">
                  Obligatoire pour accéder à l&apos;atelier et aux pièces détachées. En adhérant, vous
                  soutenez le projet.
                </p>
                <div className="mt-7">
                  <PriceTiles tiers={ADHESION} />
                </div>
                <p className="mt-auto pt-6 leading-relaxed">
                  L&apos;adhésion permet aussi d&apos;acheter un{" "}
                  <Link href="/annexe/velos" className="font-bold text-bleu-900 underline underline-offset-4">
                    vélo d&apos;occasion
                  </Link>
                  .
                </p>
              </div>
            </Reveal>

            {/* Prix libre */}
            <Reveal delay={0.1} from={48}>
              <div className="flex h-full flex-col rounded-[1.75rem] bg-bleu-900 p-7 text-white sm:p-9">
                <div className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-[5px] border-jaune bg-bleu font-titre text-lg font-bold text-white">
                    2
                  </span>
                  <h3 className="text-2xl tracking-[-0.02em] text-white">Le prix libre</h3>
                </div>
                <p className="mt-4 text-lg leading-relaxed">
                  L&apos;atelier vit de vos soutiens et de vos dons. Vous participez selon vos envies et
                  vos moyens, pour que le lieu continue d&apos;exister.
                </p>
                <ul className="mt-6 grid gap-3">
                  {[
                    { title: "En argent", text: "Une boîte à dons vous attend à l'accueil." },
                    { title: "En nature", text: "Un vélo, des pièces, des outils dont vous n'avez plus besoin." },
                    { title: "En temps", text: "Rejoignez l'équipe de bénévoles." },
                  ].map((d, i) => (
                    <li key={d.title}>
                      <Reveal delay={0.2 + i * 0.1} from={32}>
                        <div className="rounded-2xl bg-white/10 px-5 py-4 transition-colors hover:bg-white/15">
                          <span className="block font-bold text-jaune">{d.title}</span>
                          <span className="mt-0.5 block leading-snug">{d.text}</span>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Prix conseillés */}
          <Reveal className="mt-6">
            <div className="rounded-[1.75rem] bg-white p-7 shadow-[0_24px_60px_-40px_rgba(35,110,118,0.55)] sm:p-9">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-2xl tracking-[-0.02em]">Prix conseillés des pièces de seconde main</h3>
                <p className="text-sm font-bold text-encre/90">Pour vous donner un ordre d&apos;idée</p>
              </div>
              <ul className="mt-6 grid border-t-2 border-bleu-900/80 sm:grid-cols-2 sm:gap-x-12">
                {SUGGESTED_PRICES.map((p, i) => (
                  <li key={p.item} className="border-b border-bleu-200">
                    <Reveal delay={0.05 * i} from={-24}>
                      <div className="group flex items-baseline justify-between gap-4 py-3.5">
                        <span className="transition-transform duration-300 group-hover:translate-x-1.5">{p.item}</span>
                        <span className="font-bold whitespace-nowrap text-bleu-900 tabular-nums">{p.price}</span>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
              <div className="mt-7 grid gap-4 sm:grid-cols-2 sm:gap-12">
                <p className="leading-relaxed">
                  <strong className="text-bleu-900">Pièces de seconde main</strong> : récupérées sur des
                  vélos hors service et jugées aptes à une nouvelle vie. Toutes ne vont pas sur tous les
                  vélos (marque, année, vitesses, filetage) : un·e technicien·ne vous aide à trouver la
                  bonne.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-bleu-900">Pièces neuves</strong> : nous n&apos;en vendons pas.
                  Il faudra les apporter, en les achetant chez un vélociste.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Horaires & adresse */}
      <section id="horaires" className="scroll-mt-20 bg-bleu-100 px-4 py-24 sm:px-6 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <TextReveal
              className="text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em]"
              segments={[{ text: "Quand passer" }]}
            />
            <Reveal delay={0.05}>
              <p className="mt-4 mb-10 max-w-xl text-lg">Quatre jours par semaine, du mercredi au samedi, sans rendez-vous.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <WeekTimeline />
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:pt-[7.5rem]">
            <div className="rounded-[1.75rem] bg-bleu p-7 text-white sm:p-9">
              <h3 className="text-2xl text-white">Où nous trouver</h3>
              <p className="mt-4 text-xl leading-snug">{ADDRESS}</p>
              <p className="mt-4 leading-relaxed">L&apos;atelier vélo de l&apos;association Tri-Marrant.</p>
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

      {/* Vélos et bénévoles */}
      <section className="relative isolate overflow-hidden bg-bleu-900 px-4 py-24 text-white sm:px-6 md:py-28">
        <svg aria-hidden viewBox="0 0 800 800" className="absolute -right-72 -bottom-72 -z-10 w-[56rem] max-w-none opacity-[0.12]">
          {[380, 290, 200].map((r) => (
            <circle key={r} cx={400} cy={400} r={r} fill="none" stroke="#efb023" strokeWidth={r === 380 ? 30 : 2} />
          ))}
        </svg>
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.03em] text-white">
              Un vélo vous attend peut-être
            </h2>
            <p className="mt-5 text-lg leading-relaxed">
              Les vélos qu&apos;on nous donne sont remis en état et vendus 40 €, 50 € ou plus selon leur
              état, au fil des arrivages.
            </p>
            <Link
              href="/annexe/velos"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-jaune py-3 pr-3 pl-6 font-bold text-encre hover:bg-jaune-600"
            >
              Vélos d&apos;occasion
              <ArrowDisc className="size-8" />
            </Link>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.03em] text-white">
              Envie de donner un coup de main ?
            </h2>
            <p className="mt-5 text-lg leading-relaxed">
              Rejoignez l&apos;équipe de bénévoles : aider à l&apos;atelier, accueillir, ou démonter les
              vélos non réparables pour récupérer leurs pièces.
            </p>
            <Link
              href="/benevole"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border-2 border-white py-2.5 pr-3 pl-6 font-bold hover:bg-white hover:text-bleu-900"
            >
              Devenir bénévole
              <ArrowDisc className="size-8" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
