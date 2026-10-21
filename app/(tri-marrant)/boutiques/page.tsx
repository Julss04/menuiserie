import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDisc } from "../../components/Hero";
import { PageIntro } from "../../components/PageIntro";
import { Reveal } from "../../components/Reveal";
import { ADDRESS as ANNEXE_ADDRESS, WEEK } from "@/lib/schedule";
import { BOUTIQUE, CONTACT } from "@/lib/tri-marrant";

export const metadata: Metadata = {
  title: "Les boutiques",
  description: "Adresses et horaires de la ressourcerie Tri-Marrant et de L'Annexe, l'atelier vélo de Granville.",
};

const ANNEXE_HOURS = WEEK.map((d) => ({
  day: d.name,
  hours: d.blocks.length ? d.blocks.map((b) => `${b.start}h–${b.end}h`).join(" · ") : "Fermé",
}));

const mapLink = (q: string) => `https://www.openstreetmap.org/search?query=${encodeURIComponent(q)}`;

export default function BoutiquesPage() {
  return (
    <>
      <PageIntro
        title="Deux adresses, un même esprit"
        intro="La ressourcerie pour chiner et déposer vos dons, L'Annexe pour réparer votre vélo. Les deux sont tenues par l'association Ose Recyclerie."
      />

      <section className="px-4 py-24 sm:px-6 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          {/* Ressourcerie */}
          <Reveal>
            <article className="flex h-full flex-col rounded-[2rem] bg-white p-7 shadow-[0_30px_70px_-45px_rgba(35,110,118,0.6)] sm:p-10">
              <div className="p-1.5">
                <Image src="/brand/tri-marrant-logo.svg" alt="" width={161} height={35} className="h-11 w-auto" />
              </div>
              <h2 className="mt-6 text-[clamp(1.8rem,3.4vw,2.5rem)] leading-tight tracking-[-0.025em]">
                {BOUTIQUE.name}
              </h2>
              <p className="mt-3 text-lg leading-snug">
                {BOUTIQUE.street}
                <br />
                {BOUTIQUE.city}
              </p>
              <dl className="mt-8 divide-y divide-bleu-100 border-y border-bleu-100">
                {BOUTIQUE.hours.map(({ day, hours }) => (
                  <div key={day} className="flex justify-between gap-4 py-3">
                    <dt className={`font-bold ${hours === "Fermé" ? "text-encre/60" : "text-bleu-900"}`}>{day}</dt>
                    <dd className={`tabular-nums ${hours === "Fermé" ? "text-encre/60" : ""}`}>{hours}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
                <a
                  href={mapLink(`${BOUTIQUE.street}, ${BOUTIQUE.city}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-bleu-900 py-3 pr-3 pl-6 font-bold text-white hover:bg-bleu"
                >
                  Voir sur la carte
                  <ArrowDisc className="size-8" />
                </a>
                <a href={CONTACT.phoneHref} className="font-bold text-bleu-900 underline underline-offset-4 tabular-nums">
                  {CONTACT.phone}
                </a>
              </div>
            </article>
          </Reveal>

          {/* L'Annexe */}
          <Reveal delay={0.12} from={56}>
            <article className="relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] bg-bleu p-7 text-white shadow-[0_30px_70px_-45px_rgba(0,0,0,0.7)] sm:p-10">
              <svg aria-hidden viewBox="0 0 400 400" className="absolute -right-28 -bottom-28 -z-10 w-[26rem] opacity-15">
                <circle cx={200} cy={200} r={170} fill="none" stroke="#efb023" strokeWidth={30} />
                <circle cx={200} cy={200} r={18} fill="#efb023" />
              </svg>
              <div className="p-1.5">
                <Image src="/brand/lannexe-logo-blanc.svg" alt="" width={275} height={61} className="h-11 w-auto" />
              </div>
              <h2 className="mt-6 text-[clamp(1.8rem,3.4vw,2.5rem)] leading-tight tracking-[-0.025em] text-white">
                L&apos;Annexe, atelier vélo
              </h2>
              <p className="mt-3 text-lg leading-snug">{ANNEXE_ADDRESS}</p>
              <dl className="mt-8 divide-y divide-white/20 border-y border-white/20">
                {ANNEXE_HOURS.map(({ day, hours }) => (
                  <div key={day} className="flex justify-between gap-4 py-3">
                    <dt className={`font-bold ${hours === "Fermé" ? "text-white/70" : "text-jaune"}`}>{day}</dt>
                    <dd className={`tabular-nums ${hours === "Fermé" ? "text-white/70" : ""}`}>{hours}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
                <Link
                  href="/annexe"
                  className="group inline-flex items-center gap-3 rounded-full bg-jaune py-3 pr-3 pl-6 font-bold text-encre hover:bg-jaune-600"
                >
                  Découvrir L&apos;Annexe
                  <ArrowDisc className="size-8" />
                </Link>
                <Link href="/annexe#reserver" className="font-bold underline underline-offset-4">
                  Réserver un créneau
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
