# Dashboard Enhancements Specification

**Feature Type:** Core Feature Enhancement
**Priority:** High
**Phase:** II Enhancement
**Status:** Draft

---

## Overview

Transform the basic task dashboard into a powerful, feature-rich productivity hub with statistics, search, keyboard shortcuts, bulk operations, and advanced filtering. The enhanced dashboard should provide professional-grade task management capabilities that rival or exceed competing products.

---

## User Stories

### US-1: Productivity Insights
**As a** user
**I want to** see statistics about my task completion
**So that** I can track my productivity and stay motivated

### US-2: Quick Search
**As a** user
**I want to** search through my tasks quickly
**So that** I can find specific tasks without scrolling

### US-3: Power User Efficiency
**As a** power user
**I want to** use keyboard shortcuts
**So that** I can manage tasks without using my mouse

### US-4: Bulk Management
**As a** user with many tasks
**I want to** perform bulk operations
**So that** I can manage multiple tasks efficiently

### US-5: Advanced Filtering
**As a** user
**I want to** filter tasks by multiple criteria
**So that** I can focus on what's important right now

### US-6: Data Portability
**As a** user
**I want to** export my tasks
**So that** I can back them up or use them elsewhere

---

## Feature Breakdown

## 1. Statistics Dashboard

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [Total Tasks]  [Pending]  [Completed]  [Completion Rate]  │
│    Card 1         Card 2      Card 3         Card 4        │
└─────────────────────────────────────────────────────────────┘
```

### Stat Cards

**Card 1: Total Tasks**
- **Icon:** Clipboard
- **Gradient:** `from-blue-500 to-indigo-500`
- **Value:** Total count of all tasks
- **Label:** "Total Tasks"

**Card 2: Pending Tasks**
- **Icon:** Clock
- **Gradient:** `from-amber-500 to-orange-500`
- **Value:** Count of incomplete tasks
- **Label:** "Pending"

**Card 3: Completed Tasks**
- **Icon:** CheckCircle
- **Gradient:** `from-green-500 to-teal-500`
- **Value:** Count of completed tasks
- **Label:** "Completed"

**Card 4: Completion Rate**
- **Icon:** TrendingUp
- **Gradient:** `from-purple-500 to-pink-500`
- **Value:** `(completed / total) * 100`%
- **Label:** "Completion Rate"
- **Extra:** Progress bar showing completion percentage

### Card Styling
```css
Background: Gradient (see above)
Text: White
Padding: p-6
Rounded: rounded-xl
Shadow: shadow-lg
Hover: shadow-xl
Icon Background: white/20 opacity
Icon Size: w-14 h-14
Value Size: text-4xl font-bold
```

### Calculations

```javascript
totalTasks = allTasks.length
pendingTasks = allTasks.filter(t => !t.completed).length
completedTasks = allTasks.filter(t => t.completed).length
completionRate = totalTasks > 0
  ? Math.round((completedTasks / totalTasks) * 100)
  : 0
```

---

## 2. Search Functionality

### UI Component

```
┌──────────────────────────────────────────┐
│  🔍  Search tasks...            [X]      │
└──────────────────────────────────────────┘
```

**Location:** Above task list, below statistics

**Features:**
- Real-time search (no submit button)
- Debounced input (300ms delay)
- Clear button (X) when text present
- Search icon on left
- Placeholder: "Search tasks..."

### Search Behavior

**Search Fields:**
- Task title (case-insensitive)
- Task description (case-insensitive)

**Matching:**
- Partial match (contains)
- Highlights matching text (future enhancement)

**Empty State:**
- Show: "No tasks match your search"
- Suggest: "Try a different keyword"

### Implementation

```typescript
const [searchQuery, setSearchQuery] = useState('')

const filteredTasks = tasks.filter(task => {
  const searchLower = searchQuery.toLowerCase()
  return (
    task.title.toLowerCase().includes(searchLower) ||
    task.description?.toLowerCase().includes(searchLower)
  )
})
```

---

## 3. Advanced Filtering

### Filter UI

**Current Filters (Existing):**
- All
- Pending
- Completed

**New Filters to Add:**
- Priority (High, Medium, Low)
- Due Date (Overdue, Today, This Week, Future)
- Tags/Categories

### Filter Bar Enhancement

```
┌────────────────────────────────────────────────────────────┐
│  Status: [All ▼] Priority: [All ▼] Due: [All ▼]          │
└────────────────────────────────────────────────────────────┘
```

**Dropdown Styling:**
- Background: White
- Border: Gray-300
- Padding: px-4 py-2
- Rounded: rounded-lg
- Icon: Chevron down

### Filter Logic

**Multiple filters combine with AND:**
```typescript
let filtered = tasks

