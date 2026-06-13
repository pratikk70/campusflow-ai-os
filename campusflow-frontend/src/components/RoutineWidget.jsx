import { Clock, MapPin, BookOpen, CheckCircle } from 'lucide-react'

// New function that accurately categorizes the schedule based on 24-hour time
function getSlotStatus(routine) {
  if (!routine || routine.length === 0) return { currentSlot: null, upcomingSlots: [], isDayOver: false }

  const now = new Date()
  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes()

  let currentSlot = null
  const upcomingSlots = []

  routine.forEach((slot) => {
    const [startStr, endStr] = slot.time.split(' - ')
    const [startH, startM] = startStr.split(':').map(Number)
    const [endH, endM] = endStr.split(':').map(Number)
    
    const startTotal = startH * 60 + startM
    const endTotal = endH * 60 + endM

    // If currently happening
    if (currentTotalMinutes >= startTotal && currentTotalMinutes < endTotal) {
      currentSlot = slot
    } 
    // If it hasn't happened yet
    else if (startTotal > currentTotalMinutes) {
      upcomingSlots.push(slot)
    }
  })

  // If there is no active class and no upcoming classes, the academic day is over
  const isDayOver = !currentSlot && upcomingSlots.length === 0

  return { currentSlot, upcomingSlots, isDayOver }
}

function RoutineWidget({ routine }) {
  if (!routine || routine.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-semibold text-white">Today's Routine</h2>
        </div>
        <p className="text-slate-400 text-sm">No classes scheduled for today.</p>
      </div>
    )
  }

  const { currentSlot, upcomingSlots, isDayOver } = getSlotStatus(routine)

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 shadow-sm">
      {/* Card Header */}
      <div className="flex items-center gap-2 mb-5">
        <BookOpen className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-semibold text-white">Today's Routine</h2>
      </div>

      {/* Day Over State - Shown only when all classes are finished */}
      {isDayOver && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-5 mb-4 text-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-emerald-300 mb-1">All Done!</h3>
          <p className="text-xs text-slate-400">Your classes are over for today.</p>
        </div>
      )}

      {/* Current Slot - Highlighted with Neon Glow */}
      {currentSlot && (
        <div className="relative bg-indigo-500/10 border border-indigo-500/50 rounded-lg p-4 mb-4 shadow-[0_0_15px_rgba(99,102,241,0.15)] ring-1 ring-indigo-500/20">
          <span className="absolute top-2 right-2 text-xs font-bold uppercase tracking-wider bg-indigo-500 text-white px-2 py-0.5 rounded-full shadow-sm">
            Now
          </span>
          <h3 className="text-base font-bold text-indigo-300 mb-2 pr-12">
            {currentSlot.subject}
          </h3>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>{currentSlot.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>{currentSlot.location}</span>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Slots */}
      {upcomingSlots.length > 0 && (
        <div className="space-y-2.5">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Upcoming
          </p>
          {upcomingSlots.map((slot, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-slate-750 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 border border-slate-700/50 cursor-default"
            >
              <div className="mt-0.5 w-8 h-8 rounded-md bg-slate-700 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate">
                  {slot.subject}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{slot.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="w-3 h-3" />
                    <span>{slot.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RoutineWidget