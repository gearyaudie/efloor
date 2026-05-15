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
import HeroSwiper from "./components/HeroSwiper";

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

      {/* <div className="flex flex-col md:flex-row justify-center px-4 md:px-8 py-10 md:py-20 gap-10 md:gap-16 max-w-[1300px] mx-auto items-center">
        <div className="w-full md:flex-1 flex justify-center">
          <img
            src="/img/lantai-vinyl-rs.png"
            alt="Lantai Vinyl Rumah Sakit"
            className="w-full max-w-[350px] md:max-w-[600px] h-auto"
          />
        </div>

        <div className="w-full md:flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-semibold leading-snug">
            Lem Vinyl & Karpet Paling Terpercaya #1,
            <h2 className="mt-2 text-lg md:text-2xl font-normal text-[#808080]">
              Penjualan Terbanyak di Shopee & Tokopedia
            </h2>
          </h1>

          <p className="pt-6 md:pt-10 text-sm md:text-base text-[#808080] leading-relaxed">
            Kami adalah supplier lem vinyl eco friendly yang terpercaya dengan
            penjualan terbanyak di platform marketplace Indonesia. Lem Vinyl
            EFLOOR / Lem Karpet EFLOOR adalah pilihan terbaik untuk pemasangan
            indoor di area perkantoran, kamar tidur bayi dan rumah sakit.
            <br />
            <br />
            Berikut adalah keunggulan produk kami:
          </p>

          <ul className="list-disc text-left mx-auto md:mx-0 max-w-[500px] md:max-w-none pl-5 md:pl-6 pt-4 text-sm md:text-lg text-[#808080] space-y-2">
            <li>Eco Friendly, Ramah Lingkungan (Lem Waterbased)</li>
            <li>Tidak Berbau & Hampir Tidak Mengandung VOC</li>
            <li>Lebih Hemat Karena Viskositas Tinggi (Kental)</li>
            <li>Daya sebar yang luas, +- 8 - 10m2 per kg</li>
            <li>Pelayanan untuk procurement yang mudah</li>
          </ul>
        </div>
      </div> */}

      <div className="flex justify-center items-center mx-auto max-w-[1400px]">
        <HeroSwiper />
      </div>

      <div className="bg-[#f8f8f8]">
        <ProjectsSnippet />
      </div>

      {/* MAIN PRODUCTS SWIPER (STATIC) */}
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
                    <h2 className="font-medium text-[24px]">{product.name}</h2>
                    <div>
                      {product.variants.map((v: any) => v.size).join(", ")}
                    </div>
                    <h3 className="pt-6 text-gray-700">{product.desc}</h3>
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
