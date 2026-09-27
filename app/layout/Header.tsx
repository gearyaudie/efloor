"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { WhatsAppDot } from "../components/icons";
import { openWhatsApp } from "../lib/openWhatsApp";
import { VERTICAL_PAGES } from "../static/verticals";
import { ACCESSORY_PAGES } from "../static/accessories";

// Dropdown menus in the order they appear. Glue use-case pages and PVC trim
// pages are separate products, so they get separate menus.
const MENUS = [
  { id: "lem", label: "Lem", links: VERTICAL_PAGES },
  { id: "list", label: "List & Aksesoris", links: ACCESSORY_PAGES },
];

// Plain links after the dropdowns.
const LINKS = [
  { href: "/harga-lem-vinyl-karpet", label: "Harga" },
  { href: "/projects", label: "Proyek" },
  { href: "/blogs", label: "Artikel" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
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
  const desktopMenusRef = useRef<HTMLElement>(null);

  // Only show the header border and shadow once the page has scrolled.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const pillClass = (active: boolean) =>
    `inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-[14.5px] font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-flame focus-visible:outline-offset-2 ${
      active ? "bg-surface text-ink" : "text-ink-soft hover:bg-surface hover:text-ink"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 bg-paper/85 backdrop-blur-md backdrop-saturate-150 border-b transition-[border-color,box-shadow] duration-200 ${
        scrolled
          ? "border-line shadow-[0_6px_24px_-18px_rgba(0,0,0,0.25)]"
          : "border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-16 lg:h-[76px] flex items-center gap-7">
        <Link href="/" className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-brand-flame">
          <Image
            src="/img/header-logo.png"
            alt="EFLOOR - Distributor Lem Vinyl dan Lem Karpet Jakarta"
            width={341}
            height={103}
            priority
            className="h-6 lg:h-[30px] w-auto"
          />
        </Link>

        <nav
          ref={desktopMenusRef}
          aria-label="Utama"
          className="hidden lg:flex items-center gap-1 ml-auto"
        >
          <Link href="/products" className={pillClass(isActive("/products"))}>
            Produk
          </Link>

          {MENUS.map((menu) => (
            <div className="relative" key={menu.id}>
              <button
                type="button"
                className={pillClass(openMenu === menu.id)}
                aria-expanded={openMenu === menu.id}
                onClick={() =>
                  setOpenMenu((prev) => (prev === menu.id ? null : menu.id))
                }
              >
                {menu.label}
                <Chevron open={openMenu === menu.id} />
              </button>

              {openMenu === menu.id && (
                <div className="absolute top-[calc(100%+8px)] left-0 min-w-[264px] p-2 bg-white rounded-[18px] shadow-e3 z-50">
                  {menu.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2.5 rounded-[10px] text-sm text-ink-soft hover:bg-surface hover:text-ink transition-colors"
                      onClick={() => setOpenMenu(null)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={pillClass(isActive(link.href))}>
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="hidden lg:inline-flex items-center gap-2.5 h-[42px] px-[18px] rounded-full bg-brand-gradient text-white text-sm font-semibold shadow-cta hover:-translate-y-0.5 transition-transform cursor-pointer"
          onClick={() => openWhatsApp({ source: "header" })}
        >
          <WhatsAppDot />
          Chat WhatsApp
        </button>

        {/* Mobile hamburger toggle */}
        <button
          type="button"
          className="lg:hidden ml-auto grid place-items-center w-11 h-11 rounded-full bg-surface cursor-pointer"
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <svg className="w-5 h-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeWidth={2} d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path strokeLinecap="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h10" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="lg:hidden border-t border-line bg-paper px-4 md:px-8 pt-2 pb-5 flex flex-col max-h-[calc(100dvh-64px)] overflow-y-auto"
        >
          <Link href="/products" className="py-3 border-b border-line font-medium text-ink">
            Produk
          </Link>

          {MENUS.map((menu) => (
            <div key={menu.id} className="border-b border-line">
              <button
                type="button"
                className="flex items-center justify-between py-3 font-medium text-ink w-full text-left cursor-pointer"
                aria-expanded={mobileOpenMenu === menu.id}
                onClick={() =>
                  setMobileOpenMenu((prev) => (prev === menu.id ? null : menu.id))
                }
              >
                {menu.label}
                <Chevron open={mobileOpenMenu === menu.id} />
              </button>
              {mobileOpenMenu === menu.id && (
                <div className="pl-4 pb-2 flex flex-col">
                  {menu.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="py-2 text-sm text-ink-soft"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 border-b border-line font-medium text-ink"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <button
            type="button"
            className="mt-4 inline-flex items-center justify-center gap-2.5 h-[52px] rounded-full bg-brand-gradient text-white font-semibold shadow-cta cursor-pointer"
            onClick={() => openWhatsApp({ source: "header-mobile" })}
          >
            <WhatsAppDot />
            Chat WhatsApp
          </button>
        </div>
      )}
    </header>
  );
}
