"use client";

import Image from "next/image";
import { useState } from "react";
import { openWhatsApp } from "../../lib/openWhatsApp";
import { useWarm } from "../../lib/useWarm";
import { rupiah } from "../../lib/format";
import { pricePerKg, priceProduct } from "../../static/priceList";
import { MarketplaceLinks } from "../OutboundLinks";
import { CheckIcon, LayersIcon, StoreIcon, WhatsAppDot } from "../icons";

const epoxy = priceProduct("epoxy");

// What is inside each set; the price always covers both bottles.
const SPLIT: Record<string, string> = {
  "500 GR": "1 set = Resin (A) 250 gr + Hardener (B) 250 gr. Pas untuk perbaikan dan pekerjaan kecil.",
  "2,8 KG": "1 set = Resin (A) 1,4 kg + Hardener (B) 1,4 kg. Untuk workshop & produksi furnitur.",
};

// From the label: Non-sag, Serbaguna (kayu, logam, kaca), keras 3–4 jam.
const TICKS = [
  "Non-sag: tidak meleleh di bidang tegak & sudut",
  "Untuk sambungan kayu, tenon & sudut 45°",
  "Serbaguna: kayu, logam & kaca · keras 3–4 jam",
];

export default function EpoxyHero() {
  const [active, setActive] = useState(1);
  const { warm, warmProps } = useWarm();
  const pack = epoxy.sizes[active];
  const small = epoxy.sizes[0];
  const saving = Math.floor(((pricePerKg(small) - pricePerKg(pack)) / pricePerKg(small)) * 100);

  return (
    <section className="relative overflow-clip" {...warmProps}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[25%] -left-[15%] w-[70%] h-[760px] bg-[radial-gradient(closest-side,rgba(234,162,18,0.18),rgba(234,162,18,0))]"
      />
      <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 pt-6 pb-16 lg:pt-10 lg:pb-24 grid gap-10 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr] items-start">
        {/* Gallery: the set on a warm podium, like the marketplace listing. */}
        <div className="lg:sticky lg:top-28">
          <div className="relative aspect-square rounded-[32px] md:rounded-[40px] overflow-hidden isolate bg-[linear-gradient(165deg,#fff8e6,#f3d895)]">
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[repeating-linear-gradient(-28deg,rgba(201,120,10,0.08)_0_3px,transparent_3px_26px)]"
            />
            <span aria-hidden="true" className="absolute -z-10 left-[8%] right-[8%] bottom-[9%] h-[16%] rounded-[50%] bg-[linear-gradient(180deg,#fff_30%,#efe3c6)] shadow-[0_22px_34px_-16px_rgba(150,95,10,0.5)]" />
            {epoxy.sizes.map(
              (s, i) =>
                (warm || active === i) &&
                s.img && (
                  <Image
                    key={s.img}
                    src={s.img}
                    alt={`Lem Epoxy EFLOOR Non-Sag, 1 set Resin + Hardener ${s.label}`}
                    width={1000}
                    height={1000}
                    priority={i === 1}
                    sizes="(min-width: 1024px) 560px, 92vw"
                    className={`absolute left-1/2 bottom-[16%] -translate-x-1/2 w-auto h-[70%] max-w-[84%] object-contain drop-shadow-[0_30px_30px_rgba(80,50,10,0.3)] transition-[opacity,scale] duration-500 ${
                      active === i ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  />
                ),
            )}
            <span className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-e1 text-[12.5px] font-semibold text-ink-soft">
              <LayersIcon className="w-4 h-4 text-[#c9780a]" />
              Resin + Hardener
            </span>
            <span className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-ink text-white font-mono text-[12.5px]">1 set · {pack.label}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3" role="group" aria-label="Foto kemasan">
            {epoxy.sizes.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Lihat set ${s.label}`}
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
            <span className="px-2.5 py-0.5 rounded-full bg-[#fbecc4] text-[#8a5a06] font-semibold text-xs">Epoxy 2 komponen</span>
            Kayu · Logam · Kaca
          </span>

          <h1 className="mt-5 text-[34px] md:text-[46px] lg:text-[54px] leading-[1.05] font-bold tracking-[-0.035em] text-balance">
            Lem Epoxy <span className="text-[#c9780a]">Non-Sag</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted max-w-[52ch]">
            Lem epoxy 2 komponen EFLOOR untuk sambungan kayu, tenon, dan sudut 45°.
            Formula non-sag tidak meleleh, rekat kuat, dan garis lemnya tidak terlihat.
            Dijual per set: Resin (A) + Hardener (B).
          </p>

          <ul className="mt-6 space-y-2.5">
            {TICKS.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[15px] text-ink-soft">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#fbecc4] text-[#c9780a] grid place-items-center shrink-0">
                  <CheckIcon className="w-3.5 h-3.5" />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 p-5 md:p-6 rounded-[28px] bg-white shadow-e2">
            <fieldset>
              <legend className="text-[13px] font-semibold text-ink-soft">Pilih set</legend>
              <div className="grid grid-cols-2 gap-2.5 mt-3">
                {epoxy.sizes.map((s, i) => (
                  <label
                    key={s.label}
                    className={`cursor-pointer rounded-[18px] px-3 py-3 text-center transition-shadow ${
                      active === i
                        ? "bg-orange-tint shadow-[inset_0_0_0_2px_var(--color-brand-flame)]"
                        : "bg-paper shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
                    }`}
                  >
                    <input type="radio" name="epoxy-size" className="sr-only" checked={active === i} onChange={() => setActive(i)} />
                    <span className="block font-mono text-[15px] font-semibold text-ink">{s.label}</span>
                    <span className="block text-[12px] text-muted mt-0.5">{rupiah(s.price)} / set</span>
                  </label>
                ))}
              </div>
              <p className="mt-3 text-[13px] text-muted">{SPLIT[pack.label]}</p>
            </fieldset>

            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 mt-5 pt-5 border-t border-line">
              <div>
                <span className="text-[12.5px] text-muted">Harga toko · 1 set {pack.label}</span>
                <div className="text-[32px] md:text-[36px] font-bold tracking-[-0.03em] leading-none mt-1 tabular-nums">{rupiah(pack.price)}</div>
              </div>
              <div className="text-right text-[13px] text-muted leading-snug">
                <span className="font-mono text-ink">{rupiah(pricePerKg(pack))}</span> / kg
                {saving > 0 && <span className="block text-wa font-semibold">Hemat {saving}% per kg</span>}
              </div>
            </div>

            <button
              type="button"
              onClick={() => openWhatsApp({ source: "epoxy-hero", product: `Lem Epoxy EFLOOR Non-Sag 1 set ${pack.label} (Resin + Hardener)` })}
              className="mt-5 w-full inline-flex items-center justify-center gap-2.5 h-[54px] px-6 rounded-full bg-brand-gradient text-white font-semibold text-[15px] shadow-cta hover:-translate-y-0.5 transition-transform cursor-pointer"
            >
              <WhatsAppDot />
              Pesan set {pack.label} via WhatsApp
            </button>
            <MarketplaceLinks
              source="epoxy-hero"
              className="grid grid-cols-2 gap-2.5 mt-2.5"
              linkClassName="inline-flex items-center justify-center h-[46px] rounded-full bg-white text-ink font-semibold text-[14px] shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
            />
          </div>

          <p className="flex items-start gap-2.5 mt-4 text-[13px] text-muted">
            <StoreIcon className="w-[18px] h-[18px] text-brand-flame shrink-0" />
            <span>
              Harga sudah termasuk Resin dan Hardener.{" "}
              <a href="#harga" className="font-semibold text-ink underline underline-offset-4 whitespace-nowrap">
                Bandingkan set
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
