import { CheckIcon, XIcon } from "../icons";
import { Eyebrow, h2Class } from "../home/SectionHeading";

// General differences between a waterbased one-side HPL glue and the common
// solvent-based "lem kuning" contact cement it replaces.
const ROWS = [
  { label: "Bahan dasar", ours: "Waterbased (berbasis air)", theirs: "Solvent / pelarut" },
  { label: "Area olesan", ours: "Cukup 1 sisi", theirs: "Wajib 2 sisi" },
  { label: "Bau saat kerja", ours: "Minim bau", theirs: "Menyengat" },
  { label: "Pemakaian lem", ours: "Lebih hemat", theirs: "Dua kali olesan" },
  { label: "Membersihkan alat", ours: "Air, selama lem belum kering", theirs: "Perlu thinner" },
];

export default function HplComparison() {
  return (
    <section className="bg-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid gap-10 lg:gap-16 lg:grid-cols-[0.85fr_1.15fr] items-center">
        <div data-reveal>
          <Eyebrow>Perbandingan</Eyebrow>
          <h2 className={h2Class}>Saatnya beralih dari lem kuning</h2>
          <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[46ch]">
            Lem kontak berbasis solvent masih banyak dipakai untuk HPL. Ini
            bedanya dengan lem HPL waterbased EFLOOR di pekerjaan sehari-hari.
          </p>
        </div>

        <div data-reveal className="rounded-[28px] bg-paper p-2 md:p-2.5 shadow-[inset_0_0_0_1px_var(--color-line)] overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-[14.5px] border-separate border-spacing-0">
            <caption className="sr-only">Perbandingan Lem HPL EFLOOR dan lem kuning berbasis solvent</caption>
            <thead>
              <tr>
                <th scope="col" className="p-4 w-[30%]" />
                <th scope="col" className="p-4 rounded-t-[20px] bg-ink text-white">
                  <span className="block text-[11.5px] uppercase tracking-[0.1em] text-[#FFB25C] font-semibold">EFLOOR</span>
                  <span className="text-[16px] font-semibold">Lem HPL waterbased</span>
                </th>
                <th scope="col" className="p-4">
                  <span className="block text-[11.5px] uppercase tracking-[0.1em] text-muted font-semibold">Umum</span>
                  <span className="text-[16px] font-semibold text-ink-soft">Lem kuning (solvent)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => {
                const last = i === ROWS.length - 1;
                return (
                  <tr key={r.label}>
                    <th scope="row" className="p-4 font-medium text-muted border-t border-line">
                      {r.label}
                    </th>
                    <td
                      className={`p-4 bg-ink text-white border-t border-white/10 ${last ? "rounded-b-[20px]" : ""}`}
                    >
                      <span className="flex items-center gap-2.5 font-medium">
                        <span className="w-5 h-5 rounded-full bg-wa grid place-items-center shrink-0">
                          <CheckIcon className="w-3 h-3" />
                        </span>
                        {r.ours}
                      </span>
                    </td>
                    <td className="p-4 border-t border-line text-muted">
                      <span className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-line text-muted grid place-items-center shrink-0">
                          <XIcon className="w-3 h-3" />
                        </span>
                        {r.theirs}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
