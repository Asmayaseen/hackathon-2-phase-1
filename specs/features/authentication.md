# Authentication Feature Specification

> **Phase:** II - Full-Stack Web Application
> **Feature:** User Authentication & Authorization
> **Priority:** Critical (Security Feature)

---

## 📋 Feature Overview

This specification defines the complete user authentication system using Better Auth, including signup, login, logout, session management, and JWT-based authorization for API requests.

---

## 🎯 User Stories

### As a New User, I want to:

1. **Sign Up**
   - Create an account with email and password
   - See clear password requirements
   - Receive immediate validation feedback
   - Be redirected to dashboard after signup
   - Have my password securely hashed

2. **Understand Security**
   - Know my password is encrypted
   - See that my data is private
   - Trust the authentication system

### As a Returning User, I want to:

1. **Sign In**
   - Log in with my email and password
   - Stay logged in across sessions
   - See error message if credentials are wrong
   - Be redirected to dashboard after login

2. **Stay Authenticated**
   - Remain logged in for 7 days
   - Not be asked to login repeatedly
   - Have my session persist across browser tabs

3. **Sign Out**
   - Log out when I'm done
   - Be redirected to login page after logout
   - Have my session cleared

### As the System, I want to:

1. **Protect Resources**
   - Only allow authenticated users to access dashboard
   - Verify user identity on every API request
   - Prevent unauthorized access to other users' data
   - Automatically log out expired sessions

---

## 🔐 Authentication Architecture

### System Components

```
┌─────────────────────────────────────────────────┐
│              Frontend (Next.js)                 │
│  ┌───────────────────────────────────────────┐ │
│  │        Better Auth Client                 │ │
│  │  - signUp()                               │ │
│  │  - signIn()                               │ │
│  │  - signOut()                              │ │
│  │  - getSession()                           │ │
│  │  - useSession() hook                      │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────┬───────────────────────────┘
                      │ API Calls
                      ▼
┌─────────────────────────────────────────────────┐
│         Better Auth API (Next.js Route)         │
│  /api/auth/signin                               │
│  /api/auth/signup                               │
│  /api/auth/signout                              │
│  /api/auth/session                              │
└─────────────────────┬───────────────────────────┘
                      │ Database Queries
                      ▼
┌─────────────────────────────────────────────────┐
│           PostgreSQL (Neon)                     │
│  users table (email, password_hash, etc.)       │
└─────────────────────────────────────────────────┘
                      │
                      │ JWT Token (issued)
                      ▼
┌─────────────────────────────────────────────────┐
│             FastAPI Backend                     │
│  JWT Verification Middleware                    │
│  - Verify signature                             │
│  - Check expiry                                 │
│  - Extract user_id                              │
└─────────────────────────────────────────────────┘
```

---

## 🔄 Authentication Flows

### 1. Sign Up Flow

```
User visits /signup page
       ↓
User enters: email, name, password, confirm password
       ↓
Frontend validates input
  - Email format valid?
  - Password meets requirements?
  - Passwords match?
       ↓
If invalid → Show error messages
If valid → Continue
       ↓
Frontend calls Better Auth signUp()
       ↓
Better Auth API: POST /api/auth/signup
       ↓
Backend checks if email already exists
       ↓
If exists → Return error: "Email already registered"
If not exists → Continue
       ↓
Backend hashes password (bcrypt)
       ↓
Backend creates user in database
       ↓
Backend generates JWT token
  Payload: { user_id, email, exp }
  Signed with: BETTER_AUTH_SECRET
       ↓
Backend returns: { user, token, expiresAt }
       ↓
Frontend stores session (cookie/localStorage)
       ↓
Frontend redirects to /dashboard
       ↓
User is now logged in
```

### 2. Sign In Flow

