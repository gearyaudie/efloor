"use client";

import { useState } from "react";
import { openWhatsApp } from "../../lib/openWhatsApp";
import { rupiah } from "../../lib/format";
import { MarketplaceLinks } from "../OutboundLinks";
import { StoreIcon, WhatsAppDot } from "../icons";

type Variant = { label: string; price: number };

/** Variant picker, price and order buttons for a Sanity product. */
export default function ProductBuyBox({ name, variants }: { name: string; variants: Variant[] }) {
  const [i, setI] = useState(0);
  const current = variants[i];
  const product = current && variants.length > 1 ? `${name} (${current.label})` : name;

  return (
    <div className="p-5 md:p-6 rounded-[28px] bg-white shadow-e2">
      {variants.length > 1 && (
        <fieldset className="mb-6">
          <legend className="text-[13px] font-semibold text-ink-soft">Pilih varian</legend>
          <div className="flex flex-wrap gap-2.5 mt-3">
            {variants.map((v, n) => (
              <label
                key={v.label}
                className={`cursor-pointer min-w-[96px] rounded-[18px] px-4 py-2.5 text-center transition-shadow ${
                  n === i
                    ? "bg-orange-tint shadow-[inset_0_0_0_2px_var(--color-brand-flame)]"
                    : "bg-paper shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
                }`}
              >
                <input type="radio" name="variant" className="sr-only" checked={n === i} onChange={() => setI(n)} />
                <span className="block font-mono text-[14px] font-semibold">{v.label}</span>
                <span className="block text-[12px] text-muted mt-0.5">{rupiah(v.price)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <span className="text-[12.5px] text-muted">
        {current ? `Harga${variants.length > 1 ? ` · ${current.label}` : ""}` : "Harga"}
      </span>
      <div className="text-[32px] md:text-[38px] font-bold tracking-[-0.03em] leading-none mt-1 tabular-nums">
        {current ? rupiah(current.price) : <span className="text-[24px] text-brand-flame">Tanya via WhatsApp</span>}
      </div>

      <button
        type="button"
        onClick={() => openWhatsApp({ source: "product-page", product })}
        className="mt-6 w-full inline-flex items-center justify-center gap-2.5 h-[54px] px-6 rounded-full bg-brand-gradient text-white font-semibold text-[15px] shadow-cta hover:-translate-y-0.5 transition-transform cursor-pointer"
      >
        <WhatsAppDot />
        {current ? `Pesan${variants.length > 1 ? ` ${current.label}` : ""} via WhatsApp` : "Tanya harga via WhatsApp"}
      </button>
      <MarketplaceLinks
        source="product-page"
        className="grid grid-cols-2 gap-2.5 mt-2.5"
        linkClassName="inline-flex items-center justify-center h-[46px] rounded-full bg-white text-ink font-semibold text-[14px] shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
      />
      <p className="flex items-start gap-2.5 mt-4 text-[13px] text-muted">
        <StoreIcon className="w-[18px] h-[18px] text-brand-flame shrink-0" />
        Ambil di toko Kelapa Gading, Jakarta Utara, atau kirim ke seluruh Indonesia.
      </p>
    </div>
  );
}
