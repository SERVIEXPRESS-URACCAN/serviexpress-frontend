import { API_URL } from '@/config/config'
import { Owner, OwnerResponse } from '@/types/owner.types'

import { CreateOwner, UpdateOwner } from '@/schemas/owner.schema'

export const getOwner = async (
  token: string,
  page = 1,
  search?: string,
): Promise<OwnerResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(10),
    ...(search && { search }),
  })

  const response = await fetch(`${API_URL}/owner?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message)
  }

  return result
}

export const createOwner = async (
  data: CreateOwner,
  token: string,
): Promise<Owner> => {
  const formData = new FormData()

  formData.append('razonSocial', data.razonSocial)

  formData.append('user', String(data.user))

  formData.append('business', JSON.stringify(data.business))

  if (data.identificationCardImage) {
    formData.append('identificationCardImage', data.identificationCardImage)
  }

  const response = await fetch(`${API_URL}/owner`, {
    method: 'POST',

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: formData,
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message)
  }

  return result
}

export const updateOwner = async (
  id: number,
  data: UpdateOwner,
  token: string,
): Promise<Owner> => {
  const formData = new FormData()

  formData.append('razonSocial', data.razonSocial)
  formData.append('profile[name]', data.profile.name)
  formData.append('profile[lastName]', data.profile.lastName)
  formData.append('profile[cellphone]', data.profile.cellphone)
  formData.append('profile[genderId]', String(data.profile.genderId))

  if (data.identificationCardImage) {
    formData.append('identificationCardImage', data.identificationCardImage)
  }

  const response = await fetch(`${API_URL}/owner/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message)
  }

  return result
}

export const getOwnerById = async (
  token: string,
  id: string,
): Promise<Owner> => {
  const response = await fetch(`${API_URL}/owner/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message)
  }

  return result
}
