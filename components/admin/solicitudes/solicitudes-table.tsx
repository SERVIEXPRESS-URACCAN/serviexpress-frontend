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
import type { MandaderoResponse } from '@/types/mandadero.type'
import { useRouter } from 'next/navigation'

type Props = {
  solicitudes: MandaderoResponse
  currentPage: number
}

export const SolicitudesTable = ({ solicitudes, currentPage }: Props) => {
  const router = useRouter()
  const { pagination } = solicitudes

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
              <TableHead>Correo</TableHead>
              <TableHead>Placa</TableHead>
              <TableHead className='w-32'>Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {solicitudes.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className='h-24 text-center'>
                  No hay solicitudes pendientes.
                </TableCell>
              </TableRow>
            ) : (
              solicitudes.data.map((solicitud) => (
                <TableRow key={solicitud.id}>
                  <TableCell>{solicitud.id}</TableCell>

                  <TableCell>
                    {solicitud.user?.profile?.name ?? 'Sin nombre'}
                  </TableCell>

                  <TableCell>
                    {solicitud.user?.profile?.lastName ?? 'Sin apellido'}
                  </TableCell>

                  <TableCell>
                    {solicitud.user?.profile?.cellphone ?? 'Sin teléfono'}
                  </TableCell>

                  <TableCell>{solicitud.user?.email ?? 'Sin correo'}</TableCell>

                  <TableCell>
                    {solicitud.motorcycle?.licensePlate ?? 'Sin placa'}
                  </TableCell>

                  <TableCell>
                    <Button
                      type='button'
                      size='sm'
                      onClick={() =>
                        router.push(
                          `/admin/solicitudes/mandaderos/${solicitud.id}`,
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
