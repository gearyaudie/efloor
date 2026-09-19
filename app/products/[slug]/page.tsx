// app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { groq } from "next-sanity";
import { client } from "@/sanity.client";
import { SITE_URL } from "@/app/seo.config";
import { PortableText } from "@portabletext/react";
import ProductSlider from "../components/ProductSlider";
import VariantSelector from "../components/VariantSelector";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Link from "next/link";

// Sanity "desc"/"content" fields have been observed as either a plain string
// or an array of portable text blocks depending on the document, so accept
// either shape rather than assuming one and crashing on the other.
function portableTextToPlainText(value: unknown, maxLength = 155): string {
  let text = "";

  if (typeof value === "string") {
    text = value;
  } else if (Array.isArray(value)) {
    text = value
      .filter((block) => block?._type === "block" && block.children)
      .map((block: any) =>
        block.children.map((child: any) => child?.text ?? "").join(""),
      )
      .join(" ");
  }

  text = text.trim();
  return text.length > maxLength
    ? `${text.slice(0, maxLength).trim()}...`
    : text;
}

// Sanity's priceVariants[].price has been observed as either a plain number
// or a formatted string (e.g. "Rp150.000") depending on how it was entered —
// same defensive-shape reasoning as portableTextToPlainText above.
function parsePriceMicros(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const digits = value.replace(/[^0-9]/g, "");
    if (digits) return Number(digits);
  }
  return null;
}

type PageProps = {
  params: {
    slug: string;
  };
};
const postQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    name,
    desc,
    content,
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

export async function generateStaticParams() {
  const slugs = await client.fetch(
    groq`*[_type == "product" && defined(slug.current)]{
      "slug": slug.current
    }`,
  );

  return slugs.map((product: { slug: string }) => ({
    slug: product.slug,
  }));
}

// PortableText renderers
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-4 text-black">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc ml-6 mb-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal ml-6 mb-4">{children}</ol>
    ),
  },
};

export default async function ProductsPage(props: PageProps) {
  const { slug } = await props.params;

  if (!slug) return notFound();

  const product = await client.fetch(postQuery, { slug });

  if (!product) return notFound();

  const images: string[] = (product.images ?? [])
    .map((img: { url?: string }) => img?.url)
    .filter(Boolean);
  const description =
    portableTextToPlainText(product.desc) || portableTextToPlainText(product.content);

  const prices = (product.priceVariants ?? [])
    .map((v: { price?: unknown }) => parsePriceMicros(v?.price))
    .filter((p: number | null): p is number => p !== null);

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

  return (
    <div className="bg-white text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          {/* LEFT - IMAGE */}
          <div className="w-full lg:max-w-[500px] flex-1">
            <ProductSlider images={product.images} name={product.name} />
          </div>

          {/* RIGHT - CONTENT */}
          <div className="flex-1 w-full">
            <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-semibold mb-6 leading-snug">
              {product.name}
            </h1>

            {product.priceVariants?.length > 0 && (
              <VariantSelector
                variants={product.priceVariants}
                productName={product.name}
              />
            )}

            {/* Content */}
            {Array.isArray(product.content) && product.content.length > 0 && (
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-black mt-8">
                <PortableText
                  value={product.content}
                  components={portableTextComponents}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-block px-5 py-3 rounded-2xl border border-[#e8e8e8] text-sm font-medium text-[#4D4D4D] hover:border-[#FF8E06] hover:text-[#FF8E06] transition-colors"
          >
            Lihat Produk Lainnya
          </Link>
        </div>
      </div>
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
