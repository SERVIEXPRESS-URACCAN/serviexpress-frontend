'use client'

import { MandaderoResponse } from '@/types/mandadero.type'
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import { getMandaderos } from '@/services/mandadero.service'
import { useSearchParams } from 'next/navigation'

export const useMandaderos = () => {
  const { session } = useAuth()

  const [mandaderos, setMandaderos] = useState<MandaderoResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const search = searchParams.get('search') || undefined

  const fetchMandaderos = useCallback(async () => {
    if (!session?.accessToken) return

    try {
      setLoading(true)

      const response = await getMandaderos(session.accessToken, 1, search)

      setMandaderos(response)
    } finally {
      setLoading(false)
    }
  }, [session?.accessToken, search])
  useEffect(() => {
    fetchMandaderos()
  }, [fetchMandaderos])

  return {
    mandaderos,
    loading,
    fetchMandaderos,
  }
}
