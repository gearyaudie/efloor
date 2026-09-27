import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity.client";
import Breadcrumbs from "../components/Breadcrumbs";
import RevealOnScroll from "../components/home/RevealOnScroll";
import ClosingCta from "../components/home/ClosingCta";
import PostCard, { type PostCardData } from "../components/blog/PostCard";
import { ArrowIcon } from "../components/icons";
import { formatPostDate, readingMinutes } from "../lib/blog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Artikel & Tips Lem Vinyl, Lem Karpet | EFLOOR",
  description:
    "Kumpulan artikel dan panduan seputar pemasangan lem vinyl, lem karpet, dan list siku/skirting dari EFLOOR — tips perawatan, cara pakai, dan rekomendasi produk.",
  alternates: {
    canonical: "/blogs",
  },
};

export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  content: any[];
  img: any;
  excerpt: string;
  _createdAt?: string;
};

const TOPICS = [
  { href: "/harga-lem-vinyl-karpet", label: "Daftar harga lem" },
  { href: "/lem-vinyl-rumah-sakit", label: "Lem vinyl rumah sakit" },
  { href: "/lem-karpet-kantor", label: "Lem karpet kantor" },
  { href: "/list-siku-step-nosing", label: "List siku & step nosing" },
  { href: "/lem-hpl-pvc-sheet", label: "Lem HPL" },
];

export default async function Blogs() {
  let posts: Post[] = [];
  try {
    posts = await client.fetch<Post[]>(
      `*[_type == "post" && defined(slug.current)] | order(_createdAt desc){
        _id,
        title,
        slug,
        content,
        excerpt,
        _createdAt,
        img {
          asset->{
            url
          }
        }
      }`,
    );
  } catch (err) {
    console.error("Sanity fetch error:", err);
  }

  const cards: PostCardData[] = posts.map((p) => ({
    slug: p.slug.current,
    title: p.title,
    excerpt: p.excerpt,
    img: p.img?.asset?.url,
    date: formatPostDate(p._createdAt),
    minutes: readingMinutes(p.content),
  }));
  const [latest, ...rest] = cards;

  return (
    <div className="bg-paper">
      <RevealOnScroll />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Artikel" }]} />

      <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8 pb-12 lg:pt-12">
        <span className="inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-brand-flame">
          <span className="w-[18px] h-0.5 rounded-full bg-brand-gradient" aria-hidden="true" />
          Artikel &amp; panduan
        </span>
        <h1 className="mt-3.5 text-[34px] md:text-[46px] leading-[1.06] font-bold tracking-[-0.035em] max-w-[18ch]">
          Tips pemasangan lantai dari tim <span className="text-brand-gradient">EFLOOR</span>
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted max-w-[58ch]">
          Cara pakai lem vinyl dan karpet, memilih list yang tepat, dan panduan
          untuk kontraktor dan procurement.
        </p>
        <nav aria-label="Topik populer" className="mt-7 flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="px-3.5 py-1.5 rounded-full bg-white shadow-e1 text-[13.5px] font-medium text-ink-soft hover:text-ink hover:shadow-e2 transition-shadow"
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </section>

      {latest ? (
        <section className="max-w-[1200px] mx-auto px-4 md:px-8">
          <Link
            href={`/blogs/${latest.slug}`}
            className="group grid lg:grid-cols-[1.15fr_0.85fr] rounded-[28px] md:rounded-[36px] bg-white shadow-e1 hover:shadow-e2 transition-shadow overflow-hidden"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px] bg-surface overflow-hidden">
              <Image
                src={latest.img ?? "/img/blog-placeholder.png"}
                alt={latest.title}
                fill
                priority
                sizes="(min-width: 1024px) 660px, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col p-6 md:p-10">
              <span className="self-start px-2.5 py-0.5 rounded-full bg-orange-tint text-brand-flame text-[12px] font-semibold">
                Artikel terbaru
              </span>
              <h2 className="mt-4 text-[24px] md:text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] group-hover:text-brand-flame transition-colors">
                {latest.title}
              </h2>
              {latest.excerpt && <p className="mt-3 text-[15.5px] md:text-[17px] text-muted leading-relaxed line-clamp-4">{latest.excerpt}</p>}
              <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                <span className="font-mono text-[12.5px] text-muted">
                  {[latest.date, `${latest.minutes} menit baca`].filter(Boolean).join(" · ")}
                </span>
                <span className="w-11 h-11 rounded-full grid place-items-center bg-ink text-white shrink-0">
                  <ArrowIcon className="w-5 h-5" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      ) : (
        <p className="max-w-[1200px] mx-auto px-4 md:px-8 text-muted">Artikel akan segera hadir.</p>
      )}

      {rest.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-4 md:px-8 py-[72px] lg:py-[96px]">
          <h2 className="text-[24px] md:text-[30px] font-semibold tracking-[-0.02em]">Artikel lainnya</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {rest.map((p) => (
              <li key={p.slug} data-reveal>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className={rest.length ? "" : "pt-[72px]"}>
        <ClosingCta
          title="Punya pertanyaan soal pemasangan?"
          lede="Tanya langsung ke tim kami — dari pilihan lem sampai hitungan kebutuhan proyek."
          source="blog-closing"
        />
      </div>
    </div>
  );
}
