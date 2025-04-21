"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const { items } = useCart()
  
  // If someone tries to access this page directly without checking out, redirect them
  useEffect(() => {
    if (items.length > 0) {
      router.push("/checkout")
    }
  }, [items, router])

  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
      <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
      
      <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
      
      <p className="text-xl mb-8">
        Thank you for your purchase. Your order has been confirmed and will be shipped soon.
      </p>
      
      <div className="bg-muted rounded-lg p-6 mb-8">
        <p className="text-muted-foreground mb-4">
          A confirmation email has been sent to your email address.
        </p>
        <p className="text-muted-foreground">
          Order details and tracking information will be available in your account once your order has been processed.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/orders">View My Orders</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  )
}
