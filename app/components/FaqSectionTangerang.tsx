import Faq from "./Faq";
import { PRICING_FAQ_ITEMS } from "../static/pricingFaq";

const faqs = [
  {
    question: "Apakah EFLOOR melayani distributor dan pabrik di Tangerang?",
    answer:
      "Ya. EFLOOR melayani pengiriman Lem Vinyl dan Lem Karpet ke Tangerang untuk kebutuhan distributor, pabrik, kontraktor, dan procurement/tender. Kami sudah terbiasa mengirim dalam volume besar untuk kebutuhan proyek maupun stok gudang.",
  },
  {
    question:
      "Apakah Lem Vinyl / Lem Karpet EFLOOR tersedia untuk kebutuhan pabrik dan grosir di Tangerang?",
    answer:
      "Tersedia. Kami menyediakan Lem Vinyl dan Lem Karpet EFLOOR dalam kemasan 4 KG dan 20 KG untuk kebutuhan grosir, pabrik, dan distributor di area Tangerang, dengan harga khusus untuk pembelian volume besar.",
  },
  {
    question: "Berapa lama pengiriman Lem Vinyl / Lem Karpet ke Tangerang?",
    answer:
      "Waktu pengiriman ke Tangerang umumnya 1-2 hari kerja tergantung lokasi dan volume pesanan. Untuk kebutuhan mendesak atau volume besar, hubungi tim kami via WhatsApp untuk estimasi waktu pengiriman yang lebih akurat.",
  },
  {
    question:
      "Apakah EFLOOR bisa memenuhi kebutuhan procurement dan tender di Tangerang?",
    answer:
      "Bisa. EFLOOR terbiasa melayani kebutuhan procurement, kontraktor, dan tender untuk proyek di Tangerang, lengkap dengan dokumen pendukung (TDS dan MSDS) yang dibutuhkan untuk keperluan administrasi proyek.",
  },
  {
    question:
      "Di mana bisa membeli Lem Vinyl / Lem Karpet EFLOOR di Tangerang?",
    answer:
      "Lem Vinyl / Lem Karpet EFLOOR bisa didapatkan melalui WhatsApp kami dengan pengiriman ke seluruh area Tangerang, atau melalui Shopee dan Tokopedia dengan nama toko efloor.id. Untuk kebutuhan volume besar, hubungi tim kami langsung via WhatsApp.",
  },
  ...PRICING_FAQ_ITEMS,
];

export default function FaqSectionTangerang() {
  return (
    <Faq
      items={faqs}
      sectionId="faq-lem-vinyl-karpet-tangerang"
      ariaLabel="Pertanyaan yang Sering Diajukan tentang Lem Vinyl dan Lem Karpet di Tangerang"
      title="Pertanyaan Seputar Lem Vinyl & Lem Karpet EFLOOR di Tangerang"
      subtitle="Temukan jawaban lengkap seputar Lem Vinyl & Lem Karpet EFLOOR untuk kebutuhan distributor, pabrik, dan procurement di Tangerang."
    />
  );
}
