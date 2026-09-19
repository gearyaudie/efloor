"use client";
import Image from "next/image";
import Button from "./Button";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type SanityB2BProject = {
  _id: string;
  type?: string;
  namaBarang?: string;
  namaPT?: string;
  photo?: {
    asset?: {
      url: string;
    };
  };
};

export default function ProjectsSnippet({
  projects,
}: {
  projects: SanityB2BProject[];
}) {
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
        {projects
          .filter((item) => item.photo?.asset?.url)
          .map((item) => (
            <SwiperSlide key={item._id}>
              <Image
                src={item.photo!.asset!.url}
                alt={`${item.type ?? "Proyek"} ${item.namaBarang ?? ""} untuk ${item.namaPT ?? "EFLOOR"}`}
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
