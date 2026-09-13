"use client";

import Image from "next/image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

type Props = {
  images: { url: string }[];
  name: string;
};

export default function ProductSlider({ images, name }: Props) {
  if (!images?.length) return null;

  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={32}
      slidesPerView={1}
      pagination={{ clickable: true }}
      breakpoints={{}}
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full aspect-square min-w-[450px]">
            <Image
              src={img.url}
              alt={name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
