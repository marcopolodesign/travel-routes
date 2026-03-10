/**
 * Horizontal timeline: title, line with dots, pill labels above, task lists below.
 * Matches Marco Polo style (salmon pills, grey line/dots, dark grey text).
 */
export type TimelineStep = {
  label: string
  items: string[]
}

type TimelineProps = {
  title?: string
  steps: TimelineStep[]
}

export default function Timeline({ title = 'TIMELINE', steps }: TimelineProps) {
  return (
    <div className="timeline">
      {title && (
        <h3 className="font-thunder text-2xl md:text-3xl uppercase text-black mb-10 md:mb-12">
          {title}
        </h3>
      )}

      <div className="relative">
        {/* Pill labels above the line */}
        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
          {steps.map((step, i) => (
            <div key={i} className="flex justify-center">
              <span
                className="inline-block px-5 py-2 rounded-full bg-[var(--marco-accent)] text-white font-thunder text-sm md:text-base uppercase tracking-wide"
                aria-hidden
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Horizontal line with dots (line runs through dots) */}
        <div className="relative flex items-center mb-8 h-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-0.5 bg-[var(--marco-border)]" aria-hidden />
          </div>
          <div className="relative flex justify-between w-full px-0">
            {steps.map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full bg-[var(--marco-gray)] flex-shrink-0 z-10" aria-hidden />
            ))}
          </div>
        </div>

        {/* Task lists below */}
        <div className="grid gap-6 md:gap-10" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
          {steps.map((step, i) => (
            <div key={i} className="min-w-0">
              <ul className="space-y-3 text-[var(--marco-gray)] text-sm md:text-base list-disc pl-5">
                {step.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
