import { User } from './user.type'

export interface Owner {
  id: number

  user?: User

  razonSocial: string

  identificationCardImage: string
}
