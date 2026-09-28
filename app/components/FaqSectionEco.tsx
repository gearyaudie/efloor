import type { ReactNode } from "react";
import Faq from "./Faq";
import { rupiah } from "../lib/format";
import { PRICE_LIST_UPDATED, priceProduct } from "../static/priceList";

const eco = priceProduct("eco");
const vinyl = priceProduct("vinyl");
const list = (p: typeof eco) => p.sizes.map((s) => `${s.label} ${rupiah(s.price)}`).join(", ");

const faqs = [
  {
    question: "Berapa harga Lem Karpet & Vinyl ECO EFLOOR?",
    answer: `Harga toko per ${PRICE_LIST_UPDATED}: ${list(eco)}. Kemasan 20 KG paling hemat per kilogram. Untuk pembelian volume/proyek, hubungi kami via WhatsApp untuk harga khusus.`,
  },
  {
    question: "Apa bedanya Lem ECO dengan Lem Karpet & Vinyl EFLOOR biasa?",
    answer: `Keduanya lem waterbased untuk karpet dan vinyl dengan cara pakai dan daya sebar yang sama (±8–10 m² per kg). Lem ECO adalah pilihan yang lebih hemat — ${list(eco)} dibanding ${list(vinyl)} untuk EFLOOR reguler. Untuk area dengan lalu lintas sangat tinggi, pertimbangkan Lem EFLOOR MAX.`,
  },
  {
    question: "Lem ECO bisa dipakai untuk apa saja?",
    answer:
      "Lem Karpet & Vinyl ECO dirancang untuk pemasangan karpet tile, karpet roll, vinyl tile, dan vinyl roll — cocok untuk rumah, apartemen, kos, kantor, dan ruko.",
  },
  {
    question: "Berapa luas area yang bisa dilapisi 1 kg Lem ECO?",
    answer:
      "Sekitar 8–10 m² per kg, tergantung permukaan dan teknik aplikasi. Kemasan 4 KG cukup untuk ±32–40 m², dan 20 KG untuk ±160–200 m². Gunakan kalkulator di halaman ini untuk estimasi cepat.",
  },
  {
    question: "Bagaimana cara memakai Lem Karpet & Vinyl ECO?",
    answer:
      "Bersihkan lantai dari debu, minyak, dan kotoran. Oleskan lem di satu sisi (permukaan lantai) dengan kape bergerigi. Tunggu sampai lem berubah dari putih menjadi bening, sekitar 45 menit sampai 1 jam. Setelah bening, tempelkan karpet atau vinyl dengan rapat dan rapi.",
  },
  {
    question: "Apakah Lem ECO berbau?",
    answer:
      "Tidak berbau menyengat. Lem ECO berbasis air (waterbased), sehingga nyaman dipakai di dalam ruangan dan jauh berbeda dari lem kuning berbasis solvent.",
  },
  {
    question: "Bagaimana cara menyimpan Lem ECO?",
    answer:
      "Tutup rapat setelah dipakai, simpan di tempat sejuk dan kering, hindari sinar matahari langsung, dan jauhkan dari jangkauan anak-anak. Bila terkena mata, bilas dengan air bersih.",
  },
  {
    question: "Di mana bisa membeli Lem Karpet & Vinyl ECO?",
    answer:
      "Lem ECO tersedia di toko EFLOOR Kelapa Gading, Jakarta Utara, melalui WhatsApp, serta di Shopee dan Tokopedia (efloor.id). Kami melayani pengiriman ke seluruh Indonesia.",
  },
];

export default function FaqSectionEco({ aside }: { aside?: ReactNode } = {}) {
  return (
    <Faq
      items={faqs}
      sectionId="faq-lem-karpet-vinyl-eco"
      ariaLabel="Pertanyaan yang Sering Diajukan tentang Lem Karpet & Vinyl ECO"
      title="Pertanyaan seputar Lem Karpet & Vinyl ECO"
      subtitle="Harga, perbedaan dengan EFLOOR reguler, daya sebar, cara pakai, dan cara pembelian."
      aside={aside}
    />
  );
}
