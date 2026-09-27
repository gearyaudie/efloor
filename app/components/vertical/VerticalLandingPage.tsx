import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { rupiah } from "../../lib/format";
import { priceProduct, pricePerKg } from "../../static/priceList";
import { VERTICALS, type VerticalKey } from "../../static/verticalContent";
import Breadcrumbs from "../Breadcrumbs";
import RelatedVerticals from "../RelatedVerticals";
import WhatsAppButton from "../WhatsAppButton";
import ClosingCta from "../home/ClosingCta";
import GlueCalculator from "../home/GlueCalculator";
import HowToUse from "../home/HowToUse";
import RevealOnScroll from "../home/RevealOnScroll";
import StatsStrip from "../home/StatsStrip";
import { Eyebrow, h2Class } from "../home/SectionHeading";
import {
  AreaIcon,
  ArrowIcon,
  ArrowUpRightIcon,
  ClockIcon,
  DocIcon,
  LeafIcon,
  ShieldIcon,
  TruckIcon,
  WhatsAppDot,
  WhatsAppIcon,
  WindIcon,
} from "../icons";

// The four reasons every EFLOOR vinyl/karpet page has always listed.
const CORE_BENEFITS = [
  { icon: LeafIcon, title: "Eco friendly", text: "Waterbased tanpa basis solvent, rekat kuat dan tetap ramah lingkungan." },
  { icon: ShieldIcon, title: "Hampir tanpa VOC", text: "Sangat rendah uap yang bisa mengganggu pernapasan dan mengiritasi mata." },
  { icon: WindIcon, title: "Tidak berbau", text: "Jauh lebih tidak bau dibanding lem kuning, nyaman untuk pemakaian indoor." },
  { icon: AreaIcon, title: "Lebih hemat", text: "±8–10 m² per kg. Penjualan lem vinyl terbanyak di Shopee & Tokopedia." },
];

const FLOATS = [
  { icon: AreaIcon, value: "±8–10 m²/kg", label: "Daya sebar luas", pos: "top-[7%] -left-2 md:-left-6", delay: "0s" },
  { icon: LeafIcon, value: "Low VOC", label: "Waterbased", pos: "top-[40%] -right-2 md:-right-6", delay: "-2s" },
  { icon: ClockIcon, value: "30–60 mnt", label: "Bening, siap tempel", pos: "bottom-[8%] left-[6%]", delay: "-4s" },
];

