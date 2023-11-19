export type CartItem = {
    _id: string
    image: string | undefined
    slug: string
    countInStock: number
    price: number
    name: string

    quantity: number
  }

  export type ShippingAddress = {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
  }

  export type Cart = {
    cartItems: CartItem[]
    shippingAddress: ShippingAddress
    shippingPrice: number
    itemsPrice: number
    taxPrice: number
    totalPrice: number
    paymentMethod: string
  }
