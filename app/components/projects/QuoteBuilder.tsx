"use client";

import { useState, type FormEvent } from "react";
import { openWhatsApp } from "../../lib/openWhatsApp";
import { WhatsAppDot } from "../icons";

const PRODUCTS = [
  "Lem MAX EFLOOR",
  "Lem Vinyl / Karpet EFLOOR",
  "Lem Vinyl / Karpet ECO",
  "Lem HPL EFLOOR",
  "Lem Kayu Tahan Air",
  "Lem PU",
  "List siku / skirting / aksesoris",
];

const PACKS = ["20 KG", "4 KG", "1 KG", "Campuran"];

const field =
  "w-full h-12 rounded-[14px] bg-white px-4 text-[15px] text-ink shadow-[inset_0_0_0_1.5px_var(--color-line)] focus:outline-none focus:shadow-[inset_0_0_0_2px_var(--color-brand-flame)]";
const labelClass = "block text-[13px] font-semibold text-ink-soft mb-2";

/**
 * A short RFQ form. Nothing is submitted to a server — it composes the first
 * WhatsApp message, so sales gets the brief in one go instead of over several
 * back-and-forth chats.
 */
export default function QuoteBuilder() {
  const [product, setProduct] = useState(PRODUCTS[0]);
  const [pack, setPack] = useState(PACKS[0]);
  const [qty, setQty] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [needDocs, setNeedDocs] = useState(true);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parts = [
      `penawaran proyek ${product}`,
      pack !== "Campuran" ? `kemasan ${pack}` : "kemasan campuran",
      qty ? `jumlah ${qty} pcs` : "",
      location ? `dikirim ke ${location}` : "",
      company ? `untuk ${company}` : "",
      needDocs ? "mohon disertakan TDS & MSDS" : "",
    ].filter(Boolean);
    openWhatsApp({ source: "projects-quote-builder", product: parts.join(", ") });
  };

  return (
    <form
      id="quotation"
      onSubmit={onSubmit}
      className="scroll-mt-28 rounded-[28px] bg-paper p-5 md:p-8 shadow-[inset_0_0_0_1px_var(--color-line)]"
    >
      <h3 className="text-[22px] font-semibold tracking-[-0.01em]">Minta quotation dalam 1 menit</h3>
      <p className="text-sm text-muted mt-1.5">
        Isi ringkas, lalu kirim lewat WhatsApp. Tim kami membalas di jam kerja.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 mt-6">
        <div className="sm:col-span-2">
          <label htmlFor="q-product" className={labelClass}>Produk</label>
          <select id="q-product" value={product} onChange={(e) => setProduct(e.target.value)} className={`${field} cursor-pointer`}>
            {PRODUCTS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={labelClass}>Kemasan</legend>
          <div className="flex flex-wrap gap-2">
            {PACKS.map((p) => (
              <label
                key={p}
                className={`cursor-pointer px-4 py-2 rounded-full text-[14px] font-mono transition-colors ${
                  pack === p ? "bg-ink text-white" : "bg-white text-ink-soft shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:text-ink"
                }`}
              >
                <input type="radio" name="q-pack" value={p} checked={pack === p} onChange={() => setPack(p)} className="sr-only" />
                {p}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="q-qty" className={labelClass}>Jumlah (pcs)</label>
          <input id="q-qty" type="number" inputMode="numeric" min={1} placeholder="mis. 50" value={qty} onChange={(e) => setQty(e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor="q-location" className={labelClass}>Lokasi pengiriman</label>
          <input id="q-location" type="text" placeholder="mis. Bekasi" value={location} onChange={(e) => setLocation(e.target.value)} className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="q-company" className={labelClass}>
            Perusahaan / proyek <span className="font-normal text-muted">(opsional)</span>
          </label>
          <input id="q-company" type="text" placeholder="mis. PT Contoh Konstruksi" value={company} onChange={(e) => setCompany(e.target.value)} className={field} />
        </div>
      </div>

      <label className="flex items-center gap-3 mt-5 text-[14px] text-ink-soft cursor-pointer">
        <input type="checkbox" checked={needDocs} onChange={(e) => setNeedDocs(e.target.checked)} className="w-[18px] h-[18px] accent-brand-flame" />
        Sertakan TDS &amp; MSDS untuk berkas tender
      </label>

      <button
        type="submit"
        className="mt-6 w-full inline-flex items-center justify-center gap-2.5 h-[54px] px-6 rounded-full bg-brand-gradient text-white font-semibold text-[15px] shadow-cta hover:-translate-y-0.5 transition-transform cursor-pointer"
      >
        <WhatsAppDot />
        Kirim permintaan via WhatsApp
      </button>
    </form>
  );
}
