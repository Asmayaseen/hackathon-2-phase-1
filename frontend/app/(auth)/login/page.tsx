'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)

    // Mock authentication - just redirect to dashboard
    setTimeout(() => {
      router.push('/dashboard')
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950/50 dark:to-indigo-950/50 px-4 transition-theme">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-xl shadow-lg border border-border">
        
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome Back
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to your account
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 transition-theme"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 transition-theme"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don&apos;t have an account? </span>
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign Up
          </Link>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
