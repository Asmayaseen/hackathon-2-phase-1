# UI Components Specification

> **Phase:** II - Full-Stack Web Application
> **Component:** Frontend UI Components
> **Technology:** React + TypeScript + Tailwind CSS + shadcn/ui

---

## 📋 Overview

This specification defines all reusable UI components for the Evolution of Todo application, including their props, states, styling, and behavior.

---

## 🎨 Design System

### Color Palette

```css
/* CSS Variables (globals.css) */
:root {
  --background: 0 0% 100%;           /* #ffffff */
  --foreground: 240 10% 3.9%;        /* #09090b */
  --primary: 240 5.9% 10%;           /* #18181b */
  --primary-foreground: 0 0% 98%;    /* #fafafa */
  --secondary: 240 4.8% 95.9%;       /* #f4f4f5 */
  --secondary-foreground: 240 5.9% 10%; /* #18181b */
  --muted: 240 4.8% 95.9%;           /* #f4f4f5 */
  --muted-foreground: 240 3.8% 46.1%; /* #71717a */
  --accent: 240 4.8% 95.9%;          /* #f4f4f5 */
  --destructive: 0 84.2% 60.2%;      /* #ef4444 */
  --border: 240 5.9% 90%;            /* #e4e4e7 */
  --input: 240 5.9% 90%;             /* #e4e4e7 */
  --ring: 240 5.9% 10%;              /* #18181b */
  --radius: 0.5rem;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --muted: 240 3.7% 15.9%;
  --accent: 240 3.7% 15.9%;
  --border: 240 3.7% 15.9%;
}
```

### Typography

```css
/* Font Family */
font-family: var(--font-geist-sans), system-ui, sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing

```css
/* Tailwind spacing scale */
p-1: 0.25rem (4px)
p-2: 0.5rem (8px)
p-3: 0.75rem (12px)
p-4: 1rem (16px)
p-6: 1.5rem (24px)
p-8: 2rem (32px)

gap-2, gap-4, etc. (same scale)
```

---

## 🧩 Component Library

### 1. Button Component

**Location:** `components/ui/button.tsx`

**Variants:**
- `default` - Primary action button
- `secondary` - Secondary action
- `outline` - Outlined button
- `ghost` - Transparent button
- `destructive` - Delete/danger actions

**Sizes:**
- `sm` - Small (32px height)
- `default` - Normal (40px height)
- `lg` - Large (48px height)
- `icon` - Square icon button (40x40px)

**Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'default' | 'lg' | 'icon'
  asChild?: boolean
  loading?: boolean
}
```

**Examples:**
```tsx
// Primary button
<Button>Create Task</Button>

// Loading state
<Button loading disabled>
  Creating...
</Button>

// Destructive action
<Button variant="destructive" size="sm">
  Delete
</Button>

// Icon button
<Button variant="ghost" size="icon">
  <Trash2 className="h-4 w-4" />
</Button>
```

**Styling:**
```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
  }
)
```

---

### 2. Input Component

**Location:** `components/ui/input.tsx`

**Props:**
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}
```

**Examples:**
```tsx
// Basic input
<Input placeholder="Enter task title" />

// With label
<Input label="Email" type="email" />

// With error
<Input
  error="Title is required"
  placeholder="Task title"
/>

// Disabled
<Input disabled value="Cannot edit" />
```

**Styling:**
```tsx
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
```

---

### 3. Textarea Component

**Location:** `components/ui/textarea.tsx`

**Props:**
```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
  maxLength?: number
  showCount?: boolean
}
```

**Examples:**
```tsx
// Basic textarea
<Textarea placeholder="Task description" />

// With character count
<Textarea
  maxLength={1000}
  showCount
  placeholder="Description"
/>

// With error
<Textarea error="Description too long" />
```

---

### 4. Checkbox Component

**Location:** `components/ui/checkbox.tsx`

**Props:**
```typescript
interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  id?: string
  label?: string
}
```

**Examples:**
```tsx
// Basic checkbox
<Checkbox checked={completed} onCheckedChange={setCompleted} />

