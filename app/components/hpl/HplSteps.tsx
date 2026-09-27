import { Eyebrow, h2Class } from "../home/SectionHeading";

const board =
  "absolute inset-x-6 bottom-6 h-[70px] rounded-[10px] bg-[repeating-linear-gradient(0deg,rgba(90,55,20,0.14)_0_3px,transparent_3px_10px),linear-gradient(180deg,#d8b98e,#bf976a)] shadow-[0_14px_24px_-12px_rgba(0,0,0,0.45)]";
const glue =
  "absolute inset-x-6 bottom-[76px] h-[16px] rounded-t-[8px] bg-[repeating-linear-gradient(-28deg,#fff_0_7px,rgba(255,255,255,0.5)_7px_11px)]";

const STEPS = [
  {
    title: "Bersihkan permukaan",
    text: "Pastikan bidang dasar bebas debu, minyak, dan air agar lem menempel sempurna.",
    viz: (
      <>
        <span className={board} />
        {[18, 38, 62, 80].map((l, i) => (
          <span
            key={l}
            className="absolute bottom-[86px] w-1.5 h-1.5 rounded-full bg-[#8a6a45]/40"
            style={{ left: `${l}%`, transform: `translateY(${-i * 6}px)` }}
          />
        ))}
        <span className="absolute right-6 top-5 w-[70px] h-[26px] rounded-[8px] bg-white/80 shadow-e2 -rotate-12" />
      </>
    ),
  },
  {
    title: "Oles di satu sisi",
    text: "Ratakan lem pada salah satu permukaan saja, gunakan kape bergerigi atau roller.",
    viz: (
      <>
        <span className={board} />
        <span className={`${glue} [clip-path:inset(0_38%_0_0)]`} />
        <span className="absolute left-[58%] bottom-[84px] w-[64px] h-[24px] rounded-[6px_6px_2px_2px] bg-[linear-gradient(#9aa3ae,#6e7782)] -rotate-[14deg] shadow-[0_8px_16px_-6px_rgba(0,0,0,0.4)]">
          <span className="absolute left-6 -top-[16px] w-[16px] h-[20px] rounded-md bg-brand-flame" />
        </span>
      </>
    ),
  },
  {
    title: "Tunggu hingga tacky",
    text: "Biarkan lem setengah kering — terasa lengket tapi tidak basah saat disentuh. Beberapa menit, tergantung suhu ruang.",
    viz: (
      <>
        <span className={board} />
        <span className={`${glue} opacity-60`} />
        <span className="absolute right-5 top-4 px-2.5 py-1 rounded-full bg-white font-mono text-[12px] shadow-e2">
          tacky ✓
        </span>
      </>
    ),
  },
  {
    title: "Tempel & tekan rata",
    text: "Letakkan HPL, lalu tekan dari tengah ke tepi dengan roller atau tekanan tangan yang kuat.",
    viz: (
      <>
        <span className={board} />
        <span className="absolute inset-x-6 bottom-[76px] h-[12px] rounded-[6px] bg-[linear-gradient(180deg,#fdfcf9,#e7e2d8)] shadow-[0_6px_12px_-6px_rgba(0,0,0,0.35)]" />
        <span className="absolute left-[40%] bottom-[92px] w-[70px] h-[20px] rounded-full bg-[linear-gradient(180deg,#3b3a40,#18171b)] shadow-[0_8px_14px_-6px_rgba(0,0,0,0.5)]">
          <span className="absolute left-1/2 -top-[26px] w-1.5 h-[28px] -translate-x-1/2 rotate-[20deg] origin-bottom rounded-full bg-brand-flame" />
        </span>
      </>
    ),
  },
];

export default function HplSteps() {
  return (
    <section id="cara-pakai" className="scroll-mt-[140px] bg-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <Eyebrow>Cara pakai</Eyebrow>
            <h2 className={h2Class}>Empat langkah, hasil rapi dan rekat permanen</h2>
          </div>
          <p className="text-[14.5px] text-muted max-w-[34ch]">
            Alat yang dibutuhkan: kape bergerigi atau roller, lap bersih, dan
            roller karet untuk menekan.
          </p>
        </div>

        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10 md:mt-12">
          <span
            aria-hidden="true"
            className="hidden lg:block absolute left-[12%] right-[12%] top-[160px] h-px bg-[repeating-linear-gradient(90deg,var(--color-line)_0_8px,transparent_8px_14px)]"
          />
          {STEPS.map((step, i) => (
            <li key={step.title} data-reveal className="relative">
              <div
                aria-hidden="true"
                className="relative h-[190px] rounded-[24px] overflow-hidden bg-[linear-gradient(160deg,#f3ede3,#e6dccb)]"
              >
                {step.viz}
              </div>
              <span className="relative z-[1] -mt-5 ml-5 grid place-items-center w-10 h-10 rounded-full bg-brand-gradient text-white font-mono text-[14px] font-semibold shadow-cta ring-4 ring-white">
                {i + 1}
              </span>
              <h3 className="text-[18px] font-semibold mt-3 tracking-[-0.01em]">{step.title}</h3>
              <p className="text-[14.5px] text-muted mt-1.5 leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>

        <div data-reveal className="mt-10 grid gap-3 md:grid-cols-3">
          {[
            ["Tip", "Tekan dari tengah ke arah tepi supaya tidak ada udara yang terjebak di bawah HPL."],
            ["Hindari", "Menempel saat lem masih basah atau putih pekat — daya rekat belum maksimal."],
            ["Simpan", "Tutup rapat ember setelah dipakai agar lem tidak mengering di dalam kemasan."],
          ].map(([k, v]) => (
            <p key={k} className="px-5 py-4 rounded-[20px] bg-paper text-[14px] text-ink-soft">
              <b className="font-mono text-[12px] uppercase tracking-[0.08em] text-brand-flame mr-2">{k}</b>
              {v}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
