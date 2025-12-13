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

  // Mock user ID - replace with actual auth
  const userId = 'user123'

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      // Mock data for now
      const mockTasks: Task[] = [
        {
          id: 1,
          user_id: userId,
          title: 'Complete project proposal',
          description: 'Write and submit Q1 proposal',
          completed: false,
          priority: 'high',
          due_date: '2025-12-20T17:00:00Z',
          created_at: '2025-12-13T10:00:00Z',
          updated_at: '2025-12-13T10:00:00Z',
        },
        {
          id: 2,
          user_id: userId,
          title: 'Review pull requests',
          description: 'Review pending PRs',
          completed: false,
          priority: 'medium',
          due_date: '2025-12-15T12:00:00Z',
          created_at: '2025-12-13T09:00:00Z',
          updated_at: '2025-12-13T09:00:00Z',
        },
        {
          id: 3,
          user_id: userId,
          title: 'Update documentation',
          description: 'Update API docs',
          completed: true,
          priority: 'low',
          due_date: '2025-12-10T12:00:00Z',
          created_at: '2025-12-10T09:00:00Z',
          updated_at: '2025-12-13T09:00:00Z',
        },
      ]

      setTasks(mockTasks)
    } catch (error) {
      showToast('error', 'Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (taskData: any) => {
    const newTask: Task = {
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      user_id: userId,
      ...taskData,
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    setTasks([newTask, ...tasks])
    setShowCreateForm(false)
    showToast('success', 'Task created successfully!')
  }

  const handleToggleComplete = async (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
    showToast('success', 'Task updated')
  }

  const handleUpdateTask = async (taskId: number, updates: Partial<Task>) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ))
    showToast('success', 'Task updated!')
  }

  const handleDeleteTask = async (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId))
    setSelectedTaskIds(prev => {
      const newSet = new Set(prev)
      newSet.delete(taskId)
      return newSet
    })
    showToast('success', 'Task deleted!')
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
  const handleImport = (importedTasks: Omit<Task, 'id' | 'created_at' | 'updated_at'>[]) => {
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
    <div className="min-h-screen bg-background">
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

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">My Tasks</h1>
            <p className="text-muted-foreground">
              Manage your tasks efficiently • Press <kbd className="px-2 py-1 text-xs bg-secondary rounded">?</kbd> for shortcuts
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
              placeholder="Search tasks... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 bg-card border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-secondary rounded text-muted-foreground">
              Ctrl+K
            </kbd>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2.5 bg-card border border-border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="px-4 py-2.5 bg-card border border-border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Task
            <kbd className="ml-1 px-1.5 py-0.5 text-xs bg-white/20 rounded">N</kbd>
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
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
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
