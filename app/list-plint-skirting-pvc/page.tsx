import { Metadata } from "next";
import TrimProductPage from "../components/trim/TrimProductPage";
import { SITE_URL } from "../seo.config";
import { TRIMS } from "../static/trims";

export const revalidate = 60; // Prices come from Sanity (ISR)

const PAGE_HREF = TRIMS.plint.pageHref;

export default function ListPlintSkirtingPvc() {
  return <TrimProductPage trim="plint" />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "List Plint / Skirting PVC 2,4 m – Harga & 15 Warna | EFLOOR",
    description:
      "List Plint / Skirting PVC EFLOOR untuk finishing pertemuan lantai dan dinding pada vinyl & SPC. Panjang 2,4 m, tidak mudah pecah, 15 warna. Cek harga per batang & hitung kebutuhan. Kirim ke seluruh Indonesia.",
    keywords: [
      "list plint",
      "skirting pvc",
      "plint lantai vinyl",
      "list plint spc",
      "harga list plint",
      "plint pvc",
      "skirting lantai",
    ],
    alternates: { canonical: `${SITE_URL}${PAGE_HREF}` },
  };
}
