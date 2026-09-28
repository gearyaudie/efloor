"use client";

import Image from "next/image";
import { useState } from "react";
import { openWhatsApp } from "../../lib/openWhatsApp";
import { useWarm } from "../../lib/useWarm";
import { rupiah } from "../../lib/format";
import { pricePerKg, priceProduct } from "../../static/priceList";
import { MarketplaceLinks } from "../OutboundLinks";
import { CheckIcon, LeafIcon, StoreIcon, WhatsAppDot } from "../icons";

const eco = priceProduct("eco");
const vinyl = priceProduct("vinyl");

// Straight from the tub label and the ECO banner.
const TICKS = [
  "Untuk karpet tile, karpet roll & lantai vinyl",
  "Waterbased, tidak berbau menyengat",
  "Daya sebar ±8–10 m² per kg, oles satu sisi",
];

/** Percent cheaper than the regular EFLOOR glue in the same pack size. */
function cheaperThanRegular(label: string, price: number) {
  const regular = vinyl.sizes.find((s) => s.label === label)?.price;
  return regular ? Math.floor(((regular - price) / regular) * 100) : 0;
}

export default function EcoHero() {
  const [active, setActive] = useState(1);
  const { warm, warmProps } = useWarm();
  const pack = eco.sizes[active];
  const [lo, hi] = eco.coverage!;
  const cheaper = cheaperThanRegular(pack.label, pack.price);

  return (
    <section className="relative overflow-clip" {...warmProps}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[25%] -left-[15%] w-[70%] h-[760px] bg-[radial-gradient(closest-side,rgba(62,125,46,0.14),rgba(62,125,46,0))]"
      />
      <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 pt-6 pb-16 lg:pt-10 lg:pb-24 grid gap-10 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr] items-start">
        {/* Gallery */}
        <div className="lg:sticky lg:top-28">
          <div className="relative aspect-square rounded-[32px] md:rounded-[40px] overflow-hidden isolate bg-[linear-gradient(160deg,#f1f4ea,#dfe8d3)]">
            <div
              aria-hidden="true"
              className="absolute -z-10 left-1/2 top-[52%] w-[82%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70"
            />
            {eco.sizes.map(
              (s, i) =>
                (warm || active === i) &&
                s.img && (
                  <Image
                    key={s.img}
                    src={s.img}
                    alt={`Lem Karpet & Vinyl ECO EFLOOR kemasan ${s.label}`}
                    width={900}
                    height={900}
                    priority={i === 1}
                    sizes="(min-width: 1024px) 560px, 92vw"
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-auto drop-shadow-[0_30px_40px_rgba(30,60,20,0.25)] transition-[opacity,scale] duration-500 ${
                      active === i ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  />
                ),
            )}
            <span className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-e1 text-[12.5px] font-semibold text-ink-soft">
              <LeafIcon className="w-4 h-4 text-wa" />
              Waterbased
            </span>
            <span className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-ink text-white font-mono text-[12.5px]">
              {pack.label}
            </span>
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-white shadow-e2 font-mono text-[12.5px] whitespace-nowrap">
              ±{lo * pack.kg}–{hi * pack.kg} m²
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-3" role="group" aria-label="Foto kemasan">
            {eco.sizes.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Lihat kemasan ${s.label}`}
                aria-pressed={active === i}
                className={`relative aspect-[4/3] rounded-[18px] bg-white cursor-pointer transition-shadow ${
                  active === i ? "shadow-[inset_0_0_0_2px_var(--color-brand-flame)]" : "shadow-e1 hover:shadow-e2"
                }`}
              >
                {s.img && (
                  <Image src={s.img} alt="" width={160} height={160} sizes="160px" className="absolute inset-[10%] w-[80%] h-[80%] object-contain" />
                )}
                <span className="absolute bottom-1.5 right-2.5 font-mono text-[11px] text-muted">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div>
          <span className="inline-flex items-center gap-2.5 py-1.5 pl-1.5 pr-3.5 rounded-full bg-white shadow-e1 text-[13.5px] font-medium text-ink-soft">
            <span className="px-2.5 py-0.5 rounded-full bg-[#e4efdc] text-[#2f6b22] font-semibold text-xs">Harga hemat</span>
            Karpet tile · Karpet roll · Vinyl
          </span>

          <h1 className="mt-5 text-[34px] md:text-[46px] lg:text-[54px] leading-[1.05] font-bold tracking-[-0.035em] text-balance">
            Lem Karpet &amp; Vinyl <span className="text-[#2f7a22]">ECO</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted max-w-[50ch]">
            Lem karpet dan vinyl waterbased dari EFLOOR dengan harga lebih
            hemat. Oles di satu sisi, tunggu bening, lalu tempel — untuk rumah,
            kantor, dan proyek renovasi.
          </p>

          <ul className="mt-6 space-y-2.5">
            {TICKS.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[15px] text-ink-soft">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#e4efdc] text-[#2f7a22] grid place-items-center shrink-0">
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
                {eco.sizes.map((s, i) => (
                  <label
                    key={s.label}
                    className={`cursor-pointer rounded-[18px] px-3 py-3 text-center transition-shadow ${
                      active === i
                        ? "bg-orange-tint shadow-[inset_0_0_0_2px_var(--color-brand-flame)]"
                        : "bg-paper shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
                    }`}
                  >
                    <input type="radio" name="eco-size" className="sr-only" checked={active === i} onChange={() => setActive(i)} />
                    <span className="block font-mono text-[15px] font-semibold text-ink">{s.label}</span>
                    <span className="block text-[12px] text-muted mt-0.5">{rupiah(s.price)}</span>
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
                <span className="font-mono text-ink">{rupiah(pricePerKg(pack))}</span> / kg
                {cheaper > 0 && <span className="block text-wa font-semibold">{cheaper}% lebih hemat dari EFLOOR reguler</span>}
              </div>
            </div>

            <button
              type="button"
              onClick={() => openWhatsApp({ source: "eco-hero", product: `Lem Karpet & Vinyl ECO ${pack.label}` })}
              className="mt-5 w-full inline-flex items-center justify-center gap-2.5 h-[54px] px-6 rounded-full bg-brand-gradient text-white font-semibold text-[15px] shadow-cta hover:-translate-y-0.5 transition-transform cursor-pointer"
            >
              <WhatsAppDot />
              Pesan {pack.label} via WhatsApp
            </button>
            <MarketplaceLinks
              source="eco-hero"
              className="grid grid-cols-2 gap-2.5 mt-2.5"
              linkClassName="inline-flex items-center justify-center h-[46px] rounded-full bg-white text-ink font-semibold text-[14px] shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
            />
          </div>

          <p className="flex items-start gap-2.5 mt-4 text-[13px] text-muted">
            <StoreIcon className="w-[18px] h-[18px] text-brand-flame shrink-0" />
            <span>
              Tersedia di toko Kelapa Gading, Jakarta Utara.{" "}
              <a href="#bandingkan" className="font-semibold text-ink underline underline-offset-4 whitespace-nowrap">
                Bandingkan dengan EFLOOR &amp; MAX
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
