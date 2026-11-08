'use client'

import { useCallback, useEffect, useState } from 'react'

import { getMotorcycleBrands } from '@/services/motorcycle-brand.service'
import { MotorcycleBrand } from '@/types/motorcycle.types'

export const useMotorcycleBrands = () => {
  const [brands, setBrands] = useState<MotorcycleBrand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchMotorcycleBrands = useCallback(async () => {
    setLoading(true)

    try {
      const data = await getMotorcycleBrands()

      setBrands(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMotorcycleBrands()
  }, [fetchMotorcycleBrands])

  return {
    brands,
    loading,
    error,
    fetchMotorcycleBrands,
  }
}
