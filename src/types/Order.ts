import { CartItem, ShippingAddress } from "./Cart"
import { User } from "./User"

export type Order = {
    _id: string
    user: User
    orderItems: CartItem[]
    shippingAddress: ShippingAddress
    paymentMethod: string
    itemsPrice: number
    shippingPrice: number
    taxPrice: number
    totalPrice: number
    createdAt: string
    isPaid: boolean
    paidAt: string
    isDelivered: boolean  
    deliveredAt: string
}