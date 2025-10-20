"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (id: string) => {
    // If we are NOT on home page, go there first
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }

    // If already on home page, just scroll
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `/#${id}`);
    }
  };

  return (
    <header>
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
          <div
            className="hover:cursor-pointer"
            onClick={() => window.open("/blogs", "_")}
          >
            Articles
          </div>
        </div>
      </div>
    </header>
  );
}
