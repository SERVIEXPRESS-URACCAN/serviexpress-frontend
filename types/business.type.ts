import { CategoryBusiness } from './categories-business'
import { Product } from './products.type'

export type Business = {
  id: number
  name: string
  description?: string
  address?: string
  phone: string
  logoImage?: string
  bannerImage?: string
  city?: { id: number; name: string }
  categories?: CategoryBusiness[]
  products?: Product[]
  createdAt?: string
  updatedAt?: string
}

export type BusinessResponse = {
  data: Business[]
  meta: {
    total: number
    page: number
    lastPage: number
    hasNextPage: boolean
  }
}
