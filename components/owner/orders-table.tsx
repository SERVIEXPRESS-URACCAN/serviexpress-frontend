import { OrderResponse } from '@/types/order.type'
import { Mandadero } from '../../types/mandadero.type'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

type Props = {
  orders: OrderResponse
}

export const OrdersTable = ({ orders }: Props) => {
  return (
    <div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Negocio</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableCell>Mandadero Estado</TableCell>
              <TableHead>Productos</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className='text-center py-4'>
                  No se encontraron pedidos.
                </TableCell>
              </TableRow>
            ) : (
              orders.data.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>

                  <TableCell>
                    {order.user?.profile
                      ? `${order.user.profile.name} ${order.user.profile.lastName}`
                      : 'Sin usuario'}
                  </TableCell>

                  <TableCell>{order.business?.name ?? 'Sin negocio'}</TableCell>

                  <TableCell>${Number(order.total).toFixed(2)}</TableCell>

                  <TableCell>{order.status}</TableCell>

                  <TableCell>{order.deliveryStatus}</TableCell>

                  <TableCell>
                    {order.items.map((i) => i.nameSnapshot).join(', ')}
                  </TableCell>

                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
