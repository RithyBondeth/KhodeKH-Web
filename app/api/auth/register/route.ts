import { NextResponse } from "next/server"
import { callGateway } from "@/lib/auth/gateway"
import type { ISessionTokens } from "@/lib/auth/session"

/**
 * Registration returns a token pair, but we deliberately do NOT start a session
 * with it: the gateway blocks login until the email is verified, so a session
 * here would let a user into the app in a state the API will reject on refresh.
 * The client sends them to the verify-email notice instead.
 */
export async function POST(request: Request) {
  const payload = await request.json()

  const result = await callGateway<ISessionTokens>("/auth/register", {
    body: payload,
  })

  if (!result.ok) {
    return NextResponse.json({ message: result.message }, { status: result.status })
  }

  return NextResponse.json({ ok: true })
}
