'use client'

import { getOwner } from '@/services/owner.service'
import { Owner } from '@/types/owner.types'
import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'

export const useOwners = () => {
  const { session } = useAuth()
  const [owners, setOwners] = useState<Owner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session?.accessToken) return

    const fetchOwners = async () => {
      const data = await getOwner(session.accessToken)
      setOwners(data)
      setLoading(false)
    }

    fetchOwners()
  }, [session])

  return { owners, loading }
}
