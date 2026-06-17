'use client'
import { useEffect, useState, useCallback } from 'react'
import { getGenders } from '@/services/genders.service'
import { Gender } from '@/types/gender.type'

export const useGenders = () => { 

  const [genders, setGenders] = useState<Gender[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchGenders = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getGenders();
      if (data) setGenders(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    //eslint-disable-next-line react-hooks/set-state-in-effect
    fetchGenders();
  }, [fetchGenders]);

  return { genders, loading, error, fetchGenders }
}