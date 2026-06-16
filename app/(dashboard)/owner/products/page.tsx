'use client'

import { ProductTable } from '@/components/owner/products/product-table'
import { SearchInput } from '@/components/shared/search-input'

import { CreateProductOwnerDialog } from '@/components/owner/products/create-product-owner-dialog'
import { useProducts } from '@/hooks/owner/useOwnerProducts'
import { useCategoryProducts } from '@/hooks/useCategoryProducts'

export default function OwnerProductsPage() {
  const { products, loading, fetchProducts } = useProducts()
  const { data: categoryResponse } = useCategoryProducts()

  const categoryProducts = categoryResponse?.data || []

  if (!products && loading) {
    return <div>Cargando productos...</div>
  }
  if (!products) {
    return <div>No se encontraron productos.</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>

        <CreateProductOwnerDialog
          categories={categoryProducts}
          onSuccessAction={fetchProducts}
        />
      </div>

      <div className="flex items-center justify-between">
        <SearchInput
          placeholder="Buscar producto..."
          className="w-full max-w-6xl"
        />
      </div>

      <ProductTable
        products={products}
        categories={categoryProducts}
        currentPage={products.pagination.page}
        onSuccessAction={fetchProducts}
      />
    </div>
  )
}
