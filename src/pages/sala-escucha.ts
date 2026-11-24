// Escucha de la sala en la web: timbre por Realtime en vez de preguntar en loop (2026-11-24).
//
// La función `sala`, después de cada escritura, manda un broadcast {id, v} SIN contenido al canal secreto de la
// sala (supabase/functions/sala/timbre.ts del repo sala); /yo le da a cada miembro con clave válida el nombre del
// canal (`timbre: {url, apikey, canal, evento}`). Acá:
//   - con la pestaña a la vista y el websocket unido: se pide /recibir sólo cuando suena (y si trae una versión
//     que todavía no tengo) y /presencia cuando suena; respaldo cada RESPALDO_MS por si se perdió un aviso
//   - websocket caído (o /yo sin timbre): long-poll a /recibir (espera=25) como antes, hasta que vuelva
//   - pestaña oculta: no se llama a nada. El websocket sigue abierto (no cuesta invocaciones) y, si el navegador
//     tiene permiso de avisos, un timbre con algo nuevo trae /recibir para poder avisar si me nombran
//   - al volver a la pestaña: /recibir + /presencia enseguida
//   - 401/403: se para todo (la clave no sirve más; reintentar sólo martilla)
// Es el mismo protocolo que el conector (src/timbre.mjs del repo sala): Phoenix por websocket, broadcast público.
// El mismo archivo vive en kontext (src/components/sala/escucha.ts) y en travels (src/pages/sala-escucha.ts): cambiar los dos.

export type TimbreInfo = { url: string; apikey: string; canal: string; evento?: string }

export type Escucha = {
  cerrar: () => void
  // Para medir desde la consola: window.__salaEscucha
  stats: { recibir: number; presencia: number; timbres: number; vivo: boolean; modo: string }
}

type Opciones = {
  timbre?: TimbreInfo | null
  version: () => number
  // /recibir?v=<version>&espera=<s>&todos=1 — aplica lo que llega y avanza la versión
  recibir: (espera: number, señal: AbortSignal) => Promise<void>
  presencia: () => Promise<void>
  // ¿pedir lo nuevo con la pestaña oculta? (sólo si hay permiso de avisos del navegador)
  avisosOcultos: () => boolean
  conexion: (ok: boolean) => void
  // 401/403: la clave ya no sirve
  fatal: (e: unknown) => void
}

export const RESPALDO_MS = 150_000          // 2,5 min: si se perdió un timbre, se recupera a lo sumo en este tiempo
const LONG_POLL_S = 25
const PRESENCIA_MIN_MS = 2_000              // ráfaga de timbres: una /presencia cada 2 s como mucho
const AGRUPAR_MS = 50                      // timbres seguidos (mensaje + reacción + 👀) van en una sola /recibir
const LATIDO_MS = 25_000                    // heartbeat de Phoenix (Realtime corta a los ~60 s sin latido)
const RECONEXION_MAX_MS = 60_000

const statusDe = (e: unknown) => (e as { status?: number })?.status
const esFatal = (e: unknown) => statusDe(e) === 401 || (statusDe(e) === 403 && !(e as { waf?: boolean })?.waf)
const visible = () => typeof document === 'undefined' || document.visibilityState === 'visible'

