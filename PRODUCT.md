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

Fixed weekly opening hours (not by-appointment-only): Mercredi 10h–12h/14h–18h, Jeudi 14h–18h, Vendredi 14h–18h, Samedi 10h–12h/14h–18h. Address: 161 rue du Mesnil, Granville. Bookings are sent through a server action, stored in Firebase Firestore and emailed to the association (Resend). `/admin` lists them and is protected by a shared volunteer password (HTTP basic auth in `proxy.ts`).

## Capabilities and Constraints

- Booking needs: nom, prénom, email, téléphone, type de besoin (bilan complet / freins-pneus / transmission / achat vélo reconditionné), créneau (drawn from the fixed weekly hours above).
- No account creation for visitors.
- Form submission goes through the single `submitBooking` function, which calls the `createBooking` server action (validation, Firestore write, email).
- `/admin` shows the stored bookings, most recent first; no mock rows.

## Brand Commitments

Name is confirmed: "L'Annexe", the Granville variant of the Tri-Marrant logo. The Tri-Marrant graphic charter (May 2026, pages on the L'Annexe variant, colors and typography) is the visual authority: Bleu #2f818e first, with Jaune canard #efb023, Orange couchant #ff6542 and Beige #fff1d7 (background, no gradient), each color with the charter's own tints; Noto Sans Bold for headings, Open Sans for text. The L'Annexe logo ships as vector files in `public/brand/` (color on light grounds, white on blue) and must not be modified, never shown under 25 px tall, and keeps its clear space. No bike photos on hand yet: the site uses drawn illustrations in the charter colors until real photos exist.

## Evidence on Hand

None yet: no real bike photos, no testimonials, no volunteer names. Future work must not invent customers, testimonials or figures.

## Product Principles

1. Booking is the one conversion action on the public site — hours and address exist to support that decision, not compete with it.
2. Keep the tone participatory and associative (circular economy, volunteer-run), not a commercial bike shop's tone.
3. `/admin` is a simple volunteer view of real bookings behind a shared password, not a full back office.
4. Keep `submitBooking` / `createBooking` the single path for a booking; don't scatter submission logic elsewhere.
