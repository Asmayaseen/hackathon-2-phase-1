/**
 * Header Component
 *
 * Dashboard header with branding, navigation, user menu, and theme toggle
 */

"use client"

import { useState } from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import KeyboardShortcutsModal from './KeyboardShortcutsModal'

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)

  // Mock user data - replace with actual auth later
  const mockUser = {
    name: 'Demo User',
    email: 'demo@taskflow.com'
  }

  const handleLogout = () => {
    window.location.href = '/'
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm transition-theme">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo and Branding */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Home Icon */}
            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-secondary transition-colors group"
              title="Go to Home"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-foreground transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="hidden sm:inline text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Home
              </span>
            </Link>

            {/* Separator */}
            <div className="h-6 sm:h-8 w-px bg-border"></div>

            {/* Logo */}
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-xl sm:text-2xl">✓</span>
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TaskFlow
              </span>
            </div>
          </div>

          {/* Right Side: Theme Toggle + User Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            <div className="relative">
              <div>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-1.5 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-semibold">
                    {mockUser.name[0].toUpperCase()}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-medium text-foreground text-sm">
                      {mockUser.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {mockUser.email}
                    </p>
                  </div>
                  <svg
                    className={`hidden sm:block w-4 h-4 text-muted-foreground transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg shadow-lg border border-border py-2 transition-theme">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="font-medium text-foreground">
                        {mockUser.name}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {mockUser.email}
                      </p>
                    </div>
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-secondary"
                    >
                      Dashboard
                    </a>
                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        alert('Settings feature coming soon!')
                      }}
                      className="w-full text-left block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      ⚙️ Settings
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        setShowShortcuts(true)
                      }}
                      className="w-full text-left block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      ⌨️ Keyboard Shortcuts
                    </button>
                    <div className="border-t border-border mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </header>
  )
}
