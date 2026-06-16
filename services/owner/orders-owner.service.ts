import { API_URL } from '@/config/config'
import { fetchAuth } from '@/lib/fetch-auth'

export const getBusinessOrders = async (page = 1, status?: string) => {
  const params = new URLSearchParams()

  params.set('page', page.toString())
  params.set('limit', '10')

  if (status) {
    params.set('status', status)
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
