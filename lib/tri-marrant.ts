/**
 * Informations de Tri-Marrant (Ose Recyclerie), reprises de l'ancien site
 * tri-marrant.fr et des annuaires. C'est le seul endroit à modifier quand
 * une adresse, un horaire ou un contact change.
 *
 * À VÉRIFIER avant la mise en ligne : les sources ne sont pas d'accord sur
 * l'adresse de la boutique (788 avenue de l'Europe à Yquelon, ou 170 rue
 * Conillot à Granville depuis l'agrandissement de 2024) ni sur ses horaires.
 */

export const CONTACT = {
  phone: "09 87 72 66 96",
  phoneHref: "tel:+33987726696",
  email: "oserecyclerie@tri-marrant.fr",
  facebook: "https://www.facebook.com/Trimarrant.granville/",
};

export const BOUTIQUE = {
  name: "La ressourcerie Tri-Marrant",
  street: "788 avenue de l'Europe",
  city: "50400 Yquelon",
  hours: [
    { day: "Lundi", hours: "14h–18h" },
    { day: "Mardi", hours: "Fermé" },
    { day: "Mercredi", hours: "10h–12h · 14h–18h" },
    { day: "Jeudi", hours: "14h–18h" },
    { day: "Vendredi", hours: "14h–18h" },
    { day: "Samedi", hours: "10h–12h · 14h–18h" },
    { day: "Dimanche", hours: "Fermé" },
  ],
};

export const DEPOT = {
  /** Dépôt des dons à la ressourcerie. */
  hours: "Du mercredi au vendredi, de 10h à 12h, ou pendant les horaires d'ouverture de la boutique",
  /** Second point de dépôt. */
  container: "Le container Tri-Marrant de la déchèterie de Granville (Mallouet), aux horaires de la déchèterie",
};

export const FIGURES = [
  { value: 130, unit: "tonnes", label: "d'objets remis en vente au lieu d'être jetés" },
  { value: 13, unit: "salarié·es", label: "en parcours d'insertion accueilli·es chaque année" },
  { value: 60, unit: "bénévoles", label: "environ, engagé·es au quotidien" },
];

export const HISTORY = [
  {
    year: "2015",
    title: "L'idée d'une recyclerie",
    text: "Ose Environnement, la communauté de communes Granville Terre et Mer et le SIAS, qui gérait la Banque du Meuble, imaginent ensemble une recyclerie pour le territoire.",
  },
  {
    year: "2019",
    title: "Naissance d'Ose Recyclerie",
    text: "Après une étude de faisabilité favorable, l'association loi 1901 Ose Recyclerie est créée le 9 janvier. La boutique Tri-Marrant ouvre le 24 juillet, après plusieurs mois de travaux.",
  },
  {
    year: "2024",
    title: "La boutique s'agrandit",
    text: "Des locaux plus grands et une surface de vente élargie pour accueillir plus d'objets et plus de monde.",
  },
  {
    year: "Aujourd'hui",
    title: "L'Annexe ouvre ses portes",
    text: "Un atelier vélo participatif à Granville : on y répare son vélo avec un bénévole et on y trouve des vélos reconditionnés.",
  },
];

export const PARTNERS = ["ENCORE", "AFERE", "Ecologic", "Ecomaison", "Le Relais", "SEB"];

export const VOLUNTEER_TASKS = [
  "Trier et tester les objets donnés",
  "Réparer et remettre en état",
  "Mettre en rayon et conseiller",
  "Entretenir les vélos",
  "Tenir la caisse",
];
