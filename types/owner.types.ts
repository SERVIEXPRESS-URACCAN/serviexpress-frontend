import { User } from './user.type'

export type Owner = {
  id: number

  user?: User

  razonSocial: string

  identificationCardImage: string
}

export type UpdateOwner = {
  razonSocial?: string
}
