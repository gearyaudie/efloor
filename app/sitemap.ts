import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://efloor.id",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/projects",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/blogs",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/blogs",
      lastModified: new Date(),
    },
  ];
}
