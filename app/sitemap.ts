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
    ...blogUrls,
  ];
}
