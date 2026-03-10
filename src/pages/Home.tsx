import { Link } from 'react-router-dom'
import MarcopoloLogo from '../components/MarcopoloLogo'

const budgets = [
  {
    slug: 'health-mvp',
    title: 'MVP Salud y Bienestar',
    description: 'Web App que conecta pacientes con profesionales de la salud. Consultas on-demand y programadas.',
    timeline: '2 a 3 meses',
  },
  {
    slug: 'tecnofit',
    title: 'TecnoFit',
    description: 'Website, Admin panel, and App (design + coding). Budget tracking with payment history.',
    timeline: 'Ongoing',
  },
  {
    slug: 'ronzio',
    title: 'Ronzio',
    description: 'Revisión de landing page, CRM a medida para tracking de leads, UTMs y ciclo de vida del usuario.',
    timeline: '45–60 días',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[var(--marco-border)] px-[4vw] py-5 md:px-[10.5vw] md:py-6 flex items-center justify-between">
        <Link to="/" className="text-[var(--marco-accent)]" aria-label="Marco Polo Travel Routes">
          <MarcopoloLogo className="h-6 w-auto" />
        </Link>
        <Link
          to="/agent"
          className="flex items-center gap-2 text-sm font-interphases px-4 py-2 rounded-full border border-[var(--marco-border)] hover:border-[var(--marco-accent)] hover:text-[var(--marco-accent)] transition-colors text-black/60"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="2" width="6" height="12" rx="3" />
            <path d="M5 10a7 7 0 0 0 14 0" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="8" y1="22" x2="16" y2="22" />
          </svg>
          Voice Agent
        </Link>
      </header>

      <main className="px-[4vw] py-20 md:px-[10.5vw] md:py-28">
        <h1 className="font-thunder text-4xl md:text-5xl lg:text-6xl uppercase text-black mb-6">
          Travel Routes
        </h1>
        <p className="text-lg text-black/80 mb-14 max-w-xl">
          Propuestas y presupuestos por proyecto. Seleccioná un budget para ver el detalle.
        </p>

        <div className="space-y-8">
          {budgets.map((b) => (
            <Link
              key={b.slug}
              to={`/budget/${b.slug}`}
              className="block border border-[var(--marco-border)] rounded-lg p-7 md:p-8 hover:bg-[var(--marco-accent-light)]/20 transition-colors group"
            >
              <div className="flex flex-wrap items-baseline gap-4">
                <h2 className="font-thunder text-xl md:text-2xl uppercase text-[var(--marco-accent)] group-hover:underline">
                  {b.title}
                </h2>
                <span className="text-sm text-black/60">{b.timeline}</span>
              </div>
              <p className="mt-2 text-black/80">{b.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
