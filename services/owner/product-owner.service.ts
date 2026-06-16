import { API_URL } from '@/config/config'
import { ProductResponse } from '@/types/products.type'

export const getProducts = async (
  token: string,
  page: number,
  search?: string,
): Promise<ProductResponse> => {
  const params = new URLSearchParams()

  params.set('page', String(page))
  params.set('limit', '12')

  if (search) params.set('search', search)

  const response = await fetch(`${API_URL}/products?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Error fetching products')
  }

  return result
}

export const createOwnerProduct = async (token: string, data: FormData) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Error creating product')
  }

  return result
}

export const updateOwnerProduct = async (
  token: string,
  productId: number,
  data: FormData,
) => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Error updating product')
  }

  return result
}

export const deleteOwnerProduct = async (token: string, productId: number) => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const result = await response.json().catch(() => null)

    throw new Error(result?.message || 'Error deleting product')
  }
}
