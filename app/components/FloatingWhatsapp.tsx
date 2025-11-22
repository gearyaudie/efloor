"use client";
import { useRouter } from "next/navigation";

export default function FloatingWhatsapp() {
  const router = useRouter();
  return (
    <div className="fixed bottom-10 right-8 z-10 flex items-center gap-4">
      <div
        className="bg-white p-4 rounded-lg shadow-md"
        onClick={() =>
          window.open(
            "https://api.whatsapp.com/send/?phone=628561153725&text&type=phone_number&app_absent=0",
            "_"
          )
        }
      >
        Beli Langsung Dari WA, <br /> Dijamin Lebih Murah!
      </div>
      <img
        src="/img/whatsapp.svg"
        alt=""
        className="w-20 z-10 cursor-pointer"
        onClick={() =>
          window.open(
            "https://api.whatsapp.com/send/?phone=628561153725&text&type=phone_number&app_absent=0",
            "_"
          )
        }
      />
    </div>
  );
}
