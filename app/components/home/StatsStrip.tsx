// Only facts the site already states elsewhere; no invented figures.
const STATS = [
  { value: "1990", unit: "", label: "Berpengalaman melayani proyek lantai sejak 1990" },
  { value: "#1", unit: "", label: "Penjualan lem vinyl terbanyak di Shopee & Tokopedia" },
  { value: "8–10", unit: "m²", label: "Daya sebar per 1 kg, jadi lebih hemat per proyek" },
  { value: "1–20", unit: "KG", label: "Kemasan retail sampai kebutuhan kontraktor" },
];

export default function StatsStrip() {
  return (
    <div className="relative z-[2] max-w-[1200px] mx-auto px-4 md:px-8 -mt-12 lg:-mt-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 bg-white rounded-[28px] shadow-e2 p-2.5">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`px-4 py-[18px] md:px-[26px] md:py-[22px] ${
              i % 2 === 1 ? "border-l border-line" : ""
            } ${i >= 2 ? "border-t lg:border-t-0 border-line" : ""} ${
              i === 2 ? "lg:border-l" : ""
            }`}
          >
            <div className="text-2xl md:text-[30px] font-bold tracking-[-0.03em] leading-[1.1] tabular-nums">
              {s.value}
              {s.unit && (
                <sup className="text-[0.5em] font-semibold ml-0.5 text-brand-flame">{s.unit}</sup>
              )}
            </div>
            <p className="text-[13.5px] text-muted mt-1.5 leading-[1.45]">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
