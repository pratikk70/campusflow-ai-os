import { BarChart3, CheckCircle, AlertTriangle } from 'lucide-react'

function AttendanceMatrix({ attendance }) {
  if (!attendance || attendance.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-semibold text-white">Attendance Tracker</h2>
        </div>
        <p className="text-slate-400 text-sm">No attendance data available.</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
      {/* Card Header */}
      <div className="flex items-center gap-2 mb-5">
        <BarChart3 className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-semibold text-white">Attendance Tracker</h2>
      </div>

      {/* Subject Rows */}
      <div className="space-y-3">
        {attendance.map((item, index) => {
          const isSafe = item.percentage >= 75

          return (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-750 border border-slate-700/50"
            >
              {/* Subject Name */}
              <div className="w-36 shrink-0">
                <p className="text-sm font-medium text-slate-200 truncate">
                  {item.subject}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="flex-1 min-w-0">
                <div className="w-full h-2.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isSafe ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Percentage Text */}
              <span className="text-sm font-medium text-slate-300 w-10 text-right shrink-0">
                {item.percentage}%
              </span>

              {/* Status Tag */}
              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                  isSafe
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/15 text-red-400 border border-red-500/30'
                }`}
              >
                {isSafe ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  <AlertTriangle className="w-3 h-3" />
                )}
                <span>{isSafe ? 'Safe' : 'At Risk'}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AttendanceMatrix