// Status filter
if (statusFilter !== 'all') {
  filtered = filtered.filter(t =>
    statusFilter === 'completed' ? t.completed : !t.completed
  )
}

// Priority filter
if (priorityFilter !== 'all') {
  filtered = filtered.filter(t => t.priority === priorityFilter)
}

// Due date filter
if (dueDateFilter !== 'all') {
  filtered = filtered.filter(t => {
    // Implementation depends on due date logic
  })
}
```

---

## 4. Keyboard Shortcuts

### Shortcut System

**Global Shortcuts (work anywhere on dashboard):**

| Shortcut | Action | Description |
|----------|--------|-------------|
| `N` or `C` | Create Task | Opens create task form |
| `/` | Search | Focuses search input |
| `?` | Help | Shows keyboard shortcuts modal |
| `Escape` | Cancel | Closes modals, clears search |

**Task-Specific Shortcuts (when task is focused):**

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Space` | Toggle Complete | Marks task complete/incomplete |
| `E` | Edit | Opens edit mode for task |
| `Delete` or `Backspace` | Delete | Deletes task (with confirmation) |
| `↑` / `↓` | Navigate | Move focus between tasks |
| `Enter` | Select | Selects/opens focused task |

**Bulk Operations Shortcuts:**

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Ctrl+A` / `Cmd+A` | Select All | Selects all visible tasks |
| `Ctrl+Shift+C` | Complete All | Marks all selected complete |
| `Ctrl+Shift+D` | Delete All | Deletes all selected (confirm) |

### Keyboard Shortcuts Modal

**Trigger:** Press `?` key

**Design:**
```
┌──────────────────────────────────────────┐
│  Keyboard Shortcuts            [X]       │
├──────────────────────────────────────────┤
│                                           │
│  General                                  │
│  ───────                                  │
│  N / C          Create new task          │
│  /              Search tasks             │
│  ?              Show this help           │
│  Escape         Close / Cancel           │
│                                           │
│  Task Actions                             │
│  ─────────────                            │
│  Space          Toggle completion        │
│  E              Edit task                │
│  Delete         Delete task              │
│  ↑ / ↓          Navigate tasks           │
│                                           │
│  Bulk Operations                          │
│  ────────────────                         │
│  Ctrl+A         Select all tasks         │
│  Ctrl+Shift+C   Complete selected        │
│  Ctrl+Shift+D   Delete selected          │
│                                           │
└──────────────────────────────────────────┘
```

**Styling:**
- Modal backdrop: Semi-transparent black
- Modal: White background, rounded-xl, shadow-2xl
- Width: max-w-2xl
- Shortcut keys: Monospace font, gray background badge

### Implementation

```typescript
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    // Ignore if typing in input
    if (e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement) {
      return
    }

    switch(e.key.toLowerCase()) {
      case 'n':
      case 'c':
        // Open create task form
        break
      case '/':
        // Focus search
        document.getElementById('search')?.focus()
        break
      case '?':
        // Show shortcuts modal
        setShowShortcuts(true)
        break
      // ... more shortcuts
    }
  }

  window.addEventListener('keydown', handleKeyPress)
  return () => window.removeEventListener('keydown', handleKeyPress)
}, [])
```

---

## 5. Bulk Operations

### Bulk Selection UI

**Selection Checkbox:**
- Location: Left of each task item
- Checkbox appears on hover or when any task is selected
- "Select All" checkbox in header

**Bulk Action Bar:**
```
┌──────────────────────────────────────────────────────────┐
│  ☑ 5 tasks selected                                      │
│  [Complete All] [Delete All] [Deselect All]   [Cancel]  │
└──────────────────────────────────────────────────────────┘
```

**Location:** Fixed at bottom of screen when tasks selected

**Styling:**
- Background: Blue-600
- Text: White
- Shadow: Large
- Padding: p-4
- Buttons: White background, blue text

### Bulk Operations

**1. Select All**
- Checkbox in filter bar: "☐ Select All (X tasks)"
- Selects all **visible** tasks (respects filters)
- Indeterminate state if some selected

**2. Complete All Selected**
- Button: "Complete All"
- Action: Mark all selected tasks as completed
- API: Batch PATCH request or multiple PATCH requests
- Confirmation: None (can be undone)
- Toast: "5 tasks marked as complete"

**3. Delete All Selected**
- Button: "Delete All"
- Action: Delete all selected tasks
- Confirmation Modal:
  ```
  ┌────────────────────────────────────┐
  │  Delete 5 Tasks?                   │
  │                                    │
  │  This action cannot be undone.     │
  │                                    │
  │  [Cancel]  [Delete]                │
  └────────────────────────────────────┘
  ```
- API: Batch DELETE or multiple DELETE requests
- Toast: "5 tasks deleted"

**4. Delete All Completed**
- Location: Filter bar menu (⋮ icon)
- Action: Delete all completed tasks
- Confirmation: Required
- Use case: Clean up completed tasks

**5. Mark All as Complete**
- Location: Filter bar menu (⋮ icon)
- Action: Mark all pending tasks complete
- Confirmation: "Mark X pending tasks as complete?"
- Toast: "All tasks completed! 🎉"

### Implementation

```typescript
const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set())

