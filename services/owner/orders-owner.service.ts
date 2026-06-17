import { API_URL } from '@/config/config'
import { fetchAuth } from '@/lib/fetch-auth'

export const getBusinessOrders = async (
  page = 1,
  status?: string,
  search?: string,
) => {
  const params = new URLSearchParams()

  params.set('page', page.toString())
  params.set('limit', '10')

  if (status) {
    params.set('status', status)
  }
  if (search?.trim()) {
    params.set('search', search.trim())
  }
  const response = await fetchAuth(
    `${API_URL}/orders/business?${params.toString()}`,
    {
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    throw new Error(`Error fetching business orders`)
  }
  return response.json()
}

export async function getBusinessOrderById(id: number) {
  const response = await fetchAuth(`${API_URL}/orders/${id}/business`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Error al obtener la orden')
  }

  return response.json()
}

export async function updateOrderStatus(id: number, status: string) {
  const response = await fetchAuth(`${API_URL}/orders/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Error actualizando pedido')
  }

  return data
}
