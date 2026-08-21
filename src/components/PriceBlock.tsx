type PriceBlockProps = {
  title: string
  /** Plain number in USD, or a string when the figure is not closed yet. */
  amount: number | string
  /** Short line under the title — timeline, phase, what the figure covers. */
  meta?: string
  children?: React.ReactNode
  /** Set to false to drop the outer border — default true, unchanged everywhere else. */
  border?: boolean
}

function formatCurrency(value: number | string): string {
  if (typeof value === 'string') return value
  return `$${value.toLocaleString('en-US')}`
}

/**
 * A single closed figure for a scope of work. Deliberately has no line items:
 * the proposal quotes the option as a whole, not module by module.
 */
export default function PriceBlock({ title, amount, meta, children, border = true }: PriceBlockProps) {
  return (
    <section className="mb-14 md:mb-20">
      <div className={['rounded-lg overflow-hidden', border ? 'border border-[var(--marco-border)]' : ''].join(' ')}>
        <div className="bg-[var(--marco-accent)] px-7 py-6 md:px-8 md:py-7">
          <h2 className="font-thunder text-2xl md:text-3xl uppercase text-white">
            {title}
          </h2>
          {meta && (
            <p className="mt-1 text-sm md:text-base text-white/85 font-interphases">{meta}</p>
          )}
        </div>

        <div className="px-7 py-8 md:px-8 md:py-10 bg-[var(--marco-bg)]">
          <span className="block text-sm text-black/60 uppercase tracking-wide mb-2">
            Total
          </span>
          <p className="font-thunder text-5xl md:text-6xl lg:text-7xl leading-none text-[var(--marco-accent)]">
            {formatCurrency(amount)}
          </p>
          {children && (
            <div className="mt-6 text-black space-y-3 max-w-2xl">{children}</div>
          )}
        </div>
      </div>
    </section>
  )
}
