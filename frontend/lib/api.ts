/**
 * API Client Utility
 *
 * This file provides functions to interact with the backend API.
 * All functions automatically include JWT authentication headers.
 */

import { authClient } from './auth-client'
import type { Task, TaskCreate, TaskUpdate, TaskListResponse } from '@/types/task'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

/**
 * Get authentication headers with JWT token
 */
async function getAuthHeaders(): Promise<HeadersInit> {
  const session = await authClient.getSession()

  if (!session?.data) {
    throw new Error('Not authenticated. Please sign in.')
  }

  const token = session.data.session.token
  if (!token) {
    throw new Error('No authentication token found')
  }

  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}

/**
 * Handle API response errors
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }))
    throw new Error(error.detail || `HTTP ${response.status}: ${response.statusText}`)
  }
  return response.json()
}

/**
 * API client for task management
 */
export const api = {
  /**
   * Get all tasks for the authenticated user
   */
  async getTasks(
    userId: string,
    status: 'all' | 'pending' | 'completed' = 'all'
  ): Promise<TaskListResponse> {
    const headers = await getAuthHeaders()
    const response = await fetch(
      `${API_URL}/api/${userId}/tasks?status=${status}`,
      {
        method: 'GET',
        headers,
        cache: 'no-store',
      }
    )
    return handleResponse<TaskListResponse>(response)
  },

  /**
   * Create a new task
   */
  async createTask(
    userId: string,
    data: TaskCreate
  ): Promise<Task> {
    const headers = await getAuthHeaders()
    const response = await fetch(
      `${API_URL}/api/${userId}/tasks`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      }
    )
    return handleResponse<Task>(response)
  },

  /**
   * Get a specific task by ID
   */
  async getTask(userId: string, taskId: number): Promise<Task> {
    const headers = await getAuthHeaders()
    const response = await fetch(
      `${API_URL}/api/${userId}/tasks/${taskId}`,
      {
        method: 'GET',
        headers,
        cache: 'no-store',
      }
    )
    return handleResponse<Task>(response)
  },

  /**
   * Update a task
   */
  async updateTask(
    userId: string,
    taskId: number,
    data: TaskUpdate
  ): Promise<Task> {
    const headers = await getAuthHeaders()
    const response = await fetch(
      `${API_URL}/api/${userId}/tasks/${taskId}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      }
    )
    return handleResponse<Task>(response)
  },

  /**
   * Delete a task
   */
  async deleteTask(
    userId: string,
    taskId: number
  ): Promise<{ message: string; task_id: number }> {
    const headers = await getAuthHeaders()
    const response = await fetch(
      `${API_URL}/api/${userId}/tasks/${taskId}`,
      {
        method: 'DELETE',
        headers,
      }
    )
    return handleResponse<{ message: string; task_id: number }>(response)
  },

  /**
   * Toggle task completion status
   */
  async toggleTask(userId: string, taskId: number): Promise<Task> {
    const headers = await getAuthHeaders()
    const response = await fetch(
      `${API_URL}/api/${userId}/tasks/${taskId}/complete`,
      {
        method: 'PATCH',
        headers,
      }
    )
    return handleResponse<Task>(response)
  },
}
