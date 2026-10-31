'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { TablePaginationInput } from '@/components/shared/table-pagination'
import { Button } from '@/components/ui/button'
import type { OwnerResponse } from '@/types/owner.types'
import { useRouter } from 'next/navigation'

type Props = {
  applications: OwnerResponse
  currentPage: number
}

export const OwnerApplicationTable = ({ applications, currentPage }: Props) => {
  const router = useRouter()
  const { pagination } = applications

  return (
    <div className='space-y-4'>
      <div className='overflow-x-auto rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Negocio</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead className='w-32'>Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {applications.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className='h-24 text-center'>
                  No hay solicitudes pendientes.
                </TableCell>
              </TableRow>
            ) : (
              applications.data.map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell>{owner.id}</TableCell>

                  <TableCell>
                    {owner.user?.profile?.name ?? 'Sin nombre'}
                  </TableCell>

                  <TableCell>
                    {owner.user?.profile?.lastName ?? 'Sin apellido'}
                  </TableCell>

                  <TableCell>
                    {owner.user?.profile?.cellphone ?? 'Sin teléfono'}
                  </TableCell>

                  <TableCell>{owner.user?.email ?? 'Sin correo'}</TableCell>

                  <TableCell>{owner.business?.name ?? 'Sin negocio'}</TableCell>

                  <TableCell>
                    {owner.business?.city?.name ?? 'Sin ciudad'}
                  </TableCell>

                  <TableCell>
                    <Button
                      type='button'
                      size='sm'
                      onClick={() =>
                        router.push(
                          `/admin/solicitudes/propietarios/${owner.id}`,
                        )
                      }
                    >
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between px-2'>
        <p className='text-sm text-muted-foreground'>
          Total de solicitudes: {pagination.total}
        </p>

        <div className='flex items-center gap-3'>
          <p className='text-sm text-muted-foreground'>
            Página {currentPage} de {pagination.lastPage}
          </p>

          <TablePaginationInput
            currentPage={currentPage}
            lastPage={pagination.lastPage}
          />
        </div>
      </div>
    </div>
  )
}
