import { Metadata } from "next";
import TrimProductPage from "../components/trim/TrimProductPage";
import { SITE_URL } from "../seo.config";
import { TRIMS } from "../static/trims";

export const revalidate = 60; // Prices come from Sanity (ISR)

const PAGE_HREF = TRIMS.adaptasi.pageHref;

export default function ListAdaptasiTransisi() {
  return <TrimProductPage trim="adaptasi" />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "List Adaptasi / Transisi Lantai Beda Tinggi – Harga | EFLOOR",
    description:
      "List Adaptasi (reducer) PVC EFLOOR untuk sambungan vinyl–keramik, vinyl–marmer, dan lantai beda ketinggian di bawah pintu. Panjang 270 cm, tidak mudah patah. Cek harga per batang. Kirim ke seluruh Indonesia.",
    keywords: [
      "list adaptasi",
      "list transisi lantai",
      "reducer lantai",
      "list pintu lantai",
      "sambungan vinyl keramik",
      "harga list adaptasi",
    ],
    alternates: { canonical: `${SITE_URL}${PAGE_HREF}` },
  };
}
