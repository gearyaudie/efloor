import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
export default function Header() {
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // optionally, update the URL hash without full navigation
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center max-w-[1200px] mx-auto">
        <img src="/img/header-logo.png" alt="" className="max-w-[200px] p-4" />
        <div className="hidden gap-20 mr-20 md:flex lg:flex">
          <div
            className="hover:cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            Home
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() => scrollToSection("products")}
          >
            Products
          </div>
          <div className="text-[#ccc]">Articles</div>
        </div>
      </div>
    </div>
  );
}
