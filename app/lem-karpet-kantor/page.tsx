import { Metadata } from "next";
import Image from "next/image";
import WhatsAppButton from "../components/WhatsAppButton";
import { SITE_URL } from "../seo.config";
import FaqSectionKantor from "../components/FaqSectionKantor";
import Breadcrumbs from "../components/Breadcrumbs";
import RelatedVerticals from "../components/RelatedVerticals";

export default function LemKarpetKantor() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Lem Karpet Kantor" }]}
      />
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center gap-10 px-4 my-16 md:my-20 max-w-[1200px] mx-auto">
        <div className="flex-1 flex justify-center">
          <Image
            src="/img/karpet-kantor.webp"
            alt="Lem Karpet Untuk Lantai Kantor di Perkantoran"
            width={846}
            height={564}
            className="w-full max-w-[500px] h-auto"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl mb-4 font-semibold">
            Lem Karpet Kantor: Lem Karpet Waterbased & Eco Friendly Untuk
            Perkantoran
          </h1>
          <h3 className="text-base md:text-lg leading-relaxed">
            Lem karpet EFLOOR ideal untuk pemasangan lantai karpet perkantoran:
            water-based, hampir tanpa VOC, tidak berbau, dan aman untuk ruangan
            ber-AC. Rekat kuat, profesional, dan ramah lingkungan.
          </h3>
          <div className="pt-8">
            <WhatsAppButton product="Lem Karpet Kantor" source="landing-hero">
              Dapatkan Sekarang!
            </WhatsAppButton>
          </div>
        </div>
      </div>

      <FaqSectionKantor />

      {/* Section 2 */}
      <div className="flex flex-col max-w-[800px] mx-auto text-center px-4 pb-12 pt-10 md:pt-16"></div>
      <div className="bg-[#f4f4f4] p-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center mb-12 mt-4">
          Kenapa pilih kami?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 justify-items-center max-w-[1300px] mx-auto">
          <div className="rounded-2xl bg-white max-w-[300px] p-6 min-h-[420px] flex flex-col items-center gap-4">
            <div>
              <Image
                src="/img/kpk-1.png"
                alt="Ikon lem waterbased ramah lingkungan"
                width={150}
                height={150}
                className="w-[150px] mx-auto"
              />
              <h3 className="font-semibold text-center text-2xl">
                Eco Friendly, Ramah Lingkungan
              </h3>
              <div className="text-[#808080] text-center">
                Lem waterbased dan cocok untuk ruangan indoor. Dengan komposisi
                waterbased, lem ini dapat menempel dengan kuat tanpa basis
                solven dan tetap menjadi pilihan yang ramah lingkungan.
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white max-w-[300px] p-6 min-h-[420px] flex flex-col items-center gap-4">
            <Image
              src="/img/kpk-2.png"
              alt="Ikon rendah VOC (Volatile Organic Compounds)"
              width={150}
              height={150}
              className="w-[150px] mx-auto"
            />
            <h3 className="font-semibold text-center text-2xl">
              Hampir Tidak Mengandung VOC
            </h3>
            <div className="text-[#808080] text-center">
              Ramah lingkungan dan sangat rendah dalam VOC (Volatile Organic
              Compounds), yaitu uap yang bisa menganggu kesehatan, pernapasan
              dan iritasi mata.
            </div>
          </div>
          <div className="rounded-2xl bg-white max-w-[300px] p-6 min-h-[420px] flex flex-col items-center gap-4">
            <Image
              src="/img/kpk-3.png"
              alt="Ikon lem tidak berbau"
              width={150}
              height={150}
              className="w-[150px] mx-auto"
            />
            <h3 className="font-semibold text-center text-2xl">Tidak Berbau</h3>
            <div className="text-[#808080] text-center">
              Lem Vinyl EFLOOR tidak memiliki bau yang menyengat. Jauh lebih
              tidak bau dibandingkan dengan lem berbasis solvent atau lem
              kuning. Jadi sangat cocok untuk pemakaian indoor, untuk kantor dan
              rumah sakit.
            </div>
          </div>
          <div className="rounded-2xl bg-white max-w-[300px] p-6 min-h-[420px] flex flex-col items-center gap-4">
            <Image
              src="/img/kpk-4.png"
              alt="Ikon harga lebih hemat"
              width={150}
              height={150}
              className="w-[150px] mx-auto"
            />
            <h3 className="font-semibold text-center text-2xl">Lebih Hemat</h3>
            <div className="text-[#808080] text-center">
              Kualitas kami sangat terpercaya, kami adalah lem vinyl dengan
              penjualan terbanyak di platform shopee dan tokopedia se-Indonesia.
              Dapatkan lebih banyak pengunaan per m2 dengan produk terpercaya
              kami.
            </div>
          </div>
        </div>
      </div>

      <RelatedVerticals currentHref="/lem-karpet-kantor" />

      {/* <MarketingGrid /> */}
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Lem Karpet Perkantoran | Lem Lantai Karpet Anti VOC & Tahan Lama - EFLOOR",

    description:
      "Lem karpet EFLOOR ideal untuk pemasangan lantai karpet perkantoran: water-based, hampir tanpa VOC, tidak berbau, dan aman untuk ruangan ber-AC. Rekat kuat, profesional, dan ramah lingkungan.",

    keywords: [
      "lem karpet perkantoran",
      "lem lantai karpet kantor",
      "lem karpet anti voc",
      "lem karpet tidak berbau",
      "lem karpet water based",
      "lem lantai kantor",
      "lem karpet eco friendly",
      "lem karpet efloor",
      "lem karpet tile perkantoran",
      "lem karpet terbaik indonesia",
    ],
    alternates: {
      canonical: `${SITE_URL}/lem-karpet-kantor`,
    },
  };
}
