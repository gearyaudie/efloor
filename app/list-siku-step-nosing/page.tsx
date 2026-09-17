import { Metadata } from "next";
import TrimLandingPage from "../components/TrimLandingPage";
import { SITE_URL } from "../seo.config";

const PAGE_HREF = "/list-siku-step-nosing";

export default function ListSikuStepNosing() {
  return (
    <TrimLandingPage
      productSlug="list-siku-efloor"
      pageHref={PAGE_HREF}
      breadcrumb="List Siku L & Step Nosing"
      heading="List Siku L & Step Nosing PVC EFLOOR untuk Tangga, Lantai Vinyl, dan Wallpanel WPC"
      intro="List siku L PVC EFLOOR merapikan ujung anak tangga, tepi lantai kayu atau vinyl, dan sisi wallpanel WPC. Tebal, kuat, tidak mudah patah, tersedia dalam 3 ukuran dan lebih dari 15 pilihan warna."
      whatsappProduct="List Siku L / Step Nosing EFLOOR"
      imageAlt="List Siku L PVC EFLOOR untuk step nosing tangga dan penutup wallpanel WPC"
      priceHeading="Ukuran & Harga List Siku L EFLOOR"
      priceNote="Tersedia ukuran L8, L15, dan L30. Belum yakin ukuran yang cocok dengan ketebalan lantai atau panel Anda? Tanyakan tim kami via WhatsApp."
      priceQuestionSubject="List Siku L EFLOOR"
      usesHeading="Untuk Apa List Siku L Digunakan?"
      uses={[
        {
          title: "Step Nosing Anak Tangga",
          text: "Menutup dan melindungi ujung anak tangga yang dilapisi vinyl atau kayu, sehingga tepi tangga lebih rapi dan tidak mudah terkelupas.",
        },
        {
          title: "Tepi Lantai Kayu & Vinyl",
          text: "Finishing pada batas lantai kayu, vinyl, atau SPC agar tepi dan sambungan lantai terlihat bersih.",
        },
        {
          title: "Penutup Wallpanel WPC",
          text: "Menutup sisi dan sudut wallpanel WPC sehingga pemasangan panel dinding terlihat selesai dan rapi.",
        },
      ]}
      faqTitle="Pertanyaan Seputar List Siku L & Step Nosing"
      faqSubtitle="Harga, ukuran, pilihan warna, dan pengiriman List Siku L EFLOOR."
      faqs={[
        {
          question: "Apakah List Siku L bisa dipakai sebagai step nosing tangga?",
          answer:
            "Bisa. Step nosing adalah penutup ujung anak tangga. List Siku L EFLOOR berbentuk L sehingga dapat dipasang di ujung anak tangga yang dilapisi vinyl atau kayu, sekaligus bisa dipakai sebagai penutup tepi lantai dan wallpanel WPC.",
        },
        {
          question: "Berapa pilihan warna List Siku L EFLOOR?",
          answer:
            "List Siku L EFLOOR tersedia dalam lebih dari 15 pilihan warna. Hubungi tim kami via WhatsApp untuk melihat katalog warna yang tersedia dan memilih yang paling sesuai dengan lantai atau panel Anda.",
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
    title: "List Siku L & Step Nosing PVC | Tangga, Vinyl & WPC - EFLOOR",
    description:
      "List Siku L PVC EFLOOR untuk step nosing tangga, tepi lantai kayu & vinyl, dan penutup wallpanel WPC. Tersedia ukuran L8, L15, L30 dan 15+ pilihan warna. Kirim ke seluruh Indonesia.",
    alternates: { canonical: `${SITE_URL}${PAGE_HREF}` },
  };
}
