import { useState } from 'react'
import { login, register } from '../services/sessionService'

export default function Auth({ onAuth }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      if (mode === 'login') {
        const data = await login({ email, password })
        onAuth?.(data)
      } else {
        await register({ email, password })
        const data = await login({ email, password })
        onAuth?.(data)
      }
    } catch (err) {
      setError(err.message || 'Auth failed')
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
      <h3 className="font-semibold mb-4">{mode === 'login' ? 'Sign in' : 'Create account'}</h3>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input className="border rounded px-3 py-2 bg-transparent" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="border rounded px-3 py-2 bg-transparent" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <div className="text-sm text-red-500">{error}</div>}
        <button className="px-4 py-2 rounded bg-blue-600 text-white" type="submit">{mode === 'login' ? 'Sign in' : 'Sign up'}</button>
      </form>
      <button className="mt-3 text-sm text-blue-600" onClick={() => setMode(mode==='login'?'register':'login')}>
        {mode === 'login' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
      </button>
    </div>
  )
}

