import { Metadata } from "next";
import Link from "next/link";

export default function LemLapanganBadminton() {
  return (
    <>
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center gap-10 px-4 my-16 md:my-20 max-w-[1200px] mx-auto">
        <div className="flex-1 flex justify-center">
          <img
            src="/img/lapangan-badminton.png"
            alt="Lantai Karpet Gym"
            className="w-full max-w-[500px] h-auto"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl mb-4 font-semibold">
            Lem Vinyl & Karpet Untuk Pemasangan Lapangan Badminton
          </h1>
          <h3 className="text-base md:text-lg leading-relaxed">
            Lem EFLOOR cocok untuk pemasangan lapangan badminton: daya rekat
            kuat, water-based, tahan beban dan gesekan intensif. Pilihan terbaik
            untuk lantai vinyl dan karpet lapangan olahraga indoor.
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
      "Lem Lapangan Badminton | Lem Lantai Vinyl & Karpet Olahraga - EFLOOR",

    description:
      "Lem EFLOOR cocok untuk pemasangan lapangan badminton: daya rekat kuat, water-based, tahan beban dan gesekan intensif. Pilihan terbaik untuk lantai vinyl dan karpet lapangan olahraga indoor.",

    keywords: [
      "lem lapangan badminton",
      "lem lantai vinyl olahraga",
      "lem karpet lapangan badminton",
      "lem lantai badminton",
      "lem vinyl lapangan indoor",
      "lem olahraga water based",
      "lem lantai gym badminton",
      "lem vinyl efloor",
      "lem lantai pvc olahraga",
      "lem vinyl terbaik indonesia",
    ],

    alternates: {
      canonical: "https://www.efloor.id/lem-lapangan-badminton",
    },
  };
}
