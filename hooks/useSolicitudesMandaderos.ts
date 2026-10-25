'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { getSolicitudMandadero } from '@/services/mandadero.service'
import type { MandaderoResponse } from '@/types/mandadero.type'

export const useSolicitudesMandadero = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') || 1)

  const [solicitudes, setSolicitudes] = useState<MandaderoResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchSolicitudes = useCallback(async () => {
    try {
      const data = await getSolicitudMandadero()

      setSolicitudes(data)
      setError(null)
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('Error al cargar las solicitudes'),
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSolicitudes()
  }, [fetchSolicitudes, page])

  return {
    solicitudes,
    loading,
    error,
    fetchSolicitudes,
  }
}
