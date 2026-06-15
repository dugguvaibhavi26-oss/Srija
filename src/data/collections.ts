export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  featuredImage: string;
};

export const collections: Collection[] = [
  {
    id: "golden-veil",
    name: "Golden Veil",
    slug: "golden-veil",
    description: "An ethereal journey through spun gold and timeless ivory.",
    featuredImage: "/images/collections/golden-veil.jpg",
  },
  {
    id: "midnight-noor",
    name: "Midnight Noor",
    slug: "midnight-noor",
    description: "Dark, dramatic, and intensely romantic couture.",
    featuredImage: "/images/collections/midnight-noor.jpg",
  },
  {
    id: "royal-grace",
    name: "Royal Grace",
    slug: "royal-grace",
    description: "Heritage reborn. Palace-inspired heavy embroidery and rich textiles.",
    featuredImage: "/images/collections/royal-grace.jpg",
  },
  {
    id: "whisper-of-royalty",
    name: "Whisper Of Royalty",
    slug: "whisper-of-royalty",
    description: "Soft pastels and delicate threadwork for the modern muse.",
    featuredImage: "/images/collections/whisper-royalty.jpg",
  },
  {
    id: "tapestry-in-sage",
    name: "Tapestry In Sage",
    slug: "tapestry-in-sage",
    description: "Botanical inspirations married to architectural silhouettes.",
    featuredImage: "/images/collections/tapestry-sage.jpg",
  },
];
