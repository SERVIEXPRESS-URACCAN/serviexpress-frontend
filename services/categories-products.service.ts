import { API_URL } from '@/config/config'
import { fetchAuth } from '@/lib/fetch-auth'
import { CategoryConflictException } from '@/types/api-errors.types'
import {
  CategoryProduct,
  CategoryProductResponse,
  CreateCategoryProductDto,
  UpdateCategoryProductDto,
} from '@/types/categories-products'

export const getCategoryProducts = async (
  page = 1,
  search?: string,
): Promise<CategoryProductResponse> => {
  const response = await fetchAuth(
    `${API_URL}/categories-products?page=${page}&limit=10${search ? `&search=${search}` : ''}`,
  )
  if (!response.ok) {
    const errorText = await response.text()

    throw new Error(
      `Error fetching categories: ${response.status} - ${errorText}`,
    )
  }

  return response.json()
}
export const restoreCategoryProduct = async (
  id: number,
): Promise<{ message: string; id: number }> => {
  const response = await fetchAuth(`${API_URL}/categories-products/${id}/restore`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Error restoring category product with id ${id}`)
  }

  return response.json()
}
export const createCategoryProduct = async (
  data: CreateCategoryProductDto,
): Promise<CategoryProduct> => {
  const response = await fetchAuth(`${API_URL}/categories-products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (response.status === 409) {
    const error = await response.json()
    throw new CategoryConflictException({
      message: error.message,
      canRestore: error.canRestore ?? false,
      id: error.id,
    })
  }

  if (!response.ok) {
    throw new Error('Error creating category product')
  }

  return response.json()
}

export const updateCategoryProduct = async (
  id: number,
  data: UpdateCategoryProductDto,
): Promise<CategoryProduct> => {
  const response = await fetch(`${API_URL}/categories-products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (response.status === 409) {
    const error = await response.json()
    throw new CategoryConflictException({
      message: error.message,
      canRestore: error.canRestore ?? false,
      id: error.id,
    })
  }

  if (!response.ok) {
    throw new Error(`Error updating category product with id ${id}`)
  }

  return response.json()
}
export const deleteCategoryProduct = async (
  id: number,
): Promise<void> => {
  const response = await fetch(`${API_URL}/categories-products/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const errorText = await response.text()

    throw new Error(
      `Error deleting category product with id ${id}: ${errorText}`,
    )
  }

  return response.json()
}
