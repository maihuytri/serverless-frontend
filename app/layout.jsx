import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { CartProvider } from "@/lib/cart-context"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "E-commerce Store",
  description: "Shop the latest products online",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} E-commerce Store. All rights reserved.
                </div>
              </footer>
            </div>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
