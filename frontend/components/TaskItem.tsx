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
    high: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
    medium: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    low: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700',
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
      'bg-card border rounded-lg p-4 hover:shadow-md transition-all ' +
      (task.completed ? 'opacity-60 ' : '') +
      (isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500 ' : 'border-border ') +
      (isFocused ? 'ring-2 ring-purple-500 ' : '')
    }>
      <div className="flex items-start gap-3">
        {/* Selection checkbox (if onToggleSelect is provided) */}
        {onToggleSelect && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(task.id)}
            className="mt-1 w-4 h-4 rounded border-2 border-border text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
        )}

        <button
          onClick={() => onToggleComplete(task.id)}
          className={'mt-1 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ' + (
            task.completed
              ? 'bg-green-500 border-green-500'
              : 'border-border hover:border-blue-500'
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
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground"
                rows={2}
              />
              <div className="flex gap-2">
                <button onClick={handleSave} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Save</button>
                <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-secondary text-foreground rounded text-sm">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h3 className={'font-semibold text-foreground ' + (task.completed ? 'line-through' : '')}>
                {task.title}
              </h3>
              {task.description && (
                <p className={'text-sm text-muted-foreground mt-1 ' + (task.completed ? 'line-through' : '')}>
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
              className="p-2 hover:bg-secondary rounded transition-colors"
            >
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
            >
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
