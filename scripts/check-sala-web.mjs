#!/usr/bin/env node
// Control de /sala (QA R1): falla si vuelve alguno de los problemas que encontró la prueba con usuarios simulados.
//   - nombre con HTML / del dueño no entra y el error se ve en la pantalla de entrada
//   - en 375 px "Entrar a la sala" entra sin scroll
//   - "Mandar" envía con clic (canal e hilo) y, en mobile, con el hilo abierto el chat de fondo queda inerte (un solo "Mandar")
//   - un texto que el firewall corta (SQL / ${jndi}) se envía igual (texto_b64) y un mensaje de 500 caracteres con emojis entra
//   - estado de carga: "Entrando…" y "Conectando…" en vez de pantalla en blanco / "0 en la sala"
//   - el indicador dice "<agente> está escribiendo…" (nunca "Leyendo y haciendo los cambios…") y sale en el hilo donde contesta
//
//   npm run dev:vite -- --port 5199    (en otra terminal)
//   node scripts/check-sala-web.mjs    (WEB_URL, SALA_API, PLAYWRIGHT si hace falta)
// Usa la sala "prueba" del servidor (claves de ~/.sala/claves.json: prueba/Mateo y prueba/Claude de Mateo).
import { createRequire } from 'node:module'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
const req = createRequire(import.meta.url)
let chromium
try { ({ chromium } = req(process.env.PLAYWRIGHT ?? 'playwright')) } catch { ({ chromium } = req('/opt/homebrew/lib/node_modules/playwright')) }

const WEB = process.env.WEB_URL ?? 'http://localhost:5199'
const API = process.env.SALA_API ?? 'https://keevroiskubxjmrtoaur.supabase.co/functions/v1/sala'
const claves = JSON.parse(fs.readFileSync(path.join(os.homedir(), '.sala', 'claves.json'), 'utf8'))
const DUENO = process.env.SALA_DUENO_KEY ?? claves['prueba/Mateo']
const AGENTE = process.env.SALA_AGENTE_KEY ?? claves['prueba/Claude de Mateo']
let fallas = 0
const ok = (c, msg) => { console.log((c ? '✓ ' : '✗ ') + msg); if (!c) fallas++ }
const post = (ruta, cuerpo, clave) => fetch(API + ruta, { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + clave }, body: JSON.stringify(cuerpo) }).then((r) => r.json())

const browser = await chromium.launch()
const sufijo = Date.now().toString().slice(-5)