```
User visits /login page
       ↓
User enters: email, password
       ↓
Frontend validates input
  - Email not empty?
  - Password not empty?
       ↓
Frontend calls Better Auth signIn()
       ↓
Better Auth API: POST /api/auth/signin
       ↓
Backend finds user by email
       ↓
User not found → Return error: "Invalid credentials"
User found → Continue
       ↓
Backend compares password with hash
       ↓
Password mismatch → Return error: "Invalid credentials"
Password matches → Continue
       ↓
Backend generates JWT token
  Payload: { user_id, email, exp }
  Signed with: BETTER_AUTH_SECRET
       ↓
Backend returns: { user, token, expiresAt }
       ↓
Frontend stores session
       ↓
Frontend redirects to /dashboard
       ↓
User is now logged in
```

### 3. Sign Out Flow

```
User clicks "Sign Out" button
       ↓
Frontend calls Better Auth signOut()
       ↓
Better Auth API: POST /api/auth/signout
       ↓
Backend clears session (if using server sessions)
       ↓
Backend returns success
       ↓
Frontend clears local session/cookie
       ↓
Frontend redirects to /login
       ↓
User is now logged out
```

### 4. Protected Route Access Flow

```
User navigates to /dashboard
       ↓
Dashboard layout checks authentication
       ↓
Frontend calls getSession()
       ↓
Session exists?
  No → Redirect to /login
  Yes → Continue
       ↓
Check if session expired?
  Expired → Clear session, redirect to /login
  Valid → Continue
       ↓
Render dashboard
       ↓
User makes API request (e.g., get tasks)
       ↓
Frontend includes JWT in Authorization header
       ↓
Backend extracts and verifies JWT
       ↓
JWT valid?
  No → Return 401 Unauthorized
  Yes → Continue
       ↓
Backend extracts user_id from JWT
       ↓
Backend executes request (filtered by user_id)
       ↓
Backend returns response
       ↓
Frontend displays data
```

### 5. Session Refresh Flow (Optional)

```
User session nearing expiry (e.g., 6 days old)
       ↓
Frontend detects session will expire soon
       ↓
Frontend calls Better Auth refresh endpoint
       ↓
Backend validates current session
       ↓
Backend issues new JWT token
  New expiry: current time + 7 days
       ↓
Frontend updates stored session
       ↓
User continues without interruption
```

---

## 🎨 User Interface

### Sign Up Page

```
┌────────────────────────────────────────────┐
│                                            │
│          🎯 Evolution of Todo              │
│                                            │
│         Create Your Account                │
│                                            │
│  Name:                                     │
│  [_________________________________]       │
│                                            │
│  Email:                                    │
│  [_________________________________]       │
│                                            │
│  Password:                                 │
│  [_________________________________]  👁    │
│  Must be at least 8 characters            │
│                                            │
│  Confirm Password:                         │
│  [_________________________________]  👁    │
│                                            │
│  [        Create Account         ]         │
│                                            │
│  Already have an account? Sign in          │
│                                            │
└────────────────────────────────────────────┘
```

### Sign In Page

```
┌────────────────────────────────────────────┐
│                                            │
│          🎯 Evolution of Todo              │
│                                            │
│         Welcome Back!                      │
│                                            │
│  Email:                                    │
│  [_________________________________]       │
│                                            │
│  Password:                                 │
│  [_________________________________]  👁    │
│                                            │
│  [ ] Remember me                           │
│                                            │
│  [          Sign In            ]           │
│                                            │
│  Don't have an account? Sign up            │
│                                            │
│  Forgot password? (Phase III)              │
│                                            │
└────────────────────────────────────────────┘
```

### Dashboard Header (Authenticated)

```
┌────────────────────────────────────────────┐
│  🎯 My Tasks                    John Doe ▼ │
│                                   ┌──────┐ │
│                                   │Profile│ │
│                                   │Logout │ │
│                                   └──────┘ │
└────────────────────────────────────────────┘
```

---

## 🔒 Security Requirements

### Password Security

**Requirements:**
- Minimum length: 8 characters
- Maximum length: 128 characters
- Must contain at least one letter
- Must contain at least one number (recommended, not enforced)

**Hashing:**
- Algorithm: bcrypt
- Salt rounds: 10-12
- Never store plain text passwords
- Never log passwords

