// One-time migration: seeds Sanity's new `b2bProject` documents from the
// real procurement data that used to live in app/static/projectCaseStudies.ts,
// using the images already in public/img/pro-1.jpg .. pro-12.jpg.
//
// Usage:
//   SANITY_PROJECT_ID=n5elvhr7 SANITY_DATASET=production SANITY_TOKEN=xxx \
//     node scripts/migrate-b2b-projects.mjs
//
// Safe to re-run: uses createOrReplace with a deterministic _id per source
// image, so re-running just updates the same 12 documents instead of
// duplicating them.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PROJECT_ID = process.env.SANITY_PROJECT_ID;
const DATASET = process.env.SANITY_DATASET;
const TOKEN = process.env.SANITY_TOKEN;
const API_VERSION = "2024-05-11";

if (!PROJECT_ID || !DATASET || !TOKEN) {
  console.error(
    "Missing SANITY_PROJECT_ID, SANITY_DATASET or SANITY_TOKEN env vars.",
  );
  process.exit(1);
}

const MONTHS = {
  januari: "01",
  februari: "02",
  maret: "03",
  april: "04",
  mei: "05",
  juni: "06",
  juli: "07",
  agustus: "08",
  september: "09",
  oktober: "10",
  november: "11",
  desember: "12",
};

function toIsoDate(indonesianDate) {
  const [day, monthName, year] = indonesianDate.trim().split(/\s+/);
  const month = MONTHS[monthName.toLowerCase()];
  if (!month) throw new Error(`Unknown month in date: ${indonesianDate}`);
  return `${year}-${month}-${day.padStart(2, "0")}`;
}

// Transcribed from app/static/projectCaseStudies.ts (kept in sync manually
// since that file is being retired once this migration is verified).
const PROJECT_CASE_STUDIES = [
  { image: "pro-1.jpg", client: "PT K.E.T", label: "Procurement", product: "Lem Vinyl 20 KG", quantity: "75 Pcs", date: "19 Februari 2022" },
  { image: "pro-2.jpg", client: "PT P.P.J", label: "Procurement", product: "Lem Vinyl 20 KG", quantity: "75 Pcs", date: "25 November 2023" },
  { image: "pro-3.jpg", client: "PT S.S", label: "Procurement", product: "Lem Karpet MAX 20 KG", quantity: "19 Pcs", date: "14 Januari 2026" },
  { image: "pro-4.jpg", client: "Pk. Aji", label: "Procurement", product: "Lem Karpet MAX 20 KG", quantity: "8 Pcs", date: "19 Januari 2026" },
  { image: "pro-5.jpg", client: "Pk. Aji", label: "Procurement", product: "Lem Karpet 4 KG", quantity: "20 Pcs", date: "5 Februari 2026" },
  { image: "pro-6.jpg", client: "Pk. Arif", label: "Procurement", product: "Lem Karpet 4 KG", quantity: "10 Pcs", date: "5 Februari 2026" },
  { image: "pro-7.jpg", client: "PT S.I.T", label: "Procurement", product: "Lem Karpet 20 KG", quantity: "12 Pcs", date: "11 Februari 2026" },
  { image: "pro-8.jpg", client: "PT E.K.I", label: "Project Needs", product: "Lem Karpet Max 4 KG", quantity: "20 Pcs", date: "23 Februari 2026" },
  { image: "pro-9.jpg", client: "PT W.J.T", label: "Supply Toko", product: "Lem Karpet 4 KG", quantity: "9 Pcs", date: "24 Februari 2026" },
  { image: "pro-10.jpg", client: "PT Raja Plafon", label: "Kebutuhan Projek", product: "Lem Vinyl 1 KG x 30 pcs, Lem Vinyl 4 KG x 30 pcs", quantity: "60 Pcs", date: "26 Februari 2026" },
  { image: "pro-11.jpg", client: "PT IKS", label: "Projek Pembangunan Interior Pabrik", product: "Lem Vinyl 20 KG", quantity: "10 Pcs", date: "27 Februari 2026" },
  { image: "pro-12.jpg", client: "PT STZ", label: "Kebutuhan Logistics", product: "Lem Vinyl 20 KG", quantity: "5 Pcs", date: "3 Maret 2026" },
];

async function uploadImage(filename) {
  const filePath = path.join(__dirname, "..", "public", "img", filename);
  const bytes = readFileSync(filePath);
  const res = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/assets/images/${DATASET}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "image/jpeg",
      },
      body: bytes,
    },
  );
  if (!res.ok) {
    throw new Error(`Asset upload failed for ${filename}: ${await res.text()}`);
  }
  const json = await res.json();
  return json.document._id;
}

async function mutate(mutations) {
  const res = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mutations }),
    },
  );
  if (!res.ok) {
    throw new Error(`Mutation failed: ${await res.text()}`);
  }
  return res.json();
}

async function main() {
  for (const entry of PROJECT_CASE_STUDIES) {
    const assetId = await uploadImage(entry.image);
    const docId = `b2bProject-${entry.image.replace(/\.[^.]+$/, "")}`;

    await mutate([
      {
        createOrReplace: {
          _id: docId,
          _type: "b2bProject",
          type: entry.label,
          namaBarang: entry.product,
          namaPT: entry.client,
          quantity: entry.quantity,
          tanggal: toIsoDate(entry.date),
          photo: {
            _type: "image",
            asset: { _type: "reference", _ref: assetId },
          },
        },
      },
    ]);

    console.log(`Synced ${entry.image} -> ${docId}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
