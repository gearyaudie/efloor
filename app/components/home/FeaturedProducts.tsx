"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { openWhatsApp } from "../../lib/openWhatsApp";
import { MAIN_PRODUCTS, type IMainProduct } from "../../static/mainProducts";
import { WhatsAppIcon } from "../icons";
import SectionHeading from "./SectionHeading";

export default function FeaturedProducts() {
  return (
    <section id="produk" className="scroll-mt-24 py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Produk unggulan"
          title="Pilihan utama kontraktor & instalator"
          action={{ href: "#products", label: "Lihat semua produk" }}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MAIN_PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} highlight={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, highlight }: { product: IMainProduct; highlight: boolean }) {
  const [selected, setSelected] = useState(product.defaultVariant);
  const variant = product.variants[selected];

  return (
    <article
      data-reveal
      className="group flex flex-col bg-white rounded-[28px] shadow-e1 hover:shadow-e3 hover:-translate-y-1 transition-[box-shadow,translate] duration-300 overflow-hidden"
    >
      <div className="relative aspect-[1/0.86] dot-grid grid place-items-center border-b border-line">
        <span
          className={`absolute top-4 left-4 z-[1] px-3 py-1 rounded-full text-xs font-semibold text-white ${
            highlight ? "bg-brand-gradient" : "bg-ink"
          }`}
        >
          {product.badge}
        </span>
        <Image
          src={variant.img}
          alt={`${product.name} ${variant.size}`}
          width={700}
          height={700}
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 40vw, 80vw"
          className="w-[72%] h-[82%] object-contain mix-blend-multiply"
        />
      </div>

      <div className="flex flex-col gap-3 flex-1 px-6 pt-[22px] pb-6">
        <h3 className="text-xl font-semibold tracking-[-0.01em]">{product.name}</h3>
        <p className="text-[14.5px] text-muted leading-relaxed">{product.desc}</p>

        <div role="group" aria-label={`Ukuran ${product.name}`} className="flex flex-wrap gap-1.5">
          {product.variants.map((v, i) => (
            <button
              key={v.size}
              type="button"
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
              className={`px-3.5 py-1 rounded-full border-[1.5px] font-mono text-[12.5px] cursor-pointer transition-colors ${
                selected === i
                  ? "bg-ink border-ink text-white"
                  : "bg-white border-line text-ink-soft hover:border-ink-soft"
              }`}
            >
              {v.size}
            </button>
          ))}
        </div>

        <div className="flex gap-2.5 mt-auto pt-2">
          <Link
            href={product.link}
            className="flex-1 inline-flex items-center justify-center h-[42px] rounded-full bg-white text-ink text-sm font-semibold shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
          >
            Cek Harga
          </Link>
          <button
            type="button"
            aria-label={`Tanya ${product.name} via WhatsApp`}
            onClick={() =>
              openWhatsApp({ source: "home-featured", product: `${product.name} ${variant.size}` })
            }
            className="w-[42px] h-[42px] shrink-0 grid place-items-center rounded-full bg-[#E9F8EF] hover:bg-[#D5F2E1] text-wa cursor-pointer transition-colors"
          >
            <WhatsAppIcon />
          </button>
        </div>
      </div>
    </article>
  );
}
