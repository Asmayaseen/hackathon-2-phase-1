# Toast Notifications System Specification

**Feature Type:** UX Enhancement
**Priority:** Medium
**Phase:** II Enhancement
**Status:** Draft

---

## Overview

Implement a comprehensive toast notification system to provide immediate, non-intrusive feedback for user actions. Toast notifications improve UX by confirming actions, displaying errors, and showing important messages without disrupting workflow.

---

## User Stories

### US-1: Action Confirmation
**As a** user
**I want to** receive confirmation when I perform an action
**So that** I know my action was successful

### US-2: Error Feedback
**As a** user
**I want to** see clear error messages when something goes wrong
**So that** I understand what happened and can fix it

### US-3: Non-Intrusive Notifications
**As a** user
**I want to** receive notifications that don't interrupt my workflow
**So that** I can continue working while being informed

### US-4: Auto-Dismissal
**As a** user
**I want to** notifications to disappear automatically
**So that** I don't have to manually close them

---

## Toast Types & Design

### 1. Success Toast

**Use Cases:**
- Task created
- Task updated
- Task completed
- Task deleted
- Tasks exported
- Bulk operations completed

**Visual Design:**
```
┌──────────────────────────────────────┐
│ ✓  Task created successfully         │
└──────────────────────────────────────┘
```

**Styling:**
```css
Background: bg-green-50 dark:bg-green-900/20
Border: border-l-4 border-green-500
Text: text-green-800 dark:text-green-200
Icon: ✓ (checkmark) text-green-600
```

**Example Messages:**
- "✓ Task created successfully"
- "✓ Task marked as complete"
- "✓ Task updated"
- "✓ Task deleted"
- "✓ 5 tasks completed"
- "✓ Tasks exported as CSV"

---

### 2. Error Toast

**Use Cases:**
- API request failed
- Validation error
- Network error
- Authorization error
- Unexpected error

**Visual Design:**
```
┌──────────────────────────────────────┐
│ ✕  Failed to create task             │
└──────────────────────────────────────┘
```

**Styling:**
```css
Background: bg-red-50 dark:bg-red-900/20
Border: border-l-4 border-red-500
Text: text-red-800 dark:text-red-200
Icon: ✕ (x-mark) text-red-600
```

**Example Messages:**
- "✕ Failed to create task"
- "✕ Network error. Please try again."
- "✕ You don't have permission to do this"
- "✕ Title is required"
- "✕ Something went wrong"

---

### 3. Warning Toast

**Use Cases:**
- Destructive action confirmation
- Important information
- Deprecated feature usage
- Rate limiting warning

**Visual Design:**
```
┌──────────────────────────────────────┐
│ ⚠  This action cannot be undone      │
└──────────────────────────────────────┘
```

**Styling:**
```css
Background: bg-amber-50 dark:bg-amber-900/20
Border: border-l-4 border-amber-500
Text: text-amber-800 dark:text-amber-200
Icon: ⚠ (warning) text-amber-600
```

**Example Messages:**
- "⚠ This action cannot be undone"
- "⚠ You're approaching the task limit"
- "⚠ Unsaved changes will be lost"

---

### 4. Info Toast

**Use Cases:**
- General information
- Tips and hints
- Feature announcements
- Changelog notifications

**Visual Design:**
```
┌──────────────────────────────────────┐
│ ℹ  Press ? to see keyboard shortcuts │
└──────────────────────────────────────┘
```

**Styling:**
```css
Background: bg-blue-50 dark:bg-blue-900/20
Border: border-l-4 border-blue-500
Text: text-blue-800 dark:text-blue-200
Icon: ℹ (info) text-blue-600
```

**Example Messages:**
- "ℹ Press ? to see keyboard shortcuts"
- "ℹ New feature: Task priorities!"
- "ℹ Tip: Use Ctrl+N to create tasks quickly"

---

## Toast Positioning

### Layout Options

**Option 1: Top Right (Recommended)**
```
┌─────────────────────────────────────┐
│                          [Toast 1]  │
│                          [Toast 2]  │
│                          [Toast 3]  │
│                                     │
│           Page Content              │
│                                     │
└─────────────────────────────────────┘
```

