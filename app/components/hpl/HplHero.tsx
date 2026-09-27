"use client";

import Image from "next/image";
import { useState } from "react";
import { openWhatsApp } from "../../lib/openWhatsApp";
import { HPL_PACKS, perKg, rupiah, savingVsSmallest } from "../../static/hpl";
import { MarketplaceLinks } from "../OutboundLinks";
import { CheckIcon, LeafIcon, StoreIcon, WhatsAppDot } from "../icons";

const TICKS = [
  "Cukup oles di satu sisi — lebih hemat & cepat",
  "Waterbased, minim bau untuk workshop tertutup",
  "Untuk HPL, veneer, PVC sheet, MDF & multiplek",
];

/**
 * Product-page hero: a packshot stage on the left, and a buy box on the right
 * where picking a size swaps the photo, the price and the WhatsApp message.
 */
export default function HplHero() {
  const [active, setActive] = useState(1);
  const pack = HPL_PACKS[active];
  const saving = savingVsSmallest(pack);

  return (
    <section className="relative overflow-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[25%] -left-[15%] w-[70%] h-[760px] bg-[radial-gradient(closest-side,rgba(255,142,6,0.16),rgba(255,142,6,0))]"
      />
      <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 pt-6 pb-16 lg:pt-10 lg:pb-24 grid gap-10 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr] items-start">
        {/* Gallery */}
        <div className="lg:sticky lg:top-28">
          <div className="relative aspect-square rounded-[32px] md:rounded-[40px] overflow-hidden isolate bg-[linear-gradient(160deg,#f6efe4,#ece2d2)]">
            {/* A laminate sheet peeling back from the board, behind the bucket. */}
            <div
              aria-hidden="true"
              className="absolute -z-10 inset-x-0 bottom-0 h-[38%] bg-[repeating-linear-gradient(90deg,rgba(120,80,40,0.06)_0_2px,transparent_2px_9px),linear-gradient(180deg,#d9c3a2,#c7a97f)]"
            />
            <div
              aria-hidden="true"
              className="absolute -z-10 left-[-10%] right-[-10%] bottom-[34%] h-[16%] origin-bottom-left -rotate-[4deg] rounded-t-[12px] bg-[linear-gradient(180deg,#fbfaf7,#efebe3)] shadow-[0_-12px_30px_-12px_rgba(24,23,27,0.25)]"
            />
            <div
              aria-hidden="true"
              className="absolute -z-10 inset-x-0 bottom-[37%] h-[3%] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.9)_0_6px,rgba(242,86,29,0.18)_6px_9px)] opacity-70"
            />

            {HPL_PACKS.map((p, i) => (
              <Image
                key={p.img}
                src={p.img}
                alt={`Lem HPL EFLOOR kemasan ${p.label}`}
                width={520}
                height={520}
                priority={i === 1}
                sizes="(min-width: 1024px) 560px, 92vw"
                className={`absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 w-[78%] h-auto drop-shadow-[0_30px_40px_rgba(90,50,10,0.28)] transition-[opacity,scale] duration-500 ${
                  active === i ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              />
            ))}

            <span className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-e1 text-[12.5px] font-semibold text-ink-soft">
              <LeafIcon className="w-4 h-4 text-wa" />
              Waterbased
            </span>
            <span className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-ink text-white font-mono text-[12.5px]">
              {pack.label}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-3" role="group" aria-label="Foto kemasan">
            {HPL_PACKS.map((p, i) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Lihat kemasan ${p.label}`}
                aria-pressed={active === i}
                className={`relative aspect-[4/3] rounded-[18px] bg-white cursor-pointer transition-shadow ${
                  active === i
                    ? "shadow-[inset_0_0_0_2px_var(--color-brand-flame)]"
                    : "shadow-e1 hover:shadow-e2"
                }`}
              >
                <Image
                  src={p.img}
                  alt=""
                  width={160}
                  height={160}
                  sizes="160px"
                  className="absolute inset-[10%] w-[80%] h-[80%] object-contain"
                />
                <span className="absolute bottom-1.5 right-2.5 font-mono text-[11px] text-muted">{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div>
          <span className="inline-flex items-center gap-2.5 py-1.5 pl-1.5 pr-3.5 rounded-full bg-white shadow-e1 text-[13.5px] font-medium text-ink-soft">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-tint text-brand-flame font-semibold text-xs">
              Lem kontak 1 sisi
            </span>
            HPL · Veneer · PVC Sheet
          </span>

          <h1 className="mt-5 text-[36px] md:text-[48px] lg:text-[56px] leading-[1.05] font-bold tracking-[-0.035em] text-balance">
            Lem HPL <span className="text-brand-gradient">EFLOOR</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted max-w-[50ch]">
            Lem HPL waterbased untuk kitchen set, kabinet, meja, dan produksi
            furniture harian. Daya rekat kuat, cepat tack, dan cukup dioleskan
            di satu sisi.
          </p>

          <ul className="mt-6 space-y-2.5">
            {TICKS.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[15px] text-ink-soft">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-tint text-brand-flame grid place-items-center shrink-0">
                  <CheckIcon className="w-3.5 h-3.5" />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 p-5 md:p-6 rounded-[28px] bg-white shadow-e2">
            <fieldset>
              <legend className="text-[13px] font-semibold text-ink-soft">Pilih kemasan</legend>
              <div className="grid grid-cols-3 gap-2.5 mt-3">
                {HPL_PACKS.map((p, i) => (
                  <label
                    key={p.label}
                    className={`relative cursor-pointer rounded-[18px] px-3 py-3 text-center transition-shadow ${
                      active === i
                        ? "bg-orange-tint shadow-[inset_0_0_0_2px_var(--color-brand-flame)]"
                        : "bg-paper shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="hpl-size"
                      className="sr-only"
                      checked={active === i}
                      onChange={() => setActive(i)}
                    />
                    <span className="block font-mono text-[15px] font-semibold text-ink">{p.label}</span>
                    <span className="block text-[12px] text-muted mt-0.5">{rupiah(p.price)}</span>
                    {savingVsSmallest(p) > 0 && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-wa text-white text-[10.5px] font-semibold whitespace-nowrap">
                        Hemat {savingVsSmallest(p)}%
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 mt-6 pt-5 border-t border-line">
              <div>
                <span className="text-[12.5px] text-muted">Harga toko · {pack.label}</span>
                <div className="text-[32px] md:text-[36px] font-bold tracking-[-0.03em] leading-none mt-1 tabular-nums">
                  {rupiah(pack.price)}
                </div>
              </div>
              <div className="text-right text-[13px] text-muted leading-snug">
                <span className="font-mono text-ink">{rupiah(perKg(pack))}</span> / kg
                {saving > 0 && (
                  <span className="block text-wa font-semibold">Lebih hemat {saving}% per kg</span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                openWhatsApp({ source: "hpl-hero", product: `Lem HPL EFLOOR ${pack.label}` })
              }
              className="mt-5 w-full inline-flex items-center justify-center gap-2.5 h-[54px] px-6 rounded-full bg-brand-gradient text-white font-semibold text-[15px] shadow-cta hover:-translate-y-0.5 transition-transform cursor-pointer"
            >
              <WhatsAppDot />
              Pesan {pack.label} via WhatsApp
            </button>
            <MarketplaceLinks
              source="hpl-hero"
              className="grid grid-cols-2 gap-2.5 mt-2.5"
              linkClassName="inline-flex items-center justify-center h-[46px] rounded-full bg-white text-ink font-semibold text-[14px] shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
            />
          </div>

          <p className="flex items-start gap-2.5 mt-4 text-[13px] text-muted">
            <StoreIcon className="w-[18px] h-[18px] text-brand-flame shrink-0" />
            <span>
              Tersedia di toko Kelapa Gading, Jakarta Utara. Butuh volume
              produksi?{" "}
              <a href="#harga" className="font-semibold text-ink underline underline-offset-4 whitespace-nowrap">
                Lihat semua harga
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
