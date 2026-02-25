type TwoColumnSectionProps = {
  title: string
  children: React.ReactNode
  /** Optional decorative bar (light pink) */
  withBar?: boolean
}

export default function TwoColumnSection({ title, children, withBar = true }: TwoColumnSectionProps) {
  return (
    <section className="mb-14 md:mb-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-4 flex flex-col">
          {withBar && (
            <div className="w-1 h-12 bg-[var(--marco-accent-light)] rounded mb-5" aria-hidden />
          )}
          <h2 className="font-thunder text-2xl md:text-3xl lg:text-4xl uppercase text-[var(--marco-accent)]">
            {title}
          </h2>
        </div>
        <div className="md:col-span-8 text-black space-y-4">
          {children}
        </div>
      </div>
    </section>
  )
}
