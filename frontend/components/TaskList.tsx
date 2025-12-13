'use client'

import TaskItem from './TaskItem'

interface Task {
  id: number
  title: string
  description?: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  due_date?: string
  created_at: string
}

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (id: number) => void
  onUpdateTask: (id: number, updates: Partial<Task>) => void
  onDeleteTask: (id: number) => void
  selectedTaskIds?: Set<number>
  onToggleSelect?: (id: number) => void
  focusedTaskIndex?: number
}

export default function TaskList({
  tasks,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
  selectedTaskIds,
  onToggleSelect,
  focusedTaskIndex = -1
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-12 text-center">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No tasks found</h3>
        <p className="text-muted-foreground">Create your first task to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          isSelected={selectedTaskIds?.has(task.id)}
          onToggleSelect={onToggleSelect}
          isFocused={index === focusedTaskIndex}
        />
      ))}
    </div>
  )
}
