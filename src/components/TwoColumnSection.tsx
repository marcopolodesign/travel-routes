type TwoColumnSectionProps = {
  title: string
  children: React.ReactNode
  /** Optional decorative bar (light pink) */
  withBar?: boolean
  id?: string
}

export default function TwoColumnSection({ title, children, withBar = true, id }: TwoColumnSectionProps) {
  return (
    <section id={id} className="mb-20 md:mb-28 scroll-mt-28">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-4 self-start sticky top-16 md:top-[190px] flex flex-row items-start gap-4">
          {withBar && (
            <div className="w-1 self-stretch bg-[var(--marco-accent-light)] rounded flex-shrink-0" aria-hidden />
          )}
          <h2 className="font-thunder text-3xl md:text-4xl uppercase text-[var(--marco-accent)]">
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