const handleSelectAll = () => {
  if (selectedTasks.size === filteredTasks.length) {
    setSelectedTasks(new Set())
  } else {
    setSelectedTasks(new Set(filteredTasks.map(t => t.id)))
  }
}

const handleBulkComplete = async () => {
  await Promise.all(
    Array.from(selectedTasks).map(id =>
      api.toggleTask(userId, id)
    )
  )
  await fetchTasks()
  setSelectedTasks(new Set())
  showToast('Tasks completed')
}

const handleBulkDelete = async () => {
  if (!confirm(`Delete ${selectedTasks.size} tasks?`)) return

  await Promise.all(
    Array.from(selectedTasks).map(id =>
      api.deleteTask(userId, id)
    )
  )
  await fetchTasks()
  setSelectedTasks(new Set())
  showToast('Tasks deleted')
}
```

---

## 6. Export/Import Functionality

### Export Features

**Export Button Location:** Header or filter bar

**Export Formats:**

1. **CSV Export**
   - Columns: ID, Title, Description, Completed, Created, Updated
   - Filename: `tasks-export-YYYY-MM-DD.csv`

2. **JSON Export**
   - Full task objects with all fields
   - Pretty-printed for readability
   - Filename: `tasks-export-YYYY-MM-DD.json`

3. **PDF Export** (Future Enhancement)
   - Formatted task list with checkboxes
   - Include statistics summary

### Export UI

**Dropdown Menu:**
```
┌─────────────────────┐
│  Export Tasks    ▾  │
├─────────────────────┤
│  📄 Export as CSV   │
│  📋 Export as JSON  │
│  📑 Export as PDF   │
└─────────────────────┘
```

### Import Features

**Import Button:** Next to Export

**Import Process:**
1. User clicks "Import"
2. File picker opens (accept: .csv, .json)
3. File is parsed
4. Preview shown with import summary
5. User confirms import
6. Tasks are created via API
7. Success toast shown

**Import Modal:**
```
┌────────────────────────────────────────┐
│  Import Tasks                   [X]    │
├────────────────────────────────────────┤
│                                        │
│  📁 Drop file here or click to browse │
│                                        │
│  Supported formats: CSV, JSON         │
│                                        │
│  ──────────────────────────────────   │
│                                        │
│  Preview (if file selected):          │
│  ✓ 15 tasks found                     │
│  ✓ 3 completed, 12 pending            │
│                                        │
│  [Cancel]  [Import Tasks]             │
└────────────────────────────────────────┘
```

### Implementation

```typescript
// CSV Export
const exportCSV = () => {
  const headers = ['ID', 'Title', 'Description', 'Completed', 'Created', 'Updated']
  const rows = tasks.map(t => [
    t.id,
    `"${t.title}"`,
    `"${t.description || ''}"`,
    t.completed,
    t.created_at,
    t.updated_at
  ])

  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  downloadFile(csv, 'tasks-export.csv', 'text/csv')
}

// JSON Export
const exportJSON = () => {
  const json = JSON.stringify(tasks, null, 2)
  downloadFile(json, 'tasks-export.json', 'application/json')
}

const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
```

---

## 7. Header Component

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  [Logo] TaskFlow               [User Avatar] [Logout]   │
└──────────────────────────────────────────────────────────┘
```

