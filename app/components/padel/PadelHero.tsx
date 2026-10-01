"use client";

import Image from "next/image";
import { useState } from "react";
import { openWhatsApp } from "../../lib/openWhatsApp";
import { useWarm } from "../../lib/useWarm";
import { rupiah } from "../../lib/format";
import { pricePerKg, priceProduct } from "../../static/priceList";
import { MarketplaceLinks } from "../OutboundLinks";
import { CheckIcon, DropIcon, StoreIcon, WhatsAppDot } from "../icons";

const pu = priceProduct("pu");

// Who each pack is for; shown under the picker.
const FIT: Record<string, string> = {
  "450 GRAM": "Botol bermoncong — untuk perbaikan sambungan, rumput hiasan & bata ringan.",
  "33 KG": "Jeriken — untuk pemasangan lapangan padel & proyek kontraktor.",
};

// From the label: "Tahan air, cepat kering", indoor & outdoor, polyurethane.
const TICKS = [
  "Untuk sambungan rumput sintetis lapangan padel",
  "Polyurethane: tahan air, cepat kering",
  "Bisa untuk indoor maupun outdoor",
];

export default function PadelHero() {
  const [active, setActive] = useState(1);
  const { warm, warmProps } = useWarm();
  const pack = pu.sizes[active];
  const small = pu.sizes[0];
  const saving = Math.floor(((pricePerKg(small) - pricePerKg(pack)) / pricePerKg(small)) * 100);

  return (
    <section className="relative overflow-clip" {...warmProps}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[25%] -left-[15%] w-[70%] h-[760px] bg-[radial-gradient(closest-side,rgba(46,125,50,0.16),rgba(46,125,50,0))]"
      />
      <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 pt-6 pb-16 lg:pt-10 lg:pb-24 grid gap-10 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr] items-start">
        {/* Gallery: the pack on a stretch of padel turf with court lines. */}
        <div className="lg:sticky lg:top-28">
          <div className="relative aspect-square rounded-[32px] md:rounded-[40px] overflow-hidden isolate bg-[#2f7d3a]">
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 opacity-60 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0_2px,transparent_2px_5px),repeating-linear-gradient(0deg,rgba(0,0,0,0.06)_0_1px,transparent_1px_4px),linear-gradient(160deg,#3b9147,#25692f)]"
            />
            {/* Court lines: service line and centre line. */}
            <span aria-hidden="true" className="absolute -z-10 left-0 right-0 top-[68%] h-[6px] bg-white/85" />
            <span aria-hidden="true" className="absolute -z-10 left-1/2 top-[68%] bottom-0 w-[6px] -translate-x-1/2 bg-white/85" />
            <span aria-hidden="true" className="absolute -z-10 left-1/2 top-[50%] w-[78%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.35),transparent)]" />
            {pu.sizes.map(
              (s, i) =>
                (warm || active === i) &&
                s.img && (
                  <Image
                    key={s.img}
                    src={s.img}
                    alt={`Lem PU EFLOOR untuk rumput sintetis & lapangan padel, kemasan ${s.label}`}
                    width={1000}
                    height={1000}
                    priority={i === 1}
                    sizes="(min-width: 1024px) 560px, 92vw"
                    className={`absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 w-[82%] h-auto drop-shadow-[0_34px_40px_rgba(0,0,0,0.45)] transition-[opacity,scale] duration-500 ${
                      active === i ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  />
                ),
            )}
            <span className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-e1 text-[12.5px] font-semibold text-ink-soft">
              <DropIcon className="w-4 h-4 text-[#2f7d3a]" />
              Tahan air
            </span>
            <span className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-ink text-white font-mono text-[12.5px]">{pack.label}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3" role="group" aria-label="Foto kemasan">
            {pu.sizes.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Lihat kemasan ${s.label}`}
                aria-pressed={active === i}
                className={`relative aspect-[16/9] rounded-[18px] bg-white cursor-pointer transition-shadow ${
                  active === i ? "shadow-[inset_0_0_0_2px_var(--color-brand-flame)]" : "shadow-e1 hover:shadow-e2"
                }`}
              >
                {s.img && <Image src={s.img} alt="" width={160} height={160} sizes="120px" className="absolute inset-[8%] w-[84%] h-[84%] object-contain" />}
                <span className="absolute bottom-1.5 right-2.5 font-mono text-[11px] text-muted">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div>
          <span className="inline-flex items-center gap-2.5 py-1.5 pl-1.5 pr-3.5 rounded-full bg-white shadow-e1 text-[13.5px] font-medium text-ink-soft">
            <span className="px-2.5 py-0.5 rounded-full bg-[#e3f1e4] text-[#24692e] font-semibold text-xs">Polyurethane</span>
            Padel · Rumput sintetis · Bata ringan
          </span>

          <h1 className="mt-5 text-[34px] md:text-[46px] lg:text-[54px] leading-[1.05] font-bold tracking-[-0.035em] text-balance">
            Lem Lapangan Padel <span className="text-[#2f7d3a]">&amp; Rumput Sintetis</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted max-w-[52ch]">
            Lem polyurethane (PU) EFLOOR untuk menyambung rumput sintetis
            lapangan padel, taman, dan dekorasi — juga untuk bata ringan.
            Tahan air, cepat kering, dan bisa dipakai di dalam maupun luar ruangan.
          </p>

          <ul className="mt-6 space-y-2.5">
            {TICKS.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[15px] text-ink-soft">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#e3f1e4] text-[#2f7d3a] grid place-items-center shrink-0">
                  <CheckIcon className="w-3.5 h-3.5" />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 p-5 md:p-6 rounded-[28px] bg-white shadow-e2">
            <fieldset>
              <legend className="text-[13px] font-semibold text-ink-soft">Pilih kemasan</legend>
              <div className="grid grid-cols-2 gap-2.5 mt-3">
                {pu.sizes.map((s, i) => (
                  <label
                    key={s.label}
                    className={`cursor-pointer rounded-[18px] px-3 py-3 text-center transition-shadow ${
                      active === i
                        ? "bg-orange-tint shadow-[inset_0_0_0_2px_var(--color-brand-flame)]"
                        : "bg-paper shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
                    }`}
                  >
                    <input type="radio" name="pu-size" className="sr-only" checked={active === i} onChange={() => setActive(i)} />
                    <span className="block font-mono text-[15px] font-semibold text-ink">{s.label}</span>
                    <span className="block text-[12px] text-muted mt-0.5">{rupiah(s.price)}</span>
                  </label>
                ))}
              </div>
              <p className="mt-3 text-[13px] text-muted">{FIT[pack.label]}</p>
            </fieldset>

            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 mt-5 pt-5 border-t border-line">
              <div>
                <span className="text-[12.5px] text-muted">Harga toko · {pack.label}</span>
                <div className="text-[32px] md:text-[36px] font-bold tracking-[-0.03em] leading-none mt-1 tabular-nums">{rupiah(pack.price)}</div>
              </div>
              <div className="text-right text-[13px] text-muted leading-snug">
                <span className="font-mono text-ink">{rupiah(pricePerKg(pack))}</span> / kg
                {saving > 0 && <span className="block text-wa font-semibold">Hemat {saving}% per kg</span>}
              </div>
            </div>

            <button
              type="button"
              onClick={() => openWhatsApp({ source: "padel-hero", product: `Lem PU EFLOOR (rumput sintetis / padel) ${pack.label}` })}
              className="mt-5 w-full inline-flex items-center justify-center gap-2.5 h-[54px] px-6 rounded-full bg-brand-gradient text-white font-semibold text-[15px] shadow-cta hover:-translate-y-0.5 transition-transform cursor-pointer"
            >
              <WhatsAppDot />
              Pesan {pack.label} via WhatsApp
            </button>
            <MarketplaceLinks
              source="padel-hero"
              className="grid grid-cols-2 gap-2.5 mt-2.5"
              linkClassName="inline-flex items-center justify-center h-[46px] rounded-full bg-white text-ink font-semibold text-[14px] shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
            />
          </div>

          <p className="flex items-start gap-2.5 mt-4 text-[13px] text-muted">
            <StoreIcon className="w-[18px] h-[18px] text-brand-flame shrink-0" />
            <span>
              Membangun beberapa lapangan sekaligus?{" "}
              <a href="#harga" className="font-semibold text-ink underline underline-offset-4 whitespace-nowrap">
                Minta harga proyek
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
