"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export default function ProductCard({ product }) {
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
    <Card className="overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="overflow-hidden h-48 relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2 h-10">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4">
        <Button onClick={handleAddToCart} className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
