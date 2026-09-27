// app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "@/sanity.client";
import { SITE_URL } from "@/app/seo.config";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PortableBody from "@/app/components/PortableBody";
import RevealOnScroll from "@/app/components/home/RevealOnScroll";
import ClosingCta from "@/app/components/home/ClosingCta";
import { Eyebrow, h2Class } from "@/app/components/home/SectionHeading";
import ProductGallery from "@/app/components/product/ProductGallery";
import ProductBuyBox from "@/app/components/product/ProductBuyBox";
import ProductCard, { type CardProduct } from "@/app/components/product/ProductCard";
import { ArrowIcon, ArrowUpRightIcon } from "@/app/components/icons";
import { parsePrice, portableTextToPlainText } from "@/app/lib/sanityText";
import { TRIMS } from "@/app/static/trims";

export const revalidate = 60;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const postQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    name,
    desc,
    content[]{ ..., _type == "image" => { ..., asset-> } },
    slug,
    keywords,
    priceVariants[]{
      label,
      price
    },
    images[]{
      "url": asset->url
    }
  }
`;

const relatedQuery = groq`
  *[_type == "product" && slug.current != $slug && defined(slug.current)][0...4] {
    _id,
    name,
    "slug": slug.current,
    desc,
    price,
    priceVariants[]{ price },
    "image": image.asset->url
  }
