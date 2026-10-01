import { Metadata } from "next";
import { SITE_URL } from "../seo.config";
import Breadcrumbs from "../components/Breadcrumbs";
import RelatedVerticals from "../components/RelatedVerticals";
import FaqSectionPadel from "../components/FaqSectionPadel";
import FaqAside from "../components/FaqAside";
import RevealOnScroll from "../components/home/RevealOnScroll";
import ClosingCta from "../components/home/ClosingCta";
import SectionNav from "../components/product/SectionNav";
import PadelHero from "../components/padel/PadelHero";
import { PadelBenefits, PadelPricing, PadelSeam, PadelSpecs, PadelSteps, PadelUses } from "../components/padel/PadelSections";
import { rupiah } from "../lib/format";
import { priceProduct } from "../static/priceList";

const PAGE_HREF = "/lem-lapangan-padel";
const pu = priceProduct("pu");

const NAV = [
  { id: "keunggulan", label: "Keunggulan" },
  { id: "lapangan-padel", label: "Lapangan padel" },
  { id: "aplikasi", label: "Aplikasi" },
  { id: "cara-pakai", label: "Cara pakai" },
  { id: "harga", label: "Harga" },
  { id: "spesifikasi", label: "Spesifikasi" },
  { id: "faq-lem-lapangan-padel", label: "FAQ" },
];

export default function LemLapanganPadel() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Lem PU EFLOOR untuk Lapangan Padel & Rumput Sintetis",
    brand: { "@type": "Brand", name: "EFLOOR" },
    description:
      "Lem polyurethane (PU) EFLOOR untuk sambungan rumput sintetis lapangan padel, rumput hiasan, dan bata ringan. Tahan air, cepat kering, indoor & outdoor.",
    image: [...pu.sizes.map((s) => `${SITE_URL}${s.img}`), `${SITE_URL}/img/lem-pu-banner.webp`],
    url: `${SITE_URL}${PAGE_HREF}`,
    offers: pu.sizes.map((s) => ({
      "@type": "Offer",
      name: s.label,
      price: s.price,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${PAGE_HREF}`,
    })),
  };

  return (
    <div className="bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <RevealOnScroll />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Produk", href: "/products" },
          { label: "Lem Lapangan Padel & Rumput Sintetis" },
        ]}
      />
      <PadelHero />
      <SectionNav items={NAV} source="padel-subnav" product="Lem PU EFLOOR (rumput sintetis / padel)" cta="Pesan lem padel" />
      <PadelBenefits />
      <PadelSeam />
      <PadelUses />
      <PadelSteps />
      <PadelPricing />
      <PadelSpecs />
      <FaqSectionPadel aside={<FaqAside source="padel-faq" product="Lem PU EFLOOR (rumput sintetis / padel)" text="Kirim ukuran dan jumlah lapangan, kami bantu hitung kebutuhan lem." />} />
      <ClosingCta
        title="Siap membangun lapangan padel?"
        lede="Kirim jumlah lapangan dan lokasi proyek — kami siapkan penawaran Lem PU EFLOOR dan jadwal kirim."
        source="padel-closing"
        product="Lem PU EFLOOR (rumput sintetis / padel)"
      />
      <RelatedVerticals currentHref={PAGE_HREF} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const prices = pu.sizes.map((s) => `${s.label.toLowerCase()} ${rupiah(s.price)}`).join(", ");
  return {
    title: "Lem Lapangan Padel & Rumput Sintetis – Lem PU Tahan Air | EFLOOR",
    description: `Lem PU (polyurethane) EFLOOR untuk sambungan rumput sintetis lapangan padel, taman & bata ringan. Tahan air, cepat kering, indoor & outdoor. Harga ${prices}.`,
    keywords: [
      "lem lapangan padel",
      "lem rumput padel",
      "lem rumput sintetis",
      "lem rumput sintetis lapangan",
      "lem sambungan rumput sintetis",
      "lem pu rumput sintetis",
      "lem polyurethane rumput sintetis",
      "harga lem rumput sintetis",
      "lem rumput sintetis outdoor",
      "lem rumput hiasan",
      "lem bata ringan",
      "lem pu efloor",
    ],
    alternates: { canonical: `${SITE_URL}${PAGE_HREF}` },
    openGraph: {
      title: "Lem Lapangan Padel & Rumput Sintetis – EFLOOR",
      description: `Lem PU tahan air untuk rumput sintetis. ${prices}.`,
      url: `${SITE_URL}${PAGE_HREF}`,
      images: [{ url: `${SITE_URL}/img/lem-pu-banner.webp`, width: 704, height: 700, alt: "Lem PU EFLOOR untuk rumput sintetis" }],
      type: "website",
    },
  };
}