**Validation (Frontend):**
```typescript
const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return "Password must be at least 8 characters"
  }
  if (password.length > 128) {
    return "Password must be less than 128 characters"
  }
  if (!/[a-zA-Z]/.test(password)) {
    return "Password must contain at least one letter"
  }
  return null // Valid
}
```

### Email Validation

**Format:**
```typescript
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
```

**Requirements:**
- Valid email format
- Unique (not already registered)
- Case-insensitive comparison
- Trimmed of whitespace

### JWT Token Security

**Token Structure:**
```json
{
  "user_id": "user_abc123",
  "email": "user@example.com",
  "name": "John Doe",
  "iat": 1702900000,
  "exp": 1703504800
}
```

**Token Properties:**
- **Algorithm:** HS256 (HMAC SHA-256)
- **Secret:** `BETTER_AUTH_SECRET` (min 32 characters)
- **Expiry:** 7 days (604800 seconds)
- **Signed:** Yes, with secret key

**Security Checks:**
1. **Signature Verification:**
   ```python
   jwt.decode(token, BETTER_AUTH_SECRET, algorithms=["HS256"])
   ```

2. **Expiry Check:**
   ```python
   if payload['exp'] < time.time():
       raise HTTPException(401, "Token expired")
   ```

3. **User ID Match:**
   ```python
   if payload['user_id'] != url_user_id:
       raise HTTPException(403, "Forbidden")
   ```

### Session Management

**Storage:**
- **Development:** localStorage or cookie
- **Production:** Secure HTTP-only cookie (preferred)

**Cookie Configuration:**
```typescript
{
  httpOnly: true,      // Prevent XSS
  secure: true,        // HTTPS only (production)
  sameSite: 'strict',  // CSRF protection
  maxAge: 604800,      // 7 days
  path: '/'
}
```

---

## 📊 Database Schema

### Users Table (Managed by Better Auth)

```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,                    -- UUID
    email TEXT UNIQUE NOT NULL,             -- User email
    name TEXT,                               -- Display name
    password_hash TEXT NOT NULL,             -- Bcrypt hash
    email_verified BOOLEAN DEFAULT false,    -- Email verification status
    created_at TIMESTAMP DEFAULT NOW(),      -- Account creation
    updated_at TIMESTAMP DEFAULT NOW()       -- Last update
);

-- Index for login queries
CREATE INDEX idx_users_email ON users(email);
```

**Sample Data:**
```json
{
  "id": "user_2aB3cD4eF5",
  "email": "john@example.com",
  "name": "John Doe",
  "password_hash": "$2b$10$xyz...abc",
  "email_verified": false,
  "created_at": "2025-12-09T10:00:00Z",
  "updated_at": "2025-12-09T10:00:00Z"
}
```

---

## 🛠️ Implementation

### Better Auth Configuration

**Server-Side (lib/auth.ts):**
```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
  database: {
    provider: "postgres",
    url: process.env.DATABASE_URL!,
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,      // Update every 24 hours
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
})
```

**Client-Side (lib/auth-client.ts):**
```typescript
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
})

export const { signIn, signUp, signOut, useSession } = authClient
```

### Protected Route Pattern

**Layout Protection:**
```typescript
// app/dashboard/layout.tsx
'use client'

import { useSession } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (!isPending && !session) {
      redirect('/login')
    }
  }, [session, isPending])

  if (isPending) {
    return <LoadingSpinner />
  }

  if (!session) {
    return null
  }

  return (
    <div>
      <Header user={session.user} />
      {children}
    </div>
  )
}
```

### Backend JWT Verification

