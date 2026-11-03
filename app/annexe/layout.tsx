import Image from "next/image";
import Link from "next/link";
import { AnnexeHeader } from "../components/AnnexeHeader";
import { ADDRESS } from "@/lib/schedule";

export default function AnnexeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnexeHeader />
      <main>{children}</main>
      <footer className="bg-bleu px-4 py-12 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="p-1.5">
            <Image src="/brand/lannexe-logo-blanc.svg" alt="L'Annexe, Tri-Marrant.Ose" width={275} height={61} className="h-14 w-auto" />
          </div>
          <div className="max-w-md text-[15px] leading-relaxed sm:text-right">
            <p>
              Atelier vélo participatif de l&apos;association Tri-Marrant
              <br />
              {ADDRESS}
            </p>
            <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 sm:justify-end">
              <Link href="/annexe/velos" className="font-bold underline underline-offset-4 hover:text-jaune">
                Vélos d&apos;occasion
              </Link>
              <Link href="/" className="font-bold underline underline-offset-4 hover:text-jaune">
                Tri-Marrant, la ressourcerie
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
