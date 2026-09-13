import type { Metadata } from "next";
import { client } from "@/sanity.client";
import Image from "next/image";
import Link from "next/link";
import RecentArticle from "../components/RecentArticles";

export const metadata: Metadata = {
  title: "Artikel & Tips Lem Vinyl, Lem Karpet | EFLOOR",
  description:
    "Kumpulan artikel dan panduan seputar pemasangan lem vinyl, lem karpet, dan list siku/skirting dari EFLOOR — tips perawatan, cara pakai, dan rekomendasi produk.",
  alternates: {
    canonical: "/blogs",
  },
};

export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  content: any[];
  img: any;
  excerpt: string;
};

export default async function Blogs() {
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

  // Get the latest post (first one)
  const latestPost = posts.length > 0 ? posts[0] : null;
  // Exclude latest from the rest
  const recentPosts = posts.slice(1);

  return (
    <div className="p-4 text-black text-center mx-auto max-w-[1300px]">
      {/* Main article */}
      {latestPost && (
        <div className="flex justify-center items-center my-20 gap-10 flex-col px-4 md:flex-row lg:flex-row">
          <div className="flex-1">
            <Link href={`/blogs/${latestPost.slug.current}`}>
              <div className="relative w-full aspect-video rounded-[20px] overflow-hidden hover:opacity-90 transition-all duration-300 cursor-pointer">
                <Image
                  src={latestPost.img?.asset?.url}
                  alt={latestPost.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          </div>
          <div className="flex-1 flex flex-col text-left">
            <div className="text-[#535353] text-[16px]">
              Home & Decor | 5 min read
            </div>
            <Link href={`/blogs/${latestPost.slug.current}`}>
              <div className="text-[28px] font-medium pt-2 hover:underline cursor-pointer md:text-[32px] lg:text-[32px]">
                {latestPost.title}
              </div>
            </Link>
            <div className="text-[#535353] text-[20px] pt-4">
              {latestPost.excerpt?.length > 150
                ? latestPost.excerpt.slice(0, 150) + "..."
                : latestPost.excerpt}
            </div>
          </div>
        </div>
      )}

      {/* Recent Articles */}
      <RecentArticle posts={recentPosts} />
    </div>
  );
}
