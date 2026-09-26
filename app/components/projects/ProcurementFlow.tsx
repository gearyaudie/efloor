import { BoxIcon, DocIcon, ReceiptIcon, TruckIcon, WhatsAppIcon } from "../icons";
import { Eyebrow, h2Class } from "../home/SectionHeading";

const REASONS = [
  { icon: DocIcon, title: "Dokumen tender lengkap", text: "TDS dan MSDS siap diunduh, dokumen tambahan bisa diminta untuk administrasi proyek." },
  { icon: ReceiptIcon, title: "Harga khusus proyek", text: "Penawaran menyesuaikan volume, dari puluhan hingga ratusan pcs sekaligus." },
  { icon: BoxIcon, title: "Kemasan proyek 20 KG", text: "Lebih hemat per kg dan lebih sedikit ember di lokasi — cukup untuk ±160–200 m² per ember." },
  { icon: TruckIcon, title: "Kirim ke lokasi proyek", text: "Jadwal pengiriman disesuaikan dengan tenggat dan lokasi proyek Anda." },
];

const STEPS = [
  { title: "Kirim kebutuhan", text: "Produk, jumlah, lokasi, dan jadwal proyek via WhatsApp." },
  { title: "Terima penawaran", text: "Quotation harga proyek beserta TDS/MSDS untuk berkas tender." },
  { title: "Konfirmasi PO", text: "Pesanan diproses sesuai PO dan dokumen yang Anda butuhkan." },
  { title: "Pengiriman", text: "Barang dikirim ke gudang atau langsung ke lokasi proyek." },
];

export default function ProcurementFlow() {
  return (
    <section className="py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="max-w-[680px]">
          <Eyebrow>Kenapa EFLOOR</Eyebrow>
          <h2 className={h2Class}>Partner pengadaan yang memudahkan tim proyek</h2>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-10 md:mt-12">
          {REASONS.map(({ icon: Icon, title, text }) => (
            <li key={title} data-reveal className="rounded-[28px] bg-white shadow-e1 p-6">
              <span className="w-12 h-12 rounded-2xl grid place-items-center bg-orange-tint text-brand-flame">
                <Icon className="w-6 h-6" />
              </span>
              <h3 className="text-[17px] font-semibold tracking-[-0.01em] mt-5">{title}</h3>
              <p className="text-[14.5px] text-muted mt-1.5 leading-relaxed">{text}</p>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-14 md:mt-16 rounded-[28px] md:rounded-[36px] bg-ink text-white p-6 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.02em]">Alur pengadaan</h3>
            <span className="inline-flex items-center gap-2 text-[13.5px] text-white/65">
              <WhatsAppIcon className="w-4 h-4 text-wa" />
              Semua lewat satu kontak WhatsApp
            </span>
          </div>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative pt-5 border-t border-white/15">
                <span
                  aria-hidden="true"
                  className="absolute -top-[5px] left-0 w-[9px] h-[9px] rounded-full bg-brand-gradient"
                />
                <span className="font-mono text-[12.5px] text-[#FFB25C]">0{i + 1}</span>
                <h4 className="text-[17px] font-semibold mt-1">{s.title}</h4>
                <p className="text-[14px] text-white/65 mt-1.5 leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
