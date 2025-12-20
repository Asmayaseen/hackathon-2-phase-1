'use client'

import { useState } from 'react'

interface Task {
  id: number
  title: string
  description?: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  due_date?: string
  created_at: string
}

interface TaskItemProps {
  task: Task
  onToggleComplete: (id: number) => void
  onUpdateTask: (id: number, updates: Partial<Task>) => void
  onDeleteTask: (id: number) => void
  isSelected?: boolean
  onToggleSelect?: (id: number) => void
  isFocused?: boolean
}

export default function TaskItem({
  task,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
  isSelected = false,
  onToggleSelect,
  isFocused = false
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || '')

  const priorityStyles = {
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
    medium: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
    low: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  }

  const getDueDateStatus = (dueDate?: string) => {
    if (!dueDate) return null
    const due = new Date(dueDate)
    const now = new Date()
    const diffMs = due.getTime() - now.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const absDays = diffDays < 0 ? -diffDays : diffDays

    if (diffMs < 0) {
      return { text: 'Overdue by ' + absDays + ' days', style: 'text-red-600 dark:text-red-400' }
    } else if (diffDays === 0) {
      return { text: 'Due today', style: 'text-amber-600 dark:text-amber-400' }
    } else if (diffDays <= 3) {
      return { text: 'Due in ' + diffDays + ' days', style: 'text-blue-600 dark:text-blue-400' }
    }
    return { text: 'Due ' + due.toLocaleDateString(), style: 'text-muted-foreground' }
  }

  const dueDateStatus = getDueDateStatus(task.due_date)

  const handleSave = () => {
    onUpdateTask(task.id, { title: editTitle, description: editDescription })
    setIsEditing(false)
  }

  return (
    <div className={
      'relative group bg-white/80 dark:bg-black/30 border rounded-lg p-4 hover:shadow-lg backdrop-blur-sm transition-all ' +
      (task.completed ? 'opacity-60 ' : '') +
      (isSelected ? 'border-cyan-500 bg-cyan-500/10 ring-2 ring-cyan-500 ' : 'border-cyan-500/40 dark:border-cyan-500/20 hover:border-cyan-500/60 dark:hover:border-cyan-500/40 ') +
      (isFocused ? 'ring-2 ring-fuchsia-500 ' : '')
    }>
      <div className="flex items-start gap-3">
        {/* Selection checkbox (if onToggleSelect is provided) */}
        {onToggleSelect && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(task.id)}
            className="mt-1 w-4 h-4 rounded border-2 border-gray-400 dark:border-gray-600 text-cyan-600 focus:ring-2 focus:ring-cyan-500 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
        )}

        <button
          onClick={() => onToggleComplete(task.id)}
          className={'mt-1 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ' + (
            task.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-400 dark:border-gray-600 hover:border-cyan-500'
          )}
        >
          {task.completed && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-black/50 border border-cyan-500/40 dark:border-cyan-500/30 rounded text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-black/50 border border-fuchsia-500/40 dark:border-fuchsia-500/30 rounded text-gray-900 dark:text-white focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-400 resize-none"
                rows={2}
              />
              <div className="flex gap-2">
                <button onClick={handleSave} className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded text-sm transition-colors">Save</button>
                <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 rounded text-sm transition-colors">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h3 className={'font-semibold text-gray-900 dark:text-white ' + (task.completed ? 'line-through' : '')}>
                {task.title}
              </h3>
              {task.description && (
                <p className={'text-sm text-gray-600 dark:text-gray-400 mt-1 ' + (task.completed ? 'line-through' : '')}>
                  {task.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className={'px-2 py-1 rounded-full text-xs font-medium border ' + priorityStyles[task.priority]}>
                  {task.priority.toUpperCase()}
                </span>
                {dueDateStatus && (
                  <span className={'text-xs flex items-center gap-1 ' + dueDateStatus.style}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {dueDateStatus.text}
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 hover:bg-cyan-500/20 rounded transition-colors"
            >
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="p-2 hover:bg-red-500/20 rounded transition-colors"
            >
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
