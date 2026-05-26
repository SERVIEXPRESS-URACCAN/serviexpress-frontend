import { CreateClientDto } from './clients'
import { Profile } from './profile.types'

export interface User {
  id: number
  email: string

  status: boolean

  profile?: Profile
}

export type CreateUserDto = {
  email: string
  password: string
  profile: CreateClientDto
}