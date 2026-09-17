import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity.client";
import AllProducts from "./components/AllProducts";
import MarketingGrid from "./components/MarketingGrid";
import ProjectsSnippet from "./components/ProjectsSnippet";
import HeroSwiper from "./components/HeroSwiper";
import FAQSection from "./components/FaqSection";
import MainProductsSwiper from "./components/MainProductsSwiper";
import { SITE_URL } from "./seo.config";
import { MARKETPLACES } from "./static/business";
import { WHATSAPP_NUMBER } from "./lib/whatsapp";

export const revalidate = 60;

export const metadata: Metadata = {
  title:
    "Efloor Indonesia | Supplier Lem Vinyl, Lem Karpet & List Siku Terpercaya",
  description:
    "Supplier dan distributor lem vinyl, lem karpet, dan list siku/skirting waterbased eco-friendly di Jakarta. Melayani retail, kontraktor, dan procurement/tender sejak 1990.",
  alternates: {
    canonical: "/",
  },
};

type SanityProduct = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  desc: string;
  price: number;
  image: {
    asset: {
      url: string;
    };
  };
};

export default async function Home() {
  let sanityProducts: SanityProduct[] = [];
  try {
    sanityProducts = await client.fetch<SanityProduct[]>(`
      *[_type == "product"]{
        _id,
        name,
        slug,
        desc,
        price,
        image {
          asset->{
            url
          }
        }
      }
    `);
  } catch (err) {
    console.error("Sanity fetch error:", err);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Efloor",
    url: SITE_URL,
    logo: `${SITE_URL}/img/header-logo.png`,
    foundingDate: "1990",
    description:
      "Supplier dan distributor lem vinyl, lem karpet, dan list siku/skirting waterbased eco-friendly di Jakarta untuk retail, kontraktor, dan procurement/tender.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Jl. Raya Gading Bukit Indah No.2, RT.18/RW.8, Klp. Gading Bar., Kec. Klp. Gading",
      addressLocality: "Jakarta Utara",
      addressRegion: "DKI Jakarta",
      postalCode: "14240",
      addressCountry: "ID",
    },
    telephone: `+${WHATSAPP_NUMBER}`,
    sameAs: MARKETPLACES.map((shop) => shop.url),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col md:flex-row justify-center px-4 md:px-8 py-10 md:py-20 gap-10 md:gap-16 max-w-[1300px] mx-auto items-center">
        <div className="w-full md:flex-1 flex justify-center">
          <Image
            src="/img/lantai-vinyl-rs.png"
            alt="Instalasi lem vinyl EFLOOR di rumah sakit"
            width={1200}
            height={800}
            priority
            className="w-full max-w-[350px] md:max-w-[600px] h-auto"
          />
        </div>

        <div className="w-full md:flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-semibold leading-snug">
            Lem Vinyl & Karpet Paling Terpercaya #1
          </h1>
          <h2 className="mt-2 text-lg md:text-2xl font-normal text-[#808080]">
            Penjualan Terbanyak di Shopee & Tokopedia
          </h2>

          <p className="pt-6 md:pt-10 text-sm md:text-base text-[#808080] leading-relaxed">
            Kami adalah supplier lem vinyl eco friendly yang terpercaya dengan
            penjualan terbanyak di platform marketplace Indonesia. Lem Vinyl
            EFLOOR / Lem Karpet EFLOOR adalah pilihan terbaik untuk pemasangan
            indoor di area perkantoran, kamar tidur bayi dan rumah sakit.
            <br />
            <br />
            Berikut adalah keunggulan produk kami:
          </p>

          <ul className="list-disc text-left mx-auto md:mx-0 max-w-[500px] md:max-w-none pl-5 md:pl-6 pt-4 text-sm md:text-lg text-[#808080] space-y-2">
            <li>Eco Friendly, Ramah Lingkungan (Lem Waterbased)</li>
            <li>Tidak Berbau & Hampir Tidak Mengandung VOC</li>
            <li>Lebih Hemat Karena Viskositas Tinggi (Kental)</li>
            <li>Daya sebar yang luas, +- 8 - 10m2 per kg</li>
            <li>Pelayanan untuk procurement yang mudah</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center items-center mx-auto max-w-[1400px]">
        <HeroSwiper />
      </div>

      <div className="bg-[#f8f8f8]">
        <ProjectsSnippet />
      </div>

      {/* MAIN PRODUCTS SWIPER (STATIC) */}
      <MainProductsSwiper />

      <MarketingGrid />

      <FAQSection />

      {/* SANITY PRODUCTS SECTION */}
      <div className="bg-[#f8f8f8]" id="products">
        <AllProducts products={sanityProducts} />
      </div>
    </div>
  );
}
