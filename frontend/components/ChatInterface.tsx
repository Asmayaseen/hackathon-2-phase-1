/**
 * Chat Interface Component - NEON EDITION
 *
 * Phase III - AI-Powered Chatbot
 * Cyberpunk-style neon UI for natural language task management
 */

"use client"

import { useState, useRef, useEffect } from 'react'
import { ChatMessage, ToolCall } from '@/lib/chat-api'
import { Send, Bot, User, Loader2, Sparkles, Zap } from 'lucide-react'

interface ChatInterfaceProps {
  messages: ChatMessage[]
  onSendMessage: (message: string) => Promise<void>
  loading: boolean
}

export default function ChatInterface({ messages, onSendMessage, loading }: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const message = input.trim()
    setInput('')

    await onSendMessage(message)

    // Refocus input after sending
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (but allow Shift+Enter for newlines)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 relative z-10 scrollbar-neon">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 p-4 rounded-full">
                <Sparkles className="w-16 h-16 text-white" />
              </div>
            </div>

            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              AI Task Assistant
            </h3>

            <p className="max-w-md text-slate-300 mb-8">
              Manage your tasks with the power of AI. Natural language, instant results.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
              <ExamplePrompt icon={<Zap className="w-4 h-4" />} text="Add buy milk to my todo list" onSend={onSendMessage} />
              <ExamplePrompt icon={<Zap className="w-4 h-4" />} text="Show me all my tasks" onSend={onSendMessage} />
              <ExamplePrompt icon={<Zap className="w-4 h-4" />} text="Mark task 5 as complete" onSend={onSendMessage} />
              <ExamplePrompt icon={<Zap className="w-4 h-4" />} text="Delete the first task" onSend={onSendMessage} />
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-md animate-pulse"></div>
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1 bg-slate-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-4 neon-glow-purple">
              <div className="flex items-center gap-2 text-purple-300">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm font-medium">AI thinking...</span>
                <div className="flex gap-1 ml-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="relative z-10 border-t border-purple-500/30 bg-slate-900/80 backdrop-blur-md p-4 md:p-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-focus-within:opacity-50 transition-opacity duration-300"></div>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Enter to send)"
              className="relative w-full resize-none rounded-2xl border-2 border-purple-500/50 bg-slate-900/90 backdrop-blur-sm px-6 py-4 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 min-h-[60px] max-h-32 transition-all duration-300"
              rows={1}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="group relative px-6 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center min-w-[60px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Send className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              )}
            </div>
          </button>
        </form>

        <p className="text-xs text-slate-500 mt-3 text-center flex items-center justify-center gap-2">
          <span className="inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
          Press <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-400 font-mono text-xs">Enter</kbd> to send,
          <kbd className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-400 font-mono text-xs">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  )
}

/**
 * Example Prompt Component
 */
interface ExamplePromptProps {
  icon: React.ReactNode
  text: string
  onSend: (message: string) => void
}

function ExamplePrompt({ icon, text, onSend }: ExamplePromptProps) {
  return (
    <div className="group relative" onClick={() => onSend(text)}>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative flex items-center gap-2 px-4 py-3 bg-slate-900/50 backdrop-blur-sm border border-slate-700 hover:border-purple-500/50 rounded-lg cursor-pointer transition-all duration-300">
        <span className="text-cyan-400">{icon}</span>
        <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{text}</span>
      </div>
    </div>
  )
}

/**
 * Message Bubble Component - NEON EDITION
 */
function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''} animate-slideUp`}>
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className={`absolute inset-0 rounded-full blur-md animate-pulse ${
          isUser
            ? 'bg-gradient-to-r from-pink-500 to-purple-500'
            : 'bg-gradient-to-r from-cyan-500 to-purple-500'
        }`}></div>
        <div
          className={`relative w-10 h-10 rounded-full flex items-center justify-center ${
            isUser
              ? 'bg-gradient-to-br from-pink-500 to-purple-600'
              : 'bg-gradient-to-br from-cyan-500 to-purple-600'
          }`}
        >
          {isUser ? (
            <User className="w-6 h-6 text-white" />
          ) : (
            <Bot className="w-6 h-6 text-white" />
          )}
        </div>
      </div>

      {/* Message Content */}
      <div
        className={`flex-1 max-w-[80%] ${
          isUser ? 'text-right' : 'text-left'
        }`}
      >
        <div className="relative group">
          {!isUser && (
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
          <div
            className={`relative inline-block rounded-2xl p-4 ${
              isUser
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white neon-glow-pink'
                : 'bg-slate-900/70 backdrop-blur-sm border border-purple-500/30 text-slate-100 neon-glow-purple'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{message.content}</p>
          </div>
        </div>

        {/* Timestamp */}
        {message.timestamp && (
          <p className={`text-xs text-slate-500 mt-2 flex items-center gap-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="inline-block w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></span>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}
      </div>
    </div>
  )
}
