import type { Metadata } from "next";
import { ArrowDisc } from "../../components/Hero";
import { PageIntro } from "../../components/PageIntro";
import { Reveal } from "../../components/Reveal";
import { TextReveal } from "../../components/TextReveal";
import { CONTACT, VOLUNTEER_TASKS } from "@/lib/tri-marrant";

export const metadata: Metadata = {
  title: "Devenir bénévole",
  description: "Rejoignez la soixantaine de bénévoles qui font vivre la ressourcerie Tri-Marrant et L'Annexe.",
};

export default function BenevolePage() {
  return (
    <>
      <PageIntro
        tone="jaune"
        title="Donner du temps, c'est aussi donner"
        intro="Une soixantaine de personnes font vivre Tri-Marrant au quotidien. Pas besoin d'être expert·e : on apprend sur place, ensemble."
      />

      <section className="px-4 py-24 sm:px-6 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <TextReveal
              className="text-[clamp(2.1rem,4.6vw,3.5rem)] leading-[1.04] tracking-[-0.03em]"
              segments={[{ text: "Ce que font les bénévoles" }]}
            />
            <ul className="mt-10 border-t-2 border-bleu-900/80">
              {VOLUNTEER_TASKS.map((t, i) => (
                <li key={t} className="border-b border-bleu-300">
                  <Reveal delay={i * 0.05} from={-32}>
                    <p className="py-5 font-titre text-[clamp(1.4rem,2.6vw,1.9rem)] leading-tight font-bold tracking-[-0.02em] text-bleu-900">
                      {t}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <Reveal from={48}>
              <div className="rounded-[1.75rem] bg-white p-7 shadow-[0_24px_60px_-40px_rgba(35,110,118,0.55)] sm:p-9">
                <h2 className="text-2xl tracking-[-0.02em]">Une charte écrite par les bénévoles</h2>
                <p className="mt-3 text-lg leading-relaxed">
                  En mai 2019, les bénévoles ont rédigé ensemble leur charte du bénévolat. Elle fixe le
                  cadre de l&apos;engagement de chacun·e.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} from={48}>
              <div className="rounded-[1.75rem] bg-bleu p-7 text-white sm:p-9">
                <h2 className="text-2xl tracking-[-0.02em] text-white">Comment nous rejoindre</h2>
                <p className="mt-3 text-lg leading-relaxed">
                  Passez nous voir pendant les horaires d&apos;ouverture, ou écrivez-nous en disant ce qui
                  vous donne envie.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Devenir bénévole")}`}
                    className="group inline-flex items-center gap-3 rounded-full bg-jaune py-3 pr-3 pl-6 font-bold text-encre hover:bg-jaune-600"
                  >
                    Écrire à l&apos;équipe
                    <ArrowDisc className="size-8" />
                  </a>
                  <a href={CONTACT.phoneHref} className="font-bold underline underline-offset-4 tabular-nums">
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
