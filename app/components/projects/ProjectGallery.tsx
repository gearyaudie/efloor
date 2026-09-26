"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Eyebrow, h2Class } from "../home/SectionHeading";
import { formatDate, type B2BProject } from "./types";

const PAGE = 9;
const ALL = "Semua";

export default function ProjectGallery({ projects }: { projects: B2BProject[] }) {
  const withPhotos = useMemo(() => projects.filter((p) => p.photo?.asset?.url), [projects]);

  // Filter chips come from the records themselves, most common type first.
  const types = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of withPhotos) {
      const t = p.type?.trim();
      if (t) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [withPhotos]);

  const [filter, setFilter] = useState(ALL);
  const [shown, setShown] = useState(PAGE);

  const visible = filter === ALL ? withPhotos : withPhotos.filter((p) => p.type?.trim() === filter);

  if (withPhotos.length === 0) return null;

  return (
    <section id="riwayat" className="scroll-mt-24 py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <Eyebrow>Riwayat proyek</Eyebrow>
            <h2 className={h2Class}>Pengiriman procurement terbaru</h2>
            <p className="mt-3.5 text-muted text-base md:text-[17px]">
              Sebagian riwayat pengiriman Lem Vinyl &amp; Lem Karpet EFLOOR ke
              berbagai perusahaan dan kontraktor.
            </p>
          </div>
          <span className="font-mono text-[13px] text-muted">{visible.length} proyek</span>
        </div>

        {types.length > 1 && (
          <div role="group" aria-label="Filter jenis proyek" className="flex gap-2 mt-8 overflow-x-auto scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
            {[[ALL, withPhotos.length] as const, ...types].map(([t, n]) => (
              <button
                key={t}
                type="button"
                aria-pressed={filter === t}
                onClick={() => {
                  setFilter(t);
                  setShown(PAGE);
                }}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-medium cursor-pointer transition-colors ${
                  filter === t ? "bg-ink text-white" : "bg-white text-ink-soft shadow-e1 hover:text-ink"
                }`}
              >
                {t}
                <span className={`font-mono text-[12px] ${filter === t ? "text-white/60" : "text-muted"}`}>{n}</span>
              </button>
            ))}
          </div>
        )}

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {/* Every record stays in the HTML for search engines; the extras are
              just hidden until "show more". */}
          {visible.map((p, i) => {
            const date = formatDate(p.tanggal);
            return (
              <li key={p._id} className={`${i >= shown ? "hidden" : ""} group rounded-[24px] bg-white shadow-e1 hover:shadow-e2 transition-shadow overflow-hidden`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <Image
                    src={p.photo!.asset!.url}
                    alt={`${p.type ?? ""} ${p.namaBarang ?? ""} untuk ${p.namaPT ?? ""}`.trim()}
                    width={600}
                    height={450}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  {p.type && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11.5px] font-semibold uppercase tracking-[0.08em] text-brand-flame">
                      {p.type}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[16px] leading-snug">{p.namaPT}</h3>
                  <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[13.5px]">
                    {p.namaBarang && (
                      <>
                        <dt className="text-muted">Produk</dt>
                        <dd className="text-ink-soft">{p.namaBarang}</dd>
                      </>
                    )}
                    {p.quantity && (
                      <>
                        <dt className="text-muted">Jumlah</dt>
                        <dd className="font-mono text-ink-soft">{p.quantity}</dd>
                      </>
                    )}
                    {date && (
                      <>
                        <dt className="text-muted">Tanggal</dt>
                        <dd className="text-ink-soft">{date}</dd>
                      </>
                    )}
                  </dl>
                </div>
              </li>
            );
          })}
        </ul>

        {visible.length > shown && (
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE)}
              className="inline-flex items-center justify-center h-[50px] px-6 rounded-full bg-white text-ink font-semibold text-[15px] shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow cursor-pointer"
            >
              Tampilkan lebih banyak ({visible.length - shown})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
