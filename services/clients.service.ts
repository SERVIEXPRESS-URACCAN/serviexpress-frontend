import { API_URL } from '@/config/config'
import { CreateUserDto } from '@/schemas/client.schema'
import { Clients, ClientesResponse } from '@/types/clients'

export const getClientes = async (token: string, page = 1, limit = 10): Promise<ClientesResponse> => {
  const response = await fetch(`${API_URL}/profiles?page=${page}&limit=${limit}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Error ${response.status}: ${JSON.stringify(error)}`)
  }

  return response.json()
}

export const createClient = async (data: CreateUserDto, token: string): Promise<Clients> => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
       Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })
  const result = await response.json()
if (!response.ok) {
    throw new Error(JSON.stringify(result))
  }
  return result
}
