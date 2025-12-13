# Task Priority and Due Dates Specification

**Feature Type:** Core Feature Enhancement
**Priority:** High
**Phase:** II Enhancement
**Status:** Draft
**Dependencies:** Database schema update, API endpoints update

---

## Overview

Add priority levels and due dates to tasks, enabling users to better organize and prioritize their work. This feature transforms basic task management into a comprehensive productivity system.

---

## User Stories

### US-1: Task Prioritization
**As a** user
**I want to** assign priority levels to tasks
**So that** I can focus on what's most important first

### US-2: Deadline Management
**As a** user
**I want to** set due dates for tasks
**So that** I can track deadlines and stay on schedule

### US-3: Visual Indicators
**As a** user
**I want to** see visual indicators for priority and due dates
**So that** I can quickly identify urgent or overdue tasks

### US-4: Smart Sorting
**As a** user
**I want to** sort tasks by priority or due date
**So that** I can organize my workflow effectively

---

## Database Schema Changes

### Task Model Extension

**Existing Fields:**
```sql
id SERIAL PRIMARY KEY
user_id TEXT NOT NULL
title TEXT NOT NULL
description TEXT
completed BOOLEAN DEFAULT false
created_at TIMESTAMP DEFAULT NOW()
updated_at TIMESTAMP DEFAULT NOW()
```

**New Fields to Add:**
```sql
priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium'
due_date TIMESTAMP NULL
```

**Complete Updated Schema:**
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
    priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    due_date TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_completed ON tasks(completed);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
```

---

## API Changes

### Request/Response Schema Updates

**Task Create Request:**
```json
{
  "title": "Complete project proposal",
  "description": "Write and submit the Q1 proposal",
  "priority": "high",         // NEW: "low" | "medium" | "high"
  "due_date": "2025-12-20T17:00:00Z"  // NEW: ISO 8601 timestamp or null
}
```

**Task Update Request:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "priority": "medium",       // NEW: Can update priority
  "due_date": "2025-12-21T12:00:00Z"  // NEW: Can update due date
}
```

**Task Response:**
```json
{
  "id": 123,
  "user_id": "user_abc",
  "title": "Complete project proposal",
  "description": "Write and submit the Q1 proposal",
  "completed": false,
  "priority": "high",
  "due_date": "2025-12-20T17:00:00Z",
  "created_at": "2025-12-13T10:00:00Z",
  "updated_at": "2025-12-13T10:00:00Z"
}
```

### API Endpoint Updates

**All existing endpoints support new fields:**
- `POST /api/{user_id}/tasks` - Accept priority and due_date
- `PUT /api/{user_id}/tasks/{id}` - Accept priority and due_date
- `GET /api/{user_id}/tasks` - Return priority and due_date

**New Query Parameters:**
```
GET /api/{user_id}/tasks?sort_by=priority&order=desc
GET /api/{user_id}/tasks?sort_by=due_date&order=asc
GET /api/{user_id}/tasks?priority=high
GET /api/{user_id}/tasks?overdue=true
```

---

## Frontend UI Design

### 1. Create/Edit Task Form

#### Priority Selector

**Visual Design:**
```
┌──────────────────────────────────────────┐
│  Priority                                │
│  ○ Low    ● Medium    ○ High            │
└──────────────────────────────────────────┘
```

**Alternative Design (Dropdown):**
```
┌──────────────────────────────────────────┐
│  Priority                                │
│  [Medium ▾]                              │
│   ├─ Low                                 │
│   ├─ Medium   ✓                          │
│   └─ High                                │
└──────────────────────────────────────────┘
```

**Styling:**
- Radio buttons or segmented control
- Color coding:
  - **Low:** Gray `bg-gray-100 text-gray-700`
  - **Medium:** Blue `bg-blue-100 text-blue-700`
  - **High:** Red `bg-red-100 text-red-700`

#### Due Date Picker

**Visual Design:**
```
┌──────────────────────────────────────────┐
│  Due Date (Optional)                     │
│  [📅 2025-12-20 5:00 PM]      [Clear]   │
└──────────────────────────────────────────┘
```

