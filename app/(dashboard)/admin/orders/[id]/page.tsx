'use client'

import { useParams } from 'next/navigation'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { OrderInfo } from '@/components/admin/orders/orders-info'
import { useOrder } from '@/hooks/orders/useOrder'

export default function OrderPage() {
  const params = useParams()

  const id = Number(params.id)

  const { order, loading } = useOrder(id)

  if (loading) {
    return 'error'
  }

  if (!order) {
    return <p>Orden no encontrada</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" asChild>
          <Link href="/admin/orders">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>

        <h1 className="text-xl font-bold">Detalle de la Orden #{order.id}</h1>
      </div>

      <OrderInfo order={order} />
    </div>
  )
}
