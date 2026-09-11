import { API_URL } from '@/config/config'
import { fetchAuth } from '@/lib/fetch-auth'
import { Business, BusinessResponse } from '@/types/business.type'

export const getBusinesses = async (
  page: number,
  search?: string,
): Promise<BusinessResponse> => {
  const params = new URLSearchParams()
  params.set('page', String(page))
  params.set('limit', '10')
  if (search) params.set('search', search)

  const response = await fetchAuth(`${API_URL}/business?${params.toString()}`, {
    cache: 'no-store',
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message || 'Error fetching businesses')
  }
  return result
}

export const getBusinessById = async (
  id: number,
): Promise<{ data: Business }> => {
  const response = await fetchAuth(`${API_URL}/business/${id}`, {
    cache: 'no-store',
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message || 'Error fetching business')
  }
  return result
}

export const updateBusiness = async (
  id: number,
  data: FormData,
) => {
  const response = await fetchAuth(`${API_URL}/business/${id}`, {
    method: 'PATCH',
    body: data,
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message || 'Error updating business')
  }
  return result
}
