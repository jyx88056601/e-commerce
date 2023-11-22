import { useMutation, useQuery } from '@tanstack/react-query' 
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

export const useCreateOrderMutation = () => useMutation({
    mutationFn: ({ orderItems, shippingAddress, paymentMethod, itemsPrice,  shippingPrice, taxPrice, totalPrice}: CreateOrderParams ) => 
    (apiClient.post<{message: string; order:Order}>(`api/orders`, { orderItems, shippingAddress, paymentMethod, itemsPrice,  shippingPrice, taxPrice, totalPrice})
    ).then(res  => res.data)
  })

export const useGetOrderDetailQuery = (id:string) => useQuery({
    queryKey: ["orders", id],
    queryFn: () => apiClient.get<Order>(`api/orders/${id}`).then(res => res.data)
})
  
export const useGetPaypalClientIdQuery = () =>
  useQuery({
    queryKey: ['paypal-clientId'],
    queryFn: async () =>
      (await apiClient.get<{ clientId: string }>(`/api/keys/paypal`)).data,
  })

export const usePayOrderMutation = () =>
  useMutation({
    mutationFn: async (details: { orderId: string }) =>
      (
        await apiClient.put<{ message: string; order: Order }>(
          `api/orders/${details.orderId}/pay`,
          details
        )
      ).data,
})

export const useGetOrderHistoryQuery = () =>
  useQuery({
    queryKey: ['order-history'],
    queryFn: async () =>
      (await apiClient.get<Order[]>(`/api/orders/mine`)).data,
  })