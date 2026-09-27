import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import RevealOnScroll from "../components/home/RevealOnScroll";
import StatsStrip from "../components/home/StatsStrip";
import CategoryBento from "../components/home/CategoryBento";
import ClosingCta from "../components/home/ClosingCta";
import { Eyebrow, h2Class } from "../components/home/SectionHeading";
import { ArrowIcon, DocIcon, StoreIcon, TruckIcon } from "../components/icons";
import { SITE_URL } from "../seo.config";

// The company story as the old page told it; no dates beyond 1990 are known.
const CHAPTERS = [
  {
    when: "1990",
    title: "Awal perjalanan",
    text: "Kami mulai memasok produk lantai berkualitas dari toko fisik di Mall Artha Gading, lantai 5 dekat Informa. Dari sinilah kepercayaan ribuan pelanggan dibangun.",
  },
  {
    when: "Lalu",
    title: "Memilih harga terbaik",
    text: "Untuk menjaga harga tetap terjangkau, kami memutuskan tidak membuka toko fisik tambahan. Biaya operasional yang lebih rendah kami kembalikan ke pelanggan dalam bentuk harga.",
  },
  {
    when: "Saat ini",
    title: "Online, WhatsApp & proyek",
    text: "Produk kami tersedia lewat WhatsApp, Shopee, dan Tokopedia — dengan penjualan lem vinyl terbanyak di marketplace — serta melayani kontraktor, procurement, dan tender.",
  },
];

const SERVE = [
  { icon: StoreIcon, title: "Retail & rumah tangga", text: "Kemasan 1 KG sampai 20 KG, bisa ambil di toko atau kirim." },
  { icon: TruckIcon, title: "Kontraktor & instalator", text: "Stok untuk pekerjaan harian dengan harga yang bersaing." },
  { icon: DocIcon, title: "Procurement & tender", text: "Quotation, TDS & MSDS, dan pengiriman ke lokasi proyek." },
];

export default function AboutUs() {
  return (
    <div className="bg-paper">
      <RevealOnScroll />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tentang Kami" }]} />

      <section className="relative overflow-clip">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[25%] left-[35%] -right-[10%] h-[720px] bg-[radial-gradient(closest-side,rgba(255,142,6,0.16),rgba(255,142,6,0))]"
        />
        <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 pt-8 pb-20 lg:pt-12 lg:pb-[88px] grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
          <div>
            <span className="inline-flex items-center gap-2.5 py-1.5 pl-1.5 pr-3.5 rounded-full bg-white shadow-e1 text-[13.5px] font-medium text-ink-soft">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-tint text-brand-flame font-semibold text-xs">Sejak 1990</span>
              Tentang EFLOOR
            </span>
            <h1 className="mt-5 text-[34px] md:text-[48px] lg:text-[56px] leading-[1.05] font-bold tracking-[-0.035em] text-balance">
              Awal perjalanan &amp; lahirnya <span className="text-brand-gradient">EFLOOR</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted max-w-[52ch]">
              Sejak 1990 kami memasok produk lantai berkualitas untuk ribuan
              pelanggan di Jakarta dan seluruh Indonesia — dari satu toko fisik
              sampai melayani proyek, marketplace, dan WhatsApp.
            </p>
            <Link
              href="/kontak"
              className="mt-8 inline-flex items-center gap-2.5 h-[52px] px-6 rounded-full bg-ink text-white font-semibold text-[15px] hover:-translate-y-0.5 transition-transform"
            >
              Kunjungi toko kami
              <ArrowIcon className="w-[18px] h-[18px]" />
            </Link>
          </div>
          <figure className="relative">
            <div className="relative aspect-[828/520] rounded-[32px] md:rounded-[36px] overflow-hidden bg-surface shadow-e2">
              <Image
                src="/img/about-us-efloor.png"
                alt="Toko fisik EFLOOR di Mall Artha Gading, Jakarta"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 92vw"
                className="object-cover"
              />
            </div>
            <figcaption className="absolute -bottom-5 left-5 px-4 py-2.5 rounded-2xl bg-white shadow-e2 text-[13px]">
              <b className="block">Toko pertama kami</b>
              <span className="text-muted">Mall Artha Gading, lantai 5</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <StatsStrip />

      <section className="py-[72px] lg:py-[104px]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div data-reveal className="max-w-[640px]">
            <Eyebrow>Perjalanan kami</Eyebrow>
            <h2 className={h2Class}>Tiga dekade menjaga harga tetap masuk akal</h2>
          </div>
          <ol className="relative grid gap-6 md:grid-cols-3 mt-10 md:mt-12">
            <span aria-hidden="true" className="hidden md:block absolute left-0 right-0 top-[22px] h-px bg-line" />
            {CHAPTERS.map((c, i) => (
              <li key={c.title} data-reveal className="relative">
                <span
                  className={`relative inline-grid place-items-center h-11 px-4 rounded-full font-mono text-[14px] font-semibold ${
                    i === 0 ? "bg-brand-gradient text-white shadow-cta" : "bg-white text-ink shadow-e1"
                  }`}
                >
                  {c.when}
                </span>
                <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.01em]">{c.title}</h3>
                <p className="mt-2 text-[15px] text-muted leading-relaxed">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[104px]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div data-reveal className="max-w-[640px]">
            <Eyebrow>Siapa yang kami layani</Eyebrow>
            <h2 className={h2Class}>Dari satu ember sampai satu proyek gedung</h2>
          </div>
          <ul className="grid gap-5 md:grid-cols-3 mt-10 md:mt-12">
            {SERVE.map(({ icon: Icon, title, text }) => (
              <li key={title} data-reveal className="p-6 md:p-7 rounded-[28px] bg-paper shadow-[inset_0_0_0_1px_var(--color-line)]">
                <span className="w-12 h-12 rounded-2xl grid place-items-center bg-orange-tint text-brand-flame">
                  <Icon className="w-6 h-6" />
                </span>
                <h3 className="mt-5 text-[18px] font-semibold">{title}</h3>
                <p className="mt-1.5 text-[14.5px] text-muted leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="pt-[72px] lg:pt-[104px]">
        <CategoryBento />
      </div>
      <ClosingCta
        title="Mari bicara soal proyek Anda."
        lede="Tanya produk, harga grosir, atau pengiriman — tim kami membalas di jam kerja."
        source="about-closing"
      />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Tentang EFLOOR | Distributor Flooring & Lem Vinyl Jakarta Sejak 1990",

    description:
      "Kenali perjalanan EFLOOR sejak 1990 sebagai distributor flooring dan lem vinyl terpercaya di Jakarta. Dari toko fisik di Mall Artha Gading hingga melayani pembelian online dan WhatsApp dengan harga terbaik untuk pelanggan.",

    keywords: [
      "tentang efloor",
      "profil perusahaan efloor",
      "sejarah efloor",
      "distributor flooring jakarta",
      "supplier lantai vinyl jakarta",
      "distributor lem vinyl jakarta",
      "perusahaan flooring indonesia",
      "toko lantai mall artha gading",
      "supplier lantai terpercaya jakarta",
      "efloor sejak 1990",
      "distributor lantai proyek jakarta",
      "supplier lantai dan lem vinyl",
    ],

    alternates: {
      canonical: `${SITE_URL}/about-us`,
    },
  };
}
