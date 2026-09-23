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
  title: "L'Annexe — Atelier vélo participatif à Granville",
  description:
    "Réparez votre vélo avec un bénévole ou trouvez un vélo reconditionné à L'Annexe, l'atelier vélo participatif de Tri-Marrant à Granville.",
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
