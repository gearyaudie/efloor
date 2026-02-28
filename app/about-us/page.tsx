import { Metadata } from "next";
import Link from "next/link";
import MarketingGrid from "../components/MarketingGrid";

export default function AboutUs() {
  return (
    <>
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center gap-10 px-4 my-16 md:my-20 max-w-[1200px] mx-auto">
        <div className="flex-1 flex justify-center">
          <img
            src="/img/about-us-efloor.png"
            alt="About Efloor"
            className="w-full max-w-[500px] h-auto"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="text-2xl md:text-3xl mb-4 font-semibold">
            Awal Perjalanan & Lahirnya Efloor
          </div>
          <div className="text-base md:text-lg leading-relaxed">
            Ini adalah masa awal perjalanan kami. Sejak tahun 2010, kami telah
            memasok ribuan pelanggan dengan produk lantai berkualitas tinggi.
            Kepercayaan pelanggan kami bangun melalui toko fisik yang berlokasi
            di Mall Artha Gading, tepatnya di lantai 5 dekat Informa. Dari
            sinilah perjalanan kami dimulai.
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col max-w-[800px] mx-auto text-center px-4 pb-12 pt-10 md:pt-16">
        <div className="text-2xl md:text-3xl font-semibold mb-4">Saat Ini</div>
        <div className="text-base md:text-lg leading-relaxed">
          Untuk menjaga harga tetap terjangkau, kami memutuskan untuk tidak
          membuka toko fisik tambahan. Dengan cara ini, biaya operasional dapat
          ditekan sehingga kami bisa memberikan harga terbaik bagi pelanggan.
          Hasilnya sangat luar biasa! Kini, produk kami tersedia untuk pembelian
          secara online maupun melalui WhatsApp.
        </div>
      </div>

      <MarketingGrid />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Tentang EFLOOR | Distributor Flooring & Lem Vinyl Jakarta Sejak 2010",

    description:
      "Kenali perjalanan EFLOOR sejak 2010 sebagai distributor flooring dan lem vinyl terpercaya di Jakarta. Dari toko fisik di Mall Artha Gading hingga melayani pembelian online dan WhatsApp dengan harga terbaik untuk pelanggan.",

    keywords: [
      "tentang efloor",
      "profil perusahaan efloor",
      "sejarah efloor",
      "distributor flooring jakarta",
      "supplier lantai vinyl jakarta",
      "distributor lem vinyl jakarta",
      "perusahaan flooring indonesia",
      "toko lantai mall artha gading",
      "supplier lantai terpercaya jakarta",
      "efloor sejak 2010",
      "distributor lantai proyek jakarta",
      "supplier lantai dan lem vinyl",
    ],

    alternates: {
      canonical: "https://www.efloor.id/about-us",
    },
  };
}
