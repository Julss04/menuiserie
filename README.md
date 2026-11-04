# Tri-Marrant — site de la ressourcerie et de L'Annexe

Site de **Tri-Marrant**, la ressourcerie de l'association Ose Recyclerie, avec sa rubrique **L'Annexe**, l'atelier vélo d'autoréparation de Granville, sur le modèle de la Maison du vélo de Caen.

## Lancer le site en local

```bash
npm install
npm run dev
```

Puis ouvrir <http://localhost:3000> (Tri-Marrant), <http://localhost:3000/annexe> (l'atelier) et <http://localhost:3000/annexe/velos> (vélos d'occasion).

Autres commandes : `npm run lint` (vérification du code), `npm run build` (version de production).

## Organisation

| Dossier | Contenu |
|---|---|
| `app/(tri-marrant)/` | Les pages Tri-Marrant : accueil, `donner`, `boutiques`, `association`, `benevole`, avec leur en-tête et pied de page communs. |
| `app/annexe/` | L'Annexe : l'atelier (`page.tsx`) et les vélos d'occasion (`velos/page.tsx`), avec leur en-tête et pied de page. |
| `lib/annexe.ts` | Adhésion, prix conseillés, prix des vélos, déroulé d'une venue, ce que l'atelier ne fait pas : c'est ici qu'on les modifie. |
| `app/components/` | Les morceaux de pages : en-têtes, symbole animé, vélo animé, bandeaux, frise, formulaire… |
| `lib/tri-marrant.ts` | Adresse, horaires, contacts et chiffres de Tri-Marrant : c'est ici qu'on les modifie. |
| `app/globals.css` | Les couleurs et typographies de la charte. |
| `lib/schedule.ts` | Adresse et horaires de L'Annexe. |
| `public/brand/` | Les logos Tri-Marrant et L'Annexe tirés de la charte (ne pas les modifier). |
| `PRODUCT.md` | Le cadre du projet : public, objectifs, contraintes, charte. |

## Charte graphique

Charte Tri-Marrant (mai 2026) : logo principal Tri-Marrant pour le site, logo variant L'Annexe pour sa rubrique.

- Couleurs : Bleu `#2f818e` (prioritaire), Jaune canard `#efb023`, Orange couchant `#ff6542`, Beige `#fff1d7` (fond).
- Typographies : Noto Sans Bold pour les titres, Open Sans pour les textes.
- Logo : jamais sous 25 px de haut, toujours avec une marge autour, version blanche sur fond bleu.

## À savoir

- Il n'y a pas encore de photos : les fonds et le vélo sont dessinés aux couleurs de la charte.
- Mise en ligne : Vercel, qui déploie la branche `main`.
- L'atelier fonctionne sans réservation, comme à Caen. L'ancienne réservation en ligne (Firebase, Resend) a été retirée ; elle reste dans l'historique Git.
- Les informations de Tri-Marrant viennent de l'ancien site et d'annuaires : l'adresse et les horaires de la boutique sont à confirmer (voir `lib/tri-marrant.ts`).
