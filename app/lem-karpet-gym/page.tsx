import { Metadata } from "next";
import { SITE_URL } from "../seo.config";
import FaqSectionGym from "../components/FaqSectionGym";
import FaqAside from "../components/FaqAside";
import VerticalLandingPage from "../components/vertical/VerticalLandingPage";
import { VERTICALS } from "../static/verticalContent";

export default function LemKarpetGym() {
  return (
    <VerticalLandingPage
      vertical="gym"
      faq={
        <FaqSectionGym
          aside={<FaqAside source="landing-faq" product={VERTICALS.gym.whatsappProduct} />}
        />
      }
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Lem Karpet Gym | Lem Lantai Rubber & Vinyl Pusat Kebugaran - EFLOOR",

    description:
      "Lem EFLOOR dirancang untuk pemasangan lantai karpet dan rubber gym: daya rekat ekstrakuat, tahan beban berat, water-based dan aman untuk ruangan tertutup. Solusi lantai gym profesional dan terpercaya.",

    keywords: [
      "lem karpet gym",
      "lem lantai gym",
      "lem rubber gym",
      "lem lantai pusat kebugaran",
      "lem karpet fitness center",
      "lem lantai vinyl gym",
      "lem gym water based",
      "lem karpet efloor",
      "lem lantai rubber fitness",
      "lem gym terbaik indonesia",
    ],
    alternates: {
      canonical: `${SITE_URL}/lem-karpet-gym`,
    },
  };
}
