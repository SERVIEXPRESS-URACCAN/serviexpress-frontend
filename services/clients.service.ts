import { API_URL } from '@/config/config'
import { CreateUserDto, UpdateClientProfileDto } from '@/schemas/client.schema'
import { Clients, ClientsResponse } from '@/types/clients'

export const getClientes = async (token: string, page = 1, limit = 10): Promise<ClientsResponse> => {
  const response = await fetch(`${API_URL}/profiles?page=${page}&limit=${limit}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',

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
console.log('result:', result)
  if (!response.ok) {
    if (Array.isArray(result.message)) {
      throw new TypeError(JSON.stringify({ field: null }))
    }
    throw new TypeError(JSON.stringify(result))
  }

  return result
}


export const updateClientProfile = async (
  id: number,
  data: UpdateClientProfileDto,
  token: string
) => {
  const formData = new FormData()

  formData.append('name', data.name)
  formData.append(
    'lastName',
    data.lastName
  )

  formData.append(
    'cellphone',
    data.cellphone
  )

  formData.append(
    'genderId',
    String(data.gender_id)
  )

  if (data.profileImage) {
    formData.append(
      'profileImage',
      data.profileImage
    )
  }

  const response = await fetch(
    `${API_URL}/profiles/${id}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    }
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(
      result.message ||
      'Error updating client'
    )
  }

  return result
}