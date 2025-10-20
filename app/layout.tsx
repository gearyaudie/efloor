import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose what you need
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "efloor | Your Trusted Home and Decor Store",
  description:
    "efloor - Leme Vinyl, List Aksesoris Vinyl, List Siku L, List Adaptasi, List Plint, List Transisi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>{children}</body>
    </html>
  );
}
