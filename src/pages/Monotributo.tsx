import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import MarcopoloLogo from '../components/MarcopoloLogo'
import AuthGate from '../components/AuthGate'

// ─── Static data ─────────────────────────────────────────────

const INVOICES = [
  { num: '0002-00000157', date: '2026-01-19', client: 'HEKTOR S.R.L.', amount: 408851 },
  { num: '0002-00000158', date: '2026-02-23', client: 'HEKTOR S.R.L.', amount: 261308 },
  { num: '0002-00000159', date: '2026-03-10', client: 'CARRIQUIRI IGNACIO FEDERICO', amount: 2830000 },
  { num: '0002-00000160', date: '2026-03-20', client: 'HEKTOR S.R.L.', amount: 317147.24 },
  { num: '0002-00000161', date: '2026-04-15', client: 'HEKTOR S.R.L.', amount: 282330 },
  { num: '0002-00000162', date: '2026-04-29', client: 'CARRIQUIRI IGNACIO FEDERICO', amount: 2840000 },
  { num: '0002-00000163', date: '2026-05-21', client: 'HEKTOR S.R.L.', amount: 381446 },
  { num: '0002-00000164', date: '2026-06-22', client: 'HEKTOR S.R.L.', amount: 454296 },
  { num: '0003-00000001', date: '2026-07-01', client: 'MOSERINI SAS', amount: 1053500 },
  { num: '0003-00000002', date: '2026-07-01', client: 'MOSERINI SAS', amount: 3562500 },
]

const CATS = [
  { cat: 'A', limit: 10_277_988 },
  { cat: 'B', limit: 15_058_448 },
  { cat: 'C', limit: 21_113_697 },
  { cat: 'D', limit: 26_212_853 },
  { cat: 'E', limit: 30_833_964 },
] as const

const FUTURE_MONTHS = [
  { key: '2026-08', label: 'AGO 26' },
  { key: '2026-09', label: 'SEP 26' },
  { key: '2026-10', label: 'OCT 26' },
  { key: '2026-11', label: 'NOV 26' },
  { key: '2026-12', label: 'DIC 26' },
  { key: '2027-01', label: 'ENE 27' },
  { key: '2027-02', label: 'FEB 27' },
  { key: '2027-03', label: 'MAR 27' },
]

// Scale: show up to Cat C for context
const BAR_SCALE = CATS[2].limit // $21,113,697

// ─── Helpers ─────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}
function money(n: number) { return `$${fmt(n)}` }
function pct(v: number, scale = BAR_SCALE) { return Math.min((v / scale) * 100, 100) }

function getCurrentCat(total: number) {
  for (const c of CATS) if (total < c.limit) return c
  return CATS[CATS.length - 1]
}

const CAT_TEXT: Record<string, string> = {
  A: 'text-emerald-600', B: 'text-yellow-600', C: 'text-orange-500', D: 'text-red-500', E: 'text-red-700',
}
const CAT_BG: Record<string, string> = {
  A: 'bg-emerald-500', B: 'bg-yellow-500', C: 'bg-orange-500', D: 'bg-red-500', E: 'bg-red-700',
}
const CAT_BORDER: Record<string, string> = {
  A: '#22c55e', B: '#eab308', C: '#f97316', D: '#ef4444', E: '#b91c1c',
}

// ─── Page ────────────────────────────────────────────────────

