import { API_URL } from '@/config/config'
import { fetchAuth } from '@/lib/fetch-auth'
import { City, CreateCityDto, UpdateCityDto } from '@/types/city.types'

export const getCities = async (): Promise<City[]> => {
  const response = await fetchAuth(`${API_URL}/city`)

  if (!response.ok) {
    throw new Error(`Error fetching cities: `)
  }

  return response.json()
}

export const createCity = async (data: CreateCityDto): Promise<City> => {
  const response = await fetchAuth(`${API_URL}/city`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  return response.json()
}

export const updateCity = async (
  id: number,
  data: UpdateCityDto
): Promise<City> => {
  const response = await fetchAuth(`${API_URL}/city/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.json()

    throw new Error(error.message)
  }

  return response.json()
}
