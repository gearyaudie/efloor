"use client";

import Image from "next/image";
import { useState } from "react";
import { openWhatsApp } from "../../lib/openWhatsApp";
import { WhatsAppDot } from "../icons";

// Coverage from the product data sheet: 1 kg spreads over 8–10 m².
const M2_PER_KG_MIN = 8;
const M2_PER_KG_MAX = 10;

const PACKS = [
  { kg: 20, label: "20 KG", img: "/img/lem-karpet-20kg.png" },
  { kg: 4, label: "4 KG", img: "/img/lem-karpet-4kg.png" },
  { kg: 1, label: "1 KG", img: "/img/lem-karpet-1kg.png" },
];

/**
 * Suggests a pack mix covering `kg`, favouring bigger (cheaper per kg) packs
 * once the remainder is close to filling one.
 */
export function suggestPacks(kg: number) {
  let need = Math.ceil(kg);
  let n20 = Math.floor(need / 20);
  need -= n20 * 20;
  if (need > 16) {
    n20 += 1;
    need = 0;
  }
  let n4 = Math.floor(need / 4);
  need -= n4 * 4;
  if (need >= 3) {
    n4 += 1;
    need = 0;
  }
  const counts = [n20, n4, need];
  return PACKS.map((p, i) => ({ ...p, count: counts[i] })).filter((p) => p.count > 0);
}

const fmt = (n: number) => n.toLocaleString("id-ID", { maximumFractionDigits: 1 });

export default function GlueCalculator() {
  const [area, setArea] = useState(120);
  const safeArea = Math.max(1, Math.min(100000, area || 1));
  const kgMin = safeArea / M2_PER_KG_MAX;
  const kgMax = safeArea / M2_PER_KG_MIN;
  const packs = suggestPacks(kgMax);

  return (
    <aside
      aria-labelledby="calc-title"
      data-reveal
      className="lg:sticky lg:top-28 bg-paper rounded-[28px] p-5 md:p-8 shadow-[inset_0_0_0_1px_var(--color-line)]"
    >
      <h3 id="calc-title" className="text-[22px] font-semibold tracking-[-0.01em]">
        Kalkulator kebutuhan lem
      </h3>
      <p className="text-sm text-muted mt-1.5">Masukkan luas area untuk estimasi jumlah lem.</p>

      <label htmlFor="calc-area" className="block text-[13px] font-semibold text-ink-soft mt-6">
        Luas area
      </label>
      <div className="flex items-center gap-3.5 mt-2.5">
        <input
          type="range"
          min={5}
          max={1000}
          step={5}
          value={Math.min(1000, safeArea)}
          onChange={(e) => setArea(Number(e.target.value))}
          aria-label="Luas area (slider)"
          className="flex-1 min-w-0 accent-brand-flame"
        />
        <div className="flex items-center rounded-[14px] bg-white pr-3 shadow-[inset_0_0_0_1.5px_var(--color-line)] focus-within:shadow-[inset_0_0_0_2px_var(--color-brand-flame)]">
          <input
            id="calc-area"
            type="number"
            inputMode="numeric"
            min={1}
            max={100000}
            value={area || ""}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-[84px] bg-transparent border-0 outline-none font-mono text-[17px] py-2.5 pl-3.5 pr-2 text-ink"
          />
          <span className="text-[13px] text-muted">m²</span>
        </div>
      </div>

      <div aria-live="polite" className="mt-6 p-5 md:p-[22px] rounded-[20px] bg-white shadow-e1">
        <div className="text-[12.5px] text-muted uppercase tracking-[0.08em] font-semibold">
          Estimasi kebutuhan
        </div>
        <div className="font-mono text-[28px] md:text-[32px] leading-[1.15] mt-1.5 tracking-[-0.02em]">
          {fmt(kgMin)}–{fmt(kgMax)}
          <small className="font-sans text-[15px] text-muted ml-1">kg</small>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {packs.map((p) => (
            <span
              key={p.label}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-tint text-sm font-semibold"
            >
              <Image src={p.img} alt="" width={26} height={26} className="w-[26px] h-[26px] object-contain mix-blend-multiply" />
              {p.count} × {p.label}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          openWhatsApp({
            source: "home-calculator",
            product: `Lem Vinyl & Karpet untuk ${safeArea.toLocaleString("id-ID")} m² (±${fmt(kgMax)} kg)`,
          })
        }
        className="w-full mt-[18px] inline-flex items-center justify-center gap-2.5 min-h-[52px] px-6 py-2 rounded-full bg-brand-gradient text-white font-semibold text-[15px] shadow-cta hover:-translate-y-0.5 transition-transform cursor-pointer"
      >
        <WhatsAppDot />
        Minta penawaran untuk {safeArea.toLocaleString("id-ID")} m²
      </button>
      <p className="text-xs text-muted mt-3 text-center">
        Estimasi ±8–10 m²/kg, tergantung permukaan &amp; teknik aplikasi.
      </p>
    </aside>
  );
}
