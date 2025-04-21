import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default function CheckoutLayout({ children }) {
  // Check if user is authenticated using the auth token in cookies
  // This approach works with AWS Amplify's authentication
  const authToken = cookies().get("amplify-authenticator-authToken")?.value

  // If no auth token is found, redirect to login
  if (!authToken) {
    redirect("/login?redirectTo=/checkout")
  }

  return <>{children}</>
}
