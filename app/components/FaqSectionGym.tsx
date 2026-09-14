import Faq from "./Faq";

const faqs = [
  {
    question: "Apa itu Lem Karpet Gym EFLOOR dan untuk apa digunakan?",
    answer:
      "Lem Karpet Gym EFLOOR adalah lem waterbased berdaya rekat ekstrakuat yang dirancang khusus untuk pemasangan karpet tile dan lantai rubber di area gym atau pusat kebugaran. Cocok untuk area dengan beban alat fitness yang berat dan aktivitas dengan gesekan tinggi.",
  },
  {
    question: "Apakah Lem Karpet Gym EFLOOR tahan terhadap beban berat?",
    answer:
      "Ya. Lem ini diformulasikan dengan daya rekat ekstrakuat sehingga tahan terhadap beban alat gym yang berat, termasuk rak beban, treadmill, dan alat fitness lainnya, tanpa risiko karpet atau rubber terangkat.",
  },
  {
    question:
      "Apakah Lem Karpet Gym EFLOOR aman digunakan di ruangan tertutup?",
    answer:
      "Aman. Lem ini berbasis water-based dan hampir tidak mengandung VOC (Volatile Organic Compounds), sehingga tidak berbau menyengat dan aman untuk ruangan gym ber-AC atau tertutup yang digunakan banyak orang.",
  },
  {
    question: "Bagaimana cara menggunakan Lem Karpet Gym EFLOOR dengan benar?",
    answer:
      "Cara penggunaannya: (1) Bersihkan permukaan lantai dari debu, minyak, dan air. (2) Oleskan lem secara merata menggunakan trowel bergerigi. (3) Tunggu hingga lem setengah kering atau terasa tacky. (4) Pasang karpet tile atau rubber, lalu tekan merata dengan roller untuk daya rekat maksimal.",
  },
  {
    question: "Apakah lem ini cocok untuk karpet tile maupun rubber flooring?",
    answer:
      "Ya, Lem Karpet Gym EFLOOR kompatibel dengan karpet tile, rubber flooring, dan berbagai jenis matras gym lainnya, menjadikannya solusi serbaguna untuk kebutuhan lantai pusat kebugaran.",
  },
  {
    question: "Di mana bisa membeli Lem Karpet Gym EFLOOR?",
    answer:
      "Lem Karpet Gym EFLOOR bisa didapatkan melalui WhatsApp kami, kunjungan langsung ke toko, atau melalui Shopee dan Tokopedia dengan nama toko efloor.id. Untuk kebutuhan proyek gym atau fitness center berskala besar, hubungi tim kami via WhatsApp untuk konsultasi volume dan harga terbaik.",
  },
];

export default function FaqSectionGym() {
  return (
    <Faq
      items={faqs}
      sectionId="faq-lem-karpet-gym"
      ariaLabel="Pertanyaan yang Sering Diajukan tentang Lem Karpet Gym"
      title="Pertanyaan Seputar Lem Karpet Gym EFLOOR"
      subtitle="Temukan jawaban lengkap seputar Lem Karpet Gym EFLOOR — keunggulan, cara pakai, hingga cara pembelian."
    />
  );
}
