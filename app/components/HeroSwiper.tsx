"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    badge: "Distributor dan Supplier",
    title: "Cari ",
    highlight: "Lem Vinyl & Karpet Ramah Lingkungan",
    suffix: "Untuk Perkantoran, Rumah Sakit, dll",
    price: "Rp97.000",
    originalPrice: "Rp245.000",
  },
  // {
  //   badge: "DESAIN PROFESIONAL · MUDAH DIKELOLA",
  //   title: "Tampil profesional di internet dengan",
  //   highlight: "desain",
  //   suffix: "yang menarik pelanggan.",
  //   price: "Rp97.000",
  //   originalPrice: "Rp245.000",
  // },
  // {
  //   badge: "SEO READY · TAMPIL DI GOOGLE",
  //   title: "Raih pelanggan baru lewat",
  //   highlight: "pencarian Google",
  //   suffix: "setiap hari.",
  //   price: "Rp97.000",
  //   originalPrice: "Rp245.000",
  // },
];

export default function HeroSwiper() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLink = (link: string) => {
    window.open(link, "_");
  };

  return (
    <div className="relative w-full overflow-hidden bg-white mx-auto">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full mx-auto"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col gap-4 md:flex-row items-center justify-between px-8 md:px-20 py-16 min-h-[520px]">
              {/* Left content */}
              <div className="flex-[1.5]">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 border border-orange-300 rounded-full px-4 py-1.5 mb-6">
                  <span className="text-orange-400 text-lg">✦</span>
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-600">
                    {slide.badge}
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a2e5a] leading-tight mb-4">
                  {slide.title}{" "}
                  <em className="not-italic text-[#1a2e5a] italic font-extrabold bg-gradient-to-r from-orange-300 to-orange-400 bg-[length:100%_6px] bg-no-repeat bg-bottom pr-1">
                    {slide.highlight}
                  </em>{" "}
                  {slide.suffix}
                </h1>

                {/* Price */}
                {/* <div className="flex items-baseline gap-3 mb-7">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Mulai dari
                  </span>
                  <span className="text-3xl font-extrabold text-[#1a2e5a]">
                    {slide.price}
                  </span>
                  <span className="text-sm text-gray-400">/tahun</span>
                  <span className="text-sm text-gray-400 line-through">
                    {slide.originalPrice}
                  </span>
                </div> */}

                {/* Domain search */}
                <div className="flex gap-3 max-w-md mt-8">
                  <button
                    className="bg-[#6b7db3] hover:bg-[#5a6da3] text-white px-6 py-3.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap border-none cursor-pointer"
                    onClick={() =>
                      window.open(
                        "https://api.whatsapp.com/send/?phone=628561153725&text&type=phone_number&app_absent=0",
                        "_",
                      )
                    }
                  >
                    Tanyakan Sekarang →
                  </button>
                </div>
              </div>

              {/* Right — placeholder for image */}
              <div className="hidden md:flex flex-[1] items-center justify-center">
                <div className="w-120 h-120 rounded-full bg-orange-100 flex items-center justify-center text-6xl">
                  <img
                    src="/img/lem_vinyl_efloor_20kg.png"
                    alt="lem-vinyl-efloor-20kg"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination — dots + counter */}
      <div className="absolute bottom-8 left-8 md:left-20 z-10 flex items-center gap-3">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className={`rounded-full transition-all duration-300 border-none cursor-pointer ${
                activeIndex === i
                  ? "w-7 h-3 bg-orange-400"
                  : "w-3 h-3 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <span className="text-sm font-semibold text-gray-400 ml-1">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
