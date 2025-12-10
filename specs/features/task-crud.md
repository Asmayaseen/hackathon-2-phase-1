# Task CRUD Feature Specification

> **Phase:** II - Full-Stack Web Application
> **Feature:** Task Management (CRUD Operations)
> **Priority:** Critical (Core Feature)

---

## 📋 Feature Overview

This specification defines the complete CRUD (Create, Read, Update, Delete) functionality for task management, including UI interactions, API calls, validation, and user feedback.

---

## 🎯 User Stories

### As a User, I want to:

1. **Create Tasks**
   - Add new tasks with title and optional description
   - See immediate feedback when task is created
   - Have form validation prevent invalid inputs

2. **View Tasks**
   - See all my tasks in a list
   - Filter tasks by status (all, pending, completed)
   - Sort tasks by creation date, title, or update time
   - See task details (title, description, status, dates)

3. **Update Tasks**
   - Edit task title and description
   - Mark tasks as complete or incomplete
   - See updated information immediately

4. **Delete Tasks**
   - Remove tasks I no longer need
   - Confirm deletion to prevent accidents
   - See confirmation when task is deleted

5. **User Experience**
   - See loading states during operations
   - Get clear error messages if something fails
   - Experience smooth, responsive interface
   - Have changes persist after page refresh

---

## 🎨 User Interface

### Task List View

```
┌────────────────────────────────────────────────────┐
│  🎯 My Tasks                          [Filter ▼]  │
├────────────────────────────────────────────────────┤
│                                                     │
│  ┌────────────────────────────────────────────┐   │
│  │ [+] Create New Task                         │   │
│  │                                              │   │
│  │ Title: [________________]                   │   │
│  │ Description: [________________________]     │   │
│  │                                              │   │
│  │              [Create Task]                   │   │
│  └────────────────────────────────────────────┘   │
│                                                     │
│  ┌────────────────────────────────────────────┐   │
│  │ ☐ Buy groceries                     [✎] [🗑] │
│  │   Milk, eggs, bread                         │   │
│  │   Created: Dec 9, 2025                      │   │
│  └────────────────────────────────────────────┘   │
│                                                     │
│  ┌────────────────────────────────────────────┐   │
│  │ ☑ Call dentist                      [✎] [🗑] │
│  │   Schedule cleaning appointment             │   │
│  │   Created: Dec 8, 2025                      │   │
│  └────────────────────────────────────────────┘   │
│                                                     │
│  Showing 2 of 2 tasks                              │
└────────────────────────────────────────────────────┘
```

### Mobile View

```
┌──────────────────────┐
│  🎯 My Tasks    [≡] │
├──────────────────────┤
│                      │
│  [+ New Task]        │
│                      │
│  ┌────────────────┐ │
│  │ ☐ Buy groceries│ │
│  │   Milk, eggs   │ │
│  │   Dec 9, 2025  │ │
│  │   [✎]    [🗑]  │ │
│  └────────────────┘ │
│                      │
│  ┌────────────────┐ │
│  │ ☑ Call dentist│ │
│  │   Schedule...  │ │
│  │   Dec 8, 2025  │ │
│  │   [✎]    [🗑]  │ │
│  └────────────────┘ │
└──────────────────────┘
```

---

## 🔄 Feature Flows

### 1. Create Task Flow

```
User fills form
       ↓
Clicks "Create Task" button
       ↓
Button shows loading state
       ↓
Frontend validates input
       ↓
Frontend calls API: POST /api/{user_id}/tasks
       ↓
Backend validates & saves to database
       ↓
Backend returns created task
       ↓
Frontend adds task to list (top)
       ↓
Frontend clears form
       ↓
Frontend shows success message
       ↓
User sees new task in list
```

**Success State:**
- Task appears at top of list
- Form is cleared
- Success toast: "Task created successfully!"
- Button returns to normal state

**Error States:**
- **Network Error:** "Failed to create task. Please try again."
- **Validation Error:** "Title is required" or "Title too long (max 200 characters)"
- **Auth Error:** Redirect to login page

