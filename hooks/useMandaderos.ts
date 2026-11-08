'use client'

import { MandaderoResponse } from '@/types/mandadero.type'
import { useCallback, useEffect, useState } from 'react'
import { getMandaderos } from '@/services/mandadero.service'
import { useSearchParams } from 'next/navigation'

export const useMandaderos = () => {
  const [mandaderos, setMandaderos] = useState<MandaderoResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const search = searchParams.get('search') || undefined
  const currentPage = Number(searchParams.get('page')) || 1

  const [error, setError] = useState<Error | null>(null)
  const fetchMandaderos = useCallback(async () => {
    try {
      setLoading(true)

      const response = await getMandaderos(currentPage, search)
      if (response) setMandaderos(response)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'))
    } finally {
      setLoading(false)
    }
  }, [currentPage, search])
  useEffect(() => {
    //eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMandaderos()
  }, [fetchMandaderos])

  return {
    mandaderos,
    loading,
    fetchMandaderos,
    error,
  }
}
