import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "../components/WhatsAppButton";
import PhoneLink from "../components/PhoneLink";
import { MarketplaceLinks } from "../components/OutboundLinks";
import { VERTICAL_PAGES } from "../static/verticals";
import {
  BUSINESS_ADDRESS_DISPLAY,
  OPENING_HOURS_DISPLAY,
} from "../static/business";

const PRODUCT_LINKS = [
  { href: "/products/lem-vinyl-efloor", label: "Lem Vinyl & Karpet" },
  { href: "/products/lem-efloor-max", label: "Lem EFLOOR Max" },
  { href: "/list-siku-step-nosing", label: "List Siku L & Step Nosing" },
  { href: "/list-plint-skirting-pvc", label: "List Plint / Skirting" },
  { href: "/list-adaptasi-transisi", label: "List Adaptasi / Transisi" },
  { href: "/products", label: "Semua Produk" },
  { href: "/harga-lem-vinyl-karpet", label: "Daftar Harga" },
];

const COMPANY_LINKS = [
  { href: "/about-us", label: "Tentang Kami" },
  { href: "/projects", label: "Proyek" },
  { href: "/blogs", label: "Artikel" },
  { href: "/kontak", label: "Kontak & Alamat" },
];

const linkClass = "hover:text-white transition-colors";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-white text-sm font-semibold mb-4">{title}</h2>
      <ul className="grid gap-2.5">{children}</ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand-navy-deep text-white/70 text-[14.5px] pt-16 md:pt-[72px] pb-8">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/img/footer-logo.png"
              alt="EFLOOR - Distributor Lem Vinyl dan Lem Karpet Jakarta"
              width={272}
              height={84}
              className="h-[30px] w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-[34ch] leading-relaxed">
              Supplier dan distributor lem vinyl, lem karpet, dan list siku
              waterbased di Jakarta sejak 1990.
            </p>
            <address className="not-italic mt-4 max-w-[36ch] leading-relaxed text-[13.5px]">
              {BUSINESS_ADDRESS_DISPLAY}
              <span className="block mt-2">Jam buka: {OPENING_HOURS_DISPLAY}</span>
            </address>
            <MarketplaceLinks
              source="footer"
              className="flex flex-wrap gap-2 mt-5"
              linkClassName="px-3 py-1.5 rounded-full bg-white/8 hover:bg-white/16 text-white text-[13px] font-medium transition-colors"
            />
          </div>

          <Column title="Produk">
            {PRODUCT_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>{l.label}</Link>
              </li>
            ))}
          </Column>

          <Column title="Solusi">
            {VERTICAL_PAGES.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>{l.label}</Link>
              </li>
            ))}
          </Column>

          <Column title="Perusahaan">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>{l.label}</Link>
              </li>
            ))}
            <li>
              <WhatsAppButton source="footer" variant="plain" className={linkClass}>
                Chat WhatsApp
              </WhatsAppButton>
            </li>
            <li>
              <PhoneLink source="footer" className={linkClass} />
            </li>
          </Column>
        </div>

        <div className="flex flex-wrap justify-between gap-4 mt-14 pt-6 border-t border-white/12 text-[13px]">
          <span>© {new Date().getFullYear()} Efloor Indonesia. All rights reserved.</span>
          <span>Kelapa Gading, Jakarta Utara</span>
        </div>
      </div>
    </footer>
  );
}
