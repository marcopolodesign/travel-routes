#!/usr/bin/env node
// Punta a punta con un agente REAL (sesión de Claude Code): una persona le escribe desde el front y su
// PRIMERA respuesta tiene que verse en el chat principal (no sólo como "1 respuesta" en un hilo).
//   SALA_KEY=<clave de dueño de una sala con el agente ya levantado> node scripts/check-sala-agente-real.mjs [agente=Alan]
//   (levantar/bajar el agente: ~/Local/sala/scripts/agentes-sesiones.py lanzar|detener)
import { createRequire } from 'node:module'
const req = createRequire(import.meta.url)
let chromium
try { ({ chromium } = req(process.env.PLAYWRIGHT ?? 'playwright')) } catch { ({ chromium } = req('/opt/homebrew/lib/node_modules/playwright')) }
const WEB = process.env.WEB_URL ?? 'http://localhost:5199'
const API = process.env.SALA_API ?? 'https://keevroiskubxjmrtoaur.supabase.co/functions/v1/sala'
const KEY = process.env.SALA_KEY, AGENTE = process.argv[2] ?? 'Alan'
if (!KEY) { console.error('falta SALA_KEY'); process.exit(2) }
let fallas = 0
const ok = (c, m) => { console.log((c ? '✓ ' : '✗ ') + m); if (!c) fallas++ }
const browser = await chromium.launch()
for (const [loc, vp, movil] of [['es-AR', { width: 1280, height: 800 }, false], ['pt-BR', { width: 375, height: 667 }, true]]) {
  console.log(`\n── agente real · ${loc} · ${vp.width}px`)
  const inv = await fetch(API + '/invitar', { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + KEY }, body: JSON.stringify({ horas: 1, usos: 2 }) }).then((r) => r.json())
  const ctx = await browser.newContext({ viewport: vp, locale: loc, hasTouch: movil, isMobile: movil })
  const p = await ctx.newPage()
  await p.goto(`${WEB}/sala/${inv.codigo}`)
  await p.fill('#sala-nombre', `Persona ${loc.replace('-', '')} ${Date.now().toString().slice(-4)}`)
  await p.locator('button.cta').click()
  await p.waitForSelector('main.card textarea', { timeout: 20000 })
  const pregunta = `@${AGENTE} contestame en una sola línea: ¿cuánto es 2+2? (${loc})`
  await p.locator('main.card textarea').fill(pregunta)
  await p.keyboard.press('Escape'); await p.locator('main.card textarea').press('Enter')
  const t0 = Date.now()
  const msg = p.locator('main.card .msg', { hasText: pregunta.slice(0, 20) }).first()
  // la respuesta del agente en el CHAT PRINCIPAL: un mensaje suyo con la referencia a lo que le escribieron
  const resp = p.locator(`main.card .stream .msg:has(.in-thread)`, { has: p.locator('.who', { hasText: AGENTE }), hasText: `(${loc})` })
  await resp.first().waitFor({ timeout: 240000 }).then(() => ok(true, `la respuesta REAL de ${AGENTE} apareció en el chat principal a los ${Math.round((Date.now() - t0) / 1000)} s`), () => ok(false, `la respuesta de ${AGENTE} apareció en el chat principal`))
  console.log('   texto:', (await resp.first().locator('.body').innerText().catch(() => '')).slice(0, 160).replace(/\n/g, ' '))
  console.log('   referencia:', await resp.first().locator('.in-thread').innerText().catch(() => ''))
  ok(await p.locator('main.card .thread-row').count() >= 1, 'y la raíz sigue mostrando el hilo ("N respuestas")')
  await p.screenshot({ path: `/tmp/real-${loc}.png` })
  await ctx.close()
}
await browser.close()
process.exit(fallas ? 1 : 0)
