import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, createSessionToken, isCorrectPassword } from "@/app/lib/adsDashboard/auth";

export async function POST(request: NextRequest) {
  let password: string | undefined;
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : undefined;
  } catch {
    // fall through to the missing-password response below
  }

  let correct: boolean;
  let token: string;
  try {
    correct = Boolean(password) && isCorrectPassword(password!);
    token = createSessionToken();
  } catch (error) {
    // ADS_DASHBOARD_PASSWORD/ADS_DASHBOARD_SECRET missing on this deploy —
    // surface that distinctly instead of letting it read as "wrong password".
    console.error("ads-dashboard login misconfigured", error);
    return NextResponse.json(
      { ok: false, error: "Dashboard is not configured on this deploy yet" },
      { status: 500 },
    );
  }

  if (!correct) {
    return NextResponse.json({ ok: false, error: "Wrong password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return response;
}
