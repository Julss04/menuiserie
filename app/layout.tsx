import type { Metadata } from "next";
import { Noto_Sans, Open_Sans } from "next/font/google";
import "./globals.css";

// Charte : Noto Sans Bold pour les titres, Open Sans pour les textes.
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-noto-sans",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal", "italic"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Tri-Marrant — Ressourcerie solidaire du pays granvillais",
    template: "%s | Tri-Marrant",
  },
  description:
    "Tri-Marrant, la ressourcerie d'Ose Recyclerie : on donne une seconde vie à vos objets, on crée de l'emploi solidaire et on répare des vélos à L'Annexe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${notoSans.variable} ${openSans.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
