# Frontend Guidelines - Next.js

> **Phase:** II - Full-Stack Web Application
> **Component:** Frontend Web Application
> **Stack:** Next.js 16+ (App Router) + Tailwind CSS + Better Auth

---

## 🎯 Overview

This is the frontend web application for the Evolution of Todo project. It provides a modern, responsive user interface for managing tasks with user authentication.

---

## 🛠️ Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Next.js | 16+ (App Router) |
| Styling | Tailwind CSS | 3.4+ |
| Language | TypeScript | 5.0+ |
| Authentication | Better Auth | Latest |
| UI Components | shadcn/ui | Latest |
| State Management | React Hooks | Built-in |
| API Client | Fetch API | Built-in |

---

## 📁 Project Structure

```
frontend/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── (auth)/              # Auth group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── dashboard/           # Protected routes
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── api/                 # API routes (Better Auth)
│       └── auth/
│           └── [...all]/
│               └── route.ts
├── components/              # Reusable components
│   ├── ui/                  # shadcn/ui components
│   ├── TaskList.tsx
│   ├── TaskItem.tsx
│   ├── CreateTaskForm.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/                     # Utility functions
│   ├── api.ts               # API client
│   ├── auth.ts              # Better Auth configuration
│   └── utils.ts             # Helper functions
├── types/                   # TypeScript types
│   └── task.ts
├── public/                  # Static assets
│   └── images/
├── styles/                  # Global styles
│   └── globals.css
├── tailwind.config.ts       # Tailwind configuration
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies
├── .env.local.example       # Example environment variables
└── CLAUDE.md                # This file
```

---

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# OpenAI (for Phase III)
# NEXT_PUBLIC_OPENAI_API_KEY=sk-...
```

---

## 🎨 UI Design Principles

### Layout Structure

```
┌─────────────────────────────────────┐
│            Header                    │
│  [Logo]  [Nav]     [User Menu]     │
├─────────────────────────────────────┤
│                                     │
│         Main Content Area            │
│                                     │
│  ┌───────────────────────────┐     │
│  │   Task List               │     │
│  │  ┌─────────────────────┐  │     │
│  │  │ Task Item 1         │  │     │
│  │  ├─────────────────────┤  │     │
│  │  │ Task Item 2         │  │     │
│  │  └─────────────────────┘  │     │
│  │                            │     │
│  │  [+ Add New Task]         │     │
│  └───────────────────────────┘     │
│                                     │
├─────────────────────────────────────┤
│            Footer                    │
└─────────────────────────────────────┘
```

### Responsive Design

- **Mobile First:** Design for mobile, scale up
- **Breakpoints:** `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- **Touch Targets:** Minimum 44x44px for buttons
- **Typography:** Readable font sizes (16px+ for body text)

### Color Scheme

```css
/* Light Mode (Default) */
--background: #ffffff;
--foreground: #09090b;
--primary: #18181b;
--primary-foreground: #fafafa;
--secondary: #f4f4f5;
--border: #e4e4e7;

/* Dark Mode */
--background: #09090b;
--foreground: #fafafa;
--primary: #fafafa;
--primary-foreground: #18181b;
--secondary: #27272a;
--border: #27272a;
```

---

## 📦 Components

### Task List Component

```tsx
// components/TaskList.tsx
import { Task } from '@/types/task'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, data: Partial<Task>) => void
}

export default function TaskList({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No tasks yet. Create your first task!</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}
```

### Task Item Component

```tsx
// components/TaskItem.tsx
import { Task } from '@/types/task'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Trash2, Edit } from 'lucide-react'

interface TaskItemProps {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, data: Partial<Task>) => void
}

export default function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
      />

      <div className="flex-1">
        <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Created: {new Date(task.created_at).toLocaleDateString()}
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onUpdate(task.id, task)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
```

### Create Task Form

```tsx
// components/CreateTaskForm.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface CreateTaskFormProps {
  onSubmit: (title: string, description?: string) => Promise<void>
}

export default function CreateTaskForm({ onSubmit }: CreateTaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setLoading(true)
    try {
      await onSubmit(title, description)
      setTitle('')
      setDescription('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <Input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        maxLength={200}
      />
      <Textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={1000}
        rows={3}
      />
      <Button type="submit" disabled={loading || !title.trim()}>
        {loading ? 'Creating...' : 'Create Task'}
      </Button>
    </form>
  )
}
```

---

## 🔐 Authentication

### Better Auth Setup

