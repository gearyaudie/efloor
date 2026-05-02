import { Metadata } from "next";
import Link from "next/link";

export default function LemVinylRumahSakit() {
  return (
    <>
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center gap-10 px-4 my-16 md:my-20 max-w-[1200px] mx-auto">
        <div className="flex-1 flex justify-center">
          <img
            src="/img/lantai-vinyl-rs.png"
            alt="Lantai Vinyl RS"
            className="w-full max-w-[500px] h-auto"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl mb-4 font-semibold">
            Kenapa Lem Vinyl EFLOOR Paling Cocok Untuk Pemasangan di Rumah Sakit
          </h1>
          <h3 className="text-base md:text-lg leading-relaxed">
            Karena lem vinyl kami eco-friendly, water-based (hampir tidak
            mengandung VOC Volatile Organic Compounds). Jadi sangat cocok untuk
            pengunaan di area yang sensitif dan pengerjaan indoor seperti di
            rumah sakit.
          </h3>
          <div className="pt-8">
            <Link href="https://api.whatsapp.com/send/?phone=628561153725&text&type=phone_number&app_absent=0">
              <button className="bg-[#FF8E06] text-white px-4 py-2 rounded-2xl hover:cursor-pointer">
                Dapatkan Sekarang!
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col max-w-[800px] mx-auto text-center px-4 pb-12 pt-10 md:pt-16"></div>
      <div className="bg-[#f4f4f4] p-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center mb-12 mt-4">
          Kenapa pilih kami?
        </h2>
        <div className="flex justify-center items-center gap-10">
          <div className="rounded-lg bg-white max-w-[300px] p-6 min-h-[500px]">
            <div>
              <img src="/img/kpk-1.png" alt="" className="w-[150px] mx-auto" />
              <h3 className="mt-16 mb-4 font-semibold text-center text-2xl">
                Eco Friendly, Ramah Lingkungan
              </h3>
              <div className="text-[#808080] text-center">
                Lem waterbased dan cocok untuk ruangan indoor. Dengan komposisi
                waterbased, lem ini dapat menempel dengan kuat tanpa basis
                solven dan tetap menjadi pilihan yang ramah lingkungan.
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white max-w-[300px] p-6 min-h-[500px]">
            <img src="/img/kpk-2.png" alt="" className="w-[150px] mx-auto" />
            <h3 className="mt-16 mb-4 font-semibold text-center text-2xl">
              Hampir Tidak Mengandung VOC
            </h3>
            <div className="text-[#808080] text-center">
              Ramah lingkungan dan sangat rendah dalam VOC (Volatile Organic
              Compounds), yaitu uap yang bisa menganggu kesehatan, pernapasan
              dan iritasi mata.
            </div>
          </div>
          <div className="rounded-lg bg-white max-w-[300px] p-6 min-h-[500px]">
            <img src="/img/kpk-3.png" alt="" className="w-[150px] mx-auto" />
            <h3 className="mt-16 mb-4 font-semibold text-center text-2xl">
              Tidak Berbau
            </h3>
            <div className="text-[#808080] text-center">
              Lem Vinyl EFLOOR tidak memiliki bau yang menyengat. Jauh lebih
              tidak bau dibandingkan dengan lem berbasis solvent atau lem
              kuning. Jadi sangat cocok untuk pemakaian indoor, untuk kantor dan
              rumah sakit.
            </div>
          </div>
          <div className="rounded-lg bg-white max-w-[300px] p-6 min-h-[500px]">
            <img src="/img/kpk-4.png" alt="" className="w-[150px] mx-auto" />
            <h3 className="mt-16 mb-4 font-semibold text-center text-2xl">
              Lebih Hemat
            </h3>
            <div className="text-[#808080] text-center">
              Kualitas kami sangat terpercaya, kami adalah lem vinyl dengan
              penjualan terbanyak di platform shopee dan tokopedia se-Indonesia.
              Dapatkan lebih banyak pengunaan per m2 dengan produk terpercaya
              kami.
            </div>
          </div>
        </div>
      </div>

      {/* <MarketingGrid /> */}
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Lem Vinyl Rumah Sakit | Lem Lantai Anti VOC & Eco Friendly - EFLOOR",

    description:
      "Lem vinyl EFLOOR cocok untuk rumah sakit: water-based, hampir tanpa VOC, tidak berbau, dan aman untuk area sensitif. Pilihan terbaik untuk pemasangan lantai vinyl indoor.",

    keywords: [
      "lem vinyl rumah sakit",
      "lem lantai vinyl anti voc",
      "lem vinyl eco friendly",
      "lem vinyl tidak berbau",
      "lem lantai rumah sakit",
      "lem vinyl water based",
      "lem vinyl aman indoor",
      "lem vinyl efloor",
      "lem lantai pvc rumah sakit",
      "lem vinyl terbaik indonesia",
    ],

    alternates: {
      canonical: "https://www.efloor.id/lem-vinyl-rumah-sakit",
    },
  };
}