export function escucharSala(o: Opciones): Escucha {
  const stats = { recibir: 0, presencia: 0, timbres: 0, vivo: false, modo: 'arranque' }
  let parado = false
  let ultimaV = 0                  // versión más alta que anunció el timbre
  const pendientes = new Set<string>()
  let despertar: (() => void) | null = null
  let corte: AbortController | null = null    // long-poll en vuelo: se corta al ocultarse o al volver el websocket

  const avisar = (motivo: string) => { pendientes.add(motivo); despertar?.() }
  const esperar = (ms: number) => new Promise<Set<string>>((res) => {
    const salir = () => { clearTimeout(fin); despertar = null; const m = new Set(pendientes); pendientes.clear(); res(m) }
    const fin = ms === Infinity ? undefined : setTimeout(() => { pendientes.add('tiempo'); salir() }, ms)
    if (pendientes.size || parado) return salir()
    despertar = salir
  })
  const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms))

  // ── websocket (timbre) ──
  let ws: WebSocket | null = null, latido: ReturnType<typeof setInterval> | undefined, ref = 0, espera = 1000
  const info = o.timbre
  const evento = info?.evento || 'timbre'
  const topic = info ? `realtime:${info.canal}` : ''
  const mandar = (m: object) => { try { ws?.send(JSON.stringify({ ...m, ref: String(++ref) })) } catch { /* reconecta solo */ } }
  function conectar() {
    if (parado || !info?.url || !info.canal || typeof WebSocket === 'undefined') return
    let unido = false
    const sock = new WebSocket(`${info.url}?apikey=${encodeURIComponent(info.apikey)}&vsn=1.0.0`)
    ws = sock
    sock.onopen = () => {
      mandar({ topic, event: 'phx_join', payload: { config: { broadcast: { self: false, ack: false }, presence: { key: '', enabled: false }, private: false } } })
      latido = setInterval(() => mandar({ topic: 'phoenix', event: 'heartbeat', payload: {} }), LATIDO_MS)
    }
    sock.onmessage = (e) => {
      let m: { topic?: string; event?: string; payload?: { status?: string; event?: string; payload?: { id?: number; v?: number } } }
      try { m = JSON.parse(String(e.data)) } catch { return }
      if (m.topic !== topic) return
      if (m.event === 'phx_reply' && m.payload?.status === 'ok' && !unido) {
        unido = true; stats.vivo = true; espera = 1000
        corte?.abort()               // si estaba en long-poll, vuelve al timbre
        avisar('reconectado')        // lo que pasó mientras estaba caído: una /recibir
      } else if (m.event === 'broadcast' && m.payload?.event === evento) {
        stats.timbres++
        const v = Number(m.payload.payload?.v ?? 0)
        if (v > ultimaV) ultimaV = v
        avisar('timbre')
      } else if (m.event === 'phx_error' || m.event === 'phx_close') {
        try { sock.close() } catch { /* nada */ }
      }
    }
    sock.onclose = () => {
      clearInterval(latido)
      if (ws !== sock) return
      const estaba = stats.vivo
      stats.vivo = false; ws = null
      if (parado) return
      if (estaba) avisar('caido')
      setTimeout(conectar, espera)
      espera = Math.min(espera * 2, RECONEXION_MAX_MS)
    }
  }
  conectar()

  const alCambiarVista = () => {
    if (visible()) avisar('visible')
    else { corte?.abort(); avisar('oculto') }
  }
  document.addEventListener('visibilitychange', alCambiarVista)

  // ── llamadas ──
  let ultimaPresencia = 0
  const traer = async (recibir: boolean, presencia: boolean) => {
    const ps: Promise<void>[] = []
    if (recibir) { stats.recibir++; ps.push(o.recibir(0, new AbortController().signal)) }
    if (presencia && Date.now() - ultimaPresencia >= PRESENCIA_MIN_MS) { ultimaPresencia = Date.now(); stats.presencia++; ps.push(o.presencia()) }
    await Promise.all(ps)
  }

  let m0Intentado = false                   // al arrancar, unos segundos para que una el canal antes del long-poll
  ;(async () => {
    let pausa = 1000
    let pedirR = true, pedirP = true          // arranque: ponerse al día después de /historial
    while (!parado) {
      try {
        if (!visible()) {
          stats.modo = 'oculta'
          if (pedirR && o.avisosOcultos() && ultimaV > o.version()) await traer(true, false)
          pedirR = pedirP = false
          const m = await esperar(Infinity)
          if (m.has('visible')) pedirR = pedirP = true
          else if (m.has('timbre') || m.has('reconectado')) pedirR = true
          continue
        }
        if (pedirR || pedirP) { await traer(pedirR, pedirP); pedirR = pedirP = false }
        o.conexion(true); pausa = 1000
        if (stats.vivo) {
          stats.modo = 'timbre'
          const m = await esperar(RESPALDO_MS)
          if (m.has('timbre')) { await dormir(AGRUPAR_MS); pendientes.delete('timbre'); pedirR = ultimaV > o.version(); pedirP = true }
          if (m.has('tiempo') || m.has('reconectado') || m.has('visible')) pedirR = pedirP = true
          continue
        }
        if (o.timbre && !m0Intentado) { m0Intentado = true; if ((await esperar(3000)).has('reconectado')) pedirR = true; continue }
        // Sin timbre: long-poll largo, como antes. Se corta al ocultarse o al unirse el websocket.
        stats.modo = 'long-poll'
        corte = new AbortController()
        stats.recibir++
        try { await o.recibir(LONG_POLL_S, corte.signal) } catch (e) { if (!corte.signal.aborted) throw e }
        corte = null
        pedirP = Date.now() - ultimaPresencia >= 20_000
      } catch (e) {
        corte = null
        if (esFatal(e)) { o.fatal(e); cerrar(); return }
        o.conexion(false)
        await dormir(pausa); pausa = Math.min(pausa * 2, 15000)
        pedirR = pedirP = true
      }
    }
  })()

  function cerrar() {
    parado = true
    document.removeEventListener('visibilitychange', alCambiarVista)
    corte?.abort()
    clearInterval(latido)
    const s = ws; ws = null
    try { s?.close() } catch { /* nada */ }
    despertar?.()
  }
  const e: Escucha = { cerrar, stats }
  if (typeof window !== 'undefined') (window as unknown as { __salaEscucha?: Escucha }).__salaEscucha = e
  return e
}
