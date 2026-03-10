type ContentBoxProps = {
  title: string
  children: React.ReactNode
  id?: string
}

export default function ContentBox({ title, children, id }: ContentBoxProps) {
  return (
    <div id={id} className="mb-20 md:mb-28 scroll-mt-28 border border-[var(--marco-border)] rounded-lg p-7 md:p-8 bg-[var(--marco-accent-light)]/20">
      <h3 className="font-thunder text-2xl md:text-4xl uppercase text-[var(--marco-accent)] mb-5">
        {title}
      </h3>
      <div className="text-black space-y-3">
        {children}
      </div>
    </div>
  )
}
