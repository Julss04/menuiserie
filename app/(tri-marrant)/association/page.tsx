import type { Metadata } from "next";
import { Marquee } from "../../components/Marquee";
import { PageIntro } from "../../components/PageIntro";
import { Reveal } from "../../components/Reveal";
import { TextReveal } from "../../components/TextReveal";
import { Timeline } from "../../components/Timeline";
import { HISTORY, PARTNERS } from "@/lib/tri-marrant";

export const metadata: Metadata = {
  title: "L'association",
  description: "L'histoire d'Ose Recyclerie, ses valeurs, son chantier d'insertion et ses partenaires.",
};

const VALUES = [
  {
    title: "Réduire les déchets",
    text: "Éviter l'enfouissement en revalorisant les objets : on les trie, on les remet en état et on les remet en vente. Près de 130 tonnes ont déjà repris du service.",
  },
  {
    title: "Créer de l'emploi solidaire",
    text: "Chaque année, environ 13 salarié·es en parcours d'insertion travaillent à la ressourcerie. Avec nos partenaires, on les accompagne vers un emploi durable, en commençant par une première étape qui redonne confiance.",
  },
  {
    title: "Changer nos habitudes",
    text: "Visites d'écoles, ressourceries éphémères avec la Mission Locale, ateliers créatifs de réemploi chaque mois pour les adultes, les duos parent-enfant et les enfants.",
  },
];

export default function AssociationPage() {
  return (
    <>
      <PageIntro
        title="Ose Recyclerie, l'association derrière Tri-Marrant"
        intro="Une association loi 1901 née en 2019 d'une idée simple : sur le territoire de Granville Terre et Mer, les objets méritent mieux que la benne, et le réemploi peut créer des emplois."
      />

      <section className="px-4 py-24 sm:px-6 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <TextReveal
              className="text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em]"
              segments={[{ text: "Notre histoire" }]}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed">
                De l&apos;étude de faisabilité à l&apos;atelier vélo, quelques dates qui ont compté.
              </p>
            </Reveal>
          </div>
          <Timeline steps={HISTORY} />
        </div>
      </section>

      <section className="bg-bleu px-4 py-24 text-white sm:px-6 md:py-32">
        <div className="mx-auto max-w-7xl">
          <TextReveal
            className="text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em] text-white"
            segments={[{ text: "Nos valeurs" }]}
          />
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <span aria-hidden className="block h-1.5 w-16 rounded-full bg-jaune" />
                <h3 className="mt-6 text-2xl tracking-[-0.02em] text-white">{v.title}</h3>
                <p className="mt-3 text-lg leading-relaxed">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-24 md:pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <TextReveal
            className="text-[clamp(2.1rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.03em]"
            segments={[{ text: "Avec nos partenaires" }]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed">
              Ce qui ne peut pas être revendu suit d&apos;autres filières de réemploi et de recyclage, grâce
              à notre réseau.
            </p>
          </Reveal>
        </div>
        <div className="mt-12">
          <Marquee words={PARTNERS} />
        </div>
      </section>
      <div className="h-24 md:h-28" />
    </>
  );
}
