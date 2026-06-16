import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { TablePaginationInput } from '@/components/shared/table-pagination'

import { OrderResponse } from '@/types/order.type'
import { OrderActions } from './orders-actions'

type Props = {
  orders: OrderResponse
  currentPage: number
}

export const OrderTable = ({ orders, currentPage }: Props) => {
  const { meta } = orders

  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>

              <TableHead>Cliente</TableHead>

              <TableHead>Negocio</TableHead>

              <TableHead>Total</TableHead>

              <TableHead>Estado</TableHead>

              <TableHead>Delivery</TableHead>

              <TableHead>Fecha</TableHead>
              <TableHead className='w-20'></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className='h-24 text-center'>
                  No hay órdenes disponibles
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

                  <TableCell>{order.business?.name}</TableCell>

                  <TableCell>C$ {Number(order.total).toFixed(2)}</TableCell>

                  <TableCell>{order.status}</TableCell>

                  <TableCell>{order.deliveryStatus}</TableCell>

                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <OrderActions order={order} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between px-2'>
        <p className='text-sm text-muted-foreground'>
          Página {currentPage} de {meta.totalPages}
        </p>

        <TablePaginationInput
          currentPage={currentPage}
          lastPage={meta.totalPages}
        />
      </div>
    </div>
  )
}
