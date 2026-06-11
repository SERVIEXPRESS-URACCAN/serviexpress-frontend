import { getSession } from "next-auth/react"
import { refreshTokenService } from "@/services/auth.service"
import { handleSessionExpired } from "./session-expired";

let refreshPromise: Promise<string> | null = null
let cachedToken: { value: string; expiresAt: number } | null = null

async function getValidToken(update?: (data: unknown) => Promise<unknown>): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 15_000) {
    return cachedToken.value
  }

  refreshPromise ??= (async () => {
    const session = await getSession()
    if (!session?.refreshToken) throw new Error('No refresh token')

    const refreshed = await refreshTokenService(session.refreshToken)
    console.log('Refresh exitoso, expira:', new Date(refreshed.expires_at * 1000).toISOString())

    cachedToken = {
      value: refreshed.access_token,
      expiresAt: refreshed.expires_at * 1000,
    }

    if (update) {
      await update({
        accessToken: refreshed.access_token,
        refreshToken: refreshed.refresh_token,
        expiresAt: refreshed.expires_at * 1000,
      })
    }

    return refreshed.access_token
  })().finally(() => {
    refreshPromise = null
  })

  return refreshPromise
}

export async function fetchAuth(
  input: RequestInfo | URL,
  init: RequestInit = {},
  update?: (data: unknown) => Promise<unknown>,
  retries = 1 
) {
  try {
    const token = await getValidToken(update)

    const response = await fetch(input, {
      ...init,
      headers: {
        ...init.headers,
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status !== 401) return response

    if (retries <= 0) {
      await handleSessionExpired()
      throw new Error('Session expired')
    }

    cachedToken = null
    return fetchAuth(input, init, update, retries - 1)

  } catch {
    await handleSessionExpired()
    throw new Error('Session expired')
  }
}export function setAuthToken(accessToken: string, expiresAt: number) {
  cachedToken = { value: accessToken, expiresAt }
}

export function clearAuthToken() {
  cachedToken = null
  refreshPromise = null
}