export default function Monotributo() {
  const [nextRaw, setNextRaw] = useState('')

  const baseTotal = useMemo(() => INVOICES.reduce((s, i) => s + i.amount, 0), [])

  const nextAmount = useMemo(() => {
    const cleaned = nextRaw.replace(/\./g, '').replace(',', '.')
    const v = parseFloat(cleaned)
    return isNaN(v) || v < 0 ? 0 : v
  }, [nextRaw])

  const total = baseTotal + nextAmount

  // Average: 7 billed months (Jan–Jul), based on base total (not simulated)
  const avgMonthly = baseTotal / 7
  const currentCat = getCurrentCat(total)
  const nextCat = CATS.find(c => c.limit > total) ?? CATS[CATS.length - 1]
  const remainingToNext = Math.max(0, nextCat.limit - total)
  const monthsToNext = remainingToNext / avgMonthly

  // Projected month rows
  const projection = FUTURE_MONTHS.map((m, i) => {
    const projected = total + avgMonthly * (i + 1)
    const cat = getCurrentCat(projected)
    const prevTotal = total + avgMonthly * i
    const prevCat = getCurrentCat(prevTotal)
    const crossed = prevCat.cat !== cat.cat ? cat : null
    return { ...m, projected, cat, crossed, prevTotal }
  })

  // Max monthly to stay in current cat for remaining 5 months (Aug-Dec)
  const remainingMonths2026 = 5
  const maxPerMonthForCatA = remainingToNext > 0 ? Math.floor(remainingToNext / remainingMonths2026) : 0

  return (
    <AuthGate>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-[var(--marco-border)] px-6 py-5 md:px-[8vw] flex items-center justify-between">
          <Link to="/" className="text-[var(--marco-accent)]">
            <MarcopoloLogo className="h-6 w-auto" />
          </Link>
          <span className="font-thunder text-sm uppercase tracking-widest text-black/30">
            Monotributo 2026
          </span>
        </header>

        <main className="px-6 py-12 md:px-[8vw] max-w-[860px] mx-auto space-y-14">

          {/* ── Stat cards ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              label="Facturado 2026"
              value={money(total)}
              sub={nextAmount > 0 ? `base ${money(baseTotal)} + ${money(nextAmount)} simulado` : '9 facturas'}
              accent
            />
            <StatCard
              label="Promedio / mes"
              value={money(Math.round(avgMonthly))}
              sub="Jan–Jul (7 meses)"
            />
            <StatCard
              label={`Queda Cat ${nextCat.cat}`}
              value={remainingToNext > 0 ? money(remainingToNext) : '—'}
              sub={remainingToNext > 0
                ? `${monthsToNext.toFixed(1)} mes${monthsToNext !== 1 ? 'es' : ''} al ritmo actual`
                : `Cat ${nextCat.cat} superada`}
            />
            <StatCard
              label="Categoría actual"
              value={`CAT ${currentCat.cat}`}
              sub={`Límite ${money(currentCat.limit)}`}
              catColor={CAT_TEXT[currentCat.cat]}
            />
          </div>

          {/* ── Category bar ── */}
          <section>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="font-thunder text-2xl uppercase">Posición en categorías</h2>
              <span className="text-xs text-black/30">escala hasta Cat C · {money(BAR_SCALE)}</span>
            </div>

            {/* Bar */}
            <div className="relative h-10 bg-black/[0.04] rounded-full overflow-hidden mb-1">
              {/* Fill */}
              <div
                className="absolute top-0 left-0 h-full bg-[var(--marco-accent)] rounded-full transition-all duration-500"
                style={{ width: `${pct(total)}%` }}
              />
              {/* Category limit lines */}
              {CATS.slice(0, 3).map((c) => (
                <div
                  key={c.cat}
                  className="absolute top-0 bottom-0 w-0.5 opacity-80"
                  style={{ left: `${pct(c.limit)}%`, backgroundColor: CAT_BORDER[c.cat] }}
                />
              ))}
            </div>

            {/* Category labels */}
            <div className="relative h-6 mb-1">
              {CATS.slice(0, 3).map((c) => {
                const p = pct(c.limit)
                if (p > 97) return null
                return (
                  <div
                    key={c.cat}
                    className={`absolute text-[11px] font-bold -translate-x-1/2 ${CAT_TEXT[c.cat]}`}
                    style={{ left: `${p}%` }}
                  >
                    Cat {c.cat}
                  </div>
                )
              })}
            </div>

            {/* Amount labels */}
            <div className="relative h-4">
              {CATS.slice(0, 3).map((c) => {
                const p = pct(c.limit)
                if (p > 97) return null
                return (
                  <div
                    key={c.cat}
                    className="absolute text-[10px] text-black/30 -translate-x-1/2 whitespace-nowrap"
                    style={{ left: `${p}%` }}
                  >
                    {money(c.limit)}
                  </div>
                )
              })}
            </div>

            {/* Monthly cap hint */}
            {maxPerMonthForCatA > 0 && (
              <div className="mt-4 text-sm text-black/50 border border-[var(--marco-border)] rounded-lg px-4 py-3 bg-[var(--marco-bg)]">
                Para mantenerte en Cat A hasta diciembre: máx{' '}
                <span className="font-thunder text-base text-black">{money(maxPerMonthForCatA)}/mes</span>
                {' '}durante los próximos {remainingMonths2026} meses
              </div>
            )}
          </section>

          {/* ── Monthly projection ── */}
          <section>
            <div className="flex items-baseline justify-between mb-1">
              <h2 className="font-thunder text-2xl uppercase">Proyección mensual</h2>
            </div>
            <p className="text-xs text-black/40 mb-6">
              A ritmo de {money(Math.round(avgMonthly))}/mes partiendo de {money(total)}
            </p>

            <div className="space-y-2.5">
              {projection.map((m, i) => (
                <ProjectionRow
                  key={m.key}
                  label={m.label}
                  projected={m.projected}
                  prevTotal={m.prevTotal}
                  cat={m.cat.cat}
                  crossed={m.crossed?.cat ?? null}
                  isFirst={i === 0}
                />
              ))}
            </div>
          </section>

          {/* ── Simulator ── */}
          <section className="border border-[var(--marco-border)] rounded-2xl p-6 md:p-8">
            <h2 className="font-thunder text-2xl uppercase mb-1">Simulá tu próxima factura</h2>
            <p className="text-xs text-black/40 mb-6">
              El dashboard se actualiza en tiempo real
            </p>

            <div className="flex flex-wrap gap-4 items-center mb-6">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 text-sm">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={nextRaw}
                  onChange={(e) => setNextRaw(e.target.value)}
                  placeholder="1.000.000"
                  className="pl-7 pr-4 py-3 border border-[var(--marco-border)] rounded-xl text-sm w-48 focus:outline-none focus:border-[var(--marco-accent)] font-thunder text-lg"
                />
              </div>
              {nextAmount > 0 && (
                <button
                  onClick={() => setNextRaw('')}
                  className="text-xs text-black/30 hover:text-black/60 underline"
                >
                  Limpiar
                </button>
              )}
            </div>

            {nextAmount > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <SimResult label="Nuevo total" value={money(total)} />
                <SimResult
                  label={`Queda Cat ${nextCat.cat}`}
                  value={remainingToNext > 0 ? money(remainingToNext) : '¡Superás!'}
                  color={remainingToNext > 0 ? undefined : 'text-red-500'}
                />
                <SimResult
                  label="Categoría"
                  value={`Cat ${currentCat.cat}`}
                  color={CAT_TEXT[currentCat.cat]}
                />
                <SimResult
                  label="Meses hasta Cat B"
                  value={(() => {
                    const rem = CATS[1].limit - total
                    if (rem <= 0) return 'Cat B ya'
                    const m = rem / avgMonthly
                    return `~${m.toFixed(1)} meses`
                  })()}
                />
              </div>
            )}
          </section>

          {/* ── Invoice history ── */}
          <section>
            <h2 className="font-thunder text-2xl uppercase mb-5">Historial 2026</h2>
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--marco-border)]">
                    {['Comprobante', 'Fecha', 'Cliente', 'Importe'].map((h, i) => (
                      <th
                        key={h}
                        className={`py-2 pr-4 text-[11px] text-black/30 font-normal ${i === 3 ? 'text-right pr-0' : 'text-left'}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...INVOICES].reverse().map((inv) => (
                    <tr key={inv.num} className="border-b border-black/[0.04] hover:bg-black/[0.02]">
                      <td className="py-3 pr-4 font-mono text-[11px] text-black/40">{inv.num}</td>
                      <td className="py-3 pr-4 text-black/60 text-xs">
                        {inv.date.slice(8)}/{inv.date.slice(5, 7)}/{inv.date.slice(0, 4)}
                      </td>
                      <td className="py-3 pr-4 text-black/80">{inv.client}</td>
                      <td className="py-3 text-right font-thunder text-base">{money(inv.amount)}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-black">
                    <td colSpan={3} className="py-3 font-thunder text-xs uppercase tracking-wider">Total facturado</td>
                    <td className="py-3 text-right font-thunder text-xl text-[var(--marco-accent)]">
                      {money(baseTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </AuthGate>
  )
}

// ─── Sub-components ───────────────────────────────────────────

function StatCard({
  label, value, sub, accent, catColor,
}: {
  label: string; value: string; sub?: string; accent?: boolean; catColor?: string
}) {
  return (
    <div className="border border-[var(--marco-border)] rounded-xl p-4 md:p-5">
      <div className="text-[10px] uppercase tracking-wider text-black/30 mb-2">{label}</div>
      <div className={`font-thunder text-2xl leading-none mb-1.5 ${accent ? 'text-[var(--marco-accent)]' : catColor ?? 'text-black'}`}>
        {value}
      </div>
      {sub && <div className="text-[10px] text-black/30 leading-snug">{sub}</div>}
    </div>
  )
}

function ProjectionRow({
  label, projected, prevTotal, cat, crossed, isFirst,
}: {
  label: string; projected: number; prevTotal: number; cat: string; crossed: string | null; isFirst: boolean
}) {
  const fillPrev = pct(prevTotal)
  const fillNew = pct(projected)
  const addWidth = fillNew - fillPrev

  return (
    <div className="flex items-center gap-3">
      <div className="w-14 flex-shrink-0 text-[11px] text-black/40 font-mono">{label}</div>

      {/* Bar */}
      <div className="flex-1 h-5 bg-black/[0.04] rounded-full overflow-hidden relative">
        {/* Base fill (grey = already billed) */}
        <div
          className="absolute top-0 left-0 h-full bg-black/10 rounded-l-full"
          style={{ width: `${fillPrev}%` }}
        />
        {/* Projected addition */}
        <div
          className={`absolute top-0 h-full ${CAT_BG[cat] ?? 'bg-gray-400'} opacity-60`}
          style={{ left: `${fillPrev}%`, width: `${Math.max(addWidth, 0)}%` }}
        />
        {/* Category limit lines */}
        {CATS.slice(0, 3).map((c) => {
          const p = pct(c.limit)
          if (p > 99) return null
          return (
            <div
              key={c.cat}
              className="absolute top-0 bottom-0 w-px opacity-60"
              style={{ left: `${p}%`, backgroundColor: CAT_BORDER[c.cat] }}
            />
          )
        })}
      </div>

      {/* Amount */}
      <div className="w-28 flex-shrink-0 text-right">
        <span className={`font-thunder text-sm ${isFirst ? 'text-black' : 'text-black/60'}`}>
          {money(projected)}
        </span>
        {crossed && (
          <span className={`ml-1.5 text-[9px] font-bold uppercase ${CAT_TEXT[crossed]}`}>
            ↑ Cat {crossed}
          </span>
        )}
      </div>
    </div>
  )
}

function SimResult({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-[var(--marco-bg)] rounded-xl p-4">
      <div className="text-[10px] uppercase tracking-wider text-black/30 mb-1.5">{label}</div>
      <div className={`font-thunder text-xl leading-none ${color ?? 'text-black'}`}>{value}</div>
    </div>
  )
}
