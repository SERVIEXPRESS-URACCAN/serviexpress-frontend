'use client'

import { getProducts } from '@/services/owner/product-owner.service'
import { ProductResponse } from '@/types/products.type'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export const useProducts = () => {
  const searchParams = useSearchParams()

  const pageParam = searchParams.get('page')
  const page = pageParam ? Number(pageParam) : 1

  const search = searchParams.get('search') || undefined

  const [products, setProducts] = useState<ProductResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)

    try {
      const data = await getProducts(page, search)
      if (data) setProducts(data)
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'))
    } finally {
      setLoading(false)
    }
  }, [page, search])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts()
  }, [fetchProducts])

  return {
    products,
    loading,
    error,
    fetchProducts
  }
}
