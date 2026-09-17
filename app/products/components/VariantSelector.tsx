"use client";

import React from "react";
import { openWhatsApp } from "../../lib/openWhatsApp";

type Variant = {
  label: string;
  price: number;
};

export default function VariantSelector({
  variants,
  productName,
}: {
  variants: Variant[];
  productName?: string;
}) {
  const [selected, setSelected] = React.useState(variants[0]?.label);

  const activeVariant = variants.find((v) => v.label === selected);

  

  return (
    <div className="mt-6">
      {/* Variant Pills */}
      <div className="bg-[#4D4D4D] flex gap-6 rounded-[50px] p-1 text-white w-fit text-[18px] items-center">
        {variants.map((variant, index) => (
          <div
            key={index}
            onClick={() => setSelected(variant.label)}
            className={`cursor-pointer transition-all ${
              selected === variant.label
                ? "bg-white text-black py-2 px-8 rounded-[50px]"
                : "py-2 px-4 text-white"
            }`}
          >
            {variant.label}
          </div>
        ))}
      </div>

      {/* Price Display */}
      {activeVariant && (
        <div className="ml-4">
          <div className="mt-10 text-4xl font-semibold text-[#C62020]">
            Rp. {activeVariant.price.toLocaleString("id-ID")}
          </div>
          <button
            className="bg-[#FF8E06] text-white px-4 py-2 text-center mt-8 mx-auto rounded-2xl hover:cursor-pointer"
            onClick={() =>
              openWhatsApp({
                source: "product-page",
                product: productName
                  ? `${productName} (${activeVariant.label})`
                  : undefined,
              })
            }
          >
            Beli / Cek Sekarang
          </button>
        </div>
      )}
    </div>
  );
}
