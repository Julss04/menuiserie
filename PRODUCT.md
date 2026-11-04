# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences: (1) local residents in and around Granville who own or want a bike and need repair help, advice, or an affordable reconditioned bike; (2) the association's own volunteers/staff, who need to see incoming booking requests without a back-office system.

## Product Purpose

The website of Tri-Marrant, the reuse shop (ressourcerie) run by the association Ose Recyclerie in the Granville area: donating objects, visiting the shop, the association's story and values, volunteering. L'Annexe, a self-repair bike workshop ("atelier d'autoréparation") in Granville, is a clearly visible sub-section at `/annexe` (highlighted in the main navigation and on the home page), with a second page `/annexe/velos` for buying and donating used bikes. It copies the model of the Maison du vélo de Caen (association Vélisol'): participatory only, yearly membership required (15 / 10 / 35 / 40 €), pay-what-you-can with suggested prices for second-hand parts, walk-in without booking, used bikes sold 40 €, 50 € or more to members.

## Positioning

Participatory, not transactional: visitors repair their own bike alongside a volunteer rather than dropping it off, and reconditioned bikes are sold "en flux tendu" (as stock turns over from donations/repairs, not a standing inventory) — framed around circular-economy/associative values, not a commercial bike shop.

## Operating Context

Fixed weekly opening hours, walk-in only: Mercredi 10h–12h/14h–18h, Jeudi 14h–18h, Vendredi 14h–18h, Samedi 10h–12h/14h–18h. Address: 161 rue du Mesnil, Granville (to confirm).

## Capabilities and Constraints

- No online booking, no accounts: visitors come during opening hours; places are limited.
- The workshop does not handle e-bike electrical faults, hydraulic brake bleeding or e-scooters, and the team never repairs in place of the visitor.
- Only second-hand parts are sold; new parts are brought by the visitor.
- All workshop rules and prices live in `lib/annexe.ts`; Tri-Marrant facts in `lib/tri-marrant.ts`.

## Brand Commitments

Name is confirmed: "L'Annexe", the Granville variant of the Tri-Marrant logo. The Tri-Marrant graphic charter (May 2026, pages on the L'Annexe variant, colors and typography) is the visual authority: Bleu #2f818e first, with Jaune canard #efb023, Orange couchant #ff6542 and Beige #fff1d7 (background, no gradient), each color with the charter's own tints; Noto Sans Bold for headings, Open Sans for text. The L'Annexe logo ships as vector files in `public/brand/` (color on light grounds, white on blue) and must not be modified, never shown under 25 px tall, and keeps its clear space. No bike photos on hand yet: the site uses drawn illustrations in the charter colors until real photos exist.

## Evidence on Hand

None yet: no real bike photos, no testimonials, no volunteer names. Future work must not invent customers, testimonials or figures.

## Product Principles

1. The workshop is self-repair: the visitor holds the tool, the team helps.
2. Keep the tone participatory and associative (circular economy, volunteer-run), not a commercial bike shop's tone.
3. Never invent figures, partners or testimonials: anything not confirmed by the association stays out.
