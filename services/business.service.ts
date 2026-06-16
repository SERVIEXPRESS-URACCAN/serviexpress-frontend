import { API_URL } from '@/config/config'
import { Business, BusinessResponse } from '@/types/business.type'

export const getBusinesses = async (
  token: string,
  page: number,
  search?: string,
): Promise<BusinessResponse> => {
  const params = new URLSearchParams()
  params.set('page', String(page))
  params.set('limit', '10')
  if (search) params.set('search', search)

  const response = await fetch(`${API_URL}/business?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message || 'Error fetching businesses')
  }
  return result
}

export const getBusinessById = async (
  token: string,
  id: number,
): Promise<{ data: Business }> => {
  const response = await fetch(`${API_URL}/business/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message || 'Error fetching business')
  }
  return result
}

export const updateBusiness = async (
  token: string,
  id: number,
  data: FormData,
) => {
  const response = await fetch(`${API_URL}/business/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message || 'Error updating business')
  }
  return result
}
