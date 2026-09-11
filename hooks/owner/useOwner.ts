'use client'

import { getOwnerById } from '@/services/owner.service'
import { Owner } from '@/types/owner.types'
import { useCallback, useEffect, useState } from 'react'

export const useOwner = (id: number) => {
  const [owner, setOwner] = useState<Owner | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchOwner = useCallback(async () => {
    if (!id) return

    try {
      setLoading(true)

      const response = await getOwnerById(id)

      setOwner(response)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'))
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOwner()
  }, [fetchOwner])

  return {
    owner,
    loading,
    error,
    fetchOwner
  }
}
