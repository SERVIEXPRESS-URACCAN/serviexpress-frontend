'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'

import { Product } from '@/types/products.type'
import { getProducts } from '@/services/products.service'

export function useProducts() {
  const { data: session } = useSession()

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const accessToken = session?.accessToken

  const fetchProducts = useCallback(async () => {
    if (!accessToken) return

    try {
      setIsLoading(true)

      const response = await getProducts(accessToken)

      setProducts(response.data)
      setError(null)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error al cargar productos',
      )
    } finally {
      setIsLoading(false)
    }
  }, [accessToken])

  useEffect(() => {
    //eslint-disable-next-line
    fetchProducts()
  }, [fetchProducts])

  return {
    products,
    isLoading,
    error,
    fetchProducts,
  }
}