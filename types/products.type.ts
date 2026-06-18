import { CategoryProduct } from './categories-products'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl?: string
  status: boolean
  businessId: number
  categories?: CategoryProduct[]

  business?: {
    id: number
    name?: string
  }
}

export type ProductResponse = {
  data: Product[]
  pagination: {
    total: number
    page: number
    limit: number
    lastPage: number
    hasNextPage: boolean
  }
}
