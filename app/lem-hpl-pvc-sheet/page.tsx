import { Metadata } from "next";
import FaqSectionHPL from "../components/FaqSectionHPL";
import { SITE_URL } from "../seo.config";
import Breadcrumbs from "../components/Breadcrumbs";
import RelatedVerticals from "../components/RelatedVerticals";
import RevealOnScroll from "../components/home/RevealOnScroll";
import ClosingCta from "../components/home/ClosingCta";
import HplHero from "../components/hpl/HplHero";
import SectionNav from "../components/product/SectionNav";
import HplBenefits from "../components/hpl/HplBenefits";
import HplComparison from "../components/hpl/HplComparison";
import HplMaterials from "../components/hpl/HplMaterials";
import HplSteps from "../components/hpl/HplSteps";
import HplPricing from "../components/hpl/HplPricing";
import HplSpecs from "../components/hpl/HplSpecs";
import { HPL_PACKS } from "../static/hpl";

const NAV = [
  { id: "keunggulan", label: "Keunggulan" },
  { id: "material", label: "Material" },
  { id: "cara-pakai", label: "Cara pakai" },
  { id: "harga", label: "Harga" },
  { id: "spesifikasi", label: "Spesifikasi" },
  { id: "faq-lem-hpl", label: "FAQ" },
];

export default function LemHPL() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Lem HPL EFLOOR",
    brand: { "@type": "Brand", name: "EFLOOR" },
    description:
      "Lem HPL waterbased EFLOOR untuk HPL, veneer, PVC sheet, MDF, multiplek dan particle board. Daya rekat kuat, cepat tack, cukup oles satu sisi.",
    image: HPL_PACKS.map((p) => `${SITE_URL}${p.img}`),
    url: `${SITE_URL}/lem-hpl-pvc-sheet`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: Math.min(...HPL_PACKS.map((p) => p.price)),
      highPrice: Math.max(...HPL_PACKS.map((p) => p.price)),
      offerCount: HPL_PACKS.length,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <RevealOnScroll />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Produk", href: "/products" },
          { label: "Lem HPL & PVC Sheet" },
        ]}
      />
      <HplHero />
      <SectionNav
        items={NAV}
        source="hpl-subnav"
        product="Lem HPL EFLOOR"
        cta="Pesan Lem HPL"
      />
      <HplBenefits />
      <HplComparison />
      <HplMaterials />
      <HplSteps />
      <HplPricing />
      <HplSpecs />
      <FaqSectionHPL />
      <ClosingCta
        title="Siap mengerjakan kitchen set berikutnya?"
        lede="Tanya stok, harga volume, atau cara pakai Lem HPL EFLOOR. Tim kami membalas di jam kerja."
        source="hpl-closing"
        product="Lem HPL EFLOOR"
      />
      <RelatedVerticals currentHref="/lem-hpl-pvc-sheet" />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Lem HPL Waterbased 1 Sisi – Harga 1, 4 & 20 KG | Daya Rekat Kuat - EFLOOR",

    description:
      "Lem HPL EFLOOR waterbased: cukup oles satu sisi, cepat tack, daya rekat kuat. Untuk HPL, veneer, PVC sheet, MDF & multiplek. Harga mulai Rp62.000 (1 KG), 4 KG & 20 KG.",

    keywords: [
      "lem hpl",
      "lem hpl waterbased",
      "lem hpl 1 sisi",
      "harga lem hpl",
      "lem hpl 20 kg",
      "lem hpl berkualitas",
      "lem hpl furniture",
      "lem hpl kitchen set",
      "lem hpl multiplek",
      "lem hpl mdf",
      "lem hpl veneer",
      "lem hpl pvc sheet",
      "lem hpl daya rekat kuat",
      "lem hpl efloor",
      "lem untuk hpl",
      "pengganti lem kuning",
      "lem furniture indonesia",
      "lem kitchen set",
      "lem kabinet",
    ],

    alternates: {
      canonical: `${SITE_URL}/lem-hpl-pvc-sheet`,
    },
  };
}
