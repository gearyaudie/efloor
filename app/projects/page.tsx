import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL } from "../seo.config";
import WhatsAppButton from "../components/WhatsAppButton";
import Breadcrumbs from "../components/Breadcrumbs";
import RelatedVerticals from "../components/RelatedVerticals";
import FaqSectionProjects from "../components/FaqSectionProjects";
import { PROJECT_CASE_STUDIES } from "../static/projectCaseStudies";

export default function Projects() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />
      <div className="max-w-[1300px] mx-auto my-20 flex flex-col justify-center items-center px-6">
        <h1 className="text-[40px] font-medium text-center">
          Supplier &amp; Distributor Lem Vinyl dan <br />
          Karpet untuk Proyek
        </h1>
        <h2 className="text-[#535353] text-center max-w-[700px] lg:mt-6">
          Kami adalah distributor lem vinyl/karpet yang terpercaya. Menangani
          segala kebutuhan projek dan procurement dengan harga yang bersaing.
          Telah melayani kontraktor, proyek dan procurement dengan tingkat
          kepuasan tinggi.
        </h2>
        <div>
          <WhatsAppButton
            product="penawaran harga untuk proyek"
            source="projects-quotation"
            variant="plain"
            className="inline-block bg-[#FF8E06] py-3 px-4 shadow-md text-white ml-4 rounded-lg mt-8 hover:cursor-pointer"
          >
            Dapatkan Quotation Sekarang!
          </WhatsAppButton>
        </div>
        <div>
          <Image
            src="/img/projects-img.png"
            alt="Proyek pemasangan lem vinyl dan lem karpet EFLOOR untuk kontraktor dan procurement"
            width={1293}
            height={726}
            className="max-w-[800px] my-12 w-[400px] lg:w-full h-auto"
          />
        </div>
        <hr className="w-full max-w-[800px] py-4 border-[#ccc]" />
        <div>
          <h2 className="text-[28px] font-medium">
            Lem Karpet/Vinyl Efloor Max
          </h2>
          <h3 className="my-4 max-w-[700px]">
            Tersedia dalam kemasan 4 KG dan 20 KG, jenis paling populer &
            pilihan terbaik untuk <b>procurement dan kontraktor</b>. Semua data,
            kelengkapan dan keperluan (TDS dan MSDS), sudah lengkap, hubungi
            Whatsapp kami untuk info lebih lanjut.
          </h3>

          <div className="flex gap-4 mt-6">
            <Link href="/docs/msds.pdf">
              <button className="bg-[#FF8E06] py-3 px-4 shadow-md text-white  p-2 rounded-lg hover:cursor-pointer">
                Cek MSDS
              </button>
            </Link>
            <Link href="/docs/tds.pdf">
              <button className="border-1 border-[#FF8E06] py-3 px-4 shadow-md text-[#FF8E06]  p-2 rounded-lg hover:cursor-pointer">
                Cek TDS
              </button>
            </Link>
          </div>
        </div>
        <hr className="w-full max-w-[800px] py-4 border-[#ccc] mt-8" />
        <div>
          <div className="font-medium text-[30px] pb-4 max-w-[800px] mx-auto text-center">
            History Proyek Kami
          </div>
          <p className="text-[#808080] text-center max-w-[700px] mx-auto mb-8">
            Sebagian riwayat pengiriman procurement Lem Vinyl &amp; Lem Karpet
            EFLOOR ke berbagai perusahaan dan kontraktor.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
            {PROJECT_CASE_STUDIES.map((item) => (
              <div
                key={item.image}
                className="rounded-2xl border border-[#e8e8e8] overflow-hidden bg-white"
              >
                <Image
                  src={item.image}
                  alt={`${item.label} ${item.product} untuk ${item.client}`}
                  width={700}
                  height={700}
                  className="w-full h-auto"
                />
                <div className="p-4 text-left">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#FF8E06] mb-1">
                    {item.label}
                  </div>
                  <div className="font-medium text-[#1a1a1a]">
                    {item.client}
                  </div>
                  <div className="text-sm text-[#808080] mt-1">
                    {item.product} &middot; {item.quantity}
                  </div>
                  <div className="text-xs text-[#808080] mt-2">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FaqSectionProjects />
      <RelatedVerticals currentHref="/projects" />
    </>
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
