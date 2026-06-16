import { Business } from './business.type'
import { OrderItem } from './orderItem.type'
import { User } from './user.type'

export type Order = {
  id: number
  user: User
  business: Business
  items: OrderItem[]
  total: number
}
