'use client'

import { ProductTable } from '@/components/owner/product-table'
import { SearchInput } from '@/components/shared/search-input'
import { useProducts } from '@/hooks/owner/useOwnerProducts'

export default function OwnerProductsPage() {
  const { products, loading, fetchProducts } = useProducts()

  if (!products) {
    return <div>Cargando...</div>
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Productos</h1>

      <div className='flex items-center justify-between'>
        <SearchInput
          placeholder='Buscar producto...'
          className='w-full max-w-6xl'
        />
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ProductTable
          products={products}
          currentPage={products.pagination.page}
          refreshAction={fetchProducts}
        />
      )}
    </div>
  )
}
