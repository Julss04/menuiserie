import { Reveal } from "./Reveal";

/** Gabarit lisible pour les pages légales : colonne étroite, titres clairs. */
export function LegalDoc({ updatedAt, children }: { updatedAt: string; children: React.ReactNode }) {
  const date = new Date(updatedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  return (
    <section className="px-4 py-20 sm:px-6 md:py-24">
      <Reveal>
        <article className="legal mx-auto max-w-2xl text-lg leading-relaxed">
          {children}
          <p className="mt-12 border-t border-bleu-200 pt-6 text-base text-encre/90">
            Dernière mise à jour : {date}.
          </p>
        </article>
      </Reveal>
    </section>
  );
}
