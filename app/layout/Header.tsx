"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import FloatingWhatsapp from "../components/FloatingWhatsapp";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `/#${id}`);
    }
  };

  const onLogoClick = () => {
    router.push(`/`);
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

  const lemVinylLinks = [
    { label: "Lem Vinyl Rumah Sakit", href: "/lem-vinyl-rumah-sakit" },
    { label: "Lem Karpet Kantor", href: "/lem-karpet-kantor" },
    { label: "Lem Lapangan Badminton", href: "/lem-lapangan-badminton" },
    { label: "Lem Karpet Gym", href: "/lem-karpet-gym" },
  ];

  return (
    <header className="mb-16">
      <FloatingWhatsapp />
      <div
        className="fixed bg-white w-full top-0 z-50 flex justify-between items-center shadow-sm"
        onClick={() => onLogoClick()}
      >
        <div className="max-w-[1400px] px-12 w-full mx-auto flex py-1 justify-between items-center">
          <img
            src="/img/header-logo.png"
            alt="efloor-logo"
            className="max-w-[150px] p-2 hover:cursor-pointer"
          />
          <div className="hidden gap-10 mr-0 md:flex lg:flex items-center">
            <div
              className="hover:cursor-pointer font-medium text-[#808080] text-md"
              onClick={(e) => {
                e.stopPropagation();
                scrollToSection("home");
              }}
            >
              Home
            </div>
            <div
              className="hover:cursor-pointer font-medium text-[#808080] text-md"
              onClick={(e) => {
                e.stopPropagation();
                window.open("/projects", "_blank");
              }}
            >
              Projects
            </div>

            {/* Lem Vinyl Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onClick={(e) => e.stopPropagation()}
            >
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
                    <div
                      key={link.href}
                      className="px-4 py-3 text-sm text-[#808080] font-medium hover:bg-orange-50 hover:text-[#FF8E06] cursor-pointer transition-colors duration-150"
                      onClick={() => {
                        window.open(link.href, "_blank");
                        setDropdownOpen(false);
                      }}
                    >
                      {link.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              className="hover:cursor-pointer font-medium text-[#808080] text-md"
              onClick={(e) => {
                e.stopPropagation();
                scrollToSection("products");
              }}
            >
              Products
            </div>
            <div
              className="hover:cursor-pointer font-medium text-[#808080] text-md"
              onClick={(e) => {
                e.stopPropagation();
                window.open("/blogs", "_blank");
              }}
            >
              Articles
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
