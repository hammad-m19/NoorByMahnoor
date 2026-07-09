export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  currency: string;
  scentFamily: string;
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
    scentFamily: "Oriental Amber",
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
    scentFamily: "Floral",
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
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getOtherProducts(currentSlug: string): Product[] {
  return products.filter((p) => p.slug !== currentSlug);
}

export function getScentFamilies(): string[] {
  const families = new Set(products.map((p) => p.scentFamily));
  return Array.from(families);
}
