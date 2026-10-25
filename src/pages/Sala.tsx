// Sala — chat en vivo entre personas y sesiones de Claude (repo marcopolodesign/sala).
// /sala/:codigo  entra con un link de invitación (pide el nombre una vez)
// /sala          vuelve a la sala con la clave guardada en este dispositivo
// /sala#k=<clave> entra con una clave directa (para Mateo)
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MarcopoloLogo from '../components/MarcopoloLogo'
import { T } from './sala-i18n'
import './sala.css'

const t = T()

const API = 'https://keevroiskubxjmrtoaur.supabase.co/functions/v1/sala'
const CLAVE_KEY = 'sala.clave'
const TEMA_KEY = 'sala.tema'
const MAX_BASE64 = 8 * 1024 * 1024    // hasta acá va dentro del JSON
const MAX_SUBIDA = 50 * 1024 * 1024    // más grande: URL firmada de Storage
const REACCIONES = ['👍', '✅', '👀', '❤️', '😂']

type Reaccion = { emoji: string; autores: string[] }
type Mensaje = {
  id: number; autor: string; texto: string; creado: string
  archivo_nombre?: string | null; archivo_url?: string | null
  pendiente?: boolean; is_ai?: boolean; cliente_id?: string | null; sistema?: boolean
  respuesta_a?: number | null; tambien_canal?: boolean
  reacciones?: Reaccion[]; menciones?: string[]
  respuestas?: number; ultima_respuesta?: string; ultima_respuesta_id?: number; respondieron?: string[]
  editado?: string | null; borrado?: string | null
  opciones?: Opcion[] | null; pregunta_para?: string[] | null; decision?: Decision | null
  solo_equipo?: boolean   // un agente le habla al dueño: los invitados no lo reciben (el servidor lo filtra)
}
type Opcion = { id: string; etiqueta?: string; texto: string; recomendada?: boolean }
// En la pregunta: {opcion, texto, autor, cuando, respuesta_id}. En el "Elegí: …": {pregunta, opcion, …}.
type Decision = { opcion: string; texto: string; etiqueta?: string; autor: string; cuando: string; respuesta_id?: number; pregunta?: number; cambiada?: boolean }
type Miembro = { autor: string; tipo: string; dueno?: string | null; estado?: string | null; visto?: string | null }
type Yo = { sala: string; autor: string; tipo: string; titulo: string; subtitulo: string | null; anfitrion: string; equipo: string[]; decide?: 'dirigida' | 'todos'; admin?: boolean }
type Invitacion = { sala: string; titulo: string; subtitulo: string | null; anfitrion: string; equipo: string[]; miembros: Miembro[] }

const leer = (k: string) => { try { return localStorage.getItem(k) } catch { return null } }
const guardar = (k: string, v: string | null) => {
  try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v) } catch { /* modo privado */ }
}

// Los errores del servidor llegan en rioplatense. Los que se muestran tal cual y son simples se mapean acá por
// estado / bandera; el resto (permisos de dueño, "esa opción no existe", etc.) se muestra como lo manda el servidor.
function mensajeDeError(status: number, c: Record<string, unknown>): string | null {
  if (c.limite_ia) return t.errLimiteIA
  if (c.invalido) return t.errNombreInvalido
  if (c.reservado) return status === 409 ? t.errNombreReservado : t.errNombreBot
  if (status === 401) return t.errClave
  if (status === 410) return t.errLinkVencido
  if (status === 413) return t.errArchivoGrande
  if (status === 500) return t.errServidor
  if (status === 409 && typeof c.error === 'string' && /^Ya hay alguien como/.test(c.error)) return t.errNombreTomado
  if (status === 400 && c.error === 'mensaje vacío') return t.errVacio
  return null
}

async function api<T>(ruta: string, clave: string | null, init: RequestInit = {}): Promise<T> {
  let r: Response
  try {
    r = await fetch(API + ruta, {
      ...init,
      headers: { 'content-type': 'application/json', ...(clave ? { authorization: 'Bearer ' + clave } : {}) },
    })
  } catch {
    // "Failed to fetch": sin red, o una respuesta sin CORS (p. ej. el firewall de Cloudflare cortando el cuerpo).
    throw Object.assign(new Error(t.errRed), { red: true })
  }
  const cuerpo = await r.json().catch(() => ({}))
  if (!r.ok) {
    // 403 sin JSON de la sala = lo cortó el firewall, no el servidor.
    const waf = r.status === 403 && !cuerpo.error
    throw Object.assign(new Error(mensajeDeError(r.status, cuerpo) ?? cuerpo.error ?? (waf ? t.errWaf : t.errHttp(r.status))), { status: r.status, decision: cuerpo.decision, waf })
  }
  return cuerpo as T
}

// El firewall que está delante del servidor corta cuerpos que parecen un ataque (SQL, claves, rutas, HTML)
// con un 403 sin CORS. El texto en base64 pasa; el servidor lo decodifica (`texto_b64`).
const b64Texto = (t: string) => {
  const bytes = new TextEncoder().encode(t)
  let bin = ''
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  return btoa(bin)
}
const bloqueado = (e: unknown) => !!(e as { red?: boolean }).red || !!(e as { waf?: boolean }).waf
const MAX_TEXTO = 20000   // mismo tope que el servidor

const I = {
  clip: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5l-8.6 8.6a5.5 5.5 0 0 1-7.8-7.8l8.6-8.6a3.7 3.7 0 0 1 5.2 5.2l-8.6 8.6a1.8 1.8 0 0 1-2.6-2.6l7.9-7.9" /></svg>,
  up: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg>,
  dl: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v12M7 11l5 5 5-5M5 20h14" /></svg>,
  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>,
  moon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>,
  x: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
  spark: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" /></svg>,
  hilo: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z" /><path d="M9 10.5h6M9 13.5h4" /></svg>,
  smile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><path d="M8.5 14a4 4 0 0 0 7 0M9.5 9.5h.01M14.5 9.5h.01" /></svg>,
  edit: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z" /><path d="M13.5 6.5l4 4" /></svg>,
  trash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13" /></svg>,
  copy: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="8" width="12" height="12" rx="2.5" /><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8" /></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16zM10 20.5a2 2 0 0 0 4 0" /></svg>,
  back: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>,
}

// Lado (color): el equipo de la sala (nuestro lado) va en coral. Forma: persona círculo, IA cuadrado.
function ladoDe(autor: string, equipo: string[]) {
  return equipo.includes(autor) ? 'mp' : 'bg'
}
const esAgente = (autor: string, tipo?: string) => tipo ? tipo === 'agente' : /^claude\b/i.test(autor)

function Avatar({ autor, tipo, equipo, size }: { autor: string; tipo?: string; equipo: string[]; size: 24 | 32 | 36 }) {
  const agente = esAgente(autor, tipo)
  return (
    <div className={`av ${agente ? 'a' : 'h'} ${ladoDe(autor, equipo)} av-${size}`} title={autor}>
      {agente ? I.spark : autor.trim().charAt(0).toUpperCase()}
    </div>
  )
}

const hora = (iso: string) => new Date(iso).toLocaleTimeString(t.lang, { hour: '2-digit', minute: '2-digit', hour12: t.hora12 })
const dia = (iso: string) => {
  const d = new Date(iso), hoy = new Date()
  const ayer = new Date(); ayer.setDate(hoy.getDate() - 1)
  const base = d.toLocaleDateString(t.lang, { day: 'numeric', month: 'short' })
  if (d.toDateString() === hoy.toDateString()) return `${t.hoy} · ${base}`
  if (d.toDateString() === ayer.toDateString()) return `${t.ayer} · ${base}`
  return base
}
const extension = (nombre: string) => (nombre.split('.').pop() || 'arch').slice(0, 4).toUpperCase()
const esImagen = (nombre?: string | null) => !!nombre && /\.(png|jpe?g|gif|webp)$/i.test(nombre)

// Markdown liviano: ```bloques``` con botón copiar, `código`, **negrita**, *itálica*, listas,
// citas, @menciones y links. Nada de HTML crudo: todo pasa por React.
function Texto({ texto, nombres, equipo }: { texto: string; nombres: string[]; equipo: string[] }) {
  const partes = texto.split(/```[^\n`]*\n?([\s\S]*?)```/g)
  return (
    <>
      {partes.map((parte, i) => i % 2 === 1
        ? <Bloque key={i} codigo={parte.replace(/^\n+|\n+$/g, '')} />
        : <Parrafos key={i} texto={parte} nombres={nombres} equipo={equipo} />)}
    </>
  )
}

function Bloque({ codigo }: { codigo: string }) {
  const [copiado, setCopiado] = useState(false)
  const copiar = () => {
    navigator.clipboard?.writeText(codigo).then(() => { setCopiado(true); setTimeout(() => setCopiado(false), 1500) }).catch(() => {})
  }
  return (
    <div className="log">
      <button className="copy" onClick={copiar} title={t.copiar}>{copiado ? <>{I.check} {t.copiado}</> : <>{I.copy} {t.copiar}</>}</button>
      <pre>{codigo}</pre>
    </div>
  )
}

function Parrafos({ texto, nombres, equipo }: { texto: string; nombres: string[]; equipo: string[] }) {
  const lineas = texto.replace(/^\n+|\n+$/g, '').split('\n')
  const out: React.ReactNode[] = []
  let parrafo: string[] = [], lista: string[] = [], ordenada = false, cita: string[] = []
  const cerrar = () => {
    if (parrafo.length) { out.push(<p key={out.length}>{enLinea(parrafo.join('\n'), nombres, equipo)}</p>); parrafo = [] }
    if (lista.length) {
      const items = lista.map((l, k) => <li key={k}>{enLinea(l, nombres, equipo)}</li>)
      out.push(ordenada ? <ol key={out.length}>{items}</ol> : <ul key={out.length}>{items}</ul>); lista = []
    }
    if (cita.length) { out.push(<blockquote key={out.length}>{enLinea(cita.join('\n'), nombres, equipo)}</blockquote>); cita = [] }
  }
  for (const l of lineas) {
    const vi = l.match(/^\s*[-*•]\s+(.*)$/), num = l.match(/^\s*\d+[.)]\s+(.*)$/), q = l.match(/^>\s?(.*)$/)
    if (vi || num) {
      if (parrafo.length || cita.length || (lista.length && ordenada !== !!num)) cerrar()
      ordenada = !!num; lista.push((vi ?? num)![1])
    } else if (q) {
      if (parrafo.length || lista.length) cerrar()
      cita.push(q[1])
    } else if (!l.trim()) cerrar()
    else { if (lista.length || cita.length) cerrar(); parrafo.push(l) }
  }
  cerrar()
  return <>{out}</>
}

function enLinea(texto: string, nombres: string[], equipo: string[]): React.ReactNode[] {
  const menciones = [...nombres].sort((a, b) => b.length - a.length).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const re = new RegExp(`(\`[^\`\\n]+\`|https?://[^\\s<>()]+[^\\s<>().,;:!?'"]|\\*\\*[^*\\n]+\\*\\*|\\*[^*\\s][^*\\n]*\\*${menciones.length ? `|@(?:${menciones.join('|')})` : ''})`, 'gi')
  return texto.split(re).map((t, i) => {
    if (i % 2 === 0 || !t) return t
    if (t.startsWith('`')) return <code key={i}>{t.slice(1, -1)}</code>
    if (/^https?:/i.test(t)) return <a key={i} href={t} target="_blank" rel="noreferrer">{t}</a>
    if (t.startsWith('**')) return <strong key={i}>{t.slice(2, -2)}</strong>
    if (t.startsWith('*')) return <em key={i}>{t.slice(1, -1)}</em>
    const nombre = nombres.find((n) => n.toLowerCase() === t.slice(1).toLowerCase()) ?? t.slice(1)
    return <span key={i} className={`at ${ladoDe(nombre, equipo)}`}>@{nombre}</span>
  })
}

