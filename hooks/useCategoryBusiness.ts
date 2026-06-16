'use client'

import { useCallback, useEffect, useState } from 'react'
import { getCategoryBusiness } from '@/services/categories-business.service'
import { CategoryBusinessResponse } from '@/types/categories-business'

import { useSearchParams } from 'next/navigation'

export const useCategoryBusiness = () => {
  const [data, setData] = useState<CategoryBusinessResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const searchParams = useSearchParams()

  const search = searchParams.get('search') || undefined
  const page = Number(searchParams.get('page')) || 1

  const fetchCategoryBusiness = useCallback(async () => {
    setLoading(true)

    try {
      const data = await getCategoryBusiness(page, search)

      setData(data)
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
  }, [page, search])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategoryBusiness()
  }, [fetchCategoryBusiness])

  return {
    data,
    loading,
    fetchCategoryBusiness,
    error,
  }
}