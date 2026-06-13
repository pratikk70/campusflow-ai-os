import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { MessageCircle, Send, X } from 'lucide-react'
import { API_BASE } from '../api'

function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMsg, setInputMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  async function handleSend(e) {
    e.preventDefault()
    const text = inputMsg.trim()
    if (!text || isLoading) return

    // Append user message immediately
    const userMessage = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMessage])
    setInputMsg('')
    setIsLoading(true)

    try {
      const res = await axios.post(`${API_BASE}/api/chat`, { message: text })
      const assistantMessage = { role: 'assistant', content: res.data.response }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const errorContent =
        err.response?.data?.error || 'Something went wrong. Please try again.'
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: errorContent },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center transition-all duration-200 hover:scale-105"
        aria-label="Toggle chat panel"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Overlay (click to close) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Chat Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[380px] max-w-[90vw] bg-slate-800 border-l border-slate-700 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-semibold text-white">
              CampusFlow AI
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Close chat panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <MessageCircle className="w-10 h-10 text-slate-600 mb-3" />
              <p className="text-sm text-slate-500">
                Ask me anything about your campus life — schedule, attendance, events, or logistics.
              </p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-md'
                    : 'bg-slate-700 text-slate-200 rounded-bl-md'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-700 text-slate-400 px-3.5 py-2.5 rounded-2xl rounded-bl-md text-sm">
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSend}
          className="px-4 py-3 border-t border-slate-700 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Ask something..."
            disabled={isLoading}
            className="flex-1 bg-slate-750 border border-slate-600 rounded-lg px-3 py-2 text-sm text-black placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMsg.trim()}
            className="p-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  )
}

export default ChatPanel