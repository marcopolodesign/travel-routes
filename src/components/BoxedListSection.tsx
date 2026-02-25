type BoxedListSectionProps = {
  title: string
  items: string[]
  /** Optional subtitle inside box */
  subtitle?: string
}

export default function BoxedListSection({ title, items, subtitle }: BoxedListSectionProps) {
  return (
    <div className="border border-[var(--marco-border)] rounded-lg p-7 md:p-8 mb-8 bg-[var(--marco-accent-light)]/30">
      <h3 className="font-thunder text-lg md:text-xl uppercase text-[var(--marco-accent)] border-b-2 border-[var(--marco-accent)] pb-3 mb-5">
        {title}
      </h3>
      {subtitle && <p className="text-sm text-black/80 mb-3">{subtitle}</p>}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-black border-b border-[var(--marco-border)] last:border-0 pb-3 pt-1 last:pb-0">
            <span className="text-[var(--marco-accent)] mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
