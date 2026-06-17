'use client'

import { useCallback, useEffect, useState } from 'react'
import { getCities } from '@/services/city.service'
import { City } from '@/types/city.types'

export const useCities = () => {
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchCities = useCallback(async () => {
    setLoading(true)

    try {
      const data = await getCities()

      setCities(data)
      setError(null)
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('Error inesperado')
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCities()
  }, [fetchCities])

  return {
    cities,
    loading,
    error,
    fetchCities,
  }
}