"use client";

import Image from "next/image";
import { useState } from "react";
import { openWhatsApp } from "../lib/openWhatsApp";

export default function FloatingWhatsapp() {
  const [hovered, setHovered] = useState(false);

  const openWhatsapp = () => {
    openWhatsApp({ source: "floating-button" });
  };

  return (
    <div className="fixed bottom-10 right-8 z-10 flex items-center gap-4">
      {hovered && (
        <div
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
          onClick={openWhatsapp}
        >
          Beli Langsung Dari WA, <br /> Dijamin Lebih Murah!
        </div>
      )}
      <Image
        src="/img/whatsapp.svg"
        alt="Hubungi EFLOOR via WhatsApp"
        width={80}
        height={80}
        className="w-20 z-10 cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={openWhatsapp}
      />
    </div>
  );
}
