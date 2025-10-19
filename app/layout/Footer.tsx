export default function Footer() {
  return (
    <div className="max-w-[1200px] mx-auto py-20 flex justify-between items-center flex-col md:flex-row lg:flex-row">
      <div className="flex-2 justify-center items-center mx-auto">
        <img
          src="/img/footer-logo.png"
          alt=""
          className="mx-auto flex md:mx-0 lg:mx-0"
        />
        <div className="max-w-[325px] p-4 text-center md:text-left lg:text-left">
          Jl. Raya Gading Bukit Indah No.2, RT.18/RW.8, Klp. Gading Bar., Kec.
          Klp. Gading, Jkt Utara, Daerah Khusus Ibukota Jakarta 14240
        </div>
      </div>
      <div className="flex flex-1 gap-10 flex-col text-center md:text-left lg:text-left mt-10 md:mt-0 lg:mt-0">
        <div className="font-bold">Main Pages</div>
        <div>Home</div>
        <div>Articles</div>
        <div>Our Products</div>
      </div>
      <div className="flex flex-1 gap-10 flex-col text-center md:text-left lg:text-left mt-20 md:mt-0 lg:mt-0">
        <div className="font-bold">Our Company</div>
        <div>About Us</div>
        <div>Careers</div>
        <div>Contact Us</div>
      </div>
    </div>
  );
}
