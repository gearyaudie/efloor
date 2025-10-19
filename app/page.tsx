"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Header from "./layout/Header";
import MarketingGrid from "./components/MarketingGrid";
import PromoBanner from "./components/PromoBanner";
import { IMainProduct, MAIN_PRODUCTS } from "./static/mainProducts";
import React from "react";
import { FULL_PRODUCTS, IFullProducts } from "./static/fullProducts";
import Footer from "./layout/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const products: IMainProduct[] = MAIN_PRODUCTS;

  const fullProducts: IFullProducts[] = FULL_PRODUCTS;

  const [selectedVariants, setSelectedVariants] = React.useState(() =>
    products.reduce((acc: any, product) => {
      acc[product.id] = 0; // default select the first variant
      return acc;
    }, {})
  );

  const handleVariantClick = (productId: any, index: any) => {
    setSelectedVariants((prev: any) => ({
      ...prev,
      [productId]: index,
    }));
  };

  return (
    <div>
      <Header />
      {/* Promo Banner */}
      <PromoBanner />
      {/* Swiper Slider */}
      <div className="max-w-[1300px] mx-auto py-10 px-6" id="home">
        <Swiper
          modules={[Pagination]}
          spaceBetween={80}
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
                <div className="flex flex-col items-center justify-center text-center w-[400px]">
                  {/* Product Image */}
                  <img
                    src={selectedVariant.img}
                    alt={`${product.name} ${selectedVariant.size}`}
                    className="text-center mx-auto w-[400px] transition-all duration-300"
                  />

                  {/* Variant Selector */}
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

                  {/* Product Card */}
                  <div className="bg-[#F8F8F8] mt-10 max-w-[400px] w-full mx-auto p-8 rounded-[24px] text-center">
                    <div className="font-medium text-[24px]">
                      {product.name}
                    </div>
                    <div>
                      {product.variants.map((v: any) => v.size).join(", ")}
                    </div>
                    <div className="pt-6 text-gray-700">{product.desc}</div>
                    <div className="pt-8">
                      <button className="bg-[#FF8E06] text-white px-4 py-2 rounded-2xl">
                        Cek Harga
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <MarketingGrid />

      {/* Swiper Slider */}
      <div className="bg-[#f8f8f8]" id="products">
        <div className="max-w-[1300px] mx-auto flex justify-center items-center p-20 ">
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
            {fullProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="flex flex-col items-center justify-center text-center rounded-[36px] bg-white">
                  {/* Product Image */}
                  <img
                    src={product.img}
                    alt={product.title}
                    className="text-center mx-auto"
                  />

                  {/* Product Card */}
                  <div className="bg-white mt-10  shadow-lg w-full mx-auto p-8 rounded-[24px] text-center">
                    <div className="font-medium text-[24px]">
                      {product.title}
                    </div>
                    <div>
                      <span>{product.oldPrice}</span> {product.newPrice}
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
      </div>

      <Footer />
    </div>
  );
}
