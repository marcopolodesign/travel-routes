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

for (const [loc, X] of Object.entries(IDIOMAS)) {
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

await browser.close()
console.log(fallas ? `\n${fallas} falla(s)` : '\nTodo OK')
process.exit(fallas ? 1 : 0)
