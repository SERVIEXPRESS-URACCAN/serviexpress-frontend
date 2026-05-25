import { Business } from './business.type'
import { User } from './user.type'

export type Owner = {
  id: number

  user?: User

  business?: Business
  razonSocial: string

  identificationCardImage: string
}

export type UpdateOwner = {
  name?: string
  lastName?: string
  cellphone?: string
  razonSocial?: string
}
