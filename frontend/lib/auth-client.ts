/**
 * Better Auth Client Configuration
 *
 * This file configures Better Auth for client-side authentication.
 * Used in client components and React hooks.
 */

"use client"

import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
})

// Export commonly used hooks and functions
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  $Infer,
} = authClient

// Type exports for better TypeScript support
export type Session = typeof $Infer.Session
