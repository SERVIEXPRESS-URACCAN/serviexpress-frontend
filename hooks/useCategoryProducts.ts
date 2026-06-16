'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getCategoryProducts } from '@/services/categories-products.service'
import { CategoryProductResponse } from '@/types/categories-products'

export const useCategoryProducts = () => {
  const [data, setData] = useState<CategoryProductResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const searchParams = useSearchParams()

  const search = searchParams.get('search') || undefined
  const page = Number(searchParams.get('page')) || 1

  const fetchCategoryProducts = useCallback(async () => {
    setLoading(true)

    try {
      const response = await getCategoryProducts(page, search)

      setData(response)
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
    fetchCategoryProducts()
  }, [fetchCategoryProducts])

  return {
    data,
    loading,
    error,
    fetchCategoryProducts,
  }
}