"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie'
import { useToast } from "@/hooks/use-toast"
import { Amplify } from 'aws-amplify'
import { signIn, signUp, confirmSignUp, signOut, getCurrentUser, fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth'

// Configure Amplify
// You'll need to replace these values with your actual Cognito details from the AWS CloudFormation output
Amplify.configure({
  Auth: {
    Cognito: {
      region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    }
  }
});

// Create Auth Context
const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Load user session from Cognito on client side
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        
        setUser({
          id: attributes.sub,
          name: attributes.name || currentUser.username,
          email: attributes.email,
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Not authenticated", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth()
  }, [])

  // Sign in with Cognito
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Sign in with Cognito
      const { isSignedIn } = await signIn({ username: email, password });
      
      if (isSignedIn) {
        // Get user attributes
        const attributes = await fetchUserAttributes();
        const currentUser = await getCurrentUser();
        
        // Create user object with relevant data
        const user = {
          id: attributes.sub,
          name: attributes.name || currentUser.username,
          email: attributes.email || email,
        };
        
        setUser(user);
        setIsAuthenticated(true);

        const token = await getToken();
        Cookies.set('amplify-authenticator-authToken', token);
        
        toast({
          title: "Logged in successfully",
          description: `Welcome back, ${user.name}!`,
        });
        
        return user;
      }
    } catch (error) {
      console.error("Login error:", error);
      
      let errorMessage = "Login failed";
      if (error.code === "UserNotFoundException") {
        errorMessage = "User not found";
      } else if (error.code === "NotAuthorizedException") {
        errorMessage = "Incorrect username or password";
      } else if (error.code === "UserNotConfirmedException") {
        errorMessage = "Please confirm your account";
      }
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Sign up with Cognito
  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      
      // Sign up with Cognito
      const { isSignUpComplete, userId } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
          },
        },
      });
      
      toast({
        title: "Account created successfully",
        description: "Please check your email for a confirmation code",
      });
      
      // Return the user ID
      return { isSignUpComplete, userId };
    } catch (error) {
      console.error("Signup error:", error);
      
      let errorMessage = "Sign up failed";
      if (error.code === "UsernameExistsException") {
        errorMessage = "An account with this email already exists";
      } else if (error.code === "InvalidPasswordException") {
        errorMessage = "Password does not meet requirements";
      } else if (error.code === "InvalidParameterException") {
        errorMessage = "Invalid email format";
      }
      
      toast({
        title: "Sign up failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Confirm signup with verification code
  const confirmSignUpFunc = async (email, code) => {
    try {
      setLoading(true);
      await confirmSignUp({
        username: email,
        confirmationCode: code
      });
      
      toast({
        title: "Email verified successfully",
        description: "You can now sign in with your credentials",
      });
      
      return true;
    } catch (error) {
      console.error("Confirmation error:", error);
      
      toast({
        title: "Verification failed",
        description: error.message || "Failed to verify email address",
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsAuthenticated(false);
      
      toast({
        title: "Logged out successfully",
      });
      
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  // Function to get authentication token for API calls
  const getToken = async () => {
    try {
      const { tokens } = await fetchAuthSession();
      return tokens.idToken.toString();
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        confirmSignUp: confirmSignUpFunc,
        logout,
        getToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}