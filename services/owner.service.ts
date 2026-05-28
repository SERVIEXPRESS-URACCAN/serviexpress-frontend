import { API_URL } from '@/config/config'
import { UpdateOwner } from '@/schemas/owner.schema'
import { Owner } from '@/types/owner.types'

export const getOwner = async (token: string, page = 1) => {
  const response = await fetch(`${API_URL}/owner?page=${page}&limit=10`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message)
  }

  return result
}

export const updateOwner = async (
  id: number,
  data: UpdateOwner,
  token: string
): Promise<Owner> => {
  const response = await fetch(`${API_URL}/owner/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message)
  }

  return result
}
