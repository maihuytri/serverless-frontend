import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default function CheckoutLayout({ children }) {
  // Check if user is authenticated by looking for the user in cookies
  // This is a server component, so we can't use the auth context directly
  const userCookie = cookies().get("user")?.value

  // If no user cookie is found, redirect to login
  if (!userCookie) {
    redirect("/login?redirectTo=/checkout")
  }

  return <>{children}</>
}
