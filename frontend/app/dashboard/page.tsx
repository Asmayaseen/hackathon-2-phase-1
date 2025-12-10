/**
 * Dashboard Page
 *
 * Main task management page with create, read, update, delete functionality.
 */

"use client"

import { useState, useEffect } from 'react'
import { useSession } from '@/lib/auth-client'
import { api } from '@/lib/api'
import type { Task } from '@/types/task'
import CreateTaskForm from '@/components/CreateTaskForm'
import TaskList from '@/components/TaskList'

export default function DashboardPage() {
  const { data: session } = useSession()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')

  const userId = session?.user?.id

  // Fetch tasks on mount and when filter changes
  useEffect(() => {
    if (userId) {
      fetchTasks()
    }
  }, [userId, filter])

  const fetchTasks = async () => {
    if (!userId) return

    setLoading(true)
    setError('')

    try {
      const response = await api.getTasks(userId, filter)
      setTasks(response.tasks)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (title: string, description?: string) => {
    if (!userId) return

    try {
      await api.createTask(userId, { title, description })
      // Refresh task list
      await fetchTasks()
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create task')
    }
  }

  const handleToggleTask = async (taskId: number) => {
    if (!userId) return

    try {
      await api.toggleTask(userId, taskId)
      // Refresh task list
      await fetchTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle task')
    }
  }

  const handleDeleteTask = async (taskId: number) => {
    if (!userId) return

    try {
      await api.deleteTask(userId, taskId)
      // Refresh task list
      await fetchTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task')
    }
  }

  const handleUpdateTask = async (
    taskId: number,
    title: string,
    description?: string
  ) => {
    if (!userId) return

    try {
      await api.updateTask(userId, taskId, { title, description })
      // Refresh task list
      await fetchTasks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task')
    }
  }

  if (!session) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          My Tasks
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your tasks and stay organized
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Create Task Form */}
      <CreateTaskForm onSubmit={handleCreateTask} />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading tasks...</p>
          </div>
        </div>
      )}

      {/* Task List */}
      {!loading && (
        <TaskList
          tasks={tasks}
          filter={filter}
          onFilterChange={setFilter}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
        />
      )}
    </div>
  )
}
