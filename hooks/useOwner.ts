import { getOwner } from '@/services/owner.service'
import { OwnerResponse } from '@/types/owner.types'

import { useEffect, useState } from 'react'

import { useAuth } from './useAuth'

export const useOwners = () => {
  const { session } = useAuth()

  const [owners, setOwners] = useState<OwnerResponse | null>(null)

  const [loading, setLoading] = useState(true)

  const fetchOwners = async () => {
    if (!session?.accessToken) return

    try {
      const response = await getOwner(session.accessToken)

      setOwners(response)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOwners()
  }, [session])

  return {
    owners,
    loading,
    fetchOwners
  }
}
