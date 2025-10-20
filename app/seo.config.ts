// seo.config.ts
const defaultSeo = {
  title: "Efloor Indonesia | Lantai SPC & Lem Premium",
  description:
    "Kami menyediakan lantai SPC, lem tufting dan aksesoris lantai berkualitas.",
  openGraph: {
    url: "https://www.efloor.id",
    title: "Efloor Indonesia | Lantai SPC & Lem Premium",
    description:
      "Kami menyediakan lantai SPC, lem tufting dan aksesoris lantai berkualitas.",
    images: [
      {
        url: "https://efloor.id/img/header-logo.png",
        width: 1200,
        height: 630,
        alt: "Efloor",
      },
    ],
    siteName: "Efloor",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    handle: "@efloor",
    site: "@efloor",
    cardType: "summary_large_image",
  },
  canonical: "https://www.efloor.id/",
};

export default defaultSeo;
