'use client'
import { useEffect, useState, useCallback } from 'react'
import { getClientes } from '@/services/clients.service'
import { ClientsResponse } from '@/types/clients'
import { useSearchParams } from 'next/navigation'

export const useClients = () => {

  const searchParams = useSearchParams()
  const search = searchParams.get('search') || undefined
  const page = Number(searchParams.get('page') || 1)

  const [clients, setClients] = useState<ClientsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchClients = useCallback(async () => {
    try {
      const data = await getClientes(page, 10, search)
      if (data) setClients(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'))
    } finally {
      setLoading(false)
    }
  }, [ page, search])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchClients()
  }, [fetchClients])

  return { clients, loading, error, fetchClients }
}
