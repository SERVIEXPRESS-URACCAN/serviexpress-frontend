'use client'

import { BusinessTable } from '@/components/admin/business/business-table'
import { SearchInput } from '@/components/shared/search-input'
import { useBusiness } from '@/hooks/useBusiness'

export default function BusinessPage() {
  const { businesses, loading } = useBusiness()

  if (!businesses) {
    return <div>Cargando...</div>
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Negocios</h1>
      <div className='flex items-center justify-between'>
        <SearchInput
          placeholder='Buscar negocio...'
          className='w-full max-w-6xl'
        />
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <BusinessTable businesses={businesses} currentPage={0} />
      )}
    </div>
  )
}