for (const [etiqueta, vp, movil] of [['desktop 1280', { width: 1280, height: 800 }, false], ['mobile 375', { width: 375, height: 667 }, true]]) {
  console.log(`\n── ${etiqueta}`)
  const inv = await post('/invitar', { horas: 1, usos: 3 }, DUENO)
  const ctx = await browser.newContext({ viewport: vp, hasTouch: movil, isMobile: movil })
  const p = await ctx.newPage()
  await p.goto(`${WEB}/sala/${inv.codigo}`)
  await p.waitForSelector('#sala-nombre')

  // 6 · el botón entra sin scroll
  const cta = p.locator('button.cta')
  const caja = await cta.boundingBox()
  ok(caja && caja.y + caja.height <= vp.height, `"Entrar a la sala" a la vista sin scroll (${Math.round(caja?.y + caja?.height)} ≤ ${vp.height})`)

  // 1 · suplantación: el error se ve
  await p.fill('#sala-nombre', '<script>x</script><b>Mateo</b>')
  await cta.click()
  const err1 = p.locator('.fine.err')
  ok(await err1.isVisible() && /< ni >/.test(await err1.innerText()), 'nombre con HTML: error claro en la pantalla de entrada')
  await p.fill('#sala-nombre', 'Mateo Impostor')
  await cta.click()
  await p.waitForSelector('.fine.err:has-text("reservado")', { timeout: 8000 }).catch(() => {})
  ok(/reservado/.test(await p.locator('.fine.err').innerText().catch(() => '')), '"Mateo Impostor": el servidor lo rechaza y la pantalla lo dice')
  const visto = await p.locator('.fine.err').evaluate((e) => { const r = e.getBoundingClientRect(); return r.bottom <= innerHeight })
  ok(visto, 'el mensaje de error queda dentro de la pantalla')

  // 5 · carga: presencia lenta → "Conectando…", nunca "0 en la sala"
  await p.route('**/functions/v1/sala/presencia', async (r) => { await new Promise((x) => setTimeout(x, 2500)); r.continue() })
  await p.route('**/functions/v1/sala/yo', async (r) => { await new Promise((x) => setTimeout(x, 1200)); r.continue() })
  const nombre = `Visitante ${sufijo}${movil ? 'm' : 'd'}`
  await p.fill('#sala-nombre', nombre)
  await cta.click()
  await p.waitForSelector('.ecard.loading', { timeout: 8000 }).then(() => ok(true, 'hay estado de carga ("Entrando a la sala…") entre la entrada y el chat'), () => ok(false, 'hay estado de carga entre la entrada y el chat'))
  await p.waitForSelector('textarea', { timeout: 15000 })
  const cont = await p.locator('main.card .head .s').first().innerText()
  ok(!/^0 en la sala/.test(cont), `sin presencia no se muestra "0 en la sala" (dice "${cont}")`)
  await p.waitForFunction(() => /en la sala/.test(document.querySelector('main.card .head .s')?.textContent ?? ''), null, { timeout: 10000 })
  await p.unroute('**/functions/v1/sala/presencia'); await p.unroute('**/functions/v1/sala/yo')

  // 2 · Mandar con clic en el canal
  const enviar = (txt) => p.waitForResponse((r) => r.url().endsWith('/enviar') && r.request().method() === 'POST')
  const mandarCanal = p.locator('main.card').getByRole('button', { name: 'Mandar', exact: true })
  const t1 = `clic canal ${sufijo}`
  await p.locator('main.card textarea').fill(t1)
  await Promise.all([enviar(), mandarCanal.click()])
  await p.waitForSelector(`main.card .body :text("${t1}")`)
  ok(true, 'Mandar con clic envía en el canal')

  // 4 · 500 caracteres con emojis
  const largo = ('😀🎉 mensaje largo con emojis y texto. '.repeat(13)).slice(0, 500)
  await p.locator('main.card textarea').fill(largo)
  const [r500] = await Promise.all([enviar(), mandarCanal.click()])
  ok(r500.status() === 200 && (await p.locator('main.card textarea').inputValue()) === '', `mensaje de ${largo.length} caracteres con emojis se envía (HTTP ${r500.status()})`)

  // 3 · texto que corta el firewall
  const waf = "' OR 1=1 -- ${jndi:ldap://x/a} " + sufijo
  await p.locator('main.card textarea').fill(waf)
  await mandarCanal.click()
  await p.waitForSelector(`main.card .body :text("jndi")`, { timeout: 10000 }).catch(() => {})
  const rail = await p.locator('main.card .rail').innerText()
  ok(!/Failed to fetch/i.test(rail) && /jndi/.test(await p.locator('main.card').innerText()), `texto de SQL/jndi: se envía por el respaldo y no sale "Failed to fetch" (rail: "${rail}")`)

  // hilo: la raíz es el mensaje del canal
  const raiz = p.locator('main.card .msg', { hasText: t1 }).first()
  if (movil) await raiz.locator('.body').tap(); else await raiz.hover()
  await raiz.getByTitle('Responder en hilo').click()
  await p.waitForSelector('.tpanel textarea')
  const botones = p.getByRole('button', { name: /^Mandar/ })
  ok((await botones.count()) === (movil ? 1 : 2), `${movil ? 'mobile: un solo botón "Mandar" accesible con el hilo abierto' : 'desktop: dos botones, uno por panel'} (hay ${await botones.count()})`)
  if (movil) {
    ok(await p.locator('main.card').getAttribute('inert') !== null, 'mobile: el chat de fondo queda inert con el hilo abierto')
    const tocable = await p.evaluate(() => { const e = document.elementFromPoint(innerWidth / 2, 300); return !!e?.closest('main.card') })
    ok(!tocable, 'mobile: nada del chat de fondo recibe toques')
  }
  const t2 = `clic hilo ${sufijo}`
  await p.locator('.tpanel textarea').fill(t2)
  await Promise.all([enviar(), p.locator('.tpanel').getByRole('button', { name: 'Mandar en el hilo' }).click()])
  await p.waitForSelector(`.tpanel .body :text("${t2}")`)
  ok(true, 'Mandar con clic envía en el hilo')

  // 7 · "escribiendo…" en el hilo donde contesta
  const tid = (await (await fetch(API + '/historial?n=40', { headers: { authorization: 'Bearer ' + DUENO } })).json()).mensajes.find((m) => m.texto === t1)?.id
  await post('/enviar', { texto: '@Claude de Mateo mirá esto', respuesta_a: tid }, DUENO)
  await post('/estado', { estado: 'trabajando', segundos: 60 }, AGENTE)
  await p.waitForSelector('.tpanel .working', { timeout: 10000 }).catch(() => {})
  const txtHilo = await p.locator('.tpanel .working').first().innerText().catch(() => '')
  ok(/está escribiendo…/.test(txtHilo) && !/Leyendo|cambios/i.test(txtHilo), `el indicador en el hilo dice "${txtHilo}"`)
  ok((await p.locator('main.card .working').count()) === 0, 'el canal principal no muestra el indicador cuando contesta en un hilo')
  await post('/enviar', { texto: 'listo' }, AGENTE)   // contestar apaga el estado
  await ctx.close()
}
await browser.close()
console.log(fallas ? `\n${fallas} falla(s)` : '\nTodo OK')
process.exit(fallas ? 1 : 0)
