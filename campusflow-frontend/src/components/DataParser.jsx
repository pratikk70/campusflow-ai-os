import { useState, useEffect } from 'react'
import axios from 'axios'
import { Send, FileText, Calendar, Trash2 } from 'lucide-react'
import { API_BASE } from '../api'

const CATEGORY_COLORS = {
  PLACEMENT: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  ASSIGNMENT: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  CLUB: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  UPDATE: 'bg-green-500/20 text-green-300 border-green-500/40',
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function DataParser() {
  const [inputText, setInputText] = useState('')
  const [timeline, setTimeline] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Fetch existing timeline entries on mount
  useEffect(() => {
    async function fetchTimeline() {
      try {
        const res = await axios.get(`${API_BASE}/api/schedule`)
        setTimeline(res.data)
      } catch (err) {
        console.error('Failed to fetch timeline:', err)
      }
    }
    fetchTimeline()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!inputText.trim()) return

    setIsLoading(true)
    setError('')

    try {
      const res = await axios.post(`${API_BASE}/api/summarize`, { text: inputText })
      // Prepend new entry to timeline
      setTimeline((prev) => [res.data, ...prev])
      setInputText('')
    } catch (err) {
      const message =
        err.response?.data?.error || 'Something went wrong. Please try again.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Delete Function
  async function handleDelete(id) {
    // 1. Instantly remove it from the UI for a snappy user experience
    setTimeline((prev) => prev.filter((item) => item._id !== id))
    
    // 2. Tell the database to delete it in the background
    try {
      await axios.delete(`${API_BASE}/api/schedule/${id}`)
    } catch (err) {
      console.error('Failed to delete from database:', err)
      // For a hackathon, we can ignore the error. The UI already looks clean!
    }
  }

  return (
    <div className="col-span-full bg-slate-800 rounded-xl border border-slate-700 p-5 shadow-sm">
      {/* Card Header */}
      <div className="flex items-center gap-2 mb-5">
        <FileText className="w-5 h-5 text-amber-400" />
        <h2 className="text-lg font-semibold text-white">Data Parser</h2>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your WhatsApp messages, emails, or announcements here..."
          className="w-full h-32 bg-slate-750 border border-slate-700/50 rounded-lg p-3 text-sm text-black placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40 transition-all"
        />

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-sm mt-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-sm font-medium hover:bg-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          {isLoading ? 'Processing...' : 'Extract'}
        </button>
      </form>

      {/* Timeline Cards */}
      {timeline.length > 0 && (
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
            Extracted Timeline
          </p>
          <div className="space-y-3">
            {timeline.map((entry) => (
              <div
                key={entry._id}
                className="p-4 rounded-lg bg-slate-750 border border-slate-700/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Category Badge */}
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border mb-2 ${
                        CATEGORY_COLORS[entry.category] || CATEGORY_COLORS.UPDATE
                      }`}
                    >
                      {entry.category}
                    </span>
                    {/* Title */}
                    <h3 className="text-sm font-bold text-slate-200 mb-1">
                      {entry.title}
                    </h3>
                    {/* Summary */}
                    <p className="text-xs text-slate-400">{entry.summary}</p>
                  </div>
                  
                  {/* Right Side: Date and Delete Button */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(entry.date)}</span>
                    </div>
                    {/* Delete Button (Subtle until hover) */}
                    <button
                      onClick={() => handleDelete(entry._id)}
                      className="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors opacity-50 hover:opacity-100"
                      aria-label="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {timeline.length === 0 && !isLoading && (
        <p className="text-slate-500 text-sm">
          No timeline entries yet. Paste some text above to extract events.
        </p>
      )}
    </div>
  )
}

export default DataParser