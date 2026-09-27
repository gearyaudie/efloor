"use client";

import { useState } from "react";
import { openWhatsApp } from "../../lib/openWhatsApp";
import { fmtCm, rupiah } from "../../lib/format";
import type { TrimConfig } from "../../static/trims";
import { WhatsAppDot } from "../icons";
import type { TrimVariant } from "./types";

// Spare for mitred corners and offcuts.
const WASTE = 0.1;

/** Turns a run length in metres into sticks to buy, and the total price. */
export default function TrimCalculator({
  config,
  variants,
}: {
  config: TrimConfig;
  variants: TrimVariant[];
}) {
  const [meters, setMeters] = useState(config.calc.defaultMeters);
  const [variant, setVariant] = useState(0);

  const safe = Math.max(0.1, Math.min(10000, meters || 0.1));
  const stickM = config.lengthCm / 100;
  const sticks = Math.ceil((safe * (1 + WASTE)) / stickM);
  const current = variants[variant];
  const total = current ? sticks * current.price : undefined;

  const message = [
    `${config.whatsappProduct}${current && variants.length > 1 ? ` ${current.label}` : ""}`,
    `${sticks} batang untuk ±${fmtCm(safe)} m`,
  ].join(", ");

  return (
    <aside
      aria-labelledby={`${config.key}-calc-title`}
      className="bg-white rounded-[28px] p-5 md:p-8 shadow-e2"
    >
      <h3 id={`${config.key}-calc-title`} className="text-[22px] font-semibold tracking-[-0.01em]">
        Kalkulator kebutuhan batang
      </h3>
      <p className="text-sm text-muted mt-1.5">{config.calc.hint}</p>

      <label htmlFor={`${config.key}-calc-m`} className="block text-[13px] font-semibold text-ink-soft mt-6">
        {config.calc.label}
      </label>
      <div className="flex items-center gap-3.5 mt-2.5">
        <input
          type="range"
          min={1}
          max={100}
          step={0.5}
          value={Math.min(100, safe)}
          onChange={(e) => setMeters(Number(e.target.value))}
          aria-label={`${config.calc.label} (slider)`}
          className="flex-1 min-w-0 accent-brand-flame"
        />
        <div className="flex items-center rounded-[14px] bg-paper pr-3 shadow-[inset_0_0_0_1.5px_var(--color-line)] focus-within:shadow-[inset_0_0_0_2px_var(--color-brand-flame)]">
          <input
            id={`${config.key}-calc-m`}
            type="number"
            inputMode="decimal"
            min={0.1}
            step={0.5}
            value={meters}
            onChange={(e) => setMeters(Number(e.target.value))}
            className="w-[76px] h-11 bg-transparent pl-3.5 font-mono text-[16px] text-ink focus:outline-none"
          />
          <span className="text-[13px] text-muted">m</span>
        </div>
      </div>

      {variants.length > 1 && (
        <div className="flex flex-wrap gap-2 mt-5" role="group" aria-label="Varian untuk estimasi">
          {variants.map((v, i) => (
            <button
              key={v.label}
              type="button"
              aria-pressed={variant === i}
              onClick={() => setVariant(i)}
              className={`px-3.5 py-1.5 rounded-full font-mono text-[13px] cursor-pointer transition-colors ${
                variant === i ? "bg-ink text-white" : "bg-paper text-ink-soft shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:text-ink"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}

      <dl className="grid grid-cols-2 gap-3 mt-6">
        <div className="rounded-[20px] bg-orange-tint p-4">
          <dt className="text-[12.5px] text-ink-soft">Butuh</dt>
          <dd className="text-[30px] font-bold tracking-[-0.03em] leading-none mt-1.5 tabular-nums">
            {sticks} <span className="text-[15px] font-semibold text-muted">batang</span>
          </dd>
        </div>
        <div className="rounded-[20px] bg-paper p-4">
          <dt className="text-[12.5px] text-ink-soft">Estimasi total</dt>
          <dd className="text-[22px] font-bold tracking-[-0.02em] leading-none mt-2.5 tabular-nums">
            {total !== undefined ? rupiah(total) : "Tanya harga"}
          </dd>
        </div>
      </dl>
      <p className="text-[12.5px] text-muted mt-3">
        Sudah termasuk cadangan {WASTE * 100}% untuk potongan sudut dan sisa. 1 batang = {config.lengthCm} cm.
      </p>

      <button
        type="button"
        onClick={() => openWhatsApp({ source: `${config.key}-calculator`, product: message })}
        className="mt-6 w-full inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full bg-brand-gradient text-white font-semibold text-[15px] shadow-cta hover:-translate-y-0.5 transition-transform cursor-pointer"
      >
        <WhatsAppDot />
        Pesan {sticks} batang via WhatsApp
      </button>
    </aside>
  );
}
