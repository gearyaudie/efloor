import { Metadata } from "next";
import { SITE_URL } from "../seo.config";
import Breadcrumbs from "../components/Breadcrumbs";
import RelatedVerticals from "../components/RelatedVerticals";
import FaqSectionEpoxy from "../components/FaqSectionEpoxy";
import FaqAside from "../components/FaqAside";
import RevealOnScroll from "../components/home/RevealOnScroll";
import ClosingCta from "../components/home/ClosingCta";
import SectionNav from "../components/product/SectionNav";
import EpoxyHero from "../components/epoxy/EpoxyHero";
import { EpoxyBenefits, EpoxyPricing, EpoxySpecs, EpoxySteps, EpoxyUses, EpoxyVideo } from "../components/epoxy/EpoxySections";
import { rupiah } from "../lib/format";
import { priceProduct } from "../static/priceList";

const PAGE_HREF = "/lem-epoxy";
const epoxy = priceProduct("epoxy");

const NAV = [
  { id: "keunggulan", label: "Keunggulan" },
  { id: "aplikasi", label: "Aplikasi" },
  { id: "cara-pakai", label: "Cara pakai" },
  { id: "video", label: "Video" },
  { id: "harga", label: "Harga" },
  { id: "spesifikasi", label: "Spesifikasi" },
  { id: "faq-lem-epoxy", label: "FAQ" },
];

export default function LemEpoxy() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Lem Epoxy EFLOOR Non-Sag (Resin + Hardener)",
    brand: { "@type": "Brand", name: "EFLOOR" },
    description:
      "Lem epoxy 2 komponen EFLOOR untuk sambungan kayu, tenon dan sudut 45°. Non-sag, rekat kuat, garis lem tidak terlihat, serbaguna untuk kayu, logam dan kaca. Dijual per set Resin + Hardener.",
    image: epoxy.sizes.map((s) => `${SITE_URL}${s.img}`),
    url: `${SITE_URL}${PAGE_HREF}`,
    subjectOf: {
      "@type": "VideoObject",
      name: "Lem Epoxy EFLOOR Non-Sag: cara pakai",
      description: "Mencampur Resin dan Hardener 1 : 1 lalu menyambung kayu dengan Lem Epoxy EFLOOR Non-Sag.",
      embedUrl: "https://drive.google.com/file/d/1TEzbn7iRfkoKWlo9Yfq7r9FtJIwTW2rq/preview",
      thumbnailUrl: `${SITE_URL}/img/lem-epoxy-2-8kg.webp`,
      uploadDate: "2026-11-08",
    },
    offers: epoxy.sizes.map((s) => ({
      "@type": "Offer",
      name: `1 set ${s.label} (Resin + Hardener)`,
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
          { label: "Lem Epoxy Non-Sag" },
        ]}
      />
      <EpoxyHero />
      <SectionNav items={NAV} source="epoxy-subnav" product="Lem Epoxy EFLOOR Non-Sag" cta="Pesan lem epoxy" />
      <EpoxyBenefits />
      <EpoxyUses />
      <EpoxySteps />
      <EpoxyVideo />
      <EpoxyPricing />
      <EpoxySpecs />
      <FaqSectionEpoxy aside={<FaqAside source="epoxy-faq" product="Lem Epoxy EFLOOR Non-Sag" text="Tanya kebutuhan untuk workshop atau proyek Anda." />} />
      <ClosingCta
        title="Siap menyambung tanpa celah?"
        lede="Pesan Lem Epoxy EFLOOR per set Resin + Hardener — kami kirim ke seluruh Indonesia."
        source="epoxy-closing"
        product="Lem Epoxy EFLOOR Non-Sag"
      />
      <RelatedVerticals currentHref={PAGE_HREF} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const prices = epoxy.sizes.map((s) => `set ${s.label.toLowerCase()} ${rupiah(s.price)}`).join(", ");
  return {
    title: "Lem Epoxy Kayu Non-Sag 2 Komponen (Resin + Hardener) | EFLOOR",
    description: `Lem epoxy EFLOOR untuk sambungan kayu, tenon & sudut 45°. Non-sag, rekat kuat, garis lem tidak terlihat, untuk kayu, logam & kaca. Harga per set Resin + Hardener: ${prices}.`,
    keywords: [
      "lem epoxy",
      "lem epoxy kayu",
      "lem epoxy 2 komponen",
      "lem epoxy resin hardener",
      "lem epoxy non sag",
      "lem sambungan kayu",
      "lem tenon",
      "lem sudut 45 derajat",
      "lem epoxy logam",
      "lem epoxy kaca",
      "harga lem epoxy",
      "lem epoxy efloor",
    ],
    alternates: { canonical: `${SITE_URL}${PAGE_HREF}` },
    openGraph: {
      title: "Lem Epoxy Non-Sag EFLOOR (Resin + Hardener)",
      description: `Epoxy 2 komponen untuk sambungan kayu. ${prices}.`,
      url: `${SITE_URL}${PAGE_HREF}`,
      images: [{ url: `${SITE_URL}/img/lem-epoxy-2-8kg.webp`, width: 760, height: 1000, alt: "Lem Epoxy EFLOOR Resin + Hardener 2,8 KG" }],
      type: "website",
    },
  };
}
