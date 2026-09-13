"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IMainProduct, MAIN_PRODUCTS } from "../static/mainProducts";

export default function MainProductsSwiper() {
  const products: IMainProduct[] = MAIN_PRODUCTS;

  const [selectedVariants, setSelectedVariants] = React.useState(() =>
    products.reduce((acc: any, product) => {
      acc[product.id] = 0;
      return acc;
    }, {}),
  );

  const handleVariantClick = (productId: any, index: any) => {
    setSelectedVariants((prev: any) => ({
      ...prev,
      [productId]: index,
    }));
  };

  return (
    <div className="max-w-[1300px] mx-auto py-10 mt-16 px-6" id="home">
      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products.map((product) => {
          const selectedIndex = selectedVariants[product.id] || 0;
          const selectedVariant = product.variants[selectedIndex];

          return (
            <SwiperSlide key={product.id}>
              <div className="flex flex-col items-center justify-center text-center w-[375px]">
                <Image
                  src={selectedVariant.img}
                  alt={`${product.name} ${selectedVariant.size}`}
                  width={700}
                  height={700}
                  className="text-center mx-auto w-[375px] h-auto transition-all duration-300 rounded-[20px]"
                />

                <div className="bg-[#4D4D4D] flex gap-6 rounded-[50px] p-1 text-white w-fit mx-auto text-[18px] items-center mt-4">
                  {product.variants.map((variant: any, i: any) => (
                    <div
                      key={i}
                      onClick={() => handleVariantClick(product.id, i)}
                      className={`cursor-pointer transition-all ${
                        selectedVariants[product.id] === i
                          ? "bg-white text-black py-2 px-8 rounded-[50px]"
                          : "py-2 px-4 text-white"
                      }`}
                    >
                      {variant.size}
                    </div>
                  ))}
                </div>

                <div className="bg-[#F8F8F8] mt-10 max-w-[400px] w-full mx-auto p-8 rounded-[24px] text-center">
                  <h2 className="font-medium text-[24px]">{product.name}</h2>
                  <div>
                    {product.variants.map((v: any) => v.size).join(", ")}
                  </div>
                  <h3 className="pt-6 text-gray-700">{product.desc}</h3>
                  <div className="pt-8">
                    <Link
                      href={product.link}
                      className="inline-block bg-[#FF8E06] text-white px-4 py-2 rounded-2xl hover:cursor-pointer"
                    >
                      Cek Harga
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
