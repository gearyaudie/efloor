import { client } from "@/sanity.client";
import { MetadataRoute } from "next";
import { SITE_URL } from "./seo.config";
import { VERTICAL_PAGES } from "./static/verticals";
import { ACCESSORY_PAGES } from "./static/accessories";

// Rebuilt hourly, so new articles and products reach Google without a deploy.
export const revalidate = 3600;

type Entry = { slug: string; _updatedAt?: string };

// Only slugs and dates: the sitemap never needs article bodies.
async function fetchEntries(type: "post" | "product"): Promise<Entry[]> {
  try {
    return await client.fetch<Entry[]>(
      `*[_type == $type && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
      { type },
    );
  } catch (err) {
    // A Sanity outage must not take the whole sitemap down with it: fall back
    // to the static pages rather than returning an error to Google.
    console.error("Sanity fetch error:", err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, products] = await Promise.all([fetchEntries("post"), fetchEntries("product")]);

  const blogUrls = posts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
  }));

  const productUrls = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: product._updatedAt ? new Date(product._updatedAt) : new Date(),
  }));

  const verticalUrls = VERTICAL_PAGES.map((page) => ({
    url: `${SITE_URL}${page.href}`,
    lastModified: new Date(),
  }));

  const accessoryUrls = ACCESSORY_PAGES.map((page) => ({
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
    {
      url: `${SITE_URL}/katalog`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/kontak`,
      lastModified: new Date(),
    },
    ...verticalUrls,
    ...accessoryUrls,
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
