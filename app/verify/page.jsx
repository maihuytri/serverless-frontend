"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyPage() {
  const [code, setCode] = useState("") // Pre-filled with the code from your email
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { confirmSignUp } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Get the email from URL query params
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
    } else {
      // If no email is provided in URL, try to get from localStorage
      const storedEmail = localStorage.getItem("verificationEmail")
      if (storedEmail) {
        setEmail(storedEmail)
      }
    }
  }, [searchParams])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      alert("Email is required for verification")
      return
    }
    
    setIsLoading(true)
    
    try {
      await confirmSignUp(email, code)
      
      // Clear stored email after successful verification
      localStorage.removeItem("verificationEmail")
      
      // Redirect to login page
      router.push("/login?verified=true")
    } catch (error) {
      console.error("Verification failed:", error)
      setIsLoading(false)
    }
  }
  
  return (
    <div className="container mx-auto flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <CardDescription>
            {email ? 
              `Enter the verification code sent to ${email}` : 
              "Enter your verification code"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!email && (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter your verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="text-center text-lg tracking-widest"
                autoFocus
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>
            <div className="text-sm text-center">
              <Button 
                variant="link" 
                type="button" 
                className="p-0 h-auto"
                onClick={() => router.push("/login")}
              >
                Back to login
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}