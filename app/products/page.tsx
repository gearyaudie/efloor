import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity.client";
import Breadcrumbs from "../components/Breadcrumbs";
import RevealOnScroll from "../components/home/RevealOnScroll";
import Solutions from "../components/home/Solutions";
import ClosingCta from "../components/home/ClosingCta";
import ProductCatalog, { type CatalogProduct } from "../components/product/ProductCatalog";
import { ArrowIcon } from "../components/icons";
import { parsePrice, portableTextToPlainText } from "../lib/sanityText";
import { PRICE_LIST_UPDATED } from "../static/priceList";

export const revalidate = 60; // Cache for 60 seconds (ISR)

export const metadata: Metadata = {
  title: "Produk Kami | Lem Vinyl, Lem Karpet & List Siku - EFLOOR",
  description:
    "Jelajahi katalog lengkap produk EFLOOR: lem vinyl, lem karpet, lem HPL, dan list siku/skirting waterbased eco-friendly untuk kebutuhan retail, kontraktor, dan procurement.",
  alternates: {
    canonical: "/products",
  },
};

type SanityProduct = {
  _id: string;
  name: string;
  slug?: { current?: string };
  desc?: unknown;
  price?: unknown;
  priceVariants?: { label?: string; price?: unknown }[];
  image?: { asset?: { url?: string } };
};

const CATEGORY_ORDER = ["Lem & perekat", "List & aksesoris", "Lainnya"];

function categoryOf(name: string) {
  const n = name.toLowerCase();
  if (/list|plint|skirting|adaptasi|siku|nosing/.test(n)) return "List & aksesoris";
  if (/lem|glue|perekat/.test(n)) return "Lem & perekat";
  return "Lainnya";
}

export default async function Products() {
  let raw: SanityProduct[] = [];
  try {
    raw = await client.fetch<SanityProduct[]>(
      `*[_type == "product"]{
        _id,
        name,
        slug,
        desc,
        price,
        priceVariants[]{label, price},
        image {
          asset->{
            url
          }
        }
      }`,
    );
  } catch (err) {
    console.error("Sanity fetch error:", err);
  }

  const products: CatalogProduct[] = raw
    .filter((p) => p.slug?.current && p.name)
    .map((p) => {
      const prices = [
        ...(p.priceVariants ?? []).map((v) => parsePrice(v?.price)),
        parsePrice(p.price),
      ].filter((x): x is number => x !== null && x > 0);
      return {
        _id: p._id,
        name: p.name,
        slug: p.slug!.current!,
        desc: portableTextToPlainText(p.desc, 110),
        image: p.image?.asset?.url,
        fromPrice: prices.length ? Math.min(...prices) : undefined,
        category: categoryOf(p.name),
      };
    })
    // Glues first, then trims, then everything else.
    .sort(
      (a, b) =>
        CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) ||
        a.name.localeCompare(b.name, "id"),
    );

  return (
    <div className="bg-paper">
      <RevealOnScroll />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Produk" }]} />

      <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8 pb-10 lg:pt-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <span className="inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-brand-flame">
              <span className="w-[18px] h-0.5 rounded-full bg-brand-gradient" aria-hidden="true" />
              Katalog
            </span>
            <h1 className="mt-3.5 text-[34px] md:text-[46px] leading-[1.06] font-bold tracking-[-0.035em]">
              Produk <span className="text-brand-gradient">EFLOOR</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted">
              Lem vinyl, lem karpet, lem HPL, dan list PVC untuk finishing lantai —
              untuk retail, kontraktor, dan procurement.
            </p>
          </div>
          <Link
            href="/harga-lem-vinyl-karpet"
            className="group inline-flex items-center gap-2 h-[46px] px-5 rounded-full bg-white shadow-e1 hover:shadow-e2 transition-shadow font-semibold text-[14.5px]"
          >
            Daftar harga {PRICE_LIST_UPDATED}
            <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10">
          <ProductCatalog products={products} />
        </div>
      </section>

      <Solutions />
      <ClosingCta
        title="Tidak menemukan yang Anda cari?"
        lede="Kami juga melayani kebutuhan lantai dan aksesoris lainnya. Tanya tim kami — kami bantu carikan."
        source="products-closing"
      />
    </div>
  );
}
