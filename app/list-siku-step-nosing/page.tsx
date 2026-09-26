import { Metadata } from "next";
import TrimProductPage from "../components/trim/TrimProductPage";
import { SITE_URL } from "../seo.config";
import { TRIMS } from "../static/trims";

export const revalidate = 60; // Prices come from Sanity (ISR)

const PAGE_HREF = TRIMS.siku.pageHref;

export default function ListSikuStepNosing() {
  return <TrimProductPage trim="siku" />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "List Siku L & Step Nosing PVC – Harga L8, L15, L30 | EFLOOR",
    description:
      "List Siku L PVC EFLOOR untuk step nosing tangga, tepi lantai kayu & vinyl, dan penutup wallpanel WPC. Ukuran L8, L15, L30, panjang 270 cm, 15+ warna. Cek harga per batang & hitung kebutuhan. Kirim ke seluruh Indonesia.",
    keywords: [
      "list siku l",
      "step nosing tangga",
      "list tangga pvc",
      "list siku pvc",
      "list penutup wpc",
      "end moulding",
      "harga list siku",
      "list siku l8",
      "list siku l15",
      "list siku l30",
    ],
    alternates: { canonical: `${SITE_URL}${PAGE_HREF}` },
  };
}
