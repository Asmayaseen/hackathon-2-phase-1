# Dark Mode & Theme System Specification

**Feature Type:** UX Enhancement
**Priority:** Medium
**Phase:** II Enhancement
**Status:** Draft

---

## Overview

Implement a comprehensive dark mode theme with smooth transitions and user preference persistence. This feature enhances user experience, reduces eye strain in low-light conditions, and provides a modern, customizable interface.

---

## User Stories

### US-1: Theme Toggle
**As a** user
**I want to** toggle between light and dark mode
**So that** I can use the app comfortably in different lighting conditions

### US-2: Automatic Detection
**As a** user
**I want to** have the theme match my system preference
**So that** the app integrates seamlessly with my device

### US-3: Preference Persistence
**As a** user
**I want to** my theme preference to be remembered
**So that** I don't have to change it every time I visit

### US-4: Smooth Transitions
**As a** user
**I want to** smooth transitions when switching themes
**So that** the change doesn't feel jarring

---

## Theme Design System

### Color Palettes

#### Light Mode (Default)

**Background Colors:**
```css
--background: #ffffff           /* Pure white */
--surface: #f9fafb             /* Gray-50 - Card backgrounds */
--surface-elevated: #ffffff     /* White - Elevated cards */
```

**Text Colors:**
```css
--text-primary: #111827         /* Gray-900 - Headings */
--text-secondary: #4b5563       /* Gray-600 - Body text */
--text-tertiary: #9ca3af        /* Gray-400 - Muted text */
```

**Border Colors:**
```css
--border: #e5e7eb              /* Gray-200 */
--border-light: #f3f4f6        /* Gray-100 */
```

**Gradients:**
```css
--gradient-primary: linear-gradient(135deg, #3b82f6, #6366f1)  /* Blue to Indigo */
--gradient-bg: linear-gradient(135deg, #f8fafc, #dbeafe, #e0e7ff)  /* Slate-Blue-Indigo */
```

#### Dark Mode

**Background Colors:**
```css
--background: #0f172a           /* Slate-900 - Main background */
--surface: #1e293b             /* Slate-800 - Card backgrounds */
--surface-elevated: #334155     /* Slate-700 - Elevated cards */
```

**Text Colors:**
```css
--text-primary: #f1f5f9         /* Slate-100 - Headings */
--text-secondary: #cbd5e1       /* Slate-300 - Body text */
--text-tertiary: #64748b        /* Slate-500 - Muted text */
```

**Border Colors:**
```css
--border: #334155              /* Slate-700 */
--border-light: #1e293b        /* Slate-800 */
```

**Gradients:**
```css
--gradient-primary: linear-gradient(135deg, #3b82f6, #6366f1)  /* Same as light */
--gradient-bg: linear-gradient(135deg, #0f172a, #1e293b, #334155)  /* Dark gradient */
```

**Component Adjustments:**
```css
/* Reduce saturation in dark mode for better readability */
--red-bg-dark: #7f1d1d         /* vs #fee2e2 in light */
--green-bg-dark: #14532d       /* vs #dcfce7 in light */
--blue-bg-dark: #1e3a8a        /* vs #dbeafe in light */
--amber-bg-dark: #78350f       /* vs #fef3c7 in light */
```

---

## Implementation Approach

### 1. Tailwind Dark Mode Setup

**Configure `tailwind.config.ts`:**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],  // Use class-based dark mode
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Define CSS variable-based colors for easy theming
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... more color definitions
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

### 2. CSS Variables

