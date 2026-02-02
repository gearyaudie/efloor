import { Metadata } from "next";
import { useRouter } from "next/navigation";

export default function Projects() {
  const router = useRouter();
  return (
    <div className="max-w-[1300px] mx-auto my-20 flex flex-col justify-center items-center px-6">
      <div className="text-[40px] font-medium text-center">
        For Procurement & Contractors
      </div>
      <div className="text-[#535353] text-center max-w-[700px] lg:mt-2 mt-4">
        Kami adalah distirbutor lem vinyl/karpet yang terpercaya. Menangani
        segala kebutuhan projek dan procurement dengan harga yang bersaing.
        Telah melayani kontraktor, proyek dan procurement dengan tingkat
        kepuasan tinggi.
      </div>
      <div>
        <button
          className="bg-[#FF8E06] py-3 px-4 shadow-md text-white ml-4 p-2 rounded-lg mt-2 mt-8  hover:cursor-pointer"
          onClick={() =>
            window.open(
              "https://api.whatsapp.com/send/?phone=628561153725&text&type=phone_number&app_absent=0",
              "_",
            )
          }
        >
          Dapatkan Quotation Sekarang!
        </button>
      </div>
      <div>
        <img
          src="/img/projects-img.png"
          alt=""
          className="max-w-[800px] my-12 w-[400px] lg:w-full"
        />
      </div>
      <hr className="w-full max-w-[800px] py-4 border-[#ccc]" />
      <div>
        <div className="text-[28px] font-medium">
          Lem Karpet/Vinyl Efloor Max
        </div>
        <div className="my-4 max-w-[700px]">
          Tersedia dalam kemasan 4 KG dan 20 KG, jenis paling populer & pilihan
          terbaik untuk <b>procurement dan kontraktor</b>. Semua data,
          kelengkapan dan keperluan, telah tersedia di tombol berikut:
        </div>

        <div className="flex gap-4 mt-6">
          <button
            className="bg-[#FF8E06] py-3 px-4 shadow-md text-white  p-2 rounded-lg hover:cursor-pointer"
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/15Ma2yiZkQkYtoDQAT7LvYCfoPAPD3sIC/view?usp=drive_link",
                "_",
              )
            }
          >
            Cek MSDS
          </button>
          <button
            className="border-1 border-[#FF8E06] py-3 px-4 shadow-md text-[#FF8E06]  p-2 rounded-lg hover:cursor-pointer"
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/1kuyz5bfRQuqw37A8tSlYyHDhmZFmyWH0/view?usp=drive_link",
                "_",
              )
            }
          >
            Cek TDS
          </button>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
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
      canonical: "https://www.efloor.id/projects",
    },
  };
}