### 2. View Tasks Flow

```
User navigates to dashboard
       ↓
Frontend shows loading skeleton
       ↓
Frontend calls API: GET /api/{user_id}/tasks
       ↓
Backend fetches tasks from database
       ↓
Backend returns task list + statistics
       ↓
Frontend renders tasks
       ↓
User sees task list
```

**Filter Flow:**
```
User selects filter (All/Pending/Completed)
       ↓
Frontend filters tasks locally
       ↓
OR
Frontend calls API with ?status=pending
       ↓
Backend filters in database
       ↓
Frontend updates display
```

**Sort Flow:**
```
User selects sort (Created/Title/Updated)
       ↓
Frontend sorts tasks locally
       ↓
OR
Frontend calls API with ?sort=title
       ↓
Backend sorts in database
       ↓
Frontend updates display
```

### 3. Update Task Flow

```
User clicks edit icon
       ↓
Form appears with current values
       ↓
User modifies title/description
       ↓
User clicks "Save"
       ↓
Button shows loading state
       ↓
Frontend validates input
       ↓
Frontend calls API: PUT /api/{user_id}/tasks/{id}
       ↓
Backend validates & updates database
       ↓
Backend returns updated task
       ↓
Frontend updates task in list
       ↓
Frontend hides form
       ↓
Frontend shows success message
       ↓
User sees updated task
```

**Edit Modes:**

**Inline Edit (Preferred):**
- Click edit icon
- Task expands to show edit fields
- Save/Cancel buttons appear
- Other tasks remain visible

**Modal Edit (Alternative):**
- Click edit icon
- Modal dialog opens
- Full form with current values
- Save/Cancel buttons
- Background dimmed

### 4. Toggle Completion Flow

```
User clicks checkbox
       ↓
Checkbox shows loading indicator
       ↓
Frontend calls API: PATCH /api/{user_id}/tasks/{id}/complete
       ↓
Backend toggles completed status
       ↓
Backend returns updated task
       ↓
Frontend updates task display
       ↓
Checkbox updated (checked/unchecked)
       ↓
Text style updated (strikethrough if completed)
```

**Visual States:**
- **Pending:** `☐` Empty checkbox, normal text
- **Completed:** `☑` Checked checkbox, ~~strikethrough text~~, muted color
- **Loading:** Spinner inside checkbox

### 5. Delete Task Flow

```
User clicks delete icon
       ↓
Confirmation dialog appears
       ↓
"Are you sure you want to delete this task?"
       ↓
User clicks "Delete" or "Cancel"
       ↓
If Cancel: Dialog closes
       ↓
If Delete:
  ↓
  Frontend calls API: DELETE /api/{user_id}/tasks/{id}
  ↓
  Backend deletes from database
  ↓
  Backend confirms deletion
  ↓
  Frontend removes task from list (with animation)
  ↓
  Frontend shows success message
  ↓
  User sees task removed
```

**Confirmation Dialog:**
```
┌────────────────────────────────────┐
│  Delete Task?                      │
├────────────────────────────────────┤
│                                    │
│  Are you sure you want to delete:  │
│  "Buy groceries"?                  │
│                                    │
│  This action cannot be undone.     │
│                                    │
│      [Cancel]     [Delete]         │
└────────────────────────────────────┘
```

---

## 📊 Data Validation

### Frontend Validation (Immediate Feedback)

**Title Field:**
```typescript
// Real-time validation
const validateTitle = (title: string): string | null => {
  if (!title.trim()) {
    return "Title is required"
  }
  if (title.length > 200) {
    return "Title must be 200 characters or less"
  }
  return null // Valid
}
```

**Description Field:**
```typescript
const validateDescription = (description: string): string | null => {
  if (description.length > 1000) {
    return "Description must be 1000 characters or less"
  }
  return null // Valid
}
```

**Form State:**
- Show error message below field
- Disable submit button if validation fails
- Show character count for title/description
- Trim whitespace on blur

