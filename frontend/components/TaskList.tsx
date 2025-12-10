/**
 * Task List Component
 *
 * Displays a list of tasks with filtering options.
 */

"use client"

import type { Task } from '@/types/task'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: number) => Promise<void>
  onDelete: (id: number) => Promise<void>
  onUpdate: (id: number, title: string, description?: string) => Promise<void>
  filter: 'all' | 'pending' | 'completed'
  onFilterChange: (filter: 'all' | 'pending' | 'completed') => void
}

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onUpdate,
  filter,
  onFilterChange,
}: TaskListProps) {
  const completedCount = tasks.filter((t) => t.completed).length
  const pendingCount = tasks.length - completedCount

  return (
    <div className="space-y-4">
      {/* Stats and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Stats */}
          <div className="flex items-center gap-6 text-sm">
            <div>
              <span className="font-semibold text-gray-900">{tasks.length}</span>
              <span className="text-gray-600 ml-1">Total</span>
            </div>
            <div>
              <span className="font-semibold text-amber-600">{pendingCount}</span>
              <span className="text-gray-600 ml-1">Pending</span>
            </div>
            <div>
              <span className="font-semibold text-green-600">{completedCount}</span>
              <span className="text-gray-600 ml-1">Completed</span>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onFilterChange('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onFilterChange('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => onFilterChange('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'completed'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {filter === 'all' && 'No tasks yet'}
            {filter === 'pending' && 'No pending tasks'}
            {filter === 'completed' && 'No completed tasks'}
          </h3>
          <p className="text-gray-600">
            {filter === 'all' && 'Create your first task to get started!'}
            {filter === 'pending' && 'All your tasks are completed!'}
            {filter === 'completed' && 'Complete some tasks to see them here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
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
      )}
    </div>
  )
}
