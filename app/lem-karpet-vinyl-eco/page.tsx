import { Metadata } from "next";
import { SITE_URL } from "../seo.config";
import Breadcrumbs from "../components/Breadcrumbs";
import RelatedVerticals from "../components/RelatedVerticals";
import FaqSectionEco from "../components/FaqSectionEco";
import FaqAside from "../components/FaqAside";
import RevealOnScroll from "../components/home/RevealOnScroll";
import ClosingCta from "../components/home/ClosingCta";
import SectionNav from "../components/product/SectionNav";
import EcoHero from "../components/eco/EcoHero";
import { EcoBenefits, EcoCompare, EcoPricing, EcoSpecs, EcoSteps, EcoUses } from "../components/eco/EcoSections";
import { rupiah } from "../lib/format";
import { priceProduct } from "../static/priceList";

const PAGE_HREF = "/lem-karpet-vinyl-eco";
const eco = priceProduct("eco");

const NAV = [
  { id: "keunggulan", label: "Keunggulan" },
  { id: "bandingkan", label: "Bandingkan" },
  { id: "cocok-untuk", label: "Cocok untuk" },
  { id: "cara-pakai", label: "Cara pakai" },
  { id: "harga", label: "Harga" },
  { id: "spesifikasi", label: "Spesifikasi" },
  { id: "faq-lem-karpet-vinyl-eco", label: "FAQ" },
];

export default function LemKarpetVinylEco() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Lem Karpet & Vinyl ECO EFLOOR",
    brand: { "@type": "Brand", name: "EFLOOR" },
    description:
      "Lem karpet & vinyl waterbased versi hemat dari EFLOOR untuk karpet tile, karpet roll, dan lantai vinyl. Oles satu sisi, tidak berbau menyengat, daya sebar 8–10 m² per kg.",
    image: [...eco.sizes.map((s) => `${SITE_URL}${s.img}`), `${SITE_URL}/img/lem-eco-banner.webp`],
    url: `${SITE_URL}${PAGE_HREF}`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: Math.min(...eco.sizes.map((s) => s.price)),
      highPrice: Math.max(...eco.sizes.map((s) => s.price)),
      offerCount: eco.sizes.length,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <RevealOnScroll />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Produk", href: "/products" },
          { label: "Lem Karpet & Vinyl ECO" },
        ]}
      />
      <EcoHero />
      <SectionNav items={NAV} source="eco-subnav" product="Lem Karpet & Vinyl ECO" cta="Pesan Lem ECO" />
      <EcoBenefits />
      <EcoCompare />
      <EcoUses />
      <EcoSteps />
      <EcoPricing />
      <EcoSpecs />
      <FaqSectionEco aside={<FaqAside source="eco-faq" product="Lem Karpet & Vinyl ECO" />} />
      <ClosingCta
        title="Pasang karpet & vinyl lebih hemat."
        lede="Kirim luas area Anda — kami hitungkan kebutuhan Lem ECO dan total harganya."
        source="eco-closing"
        product="Lem Karpet & Vinyl ECO"
      />
      <RelatedVerticals currentHref={PAGE_HREF} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const from = rupiah(eco.sizes[0].price);
  return {
    title: `Lem Karpet & Vinyl ECO – Murah Mulai ${from} | Waterbased EFLOOR`,
    description: `Lem karpet & vinyl murah dari EFLOOR: waterbased, tidak berbau menyengat, oles satu sisi, 8–10 m²/kg. Harga ${eco.sizes
      .map((s) => `${s.label} ${rupiah(s.price)}`)
      .join(", ")}.`,
    keywords: [
      "lem karpet murah",
      "lem vinyl murah",
      "lem karpet eco",
      "lem vinyl eco",
      "lem karpet vinyl eco",
      "lem karpet ekonomis",
      "harga lem karpet",
      "harga lem vinyl",
      "lem karpet waterbased",
      "lem karpet tile",
      "lem karpet roll",
      "lem lantai vinyl",
      "lem karpet 20 kg",
      "lem efloor eco",
    ],
    alternates: { canonical: `${SITE_URL}${PAGE_HREF}` },
    openGraph: {
      title: "Lem Karpet & Vinyl ECO EFLOOR",
      description: `Versi hemat lem karpet & vinyl waterbased. Mulai ${from}.`,
      url: `${SITE_URL}${PAGE_HREF}`,
      images: [{ url: `${SITE_URL}/img/lem-eco-banner.webp`, width: 1200, height: 1200, alt: "Lem Karpet & Vinyl ECO EFLOOR" }],
      type: "website",
    },
  };
}
