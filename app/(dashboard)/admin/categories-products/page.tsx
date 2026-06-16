'use client'

import { CategoriesProductsTable } from '@/components/admin/categories-products.ts'
import { CreateCategoryProductDialog } from '@/components/admin/categories-products.ts/create-categories-products-dialog'
import { SearchInput } from '@/components/shared/search-input'
import { useCategoryProducts } from '@/hooks/useCategoryProducts'

export default function CategoryProductPage() {
  const {
    data,
    loading,
    fetchCategoryProducts,
  } = useCategoryProducts()

  if (!data) {
    return <div>Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Categorías de Productos</h1>

      <div className="flex items-center justify-between">
        <SearchInput
          placeholder="Buscar categoría de producto..."
          className="w-full max-w-6xl"
        />

        <CreateCategoryProductDialog />
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <CategoriesProductsTable
          categoryProduct={data}
          currentPage={data.pagination.page}
          refreshAction={fetchCategoryProducts}
        />
      )}
    </div>
  )
}