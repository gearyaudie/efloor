// Builds the printable/shareable A4 product sheets for the three PVC trims
// (List Siku L, List Plint, List Adaptasi) from the same content as their
// web pages (app/static/trims.ts).
//
//   node --experimental-strip-types scripts/product-sheets/build.mjs
//
// Prices: a label in prices.json wins; anything else comes from the product's
// Sanity priceVariants when Sanity is reachable; otherwise "Tanya harga".
// PDFs are written to scripts/product-sheets/out/ (or the path in $OUT_DIR).

import { readFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const outDir = process.env.OUT_DIR ?? path.join(here, "out");

const { TRIMS } = await import(path.join(root, "app/static/trims.ts"));

const SITE_URL = "https://efloor.id";
const WHATSAPP_NUMBER = "628561153725";
const PHONE_DISPLAY = "0856-1153-725";
const ADDRESS = "Jl. Raya Gading Bukit Indah No.2, Kelapa Gading, Jakarta Utara 14240";
const HOURS = "Setiap hari, 11.00 – 17.00 WIB";

// EFLOOR PVC trim colour codes, in catalog order. Swatches are cropped from
// the catalog photos into colors/<code>.jpg.
const COLORS = [
  "GG 9926", "GG 9136", "GG 9137", "GG 1237", "GG 0710", "GG 9919", "GG 2958", "GG 3093",
  "GG 9808", "GG 9315", "GG 9924", "GG 9923", "GG 9953", "GG 9662", "GG 3097",
];

const rupiah = (n) => `Rp${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
const fmtCm = (n) => n.toString().replace(".", ",");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const same = (a, b) => a.trim().toUpperCase() === b.trim().toUpperCase();

async function loadPlaywright() {
  try {
    return (await import("playwright")).default;
  } catch {
    // Fall back to a global install (e.g. the one preinstalled in CI images).
    const require = createRequire(import.meta.url);
    return require("/opt/node22/lib/node_modules/playwright");
  }
}

async function sanityVariants(slug) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0].priceVariants[]{label, price}`;
  const url = `https://n5elvhr7.apicdn.sanity.io/v2024-05-11/data/query/production?query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { result } = await res.json();
    return (result ?? []).filter((v) => v?.label && typeof v.price === "number");
  } catch (err) {
    console.warn(`  Sanity unavailable for ${slug} (${err.message}); using prices.json only.`);
    return [];
  }
}

async function variantsFor(config, overrides) {
  const fromSanity = await sanityVariants(config.productSlug);
  const base = fromSanity.length
    ? fromSanity.map((v) => ({ label: v.label, price: v.price }))
    : config.profiles
      ? config.profiles.map((p) => ({ label: p.variant }))
      : overrides.length
        ? []
        : [{ label: "Per batang" }];
  for (const o of overrides) {
    // A single-variant product takes the single manual price whatever Sanity calls it.
    const only = base.length === 1 && overrides.length === 1 ? base[0] : undefined;
    const hit = base.find((v) => same(v.label, o.label)) ?? only;
    if (hit) hit.price = o.price;
    else base.push({ ...o });
  }
  return base;
}

async function dataUri(rel) {
  // Site paths ("/img/x.png") live in public/; anything else is a real file path.
  const file = rel.startsWith(root) ? rel : path.join(root, "public", rel);
  const ext = path.extname(file).slice(1).replace("jpg", "jpeg");
  return `data:image/${ext};base64,${(await readFile(file)).toString("base64")}`;
}

function profileSvg(p, max) {
  const s = 26 / max; // tallest profile fits 26px wide
  const w = p.widthCm * s * 1.6;
  const h = p.heightCm * s * 1.6;
  const t = 3;
  return `<svg width="${w + 2}" height="${h + 2}" viewBox="-1 -1 ${w + 2} ${h + 2}"><path d="M0 0H${w}V${t}H${t}V${h}H0Z" fill="url(#g)"/></svg>`;
}

function sheet(config, variants, img) {
  const stickM = config.lengthCm / 100;
  const priced = variants.filter((v) => typeof v.price === "number");
  const cheapest = priced.length > 1 ? Math.min(...priced.map((v) => v.price)) : undefined;
  const maxW = config.profiles ? Math.max(...config.profiles.map((p) => p.widthCm)) : 1;
  const url = `${SITE_URL}${config.pageHref}`;
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Halo EFLOOR, saya tertarik dengan ${config.whatsappProduct}.`)}`;
  const today = new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric", timeZone: "Asia/Jakarta" });
  const specs = config.specs
    .filter(([k]) => k !== "Produk")
    .map(([k, v]) => (k === "Warna" ? [k, `${COLORS.length} pilihan warna berkode GG (lihat halaman 1)`] : [k, v]));
  // Products whose page has no colour row still get one.
  if (!specs.some(([k]) => k === "Warna")) specs.splice(2, 0, ["Warna", `${COLORS.length} pilihan warna berkode GG (lihat halaman 1)`]);

  const rows = variants
    .map((v) => {
      const prof = config.profiles?.find((p) => same(p.variant, v.label));
      return `<tr>
        <td><div class="var">${prof ? `<span class="prof">${profileSvg(prof, maxW)}</span>` : ""}<b>${esc(v.label)}</b>${cheapest !== undefined && v.price === cheapest ? '<span class="tag">Termurah</span>' : ""}</div></td>
        ${config.profiles ? `<td class="mono">${prof ? `${fmtCm(prof.widthCm)} × ${fmtCm(prof.heightCm)} cm` : "–"}</td>` : ""}
        <td class="mono">${config.lengthCm} cm</td>
        <td class="price">${typeof v.price === "number" ? rupiah(v.price) : '<span class="ask">Tanya harga</span>'}</td>
        <td class="mono muted">${typeof v.price === "number" ? `${rupiah(v.price / stickM)}/m` : "–"}</td>
      </tr>`;
    })
    .join("");

  return `
