import { Link } from 'react-router-dom'
import MarcopoloLogo from './MarcopoloLogo'

type BudgetTemplateProps = {
  title: string
  timeline?: string
  stack?: string
  whatLabel?: string
  children: React.ReactNode
}

export default function BudgetTemplate({
  title,
  timeline = '—',
  stack = '—',
  whatLabel = 'WHAT',
  children,
}: BudgetTemplateProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-[var(--marco-border)] px-[4vw] py-5 md:px-[10.5vw] md:py-6 flex items-center justify-between">
        <Link to="/" className="text-[var(--marco-accent)] hover:opacity-80 transition-opacity" aria-label="Marco Polo Home">
          <MarcopoloLogo className="h-6 w-auto" />
        </Link>
      </header>

      {/* Top bar – TIMELINE | STACK | WHAT (Figma slide 1) */}
      <div className="border-b border-[var(--marco-border)] px-[4vw] py-5 md:px-[10.5vw] md:py-6">
        <div className="flex flex-wrap gap-6 text-sm md:text-base font-thunder uppercase tracking-wide">
          <span className="text-black">Timeline</span>
          <span className="text-[var(--marco-accent)]">{timeline}</span>
          <span className="text-black">Stack</span>
          <span className="text-[var(--marco-accent)]">{stack}</span>
          <span className="text-black">{whatLabel}</span>
        </div>
      </div>

      <main className="px-[4vw] py-10 md:px-[10.5vw] md:py-16">
        <h1 className="font-thunder text-2xl md:text-3xl uppercase text-[var(--marco-accent)] mb-10 sr-only">
          {title}
        </h1>
        {children}
      </main>
    </div>
  )
}
