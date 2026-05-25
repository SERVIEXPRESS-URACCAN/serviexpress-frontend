import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { Owner } from '@/types/owner.types'
import { OwnerActions } from './owner-actions'

type Props = {
  owners: Owner[]
  onUpdated: () => Promise<void>
}

export const OwnerTable = ({ owners, onUpdated }: Props) => {
  return (
    <div
      className="
    rounded-md border"
    >
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
          {owners.map((owner) => (
            <TableRow key={owner.id}>
              <TableCell>{owner.id}</TableCell>

              <TableCell>{owner.user?.profile?.name ?? 'Sin nombre'}</TableCell>

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
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
