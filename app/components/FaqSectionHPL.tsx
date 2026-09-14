import Faq from "./Faq";

const faqs = [
  {
    question: "Apa itu Lem HPL EFLOOR dan untuk apa digunakan?",
    answer:
      "Lem HPL EFLOOR adalah lem berkualitas tinggi yang dirancang khusus untuk pemasangan HPL (High Pressure Laminate), veneer, PVC sheet, MDF, multiplek, dan particle board. Produk ini ideal untuk kebutuhan furniture interior seperti kitchen set, kabinet, meja, panel dekoratif, dan produksi custom furniture harian.",
  },
  {
    question: "Apa saja material yang bisa direkatkan dengan Lem HPL EFLOOR?",
    answer:
      "Lem HPL EFLOOR kompatibel dengan berbagai material interior, antara lain: HPL ke multiplek, MDF, atau particle board; veneer dan laminate; PVC sheet dan panel dekoratif; serta kayu, papan, dan material interior lainnya. Cocok untuk hampir semua kebutuhan pemasangan furniture dan interior.",
  },
  {
    question: "Apakah Lem HPL EFLOOR harus dioleskan di dua sisi?",
    answer:
      "Tidak. Salah satu keunggulan utama Lem HPL EFLOOR adalah cukup dioleskan pada satu sisi permukaan saja. Ini membuat proses pemasangan lebih cepat, lebih hemat lem, dan tetap menghasilkan daya rekat yang kuat dan tahan lama.",
  },
  {
    question: "Bagaimana cara menggunakan Lem HPL EFLOOR dengan benar?",
    answer:
      "Cara penggunaannya: (1) Bersihkan permukaan dari debu, minyak, dan air terlebih dahulu. (2) Oleskan lem secara merata pada salah satu permukaan. (3) Tunggu hingga lem setengah kering atau terasa tacky. (4) Tempelkan HPL atau material lainnya, lalu tekan merata menggunakan roller atau tekanan manual yang kuat.",
  },
  {
    question: "Berapa lama waktu tunggu sebelum HPL bisa ditempel?",
    answer:
      "Tunggu hingga lem terasa setengah kering atau tacky di permukaan — biasanya beberapa menit tergantung suhu dan kelembapan ruangan. Setelah lem terasa lengket namun tidak basah, segera tempelkan HPL dan tekan rata agar daya rekat optimal.",
  },
  {
    question: "Apakah Lem HPL EFLOOR tahan panas?",
    answer:
      "Ya, Lem HPL EFLOOR memiliki ketahanan terhadap panas ringan sehingga cocok untuk penggunaan di area seperti kitchen set dan kabinet dapur yang terpapar suhu hangat. Formulasinya juga dirancang agar tidak mudah mengelupas meski digunakan secara intensif.",
  },
  {
    question:
      "Apakah Lem HPL EFLOOR cocok untuk produksi furniture skala besar?",
    answer:
      "Ya. Lem HPL EFLOOR dirancang untuk memenuhi kebutuhan tukang, workshop furniture, maupun produksi skala besar. Dengan formula cepat tack, mudah diratakan, dan hemat pemakaian karena cukup satu sisi, produktivitas pengerjaan furniture menjadi lebih tinggi.",
  },
  {
    question: "Di mana bisa membeli Lem HPL EFLOOR?",
    answer:
      "Lem HPL EFLOOR tersedia melalui WhatsApp kami, kunjungan langsung ke toko, atau melalui Shopee dan Tokopedia dengan nama toko efloor.id. Untuk kebutuhan volume besar seperti produksi furniture atau proyek interior, hubungi tim kami via WhatsApp untuk konsultasi dan harga terbaik.",
  },
];

export default function FaqSectionHPL() {
  return (
    <Faq
      items={faqs}
      sectionId="faq-lem-hpl"
      ariaLabel="Pertanyaan yang Sering Diajukan tentang Lem HPL"
      title="Pertanyaan Seputar Lem HPL EFLOOR"
      subtitle="Temukan jawaban lengkap seputar Lem HPL EFLOOR — keunggulan, cara pakai, material yang cocok, hingga cara pembelian."
    />
  );
}