### Backend Validation (Security)

**Pydantic Schema:**
```python
from pydantic import BaseModel, Field, validator

class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str | None = Field(None, max_length=1000)

    @validator('title')
    def title_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Title cannot be empty or whitespace only')
        return v.strip()

    @validator('description')
    def description_sanitize(cls, v):
        if v is not None:
            v = v.strip()
            return v if v else None
        return v
```

---

## 🎨 UI Components

### TaskList Component

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

**States:**
- `loading` - Show skeleton loaders
- `empty` - Show "No tasks" message
- `error` - Show error message with retry button
- `default` - Show task list

### TaskItem Component

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
- Default (pending)
- Completed (strikethrough, muted)
- Editing (expanded form)
- Loading (spinner on checkbox/buttons)
- Error (shake animation, error message)

### CreateTaskForm Component

**Props:**
```typescript
interface CreateTaskFormProps {
  onSubmit: (title: string, description?: string) => Promise<void>
}
```

**States:**
- `idle` - Ready for input
- `submitting` - Saving to backend
- `success` - Brief success state, then reset
- `error` - Show error message

### TaskFilter Component

**Props:**
```typescript
interface TaskFilterProps {
  status: 'all' | 'pending' | 'completed'
  onStatusChange: (status: 'all' | 'pending' | 'completed') => void
  taskCounts: {
    total: number
    pending: number
    completed: number
  }
}
```

**Display:**
```
[All (5)] [Pending (3)] [Completed (2)]
```

---

## 🔄 State Management

### Local State (React Hooks)

```typescript
const [tasks, setTasks] = useState<Task[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')

// Fetch tasks on mount
useEffect(() => {
  const fetchTasks = async () => {
    try {
      setLoading(true)
      const data = await api.getTasks(userId, filter)
      setTasks(data.tasks)
    } catch (err) {
      setError('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }
  fetchTasks()
}, [userId, filter])
```

### Optimistic Updates

```typescript
// Toggle completion with optimistic update
const handleToggle = async (taskId: number) => {
  // Optimistically update UI
  setTasks(tasks.map(task =>
    task.id === taskId
      ? { ...task, completed: !task.completed }
      : task
  ))

  try {
    // Call API
    const updated = await api.toggleTask(userId, taskId)

    // Sync with server response
    setTasks(tasks.map(task =>
      task.id === taskId ? updated : task
    ))
  } catch (err) {
    // Revert on error
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    ))
    showError('Failed to update task')
  }
}
```

---

## 🎭 User Feedback

### Loading States

**Skeleton Loader:**
```tsx
<div className="space-y-4">
  {[1, 2, 3].map(i => (
    <div key={i} className="p-4 border rounded-lg animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  ))}
</div>
```

**Button Loading:**
```tsx
<Button disabled={loading}>
  {loading ? (
    <>
      <Spinner className="mr-2" />
      Creating...
    </>
  ) : (
    'Create Task'
  )}
</Button>
```

### Success Messages

**Toast Notifications:**
- ✅ "Task created successfully!"
- ✅ "Task updated!"
- ✅ "Task deleted"
- ✅ "Task marked as complete"

**Duration:** 3 seconds
**Position:** Top-right (desktop), Top-center (mobile)

### Error Messages

**Inline Errors:**
```tsx
{error && (
  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800">
    {error}
  </div>
)}
```

**Toast Errors:**
- ❌ "Failed to create task. Please try again."
- ❌ "Failed to load tasks. Check your connection."
- ❌ "You don't have permission to edit this task."

---

## 📱 Responsive Design

### Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | < 640px | Single column, stacked |
| Tablet | 640px - 1024px | Single column, wider |
| Desktop | > 1024px | Optional sidebar |

### Touch Targets

- Minimum: 44x44px for all interactive elements
- Checkbox: 48x48px
- Edit/Delete buttons: 44x44px
- Adequate spacing between buttons

### Mobile Optimizations

