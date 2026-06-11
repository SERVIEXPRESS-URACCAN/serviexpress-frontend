'use client'
import { useEffect, useState, useCallback } from 'react'
import { getGenders } from '@/services/genders.service'
import { Gender } from '@/types/gender.type'
import { useAuth } from './useAuth'

export const useGenders = () => { 
  const { session } = useAuth() 

  const [genders, setGenders] = useState<Gender[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchGenders = useCallback(async () => {
    if (!session?.accessToken) return;
    try {
      const data = await getGenders(session.accessToken);
      if (data) setGenders(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'));
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    //eslint-disable-next-line
    fetchGenders();
  }, [fetchGenders]);

  return { genders, loading, error, fetchGenders }
}