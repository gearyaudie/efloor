import type { Metadata } from "next";
import { client } from "@/sanity.client";
import FAQSection from "./components/FaqSection";
import WhatsAppButton from "./components/WhatsAppButton";
import { WhatsAppDot } from "./components/icons";
import Hero from "./components/home/Hero";
import StatsStrip from "./components/home/StatsStrip";
import FeaturedProducts from "./components/home/FeaturedProducts";
import WhyEfloor from "./components/home/WhyEfloor";
import Solutions from "./components/home/Solutions";
import CategoryBento from "./components/home/CategoryBento";
import ProjectsMarquee, { type HomeProject } from "./components/home/ProjectsMarquee";
import HowToUse from "./components/home/HowToUse";
import ProductGrid, { type HomeProduct } from "./components/home/ProductGrid";
import ClosingCta from "./components/home/ClosingCta";
import RevealOnScroll from "./components/home/RevealOnScroll";
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

export default async function Home() {
  let sanityProducts: HomeProduct[] = [];
  try {
    sanityProducts = await client.fetch<HomeProduct[]>(`
      *[_type == "product"]{
        _id,
        name,
        slug,
        desc,
        price,
        priceVariants[]{label, price},
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

  let sanityProjects: HomeProject[] = [];
  try {
    sanityProjects = await client.fetch<HomeProject[]>(`
      *[_type == "b2bProject"] | order(tanggal desc)[0...12]{
        _id,
        type,
        namaBarang,
        namaPT,
        photo {
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
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RevealOnScroll />

      <Hero />
      <StatsStrip />
      <FeaturedProducts />
      <WhyEfloor />
      <Solutions />
      <CategoryBento />
      <ProjectsMarquee projects={sanityProjects} />
      <HowToUse />
      <ProductGrid products={sanityProducts} />
      <FAQSection
        aside={
          <div className="mt-8 p-6 rounded-[28px] bg-white shadow-e1">
            <b className="block text-[17px]">Masih ada pertanyaan?</b>
            <p className="text-muted text-[14.5px] mt-1 mb-4">
              Tim kami siap bantu hitung kebutuhan lem proyek Anda.
            </p>
            <WhatsAppButton
              source="home-faq"
              variant="plain"
              className="inline-flex items-center gap-2.5 h-[42px] px-[18px] rounded-full bg-brand-gradient text-white text-sm font-semibold shadow-cta hover:-translate-y-0.5 transition-transform"
            >
              <WhatsAppDot />
              Chat tim EFLOOR
            </WhatsAppButton>
          </div>
        }
      />
      <ClosingCta />
    </div>
  );
}
