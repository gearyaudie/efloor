"use client";

import { useMemo, useState } from "react";
import ProductCard, { type CardProduct } from "./ProductCard";

export type CatalogProduct = CardProduct & { category: string };

/** Catalog grid with category chips and a name search. */
export default function ProductCatalog({ products }: { products: CatalogProduct[] }) {
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    return [...counts.entries()];
  }, [products]);

  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const visible = products.filter(
    (p) => (!category || p.category === category) && (!q || `${p.name} ${p.desc}`.toLowerCase().includes(q)),
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div role="group" aria-label="Filter kategori" className="flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
          {[[null, products.length] as const, ...categories].map(([c, n]) => (
            <button
              key={c ?? "all"}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-medium cursor-pointer transition-colors ${
                category === c ? "bg-ink text-white" : "bg-white text-ink-soft shadow-e1 hover:text-ink"
              }`}
            >
              {c ?? "Semua"}
              <span className={`font-mono text-[12px] ${category === c ? "text-white/60" : "text-muted"}`}>{n}</span>
            </button>
          ))}
        </div>
        <label className="relative md:w-[280px]">
          <span className="sr-only">Cari produk</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk…"
            className="w-full h-11 rounded-full bg-white pl-5 pr-4 text-[14.5px] shadow-[inset_0_0_0_1.5px_var(--color-line)] focus:outline-none focus:shadow-[inset_0_0_0_2px_var(--color-brand-flame)]"
          />
        </label>
      </div>

      {visible.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mt-8">
          {visible.map((p) => (
            <li key={p._id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 p-8 rounded-[24px] bg-white shadow-e1 text-center text-muted">
          Tidak ada produk yang cocok. Coba kata lain, atau tanya tim kami via WhatsApp.
        </p>
      )}
    </div>
  );
}
