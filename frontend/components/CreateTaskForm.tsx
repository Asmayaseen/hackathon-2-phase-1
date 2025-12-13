'use client'

import { useState } from 'react'

interface CreateTaskFormProps {
  onSubmit: (data: {
    title: string
    description?: string
    priority: 'low' | 'medium' | 'high'
    due_date?: string
  }) => void
  onCancel: () => void
}

export default function CreateTaskForm({ onSubmit, onCancel }: CreateTaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      due_date: dueDate || undefined,
    })

    setTitle('')
    setDescription('')
    setPriority('medium')
    setDueDate('')
  }

  const setQuickDate = (days: number) => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    const dateString = date.toISOString().slice(0, 16)
    setDueDate(dateString)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Create New Task</h2>
            <button
              type="button"
              onClick={onCancel}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title..."
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details..."
                rows={3}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Priority
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setPriority('low')}
                  className={'flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all ' + (
                    priority === 'low'
                      ? 'border-gray-400 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      : 'border-border bg-card text-muted-foreground hover:border-gray-300'
                  )}
                >
                  Low
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('medium')}
                  className={'flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all ' + (
                    priority === 'medium'
                      ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'border-border bg-card text-muted-foreground hover:border-blue-300'
                  )}
                >
                  Medium
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('high')}
                  className={'flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all ' + (
                    priority === 'high'
                      ? 'border-red-500 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      : 'border-border bg-card text-muted-foreground hover:border-red-300'
                  )}
                >
                  High
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Due Date
              </label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setQuickDate(0)}
                  className="px-3 py-1.5 text-xs bg-secondary hover:bg-secondary/80 text-foreground rounded-md transition-colors"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDate(1)}
                  className="px-3 py-1.5 text-xs bg-secondary hover:bg-secondary/80 text-foreground rounded-md transition-colors"
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDate(7)}
                  className="px-3 py-1.5 text-xs bg-secondary hover:bg-secondary/80 text-foreground rounded-md transition-colors"
                >
                  Next Week
                </button>
                {dueDate && (
                  <button
                    type="button"
                    onClick={() => setDueDate('')}
                    className="px-3 py-1.5 text-xs bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-md transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
