import { Metadata } from "next";
import WhatsAppButton from "../components/WhatsAppButton";
import Breadcrumbs from "../components/Breadcrumbs";
import RelatedVerticals from "../components/RelatedVerticals";
import Faq from "../components/Faq";
import { SITE_URL } from "../seo.config";
import { PRICING_FAQ_ITEMS } from "../static/pricingFaq";

const PRICE_ROWS = [
  {
    size: "1 KG",
    price: "Rp85.000",
    coverage: "8–10 m²",
    perKg: "Rp85.000 / KG",
  },
  {
    size: "4 KG",
    price: "Rp315.000",
    coverage: "32–40 m²",
    perKg: "±Rp78.750 / KG",
  },
  {
    size: "20 KG",
    price: "Rp1.525.000",
    coverage: "160–200 m²",
    perKg: "±Rp76.250 / KG",
  },
];

const pricingPageFaqs = [
  ...PRICING_FAQ_ITEMS,
  {
    question:
      "Apakah harga di atas berlaku sama untuk Lem Vinyl dan Lem Karpet EFLOOR?",
    answer:
      "Ya, harga kemasan 4 KG dan 20 KG di atas berlaku untuk lini Lem Vinyl maupun Lem Karpet EFLOOR. Untuk kebutuhan produk spesifik seperti Lem EFLOOR MAX, hubungi tim kami via WhatsApp untuk info harga dan ketersediaan.",
  },
  {
    question: "Apakah tersedia harga khusus untuk pembelian grosir/tender?",
    answer:
      "Tersedia. Untuk pembelian dalam jumlah besar seperti kebutuhan procurement, kontraktor, dan tender, kami menyediakan penawaran harga khusus. Hubungi tim kami via WhatsApp dengan detail kebutuhan (jumlah kemasan dan lokasi pengiriman) untuk mendapatkan penawaran terbaik.",
  },
  {
    question: "Apakah harga di atas sudah termasuk ongkos kirim?",
    answer:
      "Harga di atas adalah harga produk. Biaya dan estimasi waktu pengiriman tergantung lokasi dan volume pesanan — hubungi tim kami via WhatsApp untuk perhitungan ongkos kirim sesuai alamat Anda.",
  },
];

export default function HargaLemVinylKarpet() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Harga Lem Vinyl & Karpet" },
        ]}
      />

      <div className="max-w-[800px] mx-auto px-4 my-16 md:my-20 text-center">
        <h1 className="text-2xl md:text-3xl mb-4 font-semibold">
          Harga Lem Vinyl &amp; Lem Karpet EFLOOR Terbaru
        </h1>
        <h3 className="text-base md:text-lg leading-relaxed text-[#555555]">
          Berikut harga referensi Lem Vinyl / Lem Karpet EFLOOR untuk kemasan 1
          KG, 4 KG, dan 20 KG, lengkap dengan estimasi luas area yang bisa dilapisi.
          Harga dapat berubah sewaktu-waktu — hubungi kami via WhatsApp untuk
          harga terbaru dan penawaran khusus pembelian dalam jumlah besar.
        </h3>
        <div className="pt-8">
          <WhatsAppButton product="harga Lem Vinyl & Karpet" source="pricing-hero">
            Tanyakan Harga Sekarang!
          </WhatsAppButton>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-4 pb-12">
        <div className="overflow-x-auto rounded-2xl border border-[#e8e8e8]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f4f4f4]">
                <th className="px-5 py-4 font-semibold">Kemasan</th>
                <th className="px-5 py-4 font-semibold">Harga</th>
                <th className="px-5 py-4 font-semibold">Estimasi Cakupan</th>
                <th className="px-5 py-4 font-semibold">Harga per KG</th>
              </tr>
            </thead>
            <tbody>
              {PRICE_ROWS.map((row) => (
                <tr key={row.size} className="border-t border-[#e8e8e8]">
                  <td className="px-5 py-4 font-medium">{row.size}</td>
                  <td className="px-5 py-4">{row.price}</td>
                  <td className="px-5 py-4">{row.coverage}</td>
                  <td className="px-5 py-4">{row.perKg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#808080] text-center mt-4">
          Kemasan 20 KG lebih ekonomis per kg-nya — pilihan tepat untuk
          procurement, kontraktor, dan proyek volume besar. Estimasi cakupan
          berdasarkan 8–10 m² per KG, tergantung jenis permukaan dan teknik
          aplikasi.
        </p>
      </div>

      <Faq
        items={pricingPageFaqs}
        sectionId="faq-harga-lem-vinyl-karpet"
        ariaLabel="Pertanyaan yang Sering Diajukan tentang Harga Lem Vinyl dan Lem Karpet"
        title="Pertanyaan Seputar Harga Lem Vinyl & Lem Karpet EFLOOR"
        subtitle="Temukan jawaban lengkap seputar harga, cakupan area, dan penawaran khusus pembelian dalam jumlah besar."
      />

      <RelatedVerticals currentHref="/harga-lem-vinyl-karpet" />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Harga Lem Vinyl & Lem Karpet Terbaru | Price List EFLOOR",

    description:
      "Harga Lem Vinyl / Lem Karpet EFLOOR: kemasan 4 KG Rp315.000, kemasan 20 KG Rp1.525.000. Cek estimasi cakupan area dan penawaran khusus untuk pembelian grosir, procurement, dan tender.",

    keywords: [
      "harga lem vinyl",
      "harga lem karpet",
      "harga lem vinyl per kg",
      "harga lem karpet per kg",
      "harga lem vinyl 4 kg",
      "harga lem karpet 20 kg",
      "price list lem vinyl karpet",
      "harga lem vinyl grosir",
      "harga lem karpet grosir",
      "daftar harga lem vinyl karpet efloor",
    ],
    alternates: {
      canonical: `${SITE_URL}/harga-lem-vinyl-karpet`,
    },
  };
}