**Implementation:**
- HTML5 `<input type="datetime-local">`
- OR use a date picker library (react-datepicker)
- Calendar icon
- Clear button to remove due date
- Show relative time: "Due in 3 days"

**Quick Shortcuts:**
- Today
- Tomorrow
- Next Week
- Custom

#### Updated Form Layout

```
┌──────────────────────────────────────────┐
│  Create New Task                         │
├──────────────────────────────────────────┤
│  Title *                                 │
│  [___________________________________]   │
│                                          │
│  Description (optional)                  │
│  [___________________________________]   │
│  [___________________________________]   │
│  [___________________________________]   │
│                                          │
│  Priority                                │
│  ○ Low    ● Medium    ○ High            │
│                                          │
│  Due Date (optional)                     │
│  [📅 2025-12-20 5:00 PM]    [Clear]     │
│  Quick: [Today] [Tomorrow] [Next Week]  │
│                                          │
│  [Cancel]  [Create Task]                │
└──────────────────────────────────────────┘
```

---

### 2. Task Item Display

#### Priority Badge

**Visual Design:**
```
[High Priority]  ← Badge on task item
```

**Badge Styles:**

**High Priority:**
```css
Background: bg-red-100
Text: text-red-700
Border: border-red-200
Icon: ⚠️ or 🔴
Font: text-xs font-semibold
Padding: px-2 py-1
Rounded: rounded-full
```

**Medium Priority:**
```css
Background: bg-blue-100
Text: text-blue-700
Border: border-blue-200
Icon: 🔵
```

**Low Priority:**
```css
Background: bg-gray-100
Text: text-gray-600
Border: border-gray-200
Icon: ⚪
```

#### Due Date Display

**Visual Design:**
```
📅 Due Dec 20, 5:00 PM  (in 3 days)
```

**Styling Based on Status:**

**Overdue (past due date):**
```css
Background: bg-red-50
Text: text-red-700
Icon: 🔥 or ⚠️
Example: "⚠️ Overdue by 2 days"
```

**Due Today:**
```css
Background: bg-amber-50
Text: text-amber-700
Icon: 📍
Example: "📍 Due today at 5:00 PM"
```

**Due Soon (within 3 days):**
```css
Background: bg-blue-50
Text: text-blue-700
Icon: 📅
Example: "📅 Due in 2 days"
```

**Future:**
```css
Text: text-gray-600
Icon: 📅
Example: "📅 Due Dec 25"
```

#### Updated Task Item Layout

```
┌──────────────────────────────────────────────────────────┐
│ ☐  [High Priority]                          [Edit] [Del] │
│    Complete project proposal                             │
│    Write and submit the Q1 proposal                      │
│    📅 Due Dec 20, 5:00 PM (in 3 days)                   │
│    Created Dec 13 • Updated Dec 13                       │
└──────────────────────────────────────────────────────────┘
```

---

### 3. Filtering by Priority

**Filter Bar Addition:**
```
┌──────────────────────────────────────────────────────────┐
│  Status: [All ▾]  Priority: [All ▾]  Due: [All ▾]       │
└──────────────────────────────────────────────────────────┘
```

**Priority Filter Options:**
- All Priorities
- High Priority
- Medium Priority
- Low Priority

**Due Date Filter Options:**
- All Tasks
- Overdue
- Due Today
- Due This Week
- Due This Month
- No Due Date
- Has Due Date

---

### 4. Sorting Options

**Sort Dropdown:**
```
┌─────────────────────────┐
│  Sort by: [Due Date ▾]  │
├─────────────────────────┤
│  ✓ Due Date (Asc)       │
│    Due Date (Desc)      │
│    Priority (High→Low)  │
│    Priority (Low→High)  │
│    Created Date (New)   │
│    Created Date (Old)   │
│    Title (A→Z)          │
│    Title (Z→A)          │
└─────────────────────────┘
```

**Default Sorting:**
1. Priority (High → Medium → Low)
2. Due Date (Overdue → Due Soon → Future)
3. Created Date (Newest first)

