"use client";

import { openStatus } from "@/lib/schedule";
import { useNow } from "@/lib/useNow";

export function OpenStatus({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const now = useNow();
  if (!now) return <span className="inline-block h-6" aria-hidden />;
  const status = openStatus(now);
  return (
    <a
      href="#horaires"
      className={`inline-flex items-center gap-2.5 font-bold underline-offset-4 hover:underline ${
        tone === "dark" ? "text-white" : "text-bleu-900"
      }`}
    >
      <span
        className={`relative size-2.5 rounded-full ${status.open ? "bg-jaune" : "bg-beige/60"}`}
        aria-hidden
      >
        {status.open && <span className="absolute inset-0 animate-ping rounded-full bg-jaune motion-reduce:hidden" />}
      </span>
      {status.label}
    </a>
  );
}
