"use client";

import React from "react";

type Variant = {
  label: string;
  price: number;
};

export default function VariantSelector({ variants }: { variants: Variant[] }) {
  const [selected, setSelected] = React.useState(variants[0]?.label);

  const activeVariant = variants.find((v) => v.label === selected);

  const openLink = (link: string) => {
    window.open(link, "_");
  };

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
              openLink(
                "https://api.whatsapp.com/send/?phone=628561153725&text&type=phone_number&app_absent=0",
              )
            }
          >
            Beli / Cek Sekarang
          </button>
        </div>
      )}
    </div>
  );
}