### Components

**Logo:**
- Icon: Gradient checkmark in rounded square
- Text: "TaskFlow" with gradient

**User Menu:**
- Avatar: Circular, gradient background
- Initial: First letter of name/email
- Dropdown on click:
  ```
  ┌─────────────────────┐
  │  User Name          │
  │  user@email.com     │
  ├─────────────────────┤
  │  Dashboard          │
  │  Settings           │
  │  Keyboard Shortcuts │
  ├─────────────────────┤
  │  Sign Out           │
  └─────────────────────┘
  ```

**Sticky Behavior:**
- Fixed at top: `sticky top-0 z-50`
- Background: White
- Border bottom: Gray-200
- Shadow: Subtle

---

## Dashboard Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  Header (Logo, User Menu)                              │
├─────────────────────────────────────────────────────────┤
│  Dashboard Content (container mx-auto px-6 py-8)       │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Page Title + Breadcrumb                        │   │
│  │  "My Tasks" + "Manage your tasks..."           │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Statistics Cards (4 cards in row)             │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Search Bar                                     │   │
│  │  🔍 Search tasks...                            │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Create Task Form                               │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Filter Bar + View Options                      │   │
│  │  [All] [Pending] [Completed] | [Export ▾]      │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Task List                                      │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │ Task Item 1                             │   │   │
│  │  ├─────────────────────────────────────────┤   │   │
│  │  │ Task Item 2                             │   │   │
│  │  ├─────────────────────────────────────────┤   │   │
│  │  │ Task Item 3                             │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘

[Bulk Action Bar (fixed bottom, appears when selecting)]
```

---

## Acceptance Criteria

### AC-1: Statistics Display
- [ ] Four stat cards display correctly
- [ ] Stats update in real-time when tasks change
- [ ] Completion rate calculates correctly
- [ ] Progress bar animates smoothly
- [ ] Cards have proper gradients and styling

### AC-2: Search Functionality
- [ ] Search input is visible and accessible
- [ ] Search filters tasks in real-time
- [ ] Search works for both title and description
- [ ] Clear button appears when text entered
- [ ] Empty state shows when no results

### AC-3: Keyboard Shortcuts
- [ ] All shortcuts work as specified
- [ ] Shortcuts modal displays on `?` key
- [ ] Shortcuts don't trigger when typing
- [ ] Visual feedback for shortcuts
- [ ] Help button shows shortcuts modal

### AC-4: Bulk Operations
- [ ] Select all checkbox works
- [ ] Individual task selection works
- [ ] Bulk action bar appears when tasks selected
- [ ] Complete all works correctly
- [ ] Delete all shows confirmation
- [ ] Bulk operations update UI correctly

### AC-5: Export/Import
- [ ] CSV export downloads correctly
- [ ] JSON export contains all data
- [ ] Import accepts CSV and JSON files
- [ ] Import preview shows correct summary
- [ ] Imported tasks appear in list

### AC-6: Header Component
- [ ] Header is sticky on scroll
- [ ] User avatar shows correct initial
- [ ] Dropdown menu works
- [ ] Logout button functions
- [ ] Responsive on mobile

### AC-7: Overall UX
- [ ] Dashboard loads quickly
- [ ] All interactions feel responsive
- [ ] Loading states are shown
- [ ] Error messages are helpful
- [ ] Toast notifications appear for actions

---

## Technical Implementation

**New Components:**
- `components/Header.tsx`
- `components/StatsCards.tsx`
- `components/SearchBar.tsx`
- `components/KeyboardShortcutsModal.tsx`
- `components/BulkActionBar.tsx`
- `components/ExportMenu.tsx`

**Modified Components:**
- `app/dashboard/page.tsx` - Main dashboard
- `components/TaskList.tsx` - Add selection support
- `components/TaskItem.tsx` - Add keyboard navigation

**New Hooks:**
- `hooks/useKeyboardShortcuts.ts`
- `hooks/useTaskSelection.ts`

---

## Performance Considerations

- Debounce search input (300ms)
- Virtualize task list if > 100 items
- Memoize filtered/sorted tasks
- Batch API requests for bulk operations
- Optimize re-renders with React.memo

---

## Future Enhancements (Phase III+)

- Drag and drop task reordering
- Task categories/tags with colors
- Calendar view
- Recurring tasks
- Task templates
- Collaboration features
- Mobile app

---

*Specification complete. Ready for implementation.*
