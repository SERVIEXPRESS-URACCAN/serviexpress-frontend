import { getSession } from 'next-auth/react'
import { refreshTokenService } from '@/services/auth.service'
import { handleSessionExpired } from './session-expired'

let isRefreshing = false
let refreshPromise: Promise<string> | null = null

const CACHE_KEY = 'auth_token_cache'

type CachedToken = { value: string; expiresAt: number }

function readCache(): CachedToken | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    return raw ? (JSON.parse(raw) as CachedToken) : null
  } catch {
    return null
  }
}

function writeCache(token: CachedToken) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(token))
  } catch {}
}

function clearCache() {
  try {
    sessionStorage.removeItem(CACHE_KEY)
  } catch {}
}

const REFRESH_THRESHOLD = 15_000 

async function getValidToken(
  update?: (data: unknown) => Promise<unknown>
): Promise<string> {
  const cached = readCache()

  if (cached && Date.now() < cached.expiresAt - REFRESH_THRESHOLD) {
    return cached.value
  }

  if (cached && Date.now() >= cached.expiresAt - REFRESH_THRESHOLD) {

    if (isRefreshing && refreshPromise) {
      return refreshPromise
    }

    isRefreshing = true  
    return triggerRefresh(update)
  }

  const session = await getSession()
  if (!session?.accessToken || !session?.expiresAt) throw new Error('No session')

  const msUntilExpiry = session.expiresAt - Date.now()

  if (msUntilExpiry > REFRESH_THRESHOLD) {
    writeCache({ value: session.accessToken, expiresAt: session.expiresAt })
    return session.accessToken
  }

  if (isRefreshing && refreshPromise) {
    return refreshPromise
  }

  isRefreshing = true
  return triggerRefresh(update, session.refreshToken)
}

async function triggerRefresh(
  update?: (data: unknown) => Promise<unknown>,
  refreshToken?: string
): Promise<string> {

  refreshPromise = (async () => {
    try {
      const token = refreshToken ?? (await getSession())?.refreshToken
      if (!token) throw new Error('No refresh token')

      const refreshed = await refreshTokenService(token)
      console.log('[auth]  Token renovado, expira:', new Date(refreshed.expires_at * 1000).toISOString())

      const expiresAt = refreshed.expires_at * 1000
      writeCache({ value: refreshed.access_token, expiresAt })

      await update?.({
        accessToken: refreshed.access_token,
        refreshToken: refreshed.refresh_token,
        expiresAt,
      })

      return refreshed.access_token
    } catch (error) {
      clearCache()
      throw error
    }
  })().finally(() => {
    isRefreshing = false
    refreshPromise = null
  })

  return refreshPromise

} export async function fetchAuth(
  input: RequestInfo | URL,
  init: RequestInit = {},
  update?: (data: unknown) => Promise<unknown>,
  retries = 1
): Promise<Response> {
  try {
    const token = await getValidToken(update)
    const response = await fetch(input, {
      ...init,
      headers: { ...init.headers, Authorization: `Bearer ${token}` },
    })

    if (response.status !== 401) return response

    if (retries <= 0) {
      await handleSessionExpired()
      throw new Error('Session expired')
    }

    clearCache() 
    return fetchAuth(input, init, update, retries - 1)
  } catch (error) {
    await handleSessionExpired()
    throw error
  }
}

export function setAuthToken(accessToken: string, expiresAt: number) {
  writeCache({ value: accessToken, expiresAt })
}

export function clearAuthToken() {
  clearCache()
  refreshPromise = null
}