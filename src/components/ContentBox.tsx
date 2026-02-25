type ContentBoxProps = {
  title: string
  children: React.ReactNode
}

export default function ContentBox({ title, children }: ContentBoxProps) {
  return (
    <div className="border border-black rounded-lg p-6 bg-[var(--marco-accent-light)]/20">
      <h3 className="font-thunder text-lg md:text-xl uppercase text-[var(--marco-accent)] mb-4">
        {title}
      </h3>
      <div className="text-black space-y-2">
        {children}
      </div>
    </div>
  )
}
