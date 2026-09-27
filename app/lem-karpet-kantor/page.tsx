import { Metadata } from "next";
import { SITE_URL } from "../seo.config";
import FaqSectionKantor from "../components/FaqSectionKantor";
import FaqAside from "../components/FaqAside";
import VerticalLandingPage from "../components/vertical/VerticalLandingPage";
import { VERTICALS } from "../static/verticalContent";

export default function LemKarpetKantor() {
  return (
    <VerticalLandingPage
      vertical="kantor"
      faq={
        <FaqSectionKantor
          aside={<FaqAside source="landing-faq" product={VERTICALS.kantor.whatsappProduct} />}
        />
      }
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Lem Karpet Perkantoran | Lem Lantai Karpet Anti VOC & Tahan Lama - EFLOOR",

    description:
      "Lem karpet EFLOOR ideal untuk pemasangan lantai karpet perkantoran: water-based, hampir tanpa VOC, tidak berbau, dan aman untuk ruangan ber-AC. Rekat kuat, profesional, dan ramah lingkungan.",

    keywords: [
      "lem karpet perkantoran",
      "lem lantai karpet kantor",
      "lem karpet anti voc",
      "lem karpet tidak berbau",
      "lem karpet water based",
      "lem lantai kantor",
      "lem karpet eco friendly",
      "lem karpet efloor",
      "lem karpet tile perkantoran",
      "lem karpet terbaik indonesia",
    ],
    alternates: {
      canonical: `${SITE_URL}/lem-karpet-kantor`,
    },
  };
}
