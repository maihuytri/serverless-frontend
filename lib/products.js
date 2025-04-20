// Mock product data
const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life.",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Track your fitness, receive notifications, and more with this sleek smart watch.",
    price: 249.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and eco-friendly t-shirt made from 100% organic cotton.",
    price: 29.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Clothing",
  },
  {
    id: "4",
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet with RFID protection.",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Accessories",
  },
  {
    id: "5",
    name: "Stainless Steel Water Bottle",
    description: "Double-walled insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 34.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Home",
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging for all Qi-enabled devices.",
    price: 39.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
  },
  {
    id: "7",
    name: "Ceramic Coffee Mug",
    description: "Handmade ceramic coffee mug with unique glaze finish.",
    price: 19.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Home",
  },
  {
    id: "8",
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360° sound and 12-hour battery life.",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
  },
]

export async function getProducts(query = "") {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!query) return products

  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) || product.description.toLowerCase().includes(lowercaseQuery),
  )
}

export async function getProductById(id) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return products.find((product) => product.id === id)
}
