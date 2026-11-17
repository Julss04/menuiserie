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
 * Source : budget prévisionnel mis à jour (feuille « Grille pièces »).
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
      { item: "Chambre à air", price: 4, note: "Selon dimensions et état" },
      { item: "Pneu vélo", price: 10, note: "Occasion, selon état" },
      { item: "Pneu VTT", price: 12, note: "Occasion, selon état" },
      {
        item: "Roue avant d'occasion",
        price: 15,
        note: "Contrôlée avant mise à disposition",
      },
      {
        item: "Roue arrière d'occasion",
        price: 18,
        note: "Contrôlée avant mise à disposition",
      },
      { item: "Fond de jante", price: 1, note: "Selon disponibilité" },
    ],
  },
  {
    family: "Freinage",
    items: [
      {
        item: "Patins de frein (paire)",
        price: 4,
        note: "Contrôle de l'état obligatoire",
      },
      {
        item: "Câble de frein",
        price: 2,
        note: "Selon longueur et compatibilité",
      },
      {
        item: "Paire de câbles de frein",
        price: 3,
        note: "Selon compatibilité",
      },
      { item: "Levier de frein", price: 5, note: "Occasion, contrôlé" },
      { item: "Étrier de frein", price: 8, note: "Vérifier le fonctionnement" },
      { item: "Disque de frein", price: 8, note: "Contrôle de l'usure" },
    ],
  },
  {
    family: "Transmission",
    items: [
      {
        item: "Chaîne",
        price: 8,
        note: "Vérifier l'usure et la compatibilité",
      },
      { item: "Cassette", price: 12, note: "Selon état et nombre de vitesses" },
      { item: "Pignon", price: 3, note: "Selon disponibilité" },
      { item: "Dérailleur avant", price: 8, note: "Occasion, contrôlé" },
      { item: "Dérailleur arrière", price: 10, note: "Occasion, contrôlé" },
      { item: "Manette de vitesse", price: 7, note: "Occasion, contrôlée" },
      { item: "Pédalier", price: 15, note: "Occasion, contrôlé" },
      { item: "Pédale (unité)", price: 4, note: "Prix à l'unité" },
    ],
  },
  {
    family: "Accessoires",
    items: [
      { item: "Sonnette", price: 2, note: "Selon disponibilité" },
      { item: "Éclairage avant", price: 5, note: "Vérifier le fonctionnement" },
      {
        item: "Éclairage arrière",
        price: 4,
        note: "Vérifier le fonctionnement",
      },
      { item: "Catadioptre", price: 1, note: "Selon disponibilité" },
      { item: "Poignées (paire)", price: 3, note: "Selon état" },
      { item: "Selle", price: 8, note: "Occasion, contrôlée" },
      { item: "Béquille", price: 5, note: "Selon compatibilité" },
      { item: "Porte-bidon", price: 3, note: "Selon disponibilité" },
      { item: "Garde-boue", price: 5, note: "Selon état et compatibilité" },
      { item: "Antivol simple", price: 5, note: "Selon état" },
    ],
  },
  {
    family: "Petites fournitures",
    items: [
      { item: "Rustines", price: 1, note: "Selon quantité" },
      {
        item: "Dégrippant (petite quantité)",
        price: 1,
        note: "Petite quantité",
      },
      {
        item: "Lubrifiant chaîne (petite quantité)",
        price: 1,
        note: "Petite quantité",
      },
      {
        item: "Visserie / petits accessoires",
        price: 1.5,
        note: "Selon type et quantité",
      },
      {
        item: "Câble et gaine (ensemble)",
        price: 4,
        note: "Selon longueur et compatibilité",
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
