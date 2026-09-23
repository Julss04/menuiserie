"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  // Transparent sur le bleu de l'accueil, fond beige dès qu'on en sort.
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 80));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-[background-color,box-shadow] duration-300 ${
        solid ? "bg-beige/95 shadow-[0_8px_24px_-18px_rgba(35,110,118,0.6)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="relative block p-1.5" aria-label="L'Annexe, retour en haut">
          <Image
            src="/brand/lannexe-logo-blanc.svg"
            alt=""
            width={275}
            height={61}
            priority
            className={`h-9 w-auto transition-opacity duration-300 sm:h-11 ${solid ? "opacity-0" : "opacity-100"}`}
          />
          <Image
            src="/brand/lannexe-logo.svg"
            alt=""
            width={172}
            height={39}
            priority
            className={`absolute top-1.5 left-1.5 h-9 w-auto transition-opacity duration-300 sm:h-11 ${
              solid ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>
        <nav className={`flex items-center gap-1 text-[15px] font-bold sm:gap-2 ${solid ? "text-bleu-900" : "text-white"}`}>
          <a href="#atelier" className="hidden rounded-full px-3 py-2 hover:underline hover:underline-offset-4 md:inline">
            L&apos;atelier
          </a>
          <a href="#services" className="hidden rounded-full px-3 py-2 hover:underline hover:underline-offset-4 md:inline">
            Services
          </a>
          <a href="#horaires" className="hidden rounded-full px-3 py-2 hover:underline hover:underline-offset-4 sm:inline">
            Horaires
          </a>
          <a
            href="#reserver"
            className={`ml-1 rounded-full px-5 py-2.5 transition-colors ${
              solid ? "bg-bleu-900 text-white hover:bg-bleu" : "bg-jaune text-encre hover:bg-jaune-600"
            }`}
          >
            Réserver
          </a>
        </nav>
      </div>
    </header>
  );
}
