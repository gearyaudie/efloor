"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import FloatingWhatsapp from "../components/FloatingWhatsapp";

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

  const onLogoClick = () => {
    router.push(`/`);
  };

  return (
    <header className="mb-20">
      <FloatingWhatsapp />
      <div
        className="fixed bg-white w-full top-0 z-50 flex justify-between items-center"
        onClick={() => onLogoClick()}
      >
        <div className="max-w-[1200px] w-full mx-auto flex justify-between items-center">
          <img
            src="/img/header-logo.png"
            alt=""
            className="max-w-[200px] p-4 hover:cursor-pointer"
          />
          <div className="hidden gap-20 mr-20 md:flex lg:flex">
            <div
              className="hover:cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              Home
            </div>
            <div
              className="hover:cursor-pointer"
              onClick={() => window.open("/projects", "_")}
            >
              Projects
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
      </div>
    </header>
  );
}
