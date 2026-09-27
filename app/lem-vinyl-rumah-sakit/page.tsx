import { Metadata } from "next";
import { SITE_URL } from "../seo.config";
import FaqSectionRumahSakit from "../components/FaqSectionRumahSakit";
import FaqAside from "../components/FaqAside";
import VerticalLandingPage from "../components/vertical/VerticalLandingPage";
import { VERTICALS } from "../static/verticalContent";

export default function LemVinylRumahSakit() {
  return (
    <VerticalLandingPage
      vertical="rumahSakit"
      faq={
        <FaqSectionRumahSakit
          aside={<FaqAside source="landing-faq" product={VERTICALS.rumahSakit.whatsappProduct} />}
        />
      }
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Lem Vinyl Rumah Sakit | Lem Lantai Anti VOC & Eco Friendly - EFLOOR",

    description:
      "Lem vinyl EFLOOR cocok untuk rumah sakit: water-based, hampir tanpa VOC, tidak berbau, dan aman untuk area sensitif. Pilihan terbaik untuk pemasangan lantai vinyl indoor.",

    keywords: [
      "lem vinyl rumah sakit",
      "lem lantai vinyl anti voc",
      "lem vinyl eco friendly",
      "lem vinyl tidak berbau",
      "lem lantai rumah sakit",
      "lem vinyl water based",
      "lem vinyl aman indoor",
      "lem vinyl efloor",
      "lem lantai pvc rumah sakit",
      "lem vinyl terbaik indonesia",
    ],

    alternates: {
      canonical: `${SITE_URL}/lem-vinyl-rumah-sakit`,
    },
  };
}
