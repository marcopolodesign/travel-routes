import { useState } from 'react'

export interface ToolEvent {
  tool: string
  params?: unknown
  result?: unknown
  ts: number
}

const TOOL_COLORS: Record<string, string> = {
  figma: '#a259ff',
  linear: '#5e6ad2',
  calendar: '#1a73e8',
  gmail: '#ea4335',
  supabase: '#3ecf8e',
  vercel: '#000',
  atlassian: '#0052cc',
}

function timeAgo(ts: number) {
  const diff = Math.floor((Date.now() - ts) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return `${Math.floor(diff / 3600)}h ago`
}

function EventCard({ event }: { event: ToolEvent }) {
  const [open, setOpen] = useState(false)
  const color = TOOL_COLORS[event.tool] ?? '#999'

  return (
    <div className="border border-[var(--marco-border)] rounded-lg overflow-hidden bg-black/20">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors"
      >
        <span
          className="shrink-0 text-[10px] font-thunder uppercase px-2 py-0.5 rounded"
          style={{ background: color, color: '#fff', letterSpacing: '0.05em' }}
        >
          {event.tool}
        </span>
        <span className="flex-1 text-xs text-white/70 truncate font-interphases">
          {typeof event.params === 'object' && event.params !== null
            ? (event.params as Record<string, unknown>).action ?? 'call'
            : 'call'}
        </span>
        <span className="text-[10px] text-white/40 shrink-0">{timeAgo(event.ts)}</span>
        <svg
          className={`shrink-0 w-3 h-3 text-white/40 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-[var(--marco-border)]/40 pt-3 space-y-2">
          {event.params && (
            <div>
              <p className="text-[10px] uppercase text-white/40 font-thunder mb-1">Params</p>
              <pre className="text-[11px] text-white/70 bg-black/30 rounded p-2 overflow-x-auto font-mono leading-relaxed">
                {JSON.stringify(event.params, null, 2)}
              </pre>
            </div>
          )}
          {event.result && (
            <div>
              <p className="text-[10px] uppercase text-white/40 font-thunder mb-1">Result</p>
              <pre className="text-[11px] text-white/70 bg-black/30 rounded p-2 overflow-x-auto font-mono leading-relaxed">
                {JSON.stringify(event.result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function ToolActivityFeed({ events }: { events: ToolEvent[] }) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-white/25 text-sm font-interphases">
        Tool activity will appear here
      </div>
    )
  }

  return (
    <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
      {events.map((e, i) => (
        <EventCard key={`${e.tool}-${e.ts}-${i}`} event={e} />
      ))}
    </div>
  )
}
