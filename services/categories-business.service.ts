import { API_URL } from '@/config/config'
import { fetchAuth } from '@/lib/fetch-auth'
import { CategoryConflictException } from '@/types/api-errors.types'
import {
  CategoryBusiness,
  CategoryBusinessResponse,
  CreateCategoryBusinessDto,
  UpdateCategoryBusinessDto,
} from '@/types/categories-business'

export const getCategoryBusiness = async (
  page = 1,
  search?: string,
): Promise<CategoryBusinessResponse> => {
  const response = await fetchAuth(
    `${API_URL}/categories-business?page=${page}&limit=10${search ? `&search=${search}` : ''}`,
    {
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    throw new Error(`Error fetching categories business`)
  }
  return response.json()
}

export const createCategoryBusiness = async (
  data: CreateCategoryBusinessDto,
): Promise<CategoryBusiness> => {
  const response = await fetchAuth(`${API_URL}/categories-business`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))

    throw new CategoryConflictException({
      message: errorData.message,
      canRestore: errorData.canRestore,
      id: errorData.id,
    })
  }
  return response.json()
}
export const restoreCategoryBusiness = async (
  id: number,
): Promise<{ message: string; id: number }> => {
  const response = await fetchAuth(
    `${API_URL}/categories-business/${id}/restore`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  if (!response.ok) {
    throw new Error(`Error restoring category business with id ${id}`)
  }

  return response.json()
}
export const updateCategoryBusiness = async (
  id: number,
  data: UpdateCategoryBusinessDto,
): Promise<CategoryBusiness> => {
  const response = await fetchAuth(`${API_URL}/categories-business/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()

    let message = errorData.message

    if (message === 'Internal server error') {
      message = 'La categoría ya existe'
    }

    throw new Error(message)
  }
  return response.json()
}

export const deleteCategoryBusiness = async (
  id: number,
): Promise<void> => {
  const response = await fetchAuth(`${API_URL}/categories-business/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Error deleting category business with id ${id}: ${errorText}`,
    )
  }
  return response.json()
}
