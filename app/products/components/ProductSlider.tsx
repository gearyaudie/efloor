"use client";

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
          <img
            src={img.url}
            alt={name}
            className="w-full rounded-lg min-w-[450px]"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
