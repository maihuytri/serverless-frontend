"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import CartDrawer from "./cart-drawer"
import { useAuth } from "@/lib/auth-context"

export default function Navbar() {
  const { totalItems } = useCart()
  const { isAuthenticated, user } = useAuth()
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            E-commerce
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative" onClick={() => setCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            <Button variant="outline" size="icon" asChild>
              <Link href={isAuthenticated ? "/account" : "/login"}>
                <User className="h-5 w-5" />
                {isAuthenticated && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-2 w-2 flex items-center justify-center"></span>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
