'use client'

import { useEffect, useState } from 'react'

import { getClientById } from '@/services/clients.service'
import { Clients } from '@/types/clients'

import { useAuth } from './useAuth'

export const useClient = (id: number) => {
  const { session } = useAuth()

  const [client, setClient] = useState<Clients | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchClient = async () => {
    if (!session?.accessToken) return

    try {
      setLoading(true)

      const response = await getClientById(
        session.accessToken,
        id
      )

      setClient(response)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClient()
  }, [session, id])

  return {
    client,
    loading,
    fetchClient,
  }
}