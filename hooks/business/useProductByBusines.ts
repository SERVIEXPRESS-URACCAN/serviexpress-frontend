'use client'

import { useCallback, useEffect, useState } from 'react'

import { getProductsByBusiness } from '@/services/products.service'
import { ProductResponse } from '@/types/products.type'
import { useSearchParams } from 'next/navigation'

export const useProductsByBusiness = (id: number) => {
  const searchParams = useSearchParams()

  const search = searchParams.get('search') || ''
  const page = Number(searchParams.get('page')) || 1

  const [products, setProducts] = useState<ProductResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProducts = useCallback(async () => {
    if (!id) return
    setLoading(true)

    try {
      const data = await getProductsByBusiness(id, page, search)

      setProducts(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'))
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
