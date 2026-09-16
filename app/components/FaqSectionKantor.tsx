import Faq from "./Faq";
import { PRICING_FAQ_ITEMS } from "../static/pricingFaq";

const faqs = [
  {
    question: "Apa itu Lem Karpet Kantor EFLOOR dan untuk apa digunakan?",
    answer:
      "Lem Karpet Kantor EFLOOR adalah lem waterbased yang dirancang untuk pemasangan karpet lantai di area perkantoran. Formulanya eco-friendly, hampir tanpa VOC, dan tidak berbau, sehingga cocok untuk ruangan kantor ber-AC yang digunakan banyak karyawan.",
  },
  {
    question: "Apakah Lem Karpet Kantor EFLOOR aman untuk ruangan ber-AC?",
    answer:
      "Aman. Karena berbasis water-based dan hampir tidak mengandung VOC (Volatile Organic Compounds), lem ini tidak menimbulkan bau menyengat maupun uap yang mengganggu kualitas udara di ruangan kantor tertutup.",
  },
  {
    question: "Apakah lem ini cocok untuk karpet tile maupun karpet gulung?",
    answer:
      "Ya, Lem Karpet Kantor EFLOOR kompatibel dengan karpet tile maupun karpet gulung (roll carpet), menjadikannya solusi serbaguna untuk berbagai jenis pemasangan karpet perkantoran.",
  },
  {
    question:
      "Bagaimana cara menggunakan Lem Karpet Kantor EFLOOR dengan benar?",
    answer:
      "Cara penggunaannya: (1) Bersihkan permukaan lantai dari debu, minyak, dan air. (2) Oleskan lem secara merata menggunakan trowel bergerigi. (3) Tunggu hingga lem setengah kering atau terasa tacky. (4) Pasang karpet, lalu tekan merata dengan roller agar daya rekat maksimal.",
  },
  {
    question:
      "Apakah Lem Karpet Kantor EFLOOR cocok untuk proyek renovasi kantor skala besar?",
    answer:
      "Ya. Lem ini cocok untuk kebutuhan renovasi maupun fit-out kantor skala besar, termasuk untuk kontraktor dan procurement/tender, dengan daya rekat kuat dan hasil pemasangan yang rapi dan tahan lama.",
  },
  {
    question: "Di mana bisa membeli Lem Karpet Kantor EFLOOR?",
    answer:
      "Lem Karpet Kantor EFLOOR bisa didapatkan melalui WhatsApp kami, kunjungan langsung ke toko, atau melalui Shopee dan Tokopedia dengan nama toko efloor.id. Untuk kebutuhan proyek kantor berskala besar, hubungi tim kami via WhatsApp untuk konsultasi volume dan harga terbaik.",
  },
  ...PRICING_FAQ_ITEMS,
];

export default function FaqSectionKantor() {
  return (
    <Faq
      items={faqs}
      sectionId="faq-lem-karpet-kantor"
      ariaLabel="Pertanyaan yang Sering Diajukan tentang Lem Karpet Kantor"
      title="Pertanyaan Seputar Lem Karpet Kantor EFLOOR"
      subtitle="Temukan jawaban lengkap seputar Lem Karpet Kantor EFLOOR — keunggulan, cara pakai, hingga cara pembelian."
    />
  );
}
