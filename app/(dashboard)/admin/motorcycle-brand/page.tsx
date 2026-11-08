'use client'

import { CreateMotorcycleBrandDialog } from '@/components/admin/motorcycle-brand/create-motorcycle-brand-dialog'
import { MotorcycleBrandsTable } from '@/components/admin/motorcycle-brand/motorcycle-brands-table'
import { useMotorcycleBrands } from '@/hooks/useMotorcycle-brands'

export default function MotorcycleBrandsPage() {
  const { brands, fetchMotorcycleBrands } = useMotorcycleBrands()

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Marcas de motocicletas</h1>
        </div>

        <CreateMotorcycleBrandDialog refreshAction={fetchMotorcycleBrands} />
      </div>

      <MotorcycleBrandsTable
        brands={brands}
        refreshAction={fetchMotorcycleBrands}
      />
    </div>
  )
}
