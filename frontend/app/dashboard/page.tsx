'use client'

import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import StatsCards from '@/components/StatsCards'
import TaskList from '@/components/TaskList'
import CreateTaskForm from '@/components/CreateTaskForm'
import BulkActionsToolbar from '@/components/BulkActionsToolbar'
import ExportImportMenu from '@/components/ExportImportMenu'
import KeyboardShortcutsModal from '@/components/KeyboardShortcutsModal'
import { useToast } from '@/components/ToastProvider'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

interface Task {
  id: number
  user_id: string
  title: string
  description?: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  due_date?: string
  created_at: string
  updated_at: string
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all')
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all')
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<number>>(new Set())
  const [focusedTaskIndex, setFocusedTaskIndex] = useState(-1)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { showToast } = useToast()

  // Mock user ID - same as chat page
  const userId = 'demo-user'

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      // Fetch real tasks from backend
      const response = await fetch(`http://localhost:8000/api/${userId}/tasks`)

      if (!response.ok) {
        throw new Error('Failed to fetch tasks')
      }

      const data = await response.json()
      const fetchedTasks = data.tasks || data || []

      setTasks(fetchedTasks)
    } catch (error) {
      console.error('Error fetching tasks:', error)
      showToast('error', 'Failed to fetch tasks')
      // Show empty list on error
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (taskData: any) => {
    try {
      const response = await fetch(`http://localhost:8000/api/${userId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      })

      if (!response.ok) throw new Error('Failed to create task')

      const newTask = await response.json()
      setTasks([newTask, ...tasks])
      setShowCreateForm(false)
      showToast('success', 'Task created successfully!')
    } catch (error) {
      console.error('Error creating task:', error)
      showToast('error', 'Failed to create task')
    }
  }

  const handleToggleComplete = async (taskId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/${userId}/tasks/${taskId}/complete`, {
        method: 'PATCH',
      })

      if (!response.ok) throw new Error('Failed to toggle task')

      const updatedTask = await response.json()
      setTasks(tasks.map(task =>
        task.id === taskId ? updatedTask : task
      ))
      showToast('success', 'Task updated')
    } catch (error) {
      console.error('Error toggling task:', error)
      showToast('error', 'Failed to update task')
    }
  }

  const handleUpdateTask = async (taskId: number, updates: Partial<Task>) => {
    try {
      const response = await fetch(`http://localhost:8000/api/${userId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (!response.ok) throw new Error('Failed to update task')

      const updatedTask = await response.json()
      setTasks(tasks.map(task =>
        task.id === taskId ? updatedTask : task
      ))
      showToast('success', 'Task updated!')
    } catch (error) {
      console.error('Error updating task:', error)
      showToast('error', 'Failed to update task')
    }
  }

  const handleDeleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/${userId}/tasks/${taskId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete task')

      setTasks(tasks.filter(task => task.id !== taskId))
      setSelectedTaskIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(taskId)
        return newSet
      })
      showToast('success', 'Task deleted!')
    } catch (error) {
      console.error('Error deleting task:', error)
      showToast('error', 'Failed to delete task')
    }
  }

  // Bulk operations
  const handleToggleSelect = (taskId: number) => {
    setSelectedTaskIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(taskId)) {
        newSet.delete(taskId)
      } else {
        newSet.add(taskId)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    setSelectedTaskIds(new Set(filteredTasks.map(t => t.id)))
    showToast('info', `Selected ${filteredTasks.length} tasks`)
  }

  const handleDeselectAll = () => {
    setSelectedTaskIds(new Set())
    showToast('info', 'Deselected all tasks')
  }

  const handleBulkComplete = () => {
    setTasks(tasks.map(task =>
      selectedTaskIds.has(task.id) ? { ...task, completed: true } : task
    ))
    showToast('success', `Completed ${selectedTaskIds.size} tasks`)
    setSelectedTaskIds(new Set())
  }

  const handleBulkUncomplete = () => {
    setTasks(tasks.map(task =>
      selectedTaskIds.has(task.id) ? { ...task, completed: false } : task
    ))
    showToast('success', `Uncompleted ${selectedTaskIds.size} tasks`)
    setSelectedTaskIds(new Set())
  }

  const handleBulkDelete = () => {
    if (!confirm(`Delete ${selectedTaskIds.size} tasks? This cannot be undone.`)) {
      return
    }
    setTasks(tasks.filter(task => !selectedTaskIds.has(task.id)))
    showToast('success', `Deleted ${selectedTaskIds.size} tasks`)
    setSelectedTaskIds(new Set())
  }

  const handleBulkPriority = (priority: 'low' | 'medium' | 'high') => {
    setTasks(tasks.map(task =>
      selectedTaskIds.has(task.id) ? { ...task, priority } : task
    ))
    showToast('success', `Updated ${selectedTaskIds.size} tasks to ${priority} priority`)
    setSelectedTaskIds(new Set())
  }

  // Export/Import
  const handleImport = (importedTasks: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>[]) => {
    const newTasks = importedTasks.map((task, index) => ({
      ...task,
      id: Math.max(0, ...tasks.map(t => t.id)) + index + 1,
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }))
    setTasks([...newTasks, ...tasks])
  }

  // Navigation
  const handleNavigateUp = () => {
    if (filteredTasks.length === 0) return
    setFocusedTaskIndex(prev => (prev <= 0 ? filteredTasks.length - 1 : prev - 1))
  }

  const handleNavigateDown = () => {
    if (filteredTasks.length === 0) return
    setFocusedTaskIndex(prev => (prev >= filteredTasks.length - 1 ? 0 : prev + 1))
  }

  const handleEdit = () => {
    if (focusedTaskIndex >= 0 && focusedTaskIndex < filteredTasks.length) {
      showToast('info', 'Edit mode - click edit button on task')
    } else if (selectedTaskIds.size === 1) {
      showToast('info', 'Edit mode - click edit button on task')
    }
  }

  const handleDelete = () => {
    if (focusedTaskIndex >= 0 && focusedTaskIndex < filteredTasks.length) {
      handleDeleteTask(filteredTasks[focusedTaskIndex].id)
    } else if (selectedTaskIds.size === 1) {
      handleDeleteTask(Array.from(selectedTaskIds)[0])
    }
  }

  const handleToggleCompleteShortcut = () => {
    if (focusedTaskIndex >= 0 && focusedTaskIndex < filteredTasks.length) {
      handleToggleComplete(filteredTasks[focusedTaskIndex].id)
    } else if (selectedTaskIds.size === 1) {
      handleToggleComplete(Array.from(selectedTaskIds)[0])
    }
  }

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onNewTask: () => setShowCreateForm(true),
    onEdit: handleEdit,
    onDelete: handleDelete,
    onToggleComplete: handleToggleCompleteShortcut,
    onNavigateUp: handleNavigateUp,
    onNavigateDown: handleNavigateDown,
    onSelectAll: handleSelectAll,
    onDeselectAll: handleDeselectAll,
    onBulkComplete: handleBulkComplete,
    onBulkDelete: handleBulkDelete,
    onExport: () => showToast('info', 'Hover over Export/Import menu'),
    onImport: () => showToast('info', 'Hover over Export/Import menu'),
    onFocusSearch: () => searchInputRef.current?.focus(),
    onShowShortcuts: () => setShowShortcuts(true),
  })

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (task.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' ||
                         (statusFilter === 'pending' && !task.completed) ||
                         (statusFilter === 'completed' && task.completed)
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0,
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-300">
      {/* Cyber grid background - visible in dark mode */}
      <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#00d9ff10_1px,transparent_1px),linear-gradient(to_bottom,#00d9ff10_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Neon glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full filter blur-[120px] animate-pulse [animation-delay:1s]" />

      <Header />

      {/* Bulk Actions Toolbar (sticky at top when items selected) */}
      <BulkActionsToolbar
        selectedCount={selectedTaskIds.size}
        totalCount={filteredTasks.length}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        onBulkComplete={handleBulkComplete}
        onBulkUncomplete={handleBulkUncomplete}
        onBulkDelete={handleBulkDelete}
        onBulkPriority={handleBulkPriority}
      />

      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-foreground">Neural</span>{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">Task Stream</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your tasks efficiently • Press <kbd className="px-2 py-1 text-xs bg-cyan-500/30 border-2 border-cyan-500/50 text-cyan-400 rounded shadow-[0_0_10px_rgba(0,217,255,0.3)]">?</kbd> for shortcuts
            </p>
          </div>
          <ExportImportMenu tasks={tasks} onImport={handleImport} />
        </div>

        <StatsCards stats={stats} />

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search neural stream... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-card/80 border-2 border-cyan-500/30 rounded-2xl text-foreground placeholder:text-cyan-100/40 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,217,255,0.3)] backdrop-blur-sm transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-cyan-500/30 border-2 border-cyan-500/50 rounded text-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.2)]">
              Ctrl+K
            </kbd>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-3 bg-card/80 border-2 border-fuchsia-500/30 rounded-2xl text-foreground backdrop-blur-sm focus:outline-none focus:border-fuchsia-400 focus:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all uppercase tracking-wider font-bold text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="px-4 py-3 bg-card/80 border-2 border-cyan-500/30 rounded-2xl text-foreground backdrop-blur-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all uppercase tracking-wider font-bold text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button
            onClick={() => setShowCreateForm(true)}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300" />
            <div className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-2xl text-white font-bold border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(0,217,255,0.4)] uppercase tracking-wider text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Task
              <kbd className="ml-1 px-1.5 py-0.5 text-xs bg-white/20 rounded">N</kbd>
            </div>
          </button>
        </div>

        {showCreateForm && (
          <div className="mb-6">
            <CreateTaskForm
              onSubmit={handleCreateTask}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading tasks...</p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            selectedTaskIds={selectedTaskIds}
            onToggleSelect={handleToggleSelect}
            focusedTaskIndex={focusedTaskIndex}
          />
        )}

        {!loading && filteredTasks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No tasks found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Create your first task to get started!'}
            </p>
            {!searchQuery && statusFilter === 'all' && priorityFilter === 'all' && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-foreground rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Create First Task
              </button>
            )}
          </div>
        )}
      </main>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </div>
  )
}
