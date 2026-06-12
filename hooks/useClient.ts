'use client'

import { useCallback, useEffect, useState } from 'react'

import { getClientById } from '@/services/clients.service'
import { Clients } from '@/types/clients'

import { useAuth } from './useAuth'

export const useClient = (id: number) => {
  const { session } = useAuth()

  const [client, setClient] = useState<Clients | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)


const fetchClient = useCallback(async () => {
    if (!session?.accessToken) return;
    try {
      const data = await getClientById(session.accessToken, id);
      if (data) setClient(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'));
    } finally {
      setLoading(false);
    }
  }, [session, id]);

useEffect(() => {
  //eslint-disable-next-line
  fetchClient()

}, [fetchClient])
  return {
    client,
    loading,
    error,
    fetchClient,
  }
}