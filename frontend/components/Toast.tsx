"use client"

import { useEffect, useState } from 'react'
import type { Toast as ToastType } from './ToastProvider'

interface ToastProps {
  toast: ToastType
  onDismiss: (id: string) => void
}

const icons = {
  success: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
}

const styles = {
  success: 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200',
  error: 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200',
  warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 text-amber-800 dark:text-amber-200',
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-200',
}

const progressBarColors = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  warning: 'bg-amber-600',
  info: 'bg-blue-600',
}

export default function Toast({ toast, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(100)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (isPaused || !toast.duration) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (toast.duration! / 100))
        return newProgress <= 0 ? 0 : newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPaused, toast.duration])

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => onDismiss(toast.id), 300) // Wait for exit animation
  }

  return (
    <div
      className={`
        ${isVisible ? 'animate-slide-in-right' : 'animate-slide-out-right'}
        max-w-sm w-full border-l-4 ${styles[toast.type]}
        rounded-lg shadow-lg pointer-events-auto overflow-hidden
      `}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="alert"
      aria-live="polite"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {icons[toast.type]}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">
              {toast.message}
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="ml-4 flex-shrink-0 inline-flex text-current/60 hover:text-current/80 focus:outline-none transition-colors"
            aria-label="Dismiss notification"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-black/10 dark:bg-white/10">
        <div
          className={`h-full ${progressBarColors[toast.type]} transition-all duration-100 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