<section class="page">
  <header class="top">
    <img class="logo" src="${img.logo}" alt="EFLOOR">
    <div class="meta">Info Produk · ${esc(today)}</div>
  </header>

  <div class="title">
    <span class="chip">${esc(config.kicker)}</span><span class="tags">${esc(config.tags)}</span>
    <h1>${esc(config.h1[0])} <span class="grad">${esc(config.h1[1])}</span></h1>
    <p class="intro">${esc(config.intro)}</p>
  </div>

  <div class="hero">
    <div class="shot ${config.gallery[0].kind}"><img src="${img.hero}" alt=""></div>
    <div class="facts">
      <h3>Sekilas</h3>
      <ul class="ticks">${config.ticks.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      <div class="kv">
        <div><small>Panjang</small><b>${config.lengthCm} cm</b></div>
        <div><small>Material</small><b>PVC</b></div>
      </div>
    </div>
  </div>

  <h2><span class="bar"></span>Varian &amp; harga</h2>
  <table class="prices">
    <thead><tr><th>Varian</th>${config.profiles ? "<th>Profil</th>" : ""}<th>Panjang</th><th>Harga / batang</th><th>Per meter</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p class="note">Harga per batang (${config.lengthCm} cm), dapat berubah sewaktu-waktu. Proyek &amp; grosir: minta harga khusus via WhatsApp.</p>

  <h2><span class="bar"></span>Warna <span class="count">${COLORS.length} pilihan</span></h2>
  <div class="swatches">${img.swatches.map((sw) => `<figure><span style="background-image:url(${sw.src})"></span><figcaption>${esc(sw.code)}</figcaption></figure>`).join("")}</div>
  <p class="small">Sebutkan kode warna (mis. ${esc(COLORS[0])}) saat memesan. Warna di layar bisa sedikit berbeda — minta foto sampel via WhatsApp.</p>

  <h2><span class="bar"></span>Kegunaan</h2>
  <ol class="uses">${config.uses.map((u) => `<li><b>${esc(u.title)}</b><span>${esc(u.text)}</span></li>`).join("")}</ol>
</section>

<section class="page">
  <header class="top">
    <img class="logo" src="${img.logo}" alt="EFLOOR">
    <div class="meta">${esc(config.name)} · halaman 2</div>
  </header>

  ${
    img.shape
      ? `<div class="shape">
    <img class="cut" src="${img.shape.cut}" alt="Penampang Plint EFLOOR dibandingkan plint merk lain">
    <div>
      <span class="kick">Bentuk profil</span>
      <h3>${esc(config.signature.title)}</h3>
      <p>${esc(config.signature.text)}</p>
      <p>Lihat penampangnya: dinding PVC Plint EFLOOR lebih tebal dengan rongga penguat yang rapat — tidak mudah pecah saat dipotong, dipaku, atau terbentur.</p>
    </div>
  </div>`
      : `<div class="signature">
    <h3>${esc(config.signature.title)}</h3>
    <p>${esc(config.signature.text)}</p>
  </div>`
  }

  <h2><span class="bar"></span>Keunggulan</h2>
  <div class="benefits">${config.benefits.map((b) => `<div><b>${esc(b.title)}</b><span>${esc(b.text)}</span></div>`).join("")}</div>

  <h2><span class="bar"></span>Cara pasang</h2>
  <ol class="steps">${config.steps.map((s, i) => `<li><span class="n">0${i + 1}</span><b>${esc(s.title)}</b><span>${esc(s.text)}</span></li>`).join("")}</ol>
  <p class="small"><b>Alat:</b> ${esc(config.tools)}</p>

  <h2><span class="bar"></span>Spesifikasi</h2>
  <table class="specs">${specs.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}</table>

  <footer class="contact">
    <div class="cta">
      <b>Pesan atau tanya stok &amp; warna</b>
      <a href="${wa}">WhatsApp ${PHONE_DISPLAY}</a>
      <a href="${url}">${esc(url.replace("https://", ""))}</a>
    </div>
    <div class="addr">
      <small>Toko</small>${esc(ADDRESS)}
      <small>Jam buka</small>${esc(HOURS)}
      <small>Marketplace</small>Shopee &amp; Tokopedia: efloor.id
    </div>
  </footer>
</section>`;
}

const CSS = `
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Poppins, system-ui, sans-serif; color: #18171b; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: 210mm; height: 297mm; padding: 12mm 14mm 11mm; position: relative; page-break-after: always; overflow: hidden; background: #fafaf7; display: flex; flex-direction: column; }
.page:last-child { page-break-after: auto; }
.mono { font-family: "IBM Plex Mono", ui-monospace, monospace; }
.muted, .small, .note { color: #6b6a70; }
.top { display: flex; justify-content: space-between; align-items: center; padding-bottom: 5mm; border-bottom: 1px solid #e8e5de; }
.logo { height: 9mm; }
.meta { font-size: 9pt; color: #6b6a70; }
.title { margin-top: 6mm; }
.chip { display: inline-block; background: #fff3e4; color: #f2561d; font-weight: 600; font-size: 8pt; padding: 1mm 3mm; border-radius: 99px; }
.tags { font-size: 8.5pt; color: #3b3a40; margin-left: 2.5mm; }
h1 { font-size: 28pt; line-height: 1.05; letter-spacing: -0.03em; font-weight: 700; margin-top: 3.5mm; }
.grad { color: #f2561d; }
.intro { font-size: 10.5pt; line-height: 1.5; color: #3b3a40; margin-top: 3mm; max-width: 165mm; }
.hero { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; margin-top: 5mm; }
.shot { position: relative; min-height: 50mm; border-radius: 5mm; overflow: hidden; background: #fff; box-shadow: 0 0 0 1px #e8e5de inset; }
.shot img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }
.shot.packshot { background: #f2f0eb; box-shadow: none; }
.shot.packshot img { padding: 5mm; }
.facts { background: #fff; border-radius: 5mm; padding: 4mm 5mm; box-shadow: 0 0 0 1px #e8e5de inset; display: flex; flex-direction: column; }
h3 { font-size: 11pt; font-weight: 600; }
.ticks { list-style: none; margin-top: 2.5mm; font-size: 9pt; line-height: 1.45; }
.ticks li { padding-left: 5.5mm; position: relative; margin-top: 1.2mm; }
.ticks li::before { content: "✓"; position: absolute; left: 0; color: #f2561d; font-weight: 700; }
.kv { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2mm; margin-top: auto; padding-top: 3mm; }
.kv div { background: #fafaf7; border-radius: 3mm; padding: 2.5mm 3mm; }
.kv small { display: block; font-size: 7pt; color: #6b6a70; }
.kv b { font-size: 9pt; font-weight: 600; }
h2 { font-size: 12.5pt; font-weight: 600; letter-spacing: -0.01em; margin: 4.5mm 0 2.5mm; display: flex; align-items: center; gap: 2.5mm; }
.bar { width: 5mm; height: 1mm; border-radius: 1mm; background: linear-gradient(118deg, #ff8e06, #c62020); }
table { width: 100%; border-collapse: collapse; }
.prices { background: #fff; border-radius: 4mm; overflow: hidden; box-shadow: 0 0 0 1px #e8e5de inset; font-size: 9.5pt; }
.prices th { text-align: left; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 0.08em; color: #6b6a70; font-weight: 600; padding: 3mm 4mm; background: #f2f0eb; }
.prices td { padding: 2.6mm 4mm; border-top: 1px solid #e8e5de; }
.var { display: flex; align-items: center; gap: 3mm; }
.var b { font-family: "IBM Plex Mono", monospace; font-size: 10.5pt; }
.prof { width: 10mm; display: inline-flex; justify-content: center; }
.tag { font-size: 7pt; font-weight: 600; color: #f2561d; background: #fff3e4; padding: 0.5mm 2mm; border-radius: 99px; }
.price { font-size: 13pt; font-weight: 700; letter-spacing: -0.02em; }
.ask { font-size: 10pt; font-weight: 600; color: #f2561d; }
.note { font-size: 8pt; margin-top: 2.5mm; }
.count { font-size: 8pt; font-weight: 600; color: #f2561d; background: #fff3e4; padding: 0.5mm 2.5mm; border-radius: 99px; letter-spacing: 0; }
.swatches { display: grid; grid-template-columns: repeat(15, 1fr); gap: 1.4mm; }
.swatches figure { display: flex; flex-direction: column; align-items: center; }
.swatches span { display: block; width: 100%; height: 15mm; border-radius: 2mm; background-size: cover; background-position: center; box-shadow: 0 0 0 0.3mm rgba(0,0,0,.08) inset; }
.swatches figcaption { font-family: "IBM Plex Mono", monospace; font-size: 6.4pt; font-weight: 600; margin-top: 1.2mm; white-space: nowrap; letter-spacing: -0.02em; }
.shape { margin-top: 5mm; display: grid; grid-template-columns: 36mm 1fr; align-items: center; gap: 5mm; background: #fff; border-radius: 5mm; padding: 3mm; box-shadow: 0 0 0 1px #e8e5de inset; }
.shape .cut { width: 36mm; height: 36mm; object-fit: cover; border-radius: 3.5mm; }
.shape .kick { font-size: 7.5pt; font-weight: 600; text-transform: uppercase; letter-spacing: .1em; color: #f2561d; }
.shape h3 { font-size: 12.5pt; letter-spacing: -0.02em; margin-top: 1mm; }
.shape p { font-size: 8.3pt; line-height: 1.45; color: #6b6a70; margin-top: 1.5mm; }
.small { font-size: 8pt; line-height: 1.45; margin-top: 2.5mm; }
.uses { list-style: none; counter-reset: u; display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; }
.uses li { counter-increment: u; background: #fff; border-radius: 3.5mm; padding: 2.4mm 3.5mm 2.4mm 12mm; position: relative; box-shadow: 0 0 0 1px #e8e5de inset; }
.uses li::before { content: "0" counter(u); position: absolute; left: 3.5mm; top: 2.8mm; font-family: "IBM Plex Mono", monospace; font-weight: 600; color: #f2561d; font-size: 10pt; }
.uses b { display: block; font-size: 9pt; }
.uses span { display: block; font-size: 7.8pt; color: #6b6a70; line-height: 1.4; margin-top: 0.5mm; }
.signature { margin-top: 5mm; background: #18171b; color: #fff; border-radius: 5mm; padding: 4mm 6mm; background-image: radial-gradient(60mm 50mm at 100% 0, rgba(255,142,6,.35), transparent); }
.signature h3 { font-size: 14pt; letter-spacing: -0.02em; }
.signature p { font-size: 9pt; line-height: 1.45; color: rgba(255,255,255,.72); margin-top: 2mm; }
.benefits { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
.benefits div { background: #fff; border-radius: 3.5mm; padding: 2.8mm 4mm; box-shadow: 0 0 0 1px #e8e5de inset; }
.benefits b { font-size: 9.5pt; display: block; }
.benefits span { font-size: 8.2pt; color: #6b6a70; line-height: 1.45; display: block; margin-top: 1mm; }
.steps { list-style: none; display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; }
.steps li { background: #fff; border-radius: 3.5mm; padding: 3mm; box-shadow: 0 0 0 1px #e8e5de inset; }
.steps .n { display: inline-block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 8.5pt; color: #fff; background: linear-gradient(118deg, #ff8e06, #c62020); border-radius: 2mm; padding: 0.6mm 2mm; }
.steps b { display: block; font-size: 9pt; margin-top: 2mm; }
.steps span:last-child { display: block; font-size: 7.8pt; color: #6b6a70; line-height: 1.4; margin-top: 1mm; }
.specs { margin-bottom: 4mm; background: #fff; border-radius: 4mm; overflow: hidden; box-shadow: 0 0 0 1px #e8e5de inset; font-size: 9pt; }
.specs th { text-align: left; width: 38mm; color: #6b6a70; font-weight: 400; padding: 1.6mm 4mm; }
.specs td { font-weight: 500; padding: 1.6mm 4mm; }
.specs tr + tr th, .specs tr + tr td { border-top: 1px solid #e8e5de; }
.contact { margin-top: auto; flex-shrink: 0; display: grid; grid-template-columns: 1.1fr 1fr; gap: 5mm; background: linear-gradient(118deg, #ff8e06, #f2561d 55%, #c62020); color: #fff; border-radius: 5mm; padding: 4mm 5mm; align-items: center; }
.cta b { display: block; font-size: 12pt; letter-spacing: -0.01em; }
.cta a { display: inline-block; margin-top: 2mm; margin-right: 2mm; color: #18171b; background: #fff; text-decoration: none; font-weight: 600; font-size: 9pt; padding: 1.8mm 4mm; border-radius: 99px; }
.addr { font-size: 8pt; line-height: 1.35; background: rgba(255,255,255,.15); border-radius: 3.5mm; padding: 3mm 4mm; }
.addr small { display: block; font-size: 6.6pt; text-transform: uppercase; letter-spacing: .1em; opacity: .85; font-weight: 600; margin-top: 1.4mm; }
.addr small:first-child { margin-top: 0; }
`;

const FILES = { siku: "EFLOOR-List-Siku-L.pdf", plint: "EFLOOR-List-Plint-Skirting.pdf", adaptasi: "EFLOOR-List-Adaptasi.pdf" };

const prices = JSON.parse(await readFile(path.join(here, "prices.json"), "utf8"));
const pw = await loadPlaywright();
const browser = await pw.chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
await mkdir(outDir, { recursive: true });

const logo = await dataUri("img/header-logo.png");
const swatches = await Promise.all(
  COLORS.map(async (code) => ({ code, src: await dataUri(path.join(here, "colors", `${code.replace(" ", "-")}.jpg`)) })),
);
// Bundled (OFL) font files, embedded so the PDF renders the same offline.
const fontCss = (
  await Promise.all(
    [["Poppins", 400], ["Poppins", 500], ["Poppins", 600], ["Poppins", 700], ["IBM Plex Mono", 500], ["IBM Plex Mono", 600]].map(
      async ([family, weight]) => {
        const file = path.join(here, "fonts", `${family.replaceAll(" ", "")}-${weight}.woff2`);
        const b64 = (await readFile(file)).toString("base64");
        return `@font-face{font-family:"${family}";font-weight:${weight};src:url(data:font/woff2;base64,${b64}) format("woff2");}`;
      },
    ),
  )
).join("");
for (const key of Object.keys(FILES)) {
  const config = TRIMS[key];
  console.log(`${config.name}`);
  const variants = await variantsFor(config, prices[key] ?? []);
  const img = {
    logo,
    hero: await dataUri(config.gallery[0].src),
    swatches,
    shape:
      key === "plint"
        ? { cut: await dataUri(path.join(here, "img/plint-penampang.webp")) }
        : undefined,
  };
  const html = `<!doctype html><html lang="id"><head><meta charset="utf-8">
<style>${fontCss}${CSS}</style></head><body>
<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8e06"/><stop offset="1" stop-color="#c62020"/></linearGradient></defs></svg>
${sheet(config, variants, img)}</body></html>`;

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  // Each A4 page clips its content, so fail loudly instead of printing a cut-off sheet.
  const overflow = await page.evaluate(() =>
    [...document.querySelectorAll(".page")].map((el) => el.scrollHeight - el.clientHeight),
  );
  if (process.env.DEBUG) {
    // Block heights per page, for tuning the layout when a page overflows.
    console.log(await page.evaluate(() => [...document.querySelectorAll(".page")].map((pg, n) => `p${n + 1} ` + [...pg.children].map((c) => `${c.className || c.tagName}:${Math.round(c.getBoundingClientRect().height)}`).join(" ")).join("\n")));
  }
  if (overflow.some((px) => px > 1)) {
    throw new Error(`${config.name}: content overflows the page by ${overflow.map((px) => `${px}px`).join(" / ")}`);
  }
  const file = path.join(outDir, FILES[key]);
  await page.pdf({ path: file, format: "A4", printBackground: true, preferCSSPageSize: true });
  if (process.env.PREVIEW) await page.screenshot({ path: file.replace(".pdf", ".png"), fullPage: true });
  await page.close();
  console.log(`  ${variants.map((v) => `${v.label}: ${v.price ? rupiah(v.price) : "Tanya harga"}`).join(", ")}\n  → ${path.relative(root, file)}`);
}
await browser.close();
