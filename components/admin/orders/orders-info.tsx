import { deliveryStatusColors, orderStatusColors } from '@/constants/colors'
import { Order } from '@/types/order.type'

type Props = {
  order: Order
}

export const OrderInfo = ({ order }: Props) => {
  return (
    <div className="mx-auto max-w-md">
      <div className="relative overflow-hidden rounded-lg border bg-background font-mono shadow-md">
        <div className="absolute -left-3 top-20 h-6 w-6 rounded-full border bg-background" />
        <div className="absolute -right-3 top-20 h-6 w-6 rounded-full border bg-background" />

        <div className="border-b border-dashed p-6 text-center">
          <h2 className="text-xl font-bold uppercase tracking-[0.25em]">
            ServiExpress
          </h2>

          <p className="mt-2 text-xs text-muted-foreground">Ticket de Pedido</p>

          <p className="mt-1 text-lg font-bold">#{order.id}</p>

          <p className="text-xs text-muted-foreground">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="space-y-3 p-6 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cliente</span>

            <span className="font-semibold text-right">
              {order.user?.profile
                ? `${order.user.profile.name} ${order.user.profile.lastName}`
                : 'N/D'}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Negocio</span>

            <span className="font-semibold text-right">
              {order.business?.name ?? 'N/D'}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Mandadero</span>

            <span className="font-semibold text-right">
              {order.mandadero?.profile
                ? `${order.mandadero.profile.name} ${order.mandadero.profile.lastName}`
                : 'Sin asignar'}
            </span>
          </div>
        </div>

        <div className="border-y border-dashed px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Estado de la orden
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-bold ${
                orderStatusColors[order.status]
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Delivery
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-bold ${
                deliveryStatusColors[order.deliveryStatus]
              }`}
            >
              {order.deliveryStatus}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="mb-4 text-center text-xs font-bold tracking-[0.3em] text-muted-foreground">
            DETALLE DEL PEDIDO
          </h3>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between text-sm font-medium">
                  <span>
                    {item.quantity} × {item.nameSnapshot || item.product?.name}
                  </span>

                  <span>C$ {Number(item.subtotal).toFixed(2)}</span>
                </div>

                <p className="text-xs text-muted-foreground">
                  C$ {Number(item.priceAtMoment).toFixed(2)} por unidad
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-dashed p-6">
          <div className="flex justify-between text-xl font-bold">
            <span>TOTAL</span>

            <span>C$ {Number(order.total).toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t border-dashed p-4 text-center">
          <p className="text-xs tracking-[0.25em] text-muted-foreground">
            GRACIAS POR SU COMPRA
          </p>
        </div>
      </div>
    </div>
  )
}
