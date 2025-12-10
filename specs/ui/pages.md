# UI Pages Specification

> **Phase:** II - Full-Stack Web Application
> **Component:** Frontend Page Layouts
> **Technology:** Next.js 16+ App Router + React Server Components

---

## 📋 Overview

This specification defines all page layouts and routing for the Evolution of Todo application using Next.js App Router architecture.

---

## 🗺️ Site Map

```
┌─────────────────────────────────────┐
│        Landing Page (/)             │
│  - Hero section                     │
│  - Features list                    │
│  - CTA buttons                      │
└───────┬─────────────────────────────┘
        │
        ├─> /signup (Public)
        │   - Sign up form
        │   - Email, name, password
        │
        ├─> /login (Public)
        │   - Sign in form
        │   - Email, password
        │
        └─> /dashboard (Protected)
            ├─ Task list
            ├─ Create task form
            ├─ Filter controls
            └─ User menu
```

---

## 📄 Page Specifications

### 1. Landing Page (`/`)

**File:** `app/page.tsx`

**Purpose:** Welcome page for non-authenticated users

**Layout:**
```
┌────────────────────────────────────────────────┐
│  Header: [Logo]  [Features] [Pricing] [Login] │
├────────────────────────────────────────────────┤
│                                                 │
│            🎯 Evolution of Todo                │
│                                                 │
│      Manage tasks. Stay organized.             │
│        Get things done.                        │
│                                                 │
│     [Get Started Free]  [Sign In]              │
│                                                 │
├────────────────────────────────────────────────┤
│                                                 │
│            ✨ Features                         │
│                                                 │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐      │
│   │ Simple  │  │  Secure │  │   Fast  │      │
│   │  CRUD   │  │   Auth  │  │   API   │      │
│   └─────────┘  └─────────┘  └─────────┘      │
│                                                 │
├────────────────────────────────────────────────┤
│  Footer: © 2025 | Privacy | Terms              │
└────────────────────────────────────────────────┘
```

**Implementation:**
```tsx
// app/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, Lock, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">🎯 Todo App</h1>
          <nav className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold mb-4">
              Evolution of Todo
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Manage your tasks efficiently. Stay organized.
              Get things done with our simple and powerful todo app.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg">Get Started Free</Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<CheckCircle className="h-8 w-8" />}
                title="Simple CRUD"
                description="Create, read, update, and delete tasks with ease"
              />
              <FeatureCard
                icon={<Lock className="h-8 w-8" />}
                title="Secure Auth"
                description="Your data is protected with industry-standard encryption"
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8" />}
                title="Fast & Responsive"
                description="Lightning-fast performance on all devices"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Evolution of Todo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
```

**Responsive Behavior:**
- Desktop: 3-column feature grid
- Tablet: 2-column feature grid
- Mobile: 1-column stack, smaller hero text

---

### 2. Sign Up Page (`/signup`)

**File:** `app/(auth)/signup/page.tsx`

**Purpose:** User registration

**Layout:**
```
┌────────────────────────────────────┐
│                                    │
│      🎯 Evolution of Todo          │
│                                    │
│     Create Your Account            │
│                                    │
│  Name:                             │
│  [___________________________]     │
│                                    │
│  Email:                            │
│  [___________________________]     │
│                                    │
│  Password:                         │
│  [___________________________] 👁   │
│  Must be at least 8 characters    │
│                                    │
│  Confirm Password:                 │
│  [___________________________] 👁   │
│                                    │
│  [    Create Account     ]         │
│                                    │
│  Already have an account?          │
│  Sign in                           │
│                                    │
└────────────────────────────────────┘
```

**Implementation:**
```tsx
// app/(auth)/signup/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUp } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)
    try {
      await signUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      toast({
        title: 'Account created!',
        description: 'Welcome to Evolution of Todo',
        variant: 'success',
      })

      router.push('/dashboard')
    } catch (error: any) {
      toast({
        title: 'Sign up failed',
        description: error.message || 'Please try again',
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">🎯 Todo App</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
```

