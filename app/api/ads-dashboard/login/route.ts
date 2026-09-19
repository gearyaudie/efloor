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

  if (!password || !isCorrectPassword(password)) {
    return NextResponse.json({ ok: false, error: "Wrong password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return response;
}
