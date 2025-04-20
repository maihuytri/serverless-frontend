import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto my-4 bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Order Successful!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been placed and is being processed. You will receive an email
            confirmation shortly.
          </p>
          <div className="mt-6 border rounded-md p-4 bg-muted/50">
            <p className="font-medium">Order #12345</p>
            <p className="text-sm text-muted-foreground">April 20, 2025</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/orders">View Orders</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