**Option 2: Bottom Right**
```
┌─────────────────────────────────────┐
│           Page Content              │
│                                     │
│                          [Toast 1]  │
│                          [Toast 2]  │
│                          [Toast 3]  │
└─────────────────────────────────────┘
```

**Option 3: Top Center**
```
┌─────────────────────────────────────┐
│              [Toast 1]              │
│              [Toast 2]              │
│                                     │
│           Page Content              │
│                                     │
└─────────────────────────────────────┘
```

**Recommended:** Top Right
- Doesn't block main content
- Common pattern users expect
- Good for dashboard layouts

---

## Toast Behavior

### Auto-Dismiss Timing

```typescript
const TOAST_DURATION = {
  success: 3000,    // 3 seconds
  error: 5000,      // 5 seconds (longer to read)
  warning: 4000,    // 4 seconds
  info: 4000,       // 4 seconds
}
```

### Manual Dismiss

- Close button (×) in top-right corner
- Click anywhere on toast to dismiss
- Swipe gesture on mobile (future)

### Stacking

**Multiple Toasts:**
- Stack vertically (max 3 visible)
- Newest appears at top
- Oldest auto-dismiss first
- Slide down animation when new toast appears
- Smooth height transition when toast dismissed

### Pause on Hover

```typescript
// Pause auto-dismiss timer when user hovers
onMouseEnter={() => pauseTimer()}
onMouseLeave={() => resumeTimer()}
```

---

## Animation System

### Entry Animation

**Slide In from Right:**
```css
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-enter {
  animation: slideInRight 0.3s ease-out;
}
```

### Exit Animation

**Slide Out to Right:**
```css
@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.toast-exit {
  animation: slideOutRight 0.3s ease-in;
}
```

### Progress Bar Animation

```
┌──────────────────────────────────────┐
│ ✓  Task created successfully         │
│ [████████████░░░░░░░░░░░░░░░░░░░░]   │
└──────────────────────────────────────┘
```

**Progress bar:**
- Shows time remaining before auto-dismiss
- Animates from full to empty
- Pauses on hover
- Color matches toast type

---

## Implementation

### Toast Context & Provider

**File:** `frontend/components/ToastProvider.tsx`

```typescript
"use client"

import { createContext, useContext, useState, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  showToast: (type: ToastType, message: string, duration?: number) => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((
    type: ToastType,
    message: string,
    duration?: number
  ) => {
    const id = Math.random().toString(36).substring(2, 9)

    const toast: Toast = {
      id,
      type,
      message,
      duration: duration || (type === 'error' ? 5000 : 3000),
    }

    setToasts((prev) => [...prev, toast])

    // Auto-dismiss
    setTimeout(() => {
      dismissToast(id)
    }, toast.duration)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
```

### Toast Component

**File:** `frontend/components/Toast.tsx`

```typescript
"use client"

import { useEffect, useState } from 'react'
import type { Toast as ToastType } from './ToastProvider'

interface ToastProps {
  toast: ToastType
  onDismiss: (id: string) => void
}

const icons = {
  success: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
}

const styles = {
  success: 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200',
  error: 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200',
  warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 text-amber-800 dark:text-amber-200',
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-200',
}

export default function Toast({ toast, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(100)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (isPaused || !toast.duration) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (toast.duration! / 100))
        return newProgress <= 0 ? 0 : newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPaused, toast.duration])

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => onDismiss(toast.id), 300) // Wait for exit animation
  }

  return (
    <div
      className={`
        ${isVisible ? 'animate-slide-in-right' : 'animate-slide-out-right'}
        max-w-sm w-full bg-card border-l-4 ${styles[toast.type]}
        rounded-lg shadow-lg pointer-events-auto overflow-hidden
      `}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {icons[toast.type]}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">
              {toast.message}
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="ml-4 flex-shrink-0 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-black/10 dark:bg-white/10">
        <div
          className="h-full bg-current transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
```

### Toast Container

**File:** `frontend/components/ToastContainer.tsx`

