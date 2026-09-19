import { cookies } from "next/headers";
import type { Metadata } from "next";
import { AUTH_COOKIE_NAME, isValidSessionToken } from "@/app/lib/adsDashboard/auth";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";

export const metadata: Metadata = {
  title: "Ads dashboard — EFLOOR internal",
  robots: { index: false, follow: false },
};

export default async function AdsDashboardPage() {
  const store = await cookies();
  const authed = isValidSessionToken(store.get(AUTH_COOKIE_NAME)?.value);

  return (
    <main className="min-h-screen bg-[#f9f9f7] px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {authed ? <Dashboard /> : <LoginForm />}
      </div>
    </main>
  );
}
