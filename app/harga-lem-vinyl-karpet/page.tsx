import { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import RelatedVerticals from "../components/RelatedVerticals";
import Faq from "../components/Faq";
import FaqAside from "../components/FaqAside";
import RevealOnScroll from "../components/home/RevealOnScroll";
import ClosingCta from "../components/home/ClosingCta";
import { FullPriceList, PriceHero, VinylTiers } from "../components/pricing/PriceSections";
import { SITE_URL } from "../seo.config";
import { PRICING_FAQ_ITEMS } from "../static/pricingFaq";
import { PRICE_LIST, PRICE_LIST_UPDATED, priceProduct } from "../static/priceList";
import { rupiah } from "../lib/format";

const vinyl = priceProduct("vinyl");
const max = priceProduct("max");

const pricingPageFaqs = [
  ...PRICING_FAQ_ITEMS,
  {
    question:
      "Apakah harga di atas berlaku sama untuk Lem Vinyl dan Lem Karpet EFLOOR?",
    answer: `Ya, harga ${vinyl.name} berlaku untuk lini Lem Vinyl maupun Lem Karpet EFLOOR. Untuk daya rekat ekstra, tersedia ${max.name} mulai ${rupiah(max.sizes[0].price)} (${max.sizes[0].label}).`,
  },
  {
    question: "Apakah tersedia harga khusus untuk pembelian grosir/tender?",
    answer:
      "Tersedia. Untuk pembelian dalam jumlah besar seperti kebutuhan procurement, kontraktor, dan tender, kami menyediakan penawaran harga khusus. Hubungi tim kami via WhatsApp dengan detail kebutuhan (jumlah kemasan dan lokasi pengiriman) untuk mendapatkan penawaran terbaik.",
  },
  {
    question: "Apakah harga di atas sudah termasuk ongkos kirim?",
    answer:
      "Harga di atas adalah harga produk di toko. Biaya dan estimasi waktu pengiriman tergantung lokasi dan volume pesanan — hubungi tim kami via WhatsApp untuk perhitungan ongkos kirim sesuai alamat Anda.",
  },
];

export default function HargaLemVinylKarpet() {
  // One Product per price-list line, so every glue's prices are machine-readable.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": PRICE_LIST.map((p) => ({
      "@type": "Product",
      name: p.name,
      brand: { "@type": "Brand", name: "EFLOOR" },
      ...(p.note ? { description: p.note } : {}),
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "IDR",
        lowPrice: Math.min(...p.sizes.map((s) => s.price)),
        highPrice: Math.max(...p.sizes.map((s) => s.price)),
        offerCount: p.sizes.length,
        url: `${SITE_URL}/harga-lem-vinyl-karpet#harga-${p.id}`,
      },
    })),
  };

  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RevealOnScroll />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Harga Lem Vinyl & Karpet" },
        ]}
      />
      <PriceHero />
      <VinylTiers />
      <FullPriceList />
      <Faq
        items={pricingPageFaqs}
        sectionId="faq-harga-lem-vinyl-karpet"
        ariaLabel="Pertanyaan yang Sering Diajukan tentang Harga Lem Vinyl dan Lem Karpet"
        title="Pertanyaan seputar harga lem EFLOOR"
        subtitle="Harga, cakupan area, ongkir, dan penawaran khusus pembelian dalam jumlah besar."
        aside={<FaqAside source="pricing-faq" product="harga Lem Vinyl & Karpet" />}
      />
      <ClosingCta
        title="Sudah tahu kebutuhan lem Anda?"
        lede={`Kirim luas area atau jumlah kemasan — kami balas dengan total harga dan ongkir. Harga toko per ${PRICE_LIST_UPDATED}.`}
        source="pricing-closing"
        product="harga Lem Vinyl & Karpet"
      />
      <RelatedVerticals currentHref="/harga-lem-vinyl-karpet" />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const list = vinyl.sizes.map((s) => `${s.label} ${rupiah(s.price)}`).join(", ");
  return {
    title: `Harga Lem Vinyl & Lem Karpet Terbaru ${PRICE_LIST_UPDATED} | Price List EFLOOR`,

    description: `Harga Lem Vinyl / Lem Karpet EFLOOR: ${list}. Plus harga Lem MAX, ECO, HPL, Lem Kayu & Lem PU, estimasi cakupan area, dan harga khusus grosir, procurement & tender.`,

    keywords: [
      "harga lem vinyl",
      "harga lem karpet",
      "harga lem vinyl per kg",
      "harga lem karpet per kg",
      "harga lem vinyl 4 kg",
      "harga lem karpet 20 kg",
      "price list lem vinyl karpet",
      "harga lem vinyl grosir",
      "harga lem karpet grosir",
      "daftar harga lem vinyl karpet efloor",
      "harga lem hpl",
      "harga lem pu",
      "harga lem kayu tahan air",
    ],
    alternates: {
      canonical: `${SITE_URL}/harga-lem-vinyl-karpet`,
    },
  };
}
