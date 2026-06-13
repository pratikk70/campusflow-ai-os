import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import DashboardGrid from './components/DashboardGrid'
import RoutineWidget from './components/RoutineWidget'
import LogisticsWidget from './components/LogisticsWidget'
import AttendanceMatrix from './components/AttendanceMatrix'
import DataParser from './components/DataParser'
import ChatPanel from './components/ChatPanel'
import { API_BASE } from './api'

function App() {
  const [routineData, setRoutineData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchRoutineData() {
      try {
        const res = await axios.get(`${API_BASE}/api/routine`)
        setRoutineData(res.data)
        setError(null)
      } catch (err) {
        const message =
          err.response?.data?.error ||
          'Failed to load dashboard data. Please check if the server is running.'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoutineData()
  }, [])

  return (
    <div className="dark min-h-screen bg-slate-900 text-white">
      <Header />

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 text-sm">Loading dashboard...</p>
          </div>
        </div>
      )}

      {error && !isLoading && (
        <div className="flex items-center justify-center py-20 px-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 max-w-md text-center">
            <p className="text-red-400 text-sm font-medium">{error}</p>
            <button
              onClick={() => {
                setIsLoading(true)
                setError(null)
                axios
                  .get(`${API_BASE}/api/routine`)
                  .then((res) => {
                    setRoutineData(res.data)
                    setError(null)
                  })
                  .catch((err) => {
                    setError(
                      err.response?.data?.error ||
                        'Failed to load dashboard data. Please check if the server is running.'
                    )
                  })
                  .finally(() => setIsLoading(false))
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-red-500/20 text-red-300 border border-red-500/40 text-sm font-medium hover:bg-red-500/30 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {!isLoading && !error && routineData && (
        <DashboardGrid>
          <RoutineWidget routine={routineData.routine} />
          <LogisticsWidget mess={routineData.mess} shuttles={routineData.shuttles} />
          <AttendanceMatrix attendance={routineData.attendance} />
          <DataParser />
        </DashboardGrid>
      )}

      <ChatPanel />
    </div>
  )
}

export default App