// With label
<Checkbox
  id="terms"
  label="I agree to the terms"
  checked={agreed}
  onCheckedChange={setAgreed}
/>

// Disabled
<Checkbox checked disabled />
```

**Styling:**
```tsx
<button
  className={cn(
    "peer h-5 w-5 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
  )}
>
  {checked && <CheckIcon className="h-4 w-4" />}
</button>
```

---

### 5. Card Component

**Location:** `components/ui/card.tsx`

**Sub-components:**
- `Card` - Container
- `CardHeader` - Top section
- `CardTitle` - Title text
- `CardDescription` - Subtitle text
- `CardContent` - Main content
- `CardFooter` - Bottom section

**Examples:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Create Task</CardTitle>
    <CardDescription>Add a new task to your list</CardDescription>
  </CardHeader>
  <CardContent>
    <form>...</form>
  </CardContent>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

---

### 6. Dialog Component

**Location:** `components/ui/dialog.tsx`

**Sub-components:**
- `Dialog` - Root component
- `DialogTrigger` - Opens dialog
- `DialogContent` - Modal content
- `DialogHeader` - Header section
- `DialogTitle` - Title
- `DialogDescription` - Description
- `DialogFooter` - Footer section
- `DialogClose` - Close button

**Examples:**
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogDescription>
        Make changes to your task here
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <Input label="Title" defaultValue={task.title} />
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### 7. Alert Dialog Component

**Location:** `components/ui/alert-dialog.tsx`

**Purpose:** Confirmation dialogs (e.g., delete confirmation)

**Examples:**
```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete your task.
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

### 8. Toast Component

**Location:** `components/ui/toast.tsx`

**Purpose:** Success/error notifications

**Variants:**
- `default` - Neutral message
- `success` - Success message
- `error` - Error message
- `warning` - Warning message

**Usage:**
```tsx
import { useToast } from "@/components/ui/use-toast"

function MyComponent() {
  const { toast } = useToast()

  const handleSuccess = () => {
    toast({
      title: "Task created!",
      description: "Your task has been added successfully.",
      variant: "success",
    })
  }

  const handleError = () => {
    toast({
      title: "Error",
      description: "Failed to create task. Please try again.",
      variant: "error",
    })
  }
}
```

---

### 9. Skeleton Component

**Location:** `components/ui/skeleton.tsx`

**Purpose:** Loading placeholders

**Examples:**
```tsx
// Task skeleton
<div className="space-y-4">
  <Skeleton className="h-20 w-full" />
  <Skeleton className="h-20 w-full" />
  <Skeleton className="h-20 w-full" />
</div>

// Custom skeleton
<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>
```

---

### 10. Dropdown Menu Component

**Location:** `components/ui/dropdown-menu.tsx`

**Purpose:** User menu, filters, sorting

**Examples:**
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      Filter <ChevronDown className="ml-2 h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => setFilter('all')}>
      All Tasks
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => setFilter('pending')}>
      Pending
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => setFilter('completed')}>
      Completed
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## 🎯 Application-Specific Components

### 11. TaskList Component

**Location:** `components/TaskList.tsx`

**Props:**
```typescript
interface TaskListProps {
  tasks: Task[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, data: Partial<Task>) => void
  loading?: boolean
}
```

