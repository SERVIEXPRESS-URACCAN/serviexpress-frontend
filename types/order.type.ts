import { Business } from './business.type'
import { OrderItem } from './orderItem.type'
import { DeliveryStatus, OrderStatus } from './status.type'
import { User } from './user.type'

export interface Order {
  id: number

  userId: number
  user?: User

  businessId: number
  business?: Business

  items: OrderItem[]

  status: OrderStatus
  deliveryStatus: DeliveryStatus

  total: number

  mandaderoId?: number

  createdAt: string
  acceptedAt?: string
}
