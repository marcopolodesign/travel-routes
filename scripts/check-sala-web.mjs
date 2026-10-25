#!/usr/bin/env node
// Control de /sala (QA R1): falla si vuelve alguno de los problemas que encontró la prueba con usuarios simulados.
//   - nombre con HTML / del dueño no entra y el error se ve en la pantalla de entrada
//   - en 375 px "Entrar a la sala" entra sin scroll
//   - "Mandar" envía con clic (canal e hilo) y, en mobile, con el hilo abierto el chat de fondo queda inerte (un solo "Mandar")
//   - un texto que el firewall corta (SQL / ${jndi}) se envía igual (texto_b64) y un mensaje de 500 caracteres con emojis entra
//   - estado de carga: "Entrando…" y "Conectando…" en vez de pantalla en blanco / "0 en la sala"
//   - el indicador dice "<agente> está escribiendo…" (nunca "Leyendo y haciendo los cambios…") y sale en el hilo donde contesta
//
// QA R2 (al final): decisiones sólo para el equipo, /canjear con respaldo b64, un solo aviso en la entrada,
//   hilo correcto (sin saltos de scroll al tocar, con "Cargando respuestas…" y "Responder"), tocar Mandar en el hilo
//   en 375 px con touch, "atrás" cierra el hilo, indicador previo al JS en 3G, "Visto/leyendo/escribiendo" en el hilo, privacidad.
//   Usa una sala de laboratorio propia (lab-r2-*) que borra al terminar. SOLO_R2=1 salta los controles de R1.
//
//   npm run dev:vite -- --port 5199    (en otra terminal)
//   node scripts/check-sala-web.mjs    (WEB_URL, SALA_API, PLAYWRIGHT si hace falta)
// Usa la sala "prueba" del servidor (claves de ~/.sala/claves.json: prueba/Mateo y prueba/Claude de Mateo).
import { createRequire } from 'node:module'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
const req = createRequire(import.meta.url)
let chromium
try { ({ chromium } = req(process.env.PLAYWRIGHT ?? 'playwright')) } catch { ({ chromium } = req('/opt/homebrew/lib/node_modules/playwright')) }

const WEB = process.env.WEB_URL ?? 'http://localhost:5199'
const API = process.env.SALA_API ?? 'https://keevroiskubxjmrtoaur.supabase.co/functions/v1/sala'
const claves = JSON.parse(fs.readFileSync(path.join(os.homedir(), '.sala', 'claves.json'), 'utf8'))
const DUENO = process.env.SALA_DUENO_KEY ?? claves['prueba/Mateo']
const AGENTE = process.env.SALA_AGENTE_KEY ?? claves['prueba/Claude de Mateo']
const SOLO_R2 = !!process.env.SOLO_R2
let fallas = 0
const ok = (c, msg) => { console.log((c ? '✓ ' : '✗ ') + msg); if (!c) fallas++ }
const post = (ruta, cuerpo, clave) => fetch(API + ruta, { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + clave }, body: JSON.stringify(cuerpo) }).then((r) => r.json())

const browser = await chromium.launch()
const sufijo = Date.now().toString().slice(-5)

