"use client";

import Image from "next/image";
import Button from "./Button";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Product = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  desc: string;
  price?: number;
  priceVariants?: {
    label: string;
    price: number;
  }[];
  image: {
    asset: {
      url: string;
    };
  };
};

interface Props {
  products: Product[];
}

export default function AllProducts({ products }: Props) {
  const getLowestPrice = (product: Product) => {
    if (product.priceVariants?.length) {
      return Math.min(...product.priceVariants.map((v) => v.price));
    }

    return product.price ?? 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-semibold mb-10 text-center">All Products</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products?.map((product) => {
          const lowestPrice = getLowestPrice(product);

          return (
            <SwiperSlide key={product._id}>
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col h-full">
                {/* Image (NOT cropped) */}
                {product?.image?.asset?.url && (
                  <div className="relative w-full h-[350px]">
                    <Image
                      src={product.image.asset.url}
                      alt={product.name}
                      fill
                      className="object-contain rounded-xl"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="mt-6 flex flex-col flex-grow text-center">
                  <h3 className="text-xl font-semibold">{product.name}</h3>

                  <p className="text-gray-600 mt-3 text-sm">{product.desc}</p>

                  {/* ✅ Show cheapest price */}
                  <p className="mt-4 font-bold text-lg">
                    Rp {Number(lowestPrice).toLocaleString("id-ID")}
                  </p>

                  <div className="mt-6">
                    <Button href={`/products/${product.slug?.current}`}>
                      Cek Produk
                    </Button>
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
