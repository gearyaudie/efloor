"use client";

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
  price: number;
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
  const openLink = (slug: string) => {
    window.open(`/products/${slug}`, "_self");
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
        {products?.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col h-full">
              {/* ✅ Image NOT cropped */}
              <div className="w-full flex justify-center">
                <img
                  src={product?.image?.asset?.url}
                  alt={product.name}
                  className="max-h-[350px] w-auto object-contain rounded-xl"
                />
              </div>

              {/* Content */}
              <div className="mt-6 flex flex-col flex-grow text-center">
                <h3 className="text-xl font-semibold">{product.name}</h3>

                <p className="text-gray-600 mt-3 text-sm">{product.desc}</p>

                <p className="mt-4 font-bold text-lg">
                  Rp {Number(product.price || 0).toLocaleString("id-ID")}
                </p>

                <div className="mt-6">
                  <button
                    className="bg-[#FF8E06] text-white px-6 py-2 rounded-2xl hover:opacity-90 hover:cursor-pointer transition"
                    onClick={() => openLink(product.slug?.current)}
                  >
                    Cek Produk
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
