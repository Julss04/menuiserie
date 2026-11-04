/**
 * Fonctionnement, tarifs et vente de vélos de L'Annexe, sur le modèle de la
 * Maison du vélo de Caen (association Vélisol'). C'est le seul endroit à
 * modifier quand un tarif ou une règle change.
 */

/** Adhésion annuelle à l'association, obligatoire pour l'atelier, les pièces et l'achat d'un vélo. */
export const ADHESION = [
  { name: "Tarif plein", price: 15 },
  { name: "Tarif réduit", price: 10, note: "Étudiant·es, demandeurs d'emploi, bénéficiaires des minima sociaux" },
  { name: "Tarif famille", price: 35 },
  { name: "Tarif de soutien", price: 40 },
];

/** Déroulé d'une venue à l'atelier. */
export const VISIT_STEPS = [
  {
    title: "Vous adhérez",
    text: "L'adhésion à l'association ouvre l'accès à l'atelier et aux pièces détachées, pour un an. On peut adhérer sur place.",
  },
  {
    title: "On fait le point ensemble",
    text: "À votre arrivée, un·e technicien·ne fait un pré-diagnostic avec vous : ce qu'il faut réparer, le temps nécessaire, si c'est faisable ici.",
  },
  {
    title: "On vous prête les outils",
    text: "Station de gonflage, outils classiques et spécialisés : vous recevez une boîte à outils en échange d'une pièce d'identité.",
  },
  {
    title: "Vous réparez",
    text: "C'est vous qui tenez la clé. L'équipe de bénévoles et de salarié·es vous montre le geste quand vous bloquez.",
  },
  {
    title: "Vous trouvez la pièce",
    text: "Les pièces de seconde main viennent de vélos hors service. On vous aide à trouver celle qui va sur votre vélo.",
  },
  {
    title: "Vous participez librement",
    text: "Une boîte à dons vous attend à l'accueil : vous donnez selon vos moyens, en vous aidant des prix conseillés.",
  },
];

/** Ce que l'atelier ne prend pas en charge. */
export const NOT_HANDLED = [
  "Les pannes électriques des vélos à assistance électrique",
  "La purge des freins hydrauliques",
  "Les trottinettes électriques",
];

/** Prix conseillés pour les pièces d'occasion (le prix reste libre). */
export const SUGGESTED_PRICES = [
  { item: "Chambre à air", price: "2 €" },
  { item: "Patins ou plaquettes de frein", price: "2 €" },
  { item: "Câble et gaine", price: "2 €" },
  { item: "Selle, paire de pédales", price: "3 à 5 €" },
  { item: "Pneu", price: "5 €" },
  { item: "Chaîne", price: "5 €" },
  { item: "Dérailleur", price: "5 à 10 €" },
  { item: "Roue complète", price: "10 à 15 €" },
];

/** Vente de vélos recyclés. */
export const BIKE_PRICES = ["40 €", "50 €", "Plus, selon l'état et la qualité du vélo"];

/** Les « 4R » du réemploi des vélos. */
export const FOUR_R = [
  { title: "Réduire", text: "Moins de vélos détruits chaque année : on les collecte et on les trie au lieu de les jeter." },
  { title: "Réemployer", text: "Les pièces de seconde main démontées sur les vélos non réparables repartent sur d'autres vélos." },
  { title: "Réparer", text: "Grâce à l'atelier, les vélos sont remis en état et repartent en circulation." },
  { title: "Recycler", text: "Ce qui ne sert plus part en matières premières : fer, aluminium, caoutchouc." },
];
