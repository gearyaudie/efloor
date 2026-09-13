// app/blogs/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { groq } from "next-sanity";
import { client } from "@/sanity.client";
import { PortableText } from "@portabletext/react";
import { SITE_URL } from "@/app/seo.config";

type PageProps = {
  params: {
    slug: string;
  };
};
const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    content,
    slug,
    excerpt,
    keywords,
    img {
      asset -> {
        url
      }
    }
  }
`;

export async function generateStaticParams() {
  const slugs = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)]{
      "slug": slug.current
    }`,
  );

  return slugs.map((post: { slug: string }) => ({
    slug: post.slug,
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

export default async function BlogPostPage(props: PageProps) {
  const { slug } = await props.params;

  if (!slug) return notFound();

  const post = await client.fetch(postQuery, { slug });

  if (!post) return notFound();

  return (
    <div className="bg-white text-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mt-16">
          <h1 className="text-[36px] font-500 mb-6 leading-snug">
            {post.title}
          </h1>
          <div className="text-gray-500">{post.excerpt}</div>
        </div>

        {post.img?.asset?.url && (
          <div className="relative w-full aspect-video mt-10 mb-4">
            <Image
              src={post.img.asset.url}
              alt={post.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        )}

        <div className="text-center mb-12 italic text-sm">
          {/* This is an example of blablabla */}
        </div>

        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-black">
          <PortableText
            value={post.content}
            components={portableTextComponents}
          />
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

  const post = await client.fetch(postQuery, { slug });

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords?.map((k: string) => k.toLowerCase()) ?? [],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blogs/${slug}`,
      images: [
        {
          url: post.img?.asset?.url || `${SITE_URL}/img/og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },
    alternates: {
      canonical: `${SITE_URL}/blogs/${slug}`,
    },
  };
}
