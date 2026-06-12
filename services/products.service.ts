import { API_URL } from "@/config/config"
import { fetchAuth } from "@/lib/fetch-auth"
import { CreateProduct } from "@/schemas/product.shema"
import { Product, ProductResponse } from "@/types/products.type"

export const getProducts = async (
  token: string,
): Promise<ProductResponse> => {
  const response = await fetchAuth(`${API_URL}/products/`, {
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


export const createProduct = async (
  data: CreateProduct,
  token: string,
): Promise<Product> => {
  const formData = new FormData()

  formData.append('name', data.name)

  if (data.description) {
    formData.append('description', data.description)
  }

  formData.append('price', String(data.price))
  
  formData.append('categoryId', String(data.categoryId))

  if (data.productImage) {
    formData.append('productImage', data.productImage)
  }

  const response = await fetchAuth(`${API_URL}/products`, {
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