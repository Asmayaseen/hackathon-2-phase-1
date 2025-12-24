/**
 * Better Auth Server Configuration
 *
 * This file configures Better Auth for server-side authentication.
 * Used in API routes and server components.
 */

import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"

// Environment variables
const DATABASE_URL = process.env.DATABASE_URL
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET || "fallback-secret-for-build"
const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL || process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

// Check if we're in a build/compile phase where database might not be needed
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || !DATABASE_URL

// Create Better Auth instance with conditional database
// During build, we provide a minimal config that won't try to connect to DB
export const auth = betterAuth({
  database: isBuildTime ? {
    provider: "postgres",
    url: DATABASE_URL || "postgresql://placeholder:placeholder@placeholder:5432/placeholder",
  } : {
    provider: "postgres",
    url: DATABASE_URL!,
  },
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
  advanced: {
    // Don't try to sync schema during build
    generateSchema: false,
  },
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