- Larger form fields (height: 48px)
- Bottom-sheet for edit form (instead of modal)
- Swipe-to-delete gesture (Phase III)
- Pull-to-refresh (Phase III)

---

## ⚡ Performance

### Optimization Strategies

**1. Lazy Loading:**
- Load tasks on-demand (pagination in Phase III)
- Infinite scroll for large lists (Phase III)

**2. Debouncing:**
- Debounce search/filter input (300ms)
- Prevent rapid API calls

**3. Caching:**
- Cache task list in memory
- Invalidate on create/update/delete

**4. Memoization:**
```typescript
const filteredTasks = useMemo(() => {
  return tasks.filter(task => {
    if (filter === 'pending') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })
}, [tasks, filter])
```

---

## 🧪 Testing Requirements

### Unit Tests

```typescript
describe('CreateTaskForm', () => {
  it('should validate title is required', () => {
    // Test validation
  })

  it('should call onSubmit with correct data', async () => {
    // Test form submission
  })

  it('should clear form after successful submission', async () => {
    // Test form reset
  })
})

describe('TaskItem', () => {
  it('should toggle completion when checkbox clicked', () => {
    // Test toggle
  })

  it('should show confirmation before delete', () => {
    // Test delete flow
  })
})
```

### Integration Tests

```typescript
describe('Task CRUD Flow', () => {
  it('should create, update, and delete a task', async () => {
    // Full CRUD test
  })

  it('should filter tasks by status', async () => {
    // Test filtering
  })

  it('should handle API errors gracefully', async () => {
    // Test error handling
  })
})
```

---

## 📋 Acceptance Criteria

### Create Task
- [ ] User can create task with title only
- [ ] User can create task with title and description
- [ ] Form validates title is not empty
- [ ] Form validates title ≤ 200 characters
- [ ] Form validates description ≤ 1000 characters
- [ ] Success message shown after creation
- [ ] Form clears after successful creation
- [ ] New task appears at top of list
- [ ] Error message shown if creation fails

### View Tasks
- [ ] User sees all their tasks on page load
- [ ] Tasks show title, description, status, date
- [ ] Completed tasks have strikethrough style
- [ ] Empty state shown when no tasks
- [ ] Loading state shown while fetching
- [ ] Error message shown if fetch fails

### Filter/Sort Tasks
- [ ] User can filter by: All, Pending, Completed
- [ ] Filter counts shown (e.g., "Pending (3)")
- [ ] User can sort by: Created, Title, Updated
- [ ] Filtering/sorting works immediately

### Update Task
- [ ] User can edit task title
- [ ] User can edit task description
- [ ] Changes save when clicking "Save"
- [ ] Changes cancel when clicking "Cancel"
- [ ] Updated task shows new information
- [ ] Success message shown after update

### Toggle Completion
- [ ] Clicking checkbox toggles completed status
- [ ] Completed tasks show checkmark
- [ ] Completed tasks have strikethrough text
- [ ] Completed tasks have muted color
- [ ] Loading indicator shown during toggle

### Delete Task
- [ ] Confirmation dialog shown before delete
- [ ] Task deleted when user confirms
- [ ] Delete cancelled when user clicks "Cancel"
- [ ] Task removed from list after deletion
- [ ] Success message shown after deletion

### User Experience
- [ ] All operations respond within 2 seconds
- [ ] Loading states shown during async operations
- [ ] Error messages are clear and helpful
- [ ] Interface works on mobile, tablet, desktop
- [ ] All touch targets are at least 44x44px
- [ ] Keyboard navigation works (Tab, Enter, Esc)

---

## 🔗 Related Specifications

- **API Endpoints:** `specs/api/rest-endpoints.md`
- **Database Schema:** `specs/database/schema.md`
- **UI Components:** `specs/ui/components.md`
- **UI Pages:** `specs/ui/pages.md`

---

**Feature Specification Version:** 1.0
**Last Updated:** December 9, 2025
**Status:** ✅ Ready for Implementation
