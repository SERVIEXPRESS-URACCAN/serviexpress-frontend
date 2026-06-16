'use client'

import { ProductResponse } from '@/types/products.type'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '../useAuth'
import { getProducts } from '@/services/owner/product-owner.service'

export const useProducts = () => {
  const { session } = useAuth()

  const [products, setProducts] = useState<ProductResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const search = searchParams.get('search') || undefined

  const fetchProducts = useCallback(async () => {
    if (!session?.accessToken) return

    try {
      setLoading(true)

      const response = await getProducts(session.accessToken, 1, search)

      setProducts(response)
    } finally {
      setLoading(false)
    }
  }, [session?.accessToken, search])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return {
    products,
    loading,
    fetchProducts,
  }
}
