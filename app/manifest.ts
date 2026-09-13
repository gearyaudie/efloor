import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Efloor Indonesia | Supplier Lem Vinyl & Lem Karpet",
    short_name: "Efloor",
    description:
      "Supplier dan distributor lem vinyl, lem karpet, dan list siku/skirting waterbased eco-friendly di Jakarta.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#FF8E06",
    icons: [
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
