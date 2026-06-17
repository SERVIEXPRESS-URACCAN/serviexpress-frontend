import { getOwner } from '@/services/owner.service'
import { OwnerResponse } from '@/types/owner.types'

import { useEffect, useState } from 'react'

import { useAuth } from './useAuth'
import { useSearchParams } from 'next/navigation'

export const useOwners = () => {
  const { session } = useAuth()

  const [owners, setOwners] = useState<OwnerResponse | null>(null)

  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const search = searchParams.get('search') || undefined

  const page = Number(searchParams.get('page') || 1)

  const fetchOwners = async () => {
    if (!session?.accessToken) return

    try {
      const response = await getOwner(session.accessToken, page, search)

      setOwners(response)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOwners()
  }, [session, search, page])

  return {
    owners,
    loading,
    fetchOwners,
  }
}
