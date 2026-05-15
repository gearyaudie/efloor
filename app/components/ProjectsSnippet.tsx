"use client";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ProjectsSnippet() {
  const openLink = (link: string) => {
    window.open(link, "_");
  };
  return (
    <div className="mt-10 pb-10 max-w-[1200px] mx-auto">
      <h1 className="text-[28px] font-medium text-center pt-10 px-8">
        Proyek: Supplier Lem Karpet & Vinyl
      </h1>
      <h2 className="text-[#808080] pb-8 pt-2 px-8 text-center max-w-[725px] mx-auto">
        Dipercayai oleh ribuan perusahaan ternama untuk menjadi supplier vinyl &
        carpet adhesives. Berikut adalah contoh2 procurement dari kami.
      </h2>
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView="auto"
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        <SwiperSlide>
          <img src="/img/pro-1.png" alt="" className="w-[400px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-2.png" alt="" className="w-[400px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-3.png" alt="" className="w-[400px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-4.png" alt="" className="w-[400px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-5.png" alt="" className="w-[400px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-6.png" alt="" className="w-[400px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-7.png" alt="" className="w-[400px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-8.png" alt="" className="w-[400px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-9.png" alt="" className="w-[400px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-10.png" alt="" className="w-[400px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-11.png" alt="" className="w-[400px]" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-12.png" alt="" className="w-[400px]" />
        </SwiperSlide>
      </Swiper>

      <button
        className="bg-[#FF8E06] text-white px-4 py-2 text-center flex justify-center items-center mt-12 mx-auto rounded-2xl hover:cursor-pointer"
        onClick={() => openLink("/projects")}
      >
        Lihat Selengkapnya
      </button>
    </div>
  );
}
