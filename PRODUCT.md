# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences: (1) local residents in and around Granville who own or want a bike and need repair help, advice, or an affordable reconditioned bike; (2) the association's own volunteers/staff, who need to see incoming booking requests without a back-office system.

## Product Purpose

A showcase + booking site for L'Annexe, a participatory bike workshop ("atelier vélo participatif") in Granville. Visitors book a slot to come get help; success is a completed booking request. A companion `/admin` view lets the association see those requests — currently a front-end-only proof of concept, not a real back office.

## Positioning

Participatory, not transactional: visitors repair their own bike alongside a volunteer rather than dropping it off, and reconditioned bikes are sold "en flux tendu" (as stock turns over from donations/repairs, not a standing inventory) — framed around circular-economy/associative values, not a commercial bike shop.

## Operating Context

Fixed weekly opening hours (not by-appointment-only): Mercredi 10h–12h/14h–18h, Jeudi 14h–18h, Vendredi 14h–18h, Samedi 10h–12h/14h–18h. Address: 161 rue du Mesnil, Granville. The booking form and the `/admin` dashboard share bookings via in-memory React state (a client-side context) scoped to one browser session — this is a demo mechanism, not persistence; refreshing the tab loses live submissions. `/admin` has no auth in this PoC.

## Capabilities and Constraints

- Booking needs: nom, prénom, email, téléphone, type de besoin (bilan complet / freins-pneus / transmission / achat vélo reconditionné), créneau (drawn from the fixed weekly hours above).
- No account creation for visitors.
- No backend yet: form submission is isolated behind a single `submitBooking` function specifically so it can be swapped for a Firestore write later without touching the rest of the form.
- `/admin` renders mock seed bookings plus anything submitted live in the same session; nothing is persisted server-side.

## Brand Commitments

Name is confirmed: "L'Annexe", the Granville variant of the Tri-Marrant logo. The Tri-Marrant graphic charter (May 2026, pages on the L'Annexe variant, colors and typography) is the visual authority: Bleu #2f818e first, with Jaune canard #efb023, Orange couchant #ff6542 and Beige #fff1d7 (background, no gradient), each color with the charter's own tints; Noto Sans Bold for headings, Open Sans for text. The L'Annexe logo ships as vector files in `public/brand/` (color on light grounds, white on blue) and must not be modified, never shown under 25 px tall, and keeps its clear space. No bike photos on hand yet: the site uses drawn illustrations in the charter colors until real photos exist.

## Evidence on Hand

None yet: no real bike photos, no testimonials, no volunteer names beyond what's in the mock `/admin` data (which is clearly fabricated demo data, not real bookings) — future work must not present the seed rows as real customers.

## Product Principles

1. Booking is the one conversion action on the public site — hours and address exist to support that decision, not compete with it.
2. Keep the tone participatory and associative (circular economy, volunteer-run), not a commercial bike shop's tone.
3. Treat `/admin` as a demo of the *concept* of a dashboard, not a real admin surface — no auth, no real data, and the mock rows must stay legible as mock.
4. Keep `submitBooking` the single seam where a real backend (Firebase) gets wired in later; don't scatter submission logic elsewhere.
