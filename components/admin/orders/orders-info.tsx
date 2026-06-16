import { InfoField } from '@/components/shared/Info-field'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Order } from '@/types/order.type'

type Props = {
  order: Order
}

export const OrderInfo = ({ order }: Props) => {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-lg font-bold uppercase tracking-wide text-center'>
          Información de la Orden
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-6'>
        <InfoField label='ID' value={String(order.id)} />

        <InfoField
          label='Cliente'
          value={
            order.user?.profile
              ? `${order.user.profile.name} ${order.user.profile.lastName}`
              : 'No disponible'
          }
        />

        <InfoField
          label='Negocio'
          value={order.business?.name ?? 'No disponible'}
        />

        <InfoField label='Estado de la Orden' value={order.status} />

        <InfoField label='Estado de Entrega' value={order.deliveryStatus} />

        <InfoField label='Total' value={`C$ ${order.total}`} />

        <InfoField
          label='Fecha de Creación'
          value={new Date(order.createdAt).toLocaleString()}
        />

        <InfoField
          label='Fecha de Aceptación'
          value={
            order.acceptedAt
              ? new Date(order.acceptedAt).toLocaleString()
              : 'Pendiente'
          }
        />
      </CardContent>
    </Card>
  )
}
