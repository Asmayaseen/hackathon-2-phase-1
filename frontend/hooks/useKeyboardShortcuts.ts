'use client'

import { useEffect, useCallback } from 'react'

export interface KeyboardShortcutHandlers {
  onNewTask?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onToggleComplete?: () => void
  onNavigateUp?: () => void
  onNavigateDown?: () => void
  onSelectAll?: () => void
  onDeselectAll?: () => void
  onBulkComplete?: () => void
  onBulkDelete?: () => void
  onExport?: () => void
  onImport?: () => void
  onFocusSearch?: () => void
  onShowShortcuts?: () => void
}

export function useKeyboardShortcuts(handlers: KeyboardShortcutHandlers) {
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    // Ignore if user is typing in an input/textarea
    const target = e.target as HTMLElement
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      // Allow Ctrl+K even in inputs
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        handlers.onFocusSearch?.()
      }
      return
    }

    // General shortcuts
    if (e.key === '?' && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault()
      handlers.onShowShortcuts?.()
      return
    }

    // Ctrl shortcuts
    if (e.ctrlKey && !e.shiftKey && !e.altKey) {
      switch (e.key.toLowerCase()) {
        case 'k':
          e.preventDefault()
          handlers.onFocusSearch?.()
          break
        case 'a':
          e.preventDefault()
          handlers.onSelectAll?.()
          break
        case 'd':
          e.preventDefault()
          handlers.onDeselectAll?.()
          break
        case 'e':
          e.preventDefault()
          handlers.onExport?.()
          break
        case 'i':
          e.preventDefault()
          handlers.onImport?.()
          break
      }
      return
    }

    // Shift shortcuts
    if (e.shiftKey && !e.ctrlKey && !e.altKey) {
      switch (e.key.toLowerCase()) {
        case 'c':
          e.preventDefault()
          handlers.onBulkComplete?.()
          break
        case 'd':
          e.preventDefault()
          handlers.onBulkDelete?.()
          break
      }
      return
    }

    // Single key shortcuts (no modifiers)
    if (!e.ctrlKey && !e.shiftKey && !e.altKey) {
      switch (e.key.toLowerCase()) {
        case 'n':
          e.preventDefault()
          handlers.onNewTask?.()
          break
        case 'e':
          e.preventDefault()
          handlers.onEdit?.()
          break
        case 'd':
          e.preventDefault()
          handlers.onDelete?.()
          break
        case 'j':
          e.preventDefault()
          handlers.onNavigateDown?.()
          break
        case 'k':
          e.preventDefault()
          handlers.onNavigateUp?.()
          break
        case 'enter':
          e.preventDefault()
          handlers.onToggleComplete?.()
          break
      }
      return
    }

    // Arrow keys
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      handlers.onNavigateUp?.()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      handlers.onNavigateDown?.()
    }
  }, [handlers])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])
}
