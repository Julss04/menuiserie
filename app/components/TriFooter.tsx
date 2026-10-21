import Image from "next/image";
import Link from "next/link";
import { BOUTIQUE, CONTACT } from "@/lib/tri-marrant";

export function TriFooter() {
  return (
    <footer className="bg-bleu-900 px-4 pt-16 pb-10 text-white sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="inline-block p-1.5">
            <Image src="/brand/tri-marrant-logo-blanc.svg" alt="Tri-Marrant, Ose Recyclerie" width={260} height={55} className="h-14 w-auto" />
          </div>
          <p className="mt-5 max-w-sm leading-relaxed text-white/90">
            Ressourcerie solidaire du pays granvillais, portée par l&apos;association Ose Recyclerie.
          </p>
        </div>

        <div className="text-[15px] leading-relaxed">
          <h2 className="mb-3 font-titre text-lg text-jaune">Nous trouver</h2>
          <p>
            {BOUTIQUE.street}
            <br />
            {BOUTIQUE.city}
          </p>
          <p className="mt-3">
            <a href={CONTACT.phoneHref} className="font-bold tabular-nums hover:text-jaune">
              {CONTACT.phone}
            </a>
            <br />
            <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4 hover:text-jaune">
              {CONTACT.email}
            </a>
          </p>
          <a href={CONTACT.facebook} target="_blank" rel="noreferrer" className="mt-3 inline-block underline underline-offset-4 hover:text-jaune">
            Facebook
          </a>
        </div>

        <nav aria-label="Pied de page" className="text-[15px]">
          <h2 className="mb-3 font-titre text-lg text-jaune">Le site</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/donner" className="hover:text-jaune">Donner des objets</Link>
            </li>
            <li>
              <Link href="/boutiques" className="hover:text-jaune">Les boutiques</Link>
            </li>
            <li>
              <Link href="/association" className="hover:text-jaune">L&apos;association</Link>
            </li>
            <li>
              <Link href="/benevole" className="hover:text-jaune">Devenir bénévole</Link>
            </li>
            <li>
              <Link href="/annexe" className="font-bold hover:text-jaune">L&apos;Annexe, atelier vélo</Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-14 max-w-7xl border-t border-white/20 pt-6 text-sm text-white/80">
        © Ose Recyclerie · Association loi 1901 créée en 2019
      </p>
    </footer>
  );
}
