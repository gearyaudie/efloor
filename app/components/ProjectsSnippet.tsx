"use client";
import Image from "next/image";
import Button from "./Button";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const projectImages = [
  { src: "/img/pro-1.jpg", alt: "Proyek pemasangan lem vinyl EFLOOR 1" },
  { src: "/img/pro-2.jpg", alt: "Proyek pemasangan lem vinyl EFLOOR 2" },
  { src: "/img/pro-3.jpg", alt: "Proyek pemasangan lem vinyl EFLOOR 3" },
  { src: "/img/pro-4.jpg", alt: "Proyek pemasangan lem vinyl EFLOOR 4" },
  { src: "/img/pro-5.jpg", alt: "Proyek pemasangan lem vinyl EFLOOR 5" },
  { src: "/img/pro-6.jpg", alt: "Proyek pemasangan lem vinyl EFLOOR 6" },
  { src: "/img/pro-7.jpg", alt: "Proyek pemasangan lem vinyl EFLOOR 7" },
  { src: "/img/pro-8.jpg", alt: "Proyek pemasangan lem vinyl EFLOOR 8" },
  { src: "/img/pro-9.jpg", alt: "Proyek pemasangan lem vinyl EFLOOR 9" },
  { src: "/img/pro-10.jpg", alt: "Proyek pemasangan lem vinyl EFLOOR 10" },
  { src: "/img/pro-11.jpg", alt: "Proyek pemasangan lem vinyl EFLOOR 11" },
  { src: "/img/pro-12.jpg", alt: "Proyek pemasangan lem vinyl EFLOOR 12" },
];

export default function ProjectsSnippet() {
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
        {projectImages.map((image) => (
          <SwiperSlide key={image.src}>
            <Image
              src={image.src}
              alt={image.alt}
              width={700}
              height={700}
              className="w-[400px] h-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center mt-12">
        <Button href="/projects">Lihat Selengkapnya</Button>
      </div>
    </div>
  );
}
