import Link from "next/link";
import { Reveal } from "./Reveal";

export type QuickInfoItem = {
  /** La question que se pose le visiteur, en clair. */
  question: string;
  /** La réponse, en gros. */
  answer: React.ReactNode;
  /** Où aller pour en savoir plus. */
  href: string;
  linkLabel: string;
  external?: boolean;
};

/**
 * Bandeau « L'essentiel » : les trois réponses qu'on cherche en arrivant,
 * en gros caractères, chacune avec un lien explicite.
 */
export function QuickInfo({ items }: { items: QuickInfoItem[] }) {
  return (
    <section aria-label="L'essentiel" className="px-4 pt-16 sm:px-6 md:pt-20">
      <ul className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.question}>
            <Reveal delay={i * 0.08} from={0} className="h-full">
              <div className="flex h-full flex-col rounded-[1.5rem] border-2 border-bleu-200 bg-white p-6 sm:p-7">
                <p className="font-bold text-bleu-900">{item.question}</p>
                <div className="mt-2 font-titre text-[clamp(1.35rem,2.4vw,1.7rem)] leading-snug font-bold text-encre">
                  {item.answer}
                </div>
                <div className="mt-auto pt-5">
                  {item.external ? (
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-2 font-bold text-bleu-900 underline decoration-2 underline-offset-4 hover:text-bleu"
                    >
                      {item.linkLabel}
                      <svg viewBox="0 0 20 20" className="size-4" aria-hidden>
                        <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 font-bold text-bleu-900 underline decoration-2 underline-offset-4 hover:text-bleu"
                    >
                      {item.linkLabel}
                      <svg viewBox="0 0 20 20" className="size-4" aria-hidden>
                        <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
