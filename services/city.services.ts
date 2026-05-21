import { API_URL } from '@/config/config'
import { City } from '@/types/city.types'

export const getCities = async (): Promise<City[]> => {
  const response = await fetch(`${API_URL}/city`)

  if (!response.ok) {
    throw new Error('Failed to fetch cities')
  }

  return response.json()
}
