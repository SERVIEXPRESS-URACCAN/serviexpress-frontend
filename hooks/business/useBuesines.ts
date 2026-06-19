'use client'

import { getBusinessById } from '@/services/business.service'
import { Business } from '@/types/business.type'
import { useCallback, useEffect, useState } from 'react'


export const useBusines = (id: number) => {
  const [busines, setBusines] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)


  const fetchBusines = useCallback(async () => {
   setLoading(true)
    try {
      const data = await getBusinessById(id);
      if (data) setBusines(data.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'));
    } finally {
      setLoading(false);
    }
  }, [ id]);

useEffect(() => {
  //eslint-disable-next-line react-hooks/set-state-in-effect
  fetchBusines()

}, [fetchBusines])
  return {
    busines,
    loading,
    error,
    fetchBusines,
  }
}