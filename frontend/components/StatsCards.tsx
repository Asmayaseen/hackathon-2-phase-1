'use client'

interface StatsCardsProps {
  stats: {
    total: number
    pending: number
    completed: number
    completionRate: number
  }
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Tasks */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium mb-1">Total Tasks</p>
            <p className="text-4xl font-bold">{stats.total}</p>
          </div>
          <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-amber-100 text-sm font-medium mb-1">Pending</p>
            <p className="text-4xl font-bold">{stats.pending}</p>
          </div>
          <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium mb-1">Completed</p>
            <p className="text-4xl font-bold">{stats.completed}</p>
          </div>
          <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium mb-1">Completion Rate</p>
            <p className="text-4xl font-bold">{stats.completionRate}%</p>
          </div>
          <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
