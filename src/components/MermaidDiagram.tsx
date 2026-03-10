import { useLayoutEffect, useState, useId } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'loose',
  themeVariables: {
    primaryColor: '#e66065',
    primaryTextColor: '#fff',
    primaryBorderColor: '#c44a4f',
    lineColor: '#000',
    secondaryColor: '#f5b5b8',
    secondaryTextColor: '#000',
    secondaryBorderColor: '#e66065',
    tertiaryColor: '#fff',
    tertiaryTextColor: '#000',
    tertiaryBorderColor: '#d1d5db',
    noteBkgColor: '#f5b5b8',
    noteTextColor: '#000',
    noteBorderColor: '#e66065',
    edgeLabelBackground: '#fff',
    clusterBkg: '#f5b5b8',
    clusterBorder: '#e66065',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '14px',
  },
})

type MermaidDiagramProps = {
  chart: string
  className?: string
}

export default function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, '')
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  useLayoutEffect(() => {
    let cancelled = false
    setError(null)
    setSvg('')

    const render = async () => {
      try {
        await mermaid.parse(chart)
        if (cancelled) return
        const { svg: svgCode } = await mermaid.render(`mermaid-${id}`, chart)
        if (cancelled) return
        setSvg(svgCode)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Diagram error')
      }
    }

    render()
    return () => { cancelled = true }
  }, [chart, id])

  if (error) {
    return (
      <div className={`rounded border border-red-200 bg-red-50 p-4 text-sm text-red-800 ${className}`}>
        Mermaid: {error}
      </div>
    )
  }

  if (!svg) {
    return <div className={`min-h-[200px] animate-pulse rounded bg-black/5 ${className}`} />
  }

  return (
    <div
      className={`mermaid-diagram flex justify-center overflow-x-auto [&_svg]:max-w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
