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
}

export const OwnerTable = ({ owners }: Props) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {owners.map((owner) => (
            <TableRow key={owner.id}>
              <TableCell>{owner.id}</TableCell>

              <TableCell>{owner.user?.profile?.name ?? 'Sin nombre'}</TableCell>

              <TableCell>{owner.user?.email ?? 'Sin email'}</TableCell>

              <TableCell>
                <OwnerActions owner={owner} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
