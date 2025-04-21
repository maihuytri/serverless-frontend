"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, getToken } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push("/login?redirectTo=/orders")
      return
    }

    // Fetch orders from API
    const fetchOrders = async () => {
      try {
        setLoading(true)
        
        // In a real app, this would be an API call to your Lambda function
        // const token = await getToken()
        // const response = await fetch('https://your-api-endpoint.com/orders', {
        //   headers: { Authorization: `Bearer ${token}` }
        // })
        // const data = await response.json()
        
        // For now, use mock data
        const mockOrders = [
          {
            id: "ord-001",
            createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
            status: "delivered",
            totalPrice: 279.98,
            itemCount: 3
          },
          {
            id: "ord-002",
            createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
            status: "shipped",
            totalPrice: 249.99,
            itemCount: 1
          }
        ]
        
        setOrders(mockOrders)
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [isAuthenticated, router])

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "shipped":
        return "bg-blue-500"
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg">Loading your orders...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">You haven't placed any orders yet</h2>
          <p className="text-muted-foreground mb-8">Browse our products and place your first order!</p>
          <Button onClick={() => router.push("/")}>Browse Products</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-muted">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <CardDescription>Placed on {formatDate(order.createdAt)}</CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} text-white`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="py-4">
                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground">
                    {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                  </p>
                  <p className="font-bold">${order.totalPrice.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}