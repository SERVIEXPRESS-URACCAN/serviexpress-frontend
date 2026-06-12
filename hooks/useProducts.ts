'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Product } from '@/types/products.type'
import { getProducts } from '@/services/products.service'

export function useProducts() {
  const { data: session } = useSession()

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const accessToken = session?.accessToken

  useEffect(() => {
    if (!accessToken) return

    const loadProducts = async () => {
      try {
        const response = await getProducts(accessToken)
        setProducts(response.data)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Error al cargar productos',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [accessToken])

  return {
    products,
    isLoading,
    error,
  }
}