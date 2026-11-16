"use client";

import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/tri-marrant";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/donner", label: "Donner des objets" },
  { href: "/boutiques", label: "Horaires et adresses" },
  { href: "/association", label: "Qui sommes-nous" },
  { href: "/benevole", label: "Bénévolat" },
];

/** Petit vélo, repère de L'Annexe dans la navigation. */
function BikeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={7} cy={13} r={5.5} />
        <circle cx={25} cy={13} r={5.5} />
        <path d="M7 13l5-8h9l4 8M12 5l4 8h-9M19 3h4" />
      </g>
    </svg>
  );
}

export function TriHeader() {
  const pathname = usePathname();
  const overHero = pathname === "/";
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 80));

  // Referme le menu mobile à chaque changement de page.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || !overHero || open;
  const tone = solid ? "text-bleu-900" : "text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        solid ? "bg-beige/95 shadow-[0_8px_24px_-18px_rgba(35,110,118,0.6)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="relative block shrink-0 p-1.5" aria-label="Tri-Marrant, accueil">
          <Image
            src="/brand/tri-marrant-logo-blanc.svg"
            alt=""
            width={260}
            height={55}
            priority
            className={`h-9 w-auto transition-opacity duration-300 sm:h-11 ${solid ? "opacity-0" : "opacity-100"}`}
          />
          <Image
            src="/brand/tri-marrant-logo.svg"
            alt=""
            width={161}
            height={35}
            priority
            className={`absolute top-1.5 left-1.5 h-9 w-auto transition-opacity duration-300 sm:h-11 ${
              solid ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        <nav aria-label="Navigation principale" className={`hidden items-center gap-0.5 text-base font-bold xl:flex ${tone}`}>
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-3 py-2 hover:underline hover:underline-offset-4 ${
                  active ? "underline decoration-jaune decoration-[3px] underline-offset-[6px]" : ""
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/annexe"
            className="group ml-2 inline-flex items-center gap-2 rounded-full bg-jaune py-2.5 pr-4 pl-3.5 text-encre transition-colors hover:bg-jaune-600"
          >
            <BikeIcon className="h-4 w-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
            L&apos;Annexe
          </Link>
        </nav>

        <div className="flex items-center gap-2 xl:hidden">
          <Link href="/annexe" className="hidden items-center gap-2 rounded-full bg-jaune py-2.5 pr-4 pl-3.5 font-bold text-encre sm:inline-flex">
            <BikeIcon className="h-3.5 w-6" />
            L&apos;Annexe
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className={`flex h-12 items-center gap-2.5 rounded-full pr-5 pl-4 font-bold ${solid ? "bg-bleu-900 text-white" : "bg-white/15 text-white"}`}
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
              <motion.path
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                animate={{ d: open ? "M6 6L18 18" : "M4 8H20" }}
              />
              <motion.path
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                animate={{ d: open ? "M6 18L18 6" : "M4 16H20" }}
              />
            </svg>
            {open ? "Fermer" : "Menu"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Navigation principale"
            className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-bleu-200 bg-beige xl:hidden"
            initial={reduce ? false : { height: 0 }}
            animate={{ height: "auto" }}
            exit={reduce ? undefined : { height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="px-4 py-4 sm:px-6">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={reduce ? false : { opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className="block border-b border-bleu-200 py-3.5 font-titre text-2xl font-bold text-bleu-900"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <li className="mt-5">
                <Link
                  href="/annexe"
                  className="flex items-center gap-3 rounded-2xl bg-jaune px-5 py-4 font-titre text-xl font-bold text-encre"
                >
                  <BikeIcon className="h-5 w-8" />
                  L&apos;Annexe, l&apos;atelier vélo
                </Link>
              </li>
              <li className="mt-3">
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-bleu-900 px-5 py-4 font-bold text-white"
                >
                  Nous appeler
                  <span className="font-titre text-xl tabular-nums">{CONTACT.phone}</span>
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden
        style={{ scaleX: progress, originX: 0 }}
        className={`absolute inset-x-0 bottom-0 h-1 bg-jaune transition-opacity duration-300 ${solid && !open ? "opacity-100" : "opacity-0"}`}
      />
    </header>
  );
}
