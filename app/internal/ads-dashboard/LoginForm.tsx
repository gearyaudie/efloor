"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/ads-dashboard/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Wrong password.");
        return;
      }
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto mt-24 max-w-sm rounded-xl border border-[rgba(11,11,11,0.10)] bg-[#fcfcfb] p-6 shadow-sm">
      <h1 className="text-[1.25rem] font-semibold text-[#0b0b0b]">Ads dashboard</h1>
      <p className="mt-1 text-sm text-[#52514e]">Internal use only.</p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="rounded-lg border border-[#c3c2b7] px-3 py-2 text-sm outline-none focus:border-[#2a78d6]"
        />
        {error ? <p className="text-sm text-[#d03b3b]">{error}</p> : null}
        <button
          type="submit"
          disabled={submitting || !password}
          className="rounded-lg bg-[#2a78d6] px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {submitting ? "Checking…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
