import { Pagination } from "./pagiantion.types"
import { User } from "./user.type"

export type Clientes = {
  id: number
  user?: User

}

export type ClientesResponse = Pagination<Clientes>