```typescript
// lib/auth.ts
import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"

export const auth = betterAuth({
  database: {
    provider: "postgres",
    url: process.env.DATABASE_URL!,
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
})
```

### Auth Client (Client-Side)

```typescript
// lib/auth-client.ts
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
})

export const { signIn, signUp, signOut, useSession } = authClient
```

### Protected Route Pattern

```tsx
// app/dashboard/layout.tsx
import { redirect } from 'next/navigation'
import { useSession } from '@/lib/auth-client'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return <div>Loading...</div>
  }

  if (!session) {
    redirect('/login')
  }

  return <>{children}</>
}
```

---

## 🌐 API Client

### API Utility

```typescript
// lib/api.ts
import { authClient } from './auth-client'

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function getAuthHeaders(): Promise<HeadersInit> {
  const session = await authClient.getSession()
  if (!session?.token) {
    throw new Error('Not authenticated')
  }

  return {
    'Authorization': `Bearer ${session.token}`,
    'Content-Type': 'application/json',
  }
}

export const api = {
  // Get all tasks
  async getTasks(userId: string, status: 'all' | 'pending' | 'completed' = 'all') {
    const headers = await getAuthHeaders()
    const response = await fetch(
      `${API_URL}/api/${userId}/tasks?status=${status}`,
      { headers }
    )
    if (!response.ok) throw new Error('Failed to fetch tasks')
    return response.json()
  },

  // Create task
  async createTask(userId: string, title: string, description?: string) {
    const headers = await getAuthHeaders()
    const response = await fetch(`${API_URL}/api/${userId}/tasks`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ title, description }),
    })
    if (!response.ok) throw new Error('Failed to create task')
    return response.json()
  },

  // Update task
  async updateTask(userId: string, taskId: number, data: { title?: string; description?: string }) {
    const headers = await getAuthHeaders()
    const response = await fetch(`${API_URL}/api/${userId}/tasks/${taskId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to update task')
    return response.json()
  },

  // Delete task
  async deleteTask(userId: string, taskId: number) {
    const headers = await getAuthHeaders()
    const response = await fetch(`${API_URL}/api/${userId}/tasks/${taskId}`, {
      method: 'DELETE',
      headers,
    })
    if (!response.ok) throw new Error('Failed to delete task')
    return response.json()
  },

  // Toggle completion
  async toggleTask(userId: string, taskId: number) {
    const headers = await getAuthHeaders()
    const response = await fetch(`${API_URL}/api/${userId}/tasks/${taskId}/complete`, {
      method: 'PATCH',
      headers,
    })
    if (!response.ok) throw new Error('Failed to toggle task')
    return response.json()
  },
}
```

---

## 📝 TypeScript Types

```typescript
// types/task.ts
export interface Task {
  id: number
  user_id: string
  title: string
  description?: string
  completed: boolean
  created_at: string
  updated_at: string
}

export interface TaskCreate {
  title: string
  description?: string
}

export interface TaskUpdate {
  title?: string
  description?: string
}

export interface TaskListResponse {
  tasks: Task[]
  total: number
  completed: number
  pending: number
}
```

---

## 🎨 Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

---

## 🚀 Development Workflow

### Running the Dev Server

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Hot Reload

Next.js automatically reloads when you save files. Changes appear instantly in the browser.

---

## 📱 Responsive Patterns

### Mobile Navigation

```tsx
// components/MobileNav.tsx
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left">
        {/* Mobile menu content */}
      </SheetContent>
    </Sheet>
  )
}
```

### Grid Layouts

```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>
```

---

## 🐛 Common Issues

### Hydration Errors

**Problem:** "Text content does not match server-rendered HTML"

**Solution:**
- Use `'use client'` for components with client-side state
- Avoid `localStorage` or `window` in server components
- Use `useEffect` for client-only code

### Environment Variables Not Loading

**Problem:** `process.env.NEXT_PUBLIC_API_URL` is undefined

**Solution:**
- Ensure variable starts with `NEXT_PUBLIC_`
- Restart dev server after `.env.local` changes
- Check file is named `.env.local`, not `.env`

---

## 📚 References

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Better Auth:** https://www.better-auth.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **TypeScript:** https://www.typescriptlang.org/docs

---

**Remember:**
- Always reference specs before implementation (`@specs/ui/`)
- Use server components by default, client components only when needed
- Keep components small and focused (single responsibility)
- Test on mobile, tablet, and desktop
- Follow accessibility best practices (ARIA labels, keyboard navigation)

🚀 **Build with Next.js. Ship with Confidence.**
