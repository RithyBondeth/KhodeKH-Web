import { NextResponse } from "next/server"
import { callGateway } from "@/lib/auth/gateway"
import { clearSessionCookies, getAccessToken } from "@/lib/auth/session"

/**
 * Tells the gateway to invalidate the stored refresh token, then drops the
 * cookies. Cookies are cleared even if the gateway call fails — otherwise a
 * server blip would leave the user stuck in a session they asked to end.
 */
export async function POST() {
  const accessToken = await getAccessToken()

  if (accessToken) {
    await callGateway("/auth/logout", { accessToken })
  }

  await clearSessionCookies()
  return NextResponse.json({ ok: true })
}
