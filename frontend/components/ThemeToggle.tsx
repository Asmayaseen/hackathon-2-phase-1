"use client"

import { useTheme } from './ThemeProvider'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [showMenu, setShowMenu] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="p-2 rounded-lg w-9 h-9 bg-secondary/50 animate-pulse" />
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 rounded-lg hover:bg-secondary transition-colors"
        aria-label="Toggle theme"
        aria-expanded={showMenu}
      >
        {/* Sun icon for light mode */}
        <svg
          className="w-5 h-5 dark:hidden"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        {/* Moon icon for dark mode */}
        <svg
          className="w-5 h-5 hidden dark:block"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          {/* Backdrop to close menu when clicking outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />

          <div className="absolute right-0 mt-2 w-36 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
            <button
              onClick={() => {
                setTheme('light')
                setShowMenu(false)
              }}
              className={`w-full text-left px-4 py-2 hover:bg-secondary flex items-center gap-2 text-sm ${
                theme === 'light' ? 'text-primary font-medium bg-secondary/50' : ''
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Light
            </button>

            <button
              onClick={() => {
                setTheme('dark')
                setShowMenu(false)
              }}
              className={`w-full text-left px-4 py-2 hover:bg-secondary flex items-center gap-2 text-sm ${
                theme === 'dark' ? 'text-primary font-medium bg-secondary/50' : ''
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              Dark
            </button>

            <button
              onClick={() => {
                setTheme('system')
                setShowMenu(false)
              }}
              className={`w-full text-left px-4 py-2 hover:bg-secondary flex items-center gap-2 text-sm ${
                theme === 'system' ? 'text-primary font-medium bg-secondary/50' : ''
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              System
            </button>
          </div>
        </>
      )}
    </div>
  )
}
