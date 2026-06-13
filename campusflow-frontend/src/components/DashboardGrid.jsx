function DashboardGrid({ children }) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {children}
    </main>
  )
}

export default DashboardGrid
