import { Gender } from './gender.type'
import { User } from './user.type'

export type Clients = {
  id: number
  name: string
  lastName: string
  cellphone: string
  gender?: Gender
  user: User
  profileImage?: string | null
}

export type ClientsResponse = {
  data: Clients[]
  pagination: {
    total: number
    page: number
    limit: number
    lastPage: number
    hasNextPage: boolean
  }
}
