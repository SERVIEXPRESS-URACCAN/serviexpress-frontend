'use client'

import { useEffect, useState } from 'react'
import { getClientes } from '@/services/clients.service'
import { ClientsResponse } from '@/types/clients'
import { useAuth } from './useAuth'

export const useClients = () => {
    const { session } = useAuth()
  
  const [clients, setClients] = useState<ClientsResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchClients = async () => {
    if (!session?.accessToken) return
    

    try {
      const response = await getClientes(session.accessToken)

      setClients(response)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [session])

  return {
    clients,
    loading,
    fetchClients,
  }
}