---

## Business Logic

### Priority Sorting

```typescript
const priorityWeight = {
  high: 3,
  medium: 2,
  low: 1
}

tasks.sort((a, b) => {
  return priorityWeight[b.priority] - priorityWeight[a.priority]
})
```

### Due Date Calculations

```typescript
const getDueDateStatus = (dueDate: string | null): DueDateStatus => {
  if (!dueDate) return { status: 'none', message: null }

  const due = new Date(dueDate)
  const now = new Date()
  const diffMs = due.getTime() - now.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

  if (diffMs < 0) {
    const daysOverdue = Math.abs(diffDays)
    return {
      status: 'overdue',
      message: `Overdue by ${daysOverdue} day${daysOverdue !== 1 ? 's' : ''}`,
      severity: 'high'
    }
  } else if (diffDays === 0) {
    return {
      status: 'today',
      message: `Due today at ${due.toLocaleTimeString()}`,
      severity: 'medium'
    }
  } else if (diffDays <= 3) {
    return {
      status: 'soon',
      message: `Due in ${diffDays} day${diffDays !== 1 ? 's' : ''}`,
      severity: 'low'
    }
  } else {
    return {
      status: 'future',
      message: `Due ${due.toLocaleDateString()}`,
      severity: 'none'
    }
  }
}
```

### Validation

**Priority:**
- Required: No (defaults to 'medium')
- Allowed values: 'low', 'medium', 'high'
- Case: Lowercase

**Due Date:**
- Required: No (can be null)
- Format: ISO 8601 timestamp
- Validation: Must be valid date
- Future only: No (can set past dates)

---

## TypeScript Types

```typescript
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: number
  user_id: string
  title: string
  description?: string
  completed: boolean
  priority: TaskPriority        // NEW
  due_date: string | null       // NEW: ISO 8601 or null
  created_at: string
  updated_at: string
}

export interface TaskCreate {
  title: string
  description?: string
  priority?: TaskPriority       // NEW: Optional, defaults to 'medium'
  due_date?: string | null      // NEW: Optional
}

export interface TaskUpdate {
  title?: string
  description?: string
  priority?: TaskPriority       // NEW
  due_date?: string | null      // NEW
}

export interface DueDateStatus {
  status: 'none' | 'overdue' | 'today' | 'soon' | 'future'
  message: string | null
  severity?: 'high' | 'medium' | 'low' | 'none'
}
```

---

## Backend Implementation

### Database Migration

**File:** `backend/migrations/add_priority_due_date.py`

```python
from sqlalchemy import text

def upgrade(connection):
    """Add priority and due_date columns to tasks table"""

    # Add priority column with default 'medium'
    connection.execute(text("""
        ALTER TABLE tasks
        ADD COLUMN priority TEXT DEFAULT 'medium'
        CHECK (priority IN ('low', 'medium', 'high'))
    """))

    # Add due_date column (nullable)
    connection.execute(text("""
        ALTER TABLE tasks
        ADD COLUMN due_date TIMESTAMP NULL
    """))

    # Add indexes for better query performance
    connection.execute(text("""
        CREATE INDEX idx_tasks_priority ON tasks(priority)
    """))

    connection.execute(text("""
        CREATE INDEX idx_tasks_due_date ON tasks(due_date)
    """))

    # Update existing tasks to have 'medium' priority
    connection.execute(text("""
        UPDATE tasks SET priority = 'medium' WHERE priority IS NULL
    """))

def downgrade(connection):
    """Remove priority and due_date columns"""
    connection.execute(text("DROP INDEX IF EXISTS idx_tasks_priority"))
    connection.execute(text("DROP INDEX IF EXISTS idx_tasks_due_date"))
    connection.execute(text("ALTER TABLE tasks DROP COLUMN priority"))
    connection.execute(text("ALTER TABLE tasks DROP COLUMN due_date"))
```

### SQLModel Update

**File:** `backend/models.py`

