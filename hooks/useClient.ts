'use client'

import { useCallback, useEffect, useState } from 'react'

import { getClientById } from '@/services/clients.service'
import { Clients } from '@/types/clients'


export const useClient = (id: number) => {
  const [client, setClient] = useState<Clients | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)


  const fetchClient = useCallback(async () => {
   setLoading(true)
    try {
      const data = await getClientById(id);
      if (data) setClient(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'));
    } finally {
      setLoading(false);
    }
  }, [ id]);

useEffect(() => {
  //eslint-disable-next-line react-hooks/set-state-in-effect
  fetchClient()

}, [fetchClient])
  return {
    client,
    loading,
    error,
    fetchClient,
  }
}