import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ToastProvider } from '@/components/ToastProvider'

export const metadata: Metadata = {
  title: 'TaskFlow - Smart Task Management',
  description: 'Full-stack todo application with Next.js 16+ and FastAPI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'system'
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                const effectiveTheme = theme === 'system' ? systemTheme : theme
                document.documentElement.classList.add(effectiveTheme)
              } catch {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
