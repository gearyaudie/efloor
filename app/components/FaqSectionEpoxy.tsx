import type { ReactNode } from "react";
import Faq from "./Faq";
import { rupiah } from "../lib/format";
import { PRICE_LIST_UPDATED, priceProduct } from "../static/priceList";

const epoxy = priceProduct("epoxy");
const list = epoxy.sizes.map((s) => `set ${s.label.toLowerCase()} ${rupiah(s.price)}`).join(" dan ");

const faqs = [
  {
    question: "Apakah harga sudah termasuk Resin dan Hardener?",
    answer:
      "Ya. Harga dan berat yang tertera adalah untuk 1 set lengkap: Resin (A) + Hardener (B). Set 500 gr berisi 250 gr Resin dan 250 gr Hardener; set 2,8 KG berisi 1,4 kg Resin dan 1,4 kg Hardener.",
  },
  {
    question: "Berapa harga Lem Epoxy EFLOOR?",
    answer: `Harga toko per ${PRICE_LIST_UPDATED}: ${list}. Untuk pembelian rutin workshop atau produksi, hubungi kami via WhatsApp untuk harga grosir.`,
  },
  {
    question: "Apa arti non-sag?",
    answer:
      "Non-sag artinya lem tidak meleleh atau turun setelah dioles, sehingga tetap di tempat pada bidang tegak dan sambungan sudut saat dijepit.",
  },
  {
    question: "Bagaimana cara mencampur lem epoxy ini?",
    answer:
      "Timbang Resin (A) dan Hardener (B) dengan perbandingan 1 : 1 berdasarkan berat, lalu aduk sampai warnanya rata. Campur secukupnya saja dan segera gunakan.",
  },
  {
    question: "Berapa lama lem epoxy mengeras?",
    answer: "Sekitar 3–4 jam. Biarkan sambungan tetap dijepit sampai lem keras.",
  },
  {
    question: "Lem epoxy ini cocok untuk apa saja?",
    answer:
      "Untuk sambungan kayu seperti tenon dan sudut 45° (mitre) pada furnitur, kusen dan bingkai. Lem ini juga serbaguna untuk merekatkan kayu, logam, dan kaca.",
  },
  {
    question: "Apakah garis lemnya terlihat setelah kering?",
    answer: "Tidak. Garis lem pada sambungan tidak terlihat, sehingga hasil sambungan tetap rapi.",
  },
  {
    question: "Set mana yang harus saya beli, 500 gr atau 2,8 KG?",
    answer:
      "Set 500 gr cocok untuk perbaikan, hobi, dan pekerjaan kecil. Set 2,8 KG untuk workshop dan produksi furnitur dengan banyak sambungan, dengan harga per kg yang lebih hemat.",
  },
  {
    question: "Di mana bisa membeli Lem Epoxy EFLOOR?",
    answer:
      "Tersedia di toko EFLOOR Kelapa Gading, Jakarta Utara, via WhatsApp, serta di Shopee dan Tokopedia (efloor.id). Kami melayani pengiriman ke seluruh Indonesia.",
  },
];

export default function FaqSectionEpoxy({ aside }: { aside?: ReactNode } = {}) {
  return (
    <Faq
      items={faqs}
      sectionId="faq-lem-epoxy"
      ariaLabel="Pertanyaan yang Sering Diajukan tentang Lem Epoxy EFLOOR"
      title="Pertanyaan seputar lem epoxy"
      subtitle="Harga per set, cara campur, waktu keras, dan pilihan kemasan."
      aside={aside}
    />
  );
}
