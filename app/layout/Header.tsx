"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import FloatingWhatsapp from "../components/FloatingWhatsapp";

export default function Header() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLemVinylOpen, setMobileLemVinylOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileLemVinylOpen(false);
  }, [pathname]);

  const lemVinylLinks = [
    { label: "Lem Vinyl Rumah Sakit", href: "/lem-vinyl-rumah-sakit" },
    { label: "Lem Karpet Kantor", href: "/lem-karpet-kantor" },
    { label: "Lem Lapangan Badminton", href: "/lem-lapangan-badminton" },
    { label: "Lem Karpet Gym", href: "/lem-karpet-gym" },
    { label: "Lem HPL & PVC Sheet", href: "/lem-hpl-pvc-sheet" },
  ];

  return (
    <header className="mb-16">
      <FloatingWhatsapp />
      <div className="fixed bg-white w-full top-0 z-50 shadow-sm">
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

          <div className="hidden gap-10 mr-0 md:flex lg:flex items-center">
            <Link
              href="/#home"
              className="hover:cursor-pointer font-medium text-[#808080] text-md"
              onClick={(e) => scrollToSection(e, "home")}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="hover:cursor-pointer font-medium text-[#808080] text-md"
            >
              Projects
            </Link>

            {/* Lem Vinyl Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-1 font-medium text-[#808080] text-md hover:text-[#FF8E06] transition-colors duration-200"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                Lem Vinyl
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                  {lemVinylLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 text-sm text-[#808080] font-medium hover:bg-orange-50 hover:text-[#FF8E06] cursor-pointer transition-colors duration-150"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#products"
              className="hover:cursor-pointer font-medium text-[#808080] text-md"
              onClick={(e) => scrollToSection(e, "products")}
            >
              Products
            </Link>
            <Link
              href="/blogs"
              className="hover:cursor-pointer font-medium text-[#808080] text-md"
            >
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

            <button
              type="button"
              className="flex items-center justify-between py-3 font-medium text-[#808080] w-full text-left"
              aria-expanded={mobileLemVinylOpen}
              onClick={() => setMobileLemVinylOpen((prev) => !prev)}
            >
              Lem Vinyl
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${mobileLemVinylOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {mobileLemVinylOpen && (
              <div className="pl-4 flex flex-col gap-1">
                {lemVinylLinks.map((link) => (
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
