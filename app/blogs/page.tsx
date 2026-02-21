import { client } from "@/sanity.client";
import Link from "next/link";
import RecentArticle from "../components/RecentArticles";

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
              <img
                src={latestPost.img?.asset?.url}
                alt={latestPost.title}
                className="rounded-[20px] hover:opacity-90 transition-all duration-300 cursor-pointer w-fit"
              />
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
