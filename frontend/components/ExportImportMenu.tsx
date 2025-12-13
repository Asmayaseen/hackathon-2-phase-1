'use client'

import { useRef } from 'react'
import { useToast } from './ToastProvider'

interface Task {
  id: number
  user_id: string
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  due_date?: string
  completed: boolean
  created_at: string
  updated_at: string
}

interface ExportImportMenuProps {
  tasks: Task[]
  onImport: (tasks: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>[]) => void
}

export default function ExportImportMenu({ tasks, onImport }: ExportImportMenuProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { showToast } = useToast()

  // Export to JSON
  const exportToJSON = () => {
    try {
      const dataStr = JSON.stringify(tasks, null, 2)
      const blob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `tasks-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      showToast('success', `Exported ${tasks.length} tasks to JSON`)
    } catch (error) {
      showToast('error', 'Failed to export tasks to JSON')
      console.error('Export JSON error:', error)
    }
  }

  // Export to CSV
  const exportToCSV = () => {
    try {
      const headers = ['ID', 'Title', 'Description', 'Priority', 'Due Date', 'Completed', 'Created At']
      const rows = tasks.map(task => [
        task.id,
        `"${task.title.replace(/"/g, '""')}"`,
        `"${(task.description || '').replace(/"/g, '""')}"`,
        task.priority,
        task.due_date || '',
        task.completed ? 'Yes' : 'No',
        task.created_at || ''
      ])

      const csv = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n')

      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `tasks-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      showToast('success', `Exported ${tasks.length} tasks to CSV`)
    } catch (error) {
      showToast('error', 'Failed to export tasks to CSV')
      console.error('Export CSV error:', error)
    }
  }

  // Import from file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    const fileType = file.name.endsWith('.json') ? 'json' : 'csv'

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string

        if (fileType === 'json') {
          const importedTasks = JSON.parse(content)
          if (!Array.isArray(importedTasks)) {
            throw new Error('Invalid JSON format: expected an array')
          }

          const validTasks = importedTasks.map(task => ({
            title: task.title,
            description: task.description || '',
            priority: task.priority || 'medium',
            due_date: task.due_date,
            completed: task.completed || false
          }))

          onImport(validTasks)
          showToast('success', `Imported ${validTasks.length} tasks from JSON`)
        } else {
          // Parse CSV
          const lines = content.split('\n')
          const headers = lines[0].split(',')
          const tasks = lines.slice(1)
            .filter(line => line.trim())
            .map(line => {
              const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || []
              const cleanValue = (val: string) => val.replace(/^"|"$/g, '').replace(/""/g, '"')

              return {
                title: cleanValue(values[1] || ''),
                description: cleanValue(values[2] || ''),
                priority: (cleanValue(values[3]) || 'medium') as 'low' | 'medium' | 'high',
                due_date: cleanValue(values[4]) || undefined,
                completed: cleanValue(values[5]) === 'Yes'
              }
            })
            .filter(task => task.title) // Only import tasks with titles

          onImport(tasks)
          showToast('success', `Imported ${tasks.length} tasks from CSV`)
        }
      } catch (error) {
        showToast('error', `Failed to import ${fileType.toUpperCase()}`)
        console.error('Import error:', error)
      }

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }

    reader.readAsText(file)
  }

  const triggerImport = (type: 'json' | 'csv') => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'json' ? '.json' : '.csv'
      fileInputRef.current.click()
    }
  }

  return (
    <div className="relative group">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Menu button */}
      <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-medium">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export / Import
      </button>

      {/* Dropdown menu */}
      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
        {/* Export section */}
        <div className="p-2">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Export
          </div>
          <button
            onClick={exportToJSON}
            className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors flex items-center gap-2"
          >
            <span className="text-lg">📄</span>
            <div>
              <div className="font-medium">Export to JSON</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Full data with metadata
              </div>
            </div>
          </button>
          <button
            onClick={exportToCSV}
            className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors flex items-center gap-2"
          >
            <span className="text-lg">📊</span>
            <div>
              <div className="font-medium">Export to CSV</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Spreadsheet format
              </div>
            </div>
          </button>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Import section */}
        <div className="p-2">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Import
          </div>
          <button
            onClick={() => triggerImport('json')}
            className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors flex items-center gap-2"
          >
            <span className="text-lg">📥</span>
            <div>
              <div className="font-medium">Import from JSON</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Restore backup
              </div>
            </div>
          </button>
          <button
            onClick={() => triggerImport('csv')}
            className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors flex items-center gap-2"
          >
            <span className="text-lg">📈</span>
            <div>
              <div className="font-medium">Import from CSV</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                From spreadsheet
              </div>
            </div>
          </button>
        </div>

        {/* Info footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-2">
          <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">
            💡 Keyboard: <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+E</kbd> Export, <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+I</kbd> Import
          </div>
        </div>
      </div>
    </div>
  )
}
