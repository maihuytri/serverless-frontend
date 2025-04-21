"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showVerifiedMessage, setShowVerifiedMessage] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get the redirect path from URL query params
  const redirectTo = searchParams.get("redirectTo") || "/"
  
  // Show verification success message if coming from verification page
  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      setShowVerifiedMessage(true)
      // Hide the message after 5 seconds
      const timer = setTimeout(() => setShowVerifiedMessage(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await login(email, password)
      router.push(redirectTo)
    } catch (error) {
      console.error("Login failed:", error)
      
      // If user not confirmed, store email and redirect to verification page
      if (error.code === "UserNotConfirmedException") {
        localStorage.setItem("verificationEmail", email)
        router.push(`/verify-account?email=${encodeURIComponent(email)}`)
        return
      }
      
      setIsLoading(false)
    }
  }
  
  return (
    <div className="container mx-auto flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
          {showVerifiedMessage && (
            <Alert className="mt-4 bg-green-50 border-green-300">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <AlertDescription className="text-green-700">
                Your account has been verified successfully. You can now log in.
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm text-primary">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
