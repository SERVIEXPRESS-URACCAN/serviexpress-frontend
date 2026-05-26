import { Gender } from "./gender.type"
import { Pagination } from "./pagiantion.types"
import { User } from "./user.type"

export type Clientes = {
  id: number
  name: string
  lastName: string
  cellphone: string
  gender?: Gender
  user?: User

}

export type CreateClientDto = {
  name: string
  lastName: string
  cellphone: string
  gender_id: number
}

export type ClientesResponse = Pagination<Clientes>