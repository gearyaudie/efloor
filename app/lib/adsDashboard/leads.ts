import { leadsKeyForDate, leadsStore } from "./blobStore";
import type { LeadDay, LeadEvent } from "./types";

export async function appendLeadEvent(event: LeadEvent): Promise<void> {
  const date = event.loggedAt.slice(0, 10);
  const store = leadsStore();
  const key = leadsKeyForDate(date);
  const existing = (await store.get(key, { type: "json" })) as LeadDay | null;
  const day: LeadDay = existing ?? { date, events: [] };
  day.events.push(event);
  await store.setJSON(key, day);
}

/** Reads every logged lead event whose day falls within the last `days` days (inclusive of today). */
export async function readRecentLeadEvents(days: number): Promise<LeadEvent[]> {
  const store = leadsStore();
  const { blobs } = await store.list({ prefix: "day/" });

  const cutoff = new Date();
  cutoff.setUTCDate(cutoff.getUTCDate() - days);
  const cutoffKey = leadsKeyForDate(cutoff.toISOString().slice(0, 10));

  const relevantKeys = blobs.map((b) => b.key).filter((key) => key >= cutoffKey);

  const days_ = await Promise.all(
    relevantKeys.map((key) => store.get(key, { type: "json" }) as Promise<LeadDay | null>),
  );

  return days_.flatMap((d) => d?.events ?? []);
}
