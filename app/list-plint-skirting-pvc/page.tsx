import { Metadata } from "next";
import TrimLandingPage from "../components/TrimLandingPage";
import { SITE_URL } from "../seo.config";

const PAGE_HREF = "/list-plint-skirting-pvc";

export default function ListPlintSkirtingPvc() {
  return (
    <TrimLandingPage
      productSlug="list-skirting"
      pageHref={PAGE_HREF}
      breadcrumb="List Plint / Skirting PVC"
      heading="List Plint / Skirting PVC EFLOOR untuk Finishing Lantai Vinyl & SPC"
      intro="List plint (skirting) PVC EFLOOR menutup pertemuan lantai dan dinding agar hasil pemasangan vinyl dan SPC terlihat rapi dan elegan. Kuat, tahan lama, dan tersedia dalam 15 warna."
      whatsappProduct="List Plint / Skirting PVC EFLOOR"
      imageAlt="List Plint Skirting PVC EFLOOR untuk finishing dinding lantai vinyl dan SPC"
      priceHeading="Harga List Plint / Skirting EFLOOR"
      priceNote="Harga per batang. Hubungi tim kami via WhatsApp untuk melihat 15 pilihan warna dan penawaran untuk kebutuhan proyek."
      priceQuestionSubject="List Plint / Skirting EFLOOR"
      usesHeading="Kenapa Pakai List Plint EFLOOR?"
      uses={[
        {
          title: "Finishing Lantai Vinyl & SPC",
          text: "Memberi batas akhir yang rapi di sepanjang dinding setelah pemasangan lantai vinyl atau SPC.",
        },
        {
          title: "Menutup Celah Tepi Lantai",
          text: "Menutup celah di tepi lantai sehingga pertemuan lantai dan dinding tampak bersih.",
        },
        {
          title: "Rumah, Kantor & Proyek Interior",
          text: "Cocok untuk renovasi rumah maupun proyek interior perkantoran dan ruang komersial, dengan 15 pilihan warna.",
        },
      ]}
      faqTitle="Pertanyaan Seputar List Plint / Skirting PVC"
      faqSubtitle="Harga, fungsi, pilihan warna, dan pengiriman List Plint EFLOOR."
      faqs={[
        {
          question: "Apa fungsi list plint atau skirting?",
          answer:
            "List plint (skirting) dipasang di bagian bawah dinding, di pertemuan antara dinding dan lantai. Fungsinya menutup celah tepi lantai dan memberi finishing yang rapi setelah pemasangan lantai vinyl atau SPC.",
        },
        {
          question: "Berapa pilihan warna List Plint EFLOOR?",
          answer:
            "List Plint EFLOOR tersedia dalam 15 pilihan warna. Hubungi tim kami via WhatsApp untuk melihat katalog warna dan memilih yang serasi dengan lantai Anda.",
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
    title: "List Plint / Skirting PVC untuk Vinyl & SPC | 15 Warna - EFLOOR",
    description:
      "List Plint / Skirting PVC EFLOOR untuk finishing pertemuan lantai dan dinding pada pemasangan vinyl & SPC. Kuat, tahan lama, tersedia 15 warna. Kirim ke seluruh Indonesia.",
    alternates: { canonical: `${SITE_URL}${PAGE_HREF}` },
  };
}
