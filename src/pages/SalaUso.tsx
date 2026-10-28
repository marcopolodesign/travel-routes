// Sala · Uso — vista del dueño de la sala (sólo Mateo): pedidos con peso por semana y por mes, % del cupo,
// mensajes y sesiones por persona, tiempo de respuesta del agente, pedidos por tarjeta y consumo del agente.
// Los datos salen de GET /sala/uso (repo sala, supabase/functions/sala/pedidos.ts). Texto en rioplatense: lo ve el dueño.
import { useEffect, useState } from 'react'

type Semana = { semana: string; pedidos: number; peso: number; chico: number; mediano: number; grande: number }
type Mes = { mes: string; pedidos: number; peso: number; extra: number; chico: number; mediano: number; grande: number; pct_cupo: number | null }
type Persona = { autor: string; equipo: boolean; semanas: { semana: string; mensajes: number; sesiones: number; minutos: number }[]; mensajes: number; sesiones: number }
type Pedido = { id: number; pedido_por: string | null; titulo: string; link: string | null; tamano: string; peso: number; tarjeta: string | null; abierto: string; cerrado: string; extra: number; minutos: number | null }
export type DatosUso = {
  semanas: string[]; cupo: number | null; precio_extra: number | null
  mes_actual: { mes: string; usados: number; cupo: number; pedidos: number; extra: number } | null
  pedidos: { por_mes: Mes[]; por_semana: Semana[]; ultimos: Pedido[] }
  personas: Persona[]
  respuesta: { mediana_seg: number | null; p90_seg: number | null; casos: number; sin_respuesta: number; semanas: { semana: string; mediana_seg: number | null; casos: number }[] }
  tarjetas: { tarjeta: string; titulo: string; pedidos: number; peso: number; usos: number }[]
  consumo: { tokens: number; salida: number; respuestas: number; pct_cuenta: number | null; actualizado: string; semanas: { semana: string; tokens: number; pct_cuenta: number | null }[] } | null
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
const fSem = (s: string) => { const [, m, d] = s.split('-').map(Number); return `${d} ${MESES[m - 1]}` }
const fMes = (s: string) => { const [y, m] = s.split('-').map(Number); return `${MESES[m - 1]} ${y}` }
const fFecha = (iso: string) => new Date(iso).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
const fDur = (seg: number | null) => seg == null ? '—' : seg < 90 ? `${Math.round(seg)} s` : seg < 5400 ? `${Math.round(seg / 60)} min` : `${(seg / 3600).toFixed(1)} h`
const coma = (x: number, d = 1) => x.toLocaleString('es-AR', { minimumFractionDigits: d, maximumFractionDigits: d })
const fTok = (n: number) => n >= 1e6 ? `${coma(n / 1e6)} M` : `${Math.round(n / 1e3)} k`
const pl = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`
const TAM: Record<string, string> = { chico: 'Chico', mediano: 'Mediano', grande: 'Grande' }

export default function Uso({ cargar }: { cargar: (semanas: number) => Promise<DatosUso> }) {
  const [semanas, setSemanas] = useState(8)
  const [d, setD] = useState<DatosUso | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    let vivo = true
    setError(null)
    cargar(semanas).then((r) => { if (vivo) setD(r) }).catch((e) => { if (vivo) setError((e as Error).message) })
    return () => { vivo = false }
  }, [semanas, cargar])

  if (error) return <div className="uso"><p className="uso-err" role="alert">No se pudo cargar el uso: {error}</p></div>
  if (!d) return <div className="uso"><p className="uso-nota"><span className="spin" /> Cargando el uso…</p></div>

  const m = d.mes_actual
  const mesActual = d.pedidos.por_mes.find((x) => x.mes === m?.mes)
  const pct = m && m.cupo ? Math.round((m.usados / m.cupo) * 100) : null
  const semVis = d.semanas.slice(-semanas)
  const barras = d.pedidos.por_semana.slice(-semanas)
  const conTiempo = d.pedidos.ultimos.some((p) => p.minutos)
  const maxPeso = Math.max(1, ...barras.map((s) => s.peso))

  return (
    <div className="uso">
      <div className="uso-top">
        <h2>Uso de la sala</h2>
        <div className="seg sm" role="radiogroup" aria-label="Período">
          {[4, 8, 12].map((n) => (
            <button key={n} type="button" role="radio" aria-checked={semanas === n} className={semanas === n ? 'on' : ''} onClick={() => setSemanas(n)}>{n} semanas</button>
          ))}
        </div>
      </div>

      <div className="tiles">
        <div className="tile">
          <div className="label">Cupo de {m ? fMes(m.mes) : 'este mes'}</div>
          <div className="big">{m ? <>{m.usados}<small>/{m.cupo}</small></> : '—'}</div>
          {pct != null && <div className={`meter ${pct >= 100 ? 'lleno' : ''}`} role="meter" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Cupo usado"><i style={{ width: `${Math.min(100, pct)}%` }} /></div>}
          <div className="sub">{pct == null ? 'Sin cupo cargado' : m!.usados > m!.cupo ? `${pl(m!.usados - m!.cupo, 'adicional', 'adicionales')}${d.precio_extra ? ` · ${(m!.usados - m!.cupo) * d.precio_extra} €` : ''}` : `quedan ${m!.cupo - m!.usados}`}</div>
        </div>
        <div className="tile">
          <div className="label">Pedidos este mes</div>
          <div className="big">{m?.pedidos ?? 0}</div>
          <div className="sub">{mesActual ? `${pl(mesActual.chico, 'chico', 'chicos')} · ${pl(mesActual.mediano, 'mediano', 'medianos')} · ${pl(mesActual.grande, 'grande', 'grandes')}` : 'Todavía ninguno'}</div>
        </div>
        <div className="tile">
          <div className="label">Respuesta</div>
          <div className="big">{fDur(d.respuesta.mediana_seg)}</div>
          <div className="sub">{d.respuesta.casos ? `mediana · ${pl(d.respuesta.casos, 'caso', 'casos')}${d.respuesta.casos >= 10 ? ` · 9 de 10 en < ${fDur(d.respuesta.p90_seg)}` : ''}` : 'Sin casos todavía'}{d.respuesta.sin_respuesta ? ` · ${d.respuesta.sin_respuesta} sin respuesta` : ''}</div>
        </div>
        <div className="tile">
          <div className="label" title="Tokens de la sesión del agente de esta sala sobre el total de la cuenta de Claude">Consumo</div>
          <div className="big">{d.consumo?.pct_cuenta != null ? <>{coma(d.consumo.pct_cuenta)}<small> %</small></> : '—'}</div>
          <div className="sub" title={d.consumo ? `${d.consumo.respuestas} respuestas del agente` : undefined}>{d.consumo ? `${fTok(d.consumo.tokens)} tokens · al ${fFecha(d.consumo.actualizado + 'T12:00:00Z')}` : 'Todavía no se subió'}</div>
        </div>
      </div>

      <section>
        <h3>Pedidos por semana <span>peso sumado · chico 1, mediano 2</span></h3>
        <div className="bars" role="img" aria-label={'Peso de pedidos por semana: ' + barras.map((s) => `${fSem(s.semana)} ${s.peso}`).join(', ')}>
          {barras.map((s) => (
            <div className="bcol" key={s.semana} title={`Semana del ${fSem(s.semana)}: ${pl(s.pedidos, 'pedido', 'pedidos')}, peso ${s.peso} (${pl(s.chico, 'chico', 'chicos')}, ${pl(s.mediano, 'mediano', 'medianos')}, ${pl(s.grande, 'grande', 'grandes')})`}>
              <span className="bval">{s.peso || ''}</span>
              <i style={{ height: `${(s.peso / maxPeso) * 100}%` }} className={s.peso ? '' : 'cero'} />
              <span className="blab">{fSem(s.semana)}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Por mes</h3>
        <div className="scroll"><table>
          <thead><tr><th>Mes</th><th className="n">Pedidos</th><th className="n">Peso</th><th className="n">% cupo</th><th className="n">Chicos</th><th className="n">Medianos</th><th className="n">Grandes</th><th className="n">Adicionales</th></tr></thead>
          <tbody>{d.pedidos.por_mes.length ? d.pedidos.por_mes.map((x) => (
            <tr key={x.mes}><td>{fMes(x.mes)}</td><td className="n">{x.pedidos}</td><td className="n">{x.peso}</td><td className="n">{x.pct_cupo != null ? `${x.pct_cupo}%` : '—'}</td>
              <td className="n">{x.chico}</td><td className="n">{x.mediano}</td><td className="n">{x.grande}</td><td className="n">{x.extra || '—'}</td></tr>
          )) : <tr><td colSpan={8} className="vacio">Todavía no se cerró ningún pedido.</td></tr>}</tbody>
        </table></div>
      </section>

      <section>
        <h3>Personas por semana <span title="Una sesión empieza cuando la persona vuelve a la sala después de 30 min sin tenerla abierta">mensajes · sesiones</span></h3>
        <div className="scroll"><table>
          <thead><tr><th>Persona</th>{semVis.map((s) => <th key={s} className="n">{fSem(s)}</th>)}<th className="n">Total</th></tr></thead>
          <tbody>{d.personas.length ? d.personas.map((p) => (
            <tr key={p.autor}><td>{p.autor}{p.equipo && <span className="eq">equipo</span>}</td>
              {semVis.map((s) => { const c = p.semanas.find((x) => x.semana === s); return <td key={s} className="n" title={c ? `${c.minutos} min con la sala abierta` : undefined}>{c && (c.mensajes || c.sesiones) ? <>{c.mensajes}<small> · {c.sesiones}</small></> : <span className="cero">—</span>}</td> })}
              <td className="n"><b>{p.mensajes}</b><small> · {p.sesiones}</small></td></tr>
          )) : <tr><td colSpan={semVis.length + 2} className="vacio">Nadie escribió todavía.</td></tr>}</tbody>
        </table></div>
      </section>

      <div className="dos">
        <section>
          <h3>Qué piden <span>por tarjeta</span></h3>
          <div className="scroll"><table>
            <thead><tr><th>Tarjeta</th><th className="n">Usada</th><th className="n">Pedidos</th><th className="n">Peso</th></tr></thead>
            <tbody>{d.tarjetas.length ? d.tarjetas.map((x) => (
              <tr key={x.tarjeta}><td>{x.titulo}</td><td className="n">{x.usos}</td><td className="n">{x.pedidos}</td><td className="n">{x.peso}</td></tr>
            )) : <tr><td colSpan={4} className="vacio">Sin datos todavía.</td></tr>}</tbody>
          </table></div>
        </section>
        <section>
          <h3>Respuesta del agente <span>mediana por semana</span></h3>
          <div className="scroll"><table>
            <thead><tr><th>Semana</th><th className="n">Mediana</th><th className="n">Casos</th></tr></thead>
            <tbody>{d.respuesta.semanas.slice(-semanas).filter((x) => x.casos).length ? d.respuesta.semanas.slice(-semanas).filter((x) => x.casos).map((x) => (
              <tr key={x.semana}><td>{fSem(x.semana)}</td><td className="n">{fDur(x.mediana_seg)}</td><td className="n">{x.casos}</td></tr>
            )) : <tr><td colSpan={3} className="vacio">Sin casos todavía.</td></tr>}</tbody>
          </table></div>
        </section>
      </div>

      <section>
        <h3>Últimos pedidos</h3>
        <div className="scroll"><table>
          <thead><tr><th>Cerrado</th><th>Pedido</th><th className="quien">Quién</th><th>Tamaño</th>{conTiempo && <th className="n">Tardó</th>}</tr></thead>
          <tbody>{d.pedidos.ultimos.length ? d.pedidos.ultimos.map((p) => (
            <tr key={p.id}><td>{fFecha(p.cerrado)}</td>
              <td>{p.link ? <a href={p.link} target="_blank" rel="noreferrer">{p.titulo}</a> : p.titulo}{p.extra > 0 && <span className="eq extra">adicional</span>}
                {p.pedido_por && <span className="quien-m">{p.pedido_por}</span>}</td>
              <td className="quien">{p.pedido_por ?? '—'}</td><td className="tam">{TAM[p.tamano] ?? p.tamano}{p.tamano !== 'grande' && <small> · {p.peso}</small>}</td>
              {conTiempo && <td className="n">{p.minutos ? `${p.minutos} min` : '—'}</td>}</tr>
          )) : <tr><td colSpan={5} className="vacio">Todavía no se cerró ningún pedido.</td></tr>}</tbody>
        </table></div>
      </section>
    </div>
  )
}