```typescript
"use client"

import Toast from './Toast'
import type { Toast as ToastType } from './ToastProvider'

interface ToastContainerProps {
  toasts: ToastType[]
  onDismiss: (id: string) => void
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.slice(-3).map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
```

---

## Usage Examples

### In Components

```typescript
import { useToast } from '@/components/ToastProvider'

function TaskForm() {
  const { showToast } = useToast()

  const handleSubmit = async () => {
    try {
      await api.createTask(userId, { title, description })
      showToast('success', 'Task created successfully')
    } catch (error) {
      showToast('error', 'Failed to create task')
    }
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

### Common Use Cases

```typescript
// Task created
showToast('success', 'Task created successfully')

// Task updated
showToast('success', 'Task updated')

// Task deleted
showToast('success', 'Task deleted')

// Task completed
showToast('success', 'Task marked as complete')

// Bulk operation
showToast('success', `${count} tasks completed`)

// Error
showToast('error', 'Failed to create task')

// Network error
showToast('error', 'Network error. Please try again.')

// Validation error
showToast('error', 'Title is required')

// Warning
showToast('warning', 'This action cannot be undone')

// Info
showToast('info', 'Press ? to see keyboard shortcuts')

// Custom duration (10 seconds)
showToast('info', 'Important message', 10000)
```

---

## Accessibility

### ARIA Attributes

```tsx
<div
  role="alert"
  aria-live="polite"
  aria-atomic="true"
>
  {message}
</div>
```

### Screen Reader Announcements

- Success: "Success: Task created successfully"
- Error: "Error: Failed to create task"
- Warning: "Warning: This action cannot be undone"
- Info: "Information: Press question mark to see keyboard shortcuts"

### Keyboard Support

- Focus management: Don't steal focus from current element
- Dismiss: Escape key closes all toasts
- Interactive toasts: Tab to action buttons

---

## Acceptance Criteria

### AC-1: Toast Display
- [ ] Toasts appear in correct position (top-right)
- [ ] Toasts have correct styling based on type
- [ ] Icons display correctly for each type
- [ ] Messages are readable and clear
- [ ] Close button is visible and functional

### AC-2: Toast Behavior
- [ ] Auto-dismiss after specified duration
- [ ] Manual dismiss via close button works
- [ ] Progress bar animates correctly
- [ ] Pause on hover works
- [ ] Resume on mouse leave works

### AC-3: Animations
- [ ] Entry animation is smooth (slide in)
- [ ] Exit animation is smooth (slide out)
- [ ] Multiple toasts stack correctly
- [ ] No layout shifts when toasts appear/disappear

### AC-4: Stacking
- [ ] Maximum 3 toasts visible at once
- [ ] Newest toast appears at top
- [ ] Oldest toast auto-dismisses first
- [ ] Smooth transitions when toasts added/removed

### AC-5: Integration
- [ ] Toast provider wraps app correctly
- [ ] useToast hook works in all components
- [ ] Toasts display on all pages
- [ ] Dark mode styling works correctly

### AC-6: Accessibility
- [ ] ARIA labels present
- [ ] Screen reader announces toasts
- [ ] Keyboard dismiss works (Escape)
- [ ] No focus stealing
- [ ] Sufficient color contrast

---

## Testing Scenarios

1. **Single Toast**: Create a task → Success toast appears → Auto-dismisses
2. **Multiple Toasts**: Perform 5 actions quickly → Max 3 toasts visible
3. **Error Toast**: Trigger error → Red error toast appears → Stays longer
4. **Hover Pause**: Hover toast → Progress pauses → Move away → Resumes
5. **Manual Dismiss**: Click X button → Toast dismisses immediately
6. **Dark Mode**: Toggle dark mode → Toast colors adapt correctly
7. **Mobile**: Test on mobile → Toasts are readable and dismissable

---

## Future Enhancements

- Toast actions (Undo, View Details)
- Persistent toasts (don't auto-dismiss)
- Toast queue management (rate limiting)
- Custom toast components
- Sound effects (optional)
- Haptic feedback on mobile
- Toast history/log

---

*Specification complete. Ready for implementation.*
