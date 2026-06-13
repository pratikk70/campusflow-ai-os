import { Brain } from 'lucide-react'

function Header() {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-500/10 rounded-lg">
          <Brain className="w-7 h-7 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-400 tracking-tight">
            CampusFlow AI OS
          </h1>
          <p className="text-sm text-slate-400 font-medium">Your Intelligent Campus Dashboard</p>
        </div>
      </div>
    </header>
  )
}

export default Header