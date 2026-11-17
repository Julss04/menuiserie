import type { NextConfig } from "next";

/**
 * En-têtes de sécurité, appliqués à toutes les pages.
 *
 * Le site est une vitrine statique, sans formulaire, sans compte, sans cookie
 * et sans traceur : il ne collecte aucune donnée personnelle. Ces en-têtes le
 * protègent quand même contre les attaques courantes (clickjacking, injection
 * de contenu, détournement de type de fichier) et forcent le HTTPS.
 */
const securityHeaders = [
  // Oblige le navigateur à n'utiliser que le HTTPS pendant 2 ans (préchargeable).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Empêche le navigateur de « deviner » le type d'un fichier (anti-injection).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Empêche d'afficher le site dans un cadre sur un autre site (anti-clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Ne transmet que l'origine du site comme référent, et rien vers un site non sécurisé.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Désactive l'accès caméra, micro, géolocalisation : le site n'en a pas besoin.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // Politique de contenu : chaque type de ressource ne peut venir que du site lui-même.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js et framer-motion insèrent des styles et scripts en ligne nécessaires au site.
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      // Interdit les objets Flash/Java, verrouille la base des URL, bloque l'intégration en cadre.
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Masque l'en-tête « X-Powered-By: Next.js » (ne révèle pas la techno du site).
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
