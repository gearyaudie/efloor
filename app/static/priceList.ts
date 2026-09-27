// EFLOOR offline (in-store) price list — the one place glue prices live.
// Source: "EFLOOR — Daftar Harga Lem & Perekat, Harga Offline", Sept 2026.
// The price page, the Lem HPL page and the pricing FAQ all read from here.

export const PRICE_LIST_UPDATED = "September 2026";

export type PriceSize = { label: string; kg: number; price: number; img?: string };

export type PriceProduct = {
  id: string;
  name: string;
  /** Short line under the name; only facts stated elsewhere on the site. */
  note?: string;
  href?: string;
  /** m² covered per kg, when the data sheet states it. */
  coverage?: [number, number];
  sizes: PriceSize[];
};

export const PRICE_LIST: PriceProduct[] = [
  {
    id: "vinyl",
    name: "Lem Vinyl / Karpet EFLOOR",
    note: "Waterbased, tidak berbau, bening setelah kering. Untuk vinyl, karpet tile & karpet roll.",
    href: "/products/lem-vinyl-efloor",
    coverage: [8, 10],
    sizes: [
      { label: "1 KG", kg: 1, price: 86_000, img: "/img/lem-karpet-1kg.png" },
      { label: "4 KG", kg: 4, price: 315_000, img: "/img/lem-karpet-4kg.png" },
      { label: "20 KG", kg: 20, price: 1_525_000, img: "/img/lem-karpet-20kg.png" },
    ],
  },
  {
    id: "max",
    name: "Lem MAX EFLOOR",
    note: "Lebih kental dan lebih kuat. Untuk proyek besar dan area lalu lintas tinggi.",
    href: "/products/lem-efloor-max",
    sizes: [
      { label: "1 KG", kg: 1, price: 98_000, img: "/img/lem-max-1kg.png" },
      { label: "4 KG", kg: 4, price: 365_000, img: "/img/lem-max-4kg.png" },
      { label: "20 KG", kg: 20, price: 1_750_000, img: "/img/lem-max-20kg.png" },
    ],
  },
  {
    id: "eco",
    name: "Lem Vinyl / Karpet ECO",
    note: "Pilihan ekonomis untuk lem vinyl & karpet.",
    sizes: [
      { label: "1 KG", kg: 1, price: 75_000 },
      { label: "4 KG", kg: 4, price: 275_000 },
      { label: "20 KG", kg: 20, price: 1_325_000 },
    ],
  },
  {
    id: "hpl",
    name: "Lem HPL",
    note: "Waterbased, cukup oles satu sisi. Untuk HPL, veneer & PVC sheet.",
    href: "/lem-hpl-pvc-sheet",
    sizes: [
      { label: "1 KG", kg: 1, price: 62_000, img: "/img/lem-hpl-1kg-cutout.png" },
      { label: "4 KG", kg: 4, price: 230_000, img: "/img/lem-hpl-4kg-cutout.png" },
      { label: "20 KG", kg: 20, price: 1_125_000, img: "/img/lem-hpl-20kg-cutout.png" },
    ],
  },
  {
    id: "kayu",
    name: "Lem Kayu Tahan Air",
    sizes: [
      { label: "1 KG", kg: 1, price: 65_000 },
      { label: "4 KG", kg: 4, price: 245_000 },
      { label: "20 KG", kg: 20, price: 1_175_000 },
    ],
  },
  {
    id: "pu",
    name: "Lem PU",
    sizes: [
      { label: "450 GRAM", kg: 0.45, price: 55_000 },
      { label: "33 KG", kg: 33, price: 3_375_000 },
    ],
  },
];

export const priceProduct = (id: string) => {
  const p = PRICE_LIST.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown price-list product: ${id}`);
  return p;
};

export const pricePerKg = (s: PriceSize) => s.price / s.kg;
