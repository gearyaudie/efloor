import { cookies } from "next/headers";
import type { Metadata } from "next";
import { AUTH_COOKIE_NAME, isValidSessionToken } from "@/app/lib/adsDashboard/auth";
import LoginForm from "../ads-dashboard/LoginForm";
import InvoiceForm from "./InvoiceForm";

export const metadata: Metadata = {
  title: "Issue invoice — EFLOOR internal",
  robots: { index: false, follow: false },
};

export default async function IssueInvoicePage() {
  const store = await cookies();
  // Shared with the ads dashboard's password gate — one login covers all /internal tools.
  const authed = isValidSessionToken(store.get(AUTH_COOKIE_NAME)?.value);

  return (
    <main className="min-h-screen bg-[#f9f9f7] px-4 py-10">
      <div className="mx-auto max-w-3xl">{authed ? <InvoiceForm /> : <LoginForm />}</div>
    </main>
  );
}
