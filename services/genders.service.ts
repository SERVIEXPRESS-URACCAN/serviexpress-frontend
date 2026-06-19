import { API_URL } from '@/config/config'
import { fetchAuth } from '@/lib/fetch-auth'
import { Gender } from '@/types/gender.type'

export const getGenders = async (): Promise<Gender[]> => {
  const response = await fetchAuth(`${API_URL}/gender`, {
    method: 'GET',
    headers: {
    }
  })

  if (!response.ok) {
    throw new Error('Error fetching genders')
  }

  return response.json()
}