import { useEffect, useRef } from 'react'
import gsap from 'gsap'

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Fades each direct child in and lifts it into place the first time it enters
 * the viewport. Same approach as the TAG website — IntersectionObserver to
 * trigger, GSAP to animate, once per element — but applied to a whole group so
 * the page markup stays clean.
 */
export default function ScrollReveal({ children, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const blocks = Array.from(root.children) as HTMLElement[]
    if (blocks.length === 0) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.set(blocks, { opacity: 0, y: 28 })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          })
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' },
    )

    blocks.forEach((block) => observer.observe(block))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
