"use client";

import Image from "next/image";
import { useState } from "react";
import { openWhatsApp } from "../../lib/openWhatsApp";
import { fmtCm, rupiah } from "../../lib/format";
import type { TrimConfig } from "../../static/trims";
import { MarketplaceLinks } from "../OutboundLinks";
import { CheckIcon, RulerIcon, StoreIcon, WhatsAppDot } from "../icons";
import type { TrimVariant } from "./types";

const sameLabel = (a?: string, b?: string) =>
  !!a && !!b && a.trim().toUpperCase() === b.trim().toUpperCase();

/**
 * Product-page hero for a PVC trim: a gallery on the left, and a buy box whose
 * variant picker (prices from Sanity) swaps the matching photo and the
 * WhatsApp message.
 */
export default function TrimHero({
  config,
  variants,
}: {
  config: TrimConfig;
  variants: TrimVariant[];
}) {
  const gallery = config.gallery;
  const [photo, setPhoto] = useState(0);
  const [variant, setVariant] = useState(() => {
    // Start on the variant pictured first, else the first one.
    const i = variants.findIndex((v) => sameLabel(v.label, gallery[0]?.variant));
    return i === -1 ? 0 : i;
  });

  const current = variants[variant];
  const pickVariant = (i: number) => {
    setVariant(i);
    const img = gallery.findIndex((g) => sameLabel(g.variant, variants[i].label));
    if (img !== -1) setPhoto(img);
  };
  const pickPhoto = (i: number) => {
    setPhoto(i);
    const v = variants.findIndex((x) => sameLabel(x.label, gallery[i].variant));
    if (v !== -1) setVariant(v);
  };

  const product = current ? `${config.whatsappProduct} ${current.label}` : config.whatsappProduct;
  const profile = config.profiles?.find((p) => sameLabel(p.variant, current?.label));

  return (
    <section className="relative overflow-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[25%] -left-[15%] w-[70%] h-[760px] bg-[radial-gradient(closest-side,rgba(255,142,6,0.14),rgba(255,142,6,0))]"
      />
      <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 pt-6 pb-16 lg:pt-10 lg:pb-24 grid gap-10 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr] items-start">
        {/* Gallery */}
        <div className="lg:sticky lg:top-28">
          <div className="relative aspect-square rounded-[32px] md:rounded-[40px] overflow-hidden isolate bg-surface">
            <div aria-hidden="true" className="absolute inset-0 -z-10 dot-grid opacity-70" />
            {gallery.map((g, i) => (
              <Image
                key={g.src}
                src={g.src}
                alt={g.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 560px, 92vw"
                className={`transition-[opacity,scale] duration-500 ${
                  g.kind === "packshot"
                    ? "object-contain p-[10%] drop-shadow-[0_24px_30px_rgba(60,35,10,0.25)]"
                    : "object-cover"
                } ${photo === i ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"}`}
              />
            ))}
            <span className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-e1 text-[12.5px] font-semibold text-ink-soft">
              <RulerIcon className="w-4 h-4 text-brand-flame" />
              {config.lengthCm} cm / batang
            </span>
          </div>

          {gallery.length > 1 && (
            <div
              className={`grid gap-3 mt-3 ${gallery.length >= 4 ? "grid-cols-4" : "grid-cols-3"}`}
              role="group"
              aria-label="Foto produk"
            >
              {gallery.map((g, i) => (
                <button
                  key={g.src}
                  type="button"
                  onClick={() => pickPhoto(i)}
                  aria-label={`Lihat foto ${g.label}`}
                  aria-pressed={photo === i}
                  className={`relative aspect-[4/3] rounded-[18px] overflow-hidden bg-white cursor-pointer transition-shadow ${
                    photo === i
                      ? "shadow-[inset_0_0_0_2px_var(--color-brand-flame)]"
                      : "shadow-e1 hover:shadow-e2"
                  }`}
                >
                  <Image
                    src={g.src}
                    alt=""
                    fill
                    sizes="160px"
                    className={g.kind === "packshot" ? "object-contain p-[12%]" : "object-cover"}
                  />
                  <span className="absolute bottom-1.5 right-2 px-1.5 rounded-md bg-white/90 font-mono text-[11px] text-muted">
                    {g.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Buy box */}
        <div>
          <span className="inline-flex items-center gap-2.5 py-1.5 pl-1.5 pr-3.5 rounded-full bg-white shadow-e1 text-[13.5px] font-medium text-ink-soft">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-tint text-brand-flame font-semibold text-xs">
              {config.kicker}
            </span>
            {config.tags}
          </span>

          <h1 className="mt-5 text-[34px] md:text-[46px] lg:text-[52px] leading-[1.06] font-bold tracking-[-0.035em] text-balance">
            {config.h1[0]} <span className="text-brand-gradient">{config.h1[1]}</span>{" "}
            <span className="sr-only">EFLOOR</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted max-w-[50ch]">{config.intro}</p>

          <ul className="mt-6 space-y-2.5">
            {config.ticks.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[15px] text-ink-soft">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-tint text-brand-flame grid place-items-center shrink-0">
                  <CheckIcon className="w-3.5 h-3.5" />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 p-5 md:p-6 rounded-[28px] bg-white shadow-e2">
            {variants.length > 1 && (
              <fieldset className="mb-6">
                <legend className="text-[13px] font-semibold text-ink-soft">Pilih varian</legend>
                <div
                  className={`grid gap-2.5 mt-3 ${
                    variants.length === 2 ? "grid-cols-2" : variants.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"
                  }`}
                >
                  {variants.map((v, i) => (
                    <label
                      key={v.label}
                      className={`cursor-pointer rounded-[18px] px-3 py-3 text-center transition-shadow ${
                        variant === i
                          ? "bg-orange-tint shadow-[inset_0_0_0_2px_var(--color-brand-flame)]"
                          : "bg-paper shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`${config.key}-variant`}
                        className="sr-only"
                        checked={variant === i}
                        onChange={() => pickVariant(i)}
                      />
                      <span className="block font-mono text-[14px] font-semibold text-ink">{v.label}</span>
                      <span className="block text-[12px] text-muted mt-0.5">{rupiah(v.price)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
              {current ? (
                <div>
                  <span className="text-[12.5px] text-muted">
                    Harga per batang{variants.length > 1 ? ` · ${current.label}` : ""}
                  </span>
                  <div className="text-[32px] md:text-[36px] font-bold tracking-[-0.03em] leading-none mt-1 tabular-nums">
                    {rupiah(current.price)}
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-[12.5px] text-muted">Harga</span>
                  <div className="text-[22px] font-semibold mt-1">Tanya via WhatsApp</div>
                </div>
              )}
              <div className="text-right text-[13px] text-muted leading-snug">
                {profile && (
                  <span className="block">
                    Profil <span className="font-mono text-ink">{fmtCm(profile.widthCm)} × {fmtCm(profile.heightCm)} cm</span>
                  </span>
                )}
                <span className="block">
                  Panjang <span className="font-mono text-ink">{config.lengthCm} cm</span>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openWhatsApp({ source: `${config.key}-hero`, product })}
              className="mt-5 w-full inline-flex items-center justify-center gap-2.5 h-[54px] px-6 rounded-full bg-brand-gradient text-white font-semibold text-[15px] shadow-cta hover:-translate-y-0.5 transition-transform cursor-pointer"
            >
              <WhatsAppDot />
              {current ? `Pesan ${variants.length > 1 ? current.label : "sekarang"} via WhatsApp` : "Tanya harga via WhatsApp"}
            </button>
            <MarketplaceLinks
              source={`${config.key}-hero`}
              className="grid grid-cols-2 gap-2.5 mt-2.5"
              linkClassName="inline-flex items-center justify-center h-[46px] rounded-full bg-white text-ink font-semibold text-[14px] shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
            />
          </div>

          <p className="flex items-start gap-2.5 mt-4 text-[13px] text-muted">
            <StoreIcon className="w-[18px] h-[18px] text-brand-flame shrink-0" />
            <span>
              Tersedia di toko Kelapa Gading, Jakarta Utara. Butuh banyak batang?{" "}
              <a href="#harga" className="font-semibold text-ink underline underline-offset-4 whitespace-nowrap">
                Hitung kebutuhan
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
