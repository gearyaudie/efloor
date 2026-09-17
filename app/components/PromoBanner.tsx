"use client";

import { openWhatsApp } from "../lib/openWhatsApp";

export default function PromoBanner() {
  return (
    <div className="bg-[#C62020] p-3 text-white text-center">
      Langsung kontak kami di WhatsApp untuk Harga Lebih Murah!
      <button
        className="bg-[#FF8E06] text-white ml-4 p-2 rounded-lg mt-2 md:mt-0 lg:mt-0 hover:cursor-pointer"
        onClick={() => {
          openWhatsApp({ source: "promo-banner" });
        }}
      >
        Get now
      </button>
    </div>
  );
}