for (const [etiqueta, vp, movil] of SOLO_R2 ? [] : [['desktop 1280', { width: 1280, height: 800 }, false], ['mobile 375', { width: 375, height: 667 }, true]]) {
  console.log(`\n── ${etiqueta}`)
  const inv = await post('/invitar', { horas: 1, usos: 3 }, DUENO)
  const ctx = await browser.newContext({ viewport: vp, hasTouch: movil, isMobile: movil, locale: 'es-AR' })
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
  await raiz.getByRole('button', { name: 'Responder en hilo' }).click()
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

// ─── QA decisiones: privacidad, idioma (rioplatense / neutro / inglés) y respuesta visible del agente ───
const IDIOMAS = {
  'es-AR': { nombre: 'rioplatense', desc: /^Sala con /, ia: /agentes de IA de Marco Polo que leen y responden/, priv: 'Privacidad', h1: /Privacidad/i, entrar: 'Entrar a la sala',
    reservado: /reservado/, voseo: true, tambien: 'También mandar a la sala', claude: /Conectar mi Claude/, respondeA: 'En respuesta a', mandar: 'Mandar' },
  'es-ES': { nombre: 'neutro', desc: /^Sala con /, ia: /agentes de IA de Marco Polo que leen y responden/, priv: 'Privacidad', h1: /Privacidad/i, entrar: 'Entrar a la sala',
    reservado: /reservado/, voseo: false, tambien: 'También enviar a la sala', claude: /Conectar mi Claude/, respondeA: 'En respuesta a', mandar: 'Enviar' },
  'pt-BR': { nombre: 'inglés', desc: /^Room with /, ia: /Marco Polo AI agents that read and answer/, priv: 'Privacy', h1: /Privacy/i, entrar: 'Join the room',
    reservado: /reserved/, voseo: false, tambien: 'Also send to the room', claude: /Connect my Claude/, respondeA: 'Replying to', mandar: 'Send' },
}
const VOSEO = /\b(Escribile|Mandá|Poné|Pedí|Tocá|Elegí|Probá|Revisá|Pegá|abrí|usás|vos)\b/
const ESPANOL_EN_INGLES = /\b(Escrib|Enviar|Mandar|Sala con|archivos|Entrar|Conectar|Privacidad|respuesta)\b/

for (const [loc, X] of SOLO_R2 ? [] : Object.entries(IDIOMAS)) {
  for (const [etiqueta, vp, movil] of [['desktop 1280', { width: 1280, height: 800 }, false], ['mobile 375', { width: 375, height: 667 }, true]]) {
    console.log(`\n── ${loc} (${X.nombre}) · ${etiqueta}`)
    const inv = await post('/invitar', { horas: 1, usos: 3 }, DUENO)
    const ctx = await browser.newContext({ viewport: vp, hasTouch: movil, isMobile: movil, locale: loc })
    const p = await ctx.newPage()
    await p.goto(`${WEB}/sala/${inv.codigo}`)
    await p.waitForSelector('#sala-nombre')
    const entrada = await p.locator('.ecard').innerText()
    ok(X.desc.test(await p.locator('.ecard .lede').innerText()), `la descripción dice que es una sala grupal ("${(await p.locator('.ecard .lede').innerText()).slice(0, 110)}…")`)
    ok(!/chat directo|direct chat/i.test(entrada), 'ya no dice "chat directo"')
    ok(X.ia.test(entrada), 'aviso visible de agentes de IA en la entrada')
    const caja = await p.locator('button.cta').boundingBox()
    ok(caja && caja.y + caja.height <= vp.height, `CTA a la vista sin scroll (${Math.round(caja?.y + caja?.height)} ≤ ${vp.height})`)
    ok(X.voseo ? true : !VOSEO.test(entrada), 'sin voseo en la entrada' + (X.voseo ? ' (n/a)' : ''))
    if (X.nombre === 'inglés') ok(!ESPANOL_EN_INGLES.test(entrada), 'la entrada no mezcla español')

    // error del servidor traducido
    await p.fill('#sala-nombre', 'Mateo Impostor'); await p.locator('button.cta').click()
    await p.waitForSelector('.fine.err', { timeout: 8000 }).catch(() => {})
    ok(X.reservado.test(await p.locator('.fine.err').innerText().catch(() => '')), `error "nombre reservado" en el idioma de la interfaz ("${await p.locator('.fine.err').innerText().catch(() => '')}")`)
    await p.fill('#sala-nombre', 'x')   // vacío el error con un nombre corto
    // privacidad por el link
    await p.getByRole('link', { name: X.priv }).click()
    await p.waitForURL('**/sala/privacidad')
    const priv = await p.locator('article.priv').innerText()
    ok(X.h1.test(await p.locator('article.priv h1').innerText()), `página /sala/privacidad en ${X.nombre}`)
    ok(/Supabase/.test(priv) && /Anthropic/.test(priv) && /m@marcopolo\.agency/.test(priv), 'dice dónde se guarda (Supabase), que usa modelos de Anthropic y cómo borrar (m@marcopolo.agency)')
    ok(await p.locator('article.priv a[href="mailto:m@marcopolo.agency"]').count() === 1, 'el mail de borrado es un link mailto')
    ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'sin scroll horizontal en privacidad')
    ok(X.voseo ? true : !VOSEO.test(priv), 'sin voseo en privacidad' + (X.voseo ? ' (n/a)' : ''))
    if (X.nombre === 'inglés') ok(!ESPANOL_EN_INGLES.test(priv), 'privacidad no mezcla español')
    await p.evaluate(() => scrollTo(0, document.body.scrollHeight))
    const volver = p.locator('article.priv .fine a')
    ok(await volver.isVisible(), 'el link para volver se ve al final de la página')
    await volver.click()
    await p.waitForSelector('#sala-nombre')
    ok(true, 'volver deja otra vez la pantalla de entrada')
    // directo, sin pasar por la entrada: /sala/privacidad sin login
    const p2 = await ctx.newPage(); await p2.goto(`${WEB}/sala/privacidad`)
    await p2.waitForSelector('article.priv h1', { timeout: 10000 }).catch(() => {})
    ok(await p2.locator('article.priv h1').isVisible(), '/sala/privacidad abre directo, sin login')
    await p2.close()

    // entrar y recorrer el chat
    const nombre = `QA ${loc.replace('-', '')} ${sufijo}${movil ? 'm' : 'd'}`
    await p.fill('#sala-nombre', nombre)
    await p.locator('button.cta').click()
    await p.waitForSelector('main.card textarea', { timeout: 20000 })
    const abrirLateral = async () => { if (movil) { await p.locator('.mtop').getByRole('button', { name: /Sala y archivos|Room and files/ }).click() } }
    const stream = p.locator('main.card .stream')
    const t1 = `consulta ${loc} ${sufijo}${movil ? 'm' : 'd'}`
    await p.locator('main.card textarea').fill(t1)
    await Promise.all([p.waitForResponse((r) => r.url().endsWith('/enviar')), p.locator('main.card').getByRole('button', { name: X.mandar, exact: true }).click()])
    await p.waitForSelector(`main.card .body :text("${t1}")`)
    const ids = (await (await fetch(API + '/historial?n=60', { headers: { authorization: 'Bearer ' + DUENO } })).json()).mensajes
    const tid = ids.find((m) => m.texto === t1)?.id
    ok(!!tid, 'mensaje de prueba enviado desde el front')

    // 2 · respuesta visible: el agente (por API) contesta dos veces en el hilo
    const a1 = `respuesta uno ${loc} ${sufijo}${movil ? 'm' : 'd'}`, a2 = `respuesta dos ${loc} ${sufijo}${movil ? 'm' : 'd'}`
    await post('/enviar', { texto: a1, respuesta_a: tid }, AGENTE)
    await p.waitForSelector(`main.card .body :text("${a1}")`, { timeout: 12000 }).then(() => ok(true, 'la PRIMERA respuesta del agente aparece en el chat principal'), () => ok(false, 'la PRIMERA respuesta del agente aparece en el chat principal'))
    ok(await p.locator('main.card .msg', { hasText: a1 }).locator('.in-thread').innerText().then((x) => x.includes(X.respondeA), () => false), `…con la referencia "${X.respondeA}: <mensaje>"`)
    await post('/enviar', { texto: a2, respuesta_a: tid }, AGENTE)
    const fila = p.locator('main.card .msg', { hasText: t1 }).first().locator('.thread-row')
    await fila.waitFor({ timeout: 12000 })
    await p.waitForFunction((t) => [...document.querySelectorAll('main.card .msg')].some((m) => m.textContent.includes(t) && /^2\s/.test(m.querySelector('.thread-row .cnt')?.textContent ?? '')), t1, { timeout: 12000 }).then(() => ok(true, 'el hilo ya cuenta 2 respuestas (la segunda llegó)'), () => ok(false, 'el hilo ya cuenta 2 respuestas'))
    ok((await stream.locator(`.body :text("${a2}")`).count()) === 0, 'la SEGUNDA respuesta NO sale en el chat principal')
    await fila.click()
    await p.waitForSelector('.tpanel textarea')
    await p.waitForSelector(`.tpanel .body :text("${a2}")`, { timeout: 8000 }).catch(() => {})
    ok((await p.locator(`.tpanel .body :text("${a1}")`).count()) === 1 && (await p.locator(`.tpanel .body :text("${a2}")`).count()) === 1, `en el hilo están las dos respuestas (${await p.locator(`.tpanel .body :text("${a1}")`).count()}/${await p.locator(`.tpanel .body :text("${a2}")`).count()})`)
    const tambien = p.locator('.tpanel label.also')
    ok((await tambien.innerText()).includes(X.tambien) && (await tambien.locator('small').innerText()).length > 10, `"${X.tambien}" lleva una frase corta que explica qué hace ("${await tambien.locator('small').innerText()}")`)
    ok(/hilo|thread/i.test(await p.locator('.tpanel .head').innerText()) && (await p.locator('.tpanel .head .s.inl').count()) === 1, 'el encabezado del hilo explica que es una conversación aparte')
    await p.locator('.tpanel textarea').fill(`vuelta ${sufijo}`)
    await p.locator('.tpanel label.also input').check()
    await Promise.all([p.waitForResponse((r) => r.url().endsWith('/enviar')), p.locator('.tpanel .send').click()])
    await p.waitForSelector(`main.card .body :text("vuelta ${sufijo}")`, { timeout: 8000 }).then(() => ok(true, '"También mandar a la sala" muestra la respuesta en el chat principal'), () => ok(false, '"También mandar a la sala" muestra la respuesta en el chat principal'))
    if (movil) await p.locator('.tpanel .head button').first().click()   // volver
    else await p.locator('.tpanel .head button.hide-m').click()

    // lateral: jerga aclarada
    await abrirLateral()
    const lat = movil ? p.locator('aside.sheet') : p.locator('aside.side').first()
    const btnClaude = lat.getByRole('button', { name: X.claude })
    ok(await btnClaude.isVisible(), `botón del conector con nombre claro ("${await btnClaude.innerText().catch(() => '')}")`)
    ok(((await btnClaude.getAttribute('title')) ?? '').length > 20, 'el botón del conector explica qué hace (tooltip)')
    const cuerpo = await p.locator('body').innerText()
    ok(X.voseo ? true : !VOSEO.test(cuerpo), 'sin voseo en la interfaz del chat' + (X.voseo ? ' (n/a)' : ''))
    if (X.nombre === 'inglés') ok(!/\b(Escribile|Mandar|Sala y archivos|Archivos|Conectado desde|Todavía)\b/.test(cuerpo), 'el chat no mezcla español')
    await ctx.close()
  }
}


