import { Gender } from "./gender.type"
import { Pagination } from "./pagiantion.types"
import { User } from "./user.type"

export type Clients = {
  id: number
  name: string
  lastName: string
  cellphone: string
  gender?: Gender
  user?: User

}

export type ClientesResponse = Pagination<Clients>