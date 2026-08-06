import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'

type ContourLinesProps = {
  /** How many contour lines to draw. */
  lines?: number
  /** Seed-ish offset so two instances on the same page don't look identical. */
  variant?: number
  className?: string
}

const WIDTH = 1200
const HEIGHT = 260
const SAMPLES = 96

/**
 * Builds one elevation contour as a sum of sines — no randomness, so the
 * shapes are stable between renders and identical on the server and client.
 */
function contourPath(index: number, total: number, variant: number): string {
  const baseY = (HEIGHT / (total + 1)) * (index + 1)
  // Lines near the middle of the stack bulge more, like a ridge seen from above.
  const centre = (total - 1) / 2
  const closeness = 1 - Math.abs(index - centre) / (centre || 1)
  const amplitude = 6 + closeness * 26

  let d = ''
  for (let s = 0; s <= SAMPLES; s++) {
    const x = (WIDTH / SAMPLES) * s
    const t = (x / WIDTH) * Math.PI * 2
    const phase = index * 0.42 + variant * 1.7
    const y =
      baseY +
      Math.sin(t * 1.0 + phase) * amplitude +
      Math.sin(t * 2.3 + phase * 1.6) * amplitude * 0.35 +
      Math.sin(t * 3.7 + phase * 0.8) * amplitude * 0.16
    d += `${s === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return d
}

/**
 * Topographic contour lines that draw themselves open, staggered, when the
 * block scrolls into view — the line-reveal motif from the TAG website, bent
 * into elevation curves.
 */
export default function ContourLines({ lines = 11, variant = 0, className }: ContourLinesProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  const paths = useMemo(
    () => Array.from({ length: lines }, (_, i) => contourPath(i, lines, variant)),
    [lines, variant],
  )

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const nodes = Array.from(svg.querySelectorAll<SVGPathElement>('path'))
    if (nodes.length === 0) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      gsap.set(nodes, { opacity: 0.9, strokeDashoffset: 0 })
      return
    }

    nodes.forEach((node) => {
      const length = node.getTotalLength()
      node.style.strokeDasharray = `${length}`
      node.style.strokeDashoffset = `${length}`
    })
    gsap.set(nodes, { opacity: 0 })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          gsap.to(nodes, {
            strokeDashoffset: 0,
            opacity: 0.9,
            duration: 2.2,
            ease: 'power2.inOut',
            stagger: 0.11,
          })
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15 },
    )

    observer.observe(svg)
    return () => observer.disconnect()
  }, [paths])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
      className={className}
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="var(--marco-accent)"
          strokeWidth={1.2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}
