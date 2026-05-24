import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ClientesResponse } from '@/types/clients'
// import { ClientesActions } from './clients-actions'

type Props = {
  clientsData: ClientesResponse
  currentPage: number
}

export const ClientesTable = ({ clientsData, currentPage }: Props) => {
  const { pagination } = clientsData

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
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientsData.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No hay clientes disponibles
                </TableCell>
              </TableRow>
            ) : (
              clientsData.data.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.id}</TableCell>
                  <TableCell>{cliente.name ?? 'Sin nombre'}</TableCell>
                  <TableCell>{cliente.lastName ?? 'Sin apellido'}</TableCell>
                  <TableCell>{cliente.gender?.name ?? 'Sin género'}</TableCell>
                  <TableCell>{cliente.cellphone ?? 'Sin teléfono'}</TableCell>
                  <TableCell>{cliente.user?.email ?? 'Sin email'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cliente.user?.status
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {cliente.user?.status ? 'Activo' : 'Inactivo'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {/* <ClientesActions cliente={cliente} /> */}
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
        <div className="flex gap-2">
          <a href={`?page=${currentPage - 1}`}>
            <Button variant="outline" size="sm" disabled={currentPage <= 1}>
              Anterior
            </Button>
          </a>
          <a href={`?page=${currentPage + 1}`}>
            <Button variant="outline" size="sm" disabled={!pagination.hasNextPage}>
              Siguiente
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}