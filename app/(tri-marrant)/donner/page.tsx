import type { Metadata } from "next";
import { PageIntro } from "../../components/PageIntro";
import { Reveal } from "../../components/Reveal";
import { TextReveal } from "../../components/TextReveal";
import { CONTACT, DEPOT } from "@/lib/tri-marrant";

export const metadata: Metadata = {
  title: "Donner des objets",
  description: "Où et quand déposer vos dons à la ressourcerie Tri-Marrant, et comment faire pour les gros volumes.",
};

const WAYS = [
  {
    title: "À la ressourcerie",
    when: DEPOT.hours,
    text: "Sur place, uniquement les dons qui tiennent dans un sac ou un carton.",
  },
  {
    title: "Au container de la déchèterie",
    when: "Aux horaires de la déchèterie",
    text: `${DEPOT.container}.`,
  },
  {
    title: "On vient chez vous",
    when: "Sur rendez-vous",
    text: "Pour un déménagement, des meubles ou un gros volume, l'équipe peut se déplacer. Appelez-nous pour convenir d'un passage.",
  },
];

export default function DonnerPage() {
  return (
    <>
      <PageIntro
        title="Donner une seconde vie à vos objets"
        intro="La ressourcerie fonctionne grâce à vos dons. Ce que vous n'utilisez plus peut faire le bonheur de quelqu'un d'autre, à condition de pouvoir encore servir."
      />

      <section className="px-4 py-24 sm:px-6 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <TextReveal
              className="text-[clamp(2.1rem,4.6vw,3.5rem)] leading-[1.04] tracking-[-0.03em]"
              segments={[{ text: "La seule question à se poser" }]}
            />
            <Reveal delay={0.1}>
              <p className="mt-8 font-titre text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight font-bold tracking-[-0.02em] text-encre">
                « Est-ce que je l&apos;achèterais ? »
              </p>
              <p className="mt-6 max-w-lg text-lg leading-relaxed">
                Si la réponse est oui, votre don est le bienvenu. Si vous hésitez, contactez-nous avant
                de vous déplacer : on vous dira tout de suite si on peut le reprendre.
              </p>
              <p className="mt-6 text-lg">
                <a href={CONTACT.phoneHref} className="font-bold text-bleu-900 underline underline-offset-4 tabular-nums">
                  {CONTACT.phone}
                </a>
                <span className="mx-2 text-encre/60" aria-hidden>
                  ·
                </span>
                <a href={`mailto:${CONTACT.email}`} className="font-bold text-bleu-900 underline underline-offset-4">
                  {CONTACT.email}
                </a>
              </p>
            </Reveal>
          </div>

          <ol className="grid gap-5">
            {WAYS.map((w, i) => (
              <li key={w.title}>
                <Reveal delay={0.08 * i} from={48}>
                  <div className="grid gap-4 rounded-[1.75rem] bg-white p-6 shadow-[0_24px_60px_-40px_rgba(35,110,118,0.55)] sm:grid-cols-[auto_1fr] sm:p-8">
                    <span className="flex size-12 items-center justify-center rounded-full border-[5px] border-jaune bg-bleu font-titre text-lg font-bold text-white tabular-nums">
                      {i + 1}
                    </span>
                    <div>
                      <h2 className="text-2xl tracking-[-0.02em]">{w.title}</h2>
                      <p className="mt-1 font-bold text-bleu-900">{w.when}</p>
                      <p className="mt-3 leading-relaxed">{w.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-bleu-100 px-4 py-20 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight tracking-[-0.025em]">
            Et ce qu&apos;on ne peut pas revendre ?
          </h2>
          <p className="mt-5 text-lg leading-relaxed">
            Rien ne part à la benne sans avoir été regardé. Ce qui ne trouve pas preneur en boutique est
            confié à nos partenaires du réemploi et du recyclage, ou donné à d&apos;autres associations.
          </p>
        </Reveal>
      </section>
    </>
  );
}
