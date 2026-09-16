import { client } from "@/sanity.client";
import { MetadataRoute } from "next";
import { Post } from "./blogs/page";
import { SITE_URL } from "./seo.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    url: `${SITE_URL}/blogs/${post.slug.current}`,
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
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/lem-vinyl-rumah-sakit`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/lem-karpet-gym`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/lem-lapangan-badminton`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/lem-hpl-pvc-sheet`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/lem-karpet-kantor`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/lem-vinyl-karpet-tangerang`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/lem-vinyl-karpet-jakarta-timur`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/lem-karpet-masjid`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/about-us`,
      lastModified: new Date(),
    },
    ...productUrls,
    ...blogUrls,
  ];
}
