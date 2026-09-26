import Faq from "./Faq";
import WhatsAppButton from "./WhatsAppButton";
import { WhatsAppDot } from "./icons";
import { HPL_PACKS, HPL_PRICE_UPDATED, rupiah } from "../static/hpl";

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
    question: "Berapa harga Lem HPL EFLOOR?",
    answer: `Harga toko (offline) per ${HPL_PRICE_UPDATED}: ${HPL_PACKS.map(
      (p) => `${p.label} ${rupiah(p.price)}`,
    ).join(", ")}. Kemasan yang lebih besar lebih hemat per kilogram. Untuk pembelian volume/produksi rutin, hubungi kami via WhatsApp untuk harga khusus.`,
  },
  {
    question: "Apa bedanya Lem HPL EFLOOR dengan lem kuning biasa?",
    answer:
      "Lem kuning umumnya berbasis solvent, berbau menyengat, dan harus dioleskan di dua permukaan. Lem HPL EFLOOR berbasis air (waterbased), minim bau, dan cukup dioleskan di satu sisi — sehingga lebih hemat lem, lebih cepat dikerjakan, dan lebih nyaman dipakai di ruang tertutup.",
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
      subtitle="Keunggulan, cara pakai, material yang cocok, hingga harga dan cara pembelian."
      aside={<HplFaqAside />}
    />
  );
}

function HplFaqAside() {
  return (
    <div className="mt-8 p-6 rounded-[28px] bg-white shadow-e1">
      <b className="block text-[17px]">Masih ragu soal material Anda?</b>
      <p className="text-muted text-[14.5px] mt-1 mb-4">
        Kirim foto atau detail pekerjaan, tim kami bantu cek kecocokannya.
      </p>
      <WhatsAppButton
        source="hpl-faq"
        product="Lem HPL EFLOOR"
        variant="plain"
        className="inline-flex items-center gap-2.5 h-[42px] px-[18px] rounded-full bg-brand-gradient text-white text-sm font-semibold shadow-cta hover:-translate-y-0.5 transition-transform"
      >
        <WhatsAppDot />
        Konsultasi gratis
      </WhatsAppButton>
    </div>
  );
}
