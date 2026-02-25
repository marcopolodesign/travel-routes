import { Link } from 'react-router-dom'
import MarcopoloLogo from '../components/MarcopoloLogo'

const budgets = [
  {
    slug: 'health-mvp',
    title: 'MVP Salud y Bienestar',
    description: 'Web App que conecta pacientes con profesionales de la salud. Consultas on-demand y programadas.',
    timeline: '2 a 3 meses',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-black px-[4vw] py-4 md:px-[10.5vw] flex items-center justify-between">
        <Link to="/" className="text-[var(--marco-accent)]" aria-label="Marco Polo Travel Routes">
          <MarcopoloLogo className="h-6 w-auto" />
        </Link>
      </header>

      <main className="px-[4vw] py-16 md:px-[10.5vw] md:py-24">
        <h1 className="font-thunder text-4xl md:text-5xl lg:text-6xl uppercase text-black mb-4">
          Travel Routes
        </h1>
        <p className="text-lg text-black/80 mb-12 max-w-xl">
          Propuestas y presupuestos por proyecto. Seleccioná un budget para ver el detalle.
        </p>

        <div className="space-y-6">
          {budgets.map((b) => (
            <Link
              key={b.slug}
              to={`/budget/${b.slug}`}
              className="block border border-black rounded-lg p-6 hover:bg-[var(--marco-accent-light)]/20 transition-colors group"
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
