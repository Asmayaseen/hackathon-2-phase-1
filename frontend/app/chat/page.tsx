/**
 * Chat Page
 *
 * Phase III - AI-Powered Chatbot
 * Natural language interface for task management
 */

"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { chatApi, ChatMessage } from '@/lib/chat-api'
import ChatInterface from '@/components/ChatInterface'
import Header from '@/components/Header'
import { ArrowLeft, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [conversationId, setConversationId] = useState<number | undefined>()
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // Check authentication - TEMPORARILY BYPASSED FOR TESTING
  useEffect(() => {
    // TODO: Enable auth check once Better Auth is fully configured
    // For now, use demo user for testing
    setUserId('demo-user')
    setCheckingAuth(false)

    /* Original auth check - re-enable when Better Auth is ready:
    async function checkAuth() {
      try {
        const session = await authClient.getSession()

        if (!session?.data) {
          router.push('/login')
          return
        }

        setUserId(session.data.user.id)
        setCheckingAuth(false)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/login')
      }
    }

    checkAuth()
    */
  }, [router])

  // Send message handler
  const handleSendMessage = async (messageContent: string) => {
    if (!userId) {
      console.error('No user ID available')
      return
    }

    // Add user message to UI immediately
    const userMessage: ChatMessage = {
      role: 'user',
      content: messageContent,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMessage])

    setLoading(true)

    try {
      // Send to backend
      const response = await chatApi.sendMessage(userId, messageContent, conversationId)

      // Update conversation ID if this is the first message
      if (!conversationId) {
        setConversationId(response.conversation_id)
      }

      // Add assistant response to UI
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Failed to send message:', error)

      // Add error message to UI
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  // Loading state
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header />

      {/* Page Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <h1 className="text-xl font-bold">AI Task Assistant</h1>
              </div>
            </div>

            {conversationId && (
              <div className="text-sm text-muted-foreground">
                Conversation #{conversationId}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="h-full max-w-4xl mx-auto">
          <div className="bg-card border rounded-lg shadow-lg h-[calc(100vh-250px)] flex flex-col">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t bg-card py-3">
        <div className="container mx-auto px-4">
          <p className="text-xs text-muted-foreground text-center">
            Powered by OpenAI Agents SDK + MCP Server • Phase III: Evolution of Todo
          </p>
        </div>
      </div>
    </div>
  )
}
