export default function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      // optionally, update the URL hash without full navigation
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <footer className="max-w-[1200px] mx-auto py-20 flex justify-between items-center flex-col md:flex-row lg:flex-row">
      <div className="flex-2 justify-center items-center mx-auto">
        <img
          src="/img/footer-logo.png"
          alt="footer-logo"
          className="mx-auto flex md:mx-0 lg:mx-0"
        />
        <div className="max-w-[325px] p-4 text-center md:text-left lg:text-left">
          Jl. Raya Gading Bukit Indah No.2, RT.18/RW.8, Klp. Gading Bar., Kec.
          Klp. Gading, Jkt Utara, Daerah Khusus Ibukota Jakarta 14240
        </div>
      </div>
      <div className="flex flex-1 gap-10 flex-col text-center md:text-left lg:text-left mt-10 md:mt-0 lg:mt-0">
        <div className="font-bold">Main Pages</div>
        <div
          onClick={() => scrollToSection("home")}
          className="hover:cursor-pointer"
        >
          Home
        </div>
        <div className="text-[#ccc]">Articles</div>
        <div
          onClick={() => scrollToSection("products")}
          className="hover:cursor-pointer"
        >
          Our Products
        </div>
      </div>
      <div className="flex flex-1 gap-10 flex-col text-center md:text-left lg:text-left mt-20 md:mt-0 lg:mt-0">
        <div className="font-bold">Our Company</div>
        <div className="text-[#ccc]">About Us</div>
        <div className="text-[#ccc]">Careers</div>
        <div className="text-[#ccc]">Contact Us</div>
      </div>
    </footer>
  );
}
