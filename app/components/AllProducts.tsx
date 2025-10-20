"use client";

import { useRouter } from "next/navigation";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { FULL_PRODUCTS } from "../static/fullProducts";
import "swiper/css";
import "swiper/css/pagination";

export default function AllProducts() {
  const router = useRouter();
  return (
    <>
      <div className="text-[40px] font-semibold mx-auto max-w-[1300px] p-8 pt-16">
        Kenali Produk Kami
      </div>
      <div className="max-w-[1300px] mx-auto flex justify-center items-center p-8 pt-4">
        <Swiper
          modules={[Pagination]}
          spaceBetween={32}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {FULL_PRODUCTS.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="flex flex-col items-center justify-center text-center rounded-[36px] bg-white mb-10">
                {/* Product Image */}
                <img
                  src={product.img}
                  alt={product.title}
                  className="text-center mx-auto rounded-t-[20px]"
                />

                {/* Product Card */}
                <div className="bg-white mt-10  shadow-lg w-full mx-auto p-8 rounded-[24px] text-center">
                  <div className="font-medium text-[24px]">{product.title}</div>
                  <div>
                    <span className="line-through bg-red">
                      {product.oldPrice}
                    </span>{" "}
                    {product.newPrice}
                  </div>
                  <div className="pt-6 text-gray-700">{product.desc}</div>
                  <div className="pt-8">
                    <button
                      className="bg-[#FF8E06] text-white px-4 py-2 rounded-2xl hover:cursor-pointer"
                      onClick={() =>
                        router.push("https://shopee.co.id/efloor.id")
                      }
                    >
                      Cek Harga
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
