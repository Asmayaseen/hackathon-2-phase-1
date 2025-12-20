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
    <div className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative group max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Neon glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-purple-500 rounded-xl blur opacity-30 dark:opacity-50" />

        <div className="relative bg-white/95 dark:bg-black/95 border border-cyan-500/50 dark:border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-purple-600 dark:from-cyan-400 dark:via-fuchsia-400 dark:to-purple-400 bg-clip-text text-transparent">Create New Task</h2>
            <button
              type="button"
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-2">
                Title <span className="text-red-600 dark:text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title..."
                className="w-full px-4 py-2.5 bg-white dark:bg-black/50 border border-cyan-500/50 dark:border-cyan-500/30 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 backdrop-blur-sm transition-all"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-fuchsia-600 dark:text-fuchsia-400 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details..."
                rows={3}
                className="w-full px-4 py-2.5 bg-white dark:bg-black/50 border border-fuchsia-500/50 dark:border-fuchsia-500/30 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-400 backdrop-blur-sm resize-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-600 dark:text-purple-400 mb-3">
                Priority
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setPriority('low')}
                  className={'flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all backdrop-blur-sm ' + (
                    priority === 'low'
                      ? 'border-gray-500 bg-gray-400/30 text-gray-700 dark:text-gray-300'
                      : 'border-gray-400/50 dark:border-gray-500/30 bg-gray-100 dark:bg-black/30 text-gray-600 dark:text-gray-500 hover:border-gray-500/70 dark:hover:border-gray-400/50'
                  )}
                >
                  Low
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('medium')}
                  className={'flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all backdrop-blur-sm ' + (
                    priority === 'medium'
                      ? 'border-fuchsia-600 bg-fuchsia-500/30 text-fuchsia-700 dark:text-fuchsia-300'
                      : 'border-fuchsia-500/50 dark:border-fuchsia-500/30 bg-fuchsia-50 dark:bg-black/30 text-fuchsia-600 dark:text-fuchsia-500 hover:border-fuchsia-600/70 dark:hover:border-fuchsia-400/50'
                  )}
                >
                  Medium
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('high')}
                  className={'flex-1 px-4 py-3 rounded-lg border-2 font-medium transition-all backdrop-blur-sm ' + (
                    priority === 'high'
                      ? 'border-red-600 bg-red-500/30 text-red-700 dark:text-red-300'
                      : 'border-red-500/50 dark:border-red-500/30 bg-red-50 dark:bg-black/30 text-red-600 dark:text-red-500 hover:border-red-600/70 dark:hover:border-red-400/50'
                  )}
                >
                  High
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-2">
                Due Date
              </label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-white dark:bg-black/50 border border-purple-500/50 dark:border-purple-500/30 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 backdrop-blur-sm transition-all"
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setQuickDate(0)}
                  className="px-3 py-1.5 text-xs bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-400 dark:border-cyan-500/30 hover:bg-cyan-200 dark:hover:bg-cyan-500/30 text-cyan-700 dark:text-cyan-400 rounded-md backdrop-blur-sm transition-colors"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDate(1)}
                  className="px-3 py-1.5 text-xs bg-fuchsia-100 dark:bg-fuchsia-500/20 border border-fuchsia-400 dark:border-fuchsia-500/30 hover:bg-fuchsia-200 dark:hover:bg-fuchsia-500/30 text-fuchsia-700 dark:text-fuchsia-400 rounded-md backdrop-blur-sm transition-colors"
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDate(7)}
                  className="px-3 py-1.5 text-xs bg-purple-100 dark:bg-purple-500/20 border border-purple-400 dark:border-purple-500/30 hover:bg-purple-200 dark:hover:bg-purple-500/30 text-purple-700 dark:text-purple-400 rounded-md backdrop-blur-sm transition-colors"
                >
                  Next Week
                </button>
                {dueDate && (
                  <button
                    type="button"
                    onClick={() => setDueDate('')}
                    className="px-3 py-1.5 text-xs bg-red-100 dark:bg-red-500/20 border border-red-400 dark:border-red-500/30 hover:bg-red-200 dark:hover:bg-red-500/30 text-red-700 dark:text-red-400 rounded-md backdrop-blur-sm transition-colors"
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
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-500/20 border border-gray-400 dark:border-gray-500/30 hover:bg-gray-300 dark:hover:bg-gray-500/30 text-gray-700 dark:text-gray-300 rounded-lg font-medium backdrop-blur-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="relative group flex-1"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-purple-500 rounded-lg blur opacity-30 dark:opacity-40 group-hover:opacity-50 dark:group-hover:opacity-70 transition duration-300" />
              <div className="relative px-6 py-3 bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-purple-600 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                Create Task
              </div>
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}
