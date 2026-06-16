'use client'

import { getCategoryProducts } from '@/services/categories-products.service'
import { CategoryProduct } from '@/types/categories-products'
import { useCallback, useEffect, useState } from 'react'

export const useCategoryProducts = () => {
  const [categoryProducts, setCategoryProducts] = useState<CategoryProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchCategoryProducts = useCallback(async () => {
    setLoading(true)

    try {
      const data = await getCategoryProducts()

      setCategoryProducts(data.data)
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
    fetchCategoryProducts()
  }, [fetchCategoryProducts])

  return {
    categoryProducts,
    loading,
    error,
    fetchCategoryProducts,
  }
}