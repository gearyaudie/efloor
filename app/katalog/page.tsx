import { statSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import WhatsAppButton from "../components/WhatsAppButton";
import RevealOnScroll from "../components/home/RevealOnScroll";
import ClosingCta from "../components/home/ClosingCta";
import { Eyebrow, h2Class } from "../components/home/SectionHeading";
import CatalogGrid, { type CatalogCard } from "../components/katalog/CatalogGrid";
import { ArrowUpRightIcon, DocIcon, DownloadIcon, WhatsAppDot } from "../components/icons";
import { SITE_URL } from "../seo.config";
import { CATALOGS, TECH_DOCS, catalogPdf, catalogPreview } from "../static/catalogs";
import { PRICE_LIST_UPDATED } from "../static/priceList";

const PAGE_HREF = "/katalog";

/** File size from public/, read at build time. */
function fileSize(publicPath: string) {
  try {
    const bytes = statSync(path.join(process.cwd(), "public", publicPath)).size;
    return bytes >= 1024 * 1024
      ? `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB`
      : `${Math.round(bytes / 1024)} KB`;
  } catch {
    return "PDF";
  }
}

export default function Katalog() {
  const cards: CatalogCard[] = CATALOGS.map((c) => ({
    slug: c.slug,
    title: c.title,
    category: c.category,
    summary: c.summary,
    contents: c.contents,
    pages: c.pages,
    productHref: c.productHref,
    pdf: catalogPdf(c),
    preview: catalogPreview(c),
    size: fileSize(catalogPdf(c)),
  }));
  const fan = CATALOGS.slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Katalog Produk EFLOOR (PDF)",
    url: `${SITE_URL}${PAGE_HREF}`,
    hasPart: [
      ...CATALOGS.map((c) => ({
        "@type": "DigitalDocument",
        name: `Katalog ${c.title}`,
        description: c.summary,
        url: `${SITE_URL}${catalogPdf(c)}`,
        encodingFormat: "application/pdf",
        thumbnailUrl: `${SITE_URL}${catalogPreview(c)}`,
        inLanguage: "id",
      })),
      ...TECH_DOCS.map((d) => ({
        "@type": "DigitalDocument",
        name: d.title,
        description: d.summary,
        url: `${SITE_URL}${d.href}`,
        encodingFormat: "application/pdf",
      })),
    ],
  };

  return (
    <div className="bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RevealOnScroll />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Katalog PDF" }]} />

      <section className="relative isolate overflow-hidden bg-ink text-white rounded-[28px] md:rounded-[36px] md:mx-4 mt-4">
        <div
          aria-hidden="true"
          className="absolute -right-[160px] -top-[200px] w-[640px] h-[640px] rounded-full -z-10 bg-[radial-gradient(closest-side,rgba(255,142,6,0.3),transparent)]"
        />
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 lg:py-20 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div>
            <Eyebrow dark>Katalog &amp; brosur</Eyebrow>
            <h1 className="mt-5 text-[34px] md:text-[46px] lg:text-[54px] leading-[1.05] font-bold tracking-[-0.035em] text-balance">
              Katalog produk <span className="text-[#FFB25C]">EFLOOR</span> dalam PDF
            </h1>
            <p className="mt-5 text-base md:text-lg text-white/70 max-w-[50ch]">
              Harga, ukuran, kode warna, dan cara pasang — siap dilihat, diunduh,
              atau diteruskan ke tukang, kontraktor, dan tim pembelian.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#katalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full bg-white text-ink font-semibold text-[15px] hover:-translate-y-0.5 transition-transform"
              >
                <DownloadIcon className="w-[18px] h-[18px]" />
                Pilih katalog
              </a>
              <WhatsAppButton
                source="katalog-hero"
                product="katalog produk EFLOOR"
                variant="plain"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full text-white font-semibold text-[15px] shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.5)] hover:bg-white/10 transition-colors"
              >
                <WhatsAppDot />
                Kirim ke WhatsApp saya
              </WhatsAppButton>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 max-w-[440px]">
              {[
                [String(CATALOGS.length), "Katalog produk"],
                [String(TECH_DOCS.length), "Dokumen teknis"],
                ["Gratis", "Unduh & bagikan"],
              ].map(([v, l]) => (
                <div key={l} className="flex flex-col-reverse pt-4 border-t border-white/15">
                  <dt className="text-[12.5px] text-white/55 mt-1">{l}</dt>
                  <dd className="text-[22px] md:text-[26px] font-bold tracking-[-0.02em]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The first three covers fanned out like sheets on a desk. */}
          <div aria-hidden="true" className="relative h-[320px] md:h-[420px] max-w-[520px] w-full justify-self-center">
            {fan.map((c, i) => (
              <Image
                key={c.slug}
                src={catalogPreview(c)}
                alt=""
                width={794}
                height={1123}
                priority={i === 1}
                sizes="(min-width: 1024px) 260px, 40vw"
                className="absolute top-1/2 left-1/2 w-[44%] h-auto rounded-[8px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
                style={{
                  transform: `translate(${-50 + (i - 1) * 42}%, -50%) rotate(${(i - 1) * 8}deg)`,
                  zIndex: i === 1 ? 2 : 1,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="katalog" className="scroll-mt-24 max-w-[1200px] mx-auto px-4 md:px-8 py-[72px] lg:py-[96px]">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div className="max-w-[640px]">
            <Eyebrow>Katalog produk</Eyebrow>
            <h2 className={h2Class}>Pilih, lihat, atau bagikan</h2>
            <p className="mt-3.5 text-muted text-base md:text-[17px]">
              Setiap katalog berisi harga toko per {PRICE_LIST_UPDATED}. Link tetap sama saat
              harga diperbarui, jadi aman dibagikan ulang.
            </p>
          </div>
          <Link href="/products" className="group inline-flex items-center gap-2 py-2.5 font-semibold text-[15px] text-ink border-b-[1.5px] border-ink">
            Belanja produk
            <ArrowUpRightIcon className="w-[18px] h-[18px]" />
          </Link>
        </div>
        <CatalogGrid catalogs={cards} />
      </section>

      <section className="bg-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[96px]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] items-start">
          <div data-reveal>
            <Eyebrow>Dokumen teknis</Eyebrow>
            <h2 className={h2Class}>Untuk tender &amp; procurement</h2>
            <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[42ch]">
              Lampirkan langsung ke berkas pengadaan. Butuh dokumen lain? Minta lewat WhatsApp.
            </p>
            <Link href="/projects#quotation" className="group inline-flex items-center gap-2 mt-6 py-2.5 font-semibold text-[15px] text-ink border-b-[1.5px] border-ink">
              Minta quotation proyek
              <ArrowUpRightIcon className="w-[18px] h-[18px]" />
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {TECH_DOCS.map((d) => (
              <li key={d.href} data-reveal>
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener"
                  className="group flex h-full gap-4 p-5 md:p-6 rounded-[24px] bg-paper shadow-[inset_0_0_0_1px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
                >
                  <span className="relative w-12 h-14 rounded-[10px] bg-white shadow-e1 grid place-items-center shrink-0">
                    <DocIcon className="w-6 h-6 text-brand-flame" />
                    <span className="absolute -bottom-1.5 -right-1.5 px-1.5 rounded-md bg-brand-flame text-white text-[9.5px] font-bold">PDF</span>
                  </span>
                  <span className="flex-1 min-w-0">
                    <b className="block text-[16px] leading-snug">{d.title}</b>
                    <small className="block text-[13.5px] text-muted mt-1 leading-relaxed">{d.summary}</small>
                    <span className="inline-flex items-center gap-1.5 mt-3 text-[13px] font-semibold text-ink">
                      <DownloadIcon className="w-4 h-4" />
                      Buka · {fileSize(d.href)}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="pt-[72px] lg:pt-[104px]">
        <ClosingCta
          title="Butuh katalog produk lain?"
          lede="Tim kami bisa mengirim katalog lem, list, dan aksesoris lain langsung ke WhatsApp Anda."
          source="katalog-closing"
          product="katalog produk EFLOOR"
        />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Katalog Produk EFLOOR (PDF) – Harga, Ukuran & Warna",
  description:
    "Unduh katalog PDF EFLOOR: Lem Karpet & Vinyl ECO, List Siku L, List Plint dan List Adaptasi — lengkap dengan harga, kode warna, ukuran, dan cara pasang. Plus TDS & MSDS untuk tender.",
  alternates: { canonical: `${SITE_URL}${PAGE_HREF}` },
  openGraph: {
    title: "Katalog Produk EFLOOR (PDF)",
    description: "Harga, ukuran, kode warna, dan cara pasang dalam PDF siap dibagikan.",
    url: `${SITE_URL}${PAGE_HREF}`,
    images: [{ url: `${SITE_URL}${catalogPreview(CATALOGS[0])}`, width: 794, height: 1123 }],
  },
};
