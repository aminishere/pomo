import { useEffect, useState } from 'react'
import './App.css'
import Timer from './components/Timer'
import SessionTracker from './components/SessionTracker'
import Stats from './components/Stats'
import Auth from './components/Auth'
import { getSessions, saveSession, setAuthToken } from './services/sessionService'

function App() {
  const [workSessions, setWorkSessions] = useState(0)
  const [completedCycles, setCompletedCycles] = useState(0)
  const [sessionHistory, setSessionHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [authed, setAuthed] = useState(false)

  async function loadSessions() {
    setIsLoading(true)
    try {
      const sessions = await getSessions()
      setSessionHistory(sessions)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { if (authed) loadSessions() }, [authed])

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
      <div className="max-w-4xl mx-auto flex-1 flex flex-col">
        <h1 className="text-3xl font-bold mb-6">Pomodoro Tracker</h1>
        {!authed ? (
          <div className="flex-1 flex items-center justify-center">
            <Auth onAuth={(data) => { setAuthToken(data.token); setAuthed(true) }} />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Timer onSessionComplete={handleSessionComplete} />
          </div>
        )}
      </div>
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-6">
        <div className="w-full px-4 sm:px-6 md:px-8 py-4 flex flex-col md:flex-row gap-4 md:gap-0 md:divide-x md:divide-zinc-200 dark:md:divide-zinc-800">
          <div className="md:flex-1 md:pr-4">
            {authed && <Stats sessionHistory={sessionHistory} isLoading={isLoading} />}
          </div>
          <div className="md:flex-1 md:pl-4">
            {authed && <SessionTracker workSessions={workSessions} completedCycles={completedCycles} sessionHistory={sessionHistory} />}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
