import { AreaIcon, DocIcon, DropIcon, LeafIcon, TruckIcon, WindIcon } from "../icons";
import GlueCalculator from "./GlueCalculator";
import { Eyebrow, h2Class } from "./SectionHeading";

const BENEFITS = [
  { icon: LeafIcon, title: "Eco-friendly, waterbased", text: "Bebas solvent dan ramah lingkungan, aman untuk area sensitif." },
  { icon: WindIcon, title: "Tidak berbau, low VOC", text: "Tidak menyengat seperti lem kuning. Nyaman untuk ruang tertutup." },
  { icon: DropIcon, title: "Viskositas tinggi", text: "Lebih kental, tidak mudah meleber, dan pemakaian lebih hemat." },
  { icon: AreaIcon, title: "±8–10 m² per kg", text: "Daya sebar luas. 20 KG cukup untuk 160–200 m²." },
  { icon: DocIcon, title: "Mudah untuk procurement", text: "Pelayanan pembelian yang mudah untuk kontraktor dan perusahaan." },
  { icon: TruckIcon, title: "Mudah dibeli", text: "Di toko Kelapa Gading, via WhatsApp, atau Shopee & Tokopedia." },
];

export default function WhyEfloor() {
  return (
    <section className="bg-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid gap-12 lg:gap-14 lg:grid-cols-[1.1fr_0.9fr] items-start">
        <div>
          <div data-reveal>
            <Eyebrow>Kenapa EFLOOR</Eyebrow>
            <h2 className={h2Class}>Lem yang aman untuk ruangan, hemat untuk proyek</h2>
            <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[58ch]">
              Formula berbasis air tanpa solvent, dipercaya instalator untuk
              ruang yang dipakai setiap hari.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-6 md:gap-y-7 mt-10">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <li key={title} data-reveal className="flex gap-4">
                <span className="w-12 h-12 rounded-2xl grid place-items-center bg-orange-tint text-brand-flame shrink-0">
                  <Icon className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-[16.5px] font-semibold tracking-[-0.01em]">{title}</h3>
                  <p className="text-[14.5px] text-muted mt-1 leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <GlueCalculator />
      </div>
    </section>
  );
}
