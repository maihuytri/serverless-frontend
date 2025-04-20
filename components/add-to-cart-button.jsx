"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart } from "lucide-react"

export default function AddToCartButton({ product }) {
  const { toast } = useToast()
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <Button size="lg" onClick={handleAddToCart} className="w-full md:w-auto">
      <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
    </Button>
  )
}
