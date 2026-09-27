import { Metadata } from "next";
import { SITE_URL } from "../seo.config";
import FaqSectionMasjid from "../components/FaqSectionMasjid";
import FaqAside from "../components/FaqAside";
import VerticalLandingPage from "../components/vertical/VerticalLandingPage";
import { VERTICALS } from "../static/verticalContent";

export default function LemKarpetMasjid() {
  return (
    <VerticalLandingPage
      vertical="masjid"
      faq={
        <FaqSectionMasjid
          aside={<FaqAside source="landing-faq" product={VERTICALS.masjid.whatsappProduct} />}
        />
      }
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Lem Karpet Masjid | Lem Pemasangan Karpet Masjid Tahan Lama - EFLOOR",

    description:
      "Lem EFLOOR dirancang untuk pemasangan karpet masjid dan mushola: daya rekat ekstrakuat, tahan lalu lintas jamaah padat, water-based dan hampir tidak berbau. Cocok untuk renovasi masjid berskala besar.",

    keywords: [
      "lem karpet masjid",
      "lem karpet masjid terbaik",
      "lem pasang karpet masjid",
      "lem karpet mushola",
      "distributor lem karpet masjid",
      "supplier lem karpet masjid",
      "harga lem karpet masjid",
      "lem waterbased karpet masjid",
      "lem karpet efloor masjid",
      "lem karpet untuk masjid dan mushola",
    ],
    alternates: {
      canonical: `${SITE_URL}/lem-karpet-masjid`,
    },
    openGraph: {
      title:
        "Lem Karpet Masjid | Lem Pemasangan Karpet Masjid Tahan Lama - EFLOOR",
      description:
        "Lem EFLOOR dirancang untuk pemasangan karpet masjid dan mushola: daya rekat ekstrakuat, tahan lalu lintas jamaah padat, water-based dan hampir tidak berbau. Cocok untuk renovasi masjid berskala besar.",
      url: `${SITE_URL}/lem-karpet-masjid`,
      images: [
        {
          url: `${SITE_URL}/img/projects-img.png`,
          width: 1293,
          height: 726,
          alt: "Instalasi Lem Karpet EFLOOR untuk proyek karpet masjid dan mushola",
        },
      ],
    },
  };
}
