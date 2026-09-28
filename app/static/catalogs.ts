// Every downloadable PDF in public/katalog/. The /katalog page, the sitemap and
// the sheet builder (scripts/product-sheets/build.mjs) all read this list, and
// the builder refuses to run if a PDF in that folder is missing from it — so a
// new PDF only needs one entry here.

export type CatalogCategory = "Lem & perekat" | "List & aksesoris";

export type Catalog = {
  /** File name in public/katalog/ without ".pdf"; also the preview image name. */
  slug: string;
  title: string;
  category: CatalogCategory;
  summary: string;
  /** What's inside, shown as chips on the card. */
  contents: string[];
  pages: number;
  /** The product's page on the site. */
  productHref: string;
  /** Which builder template produces it; omit for PDFs added by hand. */
  sheet?: "siku" | "plint" | "adaptasi" | "eco";
};

export const CATALOGS: Catalog[] = [
  {
    slug: "lem-karpet-vinyl-eco",
    title: "Lem Karpet & Vinyl ECO",
    category: "Lem & perekat",
    summary: "Lem karpet & vinyl waterbased versi hemat — harga 1, 4 & 20 KG, daya sebar, dan perbandingan dengan EFLOOR & MAX.",
    contents: ["Harga 1 · 4 · 20 KG", "Daya sebar", "Cara pakai", "Perbandingan"],
    pages: 2,
    productHref: "/lem-karpet-vinyl-eco",
    sheet: "eco",
  },
  {
    slug: "list-siku-l",
    title: "List Siku L & Step Nosing",
    category: "List & aksesoris",
    summary: "Ukuran L8, L15 & L30 dengan harga per batang, 15 kode warna GG, dan cara pasang untuk tangga, lantai & WPC.",
    contents: ["Harga L8 · L15 · L30", "15 kode warna", "Ukuran profil", "Cara pasang"],
    pages: 2,
    productHref: "/list-siku-step-nosing",
    sheet: "siku",
  },
  {
    slug: "list-plint-skirting",
    title: "List Plint / Skirting PVC",
    category: "List & aksesoris",
    summary: "Skirting PVC 2,4 m: harga per batang, 15 kode warna GG, penampang profil, dan cara pasang.",
    contents: ["Harga per batang", "15 kode warna", "Penampang profil", "Cara pasang"],
    pages: 2,
    productHref: "/list-plint-skirting-pvc",
    sheet: "plint",
  },
  {
    slug: "list-adaptasi",
    title: "List Adaptasi / Transisi",
    category: "List & aksesoris",
    summary: "Reducer untuk lantai beda tinggi dan beda material: harga per batang, 15 kode warna GG, dan cara pasang.",
    contents: ["Harga per batang", "15 kode warna", "Aplikasi", "Cara pasang"],
    pages: 2,
    productHref: "/list-adaptasi-transisi",
    sheet: "adaptasi",
  },
];

export const catalogPdf = (c: Catalog) => `/katalog/${c.slug}.pdf`;
export const catalogPreview = (c: Catalog) => `/katalog/preview/${c.slug}.jpg`;

/** Technical documents for tenders, hosted in public/docs/. */
export const TECH_DOCS = [
  { href: "/docs/tds.pdf", title: "Technical Data Sheet (TDS)", summary: "Spesifikasi teknis & cara aplikasi Lem Vinyl / Karpet EFLOOR." },
  { href: "/docs/msds.pdf", title: "Material Safety Data Sheet (MSDS)", summary: "Keamanan bahan & penanganan Lem Vinyl / Karpet EFLOOR." },
];