**Validation:**
- Name: Required, not empty
- Email: Valid format, unique
- Password: Min 8 characters
- Confirm password: Matches password

---

### 3. Sign In Page (`/login`)

**File:** `app/(auth)/login/page.tsx`

**Purpose:** User authentication

**Layout:**
```
┌────────────────────────────────────┐
│                                    │
│      🎯 Evolution of Todo          │
│                                    │
│        Welcome Back!               │
│                                    │
│  Email:                            │
│  [___________________________]     │
│                                    │
│  Password:                         │
│  [___________________________] 👁   │
│                                    │
│  [ ] Remember me                   │
│                                    │
│  [       Sign In         ]         │
│                                    │
│  Don't have an account?            │
│  Sign up                           │
│                                    │
└────────────────────────────────────┘
```

**Implementation:**
```tsx
// app/(auth)/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    try {
      await signIn({
        email: formData.email,
        password: formData.password,
      })

      toast({
        title: 'Welcome back!',
        variant: 'success',
      })

      router.push('/dashboard')
    } catch (error: any) {
      toast({
        title: 'Sign in failed',
        description: 'Invalid email or password',
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">🎯 Todo App</CardTitle>
          <CardDescription>Welcome back!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
```

---

### 4. Dashboard Page (`/dashboard`)

**File:** `app/dashboard/page.tsx`

**Purpose:** Main application interface (protected)

**Layout:**
```
┌────────────────────────────────────────────────┐
│  🎯 My Tasks              John Doe ▼          │
├────────────────────────────────────────────────┤
│                                                 │
│  [All (5)] [Pending (3)] [Completed (2)]       │
│                                                 │
│  ┌──────────────────────────────────────────┐ │
│  │  Create New Task                         │ │
│  │                                          │ │
│  │  Title: [_________________________]     │ │
│  │  Description: [__________________]      │ │
│  │                                          │ │
│  │  [Create Task]                           │ │
│  └──────────────────────────────────────────┘ │
│                                                 │
│  ┌──────────────────────────────────────────┐ │
│  │ ☐ Buy groceries              [✎] [🗑]   │ │
│  │   Milk, eggs, bread                      │ │
│  │   Created: Dec 9, 2025                   │ │
│  └──────────────────────────────────────────┘ │
│                                                 │
│  ┌──────────────────────────────────────────┐ │
│  │ ☑ Call dentist               [✎] [🗑]   │ │
│  │   Schedule cleaning                      │ │
│  │   Created: Dec 8, 2025                   │ │
│  └──────────────────────────────────────────┘ │
│                                                 │
│  Showing 2 of 5 tasks                          │
│                                                 │
└────────────────────────────────────────────────┘
```

