import { Pagination } from "./pagiantion.types"

export type Clientes = {
  id: number
  name: string
  lastName: string
  cellphone: string
  image: string | null
  user: {
    id: number
    email: string
    status: boolean
  }
}

export type ClientesResponse = Pagination<Clientes>