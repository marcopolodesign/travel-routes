#!/usr/bin/env node
// Timbre en la sala web (2026-11-24): la web escucha el aviso de Realtime y no pregunta en loop.
// Desde el front (Chromium real, la sala abierta como una persona) mide:
//   1. llamadas a la función `sala` por minuto con la pestaña a la vista y sin actividad   (≤ 2/min)
//   2. latencia: otro miembro escribe por la API → el texto aparece en pantalla          (≤ 3 s cada uno)
//   3. pestaña oculta: 60 s sin actividad + un mensaje ajeno → 0 llamadas; al volver, el mensaje aparece en ≤ 3 s
//   4. websocket cortado: el mensaje llega igual (long-poll) y al volver el websocket la latencia sigue ≤ 3 s
//   5. ancho 390 y 1440 sin desborde horizontal
// Con --antes mide sin exigir nada (para la línea de base del código viejo).
//
//   CHROME_PATH=… node scripts/prueba-timbre-web.mjs <base> <clave que mira> <clave que escribe> [--ancho 390|1440] [--antes] [--carpeta dir]
//   base: https://kontext.marcopolo.agency  ·  https://travels.marcopolo.agency  ·  http://localhost:5173
//   Sólo salas `prueba-…` (las crea y borra quien corre la prueba).
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
// travels no trae playwright: PLAYWRIGHT=<ruta> o el global de Homebrew (como check-sala-web.mjs). Copia de kontext/scripts.
const req = createRequire(import.meta.url)
let chromium
for (const m of [process.env.PLAYWRIGHT, 'playwright-core', 'playwright', '/opt/homebrew/lib/node_modules/playwright', `${process.env.HOME}/Local/kontext/node_modules/playwright-core`].filter(Boolean)) { try { ({ chromium } = req(m)); break } catch { /* siguiente */ } }

const [base, claveVe, claveEscribe] = process.argv.slice(2)
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d }
const ANTES = process.argv.includes('--antes')
const ANCHO = Number(arg('--ancho', 1440))
const CARPETA = arg('--carpeta', null)
const REPOSO_S = Number(arg('--reposo', 60))
const API = process.env.SALA_URL || 'https://keevroiskubxjmrtoaur.supabase.co/functions/v1/sala'
if (!base || !claveVe || !claveEscribe) { console.error('uso: prueba-timbre-web.mjs <base> <clave que mira> <clave que escribe>'); process.exit(2) }

let fallas = 0
const ok = (c, msg) => { console.log((c || ANTES ? (c ? '✓ ' : '· ') : '✗ ') + msg); if (!c && !ANTES) fallas++ }
const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

const yo = await (await fetch(API + '/yo', { headers: { authorization: 'Bearer ' + claveVe } })).json()
if (!String(yo.sala ?? '').startsWith('prueba-')) { console.error(`la clave es de "${yo.sala}": sólo salas prueba-…`); process.exit(2) }

const navegador = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true })
const ctx = await navegador.newContext({ viewport: { width: ANCHO, height: ANCHO < 600 ? 844 : 900 }, deviceScaleFactor: ANCHO < 600 ? 2 : 1 })
const pagina = await ctx.newPage()
const errores = []
pagina.on('pageerror', (e) => errores.push(String(e)))
const llamadas = []
pagina.on('request', (r) => { const u = r.url(); if (u.startsWith(API + '/')) llamadas.push({ t: Date.now(), ruta: new URL(u).pathname.replace(/.*\/sala/, '') }) })

// Websocket del timbre por un pasamanos que se puede cortar (prueba 4).
let cortado = false
const abiertos = new Set()
await pagina.routeWebSocket(/realtime\/v1\/websocket/, (ws) => {
  if (cortado) { ws.close({ code: 1006 }); return }
  const srv = ws.connectToServer()
  abiertos.add(ws)
  ws.onClose(() => abiertos.delete(ws))
  void srv
})

await pagina.goto(`${base}/sala#k=${claveVe}`, { waitUntil: 'domcontentloaded' })
// Kontext: una persona nueva pasa por la antesala (gusto); "Más tarde" la saltea.
for (let i = 0; i < 3 && !(await pagina.$('textarea')); i++) {
  const tarde = pagina.locator('.pi-saltar, .pi-ver')
  if (await tarde.count().catch(() => 0)) await tarde.first().click().catch(() => {})
  await dormir(3000)
}
await pagina.waitForFunction(() => !!document.querySelector('textarea'), null, { timeout: 30000 })
// Kontext: la conversación vive en la pestaña Trabajo (la sala abre en Inicio).
const trabajo = pagina.getByText('Trabajo', { exact: true })
if (await trabajo.count().catch(() => 0)) await trabajo.first().click({ timeout: 5000 }).catch(() => {})
await dormir(8000)   // arranque: /yo, historial, lecturas, primera /recibir y /presencia

