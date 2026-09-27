import { Metadata } from "next";
import { SITE_URL } from "../seo.config";
import FaqSectionJakartaTimur from "../components/FaqSectionJakartaTimur";
import FaqAside from "../components/FaqAside";
import VerticalLandingPage from "../components/vertical/VerticalLandingPage";
import { VERTICALS } from "../static/verticalContent";

export default function LemVinylKarpetJakartaTimur() {
  return (
    <VerticalLandingPage
      vertical="jakartaTimur"
      faq={
        <FaqSectionJakartaTimur
          aside={<FaqAside source="landing-faq" product={VERTICALS.jakartaTimur.whatsappProduct} />}
        />
      }
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Lem Vinyl & Lem Karpet Jakarta Timur | Distributor & Pabrik - EFLOOR",

    description:
      "EFLOOR melayani distribusi Lem Vinyl dan Lem Karpet ke Jakarta Timur untuk kebutuhan pabrik, distributor, kontraktor, dan procurement/tender. Waterbased, daya rekat kuat, siap kirim volume besar.",

    keywords: [
      "lem vinyl jakarta timur",
      "lem karpet jakarta timur",
      "distributor lem vinyl jakarta timur",
      "distributor lem karpet jakarta timur",
      "supplier lem vinyl jakarta timur",
      "supplier lem karpet jakarta timur",
      "pabrik lem karpet jakarta timur",
      "lem vinyl untuk pabrik jakarta timur",
      "lem karpet untuk distributor jakarta timur",
      "harga lem vinyl jakarta timur",
    ],
    alternates: {
      canonical: `${SITE_URL}/lem-vinyl-karpet-jakarta-timur`,
    },
  };
}
