"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { openWhatsApp } from "../../lib/openWhatsApp";
import {
  AreaIcon,
  ArrowIcon,
  ClockIcon,
  LeafIcon,
  TruckIcon,
  WhatsAppDot,
} from "../icons";

const SIZES = [
  { label: "1 KG", img: "/img/lem-karpet-1kg.png" },
  { label: "4 KG", img: "/img/lem-karpet-4kg.png" },
  { label: "20 KG", img: "/img/lem_vinyl_efloor_20kg.png" },
];

const FLOATS = [
  { icon: AreaIcon, value: "±8–10 m²/kg", label: "Daya sebar luas", pos: "top-[8%] left-[5%]", delay: "0s" },
  { icon: LeafIcon, value: "Low VOC", label: "Waterbased", pos: "top-[27%] right-[4%]", delay: "-2s" },
  { icon: ClockIcon, value: "30–60 mnt", label: "Bening, siap tempel", pos: "bottom-[17%] left-[6%]", delay: "-4s" },
];

export default function Hero() {
  const [size, setSize] = useState(2);

  return (
    <section className="relative overflow-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[20%] left-[45%] -right-[10%] h-[780px] bg-[radial-gradient(closest-side,rgba(255,142,6,0.18),rgba(255,142,6,0))]"
      />
      <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 pt-10 pb-20 lg:pt-16 lg:pb-[88px] grid gap-10 lg:gap-14 lg:grid-cols-[1.05fr_0.95fr] items-center">
        <div>
          <span className="animate-rise inline-flex items-center gap-2.5 py-1.5 pl-1.5 pr-3.5 rounded-full bg-white shadow-e1 text-[13.5px] font-medium text-ink-soft">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-tint text-brand-flame font-semibold text-xs">
              Sejak 1990
            </span>
            Distributor &amp; Supplier Lem Vinyl
          </span>

          <h1 className="animate-rise [animation-delay:60ms] mt-5 lg:mt-6 text-[38px] md:text-[52px] lg:text-[62px] leading-[1.06] font-bold tracking-[-0.035em] text-balance">
            Lem Vinyl &amp; Karpet{" "}
            <span className="text-brand-gradient">Waterbased</span> Terpercaya
            #1 di Indonesia
          </h1>

          <p className="animate-rise [animation-delay:120ms] mt-5 lg:mt-6 text-base md:text-lg text-muted max-w-[52ch]">
            Ramah lingkungan, tidak berbau, dan hampir bebas VOC. Aman untuk
            kantor, rumah sakit, sekolah, dan kamar bayi, dengan daya sebar
            hemat ±8–10 m² per kg.
          </p>

          <div className="animate-rise [animation-delay:180ms] mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openWhatsApp({ source: "home-hero", product: "Lem Vinyl & Karpet EFLOOR" })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full bg-brand-gradient text-white font-semibold text-[15px] shadow-cta hover:-translate-y-0.5 transition-transform cursor-pointer"
            >
              <WhatsAppDot />
              Tanya Harga via WhatsApp
            </button>
            <Link
              href="/harga-lem-vinyl-karpet"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full bg-white text-ink font-semibold text-[15px] shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
            >
              Lihat Daftar Harga
              <ArrowIcon className="w-[18px] h-[18px]" />
            </Link>
          </div>

          <div className="animate-rise [animation-delay:240ms] mt-9 pt-7 border-t border-line flex flex-wrap items-center gap-x-5 gap-y-3 text-[13.5px]">
            <Trust mark={<b className="text-[13px]">S</b>} color="#EE4D2D" title="Shopee" note="Penjualan terbanyak" />
            <Trust mark={<b className="text-[13px]">T</b>} color="#03AC0E" title="Tokopedia" note="Penjualan terbanyak" />
            <Trust mark={<TruckIcon className="w-4 h-4" />} color="var(--color-brand-navy)" title="Procurement & tender" note="Pelayanan PO yang mudah" />
          </div>
        </div>

        <div className="relative w-full max-w-[560px] aspect-[1/1.02] justify-self-center lg:justify-self-end rounded-[36px] bg-surface overflow-hidden isolate">
          <div aria-hidden="true" className="absolute inset-0 -z-10 trowel-ridges" />
          <div className="absolute left-1/2 top-[48%] w-[72%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-e3">
            {SIZES.map((s, i) => (
              <Image
                key={s.img}
                src={s.img}
                alt={`Ember Lem Vinyl & Karpet EFLOOR ${s.label}`}
                width={700}
                height={700}
                priority={i === 2}
                sizes="(min-width: 1024px) 400px, 70vw"
                className={`absolute inset-[6%] w-[88%] h-[88%] object-contain transition-[opacity,scale] duration-300 ${
                  size === i ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              />
            ))}
          </div>

          {FLOATS.map(({ icon: Icon, value, label, pos, delay }) => (
            <div
              key={value}
              style={{ animationDelay: delay }}
              className={`absolute ${pos} animate-bob flex items-center gap-2.5 px-2.5 py-2 md:px-3.5 md:py-2.5 rounded-2xl bg-white/90 backdrop-blur-sm shadow-e2 leading-tight`}
            >
              <span className="grid place-items-center w-7 h-7 md:w-[34px] md:h-[34px] rounded-[11px] bg-orange-tint text-brand-flame shrink-0">
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
              </span>
              <span>
                <span className="block font-mono text-[13px] md:text-[15px] text-ink">{value}</span>
                <small className="text-[11.5px] text-muted">{label}</small>
              </span>
            </div>
          ))}

          <div
            role="group"
            aria-label="Pilih ukuran kemasan"
            className="absolute left-1/2 bottom-[5%] -translate-x-1/2 flex gap-1 p-1 rounded-full bg-white shadow-e2"
          >
            {SIZES.map((s, i) => (
              <button
                key={s.label}
                type="button"
                aria-pressed={size === i}
                onClick={() => setSize(i)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full font-mono text-[12.5px] whitespace-nowrap cursor-pointer transition-colors ${
                  size === i ? "bg-ink text-white" : "text-muted hover:text-ink"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust({
  mark,
  color,
  title,
  note,
}: {
  mark: React.ReactNode;
  color: string;
  title: string;
  note: string;
}) {
  return (
    <span className="inline-flex items-center gap-2.5 text-ink-soft font-medium">
      <span className="w-[30px] h-[30px] rounded-[9px] grid place-items-center text-white" style={{ background: color }}>
        {mark}
      </span>
      <span className="leading-tight">
        <span className="block font-semibold">{title}</span>
        <small className="block text-[11.5px] text-muted font-normal">{note}</small>
      </span>
    </span>
  );
}
