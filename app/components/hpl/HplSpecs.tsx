import { Eyebrow, h2Class } from "../home/SectionHeading";
import { HPL_PACKS } from "../../static/hpl";

const SPECS: [string, string][] = [
  ["Produk", "Lem HPL EFLOOR"],
  ["Jenis", "Lem kontak waterbased (berbasis air)"],
  ["Metode aplikasi", "Oles 1 sisi, kape bergerigi atau roller"],
  ["Lapisan atas", "HPL, veneer, PVC sheet, panel dekoratif"],
  ["Bidang dasar", "Multiplek, MDF, particle board, kayu"],
  ["Waktu tempel", "Saat lem setengah kering / tacky"],
  ["Kemasan", HPL_PACKS.map((p) => p.label).join(" · ")],
  ["Pembelian", "Toko Kelapa Gading, WhatsApp, Shopee, Tokopedia"],
];

export default function HplSpecs() {
  return (
    <section id="spesifikasi" className="scroll-mt-[140px] max-w-[1200px] mx-auto px-4 md:px-8 pb-[72px] lg:pb-[104px]">
      <div className="grid gap-8 lg:gap-16 lg:grid-cols-[0.8fr_1.2fr] items-start">
        <div data-reveal>
          <Eyebrow>Spesifikasi</Eyebrow>
          <h2 className={h2Class}>Data produk singkat</h2>
          <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[40ch]">
            Ringkasan untuk tukang, estimator, dan bagian pembelian.
          </p>
        </div>
        <dl data-reveal className="rounded-[28px] bg-white shadow-e1 divide-y divide-line overflow-hidden">
          {SPECS.map(([k, v]) => (
            <div key={k} className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 px-6 py-4">
              <dt className="text-[13.5px] text-muted">{k}</dt>
              <dd className="text-[15px] font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
