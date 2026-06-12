import { CategoryProduct } from "./categories-products"

export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: CategoryProduct
  status: boolean
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