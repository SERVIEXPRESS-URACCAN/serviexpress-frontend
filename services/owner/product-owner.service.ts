import { API_URL } from '@/config/config'
import { fetchAuth } from '@/lib/fetch-auth'
import { ProductResponse } from '@/types/products.type'

export const getProducts = async (
  page: number,
  search?: string
): Promise<ProductResponse> => {
  const params = new URLSearchParams()

  params.set('page', String(page))
  params.set('limit', '12')

  if (search) params.set('search', search)

  const response = await fetchAuth(`${API_URL}/products?${params.toString()}`, {
    headers: {
<<<<<<< HEAD
      'Content-Type': 'application/json',
=======
      'Content-Type': 'application/json'
>>>>>>> origin/revert-45-develop
    },
    cache: 'no-store'
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Error fetching products')
  }

  return result
}
export const getOwnerProductById = async (productId: number) => {
  const response = await fetchAuth(`${API_URL}/products/${productId}`, {
    headers: {
<<<<<<< HEAD
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
=======
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
>>>>>>> origin/revert-45-develop
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Error ${response.status}: ${JSON.stringify(error)}`)
  }

  return response.json()
}
export const createOwnerProduct = async (data: FormData) => {
  const response = await fetchAuth(`${API_URL}/products`, {
    method: 'POST',
<<<<<<< HEAD
    body: data,
=======
    body: data
>>>>>>> origin/revert-45-develop
  })

  const errorText = await response.text()

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${errorText}`)
  }

  return JSON.parse(errorText)
}

export const updateOwnerProduct = async (productId: number, data: FormData) => {
  const response = await fetchAuth(`${API_URL}/products/${productId}`, {
    method: 'PATCH',
<<<<<<< HEAD
    body: data,
=======
    body: data
>>>>>>> origin/revert-45-develop
  })

  const errorText = await response.text()

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${errorText}`)
  }

  return JSON.parse(errorText)
}
export const deleteOwnerProduct = async (productId: number) => {
  const response = await fetchAuth(`${API_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: {
<<<<<<< HEAD
      'Content-Type': 'application/json',
    },
=======
      'Content-Type': 'application/json'
    }
>>>>>>> origin/revert-45-develop
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Error ${response.status}: ${JSON.stringify(error)}`)
  }

  return response.json()
}

export const toggleProductStatus = async (
  productId: number,
<<<<<<< HEAD
  status: boolean,
=======
  status: boolean
>>>>>>> origin/revert-45-develop
) => {
  const response = await fetchAuth(`${API_URL}/products/${productId}`, {
    method: 'PATCH',
    headers: {
<<<<<<< HEAD
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
=======
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
>>>>>>> origin/revert-45-develop
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Error actualizando estado')
  }

  return result
}
