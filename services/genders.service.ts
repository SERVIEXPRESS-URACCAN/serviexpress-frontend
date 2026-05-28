import { API_URL } from '@/config/config'
import { Gender } from '@/types/gender.type'

export const getGenders = async (token: string): Promise<Gender[]> => {
  const response = await fetch(`${API_URL}/gender`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error('Error fetching genders')
  }

  return response.json()
}