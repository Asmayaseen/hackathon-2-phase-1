# Better Auth Integration Skill

> **Category:** Authentication
> **Technology:** Better Auth
> **Phase:** II - Full-Stack Web Application

---

## 📋 Overview

Better Auth provides email/password authentication with JWT tokens for Next.js applications.

---

## 🎯 Core Capabilities

### 1. Server Configuration
```typescript
// lib/auth.ts
import { betterAuth } from "better-auth"

export const auth = betterAuth({
  database: {
    provider: "postgres",
    url: process.env.DATABASE_URL!,
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
})
```

### 2. Client Configuration
```typescript
// lib/auth-client.ts
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
})

export const { signIn, signUp, signOut, useSession } = authClient
```

### 3. Sign Up
```typescript
'use client'

import { signUp } from '@/lib/auth-client'

async function handleSignUp(email: string, password: string, name: string) {
  try {
    await signUp({ email, password, name })
    router.push('/dashboard')
  } catch (error) {
    console.error('Sign up failed:', error)
  }
}
```

### 4. Sign In
```typescript
'use client'

import { signIn } from '@/lib/auth-client'

async function handleSignIn(email: string, password: string) {
  try {
    await signIn({ email, password })
    router.push('/dashboard')
  } catch (error) {
    console.error('Sign in failed:', error)
  }
}
```

### 5. Protected Routes
```typescript
'use client'

import { useSession } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (!isPending && !session) {
      redirect('/login')
    }
  }, [session, isPending])

  if (isPending) return <div>Loading...</div>
  if (!session) return null

  return <>{children}</>
}
```

### 6. Get Current User
```typescript
'use client'

import { useSession } from '@/lib/auth-client'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header>
      {session?.user && (
        <div>Welcome, {session.user.name}</div>
      )}
    </header>
  )
}
```

---

**Used by:** Frontend-Developer agent
