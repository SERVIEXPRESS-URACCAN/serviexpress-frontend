import { Gender } from './gender.type'

export type Profile = {
  id: number
  name: string
  lastName: string
  cellphone: string
  profileImage?: string
  gender?: Gender
}
