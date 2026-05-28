import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { TablePaginationInput } from '@/components/shared/table-pagination'

import { OwnerActions } from './owner-actions'

import { OwnerResponse } from '@/types/owner.types'

type Props = {
  owners: OwnerResponse
  currentPage: number
  onUpdated: () => Promise<void>
}

export const OwnerTable = ({ owners, currentPage, onUpdated }: Props) => {
  const { pagination } = owners

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Telefono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Negocio</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {owners.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No hay propietarios disponibles
                </TableCell>
              </TableRow>
            ) : (
              owners.data.map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell>{owner.id}</TableCell>

                  <TableCell>
                    {owner.user?.profile?.name ?? 'Sin nombre'}
                  </TableCell>

                  <TableCell>
                    {owner.user?.profile?.lastName ?? 'Sin apellido'}
                  </TableCell>

                  <TableCell>
                    {owner.user?.profile?.cellphone ?? 'Sin telefono'}
                  </TableCell>

                  <TableCell>{owner.user?.email ?? 'Sin email'}</TableCell>

                  <TableCell>{owner.business?.name ?? 'Sin negocio'}</TableCell>

                  <TableCell>
                    <OwnerActions owner={owner} onUpdated={onUpdated} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
          Página {currentPage} de {pagination.lastPage}
        </p>

        <TablePaginationInput
          currentPage={currentPage}
          lastPage={pagination.lastPage}
        />
      </div>
    </div>
  )
}
