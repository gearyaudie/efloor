import { client } from "@/sanity.client";
import { MetadataRoute } from "next";
import { Post } from "./blogs/page";
import { SITE_URL } from "./seo.config";
import { VERTICAL_PAGES } from "./static/verticals";

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
    url: `${SITE_URL}/blogs/${post.slug}`,
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

  const verticalUrls = VERTICAL_PAGES.map((page) => ({
    url: `${SITE_URL}${page.href}`,
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
      url: `${SITE_URL}/harga-lem-vinyl-karpet`,
      lastModified: new Date(),
    },
    ...verticalUrls,
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
