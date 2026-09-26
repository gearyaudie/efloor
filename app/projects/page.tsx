import { Metadata } from "next";
import { client } from "@/sanity.client";
import { SITE_URL } from "../seo.config";
import Breadcrumbs from "../components/Breadcrumbs";
import RelatedVerticals from "../components/RelatedVerticals";
import FaqSectionProjects from "../components/FaqSectionProjects";
import RevealOnScroll from "../components/home/RevealOnScroll";
import ClosingCta from "../components/home/ClosingCta";
import ProjectsHero from "../components/projects/ProjectsHero";
import ClientStrip from "../components/projects/ClientStrip";
import ProjectGallery from "../components/projects/ProjectGallery";
import ProjectKit from "../components/projects/ProjectKit";
import ProcurementFlow from "../components/projects/ProcurementFlow";
import type { B2BProject } from "../components/projects/types";

export const revalidate = 60; // Cache for 60 seconds (ISR)

export default async function Projects() {
  let projects: B2BProject[] = [];
  try {
    projects = await client.fetch<B2BProject[]>(
      `*[_type == "b2bProject"] | order(tanggal desc){
        _id,
        type,
        namaBarang,
        namaPT,
        quantity,
        tanggal,
        photo {
          asset->{
            url
          }
        }
      }`,
    );
  } catch (err) {
    console.error("Sanity fetch error:", err);
  }

  return (
    <div className="bg-paper">
      <RevealOnScroll />
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />
      <ProjectsHero projects={projects} />
      <ClientStrip projects={projects} />
      <ProcurementFlow />
      <ProjectGallery projects={projects} />
      <ProjectKit />
      <div className="pt-[72px] lg:pt-[104px]">
        <FaqSectionProjects />
      </div>
      <ClosingCta
        title="Punya proyek atau tender yang sedang berjalan?"
        lede="Kirim kebutuhan volume dan lokasi proyek Anda. Kami siapkan penawaran harga beserta dokumen pendukungnya."
        source="projects-closing"
        product="penawaran harga untuk proyek"
      />
      <RelatedVerticals currentHref="/projects" />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Procurement Lem Vinyl & Lem Karpet | Distributor Grosir untuk Kontraktor & Proyek PT – EFLOOR",

    description:
      "EFLOOR adalah distributor lem vinyl dan lem karpet khusus untuk kebutuhan procurement, kontraktor, dan proyek skala besar. Melayani bulk purchase lem vinyl putih dan lem karpet untuk tender PT, gedung perkantoran, hotel, rumah sakit, dan proyek interior. Produk industri: Lem Vinyl Putih EFLOOR MAX dan Lem Karpet kualitas proyek dengan harga grosir Jakarta.",

    keywords: [
      // Core procurement intent
      "procurement lem vinyl",
      "procurement lem karpet",
      "supplier lem vinyl proyek",
      "supplier lem karpet proyek",
      "vendor lem vinyl PT",

      // Contractor-focused
      "lem vinyl untuk kontraktor",
      "lem karpet untuk kontraktor",
      "distributor lem vinyl kontraktor",
      "distributor lem karpet kontraktor",

      // Bulk & wholesale
      "bulk purchase lem vinyl",
      "bulk purchase lem karpet",
      "grosir lem vinyl jakarta",
      "grosir lem karpet jakarta",
      "wholesale lem vinyl indonesia",

      // Product branding
      "lem vinyl putih efloor max",
      "lem karpet efloor max",
      "distributor resmi lem efloor",

      // Use-case SEO
      "lem vinyl untuk proyek gedung",
      "lem vinyl untuk hotel",
      "lem vinyl untuk rumah sakit",
      "lem karpet proyek interior",

      // Location
      "supplier lem vinyl jakarta",
      "supplier lem karpet jakarta",
      "distributor lem vinyl indonesia",
    ],

    alternates: {
      canonical: `${SITE_URL}/projects`,
    },
  };
}