function Hero({ v }: { v: (typeof VERTICALS)[VerticalKey] }) {
  return (
    <section className="relative overflow-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[20%] left-[40%] -right-[10%] h-[760px] bg-[radial-gradient(closest-side,rgba(255,142,6,0.16),rgba(255,142,6,0))]"
      />
      <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 pt-8 pb-20 lg:pt-12 lg:pb-[88px] grid gap-12 lg:gap-14 lg:grid-cols-[1.05fr_0.95fr] items-center">
        <div>
          <span className="inline-flex items-center gap-2.5 py-1.5 pl-1.5 pr-3.5 rounded-full bg-white shadow-e1 text-[13.5px] font-medium text-ink-soft">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-tint text-brand-flame font-semibold text-xs">{v.chip}</span>
            Lem waterbased EFLOOR
          </span>
          <h1 className="mt-5 text-[30px] md:text-[42px] lg:text-[48px] leading-[1.08] font-bold tracking-[-0.03em] text-balance">
            {v.h1}
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted max-w-[54ch]">{v.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton
              source="landing-hero"
              product={v.whatsappProduct}
              variant="plain"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full bg-brand-gradient text-white font-semibold text-[15px] shadow-cta hover:-translate-y-0.5 transition-transform"
            >
              <WhatsAppDot />
              {v.city ? `Kirim ke ${v.city}` : "Tanya harga via WhatsApp"}
            </WhatsAppButton>
            <Link
              href="#produk"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full bg-white text-ink font-semibold text-[15px] shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
            >
              Lihat produk &amp; harga
              <ArrowIcon className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </div>

        <div className="relative w-full max-w-[560px] justify-self-center lg:justify-self-end">
          <div className="relative aspect-[4/3.4] rounded-[32px] md:rounded-[36px] overflow-hidden bg-surface shadow-e2">
            <Image
              src={v.img.src}
              alt={v.img.alt}
              fill
              priority
              sizes="(min-width: 1024px) 560px, 92vw"
              className="object-cover"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(18,34,71,0.35))]" />
          </div>
          {FLOATS.map(({ icon: Icon, value, label, pos, delay }) => (
            <div
              key={value}
              style={{ animationDelay: delay }}
              className={`absolute ${pos} animate-bob flex items-center gap-2.5 px-2.5 py-2 md:px-3.5 md:py-2.5 rounded-2xl bg-white/95 backdrop-blur-sm shadow-e2 leading-tight`}
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
        </div>
      </div>
    </section>
  );
}

function Why({ v }: { v: (typeof VERTICALS)[VerticalKey] }) {
  return (
    <section className="py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid gap-12 lg:gap-16 lg:grid-cols-[1fr_1fr] items-start">
        <div>
          <div data-reveal>
            <Eyebrow>Kenapa EFLOOR</Eyebrow>
            <h2 className={h2Class}>Kenapa cocok untuk {v.context}</h2>
          </div>
          <ol className="mt-8 grid gap-4">
            {v.highlights.map((h, i) => (
              <li key={h.title} data-reveal className="flex gap-5 p-6 rounded-[28px] bg-white shadow-e1">
                <span className="font-mono text-[28px] font-semibold leading-none text-brand-gradient shrink-0">0{i + 1}</span>
                <div>
                  <h3 className="text-[18px] font-semibold tracking-[-0.01em]">{h.title}</h3>
                  <p className="text-[14.5px] text-muted mt-1.5 leading-relaxed">{h.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div data-reveal className="rounded-[28px] md:rounded-[36px] bg-ink text-white p-7 md:p-10 relative overflow-hidden isolate">
          <span
            aria-hidden="true"
            className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full -z-10 bg-[radial-gradient(closest-side,rgba(255,142,6,0.3),transparent)]"
          />
          <span className="font-mono text-[12.5px] text-[#FFB25C]">Di setiap kemasan</span>
          <h3 className="mt-3 text-[24px] md:text-[28px] font-semibold leading-[1.15] tracking-[-0.02em]">
            Lem waterbased yang aman untuk ruangan
          </h3>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-7 mt-8">
            {CORE_BENEFITS.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="w-11 h-11 rounded-2xl grid place-items-center bg-white/8 text-[#FFB25C] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]">
                  <Icon className="w-[22px] h-[22px]" />
                </span>
                <h4 className="text-[16px] font-semibold mt-3.5">{title}</h4>
                <p className="text-[14px] text-white/65 mt-1 leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Products({ v }: { v: (typeof VERTICALS)[VerticalKey] }) {
  return (
    <section id="produk" className="scroll-mt-24 bg-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <Eyebrow>Rekomendasi produk</Eyebrow>
            <h2 className={h2Class}>Lem yang kami sarankan untuk {v.context}</h2>
          </div>
          <Link href="/harga-lem-vinyl-karpet" className="group inline-flex items-center gap-2 py-2.5 font-semibold text-[15px] text-ink border-b-[1.5px] border-ink">
            Daftar harga lengkap
            <ArrowIcon className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1.2fr_0.8fr] mt-10 md:mt-12 items-start">
          <div className="grid gap-5">
            {v.products.map((id, i) => {
              const p = priceProduct(id);
              const top = i === 0;
              const img = p.sizes.at(-1)?.img;
              return (
                <article
                  key={id}
                  data-reveal
                  className={`rounded-[28px] p-5 md:p-7 ${top ? "bg-ink text-white shadow-e3" : "bg-paper shadow-[inset_0_0_0_1px_var(--color-line)]"}`}
                >
                  <div className="flex items-start gap-5">
                    {img && (
                      <span className={`w-[88px] h-[88px] rounded-[22px] shrink-0 grid place-items-center ${top ? "bg-white/8" : "bg-white"}`}>
                        <Image src={img} alt={p.name} width={120} height={120} sizes="88px" className="w-[74px] h-[74px] object-contain" />
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      {top && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-gradient text-white text-[11.5px] font-semibold mb-2">
                          Rekomendasi utama
                        </span>
                      )}
                      <h3 className="text-[20px] font-semibold tracking-[-0.01em]">{p.name}</h3>
                      <p className={`text-[14px] mt-1 leading-relaxed ${top ? "text-white/70" : "text-muted"}`}>
                        {top ? v.recommendWhy : p.note}
                      </p>
                    </div>
                  </div>
                  <ul className="grid grid-cols-3 gap-2.5 mt-5">
                    {p.sizes.map((s) => (
                      <li key={s.label} className={`rounded-[16px] px-3 py-2.5 ${top ? "bg-white/8" : "bg-white shadow-e1"}`}>
                        <span className={`block font-mono text-[12.5px] ${top ? "text-white/60" : "text-muted"}`}>{s.label}</span>
                        <span className="block text-[16px] md:text-[18px] font-bold tabular-nums mt-0.5">{rupiah(s.price)}</span>
                        <span className={`block font-mono text-[11px] ${top ? "text-white/50" : "text-muted"}`}>{rupiah(pricePerKg(s))}/kg</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-5">
                    <WhatsAppButton
                      source="landing-products"
                      product={`${p.name} untuk ${v.context}`}
                      variant="plain"
                      className={`inline-flex items-center gap-2 h-[44px] px-5 rounded-full font-semibold text-[14px] ${
                        top ? "bg-brand-gradient text-white shadow-cta" : "bg-white text-ink shadow-[inset_0_0_0_1.5px_var(--color-line)]"
                      }`}
                    >
                      {top ? <WhatsAppDot /> : <WhatsAppIcon className="w-[18px] h-[18px] text-wa" />}
                      Pesan
                    </WhatsAppButton>
                    {p.href && (
                      <Link
                        href={p.href}
                        className={`group inline-flex items-center gap-1.5 h-[44px] px-4 rounded-full font-semibold text-[14px] ${top ? "hover:bg-white/10" : "hover:bg-white"} transition-colors`}
                      >
                        Detail produk
                        <ArrowUpRightIcon className="w-4 h-4 opacity-60" />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
            <p className="text-[12.5px] text-muted">Harga toko (offline), dapat berubah sewaktu-waktu. Proyek &amp; grosir: minta harga khusus.</p>
          </div>
          <div data-reveal className="lg:sticky lg:top-28">
            <GlueCalculator source="landing-calculator" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectBand({ v }: { v: (typeof VERTICALS)[VerticalKey] }) {
  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-8 pb-[72px] lg:pb-[104px]">
      <div
        data-reveal
        className="relative overflow-hidden isolate rounded-[28px] md:rounded-[36px] bg-brand-navy text-white p-7 md:p-12 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-center"
      >
        <span
          aria-hidden="true"
          className="absolute -right-32 -top-40 w-[520px] h-[520px] rounded-full -z-10 bg-[radial-gradient(closest-side,rgba(255,142,6,0.25),transparent)]"
        />
        <div>
          <Eyebrow dark>{v.city ? `Pengiriman ke ${v.city}` : "Proyek & procurement"}</Eyebrow>
          <h2 className="mt-3.5 text-[26px] md:text-[34px] leading-[1.15] font-semibold tracking-[-0.02em] text-balance">
            {v.city
              ? `Kirim volume besar ke ${v.city}, lengkap dengan dokumen`
              : `Mengerjakan proyek ${v.context} skala besar?`}
          </h2>
          <p className="mt-3.5 text-white/70 text-base md:text-[17px] max-w-[52ch]">
            Harga khusus untuk kontraktor, procurement, dan tender, dengan TDS &amp; MSDS siap diunduh.
          </p>
        </div>
        <div className="grid gap-3">
          <Link
            href="/projects#quotation"
            className="inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full bg-white text-ink font-semibold text-[15px] hover:-translate-y-0.5 transition-transform"
          >
            <TruckIcon className="w-5 h-5 text-brand-flame" />
            Minta quotation proyek
          </Link>
          <a
            href="/docs/tds.pdf"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full text-white font-semibold text-[15px] shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.5)] hover:bg-white/10 transition-colors"
          >
            <DocIcon className="w-5 h-5" />
            Unduh TDS
          </a>
        </div>
      </div>
    </section>
  );
}

/** Use-case / city landing page. Copy lives in static/verticalContent.ts. */
export default function VerticalLandingPage({ vertical, faq }: { vertical: VerticalKey; faq: ReactNode }) {
  const v = VERTICALS[vertical];
  return (
    <div className="bg-paper">
      <RevealOnScroll />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: v.breadcrumb }]} />
      <Hero v={v} />
      <StatsStrip />
      <Why v={v} />
      <Products v={v} />
      <HowToUse />
      <ProjectBand v={v} />
      {faq}
      <ClosingCta title={v.closing.title} lede={v.closing.lede} source="landing-closing" product={v.whatsappProduct} />
      <RelatedVerticals currentHref={v.href} />
    </div>
  );
}
