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
      <div className="group relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 dark:from-cyan-500 dark:to-cyan-600 rounded-xl blur opacity-20 dark:opacity-30 group-hover:opacity-40 dark:group-hover:opacity-50 transition duration-300" />
        <div className="relative bg-gradient-to-br from-cyan-400 to-cyan-500 dark:from-cyan-500 dark:to-cyan-600 rounded-xl p-6 text-white shadow-lg hover:shadow-cyan-500/30 dark:hover:shadow-cyan-500/50 transition-shadow border border-cyan-300/30 dark:border-cyan-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-50 dark:text-cyan-100 text-sm font-medium mb-1">Total Tasks</p>
              <p className="text-4xl font-bold">{stats.total}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="group relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-400 to-fuchsia-500 dark:from-fuchsia-500 dark:to-fuchsia-600 rounded-xl blur opacity-20 dark:opacity-30 group-hover:opacity-40 dark:group-hover:opacity-50 transition duration-300" />
        <div className="relative bg-gradient-to-br from-fuchsia-400 to-fuchsia-500 dark:from-fuchsia-500 dark:to-fuchsia-600 rounded-xl p-6 text-white shadow-lg hover:shadow-fuchsia-500/30 dark:hover:shadow-fuchsia-500/50 transition-shadow border border-fuchsia-300/30 dark:border-fuchsia-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-fuchsia-50 dark:text-fuchsia-100 text-sm font-medium mb-1">Pending</p>
              <p className="text-4xl font-bold">{stats.pending}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="group relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-purple-500 dark:from-purple-500 dark:to-purple-600 rounded-xl blur opacity-20 dark:opacity-30 group-hover:opacity-40 dark:group-hover:opacity-50 transition duration-300" />
        <div className="relative bg-gradient-to-br from-purple-400 to-purple-500 dark:from-purple-500 dark:to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-purple-500/30 dark:hover:shadow-purple-500/50 transition-shadow border border-purple-300/30 dark:border-purple-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-50 dark:text-purple-100 text-sm font-medium mb-1">Completed</p>
              <p className="text-4xl font-bold">{stats.completed}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="group relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 dark:from-cyan-500 dark:via-fuchsia-500 dark:to-purple-500 rounded-xl blur opacity-20 dark:opacity-30 group-hover:opacity-40 dark:group-hover:opacity-50 transition duration-300" />
        <div className="relative bg-gradient-to-br from-cyan-400 via-fuchsia-400 to-purple-500 dark:from-cyan-500 dark:via-fuchsia-500 dark:to-purple-600 rounded-xl p-6 text-white shadow-lg hover:shadow-purple-500/30 dark:hover:shadow-purple-500/50 transition-shadow border border-purple-300/30 dark:border-purple-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-50 dark:text-purple-100 text-sm font-medium mb-1">Completion Rate</p>
              <p className="text-4xl font-bold">{stats.completionRate}%</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
