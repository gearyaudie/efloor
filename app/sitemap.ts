import { client } from "@/sanity.client";
import { MetadataRoute } from "next";
import { Post } from "./blogs/page";

export default async function sitemap() {
  const posts: Post[] = await client.fetch(
    `*[_type == "post"]{
        _id,
        title,
        slug,
        content,
        excerpt,
        img {
          asset->{
            url
          }
        }
      }`,
  );

  // Fetch all blogs, to be put inside sitemap
  const blogUrls = posts.map((post) => ({
    url: `https://efloor.id/blogs/${post.slug}`,
    lastModified: new Date(),
  }));

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
      url: "https://efloor.id/blogs/tips-perawatan-karpet",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/blogs/lem-efloor-max",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/blogs/list-siku-l-efloor",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/blogs/list-adaptasi",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/blogs/list-plint-skirting",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/blogs/cara-pakai-lem-karpet",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/products",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/about-us",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/products/list-adaptasi",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/products/lem-kayu-wrg",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/products/lem-karpet",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/products/list-siku",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/products/lem-pu",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/products/lem-vinyl",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/products/list-skirting",
      lastModified: new Date(),
    },
  ];
}
