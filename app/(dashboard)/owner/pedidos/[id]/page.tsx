'use client'

import { OrderOwnerInfo } from '@/components/owner/orders/owner-order-info'

import { Button } from '@/components/ui/button'
import { useOwnerOrder } from '@/hooks/owner/useOwnerOrder'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function OwnerOrderPage() {
  const params = useParams()

  const id = Number(params.id)

  const { order, loading } = useOwnerOrder(id)

  if (loading) {
    return 'Cargando...'
  }
  if (!order) {
    return <p>Orden no encontrada</p>
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <Button variant='ghost' asChild>
          <Link href='/owner/pedidos'>
            <ArrowLeft className='size-4' />
          </Link>
        </Button>

        <h1 className='text-xl font-bold'>Detalle de la Orden #{order.id}</h1>
      </div>

      <OrderOwnerInfo order={order} />
    </div>
  )
}
