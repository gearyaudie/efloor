"use client";

import { useEffect, useState } from "react";
import { OPENING_HOURS_SPEC } from "../static/business";

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "Buka sekarang" / "Tutup" badge in Jakarta time. Renders nothing until
 * mounted, so the static HTML never shows a stale status. */
export default function OpenStatus() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).formatToParts(new Date());
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
      const now = Number(get("hour")) * 60 + Number(get("minute"));
      setOpen(
        OPENING_HOURS_SPEC.days.includes(get("weekday")) &&
          now >= toMinutes(OPENING_HOURS_SPEC.opens) &&
          now < toMinutes(OPENING_HOURS_SPEC.closes),
      );
    };
    check();
    const id = window.setInterval(check, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (open === null) return null;
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12.5px] font-semibold ${
        open ? "bg-wa/10 text-wa" : "bg-surface text-muted"
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${open ? "bg-wa animate-pulse" : "bg-muted"}`} />
      {open ? "Buka sekarang" : "Tutup — balas di jam buka"}
    </span>
  );
}
