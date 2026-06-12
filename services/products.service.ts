import { API_URL } from "@/config/config"
import { fetchAuth } from "@/lib/fetch-auth"
import { ProductResponse } from "@/types/products.type"

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
