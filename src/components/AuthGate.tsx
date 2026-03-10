import { useState, useEffect } from 'react'
import MarcopoloLogo from './MarcopoloLogo'

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (getCookie('mp_auth') === '1') {
      setAuthed(true)
    }
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (username === 'marcopolo' && password === 'mateotee1') {
      document.cookie = 'mp_auth=1; path=/; max-age=86400'
      setAuthed(true)
    } else {
      setError('Credenciales incorrectas')
    }
  }

  if (authed) return <>{children}</>

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-10">
          <MarcopoloLogo className="h-8 w-auto text-[var(--marco-accent)]" />
        </div>

        <form onSubmit={handleSubmit} className="border border-[var(--marco-border)] rounded-lg p-8 space-y-5">
          <h1 className="font-thunder text-2xl uppercase text-black tracking-wide mb-2">
            Acceso privado
          </h1>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-black/70">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError('') }}
              className="w-full border border-[var(--marco-border)] rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--marco-accent)]"
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-black/70">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              className="w-full border border-[var(--marco-border)] rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--marco-accent)]"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[var(--marco-accent)] text-white font-thunder uppercase tracking-wide py-2.5 rounded hover:opacity-90 transition-opacity"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}
