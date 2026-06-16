import { Business } from './business.type'
import { User } from './user.type'

export type Owner = {
  id: number

  user: User

  business: Business
  razonSocial: string

  identificationCardImage: string
}

export type OwnerResponse = {
  data: Owner[]
  pagination: {
    total: number
    page: number
    limit: number
    lastPage: number
    hasNextPage: boolean
  }
}
