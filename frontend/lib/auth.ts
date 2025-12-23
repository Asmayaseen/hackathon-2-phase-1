/**
 * Better Auth Server Configuration
 *
 * This file configures Better Auth for server-side authentication.
 * Used in API routes and server components.
 */

import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"

// Allow build to proceed without database connection
// Database will be connected at runtime
const DATABASE_URL = process.env.DATABASE_URL || ""
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET || ""
const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000"

export const auth = betterAuth({
  database: DATABASE_URL ? {
    provider: "postgres",
    url: DATABASE_URL,
  } : undefined,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  plugins: [nextCookies()],
  secret: BETTER_AUTH_SECRET,
  baseURL: BETTER_AUTH_URL,
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
