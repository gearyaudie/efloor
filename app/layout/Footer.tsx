"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WhatsAppButton from "../components/WhatsAppButton";
import PhoneLink from "../components/PhoneLink";
import { MarketplaceLinks } from "../components/OutboundLinks";
import { BUSINESS_ADDRESS_DISPLAY, OPENING_HOURS_DISPLAY } from "../static/business";

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
          {BUSINESS_ADDRESS_DISPLAY}
          <div className="mt-2 text-[#808080]">Jam buka: {OPENING_HOURS_DISPLAY}</div>
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
        <Link href="/harga-lem-vinyl-karpet" className="hover:cursor-pointer">
          Harga
        </Link>
      </div>
      <div className="flex flex-1 gap-10 flex-col text-center md:text-left lg:text-left mt-20 md:mt-0 lg:mt-0">
        <div className="font-bold">Our Company</div>
        <Link href="/about-us" className="hover:cursor-pointer">
          About Us
        </Link>
        <WhatsAppButton source="footer" variant="plain">
          Contact Us
        </WhatsAppButton>
        <PhoneLink source="footer" />
        <Link href="/kontak" className="hover:cursor-pointer">
          Kontak &amp; Alamat
        </Link>
        <MarketplaceLinks source="footer" className="flex flex-col gap-10" />
      </div>
    </footer>
  );
}
