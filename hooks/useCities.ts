'use client'

import { getCities } from '@/services/city.services'
import { City } from '@/types/city.types'
import { useEffect, useState } from 'react'

export const useCities = () => {
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities()
        setCities(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCities()
  }, [])

  return {
    cities,
    loading
  }
}
