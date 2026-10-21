import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";

/** En-tête des pages intérieures : titre qui monte mot à mot, chapeau, anneau du symbole en fond. */
export function PageIntro({
  title,
  intro,
  tone = "bleu",
}: {
  title: string;
  intro: React.ReactNode;
  tone?: "bleu" | "jaune";
}) {
  const bleu = tone === "bleu";
  return (
    <section
      className={`relative isolate overflow-hidden px-4 pt-36 pb-20 sm:px-6 md:pt-44 md:pb-28 ${
        bleu ? "bg-bleu text-white" : "bg-jaune text-encre"
      }`}
    >
      <svg aria-hidden viewBox="0 0 800 800" className="absolute -top-56 -right-56 -z-10 w-[46rem] max-w-none opacity-20">
        {[380, 300, 220].map((r) => (
          <circle key={r} cx={400} cy={400} r={r} fill="none" stroke={bleu ? "#fff1d7" : "#236e76"} strokeWidth={r === 380 ? 34 : 2} />
        ))}
      </svg>
      <div className="mx-auto max-w-7xl">
        <TextReveal
          as="h1"
          className={`max-w-4xl text-[clamp(2.6rem,6.4vw,5rem)] leading-[1] tracking-[-0.035em] ${bleu ? "text-white" : "text-bleu-900"}`}
          segments={[{ text: title }]}
        />
        <Reveal delay={0.25}>
          <div className="mt-7 max-w-2xl text-lg leading-relaxed sm:text-xl">{intro}</div>
        </Reveal>
      </div>
    </section>
  );
}
