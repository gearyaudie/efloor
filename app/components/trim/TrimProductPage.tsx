import { groq } from "next-sanity";
import { client } from "@/sanity.client";
import { SITE_URL } from "../../seo.config";
import { rupiah } from "../../lib/format";
import { TRIMS, type TrimKey } from "../../static/trims";
import Breadcrumbs from "../Breadcrumbs";
import Faq, { type FaqItem } from "../Faq";
import WhatsAppButton from "../WhatsAppButton";
import { WhatsAppDot } from "../icons";
import RevealOnScroll from "../home/RevealOnScroll";
import ClosingCta from "../home/ClosingCta";
import SectionNav from "../product/SectionNav";
import TrimHero from "./TrimHero";
import TrimBenefits from "./TrimBenefits";
import TrimSizes from "./TrimSizes";
import TrimUses from "./TrimUses";
import TrimPricing from "./TrimPricing";
import TrimSteps from "./TrimSteps";
import TrimSpecs from "./TrimSpecs";
import type { TrimProduct } from "./types";

const productQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  desc,
  "image": coalesce(image.asset->url, images[0].asset->url),
  priceVariants[]{ label, price }
}`;

const NAV = [
  { id: "keunggulan", label: "Keunggulan" },
  { id: "ukuran", label: "Ukuran & warna" },
  { id: "aplikasi", label: "Aplikasi" },
  { id: "harga", label: "Harga" },
  { id: "cara-pasang", label: "Cara pasang" },
  { id: "spesifikasi", label: "Spesifikasi" },
];

/**
 * Product page for one PVC trim. Copy and dimensions come from
 * app/static/trims.ts; prices come live from the product's Sanity
 * priceVariants, and the price FAQ, calculator and Product schema are all
 * generated from those same variants, so the page can never quote a price
 * the product page doesn't.
 */
export default async function TrimProductPage({ trim }: { trim: TrimKey }) {
  const config = TRIMS[trim];

  let product: TrimProduct | null = null;
  try {
    product = await client.fetch<TrimProduct | null>(productQuery, { slug: config.productSlug });
  } catch (err) {
    console.error("Sanity fetch error:", err);
  }
  const variants = (product?.priceVariants ?? []).filter((v) => v?.label && typeof v.price === "number");

  const priceFaq: FaqItem[] =
    variants.length > 0
      ? [
          {
            question: `Berapa harga ${config.name} EFLOOR?`,
            answer: `Harga ${config.name} EFLOOR per batang (${config.lengthCm} cm): ${variants
              .map((v) => `${v.label} ${rupiah(v.price)}`)
              .join(", ")}. Harga dapat berubah sewaktu-waktu — hubungi tim kami via WhatsApp untuk harga terbaru dan penawaran pembelian dalam jumlah besar.`,
          },
        ]
      : [];

  const faqId = `faq-${config.pageHref.slice(1)}`;
  const nav = [...NAV, { id: faqId, label: "FAQ" }];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.name ?? `${config.name} EFLOOR`,
    image: [product?.image, ...config.gallery.map((g) => `${SITE_URL}${g.src}`)].filter(Boolean),
    description: product?.desc ?? config.intro,
    brand: { "@type": "Brand", name: "EFLOOR" },
    url: `${SITE_URL}${config.pageHref}`,
    ...(variants.length > 0
      ? {
          offers: variants.map((v) => ({
            "@type": "Offer",
            name: v.label,
            price: v.price,
            priceCurrency: "IDR",
            url: `${SITE_URL}${config.pageHref}`,
          })),
        }
      : {}),
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
          { label: config.breadcrumb },
        ]}
      />
      <TrimHero config={config} variants={variants} />
      <SectionNav
        items={nav}
        source={`${config.key}-subnav`}
        product={config.whatsappProduct}
        cta={`Pesan ${config.name}`}
      />
      <TrimBenefits config={config} />
      <TrimSizes config={config} />
      <TrimUses config={config} />
      <TrimPricing config={config} variants={variants} />
      <TrimSteps config={config} />
      <TrimSpecs config={config} />
      <Faq
        items={[...priceFaq, ...config.faqs]}
        sectionId={faqId}
        ariaLabel={`Pertanyaan yang Sering Diajukan tentang ${config.breadcrumb}`}
        title={config.faqTitle}
        subtitle={config.faqSubtitle}
        aside={<TrimFaqAside source={`${config.key}-faq`} product={config.whatsappProduct} />}
      />
      <ClosingCta
        title={config.closing.title}
        lede={config.closing.lede}
        source={`${config.key}-closing`}
        product={config.whatsappProduct}
      />
    </div>
  );
}

function TrimFaqAside({ source, product }: { source: string; product: string }) {
  return (
    <div className="mt-8 p-6 rounded-[28px] bg-white shadow-e1">
      <b className="block text-[17px]">Ragu ukuran atau warna?</b>
      <p className="text-muted text-[14.5px] mt-1 mb-4">
        Kirim foto lantai atau tangga Anda, tim kami bantu pilihkan.
      </p>
      <WhatsAppButton
        source={source}
        product={product}
        variant="plain"
        className="inline-flex items-center gap-2.5 h-[42px] px-[18px] rounded-full bg-brand-gradient text-white text-sm font-semibold shadow-cta hover:-translate-y-0.5 transition-transform"
      >
        <WhatsAppDot />
        Konsultasi gratis
      </WhatsAppButton>
    </div>
  );
}
