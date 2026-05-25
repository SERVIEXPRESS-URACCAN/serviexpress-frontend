'use client'

import { getCategoryProducts } from '@/services/categories-products.service'
import { CategoryProduct } from '@/types/categories-products'
import { useEffect, useState } from 'react'

export const useCategoryProducts = () => {
  const [categoryProducts, setCategoryProducts] = useState<CategoryProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const data = await getCategoryProducts()
        setCategoryProducts(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryProducts()
  }, [])

  return {
    categoryProducts,
    loading
  }
}
