/**
 * Fonctionnement, tarifs et vente de vélos de L'Annexe, sur le modèle de la
 * Maison du vélo de Caen (association Vélisol'). C'est le seul endroit à
 * modifier quand un tarif ou une règle change.
 */

/** Adhésion annuelle à l'association, obligatoire pour l'atelier, les pièces et l'achat d'un vélo. */
export const ADHESION_PRICE = 9;

export const ADHESION = [
  {
    name: "Adhésion annuelle",
    price: ADHESION_PRICE,
    note: "Valable un an. Les pièces se paient en plus, selon la grille tarifaire.",
  },
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
    title: "Vous payez vos pièces",
    text: "L'adhésion donne accès à l'atelier. Ensuite, vous ne réglez que les pièces dont vous avez eu besoin, à l'unité, selon la grille tarifaire.",
  },
];

/** Ce que l'atelier ne prend pas en charge. */
export const NOT_HANDLED = [
  "Les pannes électriques des vélos à assistance électrique",
  "La purge des freins hydrauliques",
  "Les trottinettes électriques",
];

/**
 * Grille tarifaire solidaire des pièces de seconde main, vendues à l'unité.
 * Source : budget solidaire de l'atelier (feuille « Tarifs solidaires »).
 * Ce sont des PROPOSITIONS, à valider par l'association avant publication
 * définitive. Un prix `null` n'est pas affiché ; ajouter, retirer ou renommer
 * des lignes est libre.
 */
export const PIECE_GROUPS: {
  family: string;
  items: { item: string; price: number | null; note?: string }[];
}[] = [
  {
    family: "Pneus et roues",
    items: [
      { item: "Chambre à air", price: 3 },
      {
        item: "Pneu vélo ville",
        price: 5,
        note: "Selon l'état et la dimension",
      },
      { item: "Pneu VTT", price: 6, note: "Selon l'état et la dimension" },
      { item: "Roue avant", price: 8, note: "Occasion, contrôlée" },
      { item: "Roue arrière", price: 10, note: "Occasion, contrôlée" },
      { item: "Fond de jante", price: 1 },
    ],
  },
  {
    family: "Freinage",
    items: [
      { item: "Patins de frein (paire)", price: 2 },
      { item: "Câble de frein", price: 2 },
      { item: "Levier de frein", price: 3 },
      { item: "Étrier de frein", price: 4 },
      { item: "Disque de frein", price: 5 },
    ],
  },
  {
    family: "Transmission",
    items: [
      { item: "Chaîne", price: 5 },
      { item: "Cassette", price: 6, note: "Selon état et nombre de vitesses" },
      { item: "Pignon", price: 2 },
      { item: "Dérailleur avant", price: 5 },
      { item: "Dérailleur arrière", price: 6 },
      { item: "Manette de vitesse", price: 4 },
      { item: "Pédalier", price: 8 },
      { item: "Pédale (l'unité)", price: 2 },
    ],
  },
  {
    family: "Accessoires",
    items: [
      { item: "Sonnette", price: 1 },
      { item: "Éclairage avant", price: 3 },
      { item: "Éclairage arrière", price: 2 },
      { item: "Catadioptre", price: 1 },
      { item: "Poignées (paire)", price: 2 },
      { item: "Selle", price: 4 },
      { item: "Béquille", price: 3 },
      { item: "Porte-bidon", price: 2 },
      { item: "Garde-boue", price: 3 },
      { item: "Antivol simple", price: 3, note: "Selon état" },
    ],
  },
  {
    family: "Petites fournitures",
    items: [
      { item: "Rustines", price: 1 },
      {
        item: "Visserie et petits accessoires",
        price: 1,
        note: "Quand disponibles",
      },
    ],
  },
];

/** Vrai dès qu'au moins un prix de la grille est renseigné. */
export const HAS_PIECE_PRICES = PIECE_GROUPS.some((g) =>
  g.items.some((i) => i.price !== null),
);

/** Vente de vélos recyclés. */
export const BIKE_PRICES = [
  "40 €",
  "50 €",
  "Plus, selon l'état et la qualité du vélo",
];

/** Les « 4R » du réemploi des vélos. */
export const FOUR_R = [
  {
    title: "Réduire",
    text: "Moins de vélos détruits chaque année : on les collecte et on les trie au lieu de les jeter.",
  },
  {
    title: "Réemployer",
    text: "Les pièces de seconde main démontées sur les vélos non réparables repartent sur d'autres vélos.",
  },
  {
    title: "Réparer",
    text: "Grâce à l'atelier, les vélos sont remis en état et repartent en circulation.",
  },
  {
    title: "Recycler",
    text: "Ce qui ne sert plus part en matières premières : fer, aluminium, caoutchouc.",
  },
];
