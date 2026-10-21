import Link from "next/link";
import { CountUp } from "../components/CountUp";
import { ArrowDisc } from "../components/Hero";
import { Marquee } from "../components/Marquee";
import { Reveal } from "../components/Reveal";
import { ScrollWheel } from "../components/ScrollWheel";
import { TextReveal } from "../components/TextReveal";
import { TriHero } from "../components/TriHero";
import { BOUTIQUE, CONTACT, DEPOT, FIGURES } from "@/lib/tri-marrant";

const MISSIONS = [
  {
    title: "Réemployer",
    text: "Chaque objet trié, réparé et remis en vente, c'est un objet qui ne part pas à l'enfouissement. Ce qu'on ne peut pas revendre part chez nos partenaires du recyclage.",
  },
  {
    title: "Insérer",
    text: "La ressourcerie est aussi un lieu de travail : on y accueille des personnes éloignées de l'emploi, pour une première étape qui redonne confiance.",
  },
  {
    title: "Sensibiliser",
    text: "Visites d'écoles, ressourceries éphémères, ateliers créatifs de réemploi chaque mois, pour les adultes comme pour les enfants.",
  },
];

const MARQUEE = ["Donner", "Trier", "Réparer", "Revendre", "Sensibiliser", "Insérer"];

export default function Home() {
  return (
    <>
      <TriHero />
      <Marquee words={MARQUEE} />

      {/* Chiffres */}
      <section className="px-4 py-24 sm:px-6 md:py-32">
        <div className="mx-auto max-w-7xl">
          <TextReveal
            className="max-w-4xl text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em]"
            segments={[
              { text: "Une ressourcerie, c'est un magasin." },
              { text: "Et beaucoup plus que ça.", className: "text-encre" },
            ]}
          />
          <dl className="mt-16 grid gap-y-12 border-t-2 border-bleu-900/80 md:grid-cols-3">
            {FIGURES.map((f, i) => (
              <Reveal key={f.unit} delay={i * 0.1} className="pt-8 md:pr-10">
                <dt className="sr-only">{f.unit}</dt>
                <dd>
                  <span className="block font-titre text-[clamp(3.5rem,8vw,6rem)] leading-none font-bold tracking-[-0.04em] text-bleu">
                    {f.value === 60 ? <CountUp value={60} prefix="≈" /> : <CountUp value={f.value} />}
                  </span>
                  <span className="mt-3 block font-titre text-xl font-bold text-bleu-900">{f.unit}</span>
                  <span className="mt-1 block max-w-xs text-[17px] leading-relaxed">{f.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Missions */}
      <section className="bg-bleu-100 px-4 py-24 sm:px-6 md:py-32">
        <div className="mx-auto max-w-7xl">
          <TextReveal
            className="text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em]"
            segments={[{ text: "Trois raisons d'exister" }]}
          />
          <ol className="mt-12">
            {MISSIONS.map((m, i) => (
              <li key={m.title} className="border-t border-bleu-300 last:border-b">
                <Reveal delay={i * 0.06} from={-32}>
                  <div className="grid items-baseline gap-x-10 gap-y-3 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:py-10">
                    <h3 className="text-[clamp(2rem,4vw,3.25rem)] leading-none tracking-[-0.03em]">{m.title}</h3>
                    <p className="max-w-xl text-lg leading-relaxed">{m.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal className="mt-10">
            <Link href="/association" className="group inline-flex items-center gap-3 font-titre text-lg font-bold text-bleu-900">
              Notre histoire et nos valeurs
              <ArrowDisc />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* L'Annexe */}
      <section className="relative isolate overflow-hidden bg-jaune px-4 py-24 sm:px-6 md:py-32">
        <ScrollWheel />
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-2xl">
            <p className="font-titre text-lg font-bold text-bleu-900">Nouveau à Granville</p>
            <h2 className="mt-3 text-[clamp(2.6rem,6vw,4.75rem)] leading-[0.98] tracking-[-0.035em] text-bleu-900">
              L&apos;Annexe, l&apos;atelier vélo participatif
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-encre">
              Venez réparer votre vélo avec un bénévole, avec nos outils et des pièces de réemploi. Et
              si vous cherchez un vélo, on en remet en état au fil des dons.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
              <Link
                href="/annexe"
                className="group inline-flex items-center gap-3 rounded-full bg-bleu-900 py-3.5 pr-4 pl-7 font-titre text-lg font-bold text-white transition-colors hover:bg-bleu"
              >
                Découvrir L&apos;Annexe
                <ArrowDisc />
              </Link>
              <Link href="/annexe#reserver" className="font-bold text-bleu-900 underline underline-offset-4">
                Réserver un créneau à l&apos;atelier
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Donner */}
      <section className="px-4 py-24 sm:px-6 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <TextReveal
              className="text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em]"
              segments={[{ text: "Vous l'achèteriez ?" }, { text: "Alors donnez-le.", className: "text-encre" }]}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed">
                La ressourcerie vit de vos dons. Si l&apos;objet est en état d&apos;être réutilisé, il
                a sa place chez nous. En cas de doute, appelez-nous au{" "}
                <a href={CONTACT.phoneHref} className="font-bold whitespace-nowrap text-bleu-900 underline underline-offset-4">
                  {CONTACT.phone}
                </a>
                .
              </p>
            </Reveal>
          </div>
          <ul className="grid gap-4">
            {[
              { title: "À la ressourcerie", text: `${DEPOT.hours}. Sur place, uniquement ce qui tient dans un sac ou un carton.` },
              { title: "À la déchèterie", text: `${DEPOT.container}.` },
              { title: "Gros volumes", text: "Un déménagement, des meubles ? On peut se déplacer : appelez-nous pour convenir d'un passage." },
            ].map((d, i) => (
              <li key={d.title}>
                <Reveal delay={0.1 + i * 0.08} from={48}>
                  <div className="rounded-[1.5rem] bg-white p-6 shadow-[0_24px_60px_-40px_rgba(35,110,118,0.55)] sm:p-7">
                    <h3 className="text-xl">{d.title}</h3>
                    <p className="mt-2 leading-relaxed">{d.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Boutique + bénévolat */}
      <section className="bg-bleu px-4 py-24 text-white sm:px-6 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.03em] text-white">Venir chiner</h2>
            <p className="mt-5 text-lg leading-relaxed">
              {BOUTIQUE.street}, {BOUTIQUE.city}. Le stock change tous les jours, au fil des dons :
              on ne sait jamais ce qu&apos;on va trouver.
            </p>
            <Link href="/boutiques" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-jaune py-3 pr-3 pl-6 font-bold text-encre hover:bg-jaune-600">
              Horaires et accès
              <ArrowDisc className="size-8" />
            </Link>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.03em] text-white">Donner du temps</h2>
            <p className="mt-5 text-lg leading-relaxed">
              Une soixantaine de bénévoles font vivre la ressourcerie : tri, réparation, mise en rayon,
              vélos, caisse. Une heure ou une journée, chaque coup de main compte.
            </p>
            <Link href="/benevole" className="group mt-8 inline-flex items-center gap-3 rounded-full border-2 border-white py-2.5 pr-3 pl-6 font-bold hover:bg-white hover:text-bleu-900">
              Devenir bénévole
              <ArrowDisc className="size-8" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
