export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  currency: string;
  category: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  images: string[];
  description: string;
  ingredients: string;
  longevity: string;
  size: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "01",
    slug: "midnight-blue",
    name: "Midnight Blue",
    tagline: "An Evening Reverie",
    price: 3500,
    currency: "PKR",
    category: "Male",
    notes: {
      top: ["Saffron", "Bergamot", "Pink Pepper"],
      heart: ["Rose Absolute", "Oud", "Jasmine Sambac"],
      base: ["Amber", "Sandalwood", "Vanilla", "Musk"],
    },
    images: ["/images/perfume1-1.png", "/images/perfume1-2.png"],
    description:
      "Midnight Blue captures the magic of dusk — that luminous moment when the sky glows amber and the first stars appear. A rich, warm blend of saffron and oud, softened by rose and wrapped in a base of creamy sandalwood and amber. This is a fragrance for evenings that linger, for conversations that matter, for the quiet confidence of twilight.",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Alpha-Isomethyl Ionone, Benzyl Benzoate.",
    longevity: "8–12 hours. Moderate to heavy sillage. Best worn in autumn and winter evenings.",
    size: "50ml Eau de Parfum",
    inStock: true,
  },
  {
    id: "02",
    slug: "pink-passion",
    name: "Pink Passion",
    tagline: "A Garden at Dawn",
    price: 3500,
    currency: "PKR",
    category: "Female",
    notes: {
      top: ["Peony", "Lychee", "Dewy Greens"],
      heart: ["Damask Rose", "Peach Blossom", "Lily of the Valley"],
      base: ["White Musk", "Cedarwood", "Ambrette Seed"],
    },
    images: ["/images/perfume2-1.png", "/images/perfume2-2.png"],
    description:
      "Pink Passion is the scent of a rose garden kissed by the first light of morning. Delicate yet present, it opens with fresh peony and lychee, blooms into the heart of Damask rose and peach blossom, and settles into a whisper of white musk and cedarwood. A fragrance for the woman who carries grace like a second skin.",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Linalool, Citronellol, Geraniol, Hydroxycitronellal, Benzyl Salicylate, Limonene.",
    longevity: "6–10 hours. Light to moderate sillage. Perfect for spring and summer days.",
    size: "50ml Eau de Parfum",
    inStock: true,
  },
  {
    id: "03",
    slug: "noor-duo-combo",
    name: "Noor Duo Combo",
    tagline: "The Complete Collection",
    price: 6000,
    currency: "PKR",
    category: "Unisex",
    notes: {
      top: ["Saffron", "Bergamot", "Peony", "Lychee"],
      heart: ["Rose Absolute", "Oud", "Damask Rose", "Peach Blossom"],
      base: ["Amber", "Sandalwood", "White Musk", "Cedarwood"],
    },
    images: ["/images/combo-deal-1.png"],
    description:
      "Why choose one when you can have both? The Noor Duo Combo brings together Midnight Blue and Pink Passion — two fragrances that complement each other perfectly. Midnight Blue for evenings that demand depth and mystery, Pink Passion for days that call for grace and warmth. A curated pair at a special price, perfect as a gift or to build your own signature collection.",
    ingredients:
      "Includes both full-size bottles: Midnight Blue (50ml EDP) and Pink Passion (50ml EDP). See individual product pages for full ingredient lists.",
    longevity: "6–12 hours. Varies by fragrance — see individual products for details.",
    size: "2 × 50ml Eau de Parfum",
    inStock: true,
  },
  {
    id: "04",
    slug: "pink-passion-tester",
    name: "Pink Passion Tester",
    tagline: "A Pocket of Petals",
    price: 1000,
    currency: "PKR",
    category: "Female",
    notes: {
      top: ["Peony", "Lychee", "Dewy Greens"],
      heart: ["Damask Rose", "Peach Blossom", "Lily of the Valley"],
      base: ["White Musk", "Cedarwood", "Ambrette Seed"],
    },
    images: ["/images/tester-pink-1.png"],
    description:
      "Experience the enchanting world of Pink Passion in a beautifully crafted travel-size tester. This 10ml miniature captures the same delicate harmony of peony, Damask rose, and white musk — perfect for trying before committing to the full size, or for keeping in your handbag for touch-ups throughout the day.",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Linalool, Citronellol, Geraniol, Hydroxycitronellal, Benzyl Salicylate, Limonene.",
    longevity: "4–6 hours. Light sillage. Ideal for daytime wear and on-the-go freshness.",
    size: "10ml Eau de Parfum Tester",
    inStock: true,
  },
  {
    id: "05",
    slug: "midnight-blue-tester",
    name: "Midnight Blue Tester",
    tagline: "A Glimpse of Twilight",
    price: 1000,
    currency: "PKR",
    category: "Male",
    notes: {
      top: ["Saffron", "Bergamot", "Pink Pepper"],
      heart: ["Rose Absolute", "Oud", "Jasmine Sambac"],
      base: ["Amber", "Sandalwood", "Vanilla", "Musk"],
    },
    images: ["/images/tester-blue-1.png"],
    description:
      "Discover the depth of Midnight Blue in a pocket-sized 10ml tester. This miniature carries the same rich blend of saffron, oud, and amber that defines the full-size fragrance — perfect for sampling the scent, gifting to someone special, or keeping one in every bag for those spontaneous evening moments.",
    ingredients:
      "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Alpha-Isomethyl Ionone, Benzyl Benzoate.",
    longevity: "4–6 hours. Light to moderate sillage. Great for trying the scent before going full-size.",
    size: "10ml Eau de Parfum Tester",
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getOtherProducts(currentSlug: string): Product[] {
  return products.filter((p) => p.slug !== currentSlug);
}

export function getCategories(): string[] {
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories);
}
