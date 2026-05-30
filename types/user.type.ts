import { Profile } from './profile.types'

export interface User {
  id: number
  email: string

  status?: boolean

  profile?: Profile
}
