import { useMutation } from '@tanstack/react-query'
import apiClient from '../services/apiClient'
import { CartItem, ShippingAddress } from '../types/Cart'
import { Order } from '../types/Order'

interface CreateOrderParams {
    orderItems: CartItem[]
    shippingAddress: ShippingAddress
    paymentMethod: string
    itemsPrice: number
    shippingPrice: number
    taxPrice: number
    totalPrice: number
}

export const useCreateOrderMutation = () =>   useMutation({
    mutationFn: ({ orderItems, shippingAddress, paymentMethod, itemsPrice,  shippingPrice, taxPrice, totalPrice}: CreateOrderParams ) => 
    (apiClient.post<{message: string; order:Order}>(`api/orders`, { orderItems, shippingAddress, paymentMethod, itemsPrice,  shippingPrice, taxPrice, totalPrice})
    ).then(res  => res.data)
  })

  