**Implementation:**
```tsx
// app/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSession } from '@/lib/auth-client'
import { api } from '@/lib/api'
import Header from '@/components/Header'
import TaskList from '@/components/TaskList'
import CreateTaskForm from '@/components/CreateTaskForm'
import TaskFilter from '@/components/TaskFilter'
import { Task } from '@/types/task'
import { useToast } from '@/components/ui/use-toast'

export default function DashboardPage() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')

  const userId = session?.user?.id

  // Fetch tasks
  useEffect(() => {
    if (!userId) return

    const fetchTasks = async () => {
      setLoading(true)
      try {
        const data = await api.getTasks(userId, filter)
        setTasks(data.tasks)
      } catch (error) {
        toast({
          title: 'Failed to load tasks',
          description: 'Please try again',
          variant: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [userId, filter])

  // Create task
  const handleCreate = async (title: string, description?: string) => {
    if (!userId) return

    try {
      const newTask = await api.createTask(userId, title, description)
      setTasks([newTask, ...tasks])
      toast({
        title: 'Task created!',
        variant: 'success',
      })
    } catch (error) {
      toast({
        title: 'Failed to create task',
        variant: 'error',
      })
      throw error
    }
  }

  // Toggle completion
  const handleToggle = async (taskId: number) => {
    if (!userId) return

    // Optimistic update
    setTasks(tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ))

    try {
      const updated = await api.toggleTask(userId, taskId)
      setTasks(tasks.map(t => t.id === taskId ? updated : t))
    } catch (error) {
      // Revert on error
      setTasks(tasks.map(t =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ))
      toast({
        title: 'Failed to update task',
        variant: 'error',
      })
    }
  }

  // Update task
  const handleUpdate = async (taskId: number, data: Partial<Task>) => {
    if (!userId) return

    try {
      const updated = await api.updateTask(userId, taskId, data)
      setTasks(tasks.map(t => t.id === taskId ? updated : t))
      toast({
        title: 'Task updated!',
        variant: 'success',
      })
    } catch (error) {
      toast({
        title: 'Failed to update task',
        variant: 'error',
      })
    }
  }

  // Delete task
  const handleDelete = async (taskId: number) => {
    if (!userId) return

    try {
      await api.deleteTask(userId, taskId)
      setTasks(tasks.filter(t => t.id !== taskId))
      toast({
        title: 'Task deleted',
        variant: 'success',
      })
    } catch (error) {
      toast({
        title: 'Failed to delete task',
        variant: 'error',
      })
    }
  }

  const counts = {
    total: tasks.length,
    pending: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={session?.user} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">My Tasks</h2>
            <TaskFilter
              status={filter}
              onStatusChange={setFilter}
              counts={counts}
            />
          </div>

          <CreateTaskForm onSubmit={handleCreate} />

          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            loading={loading}
          />

          {!loading && tasks.length > 0 && (
            <p className="text-sm text-muted-foreground text-center">
              Showing {tasks.length} of {counts.total} tasks
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
```

**Protected Route:**
```tsx
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
    return <div className="min-h-screen flex items-center justify-center">
      <p>Loading...</p>
    </div>
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}
```

---

## 🗂️ File Structure

```
app/
├── layout.tsx                 # Root layout
├── page.tsx                   # Landing page
├── (auth)/                    # Auth route group
│   ├── login/
│   │   └── page.tsx          # Login page
│   └── signup/
│       └── page.tsx          # Signup page
├── dashboard/                 # Protected routes
│   ├── layout.tsx            # Dashboard layout (auth check)
│   └── page.tsx              # Dashboard page
└── api/                       # API routes
    └── auth/
        └── [...all]/
            └── route.ts      # Better Auth handler
```

---

## 🎨 Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Single column, full width, bottom sheet modals |
| Tablet | 640px - 1024px | Single column, max-width container |
| Desktop | > 1024px | Max-width container, optional sidebar |

**Mobile Optimizations:**
- Larger touch targets (48x48px)
- Bottom sheet for forms
- Simplified header
- Stack filters vertically

---

## 📋 Acceptance Criteria

### Landing Page
- [ ] Hero section visible
- [ ] CTA buttons link to signup/login
- [ ] Features section displays
- [ ] Responsive on all devices
- [ ] Links work correctly

### Signup Page
- [ ] Form renders correctly
- [ ] Validation works (email, password)
- [ ] Error messages show for invalid input
- [ ] Success redirects to dashboard
- [ ] Link to login works

### Login Page
- [ ] Form renders correctly
- [ ] Credentials validated
- [ ] Error shown for invalid credentials
- [ ] Success redirects to dashboard
- [ ] Link to signup works

### Dashboard Page
- [ ] Only accessible when authenticated
- [ ] Redirects to login if not authenticated
- [ ] Tasks load on mount
- [ ] Create form works
- [ ] Filter buttons work
- [ ] Task actions work (toggle, edit, delete)
- [ ] Loading states shown
- [ ] Error messages displayed

### Layout & Navigation
- [ ] Header shows on all pages
- [ ] User menu works
- [ ] Sign out works
- [ ] Routing works correctly
- [ ] Back/forward navigation works

---

**UI Pages Version:** 1.0
**Last Updated:** December 9, 2025
**Status:** ✅ Ready for Implementation
