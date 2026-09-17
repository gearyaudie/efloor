"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import FloatingWhatsapp from "../components/FloatingWhatsapp";
import { VERTICAL_PAGES } from "../static/verticals";
import { ACCESSORY_PAGES } from "../static/accessories";

// Dropdown menus in the order they appear. Glue use-case pages and PVC trim
// pages are separate products, so they get separate menus.
const MENUS = [
  { id: "lem", label: "Lem", links: VERTICAL_PAGES },
  { id: "list", label: "List & Aksesoris", links: ACCESSORY_PAGES },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenMenu, setMobileOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const desktopMenusRef = useRef<HTMLDivElement>(null);

  // Only show the header shadow once the page has scrolled, instead of
  // always rendering it.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    setMobileMenuOpen(false);
    if (pathname !== "/") {
      return;
    }
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `/#${id}`);
    }
  };

  // Close any open dropdown when clicking outside the desktop nav
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        desktopMenusRef.current &&
        !desktopMenusRef.current.contains(e.target as Node)
      ) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileOpenMenu(null);
    setOpenMenu(null);
  }, [pathname]);

  const desktopLinkClass =
    "hover:cursor-pointer font-medium text-[#808080] text-md rounded-sm focus-visible:outline-2 focus-visible:outline-brand-navy focus-visible:outline-offset-4";

  return (
    <header className="mb-16">
      <FloatingWhatsapp />
      <div
        className={`fixed bg-white w-full top-0 z-50 transition-shadow duration-200 ${
          scrolled ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="max-w-[1400px] px-6 md:px-12 w-full mx-auto flex py-1 justify-between items-center">
          <Link href="/">
            <Image
              src="/img/header-logo.png"
              alt="EFLOOR - Distributor Lem Vinyl dan Lem Karpet Jakarta"
              width={341}
              height={103}
              priority
              className="max-w-[150px] w-auto h-auto p-2 hover:cursor-pointer"
            />
          </Link>

          <div
            ref={desktopMenusRef}
            className="hidden gap-10 mr-0 md:flex lg:flex items-center"
          >
            <Link
              href="/#home"
              className={desktopLinkClass}
              onClick={(e) => scrollToSection(e, "home")}
            >
              Home
            </Link>
            <Link href="/projects" className={desktopLinkClass}>
              Projects
            </Link>
            <Link href="/harga-lem-vinyl-karpet" className={desktopLinkClass}>
              Harga
            </Link>

            {MENUS.map((menu) => (
              <div className="relative" key={menu.id}>
                <button
                  type="button"
                  className="flex items-center gap-1 font-medium text-[#808080] text-md hover:text-[#FF8E06] transition-colors duration-200"
                  aria-expanded={openMenu === menu.id}
                  onClick={() =>
                    setOpenMenu((prev) => (prev === menu.id ? null : menu.id))
                  }
                >
                  {menu.label}
                  <Chevron open={openMenu === menu.id} />
                </button>

                {openMenu === menu.id && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                    {menu.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-3 text-sm text-[#808080] font-medium hover:bg-orange-50 hover:text-[#FF8E06] cursor-pointer transition-colors duration-150"
                        onClick={() => setOpenMenu(null)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/#products"
              className={desktopLinkClass}
              onClick={(e) => scrollToSection(e, "products")}
            >
              Products
            </Link>
            <Link href="/blogs" className={desktopLinkClass}>
              Articles
            </Link>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 -mr-2"
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <svg
              className="w-6 h-6 text-[#4D4D4D]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav panel */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-panel"
            className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-1 max-h-[calc(100vh-56px)] overflow-y-auto"
          >
            <Link
              href="/#home"
              className="py-3 font-medium text-[#808080]"
              onClick={(e) => scrollToSection(e, "home")}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="py-3 font-medium text-[#808080]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/harga-lem-vinyl-karpet"
              className="py-3 font-medium text-[#808080]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Harga
            </Link>

            {MENUS.map((menu) => (
              <div key={menu.id}>
                <button
                  type="button"
                  className="flex items-center justify-between py-3 font-medium text-[#808080] w-full text-left"
                  aria-expanded={mobileOpenMenu === menu.id}
                  onClick={() =>
                    setMobileOpenMenu((prev) => (prev === menu.id ? null : menu.id))
                  }
                >
                  {menu.label}
                  <Chevron open={mobileOpenMenu === menu.id} />
                </button>
                {mobileOpenMenu === menu.id && (
                  <div className="pl-4 flex flex-col gap-1">
                    {menu.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="py-2 text-sm text-[#808080]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/#products"
              className="py-3 font-medium text-[#808080]"
              onClick={(e) => scrollToSection(e, "products")}
            >
              Products
            </Link>
            <Link
              href="/blogs"
              className="py-3 font-medium text-[#808080]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Articles
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
