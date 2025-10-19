import { useRouter } from "next/navigation";

export default function PromoBanner() {
  const router = useRouter();
  return (
    <div className="bg-[#C62020] p-4 text-white text-center">
      Dapatkan Promo Xtra di lapak shopee kami
      <button
        className="bg-[#FF8E06] text-white ml-4 p-2 rounded-lg mt-2 md:mt-0 lg:mt-0 hover:cursor-pointer"
        onClick={() => window.open("https://shopee.co.id/efloor.id", "_")}
      >
        Get now
      </button>
    </div>
  );
}
