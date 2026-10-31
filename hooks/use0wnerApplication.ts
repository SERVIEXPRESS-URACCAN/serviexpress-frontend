'use client'

import { getOwnerApplications } from '@/services/owner.service'
import { OwnerResponse } from '@/types/owner.types'
import { useCallback, useEffect, useState } from 'react'

export const useOwnerApplications = (page = 1) => {
  const [applications, setApplications] = useState<OwnerResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true)

      const response = await getOwnerApplications(page)
      console.log('Respuesta de solicitudes de propietarios:', response)

      setApplications(response)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'))
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchApplications()
  }, [fetchApplications])

  return {
    applications,
    loading,
    error,
    fetchApplications,
  }
}
