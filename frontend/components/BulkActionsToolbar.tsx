'use client'

interface BulkActionsToolbarProps {
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onDeselectAll: () => void
  onBulkComplete: () => void
  onBulkUncomplete: () => void
  onBulkDelete: () => void
  onBulkPriority: (priority: 'low' | 'medium' | 'high') => void
}

export default function BulkActionsToolbar({
  selectedCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
  onBulkComplete,
  onBulkUncomplete,
  onBulkDelete,
  onBulkPriority,
}: BulkActionsToolbarProps) {
  if (selectedCount === 0) return null

  const allSelected = selectedCount === totalCount

  return (
    <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 shadow-lg border-b-2 border-blue-700 dark:border-blue-800">
      <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        {/* Left: Selection info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={allSelected ? onDeselectAll : onSelectAll}
              className="w-4 h-4 rounded border-white/30 text-blue-600 focus:ring-2 focus:ring-white/50 cursor-pointer"
            />
            <span className="text-white font-semibold text-sm">
              {selectedCount} selected
            </span>
          </div>
        </div>

        {/* Right: Action buttons */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Complete/Uncomplete */}
          <button
            onClick={onBulkComplete}
            className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors backdrop-blur-sm border border-white/20"
            title="Mark as complete (Shift+C)"
          >
            <span className="hidden sm:inline">✓ Complete</span>
            <span className="sm:hidden">✓</span>
          </button>

          <button
            onClick={onBulkUncomplete}
            className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors backdrop-blur-sm border border-white/20"
            title="Mark as incomplete"
          >
            <span className="hidden sm:inline">○ Uncomplete</span>
            <span className="sm:hidden">○</span>
          </button>

          {/* Priority dropdown */}
          <div className="relative group">
            <button className="px-3 py-1.5 text-xs font-medium bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors backdrop-blur-sm border border-white/20 flex items-center gap-1">
              🎯 Priority
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <button
                onClick={() => onBulkPriority('high')}
                className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-t-lg transition-colors"
              >
                🔴 High
              </button>
              <button
                onClick={() => onBulkPriority('medium')}
                className="w-full px-3 py-2 text-left text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                🔵 Medium
              </button>
              <button
                onClick={() => onBulkPriority('low')}
                className="w-full px-3 py-2 text-left text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-b-lg transition-colors"
              >
                ⚪ Low
              </button>
            </div>
          </div>

          {/* Delete */}
          <button
            onClick={onBulkDelete}
            className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium bg-red-500/90 hover:bg-red-600 text-white rounded-lg transition-colors shadow-md"
            title="Delete selected (Shift+D)"
          >
            <span className="hidden sm:inline">🗑️ Delete</span>
            <span className="sm:hidden">🗑️</span>
          </button>

          {/* Deselect */}
          <button
            onClick={onDeselectAll}
            className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors backdrop-blur-sm border border-white/20"
            title="Deselect all (Ctrl+D)"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