**Implementation:**
```tsx
export default function TaskList({ tasks, onToggle, onDelete, onUpdate, loading }: TaskListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full" />)}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No tasks yet</p>
        <p className="text-sm text-muted-foreground mt-2">
          Create your first task to get started!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => (
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

---

### 12. TaskItem Component

**Location:** `components/TaskItem.tsx`

**Props:**
```typescript
interface TaskItemProps {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, data: Partial<Task>) => void
}
```

**Visual States:**
- Default (pending task)
- Completed (strikethrough, muted)
- Editing (expanded form)
- Loading (disabled, spinner)

**Implementation:**
```tsx
export default function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    setLoading(true)
    await onToggle(task.id)
    setLoading(false)
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggle}
            disabled={loading}
            className="mt-1"
          />

          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-medium text-base",
              task.completed && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>

            {task.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {task.description}
              </p>
            )}

            <p className="text-xs text-muted-foreground mt-2">
              Created {formatDate(task.created_at)}
            </p>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete "{task.title}".
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(task.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

---

### 13. CreateTaskForm Component

**Location:** `components/CreateTaskForm.tsx`

**Props:**
```typescript
interface CreateTaskFormProps {
  onSubmit: (title: string, description?: string) => Promise<void>
}
```

**Implementation:**
```tsx
export default function CreateTaskForm({ onSubmit }: CreateTaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate
    const newErrors: Record<string, string> = {}
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    } else if (title.length > 200) {
      newErrors.title = 'Title must be 200 characters or less'
    }
    if (description.length > 1000) {
      newErrors.description = 'Description must be 1000 characters or less'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await onSubmit(title.trim(), description.trim() || undefined)
      setTitle('')
      setDescription('')
      setErrors({})
    } catch (err) {
      setErrors({ submit: 'Failed to create task' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            placeholder="Task title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            error={errors.title}
            maxLength={200}
            required
          />

          <Textarea
            label="Description (optional)"
            placeholder="Add more details..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            error={errors.description}
            maxLength={1000}
            rows={3}
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Create Task'}
          </Button>

          {errors.submit && (
            <p className="text-sm text-destructive">{errors.submit}</p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
```

---

### 14. TaskFilter Component

**Location:** `components/TaskFilter.tsx`

**Props:**
```typescript
interface TaskFilterProps {
  status: 'all' | 'pending' | 'completed'
  onStatusChange: (status: 'all' | 'pending' | 'completed') => void
  counts: {
    total: number
    pending: number
    completed: number
  }
}
```

**Implementation:**
```tsx
export default function TaskFilter({ status, onStatusChange, counts }: TaskFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant={status === 'all' ? 'default' : 'outline'}
        onClick={() => onStatusChange('all')}
        size="sm"
      >
        All ({counts.total})
      </Button>

      <Button
        variant={status === 'pending' ? 'default' : 'outline'}
        onClick={() => onStatusChange('pending')}
        size="sm"
      >
        Pending ({counts.pending})
      </Button>

      <Button
        variant={status === 'completed' ? 'default' : 'outline'}
        onClick={() => onStatusChange('completed')}
        size="sm"
      >
        Completed ({counts.completed})
      </Button>
    </div>
  )
}
```

---

### 15. Header Component

**Location:** `components/Header.tsx`

**Props:**
```typescript
interface HeaderProps {
  user?: {
    name: string
    email: string
  }
}
```

**Implementation:**
```tsx
export default function Header({ user }: HeaderProps) {
  const { signOut } = useAuth()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">🎯 Todo App</h1>
        </div>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                {user.name} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
```

---

## 📋 Acceptance Criteria

### shadcn/ui Components
- [ ] All shadcn/ui primitives installed
- [ ] Components match design system
- [ ] Dark mode variants work correctly
- [ ] Accessibility features implemented

### Custom Components
- [ ] TaskList renders tasks correctly
- [ ] TaskItem shows completion state
- [ ] CreateTaskForm validates input
- [ ] TaskFilter updates active filter
- [ ] Header shows user menu

### Styling
- [ ] Components use Tailwind classes
- [ ] Responsive on mobile/tablet/desktop
- [ ] Touch targets are 44x44px minimum
- [ ] Hover/focus states visible
- [ ] Loading states shown

### Accessibility
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible

---

**UI Components Version:** 1.0
**Last Updated:** December 9, 2025
**Status:** ✅ Ready for Implementation
