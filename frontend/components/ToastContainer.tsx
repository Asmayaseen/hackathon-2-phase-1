"use client"

import Toast from './Toast'
import type { Toast as ToastType } from './ToastProvider'

interface ToastContainerProps {
  toasts: ToastType[]
  onDismiss: (id: string) => void
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-md w-full px-4 sm:px-0"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Show maximum of 3 toasts, newest at top */}
      {toasts.slice(-3).reverse().map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
