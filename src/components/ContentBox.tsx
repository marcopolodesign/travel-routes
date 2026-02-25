type ContentBoxProps = {
  title: string
  children: React.ReactNode
}

export default function ContentBox({ title, children }: ContentBoxProps) {
  return (
    <div className="border border-[var(--marco-border)] rounded-lg p-7 md:p-8 bg-[var(--marco-accent-light)]/20">
      <h3 className="font-thunder text-lg md:text-xl uppercase text-[var(--marco-accent)] mb-5">
        {title}
      </h3>
      <div className="text-black space-y-3">
        {children}
      </div>
    </div>
  )
}
