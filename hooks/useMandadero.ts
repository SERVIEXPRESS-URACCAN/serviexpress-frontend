'use client'

import { useCallback, useEffect, useState } from 'react'
import { getMandaderoById } from '@/services/mandadero.service'
import { Mandadero } from '@/types/mandadero.type'

export const useMandadero = (id: number) => {
  const [mandadero, setMandadero] =
    useState<Mandadero | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchMandadero = useCallback(async () => {
    try {
      setLoading(true)

      const response = await getMandaderoById(id)

      setMandadero(response)
      setError(null)
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('Error inesperado')
      )
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMandadero()
  }, [fetchMandadero])

  return {
    mandadero,
    loading,
    error,
    fetchMandadero,
  }
}