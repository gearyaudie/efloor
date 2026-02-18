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
    <div className="pb-20">
      <div className="text-[40px] font-semibold text-left pt-16 px-8">
        Projects & Procurement
      </div>
      <div className="text-[#808080] pb-8 px-8">
        The perfect vendor for contractors & any tender project needs
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
        <SwiperSlide>
          <img src="/img/pro-1.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-2.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-3.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-4.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-5.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-6.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/pro-7.png" alt="" />
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
