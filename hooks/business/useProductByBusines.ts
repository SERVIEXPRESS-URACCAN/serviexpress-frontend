'use client'

import { useCallback, useEffect, useState } from 'react'

import { getProductsByBusiness } from '@/services/products.service'
import { ProductResponse } from '@/types/products.type'

export const useProductsByBusiness = (
  id: number,
  page: number,
  search?: string,
) => {
  const [products, setProducts] = useState<ProductResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)

    try {
      const data = await getProductsByBusiness(
        id,
        page,
        search,
      )

      setProducts(data)
      setError(null)
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('Error inesperado'),
      )
    } finally {
      setLoading(false)
    }
  }, [id, page, search])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts()
  }, [fetchProducts])

  return {
    products,
    loading,
    error,
    fetchProducts,
  }
}