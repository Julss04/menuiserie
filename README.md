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
| `app/admin/page.tsx` | L'espace bénévoles : la liste des réservations, protégée par mot de passe (`proxy.ts`). |
| `app/globals.css` | Les couleurs et typographies de la charte. |
| `lib/schedule.ts` | Les horaires d'ouverture : c'est ici qu'on les modifie. |
| `lib/booking.ts` | Les types de besoins et la vérification d'une demande. |
| `app/actions.ts` | L'envoi d'une réservation, côté serveur : enregistrement puis e-mail à l'association. |
| `lib/server/` | Firebase (enregistrement, `bookingStore.ts`) et Resend (e-mail, `notify.ts`). |
| `public/brand/` | Les logos L'Annexe tirés de la charte (ne pas les modifier). |
| `PRODUCT.md` | Le cadre du projet : public, objectifs, contraintes, charte. |

## Charte graphique

Charte Tri-Marrant (mai 2026), pages du logo variant L'Annexe :

- Couleurs : Bleu `#2f818e` (prioritaire), Jaune canard `#efb023`, Orange couchant `#ff6542`, Beige `#fff1d7` (fond).
- Typographies : Noto Sans Bold pour les titres, Open Sans pour les textes.
- Logo : jamais sous 25 px de haut, toujours avec une marge autour, version blanche sur fond bleu.

## Réservations : ce qu'il faut configurer

Les variables sont listées dans `.env.example`. En local, les copier dans `.env.local` ; en ligne, les ajouter dans Vercel (Settings → Environment Variables), puis redéployer.

| Variable | À quoi elle sert |
|---|---|
| `ADMIN_PASSWORD` | Mot de passe de l'espace bénévoles `/admin` (l'identifiant demandé par le navigateur est libre). |
| `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Enregistrement des réservations dans Firestore (collection `reservations`). |
| `RESEND_API_KEY`, `BOOKING_NOTIFY_TO` | E-mail envoyé à l'association à chaque réservation (facultatif). |
| `BOOKING_NOTIFY_FROM` | Adresse d'expédition, une fois le nom de domaine vérifié dans Resend. |

Sans Firebase : en local, les réservations restent en mémoire le temps du test ; en ligne, le formulaire affiche une erreur plutôt que de perdre une demande.

## À savoir

- Il n'y a pas encore de photos : les fonds et le vélo sont dessinés aux couleurs de la charte.
- Mise en ligne : Vercel, qui déploie la branche `main`.
