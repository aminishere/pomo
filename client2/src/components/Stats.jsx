export default function Stats({ sessionHistory, isLoading }) {
  if (isLoading) {
    return <div className="w-full max-w-xl mx-auto text-sm text-zinc-500">Loading stats...</div>
  }

  if (!sessionHistory?.length) {
    return <div className="w-full max-w-xl mx-auto text-sm text-zinc-500">No data available</div>
  }

  const totalCycles = sessionHistory.reduce((sum, s) => sum + s.completedCycles, 0)
  const totalMinutes = totalCycles * (25 * 4 + 10 * 3 + 20)
  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMinutes = totalMinutes % 60

  const today = new Date().toDateString()
  const todayCycles = sessionHistory
    .filter(s => new Date(s.date).toDateString() === today)
    .reduce((sum, s) => sum + s.completedCycles, 0)

  const stats = {
    totalSessions: sessionHistory.length,
    totalCycles,
    totalTime: `${totalHours}h ${remainingMinutes}m`,
    todayCycles,
    averageCycles: Math.round((totalCycles / sessionHistory.length) * 10) / 10,
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow p-6 mb-6">
      <h3 className="font-medium mb-3">Statistics</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <div className="text-xs text-zinc-500">Today's Cycles</div>
          <div className="text-xl font-semibold">{stats.todayCycles}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Total Focus Time</div>
          <div className="text-xl font-semibold">{stats.totalTime}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Total Cycles</div>
          <div className="text-xl font-semibold">{stats.totalCycles}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Avg Cycles/Day</div>
          <div className="text-xl font-semibold">{stats.averageCycles}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-500">Total Sessions</div>
          <div className="text-xl font-semibold">{stats.totalSessions}</div>
        </div>
      </div>
    </div>
  )
}

