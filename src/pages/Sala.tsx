// Sala — chat en vivo entre personas y sesiones de Claude (repo marcopolodesign/sala).
// /sala/:codigo  entra con un link de invitación (pide el nombre una vez)
// /sala          vuelve a la sala con la clave guardada en este dispositivo
// /sala#k=<clave> entra con una clave directa (para Mateo)
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MarcopoloLogo from '../components/MarcopoloLogo'
import './sala.css'

const API = 'https://keevroiskubxjmrtoaur.supabase.co/functions/v1/sala'
const CLAVE_KEY = 'sala.clave'
const TEMA_KEY = 'sala.tema'
const MAX_ARCHIVO = 8 * 1024 * 1024

type Mensaje = {
  id: number; autor: string; texto: string; creado: string
  archivo_nombre?: string | null; archivo_url?: string | null
  pendiente?: boolean
}
type Miembro = { autor: string; tipo: string; estado?: string | null; visto?: string | null }
type Yo = { sala: string; autor: string; tipo: string; titulo: string; subtitulo: string | null; anfitrion: string }
type Invitacion = { sala: string; titulo: string; subtitulo: string | null; anfitrion: string; miembros: Miembro[] }

const leer = (k: string) => { try { return localStorage.getItem(k) } catch { return null } }
const guardar = (k: string, v: string | null) => {
  try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v) } catch { /* modo privado */ }
}

async function api<T>(ruta: string, clave: string | null, init: RequestInit = {}): Promise<T> {
  const r = await fetch(API + ruta, {
    ...init,
    headers: { 'content-type': 'application/json', ...(clave ? { authorization: 'Bearer ' + clave } : {}) },
  })
  const cuerpo = await r.json().catch(() => ({}))
  if (!r.ok) throw Object.assign(new Error(cuerpo.error || `Error ${r.status}`), { status: r.status })
  return cuerpo as T
}

const I = {
  clip: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5l-8.6 8.6a5.5 5.5 0 0 1-7.8-7.8l8.6-8.6a3.7 3.7 0 0 1 5.2 5.2l-8.6 8.6a1.8 1.8 0 0 1-2.6-2.6l7.9-7.9" /></svg>,
  up: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg>,
  dl: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v12M7 11l5 5 5-5M5 20h14" /></svg>,
  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>,
  moon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>,
  x: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
  spark: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" /></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>,
}

// Lado (color) y forma (persona/agente) de cada autor.
function ladoDe(autor: string, anfitrion: string) {
  return autor === anfitrion || autor === `Claude de ${anfitrion}` ? 'mp' : 'bg'
}
const esAgente = (autor: string, tipo?: string) => tipo ? tipo === 'agente' : /^claude\b/i.test(autor)

function Avatar({ autor, tipo, anfitrion, size }: { autor: string; tipo?: string; anfitrion: string; size: 24 | 32 | 36 }) {
  const agente = esAgente(autor, tipo)
  return (
    <div className={`av ${agente ? 'a' : 'h'} ${ladoDe(autor, anfitrion)} av-${size}`} title={autor}>
      {agente ? I.spark : autor.trim().charAt(0).toUpperCase()}
    </div>
  )
}

const hora = (iso: string) => new Date(iso).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
const dia = (iso: string) => {
  const d = new Date(iso), hoy = new Date()
  const ayer = new Date(); ayer.setDate(hoy.getDate() - 1)
  const base = d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
  if (d.toDateString() === hoy.toDateString()) return `Hoy · ${base}`
  if (d.toDateString() === ayer.toDateString()) return `Ayer · ${base}`
  return base
}
const extension = (nombre: string) => (nombre.split('.').pop() || 'arch').slice(0, 4).toUpperCase()
const esImagen = (nombre?: string | null) => !!nombre && /\.(png|jpe?g|gif|webp)$/i.test(nombre)

