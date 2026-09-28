"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SITE_URL } from "../../seo.config";
import { trackCatalogAction } from "../../lib/analytics";
import type { CatalogCategory } from "../../static/catalogs";
import { ArrowUpRightIcon, CheckIcon, DocIcon, DownloadIcon, WhatsAppIcon } from "../icons";

export type CatalogCard = {
  slug: string;
  title: string;
  category: CatalogCategory;
  summary: string;
  contents: string[];
  pages: number;
  productHref: string;
  pdf: string;
  preview: string;
  /** e.g. "1,3 MB" */
  size: string;
};

/** Filterable grid of product sheets with open / download / share actions. */
export default function CatalogGrid({ catalogs }: { catalogs: CatalogCard[] }) {
  const categories = [...new Set(catalogs.map((c) => c.category))];
  const [filter, setFilter] = useState<CatalogCategory | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const visible = filter ? catalogs.filter((c) => c.category === filter) : catalogs;

  const copy = async (c: CatalogCard) => {
    try {
      await navigator.clipboard.writeText(`${SITE_URL}${c.pdf}`);
      setCopied(c.slug);
      window.setTimeout(() => setCopied((s) => (s === c.slug ? null : s)), 2000);
    } catch {}
    trackCatalogAction("copy_link", c.slug);
  };

  return (
    <div>
      {categories.length > 1 && (
        <div role="group" aria-label="Filter kategori" className="flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
          {[null, ...categories].map((c) => {
            const n = c ? catalogs.filter((x) => x.category === c).length : catalogs.length;
            return (
              <button
                key={c ?? "all"}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-medium cursor-pointer transition-colors ${
                  filter === c ? "bg-ink text-white" : "bg-white text-ink-soft shadow-e1 hover:text-ink"
                }`}
              >
                {c ?? "Semua katalog"}
                <span className={`font-mono text-[12px] ${filter === c ? "text-white/60" : "text-muted"}`}>{n}</span>
              </button>
            );
          })}
        </div>
      )}

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {visible.map((c) => {
          const share = `https://wa.me/?text=${encodeURIComponent(`Katalog ${c.title} dari EFLOOR: ${SITE_URL}${c.pdf}`)}`;
          return (
            <li key={c.slug} className="group flex flex-col rounded-[28px] bg-white shadow-e1 hover:shadow-e2 transition-shadow overflow-hidden">
              {/* Cover: page 1 of the PDF, set on a desk-like tint with a second sheet peeking out. */}
              <a
                href={c.pdf}
                target="_blank"
                rel="noopener"
                onClick={() => trackCatalogAction("open", c.slug)}
                className="relative block aspect-[4/3.3] bg-[linear-gradient(160deg,#f3efe7,#e7e1d6)] overflow-hidden"
                aria-label={`Buka katalog ${c.title}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-[14%] w-[52%] aspect-[210/297] -translate-x-[38%] rotate-[5deg] rounded-[6px] bg-white shadow-[0_10px_24px_-10px_rgba(24,23,27,0.35)]"
                />
                <Image
                  src={c.preview}
                  alt={`Halaman depan katalog ${c.title}`}
                  width={794}
                  height={1123}
                  sizes="(min-width: 1024px) 200px, 45vw"
                  className="absolute left-1/2 top-[10%] w-[52%] h-auto -translate-x-[58%] -rotate-[2deg] rounded-[6px] shadow-[0_24px_40px_-14px_rgba(24,23,27,0.45)] transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:-rotate-[3deg]"
                />
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11.5px] font-semibold text-ink-soft shadow-e1">
                  {c.category}
                </span>
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink text-white font-mono text-[11.5px]">
                  <DocIcon className="w-3.5 h-3.5" />
                  PDF · {c.pages} hlm · {c.size}
                </span>
              </a>

              <div className="flex flex-col flex-1 p-5 md:p-6">
                <h3 className="text-[19px] font-semibold tracking-[-0.01em] leading-snug">{c.title}</h3>
                <p className="mt-1.5 text-[14px] text-muted leading-relaxed">{c.summary}</p>
                <ul className="flex flex-wrap gap-1.5 mt-4">
                  {c.contents.map((t) => (
                    <li key={t} className="px-2.5 py-1 rounded-full bg-paper text-[12px] font-medium text-ink-soft shadow-[inset_0_0_0_1px_var(--color-line)]">
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 grid grid-cols-2 gap-2">
                  <a
                    href={c.pdf}
                    target="_blank"
                    rel="noopener"
                    onClick={() => trackCatalogAction("open", c.slug)}
                    className="inline-flex items-center justify-center gap-2 h-[44px] rounded-full bg-ink text-white font-semibold text-[14px] hover:-translate-y-0.5 transition-transform"
                  >
                    Lihat PDF
                  </a>
                  <a
                    href={c.pdf}
                    download={`EFLOOR-${c.slug}.pdf`}
                    onClick={() => trackCatalogAction("download", c.slug)}
                    className="inline-flex items-center justify-center gap-2 h-[44px] rounded-full bg-white text-ink font-semibold text-[14px] shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    Unduh
                  </a>
                </div>
                <div className="flex items-center justify-between gap-2 mt-3 text-[13px]">
                  <a
                    href={share}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCatalogAction("share", c.slug)}
                    className="inline-flex items-center gap-1.5 font-semibold text-ink-soft hover:text-ink"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-wa" />
                    Bagikan
                  </a>
                  <button
                    type="button"
                    onClick={() => copy(c)}
                    className="inline-flex items-center gap-1.5 font-semibold text-ink-soft hover:text-ink cursor-pointer"
                    aria-live="polite"
                  >
                    {copied === c.slug ? <CheckIcon className="w-4 h-4 text-wa" /> : null}
                    {copied === c.slug ? "Link disalin" : "Salin link"}
                  </button>
                  <Link href={c.productHref} className="inline-flex items-center gap-1 font-semibold text-ink-soft hover:text-brand-flame">
                    Produk
                    <ArrowUpRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
