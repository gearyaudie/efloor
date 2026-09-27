import { Metadata } from "next";
import { SITE_URL } from "../seo.config";
import FaqSectionTangerang from "../components/FaqSectionTangerang";
import FaqAside from "../components/FaqAside";
import VerticalLandingPage from "../components/vertical/VerticalLandingPage";
import { VERTICALS } from "../static/verticalContent";

export default function LemVinylKarpetTangerang() {
  return (
    <VerticalLandingPage
      vertical="tangerang"
      faq={
        <FaqSectionTangerang
          aside={<FaqAside source="landing-faq" product={VERTICALS.tangerang.whatsappProduct} />}
        />
      }
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Lem Vinyl & Lem Karpet Tangerang | Distributor & Pabrik - EFLOOR",

    description:
      "EFLOOR melayani distribusi Lem Vinyl dan Lem Karpet ke Tangerang untuk kebutuhan pabrik, distributor, kontraktor, dan procurement/tender. Waterbased, daya rekat kuat, siap kirim volume besar.",

    keywords: [
      "lem vinyl tangerang",
      "lem karpet tangerang",
      "distributor lem vinyl tangerang",
      "distributor lem karpet tangerang",
      "supplier lem vinyl tangerang",
      "supplier lem karpet tangerang",
      "pabrik lem karpet tangerang",
      "lem vinyl untuk pabrik tangerang",
      "lem karpet untuk distributor tangerang",
      "harga lem vinyl tangerang",
    ],
    alternates: {
      canonical: `${SITE_URL}/lem-vinyl-karpet-tangerang`,
    },
  };
}
