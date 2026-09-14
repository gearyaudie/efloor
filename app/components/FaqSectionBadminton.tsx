import Faq from "./Faq";

const faqs = [
  {
    question: "Apa itu Lem Lapangan Badminton EFLOOR dan untuk apa digunakan?",
    answer:
      "Lem Lapangan Badminton EFLOOR adalah lem waterbased berdaya rekat kuat yang dirancang untuk pemasangan lantai vinyl dan karpet pada lapangan badminton indoor, mampu menahan beban dan gesekan intensif dari aktivitas olahraga.",
  },
  {
    question:
      "Apakah Lem Lapangan Badminton EFLOOR tahan terhadap gesekan intensif?",
    answer:
      "Ya. Lem ini diformulasikan dengan daya rekat kuat dan tahan gesekan, sehingga cocok untuk lapangan badminton yang menerima gerakan cepat, pergeseran kaki (footwork), dan benturan berulang tanpa risiko lantai terangkat.",
  },
  {
    question:
      "Apakah Lem Lapangan Badminton EFLOOR aman digunakan di ruangan indoor?",
    answer:
      "Aman. Lem ini berbasis water-based dan hampir tidak mengandung VOC (Volatile Organic Compounds), sehingga tidak berbau menyengat dan aman digunakan di gedung olahraga (GOR) atau ruangan lapangan indoor tertutup.",
  },
  {
    question:
      "Bagaimana cara menggunakan Lem Lapangan Badminton EFLOOR dengan benar?",
    answer:
      "Cara penggunaannya: (1) Bersihkan permukaan lantai dari debu, minyak, dan air. (2) Oleskan lem secara merata menggunakan trowel bergerigi. (3) Tunggu hingga lem setengah kering atau terasa tacky. (4) Pasang lantai vinyl atau karpet, lalu tekan merata dengan roller agar daya rekat maksimal.",
  },
  {
    question: "Apakah lem ini cocok untuk lapangan olahraga indoor lainnya?",
    answer:
      "Ya, selain lapangan badminton, Lem EFLOOR juga cocok untuk pemasangan lantai vinyl dan karpet di lapangan olahraga indoor lainnya seperti futsal dan basket yang membutuhkan daya rekat kuat dan tahan lama.",
  },
  {
    question: "Di mana bisa membeli Lem Lapangan Badminton EFLOOR?",
    answer:
      "Lem Lapangan Badminton EFLOOR bisa didapatkan melalui WhatsApp kami, kunjungan langsung ke toko, atau melalui Shopee dan Tokopedia dengan nama toko efloor.id. Untuk kebutuhan proyek GOR atau lapangan olahraga berskala besar, hubungi tim kami via WhatsApp untuk konsultasi volume dan harga terbaik.",
  },
];

export default function FaqSectionBadminton() {
  return (
    <Faq
      items={faqs}
      sectionId="faq-lem-lapangan-badminton"
      ariaLabel="Pertanyaan yang Sering Diajukan tentang Lem Lapangan Badminton"
      title="Pertanyaan Seputar Lem Lapangan Badminton EFLOOR"
      subtitle="Temukan jawaban lengkap seputar Lem Lapangan Badminton EFLOOR — keunggulan, cara pakai, hingga cara pembelian."
    />
  );
}