// ─── QA R2 ───────────────────────────────────────────────────────────────────────────────────
const SC = process.env.SALA_SCRIPTS ?? path.join(os.homedir(), 'Local', 'sala', 'scripts')
const py = (f, ...a) => execFileSync('python3', [path.join(SC, f), ...a]).toString()
const sql = (q) => py('sql.py', '-e', q)
const LAB = 'lab-r2-' + sufijo
const get = (ruta, clave) => fetch(API + ruta, { headers: { authorization: 'Bearer ' + clave } }).then((r) => r.json())
const dormir = (ms) => new Promise((r) => setTimeout(r, ms))
const L = {
  'es-AR': { responder: 'Responder', cargando: /Cargando respuestas/i, sinResp: /Todavía sin respuestas/, mandarHilo: /Mandar en el hilo/, decision: /Necesita una decisión|Esperando a/i, leyendo: /lo está leyendo/i,
    escribiendo: /está escribiendo/i, visto: /Visto/i, hist: /historial completo/, ret: /mientras la sala esté activa/, arch: /descargarlos/, entradaHist: /ve el historial/, noRed: /conexión/i, pre: /Cargando la sala/ },
  'en-US': { responder: 'Reply', cargando: /Loading replies/i, sinResp: /No replies yet/, mandarHilo: /Send in the thread/, decision: /Needs a decision|Waiting for/i, leyendo: /is reading/i,
    escribiendo: /is typing/i, visto: /Seen/i, hist: /full message history/, ret: /while the room is active/, arch: /can download them/, entradaHist: /see the history/, noRed: /connection/i, pre: /Loading the room/ },
}
const limpiarLab = () => { try { sql(`delete from sala_mensajes where sala='${LAB}'; delete from sala_lecturas where token_hash in (select token_hash from sala_miembros where sala='${LAB}'); delete from sala_claves where token_hash in (select token_hash from sala_miembros where sala='${LAB}'); delete from sala_miembros where sala='${LAB}'; delete from sala_invitaciones where sala='${LAB}'; delete from sala_salas where sala='${LAB}'`) } catch (e) { console.log('(limpieza del laboratorio falló: ' + String(e).slice(0, 120) + ')') } }
sql(`insert into sala_salas (sala, titulo, subtitulo, anfitrion, equipo, creada_por) values ('${LAB}', 'Lab R2', 'QA', 'Mateo', array['Mateo','Alan'], 'Mateo')`)
try {
  const MATEO = JSON.parse(py('alta.py', LAB, 'Mateo', '--persona')).clave
  const ALAN = JSON.parse(py('alta.py', LAB, 'Alan', '--dueno', 'Mateo')).clave
  const nuevoLink = async () => (await post('/invitar', { horas: 1, usos: 20 }, MATEO)).codigo
  const idDe = async (texto) => (await get('/historial?n=200', MATEO)).mensajes.find((m) => m.texto === texto)?.id

  // 0 · cada combinación: idioma × ancho
  for (const [loc, X] of Object.entries(L)) for (const [etiqueta, vp, movil] of [['desktop 1280', { width: 1280, height: 800 }, false], ['mobile 375 touch', { width: 375, height: 667 }, true]]) {
    const tag = `${loc.slice(0, 2)}${movil ? 'm' : 'd'}${Date.now().toString().slice(-4)}`
    console.log(`\n── R2 ${loc} · ${etiqueta}`)
    const nueva = () => browser.newContext({ viewport: vp, hasTouch: movil, isMobile: movil, locale: loc })
    const tocar = async (loc_) => movil ? loc_.tap() : loc_.click()

    // 9 · privacidad + línea de la entrada (375 px: el CTA sigue a la vista)
    {
      const c = await nueva(); const p = await c.newPage()
      await p.goto(`${WEB}/sala/${await nuevoLink()}`); await p.waitForSelector('#sala-nombre')
      ok(X.entradaHist.test(await p.locator('.ecard .fine').innerText()), `entrada: la línea dice que quien entra ve el historial ("${(await p.locator('.ecard .fine').innerText()).slice(0, 80)}")`)
      const cta = await p.locator('button.cta').boundingBox()
      ok(cta && cta.y + cta.height <= vp.height && await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'entrada: CTA a la vista y sin scroll horizontal')
      const pie = await p.locator('.ecard .fine').boundingBox()
      ok(pie && pie.y + pie.height <= vp.height + 120, `entrada: la línea del historial no rompe el layout (termina en ${Math.round(pie?.y + pie?.height)} px)`)

      // 3 · un solo aviso, y se va al editar el nombre
      await p.fill('#sala-nombre', 'Mateo Impostor'); await p.locator('button.cta').click()
      await p.waitForSelector('.fine.err', { timeout: 8000 })
      await p.fill('#sala-nombre', 'Mateo Impostor2')
      ok(await p.locator('.fine.err').count() === 0, 'entrada: el error "nombre reservado" desaparece al editar el nombre')
      await p.fill('#sala-nombre', 'Claude Bot'); 
      ok((await p.locator('.fine.err').count()) + (await p.locator('.fld-hint').count()) <= 1, 'entrada: un solo aviso a la vez (bot)')
      await p.locator('button.seg, .seg button').first().click().catch(() => {})
      await c.close()
    }
    {
      const c = await nueva(); const p = await c.newPage()
      await p.goto(`${WEB}/sala/privacidad`)
      const t = await p.locator('article.priv').innerText()
      ok(X.hist.test(t) && X.ret.test(t) && X.arch.test(t), 'privacidad: historial completo, retención y descarga de adjuntos por el equipo y sus agentes')
      ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'privacidad: sin scroll horizontal')
      await c.close()
    }

    // 2 · nombre que el firewall corta: primero simulado (el reintento b64 entra), después con el firewall cortando todo
    {
      const raro = `Rompe 🔥' OR 1=1 -- ${tag}`
      const c = await nueva(); const p = await c.newPage()
      await p.route('**/functions/v1/sala/canjear', (r) => (r.request().postData() ?? '').includes('"autor":') ? r.abort('failed') : r.continue())
      await p.goto(`${WEB}/sala/${await nuevoLink()}`); await p.waitForSelector('#sala-nombre')
      await p.fill('#sala-nombre', raro); await p.locator('button.cta').click()
      await p.waitForSelector('main.card textarea', { timeout: 20000 }).then(() => ok(true, `entrada con "${raro}": el firewall (simulado) corta el nombre y entra por autor_b64`), () => ok(false, 'entrada con nombre raro por autor_b64'))
      ok(((await p.locator('.me .t').first().textContent().catch(() => '')) || '').includes('Rompe'), 'el nombre raro quedó tal cual en la sala')
      await c.close()
      const c2 = await nueva(); const p2 = await c2.newPage()
      await p2.route('**/functions/v1/sala/canjear', (r) => r.abort('failed'))
      await p2.goto(`${WEB}/sala/${await nuevoLink()}`); await p2.waitForSelector('#sala-nombre')
      await p2.fill('#sala-nombre', raro); await p2.locator('button.cta').click()
      await p2.waitForSelector('.fine.err', { timeout: 15000 })
      const msg = await p2.locator('.fine.err').innerText()
      ok(!X.noRed.test(msg), `si igual falla, el aviso habla del nombre y no de la conexión ("${msg}")`)
      await c2.close()
    }

    // sala: relleno para que el chat tenga scroll, una raíz con respuesta (sin cargar en el historial) y una tarjeta de decisión
    for (let i = 0; i < 9; i++) await post('/enviar', { texto: `relleno ${i} ${tag} — ` + 'texto largo para ocupar alto de pantalla. '.repeat(3) }, ALAN)
    const RAIZ = `raíz ${tag}`
    const r = await post('/enviar', { texto: RAIZ }, ALAN)
    const R1 = `respuesta humana ${tag}`
    await post('/enviar', { texto: R1, respuesta_a: r.id }, MATEO)
    const DEC = `No tengo tu tarifa. ¿Cómo respondo? ${tag}`
    await post('/enviar', { texto: DEC, opciones: ['Paso un rango', 'Lo cotizo yo', 'No cotizar'], pregunta_para: ['Mateo'] }, ALAN)
    await post('/enviar', { texto: `ultimo antes de entrar ${tag}` }, ALAN)
    const rr = await post('/enviar', { texto: RAIZ + ' (hilo)' }, ALAN)
    await post('/enviar', { texto: R1 + ' bis', respuesta_a: rr.id }, MATEO)

    const c = await nueva(); const p = await c.newPage()
    await p.goto(`${WEB}/sala/${await nuevoLink()}`); await p.waitForSelector('#sala-nombre')
    await p.fill('#sala-nombre', `Inv ${tag}`); await p.locator('button.cta').click()
    await p.waitForSelector('main.card textarea', { timeout: 20000 })
    await p.waitForSelector(`main.card .body :text("${RAIZ} (hilo)")`)

    // 1 · las decisiones no llegan al invitado (historial ni long-poll) y sí al equipo
    const DEC2 = `Otra tarjeta en vivo ${tag}`
    await post('/enviar', { texto: DEC2, opciones: ['Sí', 'No'], pregunta_para: ['Mateo'] }, ALAN)
    await post('/enviar', { texto: `señal ${tag}` }, ALAN)
    await p.waitForSelector(`main.card .body :text("señal ${tag}")`)
    const cuerpo = await p.locator('main.card .stream').innerText()
    ok(!cuerpo.includes(DEC) && !cuerpo.includes(DEC2) && !X.decision.test(cuerpo) && (await p.locator('.decide').count()) === 0, 'invitado: NO ve la tarjeta de decisión (ni la del historial ni la que llega en vivo)')
    {
      const ct = await nueva(); const pt = await ct.newPage()
      await pt.goto(`${WEB}/sala#k=${MATEO}`); await pt.waitForSelector('main.card .stream')
      await pt.waitForSelector(`main.card .body :text("${DEC2}")`, { timeout: 15000 }).catch(() => {})
      ok((await pt.locator('.decide').count()) >= 2 && (await pt.locator('main.card .stream').innerText()).includes(DEC2) && X.decision.test(await pt.locator('main.card .stream').innerText()), `equipo (Mateo): SÍ ve las tarjetas de decisión (${await pt.locator('.decide').count()})`)
      await ct.close()
    }

    // 4a · "Responder" con texto en los mensajes de agentes
    const filaAlan = p.locator('main.card .msg', { hasText: `señal ${tag}` }).first()
    ok(await filaAlan.getByRole('button', { name: X.responder, exact: true }).isVisible(), `mensajes de agentes: botón "${X.responder}" con texto, visible sin hover`)

    // 4b · si el usuario subió a leer, el chat no se mueve y aparece "mensajes nuevos ↓"
    await p.locator('main.card .stream').evaluate((e) => { e.scrollTop = 0 })
    await dormir(300)
    const st0 = await p.locator('main.card .stream').evaluate((e) => e.scrollTop)
    await post('/enviar', { texto: `llega leyendo arriba ${tag}` }, ALAN)
    await dormir(2500)
    const st1 = await p.locator('main.card .stream').evaluate((e) => e.scrollTop)
    ok(Math.abs(st1 - st0) < 3, `leyendo arriba, un mensaje nuevo NO mueve el scroll (${Math.round(st0)} → ${Math.round(st1)})`)
    ok(await p.locator('.jump').isVisible(), 'aparece "mensajes nuevos ↓"')
    await p.locator('.jump').click(); await dormir(300)

    // 4c · un mensaje llega justo al tocar "1 respuesta": se abre el hilo tocado, con su respuesta y "Cargando respuestas…" mientras baja
    await p.route('**/functions/v1/sala/hilo*', async (rt) => { await dormir(1500); rt.continue() })
    const fila = p.locator('main.card .msg', { hasText: `${RAIZ} (hilo)` }).first().locator('.thread-row')
    await fila.scrollIntoViewIfNeeded()
    const caja = await fila.boundingBox()
    await p.mouse.move(caja.x + caja.width / 2, caja.y + caja.height / 2)
    await p.mouse.down()
    await post('/enviar', { texto: `intruso mientras tocás ${tag}` }, ALAN)
    await p.waitForSelector(`main.card .body :text("intruso mientras tocás ${tag}")`, { timeout: 10000 })
    await p.mouse.up()
    await p.waitForSelector('.tpanel', { timeout: 5000 }).catch(() => {})
    ok(await p.locator('.tpanel').count() === 1 && (await p.locator('.tpanel .stream').innerText()).includes(`${RAIZ} (hilo)`) && !(await p.locator('.tpanel .stream').innerText()).includes('intruso'), 'tocar "1 respuesta" con un mensaje que llega justo: abre el hilo de ESE mensaje')
    const tsep = await p.locator('.tpanel .tsep').innerText().catch(() => '')
    ok(X.cargando.test(tsep) && !X.sinResp.test(tsep), `mientras baja el hilo dice "${tsep.trim()}" (no "${loc === 'en-US' ? 'No replies yet' : 'Todavía sin respuestas'}")`)
    await p.waitForSelector(`.tpanel .body :text("${R1} bis")`, { timeout: 8000 }).then(() => ok(true, 'el hilo abierto muestra su respuesta'), () => ok(false, 'el hilo abierto muestra su respuesta'))
    await p.unroute('**/functions/v1/sala/hilo*')

    // 5 · Mandar en el hilo: tocar / hacer clic con el botón de verdad, escribiendo con teclado y con fill
    const mandarHilo = p.getByRole('button', { name: X.mandarHilo })
    await p.locator('.tpanel textarea').fill(`desde el hilo (fill) ${tag}`)
    await Promise.all([p.waitForResponse((x) => x.url().endsWith('/enviar')), tocar(mandarHilo)])
    await p.waitForSelector(`.tpanel .body :text("desde el hilo (fill) ${tag}")`, { timeout: 8000 }).then(() => ok(true, `${movil ? 'tap' : 'clic'} en "Mandar en el hilo" (fill) envía`), () => ok(false, 'Mandar en el hilo (fill)'))
    const TXT = `pregunta del invitado ${tag}`
    await p.locator('.tpanel textarea').focus(); await p.keyboard.type(TXT, { delay: 15 })
    await Promise.all([p.waitForResponse((x) => x.url().endsWith('/enviar')), tocar(mandarHilo)])
    await p.waitForSelector(`.tpanel .body :text("${TXT}")`, { timeout: 8000 }).then(() => ok(true, `${movil ? 'tap' : 'clic'} en "Mandar en el hilo" tras escribir con el teclado envía (${etiqueta})`), () => ok(false, 'Mandar en el hilo (teclado)'))

    // 8 · el agente lo procesa: "lo está leyendo…" → "escribiendo…" → "Visto · Alan", todo dentro del hilo
    const idq = await idDe(TXT)
    await post('/entregado', { id: idq }, ALAN)
    await p.waitForSelector('.tpanel .hilo-estado', { timeout: 8000 }).catch(() => {})
    ok(X.leyendo.test(await p.locator('.tpanel .hilo-estado').innerText().catch(() => '')), `en el hilo: "${await p.locator('.tpanel .hilo-estado').innerText().catch(() => '—')}"`)
    await post('/estado', { estado: 'trabajando', segundos: 60 }, ALAN)
    await p.waitForSelector('.tpanel .working:not(.hilo-estado)', { timeout: 8000 }).catch(() => {})
    ok(X.escribiendo.test(await p.locator('.tpanel .working').first().innerText().catch(() => '')) && (await p.locator('main.card .working').count()) === 0, 'en el hilo: "<agente> está escribiendo…" (y no en el canal)')
    await post('/enviar', { texto: `contesto en el hilo ${tag}`, respuesta_a: r.id }, ALAN)
    await post('/listo', { id: idq }, ALAN)
    await p.waitForSelector(`.tpanel .body :text("contesto en el hilo ${tag}")`, { timeout: 8000 }).catch(() => {})
    ok(X.visto.test(await p.locator('.tpanel .rchip.st').first().innerText().catch(() => '')), `en el hilo: "${await p.locator('.tpanel .rchip.st').first().innerText().catch(() => '—')}" bajo el mensaje del invitado`)

    // 6 · atrás del navegador (mobile) cierra el hilo y no saca de la sala
    if (movil) {
      await p.goBack()
      await dormir(600)
      ok(await p.locator('.tpanel').count() === 0 && new URL(p.url()).pathname === '/sala' && await p.locator('main.card textarea').isVisible(), `mobile: "atrás" cierra el hilo y se queda en la sala (${new URL(p.url()).pathname})`)
    }
    await c.close()
  }

  // 7 · carga en 3G lento: el indicador sale antes de que baje el JS
  {
    const c = await browser.newContext({ viewport: { width: 375, height: 667 }, hasTouch: true, isMobile: true, locale: 'es-AR' })
    const p = await c.newPage()
    const cdp = await c.newCDPSession(p)
    await cdp.send('Network.enable')
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 400, downloadThroughput: (400 * 1024) / 8, uploadThroughput: (400 * 1024) / 8 })
    const t0 = Date.now()
    await p.goto(`${WEB}/sala/${await nuevoLink()}`, { waitUntil: 'commit' })
    await p.waitForSelector('#sala-pre', { state: 'visible', timeout: 15000 }).catch(() => {})
    const dt = Date.now() - t0
    ok(await p.locator('#sala-pre').isVisible().catch(() => false) && dt < 3000, `3G lento: el indicador de carga se ve a los ${dt} ms (antes de que baje el JS)`)
    ok(/Cargando la sala/.test(await p.locator('#sala-pre').innerText().catch(() => '')), 'el indicador previo está en el idioma del navegador')
    await c.close()
  }
} finally {
  limpiarLab()
}

await browser.close()
console.log(fallas ? `\n${fallas} falla(s)` : '\nTodo OK')
process.exit(fallas ? 1 : 0)
