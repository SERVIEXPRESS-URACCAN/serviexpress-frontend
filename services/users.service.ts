import { API_URL } from '@/config/config'
import { fetchAuth } from '@/lib/fetch-auth'

export const getUsers = async ( page = 1, limit = 10) => {
  const response = await fetchAuth(`${API_URL}/users?page=${page}&limit=${limit}`, {
    cache: 'no-store',})

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message)
  }

  return result
}

export const getAvailableUsersForOwner = async () => {
  const response = await fetchAuth(`${API_URL}/users/available-for-owner`, {
    cache: 'no-store',})

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message)
  }

  return result
}

export async function updateUserStatus(userId: number, status: boolean) {
  const res = await fetchAuth(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })

  if (!res.ok) throw new Error('Error al actualizar el estado del usuario')

  return res.json()
}
