import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-bleu-200 bg-beige/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Zone de protection : on garde une marge autour du logo (charte p. 14). */}
        <Link href="/" className="p-1.5" aria-label="L'Annexe — accueil">
          <Image
            src="/brand/lannexe-logo.svg"
            alt="L'Annexe — Tri-Marrant.Ose"
            width={172}
            height={39}
            priority
            className="h-9 w-auto sm:h-11"
          />
        </Link>
        <nav className="flex items-center gap-1 text-sm font-bold sm:gap-4">
          <a href="#atelier" className="hidden rounded px-2 py-1 text-bleu-900 hover:text-bleu sm:inline">
            L&apos;atelier
          </a>
          <a href="#horaires" className="hidden rounded px-2 py-1 text-bleu-900 hover:text-bleu sm:inline">
            Horaires
          </a>
          <a
            href="#reserver"
            className="rounded-full bg-bleu-900 px-4 py-2 text-white transition-colors hover:bg-bleu"
          >
            Réserver
          </a>
        </nav>
      </div>
    </header>
  );
}
