import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Clientes } from '@/types/clients'
// import { ClientesActions } from '@/components/admin/clients/clients-actions'

type Props = {
  clientes: Clientes[]
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const ClientesTable = ({ clientes, page, totalPages, onPageChange }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>{cliente.id}</TableCell>
                <TableCell>{cliente.name ?? 'Sin nombre'}</TableCell>
                <TableCell>{cliente.lastName ?? 'Sin apellido'}</TableCell>
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
                {/* <TableCell>
                  <ClientesActions cliente={cliente} />
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm">{page} / {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}