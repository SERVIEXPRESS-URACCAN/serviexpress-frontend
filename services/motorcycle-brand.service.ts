import { API_URL } from '@/config/config'
import { fetchAuth } from '@/lib/fetch-auth'
import {
  CreateMotorcycleBrandDto,
  MotorcycleBrand,
  UpdateMotorcycleBrandDto,
} from '@/types/motorcycle.types'

export const getMotorcycleBrands = async (): Promise<MotorcycleBrand[]> => {
  const response = await fetchAuth(`${API_URL}/motorcycle-brands`)

  if (!response.ok) {
    throw new Error('Error al obtener las marcas de motocicletas')
  }

  return response.json()
}

export const createMotorcycleBrand = async (
  data: CreateMotorcycleBrandDto,
): Promise<MotorcycleBrand> => {
  const response = await fetchAuth(`${API_URL}/motorcycle-brands`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  return response.json()
}

export const updateMotorcycleBrand = async (
  id: number,
  data: UpdateMotorcycleBrandDto,
): Promise<MotorcycleBrand> => {
  const response = await fetchAuth(`${API_URL}/motorcycle-brands/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }

  return response.json()
}
