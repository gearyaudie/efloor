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

  // Fetch all products live from Sanity instead of hardcoding slugs, so the
  // sitemap can never drift out of sync with what actually exists.
  const products: { slug: string }[] = await client.fetch(
    `*[_type == "product" && defined(slug.current)]{
      "slug": slug.current
    }`,
  );

  const productUrls = products.map((product) => ({
    url: `https://efloor.id/products/${product.slug}`,
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
      url: "https://efloor.id/lem-vinyl-rumah-sakit",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/lem-karpet-gym",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/lem-lapangan-badminton",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/lem-hpl-pvc-sheet",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/lem-karpet-kantor",
      lastModified: new Date(),
    },
    {
      url: "https://efloor.id/blogs",
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
    ...productUrls,
    ...blogUrls,
  ];
}
