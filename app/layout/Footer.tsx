"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackWhatsAppClick } from "../lib/analytics";

export default function Footer() {
  const pathname = usePathname();
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    // If we are NOT on home page, let the Link navigate there normally
    if (pathname !== "/") {
      return;
    }

    // If already on home page, just scroll
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `/#${id}`);
    }
  };

  return (
    <footer className="max-w-[1200px] mx-auto py-20 flex justify-between items-center flex-col md:flex-row lg:flex-row">
      <div className="flex-2 justify-center items-center mx-auto">
        <Image
          src="/img/footer-logo.png"
          alt="EFLOOR - Distributor Lem Vinyl dan Lem Karpet Jakarta"
          width={272}
          height={84}
          className="mx-auto flex md:mx-0 lg:mx-0"
        />
        <div className="max-w-[325px] p-4 text-center md:text-left lg:text-left">
          Jl. Raya Gading Bukit Indah No.2, RT.18/RW.8, Klp. Gading Bar., Kec.
          Klp. Gading, Jkt Utara, Daerah Khusus Ibukota Jakarta 14240
        </div>
      </div>
      <div className="flex flex-1 gap-10 flex-col text-center md:text-left lg:text-left mt-10 md:mt-0 lg:mt-0">
        <div className="font-bold">Main Pages</div>
        <Link
          href="/#home"
          onClick={(e) => scrollToSection(e, "home")}
          className="hover:cursor-pointer"
        >
          Home
        </Link>
        <Link href="/blogs" className="hover:cursor-pointer">
          Articles
        </Link>
        <Link
          href="/#products"
          onClick={(e) => scrollToSection(e, "products")}
          className="hover:cursor-pointer"
        >
          Our Products
        </Link>
        <Link href="/projects" className="hover:cursor-pointer">
          Projects
        </Link>
      </div>
      <div className="flex flex-1 gap-10 flex-col text-center md:text-left lg:text-left mt-20 md:mt-0 lg:mt-0">
        <div className="font-bold">Our Company</div>
        <Link href="/about-us" className="hover:cursor-pointer">
          About Us
        </Link>
        <Link
          href="https://api.whatsapp.com/send/?phone=628561153725&text&type=phone_number&app_absent=0"
          target="_blank"
          className="hover:cursor-pointer"
          onClick={() => {
            void trackWhatsAppClick({ source: "footer" });
          }}
        >
          Contact Us
        </Link>
      </div>
    </footer>
  );
}
