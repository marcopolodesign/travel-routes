import { useState } from 'react'
import MermaidDiagram from './MermaidDiagram'

export type DiagramView = {
  /** Mermaid chart source */
  chart: string
  /** One-paragraph explanation shown above the diagram */
  caption: string
  /** Optional key takeaways shown under the diagram */
  points?: string[]
}

type DualDiagramProps = {
  id?: string
  title: string
  /** Small line under the title, shared by both views */
  subtitle?: string
  /** User / front-end perspective — what the person actually sees */
  user: DiagramView
  /** Developer perspective — how it's built */
  dev: DiagramView
  /** Which view opens first. Defaults to the user perspective. */
  defaultView?: 'user' | 'dev'
}

const TABS: { key: 'user' | 'dev'; label: string; hint: string }[] = [
  { key: 'user', label: 'Usuario', hint: 'Lo que se ve en pantalla' },
  { key: 'dev', label: 'Desarrollo', hint: 'Cómo se construye' },
]

export default function DualDiagram({
  id,
  title,
  subtitle,
  user,
  dev,
  defaultView = 'user',
}: DualDiagramProps) {
  const [view, setView] = useState<'user' | 'dev'>(defaultView)
  const active = view === 'user' ? user : dev
  const activeTab = TABS.find(t => t.key === view)!

  return (
    <section
      id={id}
      className="mb-16 md:mb-24 scroll-mt-28 border border-[var(--marco-border)] rounded-lg overflow-hidden bg-white"
    >
      {/* Header: title + switcher */}
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between px-6 md:px-8 pt-7 md:pt-8 pb-5">
        <div className="min-w-0">
          <h3 className="font-thunder text-2xl md:text-3xl uppercase text-[var(--marco-accent)]">
            {title}
          </h3>
          {subtitle && <p className="text-sm text-black/60 mt-2 max-w-xl">{subtitle}</p>}
        </div>

        <div
          className="flex-shrink-0 inline-flex rounded-full border border-[var(--marco-border)] p-1 bg-[var(--marco-bg)] self-start"
          role="tablist"
          aria-label={`Vista del diagrama: ${title}`}
        >
          {TABS.map(tab => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={view === tab.key}
              onClick={() => setView(tab.key)}
              className={[
                'font-thunder uppercase tracking-wide text-sm px-5 py-2 rounded-full transition-colors whitespace-nowrap',
                view === tab.key
                  ? 'bg-[var(--marco-accent)] text-white'
                  : 'text-black/50 hover:text-black/80',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Caption for the active view */}
      <div className="px-6 md:px-8 pb-6">
        <span className="text-xs uppercase tracking-wide text-black/40">{activeTab.hint}</span>
        <p className="text-black/80 mt-2 max-w-3xl">{active.caption}</p>
      </div>

      {/* Diagram */}
      <div className="border-t border-[var(--marco-border)] bg-[var(--marco-accent-light)]/10 px-4 md:px-8 py-8 md:py-10">
        <MermaidDiagram key={view} chart={active.chart} className="min-h-[220px]" />
      </div>

      {/* Key points for the active view */}
      {active.points && active.points.length > 0 && (
        <ul className="border-t border-[var(--marco-border)] divide-y divide-[var(--marco-border)]">
          {active.points.map((point, i) => (
            <li key={i} className="flex gap-3 px-6 md:px-8 py-4 text-black/80">
              <span className="text-[var(--marco-accent)] font-thunder">{String(i + 1).padStart(2, '0')}</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
