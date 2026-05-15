"use client";
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
    <header className="mb-16">
      <FloatingWhatsapp />
      <div
        className="fixed bg-white w-full top-0 z-50 flex justify-between items-center"
        onClick={() => onLogoClick()}
      >
        <div className="max-w-[1400px] px-12 w-full mx-auto flex py-1 justify-between items-center">
          <img
            src="/img/header-logo.png"
            alt="efloor-logo"
            className="max-w-[150px] p-2 hover:cursor-pointer"
          />
          <div className="hidden gap-10 mr-0 md:flex lg:flex">
            <div
              className="hover:cursor-pointer font-medium text-[#808080] text-md"
              onClick={() => scrollToSection("home")}
            >
              Home
            </div>
            <div
              className="hover:cursor-pointer font-medium text-[#808080] text-md"
              onClick={() => window.open("/projects", "_")}
            >
              Projects
            </div>
            <div
              className="hover:cursor-pointer font-medium text-[#808080] text-md"
              onClick={() => window.open("/lem-vinyl-rumah-sakit", "_")}
            >
              Pemasangan RS
            </div>
            <div
              className="hover:cursor-pointer font-medium text-[#808080] text-md"
              onClick={() => scrollToSection("products")}
            >
              Products
            </div>
            <div
              className="hover:cursor-pointer font-medium text-[#808080] text-md"
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
