'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Business, BusinessResponse } from '@/types/business.type'
import { TablePaginationInput } from '@/components/shared/table-pagination'
import { BusinessActions } from './business-actions'

type Props = {
  businesses: BusinessResponse
  currentPage: number
  refreshAction: () => Promise<void>
}

export const BusinessTable = ({
  businesses,
  currentPage,
  refreshAction,
}: Props) => {
  const { meta } = businesses

  return (
    <div className='space-y-4'>
      <div className='rounded-md border overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businesses.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='h-24 text-center'>
                  No hay negocios disponibles
                </TableCell>
              </TableRow>
            ) : (
              businesses.data.map((business: Business) => (
                <TableRow key={business.id}>
                  <TableCell>{business.id}</TableCell>
                  <TableCell>{business.name}</TableCell>
                  <TableCell>{business.phone}</TableCell>
                  <TableCell>{business.address ?? '-'}</TableCell>
                  <TableCell>{business.city?.name ?? '-'}</TableCell>
                  <TableCell>
                    <BusinessActions
                      business={business}
                      refreshAction={refreshAction}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between px-2'>
        <p className='text-sm text-muted-foreground'>
          Página {currentPage} de {meta.lastPage}
        </p>
        <TablePaginationInput
          currentPage={currentPage}
          lastPage={meta.lastPage}
        />
      </div>
    </div>
  )
}
