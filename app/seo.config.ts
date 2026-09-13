// seo.config.ts

// Single source of truth for the canonical host. Confirmed against the
// Netlify dashboard: efloor.id (non-www) is the primary domain, and
// www.efloor.id auto-redirects to it at the platform level — do not add an
// app-level redirect in the other direction (efloor.id -> www), that
// creates a redirect loop with Netlify's own www -> apex redirect.
// Everything else (layout, robots.ts, sitemap.ts) reads from this
// constant, so flipping the domain is a one-line change here.
export const SITE_URL = "https://efloor.id";

const defaultSeo = {
  title:
    "Efloor Indonesia | Supplier/Distributor Lem Karpet & Lem Vinyl, List Siku L",
  description:
    "Kami adalah supplier lem karpet ternama, dengan fokus untuk procurement dan pemenang tendor. Berdiri sejak 1990, Efloor telah menyediakan berbagai solusi pertukangan/home decor untuk client kami, retail maupun projek/kontraktor/procurement",
  openGraph: {
    url: SITE_URL,
    title:
      "Efloor Indonesia | Supplier / Distributor Lem Karpet & List Vinyl/SPC",
    description:
      "Kami adalah supplier lem karpet ternama, dengan fokus pengunaan untuk procurement dan pemenang tendor",
    images: [
      {
        url: `${SITE_URL}/img/og-image.png`,
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
  canonical: `${SITE_URL}/`,
};

export default defaultSeo;