**File:** `frontend/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light Mode Colors */
    --background: 0 0% 100%;           /* White */
    --foreground: 222.2 84% 4.9%;      /* Near black */

    --card: 0 0% 98%;                  /* Gray-50 */
    --card-foreground: 222.2 84% 4.9%;

    --primary: 221.2 83.2% 53.3%;      /* Blue-600 */
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;        /* Gray-100 */
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --border: 214.3 31.8% 91.4%;       /* Gray-200 */
    --input: 214.3 31.8% 91.4%;

    /* Gradients remain the same in both modes */
    --gradient-blue-indigo: linear-gradient(135deg, #3b82f6, #6366f1);
  }

  .dark {
    /* Dark Mode Colors */
    --background: 222.2 84% 4.9%;      /* Slate-900 */
    --foreground: 210 40% 98%;

    --card: 217.2 32.6% 17.5%;         /* Slate-800 */
    --card-foreground: 210 40% 98%;

    --primary: 217.2 91.2% 59.8%;      /* Blue-500 */
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;    /* Slate-800 */
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --border: 217.2 32.6% 17.5%;       /* Slate-700 */
    --input: 217.2 32.6% 17.5%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
}
```

### 3. Theme Provider

**File:** `frontend/components/ThemeProvider.tsx`

```typescript
"use client"

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  // Load theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored) {
      setTheme(stored)
    }
  }, [])

  // Apply theme changes
  useEffect(() => {
    const root = window.document.documentElement

    // Remove existing theme classes
    root.classList.remove('light', 'dark')

    let effectiveTheme: 'light' | 'dark'

    if (theme === 'system') {
      // Use system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      effectiveTheme = systemTheme
    } else {
      effectiveTheme = theme
    }

    // Apply theme class
    root.classList.add(effectiveTheme)
    setResolvedTheme(effectiveTheme)

    // Save to localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      if (theme === 'system') {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light'
        setResolvedTheme(systemTheme)
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(systemTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

### 4. Theme Toggle Component

**File:** `frontend/components/ThemeToggle.tsx`

```typescript
"use client"

