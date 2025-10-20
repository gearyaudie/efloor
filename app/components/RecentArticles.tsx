"use client";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  img?: { asset?: { url?: string } };
};

export default function RecentArticle({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="pb-20">
      <div className="text-[40px] font-semibold text-left pt-16 pb-8">
        Recent Articles
      </div>
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post._id}>
            <div className="flex flex-col items-center justify-center text-center w-[375px]">
              <img
                src={post.img?.asset?.url ?? "/img/blog-placeholder.png"}
                alt={post.title}
                className="w-[375px] h-[220px] object-cover rounded-t-[24px]"
              />

              <Link href={`/blogs/${post.slug.current}`}>
                <div className="bg-[#F8F8F8] max-w-[400px] w-full mx-auto p-6 rounded-b-[24px] text-left cursor-pointer">
                  <div className="font-medium text-[24px]">
                    {" "}
                    {post.title && post.title.length > 45
                      ? post.title.slice(0, 45) + "..."
                      : post.title}
                  </div>
                  <div className="pt-4 text-gray-700 text-sm">
                    {post.excerpt && post.excerpt.length > 75
                      ? post.excerpt.slice(0, 75) + "..."
                      : post.excerpt}
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
