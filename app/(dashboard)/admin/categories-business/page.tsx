'use client'

import {
  CategoriesBusinessTable,
  CreateCategoryBusinessDialog,
} from '@/components/admin/categories-business.ts'
import { SearchInput } from '@/components/shared/search-input'
import { useCategoryBusiness } from '@/hooks/useCategoryBusiness'

export default function CategoriesBusinessPage() {
  const { data, loading, fetchCategoryBusiness } = useCategoryBusiness()

  if (!data) {
    return <div>Cargando...</div>
  }
  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Categorías de Negocios</h1>
      <div className='flex items-center justify-between'>
        <SearchInput
          placeholder='Buscar categoría de negocio...'
          className='w-full max-w-6xl'
        />

        <CreateCategoryBusinessDialog />
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <CategoriesBusinessTable
          categoriesBusiness={data}
          currentPage={data.pagination.page}
          refreshAction={fetchCategoryBusiness}
        />
      )}
    </div>
  )
}
