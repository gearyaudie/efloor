import Faq from "./Faq";
import { PRICING_FAQ_ITEMS } from "../static/pricingFaq";

const faqs = [
  {
    question: "Apa itu Lem Karpet Masjid EFLOOR dan untuk apa digunakan?",
    answer:
      "Lem Karpet Masjid EFLOOR adalah lem waterbased berdaya rekat kuat yang dirancang untuk pemasangan karpet masjid dan mushola secara permanen ke lantai, sehingga karpet tidak bergeser atau menggelembung meski digunakan oleh banyak jamaah setiap hari.",
  },
  {
    question: "Apakah Lem Karpet Masjid EFLOOR aman digunakan di area ibadah?",
    answer:
      "Aman. Lem ini berbasis water-based dan hampir tidak mengandung VOC (Volatile Organic Compounds), sehingga tidak berbau menyengat — penting untuk ruang ibadah tertutup di mana jamaah bersujud dengan wajah dekat ke permukaan karpet.",
  },
  {
    question:
      "Apakah lem ini tahan terhadap lalu lintas jamaah yang tinggi, misalnya saat sholat Jumat atau Ramadan?",
    answer:
      "Ya. Lem Karpet Masjid EFLOOR diformulasikan dengan daya rekat ekstrakuat sehingga tetap menempel sempurna meski menerima lalu lintas jamaah yang padat, termasuk saat sholat Jumat, tarawih, dan hari besar keagamaan.",
  },
  {
    question:
      "Bagaimana cara memasang karpet masjid menggunakan Lem Karpet Masjid EFLOOR?",
    answer:
      "Cara penggunaannya: (1) Bersihkan permukaan lantai dari debu, minyak, dan air. (2) Oleskan lem secara merata menggunakan trowel bergerigi. (3) Tunggu hingga lem setengah kering atau terasa tacky. (4) Pasang karpet masjid/permadani, lalu tekan merata dengan roller agar daya rekat maksimal dan permukaan rata.",
  },
  {
    question:
      "Apakah EFLOOR bisa melayani pengadaan untuk renovasi masjid atau mushola berskala besar?",
    answer:
      "Bisa. EFLOOR terbiasa melayani kebutuhan pengadaan, kontraktor, dan panitia renovasi masjid/mushola, tersedia dalam kemasan 4 KG dan 20 KG untuk kebutuhan volume besar, lengkap dengan dokumen pendukung (TDS dan MSDS) untuk keperluan administrasi proyek.",
  },
  {
    question: "Di mana bisa membeli Lem Karpet Masjid EFLOOR?",
    answer:
      "Lem Karpet Masjid EFLOOR bisa didapatkan melalui WhatsApp kami, atau melalui Shopee dan Tokopedia dengan nama toko efloor.id. Untuk kebutuhan renovasi masjid/mushola berskala besar, hubungi tim kami via WhatsApp untuk konsultasi volume dan harga terbaik.",
  },
  ...PRICING_FAQ_ITEMS,
];

export default function FaqSectionMasjid() {
  return (
    <Faq
      items={faqs}
      sectionId="faq-lem-karpet-masjid"
      ariaLabel="Pertanyaan yang Sering Diajukan tentang Lem Karpet Masjid"
      title="Pertanyaan Seputar Lem Karpet Masjid EFLOOR"
      subtitle="Temukan jawaban lengkap seputar Lem Karpet Masjid EFLOOR — keunggulan, cara pakai, hingga cara pembelian."
    />
  );
}
