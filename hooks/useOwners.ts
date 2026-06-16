import { getOwner } from '@/services/owner.service'
import { OwnerResponse } from '@/types/owner.types'

import { useEffect, useState, useCallback } from 'react';

import { useSearchParams } from 'next/navigation'

export const useOwners = () => {

  const [owners, setOwners] = useState<OwnerResponse | null>(null)

  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const search = searchParams.get('search') || undefined
  const [error, setError] = useState<Error | null>(null)
  const page = Number(searchParams.get('page') || 1)

  const fetchOwners = useCallback(async () => {

    try {
      const response = await getOwner( page, search)
      if (response) 
      setOwners(response)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'))
    } finally {
      setLoading(false)
    }
  }, [page, search])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOwners()
  }, [search, page])

  return {
    owners,
    loading,
    fetchOwners,
    error 
  }
}
