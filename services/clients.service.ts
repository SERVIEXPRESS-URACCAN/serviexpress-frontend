import { API_URL } from '@/config/config'
import { ClientesResponse } from '@/types/clients'

export const getClientes = async (token: string, page = 1, limit = 10): Promise<ClientesResponse> => {
  const response = await fetch(`${API_URL}/profiles?role=client&page=${page}&limit=${limit}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })

  if (!response.ok) {
    throw new Error('Error al obtener clientes')
  }

  return response.json()
}