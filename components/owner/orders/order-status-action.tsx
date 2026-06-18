'use client'

import { Order } from '@/types/order.type'
import { Button } from '@/components/ui/button'
import { OrderStatus } from '@/types/status.type'

type Props = {
  order: Order
  onChangeStatusAction: (status: OrderStatus) => void
}

export const OrderStatusActions = ({ order, onChangeStatusAction }: Props) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {order.status === OrderStatus.PENDING && (
        <>
          <Button
            onClick={() => {
              onChangeStatusAction(OrderStatus.ACCEPTED)
            }}
          >
            Aceptar
          </Button>

          <Button
            variant='destructive'
            onClick={() => onChangeStatusAction(OrderStatus.CANCELLED)}
          >
            Cancelar
          </Button>
        </>
      )}

      {order.status === OrderStatus.ACCEPTED && (
        <>
          <Button onClick={() => onChangeStatusAction(OrderStatus.PREPARING)}>
            Preparando
          </Button>

          <Button
            variant='destructive'
            onClick={() => onChangeStatusAction(OrderStatus.CANCELLED)}
          >
            Cancelar
          </Button>
        </>
      )}

      {order.status === OrderStatus.PREPARING && (
        <Button onClick={() => onChangeStatusAction(OrderStatus.READY)}>
          Listo
        </Button>
      )}
    </div>
  )
}
