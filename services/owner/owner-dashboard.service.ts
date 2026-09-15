import { API_URL } from '@/config/config'
import { fetchAuth } from '@/lib/fetch-auth'
import { OwnerDashboardStats } from '@/types/dashboard.type'

export const getOwnerDashboardStats =
  async (): Promise<OwnerDashboardStats> => {
    const response = await fetchAuth(`${API_URL}/dashboard/owner`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Error fetching owner dashboard stats')
    }

    return result
  }
