import { createHmac, timingSafeEqual } from "node:crypto";

export const AUTH_COOKIE_NAME = "efloor_ads_dashboard";
const SESSION_LENGTH_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function secret(): string {
  const value = process.env.ADS_DASHBOARD_SECRET;
  if (!value) {
    throw new Error("Missing required env var ADS_DASHBOARD_SECRET");
  }
  return value;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Constant-time check of the submitted password against the configured one. */
export function isCorrectPassword(candidate: string): boolean {
  const expected = process.env.ADS_DASHBOARD_PASSWORD;
  if (!expected) {
    throw new Error("Missing required env var ADS_DASHBOARD_PASSWORD");
  }
  return safeEqual(candidate, expected);
}

/** Builds a signed session token: `<expiryMs>.<hmac>`. */
export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_LENGTH_MS;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (!safeEqual(sign(payload), signature)) return false;
  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}
