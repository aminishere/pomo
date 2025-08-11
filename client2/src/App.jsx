import { useEffect, useState } from 'react'
import './App.css'
import Timer from './components/Timer'
import SessionTracker from './components/SessionTracker'
import Stats from './components/Stats'
import { getSessions, saveSession } from './services/sessionService'

function App() {
  const [workSessions, setWorkSessions] = useState(0)
  const [completedCycles, setCompletedCycles] = useState(0)
  const [sessionHistory, setSessionHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function loadSessions() {
    setIsLoading(true)
    try {
      const sessions = await getSessions()
      setSessionHistory(sessions)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { loadSessions() }, [])

  async function handleSessionComplete() {
    const newCount = (workSessions + 1) % 4
    setWorkSessions(newCount)
    if (newCount === 0) {
      const newCycles = completedCycles + 1
      setCompletedCycles(newCycles)
      try {
        await saveSession(4, newCycles)
        await loadSessions()
      } catch {}
    }
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-6 flex flex-col">
      <div className="max-w-4xl mx-auto flex-1">
        <h1 className="text-3xl font-bold mb-6">Pomodoro Tracker</h1>
        <Timer onSessionComplete={handleSessionComplete} />
        <SessionTracker workSessions={workSessions} completedCycles={completedCycles} sessionHistory={sessionHistory} />
        <Stats sessionHistory={sessionHistory} isLoading={isLoading} />
      </div>
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-6">
        <div className="max-w-4xl mx-auto py-3 text-sm flex items-center justify-between">
          <span className="text-zinc-600 dark:text-zinc-400">Work Sessions</span>
          <span className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium">{workSessions}/4</span>
        </div>
      </footer>
    </div>
  )
}

export default App
