'use client'

import { OrderTable } from '@/components/admin/orders/orders-table'
import { SearchInput } from '@/components/shared/search-input'
import { useOrders } from '@/hooks/orders/useOrders'

export default function OrdersPage() {
  const { orders, loading, fetchOrders } = useOrders()
  if (!orders) {
    return <p>Cargando...</p>
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Órdenes</h1>

      <div className='flex items-center justify-between'>
        <SearchInput
          placeholder='Buscar orden...'
          className='w-full max-w-6xl'
        />
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <OrderTable
          orders={orders}
          currentPage={orders.meta.page}
          onUpdated={fetchOrders}
        />
      )}
    </div>
  )
}

;('use client')

import { OrderTable } from '@/components/admin/orders/orders-table'
import { SearchInput } from '@/components/shared/search-input'
import { useOrders } from '@/hooks/orders/useOrders'

export default function OrdersPage() {
  const { orders, loading } = useOrders()
  if (!orders) {
    return <p>Cargando...</p>
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Órdenes</h1>

      <div className='flex items-center justify-between'>
        <SearchInput
          placeholder='Buscar orden...'
          className='w-full max-w-6xl'
        />
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <OrderTable orders={orders} currentPage={orders.meta.page} />
      )}
    </div>
  )
}
