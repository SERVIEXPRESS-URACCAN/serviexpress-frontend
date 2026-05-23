import { API_URL } from '@/config/config'

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
