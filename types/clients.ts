import { Pagination } from "./pagiantion.types"

export type Clientes = {
  name: string
  lastName: string
  cellphone: string
  gender_id: number
  user_id: number
}

export type ClientesResponse = Pagination<Clientes>