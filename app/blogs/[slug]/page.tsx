// app/blogs/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "@/sanity.client";
import { SITE_URL } from "@/app/seo.config";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PortableBody from "@/app/components/PortableBody";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import RevealOnScroll from "@/app/components/home/RevealOnScroll";
import ClosingCta from "@/app/components/home/ClosingCta";
import PostCard, { type PostCardData } from "@/app/components/blog/PostCard";
import { ArrowIcon, WhatsAppDot } from "@/app/components/icons";
import { formatPostDate, readingMinutes } from "@/app/lib/blog";
import { rupiah } from "@/app/lib/format";
import { priceProduct } from "@/app/static/priceList";

export const revalidate = 60;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    content[]{ ..., _type == "image" => { ..., asset-> } },
    slug,
    excerpt,
    keywords,
    _createdAt,
    _updatedAt,
    img {
      asset -> {
        url
      }
    }
  }
`;

const moreQuery = groq`
  *[_type == "post" && slug.current != $slug && defined(slug.current)] | order(_createdAt desc)[0...3] {
    title,
    "slug": slug.current,
    excerpt,
    content,
    _createdAt,
    "img": img.asset->url
  }
`;

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(
      groq`*[_type == "post" && defined(slug.current)]{
        "slug": slug.current
      }`,
    );
    return slugs.map((post: { slug: string }) => ({ slug: post.slug }));
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return [];
  }
}

const vinyl = priceProduct("vinyl");

export default async function BlogPostPage(props: PageProps) {
  const { slug } = await props.params;

  if (!slug) return notFound();

  const post = await client.fetch(postQuery, { slug });

  if (!post) return notFound();

  let more: PostCardData[] = [];
  try {
    const raw: { title: string; slug: string; excerpt?: string; content?: unknown; _createdAt?: string; img?: string }[] =
      await client.fetch(moreQuery, { slug });
    more = raw.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      img: p.img,
      date: formatPostDate(p._createdAt),
      minutes: readingMinutes(p.content),
    }));
  } catch (err) {
    console.error("Sanity fetch error:", err);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(post.img?.asset?.url ? { image: [post.img.asset.url] } : {}),
    ...(post._createdAt ? { datePublished: post._createdAt } : {}),
    ...(post._updatedAt ? { dateModified: post._updatedAt } : {}),
    author: { "@type": "Organization", name: "EFLOOR" },
    publisher: {
      "@type": "Organization",
      name: "EFLOOR",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/img/header-logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/blogs/${slug}`,
  };

  const date = formatPostDate(post._createdAt);
  const minutes = readingMinutes(post.content);

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
          { label: "Artikel", href: "/blogs" },
          { label: post.title },
        ]}
      />

      <header className="max-w-[860px] mx-auto px-4 md:px-8 pt-8 lg:pt-12 text-center">
        <span className="font-mono text-[12.5px] text-muted">
          {[date, `${minutes} menit baca`].filter(Boolean).join(" · ")}
        </span>
        <h1 className="mt-4 text-[32px] md:text-[44px] lg:text-[50px] leading-[1.08] font-bold tracking-[-0.03em] text-balance">
          {post.title}
        </h1>
        {post.excerpt && <p className="mt-5 text-[17px] md:text-[19px] text-muted leading-relaxed max-w-[60ch] mx-auto">{post.excerpt}</p>}
      </header>

      {post.img?.asset?.url && (
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 mt-10">
          <div className="relative aspect-[16/8] rounded-[28px] md:rounded-[36px] overflow-hidden bg-surface">
            <Image src={post.img.asset.url} alt={post.title} fill priority sizes="(min-width: 1100px) 1040px, 100vw" className="object-cover" />
          </div>
        </div>
      )}

      <div className="max-w-[1100px] mx-auto px-4 md:px-8 py-12 lg:py-16 grid gap-10 lg:gap-16 lg:grid-cols-[1fr_300px] items-start">
        <article className="min-w-0 max-w-[720px]">
          <PortableBody value={post.content} />
          <div className="mt-12 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
            <Link href="/blogs" className="group inline-flex items-center gap-2 font-semibold text-[15px]">
              <ArrowIcon className="w-[18px] h-[18px] rotate-180 transition-transform group-hover:-translate-x-1" />
              Semua artikel
            </Link>
            <span className="text-[13px] text-muted">Ditulis oleh tim EFLOOR</span>
          </div>
        </article>

        <aside className="lg:sticky lg:top-28 grid gap-4">
          <div className="rounded-[28px] bg-ink text-white p-6 relative overflow-hidden isolate">
            <span aria-hidden="true" className="absolute -right-16 -top-16 w-[220px] h-[220px] rounded-full -z-10 bg-[radial-gradient(closest-side,rgba(255,142,6,0.35),transparent)]" />
            {vinyl.sizes[1]?.img && (
              <Image src={vinyl.sizes[1].img} alt={vinyl.name} width={120} height={120} className="w-[84px] h-[84px] object-contain" />
            )}
            <b className="block mt-3 text-[17px] leading-snug">{vinyl.name}</b>
            <p className="text-[13.5px] text-white/65 mt-1">Mulai {rupiah(vinyl.sizes[0].price)} · ±8–10 m²/kg</p>
            <WhatsAppButton
              source="blog-aside"
              product={vinyl.name}
              variant="plain"
              className="mt-5 w-full inline-flex items-center justify-center gap-2.5 h-[46px] rounded-full bg-brand-gradient text-white text-[14px] font-semibold shadow-cta"
            >
              <WhatsAppDot />
              Tanya harga
            </WhatsAppButton>
          </div>
          <Link
            href="/harga-lem-vinyl-karpet"
            className="group flex items-center justify-between gap-3 px-5 py-4 rounded-[20px] bg-white shadow-e1 hover:shadow-e2 transition-shadow font-semibold text-[14.5px]"
          >
            Daftar harga lengkap
            <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </aside>
      </div>

      {more.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-4 md:px-8 pb-[72px] lg:pb-[96px]">
          <h2 className="text-[24px] md:text-[30px] font-semibold tracking-[-0.02em]">Baca juga</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {more.map((p) => (
              <li key={p.slug} data-reveal>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <ClosingCta
        title="Siap mulai proyek lantai Anda?"
        lede="Tanya tim kami soal lem, list, dan kebutuhan proyek. Kami membalas di jam kerja."
        source="blog-post-closing"
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
