export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold text-gray-900">
          🎯 Evolution of Todo
        </h1>
        <p className="text-2xl text-gray-600">
          Phase II - Full-Stack Web Application
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <a
            href="/signup"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Sign In
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-12">
          Built with Next.js 16+ • FastAPI • PostgreSQL
        </p>
      </div>
    </main>
  )
}
