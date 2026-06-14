import { Metadata } from "next";
import Link from "next/link";
import FaqSectionHPL from "../components/FaqSectionHPL";

export default function LemHPL() {
  return (
    <>
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center gap-10 px-4 my-16 md:my-20 max-w-[1200px] mx-auto">
        <div className="flex-1 flex justify-center">
          <img
            src="/img/Lem-hpl-banner.png"
            alt="Lem HPL EFLOOR"
            className="w-full max-w-[500px] h-auto"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl mb-4 font-semibold">
            Lem HPL EFLOOR — Daya Rekat Kuat, Cepat Kering, Mudah Diaplikasikan
          </h1>
          <h3 className="text-base md:text-lg leading-relaxed">
            Lem HPL EFLOOR dirancang khusus untuk pemasangan HPL, veneer, PVC
            sheet, MDF, multiplek, dan berbagai material interior furniture.
            Ideal untuk kitchen set, kabinet, meja, dan produksi furniture
            harian — cukup oles di satu sisi, lebih hemat dan lebih praktis.
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

      <FaqSectionHPL />

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
                Daya Rekat Kuat & Tahan Lama
              </h3>
              <div className="text-[#808080] text-center">
                Lem HPL EFLOOR memberikan daya rekat yang kuat dan tahan lama
                pada berbagai material interior — HPL, veneer, PVC sheet, MDF,
                multiplek, hingga particle board. Tidak mudah mengelupas
                meskipun digunakan setiap hari.
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white max-w-[300px] p-6 min-h-[500px]">
            <img src="/img/kpk-2.png" alt="" className="w-[150px] mx-auto" />
            <h3 className="mt-16 mb-4 font-semibold text-center text-2xl">
              Cepat Tack, Cepat Menempel
            </h3>
            <div className="text-[#808080] text-center">
              Formula lem HPL kami memiliki waktu tack yang cepat sehingga
              proses pemasangan lebih efisien. Cocok untuk tukang, workshop
              furniture, dan produksi kabinet atau kitchen set berskala harian.
            </div>
          </div>
          <div className="rounded-lg bg-white max-w-[300px] p-6 min-h-[500px]">
            <img src="/img/kpk-3.png" alt="" className="w-[150px] mx-auto" />
            <h3 className="mt-16 mb-4 font-semibold text-center text-2xl">
              Cukup Oles Satu Sisi
            </h3>
            <div className="text-[#808080] text-center">
              Berbeda dengan lem lain yang harus dioleskan di dua permukaan, Lem
              HPL EFLOOR cukup diaplikasikan pada salah satu sisi saja. Lebih
              hemat, lebih mudah diratakan, dan tetap menghasilkan sambungan
              yang kuat.
            </div>
          </div>
          <div className="rounded-lg bg-white max-w-[300px] p-6 min-h-[500px]">
            <img src="/img/kpk-4.png" alt="" className="w-[150px] mx-auto" />
            <h3 className="mt-16 mb-4 font-semibold text-center text-2xl">
              Serbaguna untuk Furniture
            </h3>
            <div className="text-[#808080] text-center">
              Dari kitchen set, kabinet, meja, hingga panel interior dan
              produksi custom furniture — Lem HPL EFLOOR siap untuk semua
              kebutuhan. Kami adalah pilihan terpercaya kontraktor dan pengrajin
              furniture di seluruh Indonesia.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Lem HPL Berkualitas | Daya Rekat Kuat untuk Furniture & Interior - EFLOOR",

    description:
      "Lem HPL EFLOOR: daya rekat kuat, cepat kering, cukup oles satu sisi. Cocok untuk HPL, veneer, PVC sheet, MDF, multiplek, kitchen set, kabinet, dan produksi furniture harian.",

    keywords: [
      "lem hpl",
      "lem hpl berkualitas",
      "lem hpl furniture",
      "lem hpl kitchen set",
      "lem hpl multiplek",
      "lem hpl mdf",
      "lem hpl veneer",
      "lem hpl pvc sheet",
      "lem hpl daya rekat kuat",
      "lem hpl efloor",
      "lem untuk hpl",
      "lem furniture indonesia",
      "lem kitchen set",
      "lem kabinet",
      "lem interior panel",
    ],

    alternates: {
      canonical: "https://www.efloor.id/lem-hpl",
    },
  };
}
