import { Owner } from '@/types/owner.types'

import { useEffect, useState, useCallback } from 'react';

import { useSearchParams } from 'next/navigation'
import { getOwnerById } from '@/services/owner.service';

export const useOwner = (id:number) => {

  const [owners, setOwners] = useState<Owner | null>(null)

  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const search = searchParams.get('search') || undefined
  const [error, setError] = useState<Error | null>(null)
  const page = Number(searchParams.get('page') || 1)

  const fetchOwners = useCallback(async () => {

    try {
      setLoading(true)
      const response = await getOwnerById(id)
      if (response) 
      setOwners(response)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'))
    } finally {
      setLoading(false)
    }
  }, [id])

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
