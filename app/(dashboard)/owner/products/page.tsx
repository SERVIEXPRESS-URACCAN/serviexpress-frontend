'use client'

import { ProductsTable } from '@/components/propietario/products/products-table'
import { useProducts } from '@/hooks/useProducts'

export default function ProductsPage() {
  const { products, isLoading } = useProducts()

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <div className='container mx-auto py-6'>
      <ProductsTable products={products} />
    </div>
  )
}