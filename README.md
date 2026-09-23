# L'Annexe — site de l'atelier vélo

Site vitrine et de réservation de **L'Annexe**, l'atelier vélo participatif de l'association Tri-Marrant à Granville (161 rue du Mesnil).

## Lancer le site en local

```bash
npm install
npm run dev
```

Puis ouvrir <http://localhost:3000> (site public) et <http://localhost:3000/admin> (tableau des réservations, démo).

Autres commandes : `npm run lint` (vérification du code), `npm run build` (version de production).

## Organisation

| Dossier | Contenu |
|---|---|
| `app/page.tsx` | La page d'accueil (sections, textes). |
| `app/components/` | Les morceaux de la page : en-tête, accueil avec le vélo animé, bandeau, horaires, formulaire… |
| `app/admin/page.tsx` | Le tableau des réservations (démo, sans connexion). |
| `app/globals.css` | Les couleurs et typographies de la charte. |
| `lib/schedule.ts` | Les horaires d'ouverture : c'est ici qu'on les modifie. |
| `lib/bookings.tsx` | Les réservations. `submitBooking` est l'unique point à brancher sur une vraie base (Firebase). |
| `public/brand/` | Les logos L'Annexe tirés de la charte (ne pas les modifier). |
| `PRODUCT.md` | Le cadre du projet : public, objectifs, contraintes, charte. |

## Charte graphique

Charte Tri-Marrant (mai 2026), pages du logo variant L'Annexe :

- Couleurs : Bleu `#2f818e` (prioritaire), Jaune canard `#efb023`, Orange couchant `#ff6542`, Beige `#fff1d7` (fond).
- Typographies : Noto Sans Bold pour les titres, Open Sans pour les textes.
- Logo : jamais sous 25 px de haut, toujours avec une marge autour, version blanche sur fond bleu.

## À savoir

- Les réservations ne sont pas encore enregistrées : elles restent dans l'onglet du navigateur. Les lignes « exemple » de `/admin` sont fictives.
- Il n'y a pas encore de photos : les fonds et le vélo sont dessinés aux couleurs de la charte.
- Mise en ligne : Vercel, qui déploie la branche `main`.
