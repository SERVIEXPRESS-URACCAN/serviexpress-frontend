import { Gender } from "./gender.type"
import { User } from "./user.type"

export type Clients = {
  id: number
  name: st
  lastName: string
  cellphone: string
  gender?: Gender
  user?: User
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