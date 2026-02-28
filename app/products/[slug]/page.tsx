// app/blogs/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { groq } from "next-sanity";
import { client } from "@/sanity.client";
import { PortableText } from "@portabletext/react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductSlider from "../components/ProductSlider";
import VariantSelector from "../components/VariantSelector";

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
  console.log(slug);

  if (!slug) return notFound();

  const product = await client.fetch(postQuery, { slug });
  console.log(product);

  if (!product) return notFound();

  return (
    <div className="bg-white text-black flex justify-center my-20 gap-20 max-w-[1400px] mx-auto text-left px-10">
      <div className="max-w-[500px] flex-1 w-fit">
        <ProductSlider images={product.images} name={product.name} />
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div>
          <h1 className="text-[36px] font-semibold mb-6 leading-snug">
            {product.name}
          </h1>

          {product.priceVariants?.length > 0 && (
            <VariantSelector variants={product.priceVariants} />
          )}
        </div>

        <div className="text-center mb-12 italic text-sm mt-6">
          {/* Optional caption */}
        </div>

        {/* If you want to render block content instead */}
        {product.content && (
          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-black">
            <PortableText
              value={product.content}
              components={portableTextComponents}
            />
          </div>
        )}
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

  return {
    title: product.title,
    description: product.excerpt,
    keywords: product.keywords?.map((k: string) => k.toLowerCase()) ?? [],
    openGraph: {
      title: product.title,
      description: product.excerpt,
      url: `https://efloor.id/products/${slug}`,
      images: [
        {
          url: product.img?.asset?.url || "/images/default-og.png",
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      // type: "article",
    },
    alternates: {
      canonical: `https://efloor.id/products/${slug}`,
    },
  };
}
