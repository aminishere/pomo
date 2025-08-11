export default function SessionTracker({ workSessions, completedCycles, sessionHistory }) {
  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow p-6 mb-6">
      <div>
        <h3 className="font-medium mb-2">Recent Sessions</h3>
        {sessionHistory && sessionHistory.length > 0 ? (
          <div className="grid gap-2">
            {sessionHistory.map((s, i) => (
              <div key={s._id || i} className="flex justify-between text-sm bg-zinc-50 dark:bg-zinc-800 p-2 rounded">
                <span>{new Date(s.date).toLocaleDateString()}</span>
                <span>{s.completedCycles} cycles</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-zinc-500">No session history yet</div>
        )}
      </div>
    </div>
  )
}

