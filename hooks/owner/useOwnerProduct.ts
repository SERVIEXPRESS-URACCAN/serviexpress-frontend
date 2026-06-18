'use client'

import { useCallback, useEffect, useState } from 'react'

import { Product } from '@/types/products.type'
import { getOwnerProductById } from '@/services/owner/product-owner.service'

export const useOwnerProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true)

      const response = await getOwnerProductById(id)

      setProduct(response)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error inesperado'))
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProduct()
  }, [fetchProduct])

  return {
    product,
    loading,
    error,
    fetchProduct,
  }
}
