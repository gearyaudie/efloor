"use client";

import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AllProducts from "./components/AllProducts";
import MarketingGrid from "./components/MarketingGrid";
import Footer from "./layout/Footer";
import { IMainProduct, MAIN_PRODUCTS } from "./static/mainProducts";
import FloatingWhatsapp from "./components/FloatingWhatsapp";
import ProjectsSnippet from "./components/ProjectsSnippet";
import { client } from "@/sanity.client";

type SanityProduct = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  desc: string;
  price: number;
  image: {
    asset: {
      url: string;
    };
  };
};

export default function Home() {
  const products: IMainProduct[] = MAIN_PRODUCTS;

  // ✅ Sanity products state
  const [sanityProducts, setSanityProducts] = useState<SanityProduct[]>([]);

  // ✅ Fetch from Sanity safely (no async component)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch<SanityProduct[]>(`
          *[_type == "product"]{
            _id,
            name,
            slug,
            desc,
            price,
            image {
              asset->{
                url
              }
            }
          }
        `);

        setSanityProducts(data);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      }
    };

    fetchProducts();
  }, []);

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

  const openLink = (link: string) => {
    window.open(link, "_");
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Lem Efloor Max",
    description:
      "Supplier Lem Karpet, Procurement Lem Karpet untuk Kontraktor dan Projekkkkkk",
    brand: {
      "@type": "Brand",
      name: "Efloor",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProjectsSnippet />

      {/* MAIN PRODUCTS SWIPER (STATIC) */}
      <div className="max-w-[1300px] mx-auto py-10 px-6" id="home">
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
                  <img
                    src={selectedVariant.img}
                    alt={`${product.name} ${selectedVariant.size}`}
                    className="text-center mx-auto w-[375px] transition-all duration-300 rounded-[20px]"
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
                    <div className="font-medium text-[24px]">
                      {product.name}
                    </div>
                    <div>
                      {product.variants.map((v: any) => v.size).join(", ")}
                    </div>
                    <div className="pt-6 text-gray-700">{product.desc}</div>
                    <div className="pt-8">
                      <button
                        className="bg-[#FF8E06] text-white px-4 py-2 rounded-2xl hover:cursor-pointer"
                        onClick={() => openLink(product.link)}
                      >
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

      {/* SANITY PRODUCTS SECTION */}
      <div className="bg-[#f8f8f8]" id="products">
        <AllProducts products={sanityProducts} />
      </div>
    </div>
  );
}
