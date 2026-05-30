import { API_URL } from '@/config/config'

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
