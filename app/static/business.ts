// Single source of truth for EFLOOR's store details and marketplace shops —
// used by the contact page, the footer and the structured data, so a change
// of address, hours or shop link is a one-file edit.

export const BUSINESS_ADDRESS = {
  street:
    "Jl. Raya Gading Bukit Indah No.2, RT.18/RW.8, Klp. Gading Bar., Kec. Klp. Gading",
  locality: "Jakarta Utara",
  region: "DKI Jakarta",
  postalCode: "14240",
  country: "ID",
};

export const BUSINESS_ADDRESS_DISPLAY =
  "Jl. Raya Gading Bukit Indah No.2, RT.18/RW.8, Klp. Gading Bar., Kec. Klp. Gading, Jkt Utara, Daerah Khusus Ibukota Jakarta 14240";

export const OPENING_HOURS_DISPLAY = "11.00 – 17.00 WIB";

export const MARKETPLACES = [
  { id: "shopee", label: "Shopee", url: "https://shopee.co.id/efloor.id" },
  { id: "tokopedia", label: "Tokopedia", url: "https://www.tokopedia.com/efloorid" },
];

export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  BUSINESS_ADDRESS_DISPLAY,
)}&output=embed`;

export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  BUSINESS_ADDRESS_DISPLAY,
)}`;
