import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Evolution of Todo - Phase II',
  description: 'Full-stack todo application with Next.js 16+ and FastAPI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
