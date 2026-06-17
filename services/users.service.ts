import { API_URL } from '@/config/config'
import { fetchAuth } from '@/lib/fetch-auth'

export const getUsers = async (token: string, page = 1, limit = 10) => {
  const response = await fetch(`${API_URL}/users?page=${page}&limit=${limit}`, {
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

export const getAvailableUsersForOwner = async (token: string) => {
  const response = await fetch(`${API_URL}/users/available-for-owner`, {
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

export async function updateUserStatus(userId: number, status: boolean, token: string) {
  const res = await fetchAuth(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })

  if (!res.ok) throw new Error('Error al actualizar el estado del usuario')

  return res.json()
}
