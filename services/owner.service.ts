import { API_URL } from '@/config/config'
import { Owner, UpdateOwner } from '@/types/owner.types'

export const getOwner = async (token: string) => {
  const response = await fetch(`${API_URL}/owner`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText)
  }

  const result = await response.json()

  return result.data
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
