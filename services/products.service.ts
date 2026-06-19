import { API_URL } from '@/config/config'
import { fetchAuth } from '@/lib/fetch-auth'
import { Product, ProductResponse } from '@/types/products.type'

export const getProductsByBusiness = async (
  token: string,
  businessId: number,
  page: number,
  search?: string,
): Promise<ProductResponse> => {
  const params = new URLSearchParams()
  params.set('page', String(page))
  params.set('limit', '12')
  params.set('businessId', String(businessId))
  if (search) params.set('search', search)

  const response = await fetch(
    `${API_URL}/products/admin?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    },
  )
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message || 'Error fetching products')
  }
  return result
}

export const createProduct = async (data: FormData) => {
  const response = await fetchAuth(`${API_URL}/products/admin`, {
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

export const updateProduct = async (productId: number, data: FormData) => {
  const response = await fetchAuth(`${API_URL}/products/admin/${productId}`, {
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

export const deleteProduct = async (productId: number) => {
  const response = await fetchAuth(`${API_URL}/products/admin/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    const result = await response.json().catch(() => null)
    throw new Error(result?.message || 'Error deleting product')
  }

  return true
}

export const toggleProductStatusAdmin = async (
  productId: number,
  status: boolean,
) => {
  const response = await fetchAuth(`${API_URL}/products/admin/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Error actualizando estado')
  }

  return result
}

export const getOwnerProductById = async (
  productId: number,
): Promise<Product> => {
  const response = await fetchAuth(`${API_URL}/products/${productId}`, {
    cache: 'no-store',
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Error fetching product')
  }

  return result
}
