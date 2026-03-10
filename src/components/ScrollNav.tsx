import { useState, useEffect, useRef } from 'react'

export type NavItem = { id: string; label: string }

export default function ScrollNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '')
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-10% 0px -70% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [items])

  // Scroll active pill into view in the nav bar
  useEffect(() => {
    const nav = navRef.current
    const pill = nav?.querySelector<HTMLElement>(`[data-id="${active}"]`)
    if (nav && pill) {
      const pillLeft = pill.offsetLeft
      const pillRight = pillLeft + pill.offsetWidth
      const navWidth = nav.clientWidth
      const scrollLeft = nav.scrollLeft
      if (pillLeft < scrollLeft + 24) {
        nav.scrollTo({ left: pillLeft - 24, behavior: 'smooth' })
      } else if (pillRight > scrollLeft + navWidth - 24) {
        nav.scrollTo({ left: pillRight - navWidth + 24, behavior: 'smooth' })
      }
    }
  }, [active])

  return (
    <div className="bg-white/95 backdrop-blur border-b border-[var(--marco-border)]">
      <div
        ref={navRef}
        className="flex flex-row overflow-x-auto px-[4vw] md:px-[10.5vw]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map(({ id, label }) => (
          <button
            key={id}
            data-id={id}
            onClick={() =>
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            className={[
              'flex-shrink-0 font-thunder uppercase tracking-wide text-sm py-3 px-4 border-b-2 transition-colors whitespace-nowrap',
              active === id
                ? 'border-[var(--marco-accent)] text-[var(--marco-accent)]'
                : 'border-transparent text-black/40 hover:text-black/70',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
