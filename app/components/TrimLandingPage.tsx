import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "@/sanity.client";
import { SITE_URL } from "../seo.config";
import { ACCESSORY_PAGES } from "../static/accessories";
import Breadcrumbs from "./Breadcrumbs";
import Faq, { type FaqItem } from "./Faq";
import WhatsAppButton from "./WhatsAppButton";

type TrimProduct = {
  name: string;
  slug: string;
  desc?: string;
  image?: string;
  priceVariants?: { label: string; price: number }[];
};

const productQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  desc,
  "image": coalesce(image.asset->url, images[0].asset->url),
  priceVariants[]{ label, price }
}`;

const formatRupiah = (price: number) => `Rp${price.toLocaleString("id-ID")}`;

export type TrimLandingPageProps = {
  /** Sanity product slug the prices and image come from. */
  productSlug: string;
  pageHref: string;
  breadcrumb: string;
  heading: string;
  intro: string;
  /** Appears in the first WhatsApp message, e.g. "List Siku L EFLOOR". */
  whatsappProduct: string;
  imageAlt: string;
  priceHeading: string;
  priceNote: string;
  /** Subject of the auto-generated price question, e.g. "List Siku L EFLOOR". */
  priceQuestionSubject: string;
  uses: { title: string; text: string }[];
  usesHeading: string;
  faqs: FaqItem[];
  faqTitle: string;
  faqSubtitle: string;
};

/**
 * Landing page for one PVC trim product. Prices, product name and image are
 * read from Sanity at build time, and the price FAQ answer and Product schema
 * are generated from the same variants, so the page can never quote a price
 * the product page doesn't.
 */
export default async function TrimLandingPage(props: TrimLandingPageProps) {
  const product = await client.fetch<TrimProduct | null>(productQuery, {
    slug: props.productSlug,
  });
  const variants = product?.priceVariants ?? [];

  const priceFaq: FaqItem[] =
    variants.length > 0
      ? [
          {
            question: `Berapa harga ${props.priceQuestionSubject}?`,
            answer: `Harga ${props.priceQuestionSubject}: ${variants
              .map((v) => `${v.label} ${formatRupiah(v.price)}`)
              .join(", ")}. Harga dapat berubah sewaktu-waktu — hubungi tim kami via WhatsApp untuk harga terbaru dan penawaran pembelian dalam jumlah besar.`,
          },
        ]
      : [];

  const productJsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        ...(product.image ? { image: product.image } : {}),
        ...(product.desc ? { description: product.desc } : {}),
        brand: { "@type": "Brand", name: "EFLOOR" },
        url: `${SITE_URL}${props.pageHref}`,
        offers: variants.map((v) => ({
          "@type": "Offer",
          name: v.label,
          price: v.price,
          priceCurrency: "IDR",
          url: `${SITE_URL}${props.pageHref}`,
        })),
      }
    : null;

  const otherTrims = ACCESSORY_PAGES.filter((p) => p.href !== props.pageHref);

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}

      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: props.breadcrumb }]}
      />

      <div className="flex flex-col md:flex-row items-center gap-10 px-4 my-16 md:my-20 max-w-[1200px] mx-auto">
        {product?.image && (
          <div className="flex-1 flex justify-center">
            <Image
              src={product.image}
              alt={props.imageAlt}
              width={700}
              height={700}
              className="w-full max-w-[420px] h-auto"
              priority
            />
          </div>
        )}

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl mb-4 font-semibold">
            {props.heading}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-[#555555]">
            {props.intro}
          </p>
          <div className="pt-8">
            <WhatsAppButton product={props.whatsappProduct} source="landing-hero">
              Tanyakan Sekarang!
            </WhatsAppButton>
          </div>
        </div>
      </div>

      {variants.length > 0 && (
        <div className="max-w-[700px] mx-auto px-4 pb-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
            {props.priceHeading}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-[#e8e8e8]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f4f4f4]">
                  <th className="px-5 py-4 font-semibold">Varian</th>
                  <th className="px-5 py-4 font-semibold">Harga</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((variant) => (
                  <tr key={variant.label} className="border-t border-[#e8e8e8]">
                    <td className="px-5 py-4 font-medium">{variant.label}</td>
                    <td className="px-5 py-4">{formatRupiah(variant.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#808080] text-center mt-4">
            {props.priceNote}
          </p>
          <div className="text-center mt-6">
            <Link
              href={`/products/${props.productSlug}`}
              className="text-[#FF8E06] font-medium hover:underline"
            >
              Lihat detail produk →
            </Link>
          </div>
        </div>
      )}

      <div className="bg-[#f4f4f4] px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
          {props.usesHeading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {props.uses.map((use) => (
            <div key={use.title} className="rounded-2xl bg-white p-6">
              <h3 className="font-semibold text-lg mb-2">{use.title}</h3>
              <p className="text-[#808080]">{use.text}</p>
            </div>
          ))}
        </div>
      </div>

      <Faq
        items={[...priceFaq, ...props.faqs]}
        sectionId={`faq-${props.pageHref.slice(1)}`}
        ariaLabel={`Pertanyaan yang Sering Diajukan tentang ${props.breadcrumb}`}
        title={props.faqTitle}
        subtitle={props.faqSubtitle}
      />

      <div className="max-w-[1200px] mx-auto px-4 py-12 text-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">Lihat Juga</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {[...otherTrims, { label: "Harga Lem Vinyl & Karpet", href: "/harga-lem-vinyl-karpet" }].map(
            (page) => (
              <Link
                key={page.href}
                href={page.href}
                className="px-5 py-3 rounded-2xl border border-[#e8e8e8] text-sm font-medium text-[#4D4D4D] hover:border-[#FF8E06] hover:text-[#FF8E06] transition-colors"
              >
                {page.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </>
  );
}
