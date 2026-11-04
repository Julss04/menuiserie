import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDisc } from "../../components/Hero";
import { PageIntro } from "../../components/PageIntro";
import { Reveal } from "../../components/Reveal";
import { ScrollWheel } from "../../components/ScrollWheel";
import { TextReveal } from "../../components/TextReveal";
import { BIKE_PRICES, FOUR_R } from "@/lib/annexe";

export const metadata: Metadata = {
  title: "Vélos d'occasion",
  description:
    "Achetez un vélo recyclé à L'Annexe, à Granville : 40 €, 50 € ou plus selon son état. Ou donnez-nous le vôtre, même abîmé.",
};

const JOURNEY = [
  {
    title: "Il est réparable",
    text: "Il est remis en état à l'atelier, puis revendu à petit prix.",
  },
  {
    title: "Il ne l'est pas",
    text: "Il est démonté : ses pièces de seconde main nourrissent le stock de l'atelier.",
  },
  {
    title: "Le reste",
    text: "Ce qui ne peut plus servir part au recyclage, comme matière première.",
  },
];

export default function VelosPage() {
  return (
    <>
      <PageIntro
        title="Votre vélo n'est pas un déchet"
        intro="Trop de vélos finissent abandonnés sur un trottoir ou à la déchèterie. À L'Annexe, on les collecte, on les rénove et on les remet en circulation, dans le cadre de l'économie sociale et solidaire."
      />

      {/* Acheter */}
      <section className="px-4 py-24 sm:px-6 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <TextReveal
              className="text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em]"
              segments={[{ text: "Acheter un vélo d'occasion" }]}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed">
                Vous êtes nombreux et nombreuses à vouloir un vélo d&apos;occasion, pour des raisons
                économiques ou éthiques. Nous en proposons toute l&apos;année, selon les derniers
                arrivages : un vélo vous attend peut-être à l&apos;atelier. Venez en discuter avec nous !
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} from={48}>
            <div className="rounded-[1.75rem] bg-white p-7 shadow-[0_24px_60px_-40px_rgba(35,110,118,0.55)] sm:p-9">
              <h3 className="text-2xl tracking-[-0.02em]">Les prix</h3>
              <ul className="mt-6 flex flex-wrap gap-3">
                {BIKE_PRICES.map((p, i) => (
                  <li
                    key={p}
                    className={`rounded-full px-5 py-2.5 font-titre font-bold ${
                      i < BIKE_PRICES.length - 1 ? "bg-bleu text-3xl text-white tabular-nums" : "self-center bg-bleu-100 text-lg text-bleu-900"
                    }`}
                  >
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl bg-jaune-200 p-5">
                <p className="font-bold text-bleu-900">Seule condition : être adhérent·e de l&apos;association</p>
                <p className="mt-1 leading-relaxed">
                  Adhésion de 10 à 40 € pour un an, qui donne aussi accès à l&apos;atelier.{" "}
                  <Link href="/annexe#tarifs" className="font-bold text-bleu-900 underline underline-offset-4">
                    Voir les tarifs
                  </Link>
                </p>
              </div>
              <p className="mt-6 leading-relaxed">
                Pour que tout le monde puisse avoir un vélo, nous voulons mettre en place des aides à
                l&apos;achat avec des partenaires sociaux. Renseignez-vous à l&apos;atelier.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Donner */}
      <section className="relative isolate overflow-hidden bg-jaune px-4 py-24 sm:px-6 md:py-28">
        <ScrollWheel />
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <h2 className="text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em] text-bleu-900">
              Donner son vélo, même abîmé
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-encre">
              De plus en plus de particuliers nous donnent leur vélo, tout comme des magasins de vélos ou
              des services municipaux. Apportez-le à l&apos;atelier aux horaires d&apos;ouverture : même
              s&apos;il ne roule plus, ses pièces serviront.
            </p>
          </Reveal>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {JOURNEY.map((j, i) => (
              <li key={j.title}>
                <Reveal delay={0.1 + i * 0.1}>
                  <div className="h-full rounded-[1.5rem] bg-beige p-6 sm:p-7">
                    <span className="flex size-11 items-center justify-center rounded-full border-[5px] border-bleu bg-bleu-900 font-titre text-lg font-bold text-white tabular-nums">
                      {i + 1}
                    </span>
                    <h3 className="mt-5 text-xl">{j.title}</h3>
                    <p className="mt-2 leading-relaxed">{j.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal className="mt-10">
            <Link
              href="/annexe#horaires"
              className="group inline-flex items-center gap-3 rounded-full bg-bleu-900 py-3.5 pr-4 pl-7 font-titre text-lg font-bold text-white transition-colors hover:bg-bleu"
            >
              Horaires et adresse
              <ArrowDisc />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 4R */}
      <section className="px-4 py-24 sm:px-6 md:py-32">
        <div className="mx-auto max-w-7xl">
          <TextReveal
            className="max-w-3xl text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em]"
            segments={[{ text: "Les 4R du vélo" }]}
          />
          <dl className="mt-14 grid gap-10 border-t-2 border-bleu-900/80 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {FOUR_R.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08}>
                <dt className="font-titre text-[clamp(2rem,3.6vw,2.8rem)] leading-none font-bold tracking-[-0.03em] text-bleu">
                  <span className="text-orange">R</span>
                  {r.title.slice(1)}
                </dt>
                <dd className="mt-4 text-[17px] leading-relaxed">{r.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Bénévoles démontage */}
      <section className="bg-bleu-900 px-4 py-20 text-white sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight tracking-[-0.025em] text-white">
            Une activité défouloir, ça vous dit ?
          </h2>
          <p className="mt-5 text-lg leading-relaxed">
            Venez nous aider à démonter les vélos non récupérables : on trie les pièces, on range et on
            recycle, tous ensemble. Pas besoin de savoir réparer un vélo.
          </p>
          <Link
            href="/benevole"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-jaune py-3 pr-3 pl-6 font-bold text-encre hover:bg-jaune-600"
          >
            Devenir bénévole
            <ArrowDisc className="size-8" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
