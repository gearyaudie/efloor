// app/blogs/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { groq } from "next-sanity";
import { client } from "@/sanity.client";
import { PortableText } from "@portabletext/react";

type Params = {
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
  const slugs = await client.fetch(groq`*[_type == "post"]{ slug }`);
  return slugs.map((post: any) => ({ slug: post.slug.current }));
}

// Optional: customize how blocks and lists render
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
export default async function BlogPostPage({ params }: any) {
  const post = await client.fetch(postQuery, { slug: params.slug });
  console.log(post);
  if (!post) return notFound();

  return (
    <div className="bg-white text-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mt-16">
          <h1 className="text-[36px] font-500 mb-6 text-black  leading-snug">
            {post.title}
          </h1>
          <div className="text-gray-500">{post.excerpt}</div>
        </div>
        <img
          src={post.img?.asset?.url}
          alt={post.title}
          className="w-full rounded-lg mt-10 mb-4"
        />
        <div className="text-center mb-12 italic text-sm">
          This is an example of blablabla
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

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await client.fetch(postQuery, { slug: params.slug });

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords?.map((k: string) => k.toLowerCase()) ?? [],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.efloor.id/blog/${params.slug}`, // 🔁 update domain
      images: [
        {
          url: post.img?.asset?.url || "/images/default-og.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },
    alternates: {
      canonical: `https://www.yourdomain.com/blog/${params.slug}`,
    },
  };
}
