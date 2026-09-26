import type { TrimKey } from "../../static/trims";

// Cross-sections of where each trim sits, drawn for a dark card. Wood is the
// floor/stair, the orange shape is the EFLOOR profile.
const WOOD = "url(#trim-wood)";
const PROFILE = "url(#trim-profile)";

function Defs() {
  return (
    <defs>
      <linearGradient id="trim-wood" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#d8b98e" />
        <stop offset="1" stopColor="#b48a5a" />
      </linearGradient>
      <linearGradient id="trim-profile" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ff8e06" />
        <stop offset="0.6" stopColor="#f2561d" />
        <stop offset="1" stopColor="#c62020" />
      </linearGradient>
      <pattern id="trim-grain" width="14" height="6" patternUnits="userSpaceOnUse">
        <path d="M0 3h14" stroke="rgba(90,55,20,0.18)" strokeWidth="1" />
      </pattern>
    </defs>
  );
}

function Label({ x, y, children, anchor = "start" }: { x: number; y: number; children: string; anchor?: "start" | "end" | "middle" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fill="rgba(255,255,255,0.7)" fontSize="12" fontFamily="var(--font-mono)">
      {children}
    </text>
  );
}

export default function TrimDiagram({ kind }: { kind: TrimKey }) {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto" role="img" aria-label={ARIA[kind]}>
      <Defs />
      {kind === "siku" && (
        <>
          {/* Two stair steps */}
          <path d="M0 110h230v110H0z" fill={WOOD} />
          <path d="M0 110h230v110H0z" fill="url(#trim-grain)" />
          <path d="M230 170h170v50H230z" fill={WOOD} opacity="0.75" />
          {/* Vinyl on the tread */}
          <path d="M0 102h222v8H0z" fill="#efe9df" />
          {/* L profile over the nose */}
          <path d="M150 94h86v10h-4v50h-10V104h-72z" fill={PROFILE} />
          <path d="M150 94h86" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          <Label x={150} y={80}>List Siku L</Label>
          <Label x={10} y={92}>Vinyl / kayu</Label>
          <Label x={390} y={160} anchor="end">Anak tangga</Label>
        </>
      )}
      {kind === "plint" && (
        <>
          {/* Wall */}
          <path d="M70 0h50v200H70z" fill="#e9e4da" />
          {/* Floor */}
          <path d="M70 200h330v20H70z" fill={WOOD} />
          <path d="M124 188h276v12H124z" fill="#c9a574" />
          <path d="M124 188h276v12H124z" fill="url(#trim-grain)" />
          {/* Skirting profile against the wall, over the expansion gap */}
          <path d="M120 118h10q6 0 6 6v4h-4v60h-12z" fill={PROFILE} />
          <path d="M120 188h16l2 12h-18z" fill={PROFILE} opacity="0.85" />
          <Label x={150} y={126}>List Plint</Label>
          <Label x={150} y={144}>menutup celah muai</Label>
          <Label x={60} y={40} anchor="end">Dinding</Label>
          <Label x={390} y={178} anchor="end">Lantai vinyl / SPC</Label>
        </>
      )}
      {kind === "adaptasi" && (
        <>
          {/* Lower floor (ceramic) */}
          <path d="M0 180h400v40H0z" fill="#8f8a82" />
          <path d="M0 168h170v12H0z" fill="#e3ddd2" />
          <path d="M60 168v12M120 168v12" stroke="#bdb6aa" strokeWidth="1.5" />
          {/* Higher floor (vinyl on underlay) */}
          <path d="M230 150h170v30H230z" fill={WOOD} />
          <path d="M230 150h170v30H230z" fill="url(#trim-grain)" />
          {/* Reducer ramp */}
          <path d="M160 180l14-26q6-8 16-8h40q10 0 10 8v4h-6v-2h-44q-6 0-10 6l-10 18z" fill={PROFILE} />
          <path d="M150 180l24-26q6-8 16-8h44q8 0 10 6l0 28z" fill={PROFILE} opacity="0.9" />
          <Label x={196} y={130} anchor="middle">List Adaptasi</Label>
          <Label x={10} y={158}>Keramik / marmer</Label>
          <Label x={390} y={140} anchor="end">Vinyl / parket</Label>
        </>
      )}
    </svg>
  );
}

const ARIA: Record<TrimKey, string> = {
  siku: "Potongan melintang: List Siku L menutup ujung anak tangga yang dilapisi vinyl",
  plint: "Potongan melintang: List Plint menutup pertemuan lantai dan dinding",
  adaptasi: "Potongan melintang: List Adaptasi menjembatani lantai keramik dan vinyl yang berbeda tinggi",
};
