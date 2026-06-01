'use client'

import { useEffect, useState } from 'react'
import { getClientes } from '@/services/clients.service'
import { ClientsResponse } from '@/types/clients'
import { useAuth } from './useAuth'
import { useSearchParams } from 'next/navigation'

export const useClients = () => {
  const { session } = useAuth()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') || 1)

  const [clients, setClients] = useState<ClientsResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchClients = async () => {
    if (!session?.accessToken) return
    try {
      setLoading(true)
      const response = await getClientes(session.accessToken, page)

      setClients(response)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [session, page])

  return {
    clients,
    loading,
    fetchClients,
  }
}