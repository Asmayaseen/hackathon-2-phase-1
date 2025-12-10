# Next.js Development Skill

> **Category:** Frontend Development
> **Technology:** Next.js 16+ (App Router)
> **Phase:** II - Full-Stack Web Application

---

## 📋 Overview

This skill enables building modern React applications with Next.js 16+ App Router, including Server Components, Client Components, routing, and data fetching.

---

## 🎯 Core Capabilities

### 1. App Router Structure
```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Home page
├── (auth)/                 # Route group
│   ├── login/page.tsx
│   └── signup/page.tsx
└── dashboard/
    ├── layout.tsx          # Dashboard layout
    └── page.tsx            # Dashboard page
```

### 2. Server Components (Default)
```tsx
// app/page.tsx
export default function HomePage() {
  // Runs on server
  // Can directly access database, environment variables
  return (
    <div>
      <h1>Welcome</h1>
      <ClientButton />
    </div>
  )
}
```

### 3. Client Components
```tsx
// components/TaskItem.tsx
'use client'  // Required for hooks, state, events

import { useState } from 'react'

export default function TaskItem() {
  const [completed, setCompleted] = useState(false)

  return (
    <div onClick={() => setCompleted(!completed)}>
      {completed ? '✓' : '☐'} Task
    </div>
  )
}
```

### 4. Dynamic Routes
```tsx
// app/dashboard/[taskId]/page.tsx
export default function TaskDetailPage({ params }: { params: { taskId: string } }) {
  return <div>Task ID: {params.taskId}</div>
}
```

### 5. Layouts
```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
```

### 6. Protected Routes
```tsx
// app/dashboard/layout.tsx
'use client'

import { useSession } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({ children }: { children: React.NodeNode }) {
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

### 7. Data Fetching (Server Component)
```tsx
// app/dashboard/page.tsx
async function getTasks(userId: string) {
  const res = await fetch(`${API_URL}/api/${userId}/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.json()
}

export default async function DashboardPage() {
  const tasks = await getTasks(userId)

  return <TaskList tasks={tasks} />
}
```

### 8. Data Fetching (Client Component)
```tsx
// app/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/${userId}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data.tasks))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>
  return <TaskList tasks={tasks} />
}
```

---

## 📊 Best Practices

### ✅ DO

**Use Server Components by default:**
```tsx
// app/page.tsx (no 'use client')
export default function HomePage() {
  return <div>Server Component</div>
}
```

**Add 'use client' only when needed:**
```tsx
// components/Counter.tsx
'use client'  // Only when using hooks/state/events

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

**Type your component props:**
```tsx
interface TaskItemProps {
  task: Task
  onToggle: (id: number) => void
}

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  return <div>...</div>
}
```

**Use TypeScript everywhere:**
```tsx
import { Task } from '@/types/task'

const [tasks, setTasks] = useState<Task[]>([])
```

### ❌ DON'T

**Don't use 'use client' unnecessarily:**
```tsx
// ❌ Bad
'use client'

export default function StaticPage() {
  return <div>No state, no events - doesn't need 'use client'</div>
}

// ✅ Good
export default function StaticPage() {
  return <div>Server Component</div>
}
```

**Don't forget loading states:**
```tsx
// ❌ Bad
const [tasks, setTasks] = useState([])
return <TaskList tasks={tasks} />  // Empty while loading

// ✅ Good
const [tasks, setTasks] = useState([])
const [loading, setLoading] = useState(true)

if (loading) return <LoadingSkeleton />
return <TaskList tasks={tasks} />
```

---

## 🔐 Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000  # Client-side
DATABASE_URL=postgresql://...              # Server-side only
```

**Usage:**
```tsx
// Client Component
const apiUrl = process.env.NEXT_PUBLIC_API_URL

// Server Component
const dbUrl = process.env.DATABASE_URL  // Not exposed to client
```

---

## 🧪 Key Patterns

### Form Handling
```tsx
'use client'

export default function CreateTaskForm() {
  const [title, setTitle] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title })
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  )
}
```

### Optimistic Updates
```tsx
const handleToggle = async (id: number) => {
  // Optimistically update UI
  setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))

  try {
    await api.toggleTask(id)
  } catch (err) {
    // Revert on error
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }
}
```

---

**Skill Level:** Intermediate
**Prerequisites:** React, TypeScript, HTML/CSS
**Used by:** Frontend-Developer agent