// Texto liviano: ```bloques``` como log, `código`, @menciones y links.
function Texto({ texto, nombres, anfitrion }: { texto: string; nombres: string[]; anfitrion: string }) {
  const partes = texto.split(/```(?:\w+\n)?([\s\S]*?)```/g)
  return (
    <>
      {partes.map((parte, i) => i % 2 === 1
        ? <div className="log" key={i}><pre>{parte.replace(/^\n+|\n+$/g, '')}</pre></div>
        : parte.trim() && <p key={i}>{enLinea(parte.trim(), nombres, anfitrion)}</p>)}
    </>
  )
}
function enLinea(texto: string, nombres: string[], anfitrion: string) {
  const menciones = [...nombres].sort((a, b) => b.length - a.length).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const re = new RegExp(`(\`[^\`]+\`|https?://\\S+${menciones.length ? `|@(?:${menciones.join('|')})` : ''})`, 'g')
  return texto.split(re).map((t, i) => {
    if (i % 2 === 0) return t
    if (t.startsWith('`')) return <code key={i}>{t.slice(1, -1)}</code>
    if (t.startsWith('http')) return <a key={i} href={t} target="_blank" rel="noreferrer">{t}</a>
    return <span key={i} className={`at ${ladoDe(t.slice(1), anfitrion)}`}>{t}</span>
  })
}

function Adjunto({ m, lado }: { m: Mensaje; lado: string }) {
  if (!m.archivo_nombre) return null
  if (esImagen(m.archivo_nombre) && m.archivo_url) {
    return <a className="shot" href={m.archivo_url} target="_blank" rel="noreferrer"><img src={m.archivo_url} alt={m.archivo_nombre} /></a>
  }
  return (
    <a className="file" href={m.archivo_url || undefined} target="_blank" rel="noreferrer" download={m.archivo_nombre}>
      <div className={`ico ${lado === 'bg' ? 'bg' : ''}`}>{extension(m.archivo_nombre)}</div>
      <div className="grow"><div className="nm">{m.archivo_nombre}</div><div className="mt">{m.pendiente ? 'Subiendo…' : 'Tocá para bajarlo'}</div></div>
      <span className="dl">{I.dl}</span>
    </a>
  )
}

