export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: string
}