const recortar = (t: string, n: number) => { const l = t.replace(/\s+/g, ' ').trim(); return l.length > n ? l.slice(0, n - 1).trimEnd() + '…' : l }
const esPdf = (nombre?: string | null) => !!nombre && /\.pdf$/i.test(nombre)
const esVideo = (nombre?: string | null) => !!nombre && /\.(mp4|mov|webm|m4v)$/i.test(nombre)
const peso = (b: number) => b >= 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`

function Adjunto({ m, lado }: { m: Mensaje; lado: string }) {
  if (!m.archivo_nombre) return null
  if (m.archivo_url && esImagen(m.archivo_nombre)) {
    return <a className="shot" href={m.archivo_url} target="_blank" rel="noreferrer"><img src={m.archivo_url} alt={m.archivo_nombre} /></a>
  }
  const ficha = (
    <a className="file" href={m.archivo_url || undefined} target="_blank" rel="noreferrer" download={m.archivo_nombre}>
      <div className={`ico ${lado === 'bg' ? 'bg' : ''}`}>{extension(m.archivo_nombre)}</div>
      <div className="grow"><div className="nm">{m.archivo_nombre}</div><div className="mt">{m.pendiente ? t.subiendo : esPdf(m.archivo_nombre) || esVideo(m.archivo_nombre) ? t.abrirOBajar : t.tocarBajar}</div></div>
      <span className="dl">{I.dl}</span>
    </a>
  )
  if (m.archivo_url && esVideo(m.archivo_nombre)) {
    return <div className="media"><video src={m.archivo_url} controls preload="metadata" playsInline />{ficha}</div>
  }
  if (m.archivo_url && esPdf(m.archivo_nombre)) {
    return <div className="media"><iframe className="pdf" src={m.archivo_url + '#toolbar=0&view=FitH'} title={m.archivo_nombre} loading="lazy" />{ficha}</div>
  }
  return ficha
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

// Entre "Entrando…" y el chat: no una pantalla en blanco sino el esqueleto de la sala con un texto.
function Cargando() {
  useEffect(() => { document.title = 'Sala · Marco Polo' }, [])
  return (
    <div className="entry" role="status" aria-live="polite">
      <div className="ecard loading">
        <div className="logo"><MarcopoloLogo /></div>
        <div className="label">{t.sala}</div>
        <p className="lede"><span className="spin" /> {t.entrando}</p>
        <div className="skel" aria-hidden="true"><i /><i /><i /></div>
      </div>
    </div>
  )
}

function SinAcceso() {
  useEffect(() => { document.title = 'Sala · Marco Polo' }, [])
  return (
    <div className="entry"><div className="ecard">
      <div className="logo"><MarcopoloLogo /></div>
      <div className="label">{t.sala}</div>
      <h1>{t.sinAcceso}</h1>
      <p className="lede">{t.sinAccesoLede}</p>
      <p className="fine"><Link className="lnk" to="/sala/privacidad">{t.privacidad}</Link></p>
    </div></div>
  )
}

function Entrada({ codigo, onEntrar }: { codigo: string; onEntrar: (clave: string) => void }) {
  const [inv, setInv] = useState<Invitacion | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState<'persona' | 'agente'>('persona')
  const [enviando, setEnviando] = useState(false)
  const pareceBot = tipo === 'persona' && esNombreDeBot(nombre)

  useEffect(() => {
    api<Invitacion>(`/invitacion?codigo=${encodeURIComponent(codigo)}`, null)
      .then((r) => { setInv(r); document.title = `Sala · ${r.titulo}` })
      .catch((e) => setError(e.message))
  }, [codigo])

  const entrar = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (nombre.trim().length < 2 || enviando || pareceBot) return
    if (/[<>]/.test(nombre)) { setError(t.errNombreInvalido); return }
    setEnviando(true); setError(null)
    const canjear = (cuerpo: Record<string, unknown>) => api<{ clave: string }>('/canjear', null, { method: 'POST', body: JSON.stringify(cuerpo) })
    try {
      let r: { clave: string }
      try { r = await canjear({ codigo, autor: nombre.trim(), tipo }) } catch (e) {
        if (!bloqueado(e)) throw e
        // El firewall cortó el nombre (comillas, "--", etc.): se reintenta con el nombre en base64.
        try { r = await canjear({ codigo, autor_b64: b64Texto(nombre.trim()), tipo }) } catch (e2) {
          if (!bloqueado(e2)) throw e2
          // Sigue cortado: si la sala responde, la conexión está bien y el problema es el nombre.
          const hayRed = await api(`/invitacion?codigo=${encodeURIComponent(codigo)}`, null).then(() => true, () => false)
          throw hayRed ? new Error(t.errNombreRechazado) : e2
        }
      }
      onEntrar(r.clave)
    } catch (e) { setError((e as Error).message); setEnviando(false) }
  }

  const adentro = inv?.miembros ?? []
  // "Sala con Mateo, 2 personas y el agente Alan": el equipo (sólo personas), el resto de personas, y los agentes aparte.
  const esIA = (a: string) => adentro.some((m) => m.autor === a && m.tipo === 'agente')
  const equipoPersonas = (inv?.equipo ?? ['Mateo']).filter((a) => !esIA(a))
  const personasExtra = adentro.filter((m) => m.tipo !== 'agente' && !(inv?.equipo ?? []).includes(m.autor)).length
  const agentesDe = adentro.filter((m) => m.tipo === 'agente').map((m) => m.autor)
  return (
    <div className="entry">
      <form className="ecard" onSubmit={entrar}>
        <div className="logo"><MarcopoloLogo /></div>
        <div className="label">{t.sala}{inv?.subtitulo ? ` · ${inv.subtitulo}` : ''}</div>
        <h1>{inv?.titulo ?? t.sala}</h1>
        <p className="lede">{t.descSala(equipoPersonas, personasExtra, agentesDe)}. {t.ledeResto}</p>
        <p className="ia-note">{t.avisoIA} <Link className="lnk" to="/sala/privacidad">{t.privacidad}</Link></p>
        {adentro.length > 0 && inv && (
          <div className="who-in">
            <div className="stack">{adentro.slice(0, 4).map((m) => <Avatar key={m.autor} autor={m.autor} tipo={m.tipo} equipo={inv.equipo} size={32} />)}</div>
            <div className="tx">{t.listar(adentro.length > 3 ? [...adentro.slice(0, 2).map((m) => m.autor), t.masN(adentro.length - 2)] : adentro.map((m) => m.autor))} {adentro.length === 1 ? t.yaEsta : t.yaEstan}</div>
          </div>
        )}
        {!inv && !error && <p className="fine" role="status"><span className="spin" /> {t.cargandoInv}</p>}
        {inv && <>
          <div className="fld">
            <span className="flabel">{t.quienEntra}</span>
            <div className="seg" role="radiogroup" aria-label={t.quienEntra}>
              <button type="button" role="radio" aria-checked={tipo === 'persona'} className={tipo === 'persona' ? 'on' : ''} onClick={() => { setTipo('persona'); setError(null) }}>{t.soyPersona}</button>
              <button type="button" role="radio" aria-checked={tipo === 'agente'} className={tipo === 'agente' ? 'on' : ''} onClick={() => { setTipo('agente'); setError(null) }}>{t.esBot}</button>
            </div>
          </div>
          <div className="fld">
            <label htmlFor="sala-nombre">{tipo === 'agente' ? t.nombreAgente : t.tuNombre}</label>
            <input id="sala-nombre" className="inp" value={nombre} onChange={(e) => { setNombre(e.target.value); setError(null) }} autoFocus autoComplete={tipo === 'persona' ? 'given-name' : 'off'} maxLength={40}
              placeholder={tipo === 'agente' ? t.phAgente : undefined} />
            {pareceBot && !error && (
              <p className="fld-hint">{t.pareceBot} <button type="button" className="lnk" onClick={() => setTipo('agente')}>{t.entrarComoAgente}</button></p>
            )}
          </div>
          <button className="cta" type="submit" disabled={nombre.trim().length < 2 || enviando || pareceBot || !inv}>{enviando ? t.entrandoBtn : <>{tipo === 'agente' ? t.sumarAgente : t.entrarSala} {I.arrow}</>}</button>
        </>}
        <p className={`fine ${error ? 'err' : ''}`} role={error ? 'alert' : undefined}>{error ?? (tipo === 'agente'
          ? t.fineAgente
          : t.finePersona)}</p>
      </form>
    </div>
  )
}

// Mismo criterio que el servidor: "ia" y "bot" como palabra suelta; grok, gpt, gemini y claude en cualquier parte.
const esNombreDeBot = (n: string) => /(^|[^\p{L}\p{N}])(ia|bot|bots)($|[^\p{L}\p{N}])|grok|gpt|gemini|claude/iu.test(n.trim())

const listar = (xs: string[]) => t.listar(xs)

// ─── Chat ───────────────────────────────────────────────────────────────────────────────
// Los mensajes viven en un mapa por id: el canal muestra raíces (+ respuestas "también a la
// sala") y el panel de hilo muestra las respuestas de una raíz. Los cambios (nuevos, ediciones,
// borrados, reacciones, respuestas) llegan por /recibir?v=<version>.

type Envio = { respuesta_a?: number; tambien_canal?: boolean }

const uuid = () => (crypto as Crypto & { randomUUID?: () => string }).randomUUID?.()
  ?? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { const r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 3) | 8).toString(16) })

async function base64De(archivo: File) {
  return new Promise<string>((res, rej) => {
    const fr = new FileReader()
    fr.onload = () => res(String(fr.result).split(',')[1] ?? '')
    fr.onerror = () => rej(fr.error)
    fr.readAsDataURL(archivo)
  })
}

// ─── Menciones (@) ─── mismas reglas que la app (marcopolo-app/src/lib/logica.ts). El servidor
// detecta "@Nombre Completo" contra los miembros activos: elegir de la lista deja el nombre exacto.
const plano = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

// "@" al principio o después de un espacio; hasta el cursor, sin saltos (sí espacios: "@Claude de").
function consultaMencion(texto: string, cursor: number): { inicio: number; q: string } | null {
  const antes = texto.slice(0, cursor)
  const at = antes.lastIndexOf('@')
  if (at < 0 || (at > 0 && !/\s/.test(antes[at - 1]))) return null
  const q = antes.slice(at + 1)
  if (/\n/.test(q) || q.length > 40 || /^\s/.test(q)) return null
  return { inicio: at, q }
}

// Por inicio de palabra, sin uno mismo. Primero quienes ya escribieron acá, después el resto;
// dentro de cada grupo, los que empiezan con lo escrito y luego alfabético (Felipe).
function filtrarMenciones(miembros: Miembro[], q: string, yo: string, participan: string[]) {
  const b = plano(q).replace(/\s+/g, ' ')
  const peso = (m: Miembro) => (participan.includes(m.autor) ? 0 : 2) + (plano(m.autor).startsWith(b) ? 0 : 1)
  return miembros
    .filter((m) => m.autor !== yo && (' ' + plano(m.autor)).includes(' ' + b))
    .sort((x, y) => peso(x) - peso(y) || x.autor.localeCompare(y.autor, 'es'))
}

function insertarMencion(texto: string, inicio: number, cursor: number, nombre: string) {
  const resto = texto.slice(cursor)
  const puesto = `@${nombre}` + (resto.startsWith(' ') ? '' : ' ')
  return { texto: texto.slice(0, inicio) + puesto + resto, cursor: inicio + puesto.length + (resto.startsWith(' ') ? 1 : 0) }
}

type DatosMenciones = { miembros: Miembro[]; yo: string; equipo: string[]; participan: string[] }

function Composer({ placeholder, onMandar, hilo, autoFocus, onAviso, menciones }: {
  placeholder: string; hilo?: boolean; autoFocus?: boolean
  onMandar: (texto: string, archivo: File | null, tambienCanal: boolean) => Promise<boolean>
  onAviso: (a: string | null) => void
  menciones?: DatosMenciones
}) {
  const [texto, setTexto] = useState('')
  const [archivo, setArchivo] = useState<File | null>(null)
  const [tambien, setTambien] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const taRef = useRef<HTMLTextAreaElement>(null)
  const ajustar = () => { const t = taRef.current; if (t) { t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px' } }
  // Menciones: posición del cursor, fila activa y si se cerró con Esc (vuelve a abrirse al seguir tipeando).
  const [cursor, setCursor] = useState(0)
  const [activa, setActiva] = useState(0)
  const [cerrada, setCerrada] = useState<string | null>(null)
  const consulta = menciones ? consultaMencion(texto, cursor) : null
  const candidatos = consulta && menciones ? filtrarMenciones(menciones.miembros, consulta.q, menciones.yo, menciones.participan) : []
  const clave = consulta ? `${consulta.inicio}:${consulta.q}` : null
  const abierta = candidatos.length > 0 && cerrada !== clave
  const sel = Math.min(activa, Math.max(0, candidatos.length - 1))
  const listaRef = useRef<HTMLDivElement>(null)
  useEffect(() => { setActiva(0) }, [clave])
  useEffect(() => { listaRef.current?.querySelector('.on')?.scrollIntoView({ block: 'nearest' }) }, [sel, abierta])
  const leerCursor = () => setCursor(taRef.current?.selectionEnd ?? 0)
  const mencionar = (m: Miembro) => {
    if (!consulta) return
    const r = insertarMencion(texto, consulta.inicio, cursor, m.autor)
    setTexto(r.texto); setCursor(r.cursor)
    ponerCursor.current = r.cursor
  }
  // El cursor se pone en el mismo commit que el texto nuevo (no en un frame después):
  // si se tipea rápido tras Tab, un requestAnimationFrame lo devolvía atrás.
  const ponerCursor = useRef<number | null>(null)
  useLayoutEffect(() => {
    const c = ponerCursor.current
    if (c == null) return
    ponerCursor.current = null
    const t = taRef.current
    if (t) { t.focus(); t.setSelectionRange(c, c) }
    ajustar()
  })
  const teclaMencion = (e: React.KeyboardEvent) => {
    if (!abierta || e.nativeEvent.isComposing) return false
    if (e.key === 'ArrowDown') setActiva((sel + 1) % candidatos.length)
    else if (e.key === 'ArrowUp') setActiva((sel - 1 + candidatos.length) % candidatos.length)
    else if ((e.key === 'Enter' && !e.shiftKey) || e.key === 'Tab') mencionar(candidatos[sel])
    else if (e.key === 'Escape') setCerrada(clave)
    else return false
    e.preventDefault()
    return true
  }
  const mandar = async () => {
    const tx = texto.trim()
    if (!tx && !archivo) return
    if (archivo && archivo.size > MAX_SUBIDA) { onAviso(t.archivoMas50); return }
    const a = archivo
    setTexto(''); setCursor(0); setArchivo(null); onAviso(null)
    requestAnimationFrame(ajustar)
    const ok = await onMandar(tx, a, tambien)
    if (!ok) { setTexto(tx); setArchivo(a); requestAnimationFrame(ajustar) }
  }
  return (
    <div className="composer">
      {abierta && menciones && (
        <div className="mencion" role="listbox" aria-label={t.mencionar} ref={listaRef}>
          {candidatos.map((m, i) => (
            <div key={m.autor} role="option" aria-selected={i === sel} className={`mrow ${i === sel ? 'on' : ''}`}
              onMouseDown={(e) => { e.preventDefault(); mencionar(m) }} onMouseEnter={() => setActiva(i)}>
              <Avatar autor={m.autor} tipo={m.tipo} equipo={menciones.equipo} size={24} />
              <span className="n">{m.autor}</span>
              {m.estado ? <span className="st work"><span className="spin" />{t.escribiendo}</span> : esAgente(m.autor, m.tipo) && <span className="st">{t.agente}</span>}
            </div>
          ))}
        </div>
      )}
      {archivo && (
        <div className="staged"><div className="chip-file">
          <div><div className="nm">{archivo.name}</div><div className="mt">{peso(archivo.size)} · {t.seMandaCon}</div></div>
          <button className="x" onClick={() => setArchivo(null)} title={t.sacar}>{I.x}</button>
        </div></div>
      )}
      <textarea
        ref={taRef} rows={1} value={texto} placeholder={placeholder} autoFocus={autoFocus} maxLength={MAX_TEXTO}
        aria-label={hilo ? t.ariaHilo : t.ariaCanal}
        onChange={(e) => { setTexto(e.target.value); setCursor(e.target.selectionEnd); ajustar() }}
        onSelect={leerCursor}
        onBlur={() => setCerrada(clave)}
        onFocus={() => setCerrada(null)}
        onKeyDown={(e) => {
          if (teclaMencion(e)) return
          if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); mandar() }
        }}
      />
      <div className="bar">
        <button className="iconbtn" onClick={() => fileRef.current?.click()} title={t.adjuntar}>{I.clip}</button>
        <input ref={fileRef} type="file" hidden onChange={(e) => { setArchivo(e.target.files?.[0] ?? null); e.target.value = '' }} />
        {hilo && (
          <label className="also" title={t.tambienTitulo}><input type="checkbox" checked={tambien} onChange={(e) => setTambien(e.target.checked)} /><span>{t.tambien}<small>{t.tambienAyuda}</small></span></label>
        )}
        <span className="grow" />
        {abierta ? <span className="hint">{t.hintMencion}</span>
          : !hilo && <span className="hint">{t.hintEnviar}</span>}
        {/* onMouseDown: que el toque no le saque el foco al textarea (en mobile el teclado se baja, el layout se mueve y el clic caía afuera). */}
        <button type="button" className={`send ${texto.trim() || archivo ? 'on' : ''}`} onMouseDown={(e) => e.preventDefault()} onClick={() => { if (!texto.trim() && !archivo) taRef.current?.focus(); else mandar() }} aria-disabled={!texto.trim() && !archivo}
          title={hilo ? t.mandarHilo : t.mandar} aria-label={hilo ? t.mandarHilo : t.mandar}>{I.up}</button>
      </div>
    </div>
  )
}

type Ctx = {
  yo: Yo; equipo: string[]; nombres: string[]; tipoDe: Record<string, string>
  reaccionar: (m: Mensaje, emoji: string) => void
  abrirHilo: (id: number) => void
  editar: (m: Mensaje, texto: string) => Promise<boolean>
  borrar: (m: Mensaje) => void
  hiloConNovedad: (m: Mensaje) => boolean
  porId: Record<number, Mensaje>
  decidir: (m: Mensaje, opcion: string) => Promise<void>
}

// Tarjeta de decisión: un agente pide que alguien elija. Botones para quien decide (la recomendada
// llena y con su etiqueta), "Esperando a…" para los demás, y después qué se eligió.
function Pregunta({ m, ctx }: { m: Mensaje; ctx: Ctx }) {
  const { yo } = ctx
  const [cambiando, setCambiando] = useState(false)
  const [enviando, setEnviando] = useState<string | null>(null)
  const ops = m.opciones ?? []
  const para = m.pregunta_para ?? []
  const puede = para.includes(yo.autor) || (yo.decide === 'todos' && yo.tipo === 'persona' && m.autor !== yo.autor)
  const d = m.decision
  const resp = d?.respuesta_id ? ctx.porId[d.respuesta_id] : undefined
  const tomada = !!resp?.reacciones?.some((r) => (r.emoji === '👀' || r.emoji === '✓') && r.autores.includes(m.autor))
  const abierta = puede && (!d || cambiando)
  const elegir = async (id: string) => {
    if (enviando) return
    setEnviando(id)
    await ctx.decidir(m, id)
    setEnviando(null); setCambiando(false)
  }
  return (
    <div className={`decide ${d && !cambiando ? 'done' : ''} ${!puede ? 'wait' : ''}`}>
      <div className="dhead">
        <span className="label">{d && !cambiando ? t.decision : t.necesitaDecision}</span>
        {!d && !puede && <span className="dwait">{t.esperandoA(listar(para))}</span>}
      </div>
      <div className="opts">
        {ops.map((o) => {
          const elegida = d?.opcion === o.id && !cambiando
          const detalle = o.etiqueta && o.texto !== o.etiqueta ? o.texto : null
          return (
            <button key={o.id} type="button" disabled={!abierta || !!enviando}
              className={`opt ${o.recomendada ? 'rec' : ''} ${elegida ? 'chosen' : ''} ${d && !cambiando && !elegida ? 'dim' : ''} ${enviando === o.id ? 'busy' : ''}`}
              onClick={() => elegir(o.id)}>
              <span className="ot">{elegida && <span className="ok">{I.check}</span>}{o.etiqueta || o.texto}</span>
              {detalle && <span className="od">{detalle}</span>}
              {o.recomendada && <span className="orec">{t.recomendada}</span>}
            </button>
          )
        })}
      </div>
      {d && !cambiando && (
        <div className="dfoot">
          <span>{d.cambiada
            ? (d.autor === yo.autor ? t.cambiasteEleccion : t.cambioEleccion(d.autor))
            : (d.autor === yo.autor ? t.elegisteVos : t.eligio(d.autor))} · {hora(d.cuando)}</span>
          {tomada ? <span className="dtaken">{t.yaLaTomo(m.autor)}</span>
            : puede && <button type="button" className="lnk" onClick={() => setCambiando(true)}>{t.cambiar}</button>}
        </div>
      )}
      {cambiando && <div className="dfoot"><span>{t.elegiOtra(m.autor)}</span><button type="button" className="lnk" onClick={() => setCambiando(false)}>{t.cancelar}</button></div>}
    </div>
  )
}

// Línea de sistema ("Mateo renombró la sala …"): centrada, sin avatar ni acciones. **x** va en negrita.
function LineaSistema({ m }: { m: Mensaje }) {
  const partes = m.texto.split(/\*\*(.+?)\*\*/g)
  return (
    <div style={{ textAlign: 'center', fontSize: 13, opacity: 0.6, padding: '6px 16px' }}>
      {partes.map((p, i) => (i % 2 ? <strong key={i}>{p}</strong> : p))}
    </div>
  )
}

// ≤ 760 px: el hilo ocupa toda la pantalla y el chat de atrás tiene que quedar inerte (sin foco, sin toques, fuera del árbol de accesibilidad).
function useMovil() {
  const q = '(max-width: 760px)'
  const [m, setM] = useState(() => typeof window !== 'undefined' && !!window.matchMedia?.(q).matches)
  useEffect(() => {
    const mq = window.matchMedia?.(q)
    if (!mq) return
    const f = () => setM(mq.matches)
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])
  return m
}

function Escribiendo({ m, equipo }: { m: Miembro; equipo: string[] }) {
  return (
    <div className="msg">
      <Avatar autor={m.autor} tipo={m.tipo} equipo={equipo} size={36} />
      <div>
        <div className="working" role="status"><span className="spin" /><span>{t.estaEscribiendo(m.autor)}</span></div>
      </div>
    </div>
  )
}

function Fila(props: { m: Mensaje; cont: boolean; ctx: Ctx; enHilo?: boolean; nuevo?: boolean }) {
  return props.m.sistema ? <LineaSistema m={props.m} /> : <FilaMensaje {...props} />
}

function FilaMensaje({ m, cont, ctx, enHilo, nuevo }: { m: Mensaje; cont: boolean; ctx: Ctx; enHilo?: boolean; nuevo?: boolean }) {
  const { yo, equipo, nombres, tipoDe } = ctx
  const [editando, setEditando] = useState(false)
  const [borrando, setBorrando] = useState(false)
  const [emojis, setEmojis] = useState(false)
  const [activo, setActivo] = useState(false)
  const [borrador, setBorrador] = useState(m.texto)
  const mio = m.autor === yo.autor
  const agente = m.is_ai ?? esAgente(m.autor, tipoDe[m.autor])
  const reacciones = (m.reacciones ?? []).filter((r) => r.autores.length)
  const raiz = !enHilo && m.respuesta_a ? ctx.porId[m.respuesta_a] : null
  // Un agente (u otra persona) que contesta en el canal a un mensaje MÍO: el botón abre ese hilo, el de mi mensaje.
  const paraMi = !!raiz && !mio && raiz.autor === yo.autor && !raiz.borrado
  const nuevoParaMi = paraMi && ctx.hiloConNovedad(raiz!)
  const ariaResponder = t.ariaResponderA(m.autor, recortar(m.texto || m.archivo_nombre || '', 40))
  const guardar = async () => {
    if (borrador.trim() === m.texto.trim()) { setEditando(false); return }
    if (await ctx.editar(m, borrador)) setEditando(false)
  }
  // En pantallas táctiles no hay hover: tocar el mensaje muestra sus acciones.
  const tocar = (e: React.MouseEvent) => {
    if (!window.matchMedia?.('(hover: none)').matches) return
    if ((e.target as HTMLElement).closest('a, button, textarea, video, iframe, input')) return
    setActivo((a) => !a)
  }
  return (
    <div data-mid={m.id} className={`msg ${cont ? 'cont' : ''} ${m.pendiente ? 'pend' : ''} ${activo || emojis ? 'act' : ''} ${nuevo ? 'nuevo' : ''} ${mio ? 'mine' : ''}`} onClick={tocar} onMouseLeave={() => setEmojis(false)}>
      {cont ? <div className="gutter"><span className="time-h">{hora(m.creado)}</span></div> : <Avatar autor={m.autor} tipo={m.is_ai === undefined ? tipoDe[m.autor] : m.is_ai ? 'agente' : 'persona'} equipo={equipo} size={36} />}
      <div className="main">
        {!cont && (
          <div className="meta">
            <span className="who">{m.autor}</span>{mio && <span className="tag me">{t.vosTag}</span>}{agente ? <span className="tag">{t.agente}</span> : !equipo.includes(m.autor) && <span className="tag guest">{t.invitado}</span>}
            <span className="time">{hora(m.creado)}</span>{m.editado && !m.borrado && <span className="edited">{t.editado}</span>}
          </div>
        )}
        {m.solo_equipo && !m.borrado && <div className="tag solo">{t.soloEquipo}</div>}
        {raiz && (
          <button className="in-thread" onClick={() => ctx.abrirHilo(raiz.id)}>
            {I.hilo}<span>{t.enRespuestaA}: <b>{raiz.borrado ? t.mensajeBorrado : recortar(raiz.texto || raiz.archivo_nombre || '', 70)}</b></span>
          </button>
        )}
        {nuevoParaMi && <span className="newtag">{t.nuevoParaVos}</span>}
        <div className="body">
          {m.borrado ? <p className="gone">{t.msgBorrado}</p>
            : editando ? (
              <div className="editbox">
                <textarea value={borrador} autoFocus rows={Math.min(8, borrador.split('\n').length + 1)}
                  onChange={(e) => setBorrador(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') { setEditando(false); setBorrador(m.texto) }
                    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); guardar() }
                  }} />
                <div className="acts"><span className="hint">{t.escCancelar}</span><span className="grow" />
                  <button className="btn sec sm" onClick={() => { setEditando(false); setBorrador(m.texto) }}>{t.cancelar}</button>
                  <button className="btn sm" onClick={guardar}>{t.guardar}</button>
                </div>
              </div>
            ) : <>
              <Texto texto={m.texto} nombres={nombres} equipo={equipo} />
              {cont && m.editado && <span className="edited">{t.editado}</span>}
              {!!m.opciones?.length && <Pregunta m={m} ctx={ctx} />}
              <Adjunto m={m} lado={ladoDe(m.autor, equipo)} />
            </>}
        </div>
        {borrando && (
          <div className="confirm"><span>{t.confirmarBorrar}</span>
            <button className="btn sec sm" onClick={() => setBorrando(false)}>{t.cancelar}</button>
            <button className="btn danger sm" onClick={() => { setBorrando(false); ctx.borrar(m) }}>{t.borrar}</button>
          </div>
        )}
        {reacciones.length > 0 && !m.borrado && (
          <div className="reacts">
            {reacciones.map((r) => {
              const estado = r.emoji === '✓' || (r.emoji === '👀' && r.autores.every((a) => esAgente(a, tipoDe[a])))
              const mia = r.autores.includes(yo.autor)
              const titulo = r.emoji === '✓' ? t.atendidoPor(listar(r.autores)) : estado ? t.loEstaViendo(listar(r.autores)) : listar(r.autores)
              return (
                <button key={r.emoji} className={`rchip ${mia ? 'mine' : ''} ${estado ? 'st' : ''}`} title={titulo}
                  disabled={!REACCIONES.includes(r.emoji)} onClick={() => ctx.reaccionar(m, r.emoji)}>
                  <span className="e">{r.emoji === '✓' ? I.check : r.emoji}</span>
                  {estado ? <span className="n">{r.emoji === '✓' ? t.visto + ' · ' : t.leyendo + ' · '}{r.autores.join(', ')}</span> : <span className="n">{r.autores.length}</span>}
                </button>
              )
            })}
          </div>
        )}
        {!enHilo && !m.respuesta_a && (m.respuestas ?? 0) > 0 && (
          <button className="thread-row" onClick={() => ctx.abrirHilo(m.id)} aria-label={t.ariaRespuestasA(m.respuestas ?? 0, m.autor, recortar(m.texto || m.archivo_nombre || '', 40))}>
            <span className="stack">{(m.respondieron ?? []).slice(0, 3).map((a) => <Avatar key={a} autor={a} tipo={tipoDe[a]} equipo={equipo} size={24} />)}</span>
            <span className="cnt">{m.respuestas} {m.respuestas === 1 ? t.respuesta : t.respuestas}</span>
            {m.ultima_respuesta && <span className="last">{t.ultima} {hora(m.ultima_respuesta)}</span>}
            {ctx.hiloConNovedad(m) && <span className="newtag" title={t.hayNuevas}>{t.nuevoParaVos}</span>}
            <span className="go">{t.verRespuestas}</span>
          </button>
        )}
        {agente && !enHilo && !m.sistema && !m.pendiente && !m.borrado && !editando && (
          <button type="button" className={`reply-txt ${paraMi ? 'dir' : ''}`} onClick={() => ctx.abrirHilo(m.respuesta_a ?? m.id)}
            aria-label={paraMi ? t.ariaResponderleA(m.autor, recortar(raiz!.texto || raiz!.archivo_nombre || '', 40)) : ariaResponder}>{I.hilo}{paraMi ? t.responderleA(m.autor) : t.responder}</button>
        )}
        {!m.pendiente && !m.borrado && !editando && (
          <div className="tools" onClick={(e) => e.stopPropagation()}>
            {emojis
              ? REACCIONES.map((e) => <button key={e} className="em" onClick={() => { ctx.reaccionar(m, e); setEmojis(false); setActivo(false) }} title={e}>{e}</button>)
              : <>
                <button onClick={() => setEmojis(true)} title={t.reaccionar}>{I.smile}</button>
                {/* En mensajes de agentes ya está el botón "Responder" con texto: una sola acción. */}
                {!enHilo && !agente && <button onClick={() => { setActivo(false); ctx.abrirHilo(m.respuesta_a ?? m.id) }} title={t.responderHiloAyuda} aria-label={ariaResponder}>{I.hilo}</button>}
                {mio && <button onClick={() => { setBorrador(m.texto); setEditando(true); setActivo(false) }} title={t.editar}>{I.edit}</button>}
                {mio && <button onClick={() => { setBorrando(true); setActivo(false) }} title={t.borrar}>{I.trash}</button>}
              </>}
          </div>
        )}
      </div>
    </div>
  )
}

// Lista de mensajes con separador por día, agrupados por autor (5 min) y la marca "Nuevos".
function Lista({ mensajes, ctx, enHilo, nuevosDesde }: { mensajes: Mensaje[]; ctx: Ctx; enHilo?: boolean; nuevosDesde?: number | null }) {
  const filas: React.ReactNode[] = []
  let anterior: Mensaje | null = null
  let marcado = false
  for (const m of mensajes) {
    const esNuevo = !marcado && nuevosDesde != null && m.id > nuevosDesde && !m.pendiente && m.autor !== ctx.yo.autor
    if (esNuevo) { marcado = true; filas.push(<div className="nuevos" key={'n' + m.id}><span>{t.nuevos}</span></div>) }
    if (!enHilo && (!anterior || dia(anterior.creado) !== dia(m.creado))) filas.push(<div className="day" key={'d' + m.id}><span className="label">{dia(m.creado)}</span></div>)
    const cont = !esNuevo && !!anterior && anterior.autor === m.autor && !anterior.borrado && !(anterior.respuestas ?? 0) && dia(anterior.creado) === dia(m.creado)
      && new Date(m.creado).getTime() - new Date(anterior.creado).getTime() < 5 * 60_000 && !(m.respuesta_a && !enHilo)
    filas.push(<Fila key={m.cliente_id && m.pendiente ? m.cliente_id : m.id} m={m} cont={cont} ctx={ctx} enHilo={enHilo} />)
    anterior = m
  }
  return <>{filas}</>
}

const ordenar = (xs: Mensaje[]) => xs.sort((a, b) => (a.pendiente ? Infinity : a.id) - (b.pendiente ? Infinity : b.id) || a.creado.localeCompare(b.creado))

function Chat({ clave, tema, alternarTema, onClaveInvalida }: { clave: string; tema: string; alternarTema: () => void; onClaveInvalida: () => void }) {
  const [yo, setYo] = useState<Yo | null>(null)
  const [porId, setPorId] = useState<Record<number, Mensaje>>({})
  const [miembros, setMiembros] = useState<Miembro[]>([])
  const [presenciaLista, setPresenciaLista] = useState(false)   // hasta la primera respuesta no hay contador: "0 en la sala" sería mentira
  const [aviso, setAviso] = useState<string | null>(null)
  const [panel, setPanel] = useState(false)
  const [comandoClaude, setComandoClaude] = useState<string | null>(null)
  const [hiloId, setHiloId] = useState<number | null>(null)
  const [lecturas, setLecturas] = useState<Record<number, number> | null>(null)
  const [nuevosDesde, setNuevosDesde] = useState<number | null>(null)
  const [visible, setVisible] = useState(() => typeof document === 'undefined' || document.visibilityState === 'visible')
  const [permiso, setPermiso] = useState<string>(() => typeof Notification === 'undefined' ? 'no' : Notification.permission)
  const movil = useMovil()
  const streamRef = useRef<HTMLDivElement>(null)
  const hiloRef = useRef<HTMLDivElement>(null)
  const pegado = useRef(true)
  const pegadoHilo = useRef(true)
  const tocando = useRef(false)          // dedo/mouse apoyado en el chat: no se mueve el scroll bajo el toque
  const scrollPendiente = useRef(false)
  const [cargaHilo, setCargaHilo] = useState<{ id: number; estado: 'cargando' | 'error' } | null>(null)
  const version = useRef(0)
  const arranque = useRef(Date.now())
  const avisados = useRef(new Set<number>())

  const manejar = useCallback((e: unknown) => {
    if ((e as { status?: number }).status === 401) onClaveInvalida()
  }, [onClaveInvalida])

  const sumar = useCallback((nuevos: Mensaje[]) => {
    if (!nuevos.length) return
    setPorId((prev) => {
      const next = { ...prev }
      for (const n of nuevos) {
        if (n.cliente_id) for (const k in next) if (next[k].pendiente && next[k].cliente_id === n.cliente_id) delete next[k]
        next[n.id] = n
      }
      return next
    })
  }, [])

  // Arranque: quién soy, canal y lecturas
  useEffect(() => {
    let vivo = true
    ;(async () => {
      try {
        const y = await api<Yo>('/yo', clave)
        if (!vivo) return
        const [h, l] = await Promise.all([
          api<{ mensajes: Mensaje[]; version: number }>('/historial?n=150&canal=1', clave),
          api<{ lecturas: { hilo: number; leido_hasta: number }[] }>('/lecturas', clave),
        ])
        if (!vivo) return
        version.current = h.version ?? 0
        sumar(h.mensajes)
        const mapa = Object.fromEntries(l.lecturas.map((x) => [x.hilo, x.leido_hasta]))
        // Primera vez en esta sala: arranca con todo leído.
        if (mapa[0] === undefined) mapa[0] = Math.max(0, ...h.mensajes.map((m) => m.id))
        setLecturas(mapa); setNuevosDesde(mapa[0])
        setYo(y)
      } catch (e) { manejar(e) }
    })()
    return () => { vivo = false }
  }, [clave, sumar, manejar])

  // Long-poll por versión: el servidor responde apenas hay algo nuevo o un cambio (o a los 25 s).
  useEffect(() => {
    if (!yo) return
    let vivo = true
    ;(async () => {
      let pausa = 1000
      while (vivo) {
        try {
          const r = await api<{ mensajes: Mensaje[]; version: number }>(`/recibir?v=${version.current}&espera=25&todos=1`, clave)
          if (!vivo) return
          version.current = Math.max(version.current, r.version ?? 0)
          sumar(r.mensajes)
          pausa = 1000; setAviso((a) => (a === t.sinConexion ? null : a))
        } catch (e) {
          manejar(e)
          if (!vivo) return
          setAviso(t.sinConexion)
          await new Promise((res) => setTimeout(res, pausa)); pausa = Math.min(pausa * 2, 15000)
        }
      }
    })()
    return () => { vivo = false }
  }, [yo, clave, sumar, manejar])

  // Presencia y "trabajando…": cada 4 s.
  useEffect(() => {
    if (!yo) return
    const traer = () => api<{ miembros: Miembro[] }>('/presencia', clave).then((r) => { setMiembros(r.miembros); setPresenciaLista(true) }).catch(manejar)
    traer()
    const t = setInterval(traer, 4000)
    return () => clearInterval(t)
  }, [yo, clave, manejar])

  // Pestaña visible/oculta: al irse, lo leído hasta ahí pasa a ser la marca de "Nuevos" para la vuelta.
  useEffect(() => {
    const cambio = () => {
      const v = document.visibilityState === 'visible'
      setVisible(v)
      if (!v) setNuevosDesde(lecturasRef.current?.[0] ?? null)
    }
    document.addEventListener('visibilitychange', cambio)
    return () => document.removeEventListener('visibilitychange', cambio)
  }, [])
  const lecturasRef = useRef(lecturas)
  lecturasRef.current = lecturas

  const todos = useMemo(() => Object.values(porId), [porId])
  const canal = useMemo(() => ordenar(todos.filter((m) => !m.respuesta_a || m.tambien_canal)), [todos])
  const hilo = useMemo(() => hiloId == null ? [] : ordenar(todos.filter((m) => m.respuesta_a === hiloId)), [todos, hiloId])
  const raizHilo = hiloId != null ? porId[hiloId] : null
  const ultimoCanal = useMemo(() => Math.max(0, ...canal.filter((m) => !m.pendiente).map((m) => m.id)), [canal])
  const ultimoHilo = useMemo(() => Math.max(0, ...hilo.filter((m) => !m.pendiente).map((m) => m.id)), [hilo])

  const marcarLeido = useCallback((h: number, hasta: number) => {
    if (!hasta) return
    setLecturas((prev) => {
      if (!prev || (prev[h] ?? 0) >= hasta) return prev
      api('/leido', clave, { method: 'POST', body: JSON.stringify({ hilo: h, hasta }) }).catch(() => {})
      return { ...prev, [h]: hasta }
    })
  }, [clave])

  // Leído: canal mientras la pestaña está a la vista y abajo de todo; hilo mientras está abierto.
  const [abajo, setAbajo] = useState(true)
  useEffect(() => { if (visible && abajo && lecturas) marcarLeido(0, ultimoCanal) }, [visible, abajo, ultimoCanal, lecturas, marcarLeido])
  useEffect(() => { if (visible && hiloId != null && lecturas) marcarLeido(hiloId, Math.max(ultimoHilo, hiloId)) }, [visible, hiloId, ultimoHilo, lecturas, marcarLeido])

  const noLeidos = useMemo(() => {
    if (!lecturas || !yo) return 0
    return canal.filter((m) => !m.pendiente && !m.borrado && m.autor !== yo.autor && m.id > (lecturas[0] ?? 0)).length
  }, [canal, lecturas, yo])
  useEffect(() => { if (yo) document.title = `${noLeidos ? `(${noLeidos}) ` : ''}Sala · ${yo.titulo}` }, [noLeidos, yo])

  // Hilos con novedades: los que sigo (los empecé o respondí) con una respuesta ajena que no abrí.
  const hiloConNovedad = useCallback((m: Mensaje) => {
    if (!yo || !lecturas || !m.ultima_respuesta_id) return false
    const sigo = m.autor === yo.autor || (m.respondieron ?? []).includes(yo.autor) || (m.menciones ?? []).includes(yo.autor)
    const ultimoAjeno = (m.respondieron ?? []).some((a) => a !== yo.autor)
    return sigo && ultimoAjeno && m.ultima_respuesta_id > (lecturas[m.id] ?? m.id) && hiloId !== m.id
  }, [yo, lecturas, hiloId])

  // Aviso del navegador sólo cuando me nombran (y la pestaña no está a la vista).
  useEffect(() => {
    if (!yo || permiso !== 'granted') return
    for (const m of todos) {
      if (m.pendiente || m.autor === yo.autor || avisados.current.has(m.id) || !(m.menciones ?? []).includes(yo.autor)) continue
      avisados.current.add(m.id)
      if (new Date(m.creado).getTime() < arranque.current || document.visibilityState === 'visible') continue
      try {
        const n = new Notification(t.notiNombro(m.autor, yo.titulo), { body: m.texto.slice(0, 160), tag: 'sala-' + m.id })
        n.onclick = () => { window.focus(); if (m.respuesta_a) setHiloId(m.respuesta_a); n.close() }
      } catch { /* algunos navegadores sólo permiten avisos desde un service worker */ }
    }
  }, [todos, yo, permiso])
  const pedirPermiso = () => { Notification.requestPermission().then(setPermiso).catch(() => {}) }

  // Scroll. Reglas (R2 + R3):
  //  - al cargar, la sala aterriza ABAJO (lo último) y se queda abajo mientras el contenido crece solo (fotos, tipografías);
  //  - si el usuario subió a leer, el chat NO se mueve (aparece "mensajes nuevos ↓"), ni con un mensaje nuevo ni al abrir/cerrar un hilo;
  //  - mientras tiene el dedo apoyado tampoco, para que un mensaje que llega justo al tocar no corra la lista.
  // Un ResizeObserver mantiene el fondo cuando el contenido crece solo (fotos, tipografías) y, si el usuario está leyendo más arriba,
  // restaura un ancla (el primer mensaje visible) tras cada cambio de tamaño, p. ej. cuando el panel del hilo cambia el ancho del chat.
  // Los scrolls que hace el propio código (bajar, restaurar el ancla) se reconocen por su posición: su "eco" (el evento scroll llega un
  // cuadro después, cuando un tercero ya pudo haber agrandado el contenido) no cuenta como "el usuario subió a leer".
  const posPropia = useRef<number | null>(null)
  const ultimoTop = useRef(0)            // última posición vista (evento scroll o scroll propio)
  const bajar = () => { const el = streamRef.current; if (el) { el.scrollTop = el.scrollHeight; posPropia.current = ultimoTop.current = el.scrollTop } }
  const anclaCanal = useRef<{ id: number; off: number } | null>(null)
  const marcarAncla = () => {
    const el = streamRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top
    for (const n of Array.from(el.querySelectorAll<HTMLElement>('[data-mid]'))) {
      const r = n.getBoundingClientRect()
      if (r.bottom > top + 1) { anclaCanal.current = { id: Number(n.dataset.mid), off: r.top - top }; return }
    }
    anclaCanal.current = null
  }
  const restaurarAncla = () => {
    const el = streamRef.current, a = anclaCanal.current
    if (!el || !a) return
    const n = el.querySelector<HTMLElement>(`[data-mid="${a.id}"]`)
    if (n) { el.scrollTop += n.getBoundingClientRect().top - el.getBoundingClientRect().top - a.off; posPropia.current = ultimoTop.current = el.scrollTop }
  }
  // Un scroll del usuario cuyo evento todavía no llegó (el efecto de un mensaje nuevo o de la presencia corre antes): la posición ya
  // subió respecto de la última vista y estamos lejos del fondo → el usuario subió a leer; no se lo baja.
  const despegarSiSubio = () => {
    const el = streamRef.current
    if (!el || !pegado.current) return
    if (el.scrollHeight - el.scrollTop - el.clientHeight >= 40 && el.scrollTop < ultimoTop.current - 2) {
      pegado.current = false; setAbajo(false); ultimoTop.current = el.scrollTop; marcarAncla()
    }
  }
  useEffect(() => {
    despegarSiSubio()
    if (!pegado.current) return
    if (tocando.current) { scrollPendiente.current = true; return }
    bajar()
  }, [canal, miembros])
  // Aterrizaje y crecimiento: cada vez que el contenido o el ancho del chat cambian, o se queda abajo o se conserva la posición.
  useEffect(() => {
    const el = streamRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const reajustar = () => {
      despegarSiSubio()
      if (pegado.current) { if (tocando.current) scrollPendiente.current = true; else bajar() }
      else restaurarAncla()
    }
    const ro = new ResizeObserver(reajustar)
    ro.observe(el)
    const inner = el.firstElementChild
    if (inner) ro.observe(inner)
    return () => ro.disconnect()
  }, [yo])
  useEffect(() => {
    const el = hiloRef.current
    if (el && (pegadoHilo.current || hiloId !== ultimoHiloAbierto.current)) { el.scrollTop = el.scrollHeight; pegadoHilo.current = true }
    ultimoHiloAbierto.current = hiloId
  }, [hilo.length, hiloId])
  const ultimoHiloAbierto = useRef<number | null>(null)
  useEffect(() => {
    const el = hiloRef.current
    if (!el || hiloId == null || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => { if (pegadoHilo.current) el.scrollTop = el.scrollHeight })
    ro.observe(el)
    if (el.firstElementChild) ro.observe(el.firstElementChild)
    return () => ro.disconnect()
  }, [hiloId, yo])
  const alScrollear = () => {
    const el = streamRef.current
    if (!el) return
    const distancia = el.scrollHeight - el.scrollTop - el.clientHeight
    ultimoTop.current = el.scrollTop
    if (posPropia.current != null && Math.abs(el.scrollTop - posPropia.current) < 1.5) { posPropia.current = null; if (distancia >= 40) return }   // eco de un scroll nuestro: no despega ni re-ancla
    pegado.current = distancia < 40
    setAbajo(pegado.current)
    if (!pegado.current) marcarAncla()
  }
  const alScrollearHilo = () => {
    const el = hiloRef.current
    if (el) pegadoHilo.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40
  }
  // Soltar el mouse/dedo fuera del chat (p. ej. arrastrando la barra de scroll) no dispara pointerup en el stream: se escucha en la ventana.
  useEffect(() => {
    const f = () => { if (tocando.current) soltarRef.current() }
    window.addEventListener('pointerup', f); window.addEventListener('pointercancel', f)
    return () => { window.removeEventListener('pointerup', f); window.removeEventListener('pointercancel', f) }
  }, [])
  const apoyar = (e: React.PointerEvent) => {
    tocando.current = true
    // Lo que se toca es lo que no se mueve: si el toque abre un hilo (y el chat cambia de ancho), se conserva ESE mensaje en su lugar.
    const msg = (e.target as HTMLElement).closest?.('[data-mid]') as HTMLElement | null
    const el = streamRef.current
    if (!el) return
    // El toque manda: si el chat no está al fondo, el usuario está leyendo ahí aunque el evento de scroll todavía no haya llegado.
    if (el.scrollHeight - el.scrollTop - el.clientHeight >= 40) { pegado.current = false; ultimoTop.current = el.scrollTop }
    if (msg && !pegado.current) anclaCanal.current = { id: Number(msg.dataset.mid), off: msg.getBoundingClientRect().top - el.getBoundingClientRect().top }
  }
  const soltarRef = useRef<() => void>(() => {})
  const soltar = () => {
    setTimeout(() => {
      tocando.current = false
      if (scrollPendiente.current && pegado.current) bajar()
      scrollPendiente.current = false
    }, 400)
  }
  soltarRef.current = soltar

  const cargarHilo = useCallback((id: number) => {
    setCargaHilo({ id, estado: 'cargando' })
    api<{ raiz: Mensaje; respuestas: Mensaje[] }>(`/hilo?id=${id}`, clave)
      .then((r) => { sumar([r.raiz, ...r.respuestas]); setCargaHilo((c) => c?.id === id ? null : c) })
      .catch((e) => { manejar(e); setCargaHilo((c) => c?.id === id ? { id, estado: 'error' } : c) })
  }, [clave, sumar, manejar])

  // Mobile: abrir un hilo suma un estado al historial, así "atrás" cierra el hilo en vez de salir de la sala.
  const abrirHilo = useCallback((id: number) => {
    setHiloId(id); setPanel(false); pegadoHilo.current = true
    try {
      const estado = { ...(window.history.state ?? {}), salaHilo: id }
      if (window.matchMedia?.('(max-width: 760px)').matches && window.history.state?.salaHilo == null) window.history.pushState(estado, '')
      else if (window.history.state?.salaHilo != null) window.history.replaceState(estado, '')
    } catch { /* historial no disponible */ }
    cargarHilo(id)
  }, [cargarHilo])
  const cerrarHilo = useCallback(() => {
    if (window.history.state?.salaHilo != null) window.history.back()   // el popstate cierra
    else setHiloId(null)
  }, [])
  useEffect(() => {
    const f = () => {
      const id = window.history.state?.salaHilo
      if (id == null) setHiloId(null)
      else { setHiloId(id); cargarHilo(id) }
    }
    window.addEventListener('popstate', f)
    return () => window.removeEventListener('popstate', f)
  }, [cargarHilo])

  // Mandar: optimista, con cliente_id (reintentar no duplica) y adjuntos grandes por URL firmada.
  const mandar = useCallback(async (texto: string, archivo: File | null, extra: Envio) => {
    if (!yo) return false
    const cliente_id = uuid()
    const tempId = -Date.now()
    const temporal: Mensaje = {
      id: tempId, autor: yo.autor, texto, creado: new Date().toISOString(), archivo_nombre: archivo?.name,
      pendiente: true, cliente_id, respuesta_a: extra.respuesta_a ?? null, tambien_canal: extra.tambien_canal,
      is_ai: yo.tipo === 'agente',
    }
    setPorId((prev) => ({ ...prev, [tempId]: temporal })); pegado.current = true
    try {
      const cuerpo: Record<string, unknown> = { texto, cliente_id, ...extra }
      if (archivo && archivo.size > MAX_BASE64) {
        const s = await api<{ path: string; url: string; tipo: string }>('/subir', clave, { method: 'POST', body: JSON.stringify({ nombre: archivo.name, tamano: archivo.size }) })
        const r = await fetch(s.url, { method: 'PUT', headers: { 'content-type': s.tipo }, body: archivo })
        if (!r.ok) throw new Error(t.errSubida(r.status))
        cuerpo.archivo_subido = { path: s.path, nombre: archivo.name }
      } else if (archivo) {
        cuerpo.archivo = { nombre: archivo.name, base64: await base64De(archivo) }
      }
      let error: unknown
      let cifrado = false   // true: el texto viaja en base64 (ver b64Texto)
      for (let i = 0; i < 3; i++) {
        try {
          const { texto: t, ...resto } = cuerpo
          await api('/enviar', clave, { method: 'POST', body: JSON.stringify(cifrado ? { ...resto, texto_b64: b64Texto(String(t)) } : cuerpo) })
          return true
        } catch (e) {
          error = e
          if (bloqueado(e) && !cifrado) { cifrado = true; continue }   // reintento inmediato, sin esperar
          const st = (e as { status?: number }).status
          if (st && st < 500 && !(e as { waf?: boolean }).waf) break
          await new Promise((r) => setTimeout(r, 800 * 2 ** i))
        }
      }
      throw error
    } catch (e) {
      manejar(e)
      setPorId((prev) => { const n = { ...prev }; delete n[tempId]; return n })
      setAviso(t.noSeMando((e as Error).message))
      return false
    }
  }, [yo, clave, manejar])

  const reaccionar = useCallback((m: Mensaje, emoji: string) => {
    if (!yo) return
    const quitar = !!m.reacciones?.find((r) => r.emoji === emoji)?.autores.includes(yo.autor)
    // optimista: el cambio real llega por /recibir?v=
    setPorId((prev) => {
      const actual = prev[m.id]; if (!actual) return prev
      let rs = (actual.reacciones ?? []).map((r) => ({ ...r, autores: [...r.autores] }))
      const r = rs.find((x) => x.emoji === emoji)
      if (quitar && r) r.autores = r.autores.filter((a) => a !== yo.autor)
      else if (r) r.autores.push(yo.autor)
      else rs = [...rs, { emoji, autores: [yo.autor] }]
      return { ...prev, [m.id]: { ...actual, reacciones: rs.filter((x) => x.autores.length) } }
    })
    api('/reaccion', clave, { method: 'POST', body: JSON.stringify({ id: m.id, emoji, quitar }) })
      .catch((e) => { manejar(e); setAviso(t.noReaccion((e as Error).message)) })
  }, [yo, clave, manejar])

  const editar = useCallback(async (m: Mensaje, texto: string) => {
    try {
      try { await api('/editar', clave, { method: 'POST', body: JSON.stringify({ id: m.id, texto }) }) } catch (e) {
        if (!bloqueado(e)) throw e
        await api('/editar', clave, { method: 'POST', body: JSON.stringify({ id: m.id, texto_b64: b64Texto(texto) }) })
      }
      setPorId((prev) => ({ ...prev, [m.id]: { ...prev[m.id], texto, editado: new Date().toISOString() } }))
      return true
    } catch (e) { manejar(e); setAviso(t.noEditar((e as Error).message)); return false }
  }, [clave, manejar])

  const borrar = useCallback((m: Mensaje) => {
    api('/borrar', clave, { method: 'POST', body: JSON.stringify({ id: m.id }) })
      .then(() => setPorId((prev) => ({ ...prev, [m.id]: { ...prev[m.id], borrado: new Date().toISOString(), texto: '', archivo_nombre: null, archivo_url: null } })))
      .catch((e) => { manejar(e); setAviso(t.noBorrar((e as Error).message)) })
  }, [clave, manejar])

  const decidir = useCallback(async (m: Mensaje, opcion: string) => {
    if (!yo) return
    const op = m.opciones?.find((o) => o.id === opcion)
    try {
      const r = await api<{ decision: Decision }>('/decidir', clave, { method: 'POST', body: JSON.stringify({ id: m.id, opcion }) })
      setPorId((prev) => prev[m.id] ? { ...prev, [m.id]: { ...prev[m.id], decision: r.decision } } : prev)
      setAviso(null)
    } catch (e) {
      manejar(e)
      const d = (e as { decision?: Decision }).decision
      if (d) setPorId((prev) => prev[m.id] ? { ...prev, [m.id]: { ...prev[m.id], decision: d } } : prev)
      setAviso(t.noElegir(op?.etiqueta || op?.texto || opcion, (e as Error).message))
    }
  }, [yo, clave, manejar])

  const cambiarDecide = async (decide: 'dirigida' | 'todos') => {
    try {
      await api('/config', clave, { method: 'POST', body: JSON.stringify({ decide }) })
      setYo((y) => y ? { ...y, decide } : y)
    } catch (e) { manejar(e); setAviso((e as Error).message) }
  }

  const sumarClaude = async () => {
    try {
      const r = await api<{ comando: string }>('/agente', clave, { method: 'POST', body: '{}' })
      setPanel(false); setComandoClaude(r.comando)
    } catch (e) { manejar(e); setAviso((e as Error).message) }
  }

  const equipo = yo?.equipo ?? ['Mateo', 'Claude de Mateo']
  const tipoDe = useMemo(() => Object.fromEntries(miembros.map((m) => [m.autor, m.tipo])), [miembros])
  const nombres = useMemo(() => miembros.map((m) => m.autor), [miembros])
  const trabajando = miembros.filter((m) => m.estado === 'trabajando')
  // ¿En qué hilo está contestando quien "trabaja"? En el del último mensaje que lo nombra (o, si nadie lo nombró, el último ajeno).
  // null = en el canal principal. El servidor no guarda el hilo del estado, así que se deduce de los mensajes.
  const hiloDe = (autor: string): number | null => {
    // Si el agente ya puso 👀 en un mensaje (y todavía no ✓), está trabajando en el hilo de ese mensaje.
    const leyendo = todos.filter((m) => !m.pendiente && !m.sistema && !m.borrado && m.autor !== autor
      && m.reacciones?.some((r) => r.emoji === '👀' && r.autores.includes(autor)) && !m.reacciones?.some((r) => r.emoji === '✓' && r.autores.includes(autor)))
      .sort((a, b) => b.id - a.id)[0]
    if (leyendo) return leyendo.respuesta_a ?? null
    const propios = todos.filter((m) => !m.pendiente && !m.sistema && !m.borrado && m.autor !== autor)
    const ult = propios.filter((m) => (m.menciones ?? []).includes(autor)).sort((a, b) => b.id - a.id)[0] ?? propios.sort((a, b) => b.id - a.id)[0]
    return ult?.respuesta_a ?? null
  }
  // Dentro del hilo: "<agente> lo está leyendo…" cuando ya puso 👀 en el último mensaje mío y todavía no contestó (✓ y "escribiendo" ya salen aparte).
  const leyendoHilo = yo && hiloId != null ? (() => {
    const mios = hilo.filter((m) => m.autor === yo.autor && !m.pendiente && !m.borrado)
    const ult = mios[mios.length - 1] ?? (raizHilo && raizHilo.autor === yo.autor ? raizHilo : null)
    if (!ult) return null
    const quienes = (ult.reacciones ?? []).filter((r) => r.emoji === '👀').flatMap((r) => r.autores).filter((a) => esAgente(a, tipoDe[a]) && !trabajando.some((w) => w.autor === a)
      && !(ult.reacciones ?? []).some((r) => r.emoji === '✓' && r.autores.includes(a)))
    return quienes.length ? quienes : null
  })() : null
  const archivos = canal.filter((m) => m.archivo_nombre && m.archivo_url && !m.borrado)
  const conectado = (m: Miembro) => m.visto && Date.now() - new Date(m.visto).getTime() < 90_000
  const miClaude = yo ? miembros.find((m) => m.autor === `Claude de ${yo.autor}`) : undefined
  // "@": miembros activos; primero quienes ya escribieron en el canal o en el hilo abierto.
  const participanCanal = useMemo(() => [...new Set(canal.filter((m) => !m.sistema).map((m) => m.autor))], [canal])
  const participanHilo = useMemo(() => [...new Set([...(raizHilo ? [raizHilo.autor] : []), ...hilo.map((m) => m.autor)])], [hilo, raizHilo])
  const mencionesCanal = useMemo(() => yo ? { miembros, yo: yo.autor, equipo, participan: participanCanal } : undefined, [miembros, yo, equipo, participanCanal])
  const mencionesHilo = useMemo(() => yo ? { miembros, yo: yo.autor, equipo, participan: participanHilo } : undefined, [miembros, yo, equipo, participanHilo])
  const ctx: Ctx | null = yo ? { yo, equipo, nombres, tipoDe, reaccionar, abrirHilo, editar, borrar, hiloConNovedad, porId, decidir } : null

  const lateral = yo && (
    <>
      <div className="logo"><MarcopoloLogo /></div>
      <div className="room-id"><div className="label">{t.sala}</div><div className="t">{yo.titulo}</div>{yo.subtitulo && <div className="s">{yo.subtitulo}</div>}</div>
      <div className="sec label">{t.enLaSalaSec}</div>
      {miembros.map((m) => (
        <div className="row" key={m.autor}>
          <Avatar autor={m.autor} tipo={m.tipo} equipo={equipo} size={24} />
          <span className="n">{m.autor}{m.autor === yo.autor ? ' ' + t.vos : ''}</span>
          {m.tipo !== 'agente' && !equipo.includes(m.autor) && <span className="tag guest">{t.invitado}</span>}
          {m.estado === 'trabajando' ? <span className="spin" title={t.escribiendo} /> : <span className={`dot ${conectado(m) ? '' : 'off'}`} title={conectado(m) ? t.conectado : t.sinConexionDot} />}
        </div>
      ))}
      <div className="spacer" />
      <div className="sec label">{t.archivos} · {archivos.length}</div>
      {archivos.slice(-8).reverse().map((m) => (
        <a className="row" key={m.id} href={m.archivo_url!} target="_blank" rel="noreferrer">
          <span className="ftile">{extension(m.archivo_nombre!)}</span><span className="n">{m.archivo_nombre}</span>
        </a>
      ))}
      {yo.admin && (
        <div className="cfg">
          <div className="label">{t.decisionesCfg}</div>
          <div className="seg sm" role="radiogroup" aria-label={t.quienResponde}>
            <button type="button" role="radio" aria-checked={yo.decide !== 'todos'} className={yo.decide !== 'todos' ? 'on' : ''} onClick={() => cambiarDecide('dirigida')}>{t.soloEsa}</button>
            <button type="button" role="radio" aria-checked={yo.decide === 'todos'} className={yo.decide === 'todos' ? 'on' : ''} onClick={() => cambiarDecide('todos')}>{t.cualquiera}</button>
          </div>
        </div>
      )}
      <div className="me">
        <div className="me-row">
          <Avatar autor={yo.autor} tipo={yo.tipo} equipo={equipo} size={32} />
          <div><div className="t">{yo.autor}</div><div className="s">{t.conectadoDesde}</div></div>
        </div>
        {permiso === 'default' && <button className="ghost" onClick={pedirPermiso}>{I.bell} {t.avisarme}</button>}
        {permiso === 'granted' && <div className="fine-s">{I.bell} {t.avisamos}</div>}
        {/* Reconectar regenera la clave: a un Claude conectado le cortaría la sesión, así que sólo se ofrece si está apagado hace rato. */}
        {yo.tipo === 'persona' && (!miClaude || (miClaude.dueno === yo.autor && !(miClaude.visto && Date.now() - new Date(miClaude.visto).getTime() < 15 * 60_000))) && (
          <button className="ghost" onClick={sumarClaude} title={t.sumarClaudeAyuda}>{I.plus} {miClaude ? t.reconectarClaude : t.sumarClaude}</button>
        )}
      </div>
    </>
  )

  if (!yo || !ctx) return <Cargando />
  const fondoInerte = hiloId != null && movil ? ({ inert: '', 'aria-hidden': true } as Record<string, unknown>) : {}

  return (
    <div className={`app ${hiloId != null ? 'con-hilo' : ''}`}>
      <aside className="side" {...fondoInerte}>{lateral}</aside>
      <div className="mtop" {...fondoInerte}>
        <div className="logo"><MarcopoloLogo /></div><span className="grow" />
        <button className="iconbtn" onClick={alternarTema} title={t.tema}>{I.moon}</button>
        <button className="iconbtn" onClick={() => setPanel(true)} title={t.salaYArchivos}>{I.menu}</button>
      </div>
      <main className="card" {...fondoInerte}>
        <div className="head">
          <div>
            <div className="t">{yo.titulo}</div>
            <div className="s">{presenciaLista ? <>{t.enLaSala(miembros.length)}{trabajando.length ? ` · ${t.nEscribiendo(trabajando.length)}` : ''}</> : t.conectando}</div>
          </div>
          <div className="grow" />
          <div className="stack">{miembros.slice(0, 5).map((m) => <Avatar key={m.autor} autor={m.autor} tipo={m.tipo} equipo={equipo} size={24} />)}</div>
          <button className="iconbtn hide-m" onClick={alternarTema} title={tema === 'dark' ? t.modoClaro : t.modoOscuro}>{I.moon}</button>
        </div>
        <div className="stream" ref={streamRef} onScroll={alScrollear} onPointerDown={apoyar} onPointerUp={soltar} onPointerCancel={soltar}>
          <div className="inner">
            {canal.length ? <Lista mensajes={canal} ctx={ctx} nuevosDesde={nuevosDesde} /> : <div className="empty">{t.vacio}</div>}
            {trabajando.filter((m) => hiloDe(m.autor) == null).map((m) => <Escribiendo key={'w' + m.autor} m={m} equipo={equipo} />)}
          </div>
        </div>
        <div className="dock">
          {/* Dentro del dock: flota SIEMPRE por encima del campo de escribir, crezca lo que crezca (varias líneas, adjunto). */}
          {!abajo && noLeidos > 0 && (
            <button className="jump" onClick={() => { const el = streamRef.current; if (el) { pegado.current = true; el.scrollTop = el.scrollHeight } }}>{noLeidos} {noLeidos === 1 ? t.mensajeNuevo : t.mensajesNuevos} ↓</button>
          )}
          <Composer placeholder={t.phCanal} onAviso={setAviso} menciones={mencionesCanal} onMandar={(t, a) => mandar(t, a, {})} />
          <div className={`rail ${aviso ? 'err' : ''}`}>{aviso}</div>
        </div>
      </main>

      {hiloId != null && (
        <section className="card tpanel">
          <div className="head">
            <button className="iconbtn only-m" onClick={cerrarHilo} title={t.volver}>{I.back}</button>
            <div><div className="t">{t.hilo} <span className="s inl">· {t.hiloAyuda}</span></div><div className="s">{raizHilo ? `${raizHilo.autor} · ${yo.titulo}` : yo.titulo}</div></div>
            <div className="grow" />
            <button className="iconbtn hide-m" onClick={cerrarHilo} title={t.cerrar}>{I.x}</button>
          </div>
          <div className="stream" ref={hiloRef} onScroll={alScrollearHilo}>
            <div className="inner">
              {raizHilo ? <Fila m={raizHilo} cont={false} ctx={ctx} enHilo /> : <div className="empty"><span className="spin" /></div>}
              <div className="tsep">{cargaHilo?.id === hiloId && cargaHilo.estado === 'error'
                ? <span>{t.errHilo} <button type="button" className="lnk" onClick={() => cargarHilo(hiloId)}>{t.reintentar}</button></span>
                : hilo.length ? <span>{hilo.length} {hilo.length === 1 ? t.respuesta : t.respuestas}</span>
                : cargaHilo?.id === hiloId || (raizHilo?.respuestas ?? 0) > 0 ? <span><span className="spin" /> {t.cargandoRespuestas}</span>
                : <span>{t.sinRespuestas}</span>}</div>
              <Lista mensajes={hilo} ctx={ctx} enHilo nuevosDesde={null} />
              {trabajando.filter((m) => hiloDe(m.autor) === hiloId).map((m) => <Escribiendo key={'w' + m.autor} m={m} equipo={equipo} />)}
              {leyendoHilo && <div className="working hilo-estado" role="status"><span className="spin" /><span>{t.leyendoPor(listar(leyendoHilo))}</span></div>}
            </div>
          </div>
          <div className="dock">
            <Composer key={hiloId} hilo placeholder={t.phHilo} onAviso={setAviso} autoFocus menciones={mencionesHilo}
              onMandar={(t, a, tambien) => mandar(t, a, { respuesta_a: hiloId, tambien_canal: tambien })} />
            <div className={`rail ${aviso ? 'err' : ''}`}>{aviso}</div>
          </div>
        </section>
      )}

      {panel && <>
        <div className="sheet-bg" onClick={() => setPanel(false)} />
        <aside className="sheet side">{lateral}</aside>
      </>}

      {comandoClaude && (
        <div className="modal-bg" onClick={() => setComandoClaude(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{t.modalTitulo}</h2>
            <p>{t.modal1}</p>
            <pre>{comandoClaude}</pre>
            <p>{t.modal2}</p>
            <pre>claude --dangerously-load-development-channels server:sala</pre>
            <p>{t.modal3(yo.autor)}</p>
            <div className="acts">
              <button className="btn sec" onClick={() => navigator.clipboard?.writeText(comandoClaude)}>{t.copiarPrimero}</button>
              <button className="btn" onClick={() => setComandoClaude(null)}>{t.listo}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