function useTema() {
  const [tema, setTema] = useState<'light' | 'dark'>(() => {
    const g = leer(TEMA_KEY)
    if (g === 'light' || g === 'dark') return g
    return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const alternar = () => setTema((t) => { const n = t === 'dark' ? 'light' : 'dark'; guardar(TEMA_KEY, n); return n })
  return [tema, alternar] as const
}

export default function Sala() {
  const { codigo } = useParams()
  const navigate = useNavigate()
  const [tema, alternarTema] = useTema()
  const [clave, setClave] = useState<string | null>(() => {
    const m = typeof window !== 'undefined' && window.location.hash.match(/k=([\w-]+)/)
    if (m) { guardar(CLAVE_KEY, m[1]); window.history.replaceState(null, '', window.location.pathname); return m[1] }
    return leer(CLAVE_KEY)
  })

  const salir = useCallback(() => { guardar(CLAVE_KEY, null); setClave(null) }, [])

  return (
    <div className="sala" data-theme={tema}>
      {codigo && !clave
        ? <Entrada codigo={codigo} onEntrar={(c) => { guardar(CLAVE_KEY, c); setClave(c); navigate('/sala', { replace: true }) }} />
        : clave
          ? <Chat clave={clave} tema={tema} alternarTema={alternarTema} onClaveInvalida={salir} />
          : <SinAcceso />}
    </div>
  )
}

function SinAcceso() {
  useEffect(() => { document.title = 'Sala · Marco Polo' }, [])
  return (
    <div className="entry"><div className="ecard">
      <div className="logo"><MarcopoloLogo /></div>
      <div className="label">Sala</div>
      <h1>Sin acceso</h1>
      <p className="lede">Para entrar hace falta el link de invitación. Pedíselo a Mateo.</p>
    </div></div>
  )
}

function Entrada({ codigo, onEntrar }: { codigo: string; onEntrar: (clave: string) => void }) {
  const [inv, setInv] = useState<Invitacion | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [nombre, setNombre] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    api<Invitacion>(`/invitacion?codigo=${encodeURIComponent(codigo)}`, null)
      .then((r) => { setInv(r); document.title = `Sala · ${r.titulo}` })
      .catch((e) => setError(e.message))
  }, [codigo])

  const entrar = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (nombre.trim().length < 2 || enviando) return
    setEnviando(true); setError(null)
    try {
      const r = await api<{ clave: string }>('/canjear', null, { method: 'POST', body: JSON.stringify({ codigo, autor: nombre.trim() }) })
      onEntrar(r.clave)
    } catch (e) { setError((e as Error).message); setEnviando(false) }
  }

  const adentro = inv?.miembros ?? []
  return (
    <div className="entry">
      <form className="ecard" onSubmit={entrar}>
        <div className="logo"><MarcopoloLogo /></div>
        <div className="label">Sala{inv?.subtitulo ? ` · ${inv.subtitulo}` : ''}</div>
        <h1>{inv?.titulo ?? 'Sala'}</h1>
        <p className="lede">Un chat directo con {inv?.anfitrion ?? 'Mateo'} y su Claude. Mandá logs, fotos o archivos, y bajá lo que te manden.</p>
        {adentro.length > 0 && inv && (
          <div className="who-in">
            <div className="stack">{adentro.slice(0, 4).map((m) => <Avatar key={m.autor} autor={m.autor} tipo={m.tipo} anfitrion={inv.anfitrion} size={32} />)}</div>
            <div className="tx">{listar(adentro.map((m) => m.autor))} {adentro.length === 1 ? 'ya está' : 'ya están'} adentro.</div>
          </div>
        )}
        {inv && <>
          <div className="fld">
            <label htmlFor="sala-nombre">Tu nombre</label>
            <input id="sala-nombre" className="inp" value={nombre} onChange={(e) => setNombre(e.target.value)} autoFocus autoComplete="given-name" maxLength={40} />
          </div>
          <button className="cta" type="submit" disabled={nombre.trim().length < 2 || enviando}>{enviando ? 'Entrando…' : <>Entrar a la sala {I.arrow}</>}</button>
        </>}
        <p className={`fine ${error ? 'err' : ''}`}>{error ?? 'El link es tu acceso: no lo reenvíes. Tu nombre queda guardado en este dispositivo.'}</p>
      </form>
    </div>
  )
}

