'use client'

import { MandaderoTable } from '@/components/admin/mandadero/mandadero-table'
import { CreateMandaderoDialog } from '@/components/admin/mandadero/create-mandadero-dialog'
import { SearchInput } from '@/components/shared/search-input'
import { useMandaderos } from '@/hooks/useMandadero'

export default function MandaderoPage() {
  const { mandaderos, loading } = useMandaderos()

  if (!mandaderos) {
    return <div>Cargando...</div>
  }
  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Mandaderos</h1>

      <div className='flex items-center justify-between'>
        <SearchInput
          placeholder='Buscar mandadero...'
          className='w-full max-w-6xl'
        />

        <CreateMandaderoDialog />
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <MandaderoTable
          mandaderos={mandaderos}
          currentPage={mandaderos.pagination.page}
        />
      )}
    </div>
  )
}
