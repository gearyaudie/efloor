import type { ReactNode } from "react";
import Faq from "./Faq";
import { rupiah } from "../lib/format";
import { PRICE_LIST_UPDATED, priceProduct } from "../static/priceList";

const pu = priceProduct("pu");
const list = pu.sizes.map((s) => `${s.label.toLowerCase()} ${rupiah(s.price)}`).join(" dan ");

const faqs = [
  {
    question: "Lem apa yang dipakai untuk lapangan padel?",
    answer:
      "Sambungan rumput sintetis lapangan padel umumnya direkatkan dengan lem polyurethane (PU) di atas seaming tape. Lem PU EFLOOR dibuat untuk rumput sintetis: tahan air, cepat kering, dan bisa dipakai indoor maupun outdoor.",
  },
  {
    question: "Berapa harga lem lapangan padel EFLOOR?",
    answer: `Harga toko per ${PRICE_LIST_UPDATED}: ${list}. Untuk kontraktor yang mengerjakan beberapa lapangan, hubungi kami via WhatsApp untuk harga proyek.`,
  },
  {
    question: "Kemasan mana yang harus saya beli, 450 gram atau 33 KG?",
    answer:
      "Botol 450 gram dengan moncong runcing cocok untuk perbaikan sambungan yang terbuka, rumput hiasan, taman, dan bata ringan skala kecil. Jeriken 33 KG untuk pemasangan lapangan padel baru dan proyek kontraktor, dengan harga per kg yang lebih hemat.",
  },
  {
    question: "Apakah Lem PU EFLOOR tahan hujan dan bisa untuk lapangan outdoor?",
    answer:
      "Ya. Lem PU EFLOOR tahan air dan bisa digunakan untuk area indoor maupun outdoor, sehingga cocok untuk lapangan padel terbuka maupun beratap.",
  },
  {
    question: "Bagaimana cara memakai lem untuk sambungan rumput sintetis?",
    answer:
      "Bersihkan area dari debu, minyak, air, atau kotoran. Oleskan lem tipis saja di salah satu permukaan — jangan terlalu banyak karena lem akan mengembang saat mengering. Tempelkan kedua bahan yang ingin direkatkan, lalu diamkan sampai kering.",
  },
  {
    question: "Kenapa lem harus dioles tipis?",
    answer:
      "Lem polyurethane mengembang saat mengering dan mengisi celah. Itu membuat sambungan rapat, tetapi lem yang terlalu banyak bisa naik ke permukaan rumput. Oles tipis dan merata sudah cukup.",
  },
  {
    question: "Apakah lem ini bisa untuk rumput sintetis taman atau dekorasi?",
    answer:
      "Bisa. Selain lapangan padel, Lem PU EFLOOR cocok untuk rumput hiasan di taman, balkon, rooftop, dan dekorasi interior.",
  },
  {
    question: "Apakah Lem PU EFLOOR bisa untuk bata ringan?",
    answer: "Ya, label kemasan mencantumkan penggunaan untuk batu bata ringan selain rumput sintetis.",
  },
  {
    question: "Di mana bisa membeli lem lapangan padel EFLOOR?",
    answer:
      "Tersedia di toko EFLOOR Kelapa Gading, Jakarta Utara, via WhatsApp, serta di Shopee dan Tokopedia (efloor.id). Kami melayani pengiriman ke seluruh Indonesia, termasuk ke lokasi proyek lapangan.",
  },
];

export default function FaqSectionPadel({ aside }: { aside?: ReactNode } = {}) {
  return (
    <Faq
      items={faqs}
      sectionId="faq-lem-lapangan-padel"
      ariaLabel="Pertanyaan yang Sering Diajukan tentang Lem Lapangan Padel dan Rumput Sintetis"
      title="Pertanyaan seputar lem lapangan padel"
      subtitle="Harga, pilihan kemasan, cara pakai, dan penggunaan untuk rumput sintetis maupun bata ringan."
      aside={aside}
    />
  );
}