const contar = (desde) => llamadas.filter((x) => x.t >= desde)
const resumen = (xs) => Object.entries(xs.reduce((a, x) => ((a[x.ruta] = (a[x.ruta] ?? 0) + 1), a), {})).map(([r, n]) => `${r}×${n}`).join(' ') || 'ninguna'
const estado = () => pagina.evaluate(() => (window).__salaEscucha?.stats ?? null)

async function escribir(texto) {
  const r = await fetch(API + '/enviar', { method: 'POST', headers: { authorization: 'Bearer ' + claveEscribe, 'content-type': 'application/json' }, body: JSON.stringify({ texto }) })
  if (!r.ok) throw new Error('enviar: ' + r.status)
}
async function llega(texto, ms = 30000) {
  const t0 = Date.now()
  await escribir(texto)
  try { await pagina.waitForFunction((t) => document.body.innerText.includes(t), texto, { timeout: ms, polling: 50 }) } catch { return Infinity }
  return Date.now() - t0
}

// 1. reposo a la vista
console.log(`sala ${yo.sala} como ${yo.autor} · ${base} · ${ANCHO}px · timbre ${JSON.stringify(await estado())}`)
let t0 = Date.now()
await dormir(REPOSO_S * 1000)
const reposo = contar(t0)
const porMin = reposo.length / (REPOSO_S / 60)
ok(porMin <= 2, `a la vista, sin actividad: ${porMin.toFixed(1)} llamadas/min (${resumen(reposo)})`)

// 2. latencia
const lat = []
for (let i = 0; i < 5; i++) { lat.push(await llega(`timbre-web ${i} ${Date.now()}`)); await dormir(1500) }
ok(Math.max(...lat) <= 3000, `5 mensajes en vivo: ${lat.map((x) => x === Infinity ? '∞' : x).join(', ')} ms (≤ 3000)`)

// 3. pestaña oculta
await dormir(3000)
await pagina.evaluate(() => {
  Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' })
  Object.defineProperty(document, 'hidden', { configurable: true, get: () => true })
  document.dispatchEvent(new Event('visibilitychange'))
})
t0 = Date.now()
await dormir(REPOSO_S * 1000)
const oculto = contar(t0)
const marcaOculta = `timbre-oculta ${Date.now()}`
const t1 = Date.now()
await escribir(marcaOculta)
await dormir(10000)
const ocultoMsg = contar(t1)
ok(oculto.length === 0 && ocultoMsg.length === 0, `pestaña oculta: ${oculto.length} llamadas en ${REPOSO_S} s y ${ocultoMsg.length} con un mensaje ajeno (${resumen([...oculto, ...ocultoMsg])})`)
const tv = Date.now()
await pagina.evaluate(() => {
  Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'visible' })
  Object.defineProperty(document, 'hidden', { configurable: true, get: () => false })
  document.dispatchEvent(new Event('visibilitychange'))
})
let alVolver = Infinity
try { await pagina.waitForFunction((t) => document.body.innerText.includes(t), marcaOculta, { timeout: 30000, polling: 50 }); alVolver = Date.now() - tv } catch { /* no llegó */ }
ok(alVolver <= 3000, `al volver a la pestaña, el mensaje de mientras estaba oculta aparece en ${alVolver} ms`)

// 4. websocket cortado → long-poll → vuelve
if (!ANTES) {
  cortado = true
  for (const ws of abiertos) await ws.close({ code: 1006 }).catch(() => {})
  await dormir(2000)
  const st = await estado()
  const sinWs = await llega(`timbre-sinws ${Date.now()}`)
  ok(st?.vivo === false && sinWs <= 3000, `websocket cortado (modo ${st?.modo}): el mensaje llega igual en ${sinWs} ms`)
  cortado = false
  let vivo = false
  for (let i = 0; i < 70 && !vivo; i++) { await dormir(1000); vivo = (await estado())?.vivo === true }
  const otra = vivo ? await llega(`timbre-vuelve ${Date.now()}`) : Infinity
  ok(vivo && otra <= 3000, `el websocket vuelve (${vivo ? 'unido' : 'no unió'}) y la latencia sigue en ${otra} ms`)
}

// 5. ancho
const desborde = await pagina.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
ok(desborde <= 1, `sin desborde horizontal a ${ANCHO}px (${desborde})`)
ok(errores.length === 0, `sin errores de página${errores.length ? ': ' + errores.slice(0, 2).join(' | ') : ''}`)
if (CARPETA) { fs.mkdirSync(CARPETA, { recursive: true }); await pagina.screenshot({ path: path.join(CARPETA, `timbre-${new URL(base).hostname}-${ANCHO}.png`) }) }
console.log('estado final', JSON.stringify(await estado()))
await navegador.close()
console.log(fallas ? `✗ ${fallas} fallas` : (ANTES ? 'línea de base medida' : '✓ todo bien'))
process.exit(fallas ? 1 : 0)
