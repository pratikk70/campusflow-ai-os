import { useState, useEffect } from 'react'
import { Utensils, Bus, Timer } from 'lucide-react'

function getDefaultMeal() {
  const hour = new Date().getHours()
  if (hour < 10) return 'breakfast'
  if (hour < 14) return 'lunch'
  if (hour < 17) return 'snacks'
  return 'dinner'
}

function getCountdown(departureTimeStr) {
  const now = new Date()
  const [hours, minutes] = departureTimeStr.split(':').map(Number)
  const departure = new Date()
  departure.setHours(hours, minutes, 0, 0)
  const diffMs = departure - now
  if (diffMs <= 0) return 'Departed'
  const diffMinutes = Math.floor(diffMs / 60000)
  const h = Math.floor(diffMinutes / 60)
  const m = diffMinutes % 60
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

const mealLabels = {
  breakfast: '🌅 Breakfast',
  lunch: '☀️ Lunch',
  snacks: '🍿 Snacks',
  dinner: '🌙 Dinner',
}

function LogisticsWidget({ mess, shuttles }) {
  const [activeMeal, setActiveMeal] = useState(getDefaultMeal)
  const [countdowns, setCountdowns] = useState([])

  useEffect(() => {
    if (!shuttles || shuttles.length === 0) return
    function updateCountdowns() {
      setCountdowns(shuttles.map((s) => getCountdown(s.nextDeparture)))
    }
    updateCountdowns()
    const interval = setInterval(updateCountdowns, 30000)
    return () => clearInterval(interval)
  }, [shuttles])

  if (!mess && (!shuttles || shuttles.length === 0)) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Utensils className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-semibold text-white">Campus Logistics</h2>
        </div>
        <p className="text-slate-400 text-sm">No logistics data available.</p>
      </div>
    )
  }

  const mealItems = mess ? mess[activeMeal] || [] : []

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <Utensils className="w-5 h-5 text-emerald-400" />
        <h2 className="text-lg font-semibold text-white">Campus Logistics</h2>
      </div>

      {mess && (
        <div className="mb-6">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
            Today's Mess Menu
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(mealLabels).map((meal) => (
              <button
                key={meal}
                onClick={() => setActiveMeal(meal)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeMeal === meal
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                    : 'bg-slate-700/50 text-slate-400 border border-slate-600/50 hover:bg-slate-700 hover:text-slate-300'
                }`}
              >
                {mealLabels[meal]}
              </button>
            ))}
          </div>
          <div className="bg-slate-750 rounded-lg border border-slate-700/50 p-3">
            {mealItems.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {mealItems.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-700/70 text-sm text-slate-200 border border-slate-600/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No items listed for this meal.</p>
            )}
          </div>
        </div>
      )}

      {shuttles && shuttles.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Bus className="w-4 h-4 text-sky-400" />
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Shuttle Departures
            </p>
          </div>
          <div className="space-y-2.5">
            {shuttles.map((shuttle, index) => {
              const countdown = countdowns[index] || '—'
              const isDeparted = countdown === 'Departed'

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-750 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/10 hover:border-sky-500/30 transition-all duration-300 border border-slate-700/50 cursor-default"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">
                      {shuttle.route}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{shuttle.frequency}</p>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 ml-3 px-2.5 py-1 rounded-md text-xs font-semibold ${
                      isDeparted
                        ? 'bg-slate-700 text-slate-500'
                        : 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                    }`}
                  >
                    <Timer className="w-3.5 h-3.5" />
                    <span>{countdown}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default LogisticsWidget