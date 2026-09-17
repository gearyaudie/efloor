import { Metadata } from "next";
import TrimLandingPage from "../components/TrimLandingPage";
import { SITE_URL } from "../seo.config";

const PAGE_HREF = "/list-adaptasi-transisi";

export default function ListAdaptasiTransisi() {
  return (
    <TrimLandingPage
      productSlug="list-adaptasi"
      pageHref={PAGE_HREF}
      breadcrumb="List Adaptasi / Transisi"
      heading="List Adaptasi / List Transisi EFLOOR untuk Lantai Beda Ketinggian"
      intro="List adaptasi (reducer) EFLOOR menjadi transisi yang rapi di antara dua lantai dengan ketinggian berbeda, misalnya di bawah pintu. Material PVC kuat, tebal, dan tidak mudah patah — cocok untuk parket, kayu, vinyl, dan SPC."
      whatsappProduct="List Adaptasi / Transisi EFLOOR"
      imageAlt="List Adaptasi reducer PVC EFLOOR untuk transisi lantai beda ketinggian"
      priceHeading="Harga List Adaptasi EFLOOR"
      priceNote="Harga per batang. Hubungi tim kami via WhatsApp untuk memastikan list adaptasi cocok dengan selisih ketinggian lantai Anda."
      priceQuestionSubject="List Adaptasi EFLOOR"
      usesHeading="Di Mana List Adaptasi Dipasang?"
      uses={[
        {
          title: "Transisi di Bawah Pintu",
          text: "Menjembatani pertemuan dua ruangan dengan jenis lantai berbeda tepat di bawah kusen pintu.",
        },
        {
          title: "Lantai Beda Ketinggian",
          text: "Profil reducer membuat perbedaan ketinggian lantai menjadi landai, lebih rapi, dan lebih aman dilalui.",
        },
        {
          title: "Parket, Kayu, Vinyl & SPC",
          text: "Cocok sebagai transisi untuk lantai parket, kayu, vinyl, dan SPC di rumah maupun proyek interior.",
        },
      ]}
      faqTitle="Pertanyaan Seputar List Adaptasi / Transisi"
      faqSubtitle="Harga, fungsi, jenis lantai, dan pengiriman List Adaptasi EFLOOR."
      faqs={[
        {
          question: "Apa itu list adaptasi atau list transisi?",
          answer:
            "List adaptasi (juga disebut list transisi, list pintu, atau reducer) adalah profil yang dipasang di pertemuan dua lantai dengan ketinggian berbeda, agar sambungannya rapi dan tidak membuat tersandung.",
        },
        {
          question: "List Adaptasi EFLOOR cocok untuk lantai apa saja?",
          answer:
            "List Adaptasi EFLOOR cocok untuk lantai parket, kayu, vinyl, dan SPC. Terbuat dari PVC yang kuat, tebal, dan tidak mudah patah.",
        },
        {
          question: "Apakah bisa dikirim ke luar Jakarta?",
          answer:
            "Bisa. Kami melayani pengiriman ke seluruh Indonesia. Hubungi tim kami via WhatsApp untuk estimasi ongkos kirim sesuai alamat dan jumlah pesanan Anda.",
        },
      ]}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "List Adaptasi / List Transisi Lantai Beda Tinggi - EFLOOR",
    description:
      "List Adaptasi (reducer) PVC EFLOOR untuk transisi lantai beda ketinggian dan bawah pintu. Cocok untuk parket, kayu, vinyl, dan SPC. Kuat dan tidak mudah patah. Kirim ke seluruh Indonesia.",
    alternates: { canonical: `${SITE_URL}${PAGE_HREF}` },
  };
}
