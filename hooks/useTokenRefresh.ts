'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useRef } from 'react'
import { refreshTokenService } from '@/services/auth.service'

export function useTokenRefresh() {
  const { data: session, update } = useSession()
  const isRefreshing = useRef(false)

  useEffect(() => {
    if (!session?.expiresAt || !session?.refreshToken) return

    const msUntilExpiry = session.expiresAt - Date.now()
    const refreshIn = Math.max(msUntilExpiry - 15_000, 0)

    const timeout = setTimeout(async () => {
      if (isRefreshing.current) return
      isRefreshing.current = true

      try {
        const refreshed = await refreshTokenService(session.refreshToken)
        
        await update({
          accessToken: refreshed.access_token,
          refreshToken: refreshed.refresh_token,
          expiresAt: refreshed.expires_at * 1000,
        })
      } catch {
      } finally {
        isRefreshing.current = false
      }
    }, refreshIn)

    return () => clearTimeout(timeout)
  }, [session?.expiresAt])
}