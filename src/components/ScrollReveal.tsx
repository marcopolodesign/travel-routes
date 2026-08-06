import { useEffect, useRef } from 'react'
import gsap from 'gsap'

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Splits a heading into words, and each word into characters, so the letters
 * can be animated one by one without ever breaking a word across two lines.
 * Returns the character spans in reading order.
 */
function splitHeading(heading: HTMLElement): HTMLSpanElement[] {
  const text = heading.textContent ?? ''
  if (!text.trim()) return []

  heading.textContent = ''
  heading.style.overflow = 'hidden'
  // Descenders get clipped by the mask on tight display line-heights.
  heading.style.paddingBottom = '0.08em'

  const chars: HTMLSpanElement[] = []

  text.split(/(\s+)/).forEach((chunk) => {
    if (chunk === '') return

    if (/^\s+$/.test(chunk)) {
      heading.appendChild(document.createTextNode(' '))
      return
    }

    const word = document.createElement('span')
    word.style.display = 'inline-block'
    word.style.whiteSpace = 'nowrap'

    Array.from(chunk).forEach((char) => {
      const span = document.createElement('span')
      span.style.display = 'inline-block'
      span.textContent = char
      word.appendChild(span)
      chars.push(span)
    })

    heading.appendChild(word)
  })

  return chars
}

/**
 * Reveals each direct child the first time it enters the viewport: the block
 * fades and lifts into place, and its heading types itself in letter by letter
 * from behind a mask. Same mechanics as the TAG website — IntersectionObserver
 * to trigger, GSAP to animate, once per element.
 */
export default function ScrollReveal({ children, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const blocks = Array.from(root.children) as HTMLElement[]
    if (blocks.length === 0) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Nothing here is worth losing the document over: if the animation can't
    // be set up, leave every block plainly visible.
    const revealEverything = () => {
      blocks.forEach((block) => {
        block.style.opacity = '1'
        block.style.transform = 'none'
      })
      root.querySelectorAll<HTMLElement>('h1 span, h2 span, h3 span').forEach((span) => {
        span.style.opacity = '1'
        span.style.transform = 'none'
        span.style.visibility = 'visible'
      })
    }

    const charsByBlock = new Map<HTMLElement, HTMLSpanElement[]>()

    try {
      blocks.forEach((block) => {
        const heading = block.querySelector<HTMLElement>('h1, h2, h3')
        const chars = heading ? splitHeading(heading) : []
        charsByBlock.set(block, chars)

        gsap.set(block, { opacity: 0, y: 24 })
        if (chars.length > 0) gsap.set(chars, { yPercent: 100, autoAlpha: 0 })
      })

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const block = entry.target as HTMLElement

            gsap.to(block, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })

            const chars = charsByBlock.get(block)
            if (chars && chars.length > 0) {
              gsap.to(chars, {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.6,
                ease: 'power3.out',
                stagger: 0.02,
                delay: 0.1,
              })
            }

            observer.unobserve(block)
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -60px 0px' },
      )

      blocks.forEach((block) => observer.observe(block))
      return () => observer.disconnect()
    } catch {
      revealEverything()
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
