import { API_URL } from '@/config/config'
import { fetchAuth } from '@/lib/fetch-auth'

import { Order, OrderResponse } from '@/types/order.type'
export const getOrders = async (
  page = 1,
  limit = 10,
  search?: string,
): Promise<OrderResponse> => {
  const params = new URLSearchParams()

  params.set('page', String(page))
  params.set('limit', String(limit))

  if (search) {
    params.set('search', search)
  }

  const response = await fetchAuth(
    `${API_URL}/orders/admin/all?${params.toString()}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Error fetching orders')
  }

  return result
}
export const getOrderById = async (id: number): Promise<Order> => {
  const response = await fetchAuth(`${API_URL}/orders/admin/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Error fetching order')
  }

  return result
}