`;

// Products that also have a full landing page get a link to it.
const DEDICATED_PAGES: Record<string, { href: string; label: string }> = {
  ...Object.fromEntries(
    Object.values(TRIMS).map((t) => [t.productSlug, { href: t.pageHref, label: `Panduan lengkap ${t.name}` }]),
  ),
  "lem-vinyl-efloor": { href: "/harga-lem-vinyl-karpet", label: "Daftar harga & kalkulator lem" },
  "lem-efloor-max": { href: "/harga-lem-vinyl-karpet#semua-harga", label: "Bandingkan harga semua lem" },
};

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(
      groq`*[_type == "product" && defined(slug.current)]{
        "slug": slug.current
      }`,
    );
    return slugs.map((product: { slug: string }) => ({ slug: product.slug }));
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return [];
  }
}

export default async function ProductsPage(props: PageProps) {
  const { slug } = await props.params;

  if (!slug) return notFound();

  const product = await client.fetch(postQuery, { slug });

  if (!product) return notFound();

  let relatedRaw: {
    _id: string;
    name: string;
    slug: string;
    desc?: unknown;
    price?: unknown;
    priceVariants?: { price?: unknown }[];
    image?: string;
  }[] = [];
  try {
    relatedRaw = await client.fetch(relatedQuery, { slug });
  } catch (err) {
    console.error("Sanity fetch error:", err);
  }
  const related: CardProduct[] = relatedRaw.map((p) => {
    const prices = [...(p.priceVariants ?? []).map((v) => parsePrice(v?.price)), parsePrice(p.price)].filter(
      (x): x is number => x !== null && x > 0,
    );
    return {
      _id: p._id,
      name: p.name,
      slug: p.slug,
      desc: portableTextToPlainText(p.desc, 110),
      image: p.image,
      fromPrice: prices.length ? Math.min(...prices) : undefined,
    };
  });

  const images: string[] = (product.images ?? [])
    .map((img: { url?: string }) => img?.url)
    .filter(Boolean);
  const description =
    portableTextToPlainText(product.desc) || portableTextToPlainText(product.content);

  const variants: { label: string; price: number }[] = (product.priceVariants ?? [])
    .map((v: { label?: string; price?: unknown }) => ({ label: v?.label ?? "", price: parsePrice(v?.price) }))
    .filter((v: { label: string; price: number | null }) => v.label && v.price !== null);
  const prices = variants.map((v) => v.price);

  let offers: Record<string, unknown> | undefined;
  if (prices.length === 1) {
    offers = {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: prices[0],
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/products/${slug}`,
    };
  } else if (prices.length > 1) {
    offers = {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: prices.length,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/products/${slug}`,
    };
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    ...(description ? { description } : {}),
    ...(images.length > 0 ? { image: images } : {}),
    brand: { "@type": "Brand", name: "EFLOOR" },
    ...(offers ? { offers } : {}),
  };

  const dedicated = DEDICATED_PAGES[slug];
  const summary = portableTextToPlainText(product.desc, 400);
  const hasContent = Array.isArray(product.content) && product.content.length > 0;

  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RevealOnScroll />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Produk", href: "/products" },
          { label: product.name },
        ]}
      />

      <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-6 pb-16 lg:pt-10 lg:pb-24 grid gap-10 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr] items-start">
        <div className="lg:sticky lg:top-28">
          <ProductGallery images={images} name={product.name} />
        </div>
        <div>
          <span className="inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-brand-flame">
            <span className="w-[18px] h-0.5 rounded-full bg-brand-gradient" aria-hidden="true" />
            EFLOOR
          </span>
          <h1 className="mt-3.5 text-[32px] md:text-[42px] lg:text-[48px] leading-[1.08] font-bold tracking-[-0.03em] text-balance">
            {product.name}
          </h1>
          {summary && <p className="mt-4 text-base md:text-lg text-muted max-w-[52ch]">{summary}</p>}

          <div className="mt-8">
            <ProductBuyBox name={product.name} variants={variants} />
          </div>

          {dedicated && (
            <Link
              href={dedicated.href}
              className="group mt-4 flex items-center justify-between gap-4 px-5 py-4 rounded-[20px] bg-orange-tint hover:bg-[#ffe9cf] transition-colors"
            >
              <span className="font-semibold text-[15px]">{dedicated.label}</span>
              <ArrowUpRightIcon className="w-5 h-5 text-brand-flame" />
            </Link>
          )}
        </div>
      </section>

      {hasContent && (
        <section className="bg-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[96px]">
          <div className="max-w-[760px] mx-auto px-4 md:px-8">
            <Eyebrow>Detail produk</Eyebrow>
            <h2 className={`${h2Class} mb-8`}>Tentang {product.name}</h2>
            <PortableBody value={product.content} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-4 md:px-8 py-[72px] lg:py-[96px]">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
            <div>
              <Eyebrow>Produk lainnya</Eyebrow>
              <h2 className={h2Class}>Lengkapi kebutuhan Anda</h2>
            </div>
            <Link href="/products" className="group inline-flex items-center gap-2 py-2.5 font-semibold text-[15px] text-ink border-b-[1.5px] border-ink">
              Semua produk
              <ArrowIcon className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {related.map((p) => (
              <li key={p._id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ClosingCta
        title={`Pesan ${product.name} sekarang`}
        lede="Tanya stok, warna, atau harga untuk jumlah besar. Tim kami membalas di jam kerja."
        source="product-closing"
        product={product.name}
      />
    </div>
  );
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;

  // 🔥 CRITICAL FIX: do NOT query Sanity without slug
  if (!slug) {
    return {
      title: "EFLOOR Blog",
      description: "Artikel dan panduan seputar lem vinyl dan lem karpet.",
    };
  }

  const product = await client.fetch(postQuery, { slug });

  if (!product) return {};

  const title = `${product.name} | EFLOOR`;
  const description =
    portableTextToPlainText(product.desc) ||
    portableTextToPlainText(product.content) ||
    `${product.name} dari EFLOOR — supplier lem vinyl, lem karpet, dan list siku terpercaya.`;

  return {
    title,
    description,
    keywords: product.keywords?.map((k: string) => k.toLowerCase()) ?? [],
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/products/${slug}`,
      images: [
        {
          url: product.images?.[0]?.url || `${SITE_URL}/img/og-image.png`,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/products/${slug}`,
    },
  };
}