**Middleware (middleware/auth.py):**
```python
from fastapi import Header, HTTPException
import jwt
from datetime import datetime

async def verify_jwt(authorization: str = Header(None)):
    """Verify JWT token and return payload."""

    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")

    token = authorization.replace("Bearer ", "")

    try:
        payload = jwt.decode(
            token,
            BETTER_AUTH_SECRET,
            algorithms=["HS256"]
        )

        # Check expiry
        if payload.get('exp') < datetime.utcnow().timestamp():
            raise HTTPException(status_code=401, detail="Token expired")

        return payload

    except jwt.InvalidSignatureError:
        raise HTTPException(status_code=401, detail="Invalid token signature")
    except jwt.DecodeError:
        raise HTTPException(status_code=401, detail="Invalid token format")
    except Exception as e:
        raise HTTPException(status_code=401, detail="Token verification failed")
```

**Route Protection:**
```python
from fastapi import Depends

@app.get("/api/{user_id}/tasks")
async def list_tasks(
    user_id: str,
    token_data: dict = Depends(verify_jwt),
    db: Session = Depends(get_db)
):
    # Verify user_id matches token
    if token_data.get("user_id") != user_id:
        raise HTTPException(status_code=403, detail="Forbidden: User ID mismatch")

    # Proceed with authorized request
    tasks = db.query(Task).filter(Task.user_id == user_id).all()
    return {"tasks": tasks}
```

---

## 🎭 User Feedback

### Loading States

**Sign Up/Sign In Buttons:**
```tsx
<Button disabled={loading}>
  {loading ? (
    <>
      <Spinner className="mr-2" />
      {isSignUp ? 'Creating account...' : 'Signing in...'}
    </>
  ) : (
    isSignUp ? 'Create Account' : 'Sign In'
  )}
</Button>
```

### Success Messages

- ✅ "Account created successfully! Redirecting..."
- ✅ "Welcome back!"
- ✅ "Signed out successfully"

### Error Messages

**Sign Up Errors:**
- ❌ "Email already registered. Please sign in."
- ❌ "Password must be at least 8 characters"
- ❌ "Passwords do not match"
- ❌ "Invalid email format"

**Sign In Errors:**
- ❌ "Invalid email or password"
- ❌ "Please enter your email"
- ❌ "Please enter your password"

**Session Errors:**
- ❌ "Your session has expired. Please sign in again."
- ❌ "Authentication failed. Please sign in."

---

## 📋 Acceptance Criteria

### Sign Up
- [ ] User can create account with email, name, password
- [ ] Password must be at least 8 characters
- [ ] Email must be valid format
- [ ] Email must be unique (not already registered)
- [ ] Password is hashed before storing
- [ ] User automatically logged in after signup
- [ ] User redirected to dashboard after signup
- [ ] Error shown if email already exists
- [ ] Error shown if password too short

### Sign In
- [ ] User can log in with email and password
- [ ] Correct credentials log user in
- [ ] Incorrect credentials show error
- [ ] Error message doesn't reveal if email exists
- [ ] User redirected to dashboard after login
- [ ] Session persists across page refreshes
- [ ] Session persists for 7 days

### Sign Out
- [ ] User can sign out from any page
- [ ] Session cleared on sign out
- [ ] User redirected to login page
- [ ] Cannot access protected routes after signout

### Protected Routes
- [ ] Unauthenticated users redirected to login
- [ ] Authenticated users can access dashboard
- [ ] Expired sessions force re-login
- [ ] Loading state shown while checking auth

### API Authorization
- [ ] All API requests include JWT token
- [ ] Backend verifies JWT signature
- [ ] Backend checks JWT expiry
- [ ] Backend validates user_id match
- [ ] Invalid token returns 401 Unauthorized
- [ ] Mismatched user_id returns 403 Forbidden

### Security
- [ ] Passwords never stored in plain text
- [ ] Passwords hashed with bcrypt
- [ ] JWT tokens signed with secret
- [ ] HTTPS used in production
- [ ] No sensitive data in frontend logs
- [ ] Session cookies are HTTP-only (production)

---

## 🔗 Related Specifications

- **Database Schema:** `specs/database/schema.md`
- **API Endpoints:** `specs/api/rest-endpoints.md`
- **UI Pages:** `specs/ui/pages.md`

---

**Authentication Specification Version:** 1.0
**Last Updated:** December 9, 2025
**Status:** ✅ Ready for Implementation
