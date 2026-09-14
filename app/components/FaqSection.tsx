import Faq from "./Faq";
import { PRICING_FAQ_ITEMS } from "../static/pricingFaq";

const faqs = [
  {
    question: "Apakah Lem Vinyl EFLOOR ramah lingkungan?",
    answer:
      "Ya, Lem Vinyl EFLOOR adalah lem ramah lingkungan berbasis air (waterbased) yang hampir tidak mengandung VOC (Volatile Organic Compounds) dan bebas solvent. Aman digunakan di area sensitif seperti rumah sakit, sekolah, dan ruang kantor.",
  },
  {
    question: "Apakah Lem Vinyl EFLOOR tidak berbau?",
    answer:
      "Berbeda dengan lem kuning solvent yang berbau menyengat, Lem Vinyl EFLOOR berbasis air sehingga baunya sangat minimal dan tidak mengganggu. Cocok untuk pemasangan di perkantoran, rumah sakit, dan ruang dalam (indoor) tanpa perlu ventilasi berlebihan.",
  },
  {
    question: "Bagaimana cara menggunakan Lem Vinyl / Karpet EFLOOR?",
    answer:
      "Cara penggunaannya sangat mudah: oleskan lem secara merata pada satu permukaan, kemudian tunggu hingga warna lem berubah menjadi bening — biasanya sekitar 30 menit hingga 1 jam. Setelah itu, tempelkan vinyl atau karpet pada permukaan yang telah diolesi lem.",
  },
  {
    question: "Apa itu Lem Vinyl / Karpet EFLOOR?",
    answer:
      "Lem Vinyl EFLOOR adalah merek lem khusus pemasangan vinyl dan karpet yang telah menjadi pilihan utama kontraktor dan instalator di seluruh Indonesia. EFLOOR merupakan seller dengan penjualan lem vinyl terbanyak di Shopee dan Tokopedia se-Indonesia.",
  },
  {
    question: "Di mana bisa membeli Lem Vinyl / Karpet EFLOOR?",
    answer:
      "Lem Vinyl EFLOOR dapat dibeli melalui beberapa cara: langsung via WhatsApp, datang ke toko kami, atau melalui platform marketplace seperti Shopee dan Tokopedia dengan nama toko efloor.id.",
  },
  {
    question: "Lem Vinyl & Karpet EFLOOR digunakan untuk apa saja?",
    answer:
      "Lem EFLOOR cocok untuk berbagai kebutuhan pemasangan lantai dan karpet, antara lain: carpet tile, carpet roll, vinyl tile, vinyl roll, karpet gym (karet), vinyl rumah sakit, vinyl lapangan badminton, dan berbagai aplikasi lantai indoor lainnya.",
  },
  {
    question: "Apa perbedaan Lem EFLOOR dan Lem EFLOOR MAX?",
    answer:
      "Perbedaan utama terletak pada tingkat kekentalan dan daya rekat. Lem EFLOOR MAX memiliki viskositas yang lebih tinggi (lebih kental) serta daya rekat yang lebih kuat — ideal untuk proyek berskala besar atau area dengan intensitas penggunaan tinggi.",
  },
  ...PRICING_FAQ_ITEMS,
];

export default function FAQSection() {
  return (
    <Faq
      items={faqs}
      sectionId="faq"
      ariaLabel="Pertanyaan yang Sering Diajukan"
      title="Pertanyaan yang Sering Diajukan"
      subtitle="Temukan jawaban seputar Lem Vinyl & Karpet EFLOOR — produk, cara pakai, hingga tempat pembelian."
    />
  );
}
