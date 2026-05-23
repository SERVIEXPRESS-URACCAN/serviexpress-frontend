import { API_URL } from '@/config/config'
import { CategoryProduct, CreateCategoryProductDto,UpdateCategoryProductDto } from '@/types/categories-products'

export const getCategoryProducts = async (): Promise<CategoryProduct[]> => {
  const response = await fetch(`${API_URL}/categories-products`)

  if (!response.ok) {
    throw new Error(`Error fetching categories: `)
  }

  return response.json()
}

export const createCategoryProduct = async (data: CreateCategoryProductDto, token: string): Promise<CategoryProduct> => {
  const response = await fetch(`${API_URL}/categories-products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
       Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`Error creating category product: `)
  }

  return response.json()
}

export const updateCategoryProduct = async (
  id: number,
  data: UpdateCategoryProductDto,
  token: string
): Promise<CategoryProduct> => {
  const response = await fetch(`${API_URL}/categories-products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
       Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`Error updating category product with id ${id} `)
  }

  return response.json()
}

export const deleteCategoryProduct = async (
  id: number,
  token: string
): Promise<void> => {
  const response = await fetch(
    `${API_URL}/categories-products/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Error deleting category product with id ${id}: `)
  }

  return response.json()
}
