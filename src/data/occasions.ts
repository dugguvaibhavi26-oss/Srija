export type Occasion = {
  id: string;
  name: string;
  description: string;
  atmosphere: {
    colorPalette: string[];
    lighting: string;
    particleStyle: string;
    backgroundTreatment: string;
  };
};

export const occasions: Occasion[] = [
  {
    id: "haldi",
    name: "Haldi",
    description: "Sunlit beginnings, golden hues, and joyous blessings.",
    atmosphere: {
      colorPalette: ["#FFD700", "#FFA500", "#FFF8DC"],
      lighting: "Warm sunlight",
      particleStyle: "Marigold petals",
      backgroundTreatment: "Golden sunburst gradients",
    },
  },
  {
    id: "mehendi",
    name: "Mehendi",
    description: "A botanical tapestry of henna, folklore, and celebration.",
    atmosphere: {
      colorPalette: ["#556B2F", "#8FBC8F", "#F5F5DC"],
      lighting: "Soft dappled light",
      particleStyle: "Leaves and green motes",
      backgroundTreatment: "Botanical garden silhouette",
    },
  },
  {
    id: "sangeet",
    name: "Sangeet",
    description: "Crystal chandeliers, dramatic movements, and midnight melodies.",
    atmosphere: {
      colorPalette: ["#191970", "#483D8B", "#E6E6FA"],
      lighting: "Dramatic spotlighting",
      particleStyle: "Crystal sparkles",
      backgroundTreatment: "Deep night luxury mood",
    },
  },
  {
    id: "wedding",
    name: "Wedding",
    description: "The royal crescendo of eternal vows and majestic elegance.",
    atmosphere: {
      colorPalette: ["#8B0000", "#B22222", "#FFD700"],
      lighting: "Palace illumination",
      particleStyle: "Gold dust",
      backgroundTreatment: "Royal red and gold arches",
    },
  },
  {
    id: "reception",
    name: "Reception",
    description: "Modern luxury under cascading lights and champagne toasts.",
    atmosphere: {
      colorPalette: ["#B76E79", "#FFC0CB", "#FFFFFF"],
      lighting: "Rose-gold chandelier",
      particleStyle: "Champagne bubbles",
      backgroundTreatment: "Modern ballroom elegance",
    },
  },
];
