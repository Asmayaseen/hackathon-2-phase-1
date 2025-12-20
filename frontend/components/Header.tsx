/**
 * Header Component - NEON EDITION
 *
 * Cyberpunk-style header with neon effects, navigation, user menu, and theme toggle
 */

"use client"

import { useState } from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import KeyboardShortcutsModal from './KeyboardShortcutsModal'
import { Sparkles, Bot, Home, Settings, Keyboard, LogOut } from 'lucide-react'

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
    <header className="relative z-50 border-b border-purple-500/30 bg-slate-950/80 backdrop-blur-md shadow-lg shadow-purple-500/10">
      {/* Neon glow effect on top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo and Branding */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Home Icon */}
            <Link
              href="/"
              className="group relative flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-slate-900/50 transition-all duration-300"
              title="Go to Home"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-lg blur transition-all duration-300"></div>
              <Home className="relative w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
              <span className="relative hidden sm:inline text-sm font-medium text-slate-400 group-hover:text-cyan-400 transition-colors duration-300">
                Home
              </span>
            </Link>

            {/* Separator with neon effect */}
            <div className="h-6 sm:h-8 w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"></div>

            {/* Logo with Neon Effect */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                TaskFlow
              </span>
            </div>
          </div>

          {/* Center Navigation - Chat Link with Neon Effect */}
          <div className="hidden md:flex items-center">
            <Link
              href="/chat"
              className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl overflow-hidden transition-all duration-300"
              title="AI Chat Assistant"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>

              <Bot className="relative w-5 h-5 text-purple-400 group-hover:text-cyan-400 transition-colors duration-300" />
              <span className="relative text-sm font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-pink-400 transition-all duration-300">
                AI Assistant
              </span>

              {/* Animated dots */}
              <div className="relative flex gap-1">
                <span className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></span>
                <span className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-100"></span>
                <span className="w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-200"></span>
              </div>
            </Link>
          </div>

          {/* Right Side: Theme Toggle + User Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu with Neon Effect */}
            <div className="relative">
              <div>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="group relative flex items-center gap-1.5 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl hover:bg-slate-900/50 transition-all duration-300"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold shadow-lg">
                      {mockUser.name[0].toUpperCase()}
                    </div>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-semibold text-slate-200 text-sm group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {mockUser.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {mockUser.email}
                    </p>
                  </div>
                  <svg
                    className={`hidden sm:block w-4 h-4 text-purple-400 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu with Neon Effect */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-64 animate-slideUp">
                    <div className="relative">
                      {/* Neon glow background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>

                      {/* Menu content */}
                      <div className="relative bg-slate-900/95 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden">
                        {/* User info section */}
                        <div className="px-4 py-3 border-b border-purple-500/30 bg-gradient-to-r from-slate-900 to-purple-900/20">
                          <p className="font-semibold text-slate-100">
                            {mockUser.name}
                          </p>
                          <p className="text-sm text-slate-400 truncate">
                            {mockUser.email}
                          </p>
                        </div>

                        {/* Menu items */}
                        <div className="py-2">
                          <a
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                              <span className="text-base">📊</span>
                            </div>
                            <span className="font-medium">Dashboard</span>
                          </a>

                          <a
                            href="/chat"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800/50 hover:text-purple-400 transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                              <Bot className="w-4 h-4" />
                            </div>
                            <span className="font-medium">AI Assistant</span>
                          </a>

                          <button
                            onClick={() => {
                              setShowUserMenu(false)
                              alert('Settings feature coming soon!')
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800/50 hover:text-pink-400 transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
                              <Settings className="w-4 h-4" />
                            </div>
                            <span className="font-medium">Settings</span>
                          </button>

                          <button
                            onClick={() => {
                              setShowUserMenu(false)
                              setShowShortcuts(true)
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                              <Keyboard className="w-4 h-4" />
                            </div>
                            <span className="font-medium">Shortcuts</span>
                          </button>
                        </div>

                        {/* Logout section */}
                        <div className="border-t border-purple-500/30 bg-gradient-to-r from-slate-900 to-red-900/10">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                              <LogOut className="w-4 h-4" />
                            </div>
                            <span className="font-medium">Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </header>
  )
}
