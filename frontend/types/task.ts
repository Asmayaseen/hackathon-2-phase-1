/**
 * Task Types
 *
 * TypeScript type definitions for task-related data structures.
 */

export interface Task {
  id: number
  user_id: string
  title: string
  description?: string
  completed: boolean
  created_at: string
  updated_at: string
}

export interface TaskCreate {
  title: string
  description?: string
}

export interface TaskUpdate {
  title?: string
  description?: string
}

export interface TaskListResponse {
  tasks: Task[]
  total: number
  completed: number
  pending: number
}
