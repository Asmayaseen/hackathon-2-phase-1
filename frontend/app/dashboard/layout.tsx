/**
 * Dashboard Layout
 *
 * TEMPORARILY BYPASSED AUTHENTICATION FOR TESTING
 * TODO: Implement proper Better Auth integration in production
 */

"use client"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Authentication check temporarily disabled for testing
  // The dashboard page.tsx has its own Header component now

  return <>{children}</>
}
