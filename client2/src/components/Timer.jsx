import { useEffect, useState } from 'react'

export default function Timer({ onSessionComplete }) {
  const [selectedMinutes, setSelectedMinutes] = useState(25)
  const [secondsLeft, setSecondsLeft] = useState(selectedMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [pomodoroCount, setPomodoroCount] = useState(0)
  const [autoStart] = useState(true)

  useEffect(() => {
    let intervalId
    if (isRunning) {
      intervalId = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 0) {
            setIsRunning(false)
            handleComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalId)
  }, [isRunning])

  useEffect(() => {
    document.title = isRunning || secondsLeft < selectedMinutes * 60
      ? `(${formatTime(secondsLeft)}) ${selectedMinutes === 25 ? 'Pomodoro' : selectedMinutes === 10 ? 'Short Break' : 'Long Break'}`
      : 'Pomodoro Timer'
    return () => { document.title = 'Pomodoro Timer' }
  }, [secondsLeft, isRunning, selectedMinutes])

  function handleComplete() {
    if (!autoStart) return
    if (selectedMinutes === 25) {
      const nextCount = (pomodoroCount + 1) % 4
      setPomodoroCount(nextCount)
      onSessionComplete && onSessionComplete()
      if (nextCount === 0) {
        selectTime(20)
      } else {
        selectTime(10)
      }
      setIsRunning(true)
    } else if (selectedMinutes === 10 || selectedMinutes === 20) {
      selectTime(25)
      setIsRunning(true)
    }
  }

  function selectTime(mins) {
    setSelectedMinutes(mins)
    setSecondsLeft(mins * 60)
    setIsRunning(false)
  }

  function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0')
    const s = (totalSeconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Pomodoro Timer</h2>

      <div className="flex items-center gap-3 mb-4">
        <button className={`px-3 py-1 rounded ${selectedMinutes===25?'bg-blue-600 text-white':'bg-zinc-100 dark:bg-zinc-800'}`} onClick={() => selectTime(25)}>Pomodoro</button>
        <div className="flex gap-1">
          {[0,1,2,3].map(i => (
            <span key={i} className={`h-2 w-2 rounded-full ${i < pomodoroCount ? 'bg-green-500' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
          ))}
        </div>
        <button className={`px-3 py-1 rounded ${selectedMinutes===10?'bg-blue-600 text-white':'bg-zinc-100 dark:bg-zinc-800'}`} onClick={() => selectTime(10)}>Short Break</button>
        <button className={`px-3 py-1 rounded ${selectedMinutes===20?'bg-blue-600 text-white':'bg-zinc-100 dark:bg-zinc-800'}`} onClick={() => selectTime(20)}>Long Break</button>
      </div>

      <div className="text-6xl font-mono text-center my-6">{formatTime(secondsLeft)}</div>

      <div className="flex items-center gap-3 justify-center">
        <button className="px-4 py-2 rounded bg-emerald-600 text-white" onClick={() => setIsRunning(v => !v)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className="px-4 py-2 rounded bg-zinc-200 dark:bg-zinc-800" onClick={() => { setSecondsLeft(selectedMinutes*60); setIsRunning(false); setPomodoroCount(0) }}>Reset</button>
      </div>
    </div>
  )
}

