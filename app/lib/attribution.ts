// First-party record of the ad click that brought a visitor in, kept so a
// WhatsApp chat that starts days later can still be traced back to it.

const COOKIE_NAME = "efloor_attr";
// Matches the longest Google Ads click-through conversion window.
const MAX_AGE_SECONDS = 90 * 24 * 60 * 60;

const CLICK_ID_PARAMS = ["gclid", "gbraid", "wbraid"] as const;
const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

type TrackedParam = (typeof CLICK_ID_PARAMS)[number] | (typeof UTM_PARAMS)[number];

export type Attribution = Partial<Record<TrackedParam, string>> & {
  landing_page?: string;
  captured_at?: string;
};

/**
 * Stores click IDs and UTM tags from the current URL. Only a visit that
 * carries them overwrites the cookie, so browsing on to other pages or coming
 * back directly keeps the ad click that originally brought the visitor.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const incoming: Attribution = {};
  for (const key of [...CLICK_ID_PARAMS, ...UTM_PARAMS]) {
    const value = params.get(key);
    if (value) incoming[key] = value;
  }
  if (Object.keys(incoming).length === 0) return;

  incoming.landing_page = window.location.pathname;
  incoming.captured_at = new Date().toISOString();

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(incoming),
  )}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
}

export function getAttribution(): Attribution {
  if (typeof document === "undefined") return {};
  const entry = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));
  if (!entry) return {};
  try {
    return JSON.parse(decodeURIComponent(entry.slice(COOKIE_NAME.length + 1)));
  } catch {
    return {};
  }
}

// No 0/O or 1/I, so a code read out loud or retyped from a chat stays
// unambiguous. 32 symbols divide 256 evenly, so every symbol is equally likely.
const REF_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

/**
 * A short code for one WhatsApp click, e.g. "G-7K2QX9". It is written into the
 * chat's first message and sent as the Google Ads conversion's transaction ID,
 * so an order closed in that chat can later be matched back to the conversion.
 * "G" means the visitor arrived from a Google Ads click, "W" means any other
 * visit.
 */
export function createLeadRef(): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const code = Array.from(bytes, (b) => REF_ALPHABET[b % REF_ALPHABET.length]).join("");
  const { gclid, gbraid, wbraid } = getAttribution();
  return `${gclid || gbraid || wbraid ? "G" : "W"}-${code}`;
}