```python
from sqlmodel import Field, SQLModel
from datetime import datetime
from typing import Optional
from enum import Enum

class TaskPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class TaskBase(SQLModel):
    title: str = Field(max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)
    priority: TaskPriority = Field(default=TaskPriority.MEDIUM)  # NEW
    due_date: Optional[datetime] = Field(default=None)          # NEW

class Task(TaskBase, table=True):
    __tablename__ = "tasks"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class TaskCreate(TaskBase):
    pass

class TaskUpdate(SQLModel):
    title: Optional[str] = Field(default=None, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    priority: Optional[TaskPriority] = None   # NEW
    due_date: Optional[datetime] = None       # NEW
```

### API Route Updates

**File:** `backend/routes/tasks.py`

```python
from fastapi import Query

# GET /api/{user_id}/tasks with new filters
@router.get("/api/{user_id}/tasks")
async def get_tasks(
    user_id: str,
    status: str = Query("all", regex="^(all|pending|completed)$"),
    priority: Optional[str] = Query(None, regex="^(low|medium|high)$"),  # NEW
    overdue: Optional[bool] = Query(None),                                # NEW
    sort_by: str = Query("created_at", regex="^(created_at|priority|due_date|title)$"),  # NEW
    order: str = Query("desc", regex="^(asc|desc)$"),                     # NEW
):
    query = select(Task).where(Task.user_id == user_id)

    # Filter by completion status
    if status == "pending":
        query = query.where(Task.completed == False)
    elif status == "completed":
        query = query.where(Task.completed == True)

    # Filter by priority (NEW)
    if priority:
        query = query.where(Task.priority == priority)

    # Filter overdue tasks (NEW)
    if overdue is True:
        query = query.where(Task.due_date < datetime.utcnow())

    # Apply sorting (NEW)
    sort_column = getattr(Task, sort_by)
    if order == "desc":
        query = query.order_by(sort_column.desc())
    else:
        query = query.order_by(sort_column.asc())

    tasks = await session.execute(query)
    return tasks.scalars().all()
```

---

## Acceptance Criteria

### AC-1: Database Schema
- [ ] Migration script runs successfully
- [ ] Priority column exists with CHECK constraint
- [ ] Due date column exists and accepts NULL
- [ ] Indexes created for performance
- [ ] Existing tasks have default 'medium' priority

### AC-2: API Functionality
- [ ] Create task accepts priority and due_date
- [ ] Update task can modify priority and due_date
- [ ] GET tasks returns priority and due_date
- [ ] Filtering by priority works
- [ ] Filtering by overdue status works
- [ ] Sorting by priority works
- [ ] Sorting by due_date works

### AC-3: UI - Create/Edit Form
- [ ] Priority selector is visible
- [ ] All three priority options selectable
- [ ] Due date picker is functional
- [ ] Clear button removes due date
- [ ] Quick shortcuts work (Today, Tomorrow, etc.)
- [ ] Form submits with priority and due date
- [ ] Form validation works

### AC-4: UI - Task Display
- [ ] Priority badge shows correct color
- [ ] Priority badge shows correct text
- [ ] Due date displays formatted correctly
- [ ] Overdue tasks show warning indicator
- [ ] Due today tasks show emphasis
- [ ] Relative time displayed ("in 3 days")

### AC-5: Filtering & Sorting
- [ ] Filter by priority dropdown works
- [ ] Filter by due date status works
- [ ] Sort by priority works (High→Low)
- [ ] Sort by due date works (Ascending)
- [ ] Multiple filters can be combined
- [ ] Task count updates when filtering

### AC-6: Visual Design
- [ ] Priority colors are distinct and accessible
- [ ] Due date indicators are clear
- [ ] Overdue tasks are visually prominent
- [ ] Design is consistent with app theme
- [ ] Mobile responsive

---

## Future Enhancements

- Recurring tasks (daily, weekly, monthly)
- Task dependencies (blocked by other tasks)
- Priority auto-adjustment based on due date
- Email/push notifications for due dates
- Calendar integration
- Task templates with pre-set priority/dates
- Bulk update priority/due dates

---

*Specification complete. Ready for implementation.*
