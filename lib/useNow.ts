"use client";

import { useSyncExternalStore } from "react";

// Rafraîchi chaque minute : assez précis pour les horaires d'ouverture.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}
const minuteKey = () => Math.floor(Date.now() / 60_000);

/**
 * L'heure du visiteur, côté client uniquement (null pendant le rendu serveur),
 * pour éviter les écarts d'hydratation sur tout ce qui dépend de la date.
 */
export function useNow(): Date | null {
  const minute = useSyncExternalStore(subscribe, minuteKey, () => null);
  return minute === null ? null : new Date(minute * 60_000);
}
