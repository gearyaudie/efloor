import { Metadata } from "next";
import Image from "next/image";
import Button from "../components/Button";
import { SITE_URL } from "../seo.config";
import FaqSectionMasjid from "../components/FaqSectionMasjid";
import Breadcrumbs from "../components/Breadcrumbs";
import RelatedVerticals from "../components/RelatedVerticals";

export default function LemKarpetMasjid() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Lem Karpet Masjid" }]}
      />
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center gap-10 px-4 my-16 md:my-20 max-w-[1200px] mx-auto">
        <div className="flex-1 flex justify-center">
          <Image
            src="/img/projects-img.png"
            alt="Instalasi Lem Karpet EFLOOR untuk proyek karpet masjid dan mushola"
            width={1293}
            height={726}
            className="w-full max-w-[500px] h-auto"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl mb-4 font-semibold">
            Lem Karpet Masjid: Lem Waterbased untuk Pemasangan Karpet Masjid
            yang Tahan Lama
          </h1>
          <h3 className="text-base md:text-lg leading-relaxed">
            Lem EFLOOR dirancang untuk pemasangan karpet masjid dan mushola:
            daya rekat ekstrakuat, tahan lalu lintas jamaah yang padat,
            water-based dan hampir tidak berbau — aman untuk ruang ibadah
            tertutup.
          </h3>
          <div className="pt-8">
            <Button href="https://api.whatsapp.com/send/?phone=628561153725&text&type=phone_number&app_absent=0">
              Dapatkan Sekarang!
            </Button>
          </div>
        </div>
      </div>

      <FaqSectionMasjid />

      {/* Section 2 */}
      <div className="flex flex-col max-w-[800px] mx-auto text-center px-4 pb-12 pt-10 md:pt-16"></div>
      <div className="bg-[#f4f4f4] p-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center mb-12 mt-4">
          Kenapa pilih kami?
        </h2>
        <div className="flex justify-center items-center gap-10">
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
              kuning. Jadi sangat cocok untuk ruang ibadah tertutup seperti
              masjid dan mushola.
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
              Tersedia kemasan 4 KG dan 20 KG untuk kebutuhan renovasi masjid
              berskala besar dengan harga bersaing.
            </div>
          </div>
        </div>
      </div>

      <RelatedVerticals currentHref="/lem-karpet-masjid" />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Lem Karpet Masjid | Lem Pemasangan Karpet Masjid Tahan Lama - EFLOOR",

    description:
      "Lem EFLOOR dirancang untuk pemasangan karpet masjid dan mushola: daya rekat ekstrakuat, tahan lalu lintas jamaah padat, water-based dan hampir tidak berbau. Cocok untuk renovasi masjid berskala besar.",

    keywords: [
      "lem karpet masjid",
      "lem karpet masjid terbaik",
      "lem pasang karpet masjid",
      "lem karpet mushola",
      "distributor lem karpet masjid",
      "supplier lem karpet masjid",
      "harga lem karpet masjid",
      "lem waterbased karpet masjid",
      "lem karpet efloor masjid",
      "lem karpet untuk masjid dan mushola",
    ],
    alternates: {
      canonical: `${SITE_URL}/lem-karpet-masjid`,
    },
  };
}
