import { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MarcopoloLogo from '../components/MarcopoloLogo'
import VoiceOrb from '../components/VoiceOrb'
import ToolActivityFeed, { type ToolEvent } from '../components/ToolActivityFeed'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

type Status = 'idle' | 'listening' | 'processing' | 'speaking'

interface SpeechRecognitionAlternative { transcript: string }
interface SpeechRecognitionResult { length: number; [index: number]: SpeechRecognitionAlternative }
interface SpeechRecognitionResultList { length: number; [index: number]: SpeechRecognitionResult }
interface ISpeechRecognitionEvent extends Event { results: SpeechRecognitionResultList }
interface ISpeechRecognitionErrorEvent extends Event { error: string }
interface ISpeechRecognition {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onresult: ((e: ISpeechRecognitionEvent) => void) | null
  onerror: ((e: ISpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}
type SpeechRecognitionCtor = new () => ISpeechRecognition

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: SpeechRecognitionCtor
  webkitSpeechRecognition?: SpeechRecognitionCtor
}

const speechWindow = typeof window !== 'undefined' ? (window as SpeechRecognitionWindow) : undefined
const SpeechRecognition = speechWindow?.SpeechRecognition ?? speechWindow?.webkitSpeechRecognition

export default function Agent() {
  const [status, setStatus] = useState<Status>('idle')
  const [messages, setMessages] = useState<Message[]>([])
  const [toolEvents, setToolEvents] = useState<ToolEvent[]>([])
  const [noSpeechSupport, setNoSpeechSupport] = useState(false)

  const recognitionRef = useRef<ISpeechRecognition | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const messagesRef = useRef<Message[]>([])
  const activeRef = useRef(false)

  // Keep messagesRef in sync
  useEffect(() => { messagesRef.current = messages }, [messages])

  const stopEverything = useCallback(() => {
    activeRef.current = false
    recognitionRef.current?.stop()
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
    }
    setStatus('idle')
  }, [])

  const startListening = useCallback(() => {
    if (!activeRef.current) return
    try {
      recognitionRef.current?.start()
      setStatus('listening')
    } catch {
      // recognition already started — ignore
    }
  }, [])

  const handleTranscript = useCallback(async (transcript: string) => {
    if (!activeRef.current || !transcript.trim()) return

    const userMsg: Message = { role: 'user', content: transcript }
    const updatedMessages = [...messagesRef.current, userMsg]
    setMessages(updatedMessages)
    setStatus('processing')

    try {
      // 1. Get Claude reply
      const chatRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })
      const { reply, toolEvents: newEvents } = await chatRes.json()

      // Append assistant message
      const assistantMsg: Message = { role: 'assistant', content: reply }
      setMessages(prev => [...prev, assistantMsg])
      if (newEvents?.length) {
        setToolEvents(prev => [...newEvents.reverse(), ...prev])
      }

      if (!activeRef.current) return

      // 2. Speak reply via ElevenLabs
      setStatus('speaking')
      const speakRes = await fetch('/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: reply }),
      })
      const blob = await speakRes.blob()
      const url = URL.createObjectURL(blob)

      if (!activeRef.current) { URL.revokeObjectURL(url); return }

      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => {
        URL.revokeObjectURL(url)
        if (activeRef.current) startListening()
      }
      audio.onerror = () => {
        URL.revokeObjectURL(url)
        if (activeRef.current) startListening()
      }
      audio.play()
    } catch (err) {
      console.error('Agent error:', err)
      if (activeRef.current) startListening()
    }
  }, [startListening])

  const initRecognition = useCallback(() => {
    if (!SpeechRecognition) { setNoSpeechSupport(true); return null }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      const transcript = Array.from({ length: event.results.length }, (_, i) => event.results[i][0].transcript).join('')
      handleTranscript(transcript)
    }

    recognition.onerror = (event: ISpeechRecognitionErrorEvent) => {
      if (event.error === 'no-speech' && activeRef.current) {
        startListening()
      }
    }

    recognition.onend = () => {
      // If we're still listening (no result fired), restart
      if (activeRef.current && status === 'listening') {
        startListening()
      }
    }

    return recognition
  }, [handleTranscript, startListening, status])

  const toggleSession = useCallback(() => {
    if (activeRef.current) {
      stopEverything()
      return
    }

    if (!SpeechRecognition) { setNoSpeechSupport(true); return }

    activeRef.current = true
    const recognition = initRecognition()
    if (!recognition) return
    recognitionRef.current = recognition
    startListening()
  }, [initRecognition, startListening, stopEverything])

  const isActive = status !== 'idle'

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#0a0a0a', color: 'white' }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-[4vw] py-5 md:px-[10.5vw] md:py-6 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <Link to="/" className="text-[var(--marco-accent)]" aria-label="Marco Polo">
          <MarcopoloLogo className="h-6 w-auto" />
        </Link>
        <div className="flex items-center gap-3">
          <span
            className="h-2 w-2 rounded-full transition-colors"
            style={{ background: isActive ? '#3ecf8e' : 'rgba(255,255,255,0.2)' }}
          />
          <span className="text-xs font-interphases" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {isActive ? 'Active' : 'Disconnected'}
          </span>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Center — orb + transcript */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 gap-10">
          {/* Label */}
          <div className="text-center">
            <h1
              className="font-thunder uppercase text-4xl md:text-5xl"
              style={{ color: 'var(--marco-accent)' }}
            >
              Marco
            </h1>
            <p className="text-sm mt-1 font-interphases" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {noSpeechSupport
                ? "Browser doesn't support voice input"
                : status === 'idle'
                ? 'Tap orb to start'
                : status === 'listening'
                ? 'Listening — speak now'
                : status === 'processing'
                ? 'Thinking…'
                : 'Speaking…'}
            </p>
          </div>

          {/* Orb */}
          <VoiceOrb status={status} onClick={toggleSession} />

          {/* End session button */}
          {isActive && (
            <button
              onClick={stopEverything}
              className="text-xs font-interphases px-4 py-2 rounded-full border transition-colors hover:bg-white/10"
              style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}
            >
              End session
            </button>
          )}

          {/* Transcript */}
          {messages.length > 0 && (
            <div
              className="w-full max-w-lg space-y-3 max-h-64 overflow-y-auto"
              style={{ scrollbarWidth: 'none' }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-xs px-4 py-2.5 rounded-2xl text-sm font-interphases leading-relaxed"
                    style={{
                      background: m.role === 'user'
                        ? 'var(--marco-accent)'
                        : 'rgba(255,255,255,0.07)',
                      color: m.role === 'user' ? 'white' : 'rgba(255,255,255,0.85)',
                    }}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Right panel — tool activity */}
        <aside
          className="hidden lg:flex flex-col w-80 xl:w-96 border-l p-5"
          style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
        >
          <h2
            className="font-thunder uppercase text-xs mb-4 tracking-widest"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Tool Activity
          </h2>
          <ToolActivityFeed events={toolEvents} />
        </aside>
      </div>
    </div>
  )
}
