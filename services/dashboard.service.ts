import { API_URL } from '@/config/config'
import { fetchAuth } from '@/lib/fetch-auth'
import { DashboardStats } from '@/types/dashboard.type'

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetchAuth(`${API_URL}/dashboard/admin`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Error fetching dashboard stats')
  }

  return result
}
