import { Business } from './business.type'
import { OrderItem } from './orderItem.type'
import { DeliveryStatus, OrderStatus } from './status.type'
import { User } from './user.type'

export interface Order {
  id: number

  user?: User

  businessId: number
  business?: Business

  items: OrderItem[]

  status: OrderStatus
  deliveryStatus: DeliveryStatus

  total: number

  createdAt: string
  acceptedAt?: string
}

export type OrderResponse = {
  data: Order[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}