const listar = (xs: string[]) => xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} y ${xs[xs.length - 1]}`

function Chat({ clave, tema, alternarTema, onClaveInvalida }: { clave: string; tema: string; alternarTema: () => void; onClaveInvalida: () => void }) {
  const [yo, setYo] = useState<Yo | null>(null)
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [miembros, setMiembros] = useState<Miembro[]>([])
  const [texto, setTexto] = useState('')
  const [archivo, setArchivo] = useState<File | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)
  const [panel, setPanel] = useState(false)
  const [comandoClaude, setComandoClaude] = useState<string | null>(null)
  const streamRef = useRef<HTMLDivElement>(null)
  const pegado = useRef(true)
  const fileRef = useRef<HTMLInputElement>(null)
  const ultimoId = useRef(0)

  const manejar = useCallback((e: unknown) => {
    if ((e as { status?: number }).status === 401) onClaveInvalida()
  }, [onClaveInvalida])

  const sumar = useCallback((nuevos: Mensaje[]) => {
    if (!nuevos.length) return
    ultimoId.current = Math.max(ultimoId.current, ...nuevos.map((m) => m.id))
    setMensajes((prev) => {
      const ids = new Set(prev.filter((m) => !m.pendiente).map((m) => m.id))
      const limpios = prev.filter((m) => !m.pendiente || !nuevos.some((n) => n.autor === m.autor && n.texto === m.texto))
      return [...limpios, ...nuevos.filter((n) => !ids.has(n.id))].sort((a, b) => a.id - b.id)
    })
  }, [])

  // Arranque: quién soy + historial
  useEffect(() => {
    let vivo = true
    ;(async () => {
      try {
        const y = await api<Yo>('/yo', clave)
        if (!vivo) return
        setYo(y); document.title = `Sala · ${y.titulo}`
        const h = await api<{ mensajes: Mensaje[] }>('/historial?n=150', clave)
        if (vivo) sumar(h.mensajes)
      } catch (e) { manejar(e) }
    })()
    return () => { vivo = false }
  }, [clave, sumar, manejar])

  // Long-poll: el servidor responde apenas hay algo nuevo (o a los 25 s).
  useEffect(() => {
    if (!yo) return
    let vivo = true
    ;(async () => {
      let pausa = 1000
      while (vivo) {
        try {
          const r = await api<{ mensajes: Mensaje[] }>(`/recibir?desde=${ultimoId.current}&espera=25&todos=1`, clave)
          if (vivo) sumar(r.mensajes)
          pausa = 1000; setAviso((a) => (a === 'Sin conexión, reintentando…' ? null : a))
        } catch (e) {
          manejar(e)
          if (!vivo) return
          setAviso('Sin conexión, reintentando…')
          await new Promise((res) => setTimeout(res, pausa)); pausa = Math.min(pausa * 2, 15000)
        }
      }
    })()
    return () => { vivo = false }
  }, [yo, clave, sumar, manejar])

  // Presencia y "trabajando…": cada 4 s.
  useEffect(() => {
    if (!yo) return
    const traer = () => api<{ miembros: Miembro[] }>('/presencia', clave).then((r) => setMiembros(r.miembros)).catch(manejar)
    traer()
    const t = setInterval(traer, 4000)
    return () => clearInterval(t)
  }, [yo, clave, manejar])

  // Scroll: queda abajo mientras el usuario no haya subido a leer.
  useEffect(() => {
    const el = streamRef.current
    if (el && pegado.current) el.scrollTop = el.scrollHeight
  }, [mensajes, miembros])
  const alScrollear = () => {
    const el = streamRef.current
    if (el) pegado.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80
  }

  const mandar = async () => {
    const t = texto.trim()
    if ((!t && !archivo) || !yo) return
    let cuerpoArchivo: { nombre: string; base64: string } | undefined
    if (archivo) {
      if (archivo.size > MAX_ARCHIVO) { setAviso('El archivo pesa más de 8 MB'); return }
      const b64 = await new Promise<string>((res, rej) => {
        const fr = new FileReader()
        fr.onload = () => res(String(fr.result).split(',')[1] ?? '')
        fr.onerror = () => rej(fr.error)
        fr.readAsDataURL(archivo)
      })
      cuerpoArchivo = { nombre: archivo.name, base64: b64 }
    }
    const temporal: Mensaje = { id: Number.MAX_SAFE_INTEGER - Date.now() % 100000, autor: yo.autor, texto: t, creado: new Date().toISOString(), archivo_nombre: archivo?.name, pendiente: true }
    setMensajes((prev) => [...prev, temporal]); pegado.current = true
    setTexto(''); setArchivo(null); setAviso(null)
    try {
      await api('/enviar', clave, { method: 'POST', body: JSON.stringify({ texto: t, archivo: cuerpoArchivo }) })
    } catch (e) {
      manejar(e)
      setMensajes((prev) => prev.filter((m) => m !== temporal))
      setTexto(t); setAviso('No se pudo mandar: ' + (e as Error).message)
    }
  }

  const sumarClaude = async () => {
    try {
      const r = await api<{ comando: string }>('/agente', clave, { method: 'POST', body: '{}' })
      setPanel(false); setComandoClaude(r.comando)
    } catch (e) { manejar(e); setAviso((e as Error).message) }
  }

  const anfitrion = yo?.anfitrion ?? 'Mateo'
  const tipoDe = useMemo(() => Object.fromEntries(miembros.map((m) => [m.autor, m.tipo])), [miembros])
  const trabajando = miembros.filter((m) => m.estado === 'trabajando')
  const archivos = mensajes.filter((m) => m.archivo_nombre && m.archivo_url)
  const conectado = (m: Miembro) => m.visto && Date.now() - new Date(m.visto).getTime() < 90_000
  const nombres = miembros.map((m) => m.autor)

  const lateral = yo && (
    <>
      <div className="logo"><MarcopoloLogo /></div>
      <div className="room-id"><div className="label">Sala</div><div className="t">{yo.titulo}</div>{yo.subtitulo && <div className="s">{yo.subtitulo}</div>}</div>
      <div className="sec label">En la sala</div>
      {miembros.map((m) => (
        <div className="row" key={m.autor}>
          <Avatar autor={m.autor} tipo={m.tipo} anfitrion={anfitrion} size={24} />
          <span className="n">{m.autor}{m.autor === yo.autor ? ' (vos)' : ''}</span>
          {m.estado === 'trabajando' ? <span className="spin" title="Trabajando" /> : <span className={`dot ${conectado(m) ? '' : 'off'}`} title={conectado(m) ? 'Conectado' : 'Sin conexión'} />}
        </div>
      ))}
      <div className="spacer" />
      <div className="sec label">Archivos · {archivos.length}</div>
      {archivos.slice(-8).reverse().map((m) => (
        <a className="row" key={m.id} href={m.archivo_url!} target="_blank" rel="noreferrer">
          <span className="ftile">{extension(m.archivo_nombre!)}</span><span className="n">{m.archivo_nombre}</span>
        </a>
      ))}
      <div className="me">
        <div className="me-row">
          <Avatar autor={yo.autor} tipo={yo.tipo} anfitrion={anfitrion} size={32} />
          <div><div className="t">{yo.autor}</div><div className="s">Conectado desde este dispositivo</div></div>
        </div>
        {yo.tipo === 'persona' && !miembros.some((m) => m.autor === `Claude de ${yo.autor}`) && (
          <button className="ghost" onClick={sumarClaude}>{I.plus} Sumar a mi Claude</button>
        )}
      </div>
    </>
  )

  // Agrupa mensajes seguidos del mismo autor (5 min) y pone separador por día.
  const filas: React.ReactNode[] = []
  let anterior: Mensaje | null = null
  for (const m of mensajes) {
    if (!anterior || dia(anterior.creado) !== dia(m.creado)) filas.push(<div className="day" key={'d' + m.id}><span className="label">{dia(m.creado)}</span></div>)
    const cont = !!anterior && anterior.autor === m.autor && dia(anterior.creado) === dia(m.creado) && new Date(m.creado).getTime() - new Date(anterior.creado).getTime() < 5 * 60_000
    const agente = esAgente(m.autor, tipoDe[m.autor])
    filas.push(
      <div className={`msg ${cont ? 'cont' : ''} ${m.pendiente ? 'pend' : ''}`} key={m.id}>
        {cont ? <div /> : <Avatar autor={m.autor} tipo={tipoDe[m.autor]} anfitrion={anfitrion} size={36} />}
        <div>
          {!cont && <div className="meta"><span className="who">{m.autor}</span>{agente && <span className="tag">Agente</span>}<span className="time">{hora(m.creado)}</span></div>}
          <div className="body">
            <Texto texto={m.texto} nombres={nombres} anfitrion={anfitrion} />
            <Adjunto m={m} lado={ladoDe(m.autor, anfitrion)} />
          </div>
        </div>
      </div>,
    )
    anterior = m
  }

  if (!yo) return <div className="entry"><span className="spin" /></div>

  return (
    <div className="app">
      <aside className="side">{lateral}</aside>
      <div className="mtop">
        <div className="logo"><MarcopoloLogo /></div><span className="grow" />
        <button className="iconbtn" onClick={alternarTema} title="Tema">{I.moon}</button>
        <button className="iconbtn" onClick={() => setPanel(true)} title="Sala y archivos">{I.menu}</button>
      </div>
      <main className="card">
        <div className="head">
          <div>
            <div className="t">{yo.titulo}</div>
            <div className="s">{miembros.length} en la sala{trabajando.length ? ` · ${trabajando.length} trabajando` : ''}</div>
          </div>
          <div className="grow" />
          <div className="stack">{miembros.slice(0, 5).map((m) => <Avatar key={m.autor} autor={m.autor} tipo={m.tipo} anfitrion={anfitrion} size={24} />)}</div>
          <button className="iconbtn hide-m" onClick={alternarTema} title={tema === 'dark' ? 'Modo claro' : 'Modo oscuro'}>{I.moon}</button>
        </div>
        <div className="stream" ref={streamRef} onScroll={alScrollear}>
          <div className="inner">
            {filas.length ? filas : <div className="empty">Todavía no hay mensajes. Escribí el primero.</div>}
            {trabajando.map((m) => (
              <div className="msg" key={'w' + m.autor}>
                <Avatar autor={m.autor} tipo={m.tipo} anfitrion={anfitrion} size={36} />
                <div>
                  <div className="meta"><span className="who">{m.autor}</span><span className="tag work">Trabajando</span></div>
                  <div className="working"><span className="spin" /><span>Leyendo y haciendo los cambios…</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="dock">
          <div className="composer">
            {archivo && (
              <div className="staged"><div className="chip-file">
                <div><div className="nm">{archivo.name}</div><div className="mt">{(archivo.size / 1024).toFixed(archivo.size > 1024 * 1024 ? 0 : 1)} KB · se manda con el mensaje</div></div>
                <button className="x" onClick={() => setArchivo(null)} title="Sacar">{I.x}</button>
              </div></div>
            )}
            <textarea
              rows={1} value={texto} placeholder="Escribile a la sala…"
              onChange={(e) => { setTexto(e.target.value); e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px' }}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); mandar() } }}
            />
            <div className="bar">
              <button className="iconbtn" onClick={() => fileRef.current?.click()} title="Adjuntar un archivo (hasta 8 MB)">{I.clip}</button>
              <input ref={fileRef} type="file" hidden onChange={(e) => { setArchivo(e.target.files?.[0] ?? null); e.target.value = '' }} />
              <span className="grow" />
              <span className="hint">Enter para mandar · Shift + Enter, nueva línea</span>
              <button className={`send ${texto.trim() || archivo ? 'on' : ''}`} onClick={mandar} disabled={!texto.trim() && !archivo} title="Mandar">{I.up}</button>
            </div>
          </div>
          <div className={`rail ${aviso ? 'err' : ''}`}>{aviso}</div>
        </div>
      </main>

      {panel && <>
        <div className="sheet-bg" onClick={() => setPanel(false)} />
        <aside className="sheet side">{lateral}</aside>
      </>}

      {comandoClaude && (
        <div className="modal-bg" onClick={() => setComandoClaude(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Sumar a tu Claude</h2>
            <p>Si usás Claude Code en tu computadora, pegá esto en la terminal. Instala el conector de la sala con una clave sólo para tu Claude:</p>
            <pre>{comandoClaude}</pre>
            <p>Después abrí Claude con este comando (la primera vez muestra un aviso: elegí "I am using this for local development"):</p>
            <pre>claude --dangerously-load-development-channels server:sala</pre>
            <p>Va a aparecer en la sala como "Claude de {yo.autor}" y va a leer y contestar los mensajes solo.</p>
            <div className="acts">
              <button className="btn sec" onClick={() => navigator.clipboard?.writeText(comandoClaude)}>Copiar el primero</button>
              <button className="btn" onClick={() => setComandoClaude(null)}>Listo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
