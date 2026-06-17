import { API_URL } from '@/config/config'
import { fetchAuth } from '@/lib/fetch-auth'
import { CreateUserDto, UpdateClientProfileDto } from '@/schemas/client.schema'
import { UserConflictException } from '@/types/api-errors.types'
import { Clients, ClientsResponse } from '@/types/clients'

export const getClientes = async (
  page = 1,
  limit = 10,
  search?: string,
): Promise<ClientsResponse> => {
  const params = new URLSearchParams()

  params.set('page', String(page))
  params.set('limit', String(limit))

  if (search) {
    params.set('search', search)
  }

  const response = await fetchAuth(`${API_URL}/profiles?${params.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Error fetching clients')
  }

  return result
}
export const getClientById = async ( id: number) => {
  const response = await fetchAuth(`${API_URL}/profiles/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Error ${response.status}: ${JSON.stringify(error)}`)
  }

  return response.json()
}
export const restoreClient = async (
  id: number,
  data: CreateUserDto,
): Promise<Clients> => {
  const response = await fetchAuth(`${API_URL}/users/${id}/restore`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Error al restaurar el cliente con id ${id}`)
  }

  return response.json()
}
export const createClient = async (
  data: CreateUserDto,
): Promise<Clients> => {
  const response = await fetchAuth(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(data),
  })
  const result = await response.json()
  if (response.status === 409) {
    throw new UserConflictException({
      message: result.message,
      canRestore: result.canRestore ?? false,
      id: result.userId,
    })
  }

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
) => {
  const formData = new FormData()

  formData.append('name', data.name)
  formData.append('lastName', data.lastName)

  formData.append('cellphone', data.cellphone)

  formData.append('genderId', String(data.gender_id))

  if (data.profileImage) {
    formData.append('profileImage', data.profileImage)
  }

  const response = await fetchAuth(`${API_URL}/profiles/${id}`, {
    method: 'PATCH',
    headers: {
    },
    body: formData,
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Error updating client')
  }

  return result
}

export const deleteClient = async (
  id: number,
): Promise<void> => {
  const response = await fetchAuth(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(
      `Error al eliminar el cliente con id ${id}: ${JSON.stringify(error)}`,
    )
  }
}
