'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { TablePaginationInput } from '@/components/shared/table-pagination'

import { ClientsResponse } from '@/types/clients'
import { Gender } from '@/types/gender.type'

import { ClientesActions } from './clients-actions'

type Props = {
  clients: ClientsResponse
  currentPage: number
  genders: Gender[]
  onUpdatedAction: () => Promise<void>
}

export const ClientesTable = ({
  clients,
  currentPage,
  genders,
  onUpdatedAction
}: Props) => {
  const { pagination } = clients;

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Género</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {clients.data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center"
                >
                  No hay clientes disponibles
                </TableCell>
              </TableRow>
            ) : (
              clients.data.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.id}</TableCell>

                  <TableCell>
                    {client.name ?? 'Sin nombre'}
                  </TableCell>

                  <TableCell>
                    {client.lastName ?? 'Sin apellido'}
                  </TableCell>

                  <TableCell>
                    {client.gender?.name ?? 'Sin género'}
                  </TableCell>

                  <TableCell>
                    {client.cellphone ?? 'Sin teléfono'}
                  </TableCell>

                  <TableCell>
                    {client.user?.email ?? 'Sin email'}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${client.user?.status
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {client.user?.status
                        ? 'Activo'
                        : 'Inactivo'}
                    </span>
                  </TableCell>

                  <TableCell>
                    <ClientesActions
                      client={client}
                      genders={genders}
                      onUpdatedAction={onUpdatedAction}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground whitespace-nowrap">
          Página {currentPage} de {pagination.lastPage}
        </p>
        <TablePaginationInput
          currentPage={currentPage}
          lastPage={pagination.lastPage}
        />      </div>
    </div>
  )
}