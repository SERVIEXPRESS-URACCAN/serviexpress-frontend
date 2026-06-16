'use client'

import { OrdersTable } from '@/components/owner/orders-table'
import { SearchInput } from '@/components/shared/search-input'
import { useOwnerOrders } from '@/hooks/owner/useOwnerOrders'

export default function OwnerOrdersPage() {
  const { data, loading } = useOwnerOrders()

  if (loading) {
    return <div>Cargando...</div>
  }

  if (!data) {
    return <div>No se encontraron pedidos.</div>
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Pedidos</h1>

      <div className='flex items-center justify-between'>
        <SearchInput
          placeholder='Buscar pedido...'
          className='w-full max-w-6xl'
        />
      </div>

      <OrdersTable orders={data} />
    </div>
  )
}
