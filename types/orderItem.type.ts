import { Order } from './order.type'
import { Product } from './products.type'

export type OrderItem = {
  id: number
  orderId: number
  productId: number
  product?: Product
  quantity: number
  priceAtMoment: number
  subtotal: number
  nameSnapshot: string
  order?: Order
  createdAt: string
}
