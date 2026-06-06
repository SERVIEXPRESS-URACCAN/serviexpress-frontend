'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import { getGenders } from '@/services/genders.service'
import { Gender } from '@/types/gender.type'
import { useAuth } from './useAuth'

export const useGenders = () => {  // ← sin token como parámetro
  const { session } = useAuth()   // ← token interno

  const [genders, setGenders] = useState<Gender[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const isMounted = useRef(false)

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
    if (!isMounted.current) {
      isMounted.current = true;
      fetchGenders();
      return;
    }
    fetchGenders();
  }, [fetchGenders]);

  return { genders, loading, error, fetchGenders }
}