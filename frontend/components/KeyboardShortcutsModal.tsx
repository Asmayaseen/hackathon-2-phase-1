'use client'

import { useEffect } from 'react'

interface KeyboardShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
}

const shortcuts = [
  {
    category: 'General',
    items: [
      { key: '?', description: 'Show keyboard shortcuts' },
      { key: 'Esc', description: 'Close modals' },
      { key: 'Ctrl + K', description: 'Focus search bar' },
    ]
  },
  {
    category: 'Task Management',
    items: [
      { key: 'N', description: 'Create new task' },
      { key: 'E', description: 'Edit selected task' },
      { key: 'D', description: 'Delete selected task' },
      { key: 'Enter', description: 'Toggle task completion' },
    ]
  },
  {
    category: 'Navigation',
    items: [
      { key: '↑', description: 'Navigate up' },
      { key: '↓', description: 'Navigate down' },
      { key: 'J', description: 'Next task' },
      { key: 'K', description: 'Previous task' },
    ]
  },
  {
    category: 'Bulk Operations',
    items: [
      { key: 'Ctrl + A', description: 'Select all tasks' },
      { key: 'Ctrl + D', description: 'Deselect all' },
      { key: 'Shift + C', description: 'Complete selected' },
      { key: 'Shift + D', description: 'Delete selected' },
    ]
  },
  {
    category: 'Export/Import',
    items: [
      { key: 'Ctrl + E', description: 'Export tasks' },
      { key: 'Ctrl + I', description: 'Import tasks' },
    ]
  }
]

export default function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                ⌨️ Keyboard Shortcuts
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                Master these shortcuts to work faster
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 space-y-4 sm:space-y-6">
          {shortcuts.map((section) => (
            <div key={section.category}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.items.map((shortcut) => (
                  <div
                    key={shortcut.key}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {shortcut.description}
                    </span>
                    <kbd className="px-3 py-1.5 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <p className="text-xs text-center text-gray-600 dark:text-gray-400">
            Press <kbd className="px-2 py-1 text-xs font-semibold bg-gray-200 dark:bg-gray-700 rounded">?</kbd> anytime to view shortcuts
            • <kbd className="px-2 py-1 text-xs font-semibold bg-gray-200 dark:bg-gray-700 rounded">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  )
}
