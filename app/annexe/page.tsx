import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDisc, Hero } from "../components/Hero";
import { Marquee } from "../components/Marquee";
import { Reveal } from "../components/Reveal";
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

          <ol className="mt-14 border-t-2 border-bleu-900/80">
            {VISIT_STEPS.map((step, i) => (
              <li key={step.title} className="border-b border-bleu-300">
                <Reveal delay={i * 0.05} from={-32}>
                  <div className="grid items-baseline gap-x-8 gap-y-2 py-6 md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.5fr)] md:py-8">
                    <span className="flex size-11 items-center justify-center rounded-full border-[5px] border-jaune bg-bleu font-titre text-lg font-bold text-white tabular-nums">
                      {i + 1}
                    </span>
                    <h3 className="text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight tracking-[-0.025em]">{step.title}</h3>
                    <p className="max-w-xl text-[17px] leading-relaxed">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Affluence et limites */}
      <section className="bg-bleu-100 px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[1.75rem] bg-white p-7 shadow-[0_24px_60px_-40px_rgba(35,110,118,0.55)] sm:p-9">
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] leading-tight tracking-[-0.025em]">Sans rendez-vous</h2>
              <p className="mt-4 text-lg leading-relaxed">
                Venez aux horaires d&apos;ouverture, avec votre vélo. Vous êtes nombreuses et nombreux à
                venir et le nombre de places est limité : selon l&apos;affluence, il faudra peut-être
                patienter un peu ou repasser.
              </p>
              <p className="mt-4 text-lg leading-relaxed">
                Venez donc avec votre patience et votre bonne humeur réparer votre vélo avec nous !
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} from={48}>
            <div className="h-full rounded-[1.75rem] bg-bleu-900 p-7 text-white sm:p-9">
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] leading-tight tracking-[-0.025em] text-white">
                Ce que l&apos;atelier ne fait pas
              </h2>
              <p className="mt-4 text-lg leading-relaxed">Nous ne sommes pas équipés pour :</p>
              <ul className="mt-4 space-y-3">
                {NOT_HANDLED.map((item) => (
                  <li key={item} className="flex gap-3 text-lg leading-snug">
                    <span aria-hidden className="mt-1.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-orange">
                      <svg viewBox="0 0 12 12" className="size-2.5">
                        <path d="M3 3l6 6M9 3l-6 6" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 leading-relaxed text-bleu-200">
                Et l&apos;équipe ne répare pas à votre place : elle vous aide à le faire.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="scroll-mt-20 px-4 py-24 sm:px-6 md:py-32">
        <div className="mx-auto max-w-7xl">
          <TextReveal
            className="text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em]"
            segments={[{ text: "Adhésion et prix libre" }]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed">
              Pour accéder à l&apos;atelier et aux pièces détachées, l&apos;adhésion à
              l&apos;association est nécessaire. En adhérant, vous soutenez le projet. Ensuite,
              l&apos;atelier fonctionne au prix libre.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <Reveal>
              <div className="rounded-[1.75rem] bg-white p-7 shadow-[0_24px_60px_-40px_rgba(35,110,118,0.55)] sm:p-9">
                <h3 className="text-2xl tracking-[-0.02em]">L&apos;adhésion, pour un an</h3>
                <dl className="mt-6 divide-y divide-bleu-100 border-y border-bleu-100">
                  {ADHESION.map((a) => (
                    <div key={a.name} className="flex items-baseline justify-between gap-6 py-4">
                      <dt>
                        <span className="font-bold text-bleu-900">{a.name}</span>
                        {a.note && <span className="mt-0.5 block text-sm text-encre/80">{a.note}</span>}
                      </dt>
                      <dd className="font-titre text-3xl font-bold text-bleu tabular-nums">{a.price} €</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 leading-relaxed">
                  L&apos;adhésion est aussi nécessaire pour acheter un{" "}
                  <Link href="/annexe/velos" className="font-bold text-bleu-900 underline underline-offset-4">
                    vélo d&apos;occasion
                  </Link>
                  .
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} from={48}>
              <div>
                <h3 className="text-2xl tracking-[-0.02em]">Le prix libre</h3>
                <p className="mt-3 text-lg leading-relaxed">
                  L&apos;atelier vit de vos soutiens et de vos dons, en nature, en argent ou en temps.
                  Une boîte à dons est à l&apos;accueil : vous participez selon vos envies et vos moyens,
                  pour que le lieu continue d&apos;exister. Pour vous donner un ordre d&apos;idée, voici
                  nos prix conseillés pour les pièces de seconde main.
                </p>
                <table className="mt-6 w-full text-left">
                  <caption className="sr-only">Prix conseillés des pièces de seconde main</caption>
                  <thead>
                    <tr className="border-b-2 border-bleu-900/80 text-sm text-bleu-900">
                      <th scope="col" className="py-2 font-bold">Pièce d&apos;occasion</th>
                      <th scope="col" className="py-2 text-right font-bold">Prix conseillé</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-bleu-200">
                    {SUGGESTED_PRICES.map((p) => (
                      <tr key={p.item}>
                        <td className="py-3">{p.item}</td>
                        <td className="py-3 text-right font-bold text-bleu-900 tabular-nums">{p.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-6 leading-relaxed">
                  <strong className="text-bleu-900">Les pièces neuves</strong>, il faudra les apporter :
                  nous ne vendons que des pièces de seconde main, récupérées sur des vélos hors service et
                  jugées aptes à une nouvelle vie. Chaque pièce n&apos;est pas compatible avec tous les
                  vélos (marque, année, système de vitesses, filetage) : un·e technicien·ne vous aide à
                  trouver la bonne.
                </p>
              </div>
            </Reveal>
          </div>
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