import { useTheme } from './ThemeProvider'
import { useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 rounded-lg hover:bg-secondary transition-colors"
        aria-label="Toggle theme"
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
        <div className="absolute right-0 mt-2 w-36 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
          <button
            onClick={() => {
              setTheme('light')
              setShowMenu(false)
            }}
            className={`w-full text-left px-4 py-2 hover:bg-secondary flex items-center gap-2 ${
              theme === 'light' ? 'text-primary font-medium' : ''
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
            className={`w-full text-left px-4 py-2 hover:bg-secondary flex items-center gap-2 ${
              theme === 'dark' ? 'text-primary font-medium' : ''
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
            className={`w-full text-left px-4 py-2 hover:bg-secondary flex items-center gap-2 ${
              theme === 'system' ? 'text-primary font-medium' : ''
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            System
          </button>
        </div>
      )}
    </div>
  )
}
```

---

## Component Dark Mode Adaptations

### Update Existing Components

**General Pattern:**
```tsx
// Before (hardcoded colors)
<div className="bg-white text-gray-900 border-gray-200">

// After (theme-aware)
<div className="bg-card text-foreground border-border">
```

### Specific Component Updates

#### 1. Task Item

```tsx
// Light: bg-white, hover:bg-gray-50
// Dark: bg-slate-800, hover:bg-slate-700

<div className="bg-card border border-border hover:bg-secondary/50 transition-colors">
  {/* Task content */}
</div>
```

#### 2. Create Task Form

```tsx
<form className="bg-card border border-border rounded-lg p-6">
  <input className="bg-background border-border text-foreground" />
</form>
```

#### 3. Statistics Cards

```tsx
// Keep gradients the same in both modes for visual consistency
<div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
  {/* Stats */}
</div>
```

#### 4. Empty States

```tsx
<div className="bg-card border border-border text-muted-foreground">
  <p className="text-foreground">No tasks yet</p>
  <p className="text-muted-foreground">Create your first task!</p>
</div>
```

---

## Toggle Placement Options

### Option 1: Header (Recommended)
- Location: Header component, next to user menu
- Visibility: Always visible
- Accessibility: Easy to find

### Option 2: User Dropdown Menu
- Location: Inside user dropdown menu
- Visibility: Hidden until menu opened
- Pro: Cleaner header

### Option 3: Settings Page
- Location: Dedicated settings page
- Visibility: Requires navigation
- Pro: Grouped with other preferences

**Recommended: Option 1** - Most accessible, follows common patterns

---

## Accessibility Considerations

### ARIA Labels
```tsx
<button
  onClick={toggleTheme}
  aria-label="Toggle dark mode"
  aria-pressed={theme === 'dark'}
>
```

### Keyboard Navigation
- Tab: Navigate to theme toggle
- Enter/Space: Toggle theme
- Escape: Close dropdown (if using dropdown)

### Focus States
```css
.focus-visible:outline-none
.focus-visible:ring-2
.focus-visible:ring-primary
```

### Color Contrast

**Verify WCAG AA compliance:**
- Light mode: ✓ 4.5:1 minimum for text
- Dark mode: ✓ 4.5:1 minimum for text
- Links: ✓ Sufficient contrast in both modes
- Disabled states: ✓ Visually distinct

---

## Performance Considerations

### 1. Prevent Flash of Unstyled Content (FOUC)

**Inline script in `<head>`:**
```html
<script>
  try {
    const theme = localStorage.getItem('theme') || 'system'
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    const effectiveTheme = theme === 'system' ? systemTheme : theme
    document.documentElement.classList.add(effectiveTheme)
  } catch {}
</script>
```

### 2. Smooth Transitions

```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.card {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
```

### 3. CSS Variable Performance

- CSS variables are performant
- Browser repaints are minimal with class-based dark mode
- Transitions help smooth visual changes

---

## Testing Checklist

### Functional Testing
- [ ] Light mode displays correctly
- [ ] Dark mode displays correctly
- [ ] System theme detection works
- [ ] Theme toggle switches modes
- [ ] Preference persists after refresh
- [ ] Preference persists after logout/login

### Visual Testing
- [ ] All components adapt to dark mode
- [ ] Gradients remain vibrant in dark mode
- [ ] Text is readable in both modes
- [ ] Borders are visible in both modes
- [ ] Hover states work in both modes
- [ ] Focus states work in both modes

### Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (iOS, Android)

### Accessibility Testing
- [ ] ARIA labels present
- [ ] Keyboard navigation works
- [ ] Screen reader announces theme changes
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible

---

## Acceptance Criteria

### AC-1: Theme Toggle UI
- [ ] Theme toggle button is visible in header
- [ ] Toggle shows correct icon (sun/moon)
- [ ] Dropdown menu shows 3 options (Light, Dark, System)
- [ ] Current theme is indicated in menu
- [ ] Menu closes after selection

### AC-2: Theme Switching
- [ ] Light mode applies correctly
- [ ] Dark mode applies correctly
- [ ] System mode respects OS preference
- [ ] Transitions are smooth (not jarring)
- [ ] No flash of wrong theme on page load

### AC-3: Persistence
- [ ] Theme preference saved to localStorage
- [ ] Theme persists after page refresh
- [ ] Theme persists after browser restart
- [ ] Theme persists after logout/login

### AC-4: Component Adaptation
- [ ] All components have dark mode styles
- [ ] Text is readable in both modes
- [ ] Borders/separators visible in both modes
- [ ] Interactive states work in both modes
- [ ] No hardcoded color classes remain

### AC-5: Visual Quality
- [ ] Dark mode is aesthetically pleasing
- [ ] Color scheme is consistent
- [ ] Gradients work well in dark mode
- [ ] No visual bugs or glitches
- [ ] Mobile and desktop look good

---

## Future Enhancements

- Custom theme colors (user-selected)
- Multiple dark mode variants (OLED black, dim, etc.)
- Automatic theme switching based on time of day
- Theme preview before applying
- Accessibility presets (high contrast, reduced motion)

---

*Specification complete. Ready for implementation.*
