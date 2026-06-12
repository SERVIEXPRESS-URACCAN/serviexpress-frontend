'use client'

import { CreateProductDialog } from '@/components/propietario/products/create-product-dialog'
import { ProductsTable } from '@/components/propietario/products/products-table'

import { useAuth } from '@/hooks/useAuth'
import { useCategoryProducts } from '@/hooks/useCategoryProducts'
import { useProducts } from '@/hooks/useProducts'
import Loading from '../../admin/categories-products/loading'


export default function ProductsPage() {
  const { session, isLoading: authLoading } = useAuth()

  const {
    products,
    isLoading: productsLoading,
    fetchProducts
  } = useProducts()

const {
  categoryProducts: categories,
  loading: categoriesLoading
} = useCategoryProducts()
  const token = session?.accessToken ?? ''

  const isLoading =
    authLoading ||
    productsLoading ||
    categoriesLoading

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>
        Productos
      </h1>

      <div className='flex items-center justify-between gap-4'>
        <CreateProductDialog
          token={token}
          categories={categories}
          onCreatedAction={fetchProducts}
        />
      </div>

      <ProductsTable products={products} />
    </div>
  )
}