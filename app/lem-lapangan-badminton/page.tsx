import { Metadata } from "next";
import { SITE_URL } from "../seo.config";
import FaqSectionBadminton from "../components/FaqSectionBadminton";
import FaqAside from "../components/FaqAside";
import VerticalLandingPage from "../components/vertical/VerticalLandingPage";
import { VERTICALS } from "../static/verticalContent";

export default function LemLapanganBadminton() {
  return (
    <VerticalLandingPage
      vertical="badminton"
      faq={
        <FaqSectionBadminton
          aside={<FaqAside source="landing-faq" product={VERTICALS.badminton.whatsappProduct} />}
        />
      }
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Lem Lapangan Badminton | Lem Lantai Vinyl & Karpet Olahraga - EFLOOR",

    description:
      "Lem EFLOOR cocok untuk pemasangan lapangan badminton: daya rekat kuat, water-based, tahan beban dan gesekan intensif. Pilihan terbaik untuk lantai vinyl dan karpet lapangan olahraga indoor.",

    keywords: [
      "lem lapangan badminton",
      "lem lantai vinyl olahraga",
      "lem karpet lapangan badminton",
      "lem lantai badminton",
      "lem vinyl lapangan indoor",
      "lem olahraga water based",
      "lem lantai gym badminton",
      "lem vinyl efloor",
      "lem lantai pvc olahraga",
      "lem vinyl terbaik indonesia",
    ],

    alternates: {
      canonical: `${SITE_URL}/lem-lapangan-badminton`,
    },
  };
}
