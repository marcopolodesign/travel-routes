import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'
import forge from 'node-forge'
import https from 'node:https'
import crypto from 'node:crypto'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ── ARCA / AFIP integration ────────────────────────────────────────────────

// AFIP/ARCA servers use weak DH keys — must use legacy SSL cipher level
const afipAgent = new https.Agent({
  ciphers: 'DEFAULT:@SECLEVEL=0',
  secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
})

function afipPost(url: string, body: string, headers: Record<string, string>): Promise<string> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url)
    const reqHeaders: Record<string, string | number> = {
      ...headers,
      'Content-Length': Buffer.byteLength(body, 'utf8'),
    }
    const req = https.request({
      hostname: parsed.hostname,
      port: parseInt(parsed.port || '443', 10),
      path: parsed.pathname + parsed.search,
      method: 'POST',
      headers: reqHeaders,
      agent: afipAgent,
    }, (res) => {
      const chunks: Buffer[] = []
      res.on('data', (chunk: Buffer) => chunks.push(chunk))
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    })
    req.on('error', reject)
    req.write(body, 'utf8')
    req.end()
  })
}

const arcaTokenCache = new Map<string, { token: string; sign: string; expiresAt: number }>()

const WSAA_PROD = 'https://wsaa.afip.gov.ar/ws/services/LoginCms'
const WSAA_TEST = 'https://wsaahomo.afip.gov.ar/ws/services/LoginCms'
const WSFE_PROD = 'https://servicios1.afip.gov.ar/wsfev1/service.asmx'
const WSFE_TEST = 'https://wswhomo.afip.gov.ar/wsfev1/service.asmx'

// Monotributo 2025/2026 category limits (ARS brutos anuales)
const MONOTRIBUTO_CATEGORIAS: Record<string, { limite: number; cuotaMensual: number }> = {
  A: { limite: 2_600_000,  cuotaMensual: 14_500 },
  B: { limite: 3_890_000,  cuotaMensual: 16_270 },
  C: { limite: 5_470_000,  cuotaMensual: 20_560 },
  D: { limite: 6_800_000,  cuotaMensual: 24_730 },
  E: { limite: 8_700_000,  cuotaMensual: 29_850 },
  F: { limite: 11_200_000, cuotaMensual: 38_060 },
  G: { limite: 13_000_000, cuotaMensual: 47_280 },
  H: { limite: 16_200_000, cuotaMensual: 68_860 },
  I: { limite: 18_800_000, cuotaMensual: 73_760 },
  J: { limite: 21_500_000, cuotaMensual: 82_600 },
  K: { limite: 30_000_000, cuotaMensual: 96_460 },
}

function extractXmlTag(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<(?:[\\w-]+:)?${tag}[^>]*>([\\s\\S]*?)</(?:[\\w-]+:)?${tag}>`, 'i'))
  return m ? m[1].trim() : ''
}

function buildTRA(service: string): string {
  const now = Date.now()
  return `<?xml version="1.0" encoding="UTF-8"?>
<loginTicketRequest version="1.0">
  <header>
    <uniqueId>${Math.floor(now / 1000)}</uniqueId>
    <generationTime>${new Date(now - 60000).toISOString()}</generationTime>
    <expirationTime>${new Date(now + 600000).toISOString()}</expirationTime>
  </header>
  <service>${service}</service>
</loginTicketRequest>`
}

function signTRA(traXml: string, certPem: string, keyPem: string): string {
  const cert = forge.pki.certificateFromPem(certPem)
  const privateKey = forge.pki.privateKeyFromPem(keyPem)
  const p7 = forge.pkcs7.createSignedData()
  p7.content = forge.util.createBuffer(traXml, 'utf8')
  p7.addCertificate(cert)
  p7.addSigner({
    key: privateKey,
    certificate: cert,
    digestAlgorithm: forge.pki.oids.sha256,
    authenticatedAttributes: [
      { type: forge.pki.oids.contentType, value: forge.pki.oids.data },
      { type: forge.pki.oids.messageDigest },
      { type: forge.pki.oids.signingTime, value: new Date() },
    ],
  })
  p7.sign()
  const der = forge.asn1.toDer(p7.toAsn1())
  return Buffer.from(der.getBytes(), 'binary').toString('base64')
}

async function getArcaToken(service: string, certPem: string, keyPem: string, production: boolean) {
  const cacheKey = `${service}-${production}-${certPem.slice(-20)}`
  const cached = arcaTokenCache.get(cacheKey)
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached

  const cms = signTRA(buildTRA(service), certPem, keyPem)
  const wsaaUrl = production ? WSAA_PROD : WSAA_TEST

  const soapBody = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsaa="http://wsaa.view.sua.dvadac.desein.afip.gov">
  <soapenv:Body><wsaa:loginCms><wsaa:in0>${cms}</wsaa:in0></wsaa:loginCms></soapenv:Body>
</soapenv:Envelope>`

  const xml = await afipPost(wsaaUrl, soapBody, { 'Content-Type': 'text/xml; charset=utf-8', SOAPAction: '' })
  const innerXml = extractXmlTag(xml, 'loginCmsReturn')
  const token = extractXmlTag(innerXml, 'token')
  const sign = extractXmlTag(innerXml, 'sign')
  const expirationTime = extractXmlTag(innerXml, 'expirationTime')

  const result = { token, sign, expiresAt: new Date(expirationTime).getTime() }
  arcaTokenCache.set(cacheKey, result)
  return result
}

async function wsfeCall(method: string, innerXml: string, token: string, sign: string, cuit: string, production: boolean): Promise<string> {
  const url = production ? WSFE_PROD : WSFE_TEST
  const auth = `<ar:Auth><ar:Token>${token}</ar:Token><ar:Sign>${sign}</ar:Sign><ar:Cuit>${cuit}</ar:Cuit></ar:Auth>`
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ar="http://ar.gov.afip.dif.FEV1/">
  <soapenv:Body><ar:${method}>${auth}${innerXml}</ar:${method}></soapenv:Body>
</soapenv:Envelope>`
  return afipPost(url, body, { 'Content-Type': 'text/xml; charset=utf-8', SOAPAction: `http://ar.gov.afip.dif.FEV1/${method}` })
}

async function runArca(args: Record<string, unknown>): Promise<unknown> {
  const cuit = (args.cuit as string) ?? process.env.ARCA_CUIT ?? '20372179369'
  const year = (args.year as number) ?? new Date().getFullYear()
  const production = process.env.ARCA_ENV !== 'homologacion'

  const certPem = process.env.ARCA_CERT_BASE64
    ? Buffer.from(process.env.ARCA_CERT_BASE64, 'base64').toString('utf8')
    : ''
  const keyPem = process.env.ARCA_KEY_BASE64
    ? Buffer.from(process.env.ARCA_KEY_BASE64, 'base64').toString('utf8')
    : ''

  if (!certPem.includes('CERTIFICATE') || !keyPem.includes('PRIVATE KEY')) {
    return {
      error: 'Certificado ARCA no configurado.',
      instrucciones: 'Subí ARCA_CERT_BASE64 y ARCA_KEY_BASE64 como env vars en Vercel. El certificado se obtiene desde ARCA con clave fiscal.',
      csr_generado: '/Users/mataldao/Local/MarcoPoloTravelRoutes/arca/certs/solicitud.csr',
    }
  }

  const { token, sign } = await getArcaToken('wsfe', certPem, keyPem, production)

  switch (args.action) {
    case 'getStatus': {
      const xml = await afipPost(
        production ? WSFE_PROD : WSFE_TEST,
        `<?xml version="1.0"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ar="http://ar.gov.afip.dif.FEV1/"><soapenv:Body><ar:FEDummy/></soapenv:Body></soapenv:Envelope>`,
        { 'Content-Type': 'text/xml; charset=utf-8', SOAPAction: 'http://ar.gov.afip.dif.FEV1/FEDummy' }
      )
      return {
        appserver: extractXmlTag(xml, 'AppServer'),
        dbserver: extractXmlTag(xml, 'DbServer'),
        authserver: extractXmlTag(xml, 'AuthServer'),
      }
    }

    case 'getMonotributoLimits': {
      return {
        categorias: MONOTRIBUTO_CATEGORIAS,
        nota: 'Límites en ARS. Verificar en arca.gob.ar ya que se actualizan periódicamente.',
        anio: 2025,
      }
    }

    case 'getBillingSummary': {
      // Types: 11=Factura C, 12=Nota Débito C, 13=Nota Crédito C
      const tipos = [
        { tipo: 11, nombre: 'Factura C' },
        { tipo: 12, nombre: 'Nota Débito C' },
        { tipo: 13, nombre: 'Nota Crédito C' },
      ]
      const ptoVta = (args.ptoVta as number) ?? 1
      const results: Array<{ tipo: string; facturas: Array<{ numero: number; fecha: string; total: number; receptor?: string }>; subtotal: number }> = []
      let totalGeneral = 0

      for (const { tipo, nombre } of tipos) {
        const lastXml = await wsfeCall(
          'FECompUltimoAutorizado',
          `<ar:PtoVta>${ptoVta}</ar:PtoVta><ar:CbteTipo>${tipo}</ar:CbteTipo>`,
          token, sign, cuit, production
        )
        const lastNro = parseInt(extractXmlTag(lastXml, 'CbteNro') || '0', 10)
        if (!lastNro) continue

        const facturas: Array<{ numero: number; fecha: string; total: number; receptor?: string }> = []

        // Fetch invoices in parallel batches of 10
        for (let start = 1; start <= lastNro; start += 10) {
          const batch = Array.from({ length: Math.min(10, lastNro - start + 1) }, (_, i) => start + i)
          const xmlResults = await Promise.all(batch.map(nro =>
            wsfeCall(
              'FECompConsultar',
              `<ar:FeCompConsReq><ar:CbteTipo>${tipo}</ar:CbteTipo><ar:PtoVta>${ptoVta}</ar:PtoVta><ar:CbteNro>${nro}</ar:CbteNro></ar:FeCompConsReq>`,
              token, sign, cuit, production
            )
          ))
          for (const [idx, xml] of xmlResults.entries()) {
            const fecha = extractXmlTag(xml, 'CbteFch')
            if (!fecha.startsWith(`${year}`)) continue
            const total = parseFloat(extractXmlTag(xml, 'ImpTotal') || '0')
            const receptor = extractXmlTag(xml, 'DocNro') || undefined
            facturas.push({ numero: batch[idx], fecha, total, receptor })
          }
        }

        const subtotal = facturas.reduce((s, f) => s + f.total, 0)
        if (facturas.length > 0) {
          results.push({ tipo: nombre, facturas, subtotal })
          totalGeneral += subtotal
        }
      }

      const pctPorCategoria = Object.entries(MONOTRIBUTO_CATEGORIAS).map(([cat, { limite }]) => ({
        categoria: cat,
        limite,
        facturado: totalGeneral,
        porcentaje: Math.round((totalGeneral / limite) * 100),
        excede: totalGeneral > limite,
      }))

      return {
        cuit,
        anio: year,
        totalFacturado: totalGeneral,
        detallePorTipo: results,
        limitesPorCategoria: pctPorCategoria,
        nota: 'Solo incluye comprobantes del punto de venta indicado. Verificá si tenés más puntos de venta.',
      }
    }

    case 'getLastInvoices': {
      const limit = (args.limit as number) ?? 10
      const ptoVta = (args.ptoVta as number) ?? 1
      const tipo = (args.tipo as number) ?? 11
      const lastXml = await wsfeCall(
        'FECompUltimoAutorizado',
        `<ar:PtoVta>${ptoVta}</ar:PtoVta><ar:CbteTipo>${tipo}</ar:CbteTipo>`,
        token, sign, cuit, production
      )
      const lastNro = parseInt(extractXmlTag(lastXml, 'CbteNro') || '0', 10)
      if (!lastNro) return { facturas: [], mensaje: 'No hay comprobantes autorizados' }

      const numeros = Array.from({ length: Math.min(limit, lastNro) }, (_, i) => lastNro - i)
      const xmlResults = await Promise.all(numeros.map(nro =>
        wsfeCall(
          'FECompConsultar',
          `<ar:FeCompConsReq><ar:CbteTipo>${tipo}</ar:CbteTipo><ar:PtoVta>${ptoVta}</ar:PtoVta><ar:CbteNro>${nro}</ar:CbteNro></ar:FeCompConsReq>`,
          token, sign, cuit, production
        )
      ))

      const facturas = xmlResults.map((xml, i) => ({
        numero: numeros[i],
        fecha: extractXmlTag(xml, 'CbteFch'),
        total: parseFloat(extractXmlTag(xml, 'ImpTotal') || '0'),
        cae: extractXmlTag(xml, 'CodAutorizacion'),
        receptor: extractXmlTag(xml, 'DocNro') || 'Consumidor Final',
      }))

      return { cuit, facturas, ultimoNumero: lastNro }
    }

    default:
      return { error: `Acción desconocida: ${args.action}. Opciones: getStatus, getBillingSummary, getLastInvoices, getMonotributoLimits` }
  }
}

const SYSTEM = `You are Marco, a voice assistant for Marco Polo Design Studio.
Help Mateo with Figma, Linear, Google Calendar, Gmail, Supabase, Vercel, Jira, and ARCA/AFIP (facturación electrónica Argentina).
Be concise — this is voice, avoid bullet lists. Confirm before destructive actions.
Timezone: America/Argentina/Buenos_Aires.
Default Linear team: Tecnofit (72f2ab1f-8e32-4a5b-83b1-ca8b8f196a35).
Default Supabase project: buntxbgjixlksffbscle (tecnofit).
Default CUIT for ARCA queries: 20372179369 (Mateo Aldao, monotributista).
When asked about billing, invoices, or AFIP/ARCA, use the arca tool. Respond in Spanish for ARCA-related queries.`

// ── inline tool implementations ────────────────────────────────────────────

const FIGMA_BASE = 'https://api.figma.com/v1'
async function runFigma(args: Record<string, string>) {
  const { action, fileKey, nodeId, projectId } = args
  let url: string
  switch (action) {
    case 'getFile': url = `${FIGMA_BASE}/files/${fileKey}`; break
    case 'getNode': url = `${FIGMA_BASE}/files/${fileKey}/nodes?ids=${nodeId}`; break
    case 'getFileComponents': url = `${FIGMA_BASE}/files/${fileKey}/components`; break
    case 'listProjects': url = `${FIGMA_BASE}/projects/${projectId}/files`; break
    default: return { error: `Unknown figma action: ${action}` }
  }
  const r = await fetch(url, { headers: { 'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN! } })
  return r.json()
}

const LINEAR_GQL = 'https://api.linear.app/graphql'
const DEFAULT_LINEAR_TEAM = '72f2ab1f-8e32-4a5b-83b1-ca8b8f196a35'
async function gql(query: string, variables: Record<string, unknown> = {}) {
  const r = await fetch(LINEAR_GQL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: process.env.LINEAR_API_KEY! },
    body: JSON.stringify({ query, variables }),
  })
  return r.json()
}
async function runLinear(args: Record<string, unknown>) {
  const { action, title, description, teamId, issueId, status, priority, projectId } = args as Record<string, string>
  switch (action) {
    case 'listIssues':
      return gql(`query($teamId:String!){issues(filter:{team:{id:{eq:$teamId}}},first:20){nodes{id title state{name} priority assignee{name} createdAt}}}`, { teamId: teamId ?? DEFAULT_LINEAR_TEAM })
    case 'createIssue':
      return gql(`mutation($title:String!,$description:String,$teamId:String!){issueCreate(input:{title:$title,description:$description,teamId:$teamId}){success issue{id title url}}}`, { title, description, teamId: teamId ?? DEFAULT_LINEAR_TEAM })
    case 'updateIssue':
      return gql(`mutation($issueId:String!,$status:String,$priority:Int){issueUpdate(id:$issueId,input:{stateId:$status,priority:$priority}){success issue{id title}}}`, { issueId, status, priority })
    case 'listProjects':
      return gql(`query{projects(first:20){nodes{id name description state}}}`, {})
    case 'getProject':
      return gql(`query($id:String!){project(id:$id){id name description state progress issues{nodes{id title}}}}`, { id: projectId })
    default:
      return { error: `Unknown linear action: ${action}` }
  }
}

async function getGoogleToken() {
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  })
  return (await r.json()).access_token as string
}

async function runCalendar(args: Record<string, string>) {
  const { action, calendarId = 'primary', start, end, summary, description, eventId, timeZone = 'America/Argentina/Buenos_Aires' } = args
  const token = await getGoogleToken()
  const base = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}`
  const auth = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  switch (action) {
    case 'listEvents': {
      const p = new URLSearchParams({ timeMin: start ?? new Date().toISOString(), timeMax: end ?? new Date(Date.now() + 7 * 86400000).toISOString(), singleEvents: 'true', orderBy: 'startTime', maxResults: '20' })
      return (await fetch(`${base}/events?${p}`, { headers: auth })).json()
    }
    case 'createEvent':
      return (await fetch(`${base}/events`, { method: 'POST', headers: auth, body: JSON.stringify({ summary, description, start: { dateTime: start, timeZone }, end: { dateTime: end, timeZone } }) })).json()
    case 'updateEvent':
      return (await fetch(`${base}/events/${eventId}`, { method: 'PATCH', headers: auth, body: JSON.stringify({ ...(summary && { summary }), ...(description && { description }), ...(start && { start: { dateTime: start, timeZone } }), ...(end && { end: { dateTime: end, timeZone } }) }) })).json()
    case 'deleteEvent':
      await fetch(`${base}/events/${eventId}`, { method: 'DELETE', headers: auth })
      return { success: true }
    case 'findFreeTime':
      return (await fetch('https://www.googleapis.com/calendar/v3/freeBusy', { method: 'POST', headers: auth, body: JSON.stringify({ timeMin: start, timeMax: end, timeZone, items: [{ id: calendarId }] }) })).json()
    default:
      return { error: `Unknown calendar action: ${action}` }
  }
}

async function runGmail(args: Record<string, string>) {
  const { action, query, messageId, to, subject, emailBody, draftId } = args
  const token = await getGoogleToken()
  const base = 'https://gmail.googleapis.com/gmail/v1/users/me'
  const auth = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  switch (action) {
    case 'searchMessages':
      return (await fetch(`${base}/messages?${new URLSearchParams({ q: query ?? '', maxResults: '20' })}`, { headers: auth })).json()
    case 'readMessage':
      return (await fetch(`${base}/messages/${messageId}?format=full`, { headers: auth })).json()
    case 'createDraft': {
      const raw = btoa(`To: ${to}\r\nSubject: ${subject}\r\nContent-Type: text/plain\r\n\r\n${emailBody}`).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
      return (await fetch(`${base}/drafts`, { method: 'POST', headers: auth, body: JSON.stringify({ message: { raw } }) })).json()
    }
    case 'sendDraft':
      return (await fetch(`${base}/drafts/send`, { method: 'POST', headers: auth, body: JSON.stringify({ id: draftId }) })).json()
    default:
      return { error: `Unknown gmail action: ${action}` }
  }
}

const SUPABASE_PROJECTS: Record<string, string> = {
  buntxbgjixlksffbscle: 'https://buntxbgjixlksffbscle.supabase.co',
  pxuemdkxdjuwxtupeqoa: 'https://pxuemdkxdjuwxtupeqoa.supabase.co',
  pyiypxvvruwvwfcsprrb: 'https://pyiypxvvruwvwfcsprrb.supabase.co',
  keevroiskubxjmrtoaur: 'https://keevroiskubxjmrtoaur.supabase.co',
}
async function runSupabase(args: Record<string, unknown>) {
  const { action, projectRef = 'buntxbgjixlksffbscle', sql, table, data, filter } = args as Record<string, string>
  const baseUrl = SUPABASE_PROJECTS[projectRef]
  if (!baseUrl) return { error: `Unknown project: ${projectRef}` }
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=representation' }
  switch (action) {
    case 'executeSql':
      return (await fetch(`${baseUrl}/rest/v1/rpc/exec_sql`, { method: 'POST', headers, body: JSON.stringify({ sql }) })).json()
    case 'listTables':
      return (await fetch(`${baseUrl}/rest/v1/?apikey=${key}`, { headers })).json()
    case 'selectRows':
      return (await fetch(`${baseUrl}/rest/v1/${table}?select=*&limit=50${filter ? `&filter=${filter}` : ''}`, { headers })).json()
    case 'insertRow':
      return (await fetch(`${baseUrl}/rest/v1/${table}`, { method: 'POST', headers, body: JSON.stringify(data) })).json()
    default:
      return { error: `Unknown supabase action: ${action}` }
  }
}

const VERCEL_BASE = 'https://api.vercel.com'
const VERCEL_TEAM = 'team_CpX3JXCtUSafj5b4en74AJSG'
async function vFetch(path: string) {
  const sep = path.includes('?') ? '&' : '?'
  return fetch(`${VERCEL_BASE}${path}${sep}teamId=${VERCEL_TEAM}`, {
    headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}`, 'Content-Type': 'application/json' },
  })
}
async function runVercel(args: Record<string, unknown>) {
  const { action, projectId, deploymentId, limit = 20 } = args as Record<string, string>
  switch (action) {
    case 'listProjects': return (await vFetch(`/v9/projects?limit=${limit}`)).json()
    case 'getProject': return (await vFetch(`/v9/projects/${projectId}`)).json()
    case 'listDeployments': return (await vFetch(projectId ? `/v6/deployments?projectId=${projectId}&limit=${limit}` : `/v6/deployments?limit=${limit}`)).json()
    case 'getDeployment': return (await vFetch(`/v13/deployments/${deploymentId}`)).json()
    case 'getRuntimeLogs': return (await vFetch(`/v2/deployments/${deploymentId}/events?limit=100`)).json()
    default: return { error: `Unknown vercel action: ${action}` }
  }
}

const JIRA_DOMAIN = 'biggfit.atlassian.net'
function jiraAuth() {
  return `Basic ${Buffer.from(`${process.env.ATLASSIAN_EMAIL}:${process.env.ATLASSIAN_API_TOKEN}`).toString('base64')}`
}
async function jiraFetch(path: string, opts: RequestInit = {}) {
  return fetch(`https://${JIRA_DOMAIN}/rest/api/3${path}`, {
    ...opts,
    headers: { Authorization: jiraAuth(), 'Content-Type': 'application/json', Accept: 'application/json', ...(opts.headers ?? {}) },
  })
}
async function runAtlassian(args: Record<string, unknown>) {
  const { action, projectKey, issueKey, summary, description, comment, issueType = 'Task', jql } = args as Record<string, string>
  switch (action) {
    case 'getProjects': return (await jiraFetch('/project/search?maxResults=50')).json()
    case 'searchIssues': return (await jiraFetch(`/search?jql=${encodeURIComponent(jql ?? (projectKey ? `project = ${projectKey} ORDER BY updated DESC` : 'ORDER BY updated DESC'))}&maxResults=20&fields=summary,status,assignee,priority,created,updated`)).json()
    case 'getIssue': return (await jiraFetch(`/issue/${issueKey}`)).json()
    case 'createIssue': return (await jiraFetch('/issue', { method: 'POST', body: JSON.stringify({ fields: { project: { key: projectKey }, summary, issuetype: { name: issueType }, ...(description && { description: { type: 'doc', version: 1, content: [{ type: 'paragraph', content: [{ type: 'text', text: description }] }] } }) } }) })).json()
    case 'addComment': return (await jiraFetch(`/issue/${issueKey}/comment`, { method: 'POST', body: JSON.stringify({ body: { type: 'doc', version: 1, content: [{ type: 'paragraph', content: [{ type: 'text', text: comment }] }] } }) })).json()
    default: return { error: `Unknown atlassian action: ${action}` }
  }
}

// ── tool dispatch ──────────────────────────────────────────────────────────

async function dispatchTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'figma': return runFigma(args as Record<string, string>)
    case 'linear': return runLinear(args)
    case 'calendar': return runCalendar(args as Record<string, string>)
    case 'gmail': return runGmail(args as Record<string, string>)
    case 'supabase': return runSupabase(args)
    case 'vercel': return runVercel(args)
    case 'atlassian': return runAtlassian(args)
    case 'arca': return runArca(args)
    default: return { error: `Unknown tool: ${name}` }
  }
}

// ── tool schemas ───────────────────────────────────────────────────────────

const TOOLS: Anthropic.Tool[] = [
  {
    name: 'figma',
    description: 'Interact with Figma files, nodes, and projects',
    input_schema: {
      type: 'object',
      properties: {
        action: { type: 'string', enum: ['getFile', 'getNode', 'getFileComponents', 'listProjects'] },
        fileKey: { type: 'string' },
        nodeId: { type: 'string' },
        projectId: { type: 'string' },
      },
      required: ['action'],
    },
  },
  {
    name: 'linear',
    description: 'Manage Linear issues and projects',
    input_schema: {
      type: 'object',
      properties: {
        action: { type: 'string', enum: ['listIssues', 'createIssue', 'updateIssue', 'listProjects', 'getProject'] },
        title: { type: 'string' },
        description: { type: 'string' },
        teamId: { type: 'string' },
        issueId: { type: 'string' },
        projectId: { type: 'string' },
        status: { type: 'string' },
        priority: { type: 'number' },
      },
      required: ['action'],
    },
  },
  {
    name: 'calendar',
    description: 'Read and manage Google Calendar events',
    input_schema: {
      type: 'object',
      properties: {
        action: { type: 'string', enum: ['listEvents', 'createEvent', 'updateEvent', 'deleteEvent', 'findFreeTime'] },
        calendarId: { type: 'string' },
        start: { type: 'string' },
        end: { type: 'string' },
        summary: { type: 'string' },
        description: { type: 'string' },
        eventId: { type: 'string' },
        timeZone: { type: 'string' },
      },
      required: ['action'],
    },
  },
  {
    name: 'gmail',
    description: 'Search, read, and draft Gmail messages',
    input_schema: {
      type: 'object',
      properties: {
        action: { type: 'string', enum: ['searchMessages', 'readMessage', 'createDraft', 'sendDraft'] },
        query: { type: 'string' },
        messageId: { type: 'string' },
        to: { type: 'string' },
        subject: { type: 'string' },
        emailBody: { type: 'string' },
        draftId: { type: 'string' },
      },
      required: ['action'],
    },
  },
  {
    name: 'supabase',
    description: 'Query and manage Supabase databases',
    input_schema: {
      type: 'object',
      properties: {
        action: { type: 'string', enum: ['executeSql', 'listTables', 'selectRows', 'insertRow'] },
        projectRef: { type: 'string' },
        sql: { type: 'string' },
        table: { type: 'string' },
        data: { type: 'object' },
        filter: { type: 'string' },
      },
      required: ['action'],
    },
  },
  {
    name: 'vercel',
    description: 'Manage Vercel projects and deployments',
    input_schema: {
      type: 'object',
      properties: {
        action: { type: 'string', enum: ['listProjects', 'getProject', 'listDeployments', 'getDeployment', 'getRuntimeLogs'] },
        projectId: { type: 'string' },
        deploymentId: { type: 'string' },
        limit: { type: 'number' },
      },
      required: ['action'],
    },
  },
  {
    name: 'atlassian',
    description: 'Manage Jira issues and projects',
    input_schema: {
      type: 'object',
      properties: {
        action: { type: 'string', enum: ['getProjects', 'searchIssues', 'getIssue', 'createIssue', 'addComment'] },
        projectKey: { type: 'string' },
        issueKey: { type: 'string' },
        summary: { type: 'string' },
        description: { type: 'string' },
        comment: { type: 'string' },
        issueType: { type: 'string' },
        jql: { type: 'string' },
      },
      required: ['action'],
    },
  },
  {
    name: 'arca',
    description: 'Consultar facturación electrónica en ARCA/AFIP Argentina. Permite ver total facturado en el año, últimas facturas emitidas, límites de categoría de Monotributo, y estado de los servidores de ARCA.',
    input_schema: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          enum: ['getStatus', 'getBillingSummary', 'getLastInvoices', 'getMonotributoLimits'],
          description: 'getStatus=estado servidores, getBillingSummary=total facturado en el año, getLastInvoices=últimas N facturas, getMonotributoLimits=tabla de límites por categoría',
        },
        cuit: { type: 'string', description: 'CUIT sin guiones (default: 20372179369)' },
        year: { type: 'number', description: 'Año fiscal a consultar (default: año actual)' },
        ptoVta: { type: 'number', description: 'Punto de venta (default: 1)' },
        tipo: { type: 'number', description: 'Tipo de comprobante: 11=Factura C, 12=Nota Débito C, 13=Nota Crédito C (default: 11)' },
        limit: { type: 'number', description: 'Cantidad de facturas a retornar en getLastInvoices (default: 10)' },
      },
      required: ['action'],
    },
  },
]

// ── handler ────────────────────────────────────────────────────────────────

export interface ToolEvent {
  tool: string
  params: unknown
  result: unknown
  ts: number
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { messages } = req.body ?? {}
  if (!Array.isArray(messages)) return res.status(400).json({ error: 'messages array required' })

  const toolEvents: ToolEvent[] = []

  // Convert incoming messages to Anthropic format
  const anthropicMessages: Anthropic.MessageParam[] = messages.map((m: { role: string; content: string }) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }))

  // Agentic loop
  let currentMessages = [...anthropicMessages]

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM,
      tools: TOOLS,
      messages: currentMessages,
    })

    if (response.stop_reason === 'end_turn') {
      // Extract text reply
      const textBlock = response.content.find(b => b.type === 'text')
      const reply = textBlock && textBlock.type === 'text' ? textBlock.text : ''
      return res.json({ reply, toolEvents })
    }

    if (response.stop_reason === 'tool_use') {
      // Execute all tool calls
      const toolUseBlocks = response.content.filter(b => b.type === 'tool_use')
      const toolResults: Anthropic.ToolResultBlockParam[] = []

      for (const block of toolUseBlocks) {
        if (block.type !== 'tool_use') continue
        const result = await dispatchTool(block.name, block.input as Record<string, unknown>)
        toolEvents.push({ tool: block.name, params: block.input, result, ts: Date.now() })
        toolResults.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content: JSON.stringify(result),
        })
      }

      // Append assistant turn + tool results
      currentMessages = [
        ...currentMessages,
        { role: 'assistant', content: response.content },
        { role: 'user', content: toolResults },
      ]
    } else {
      // Unexpected stop reason — return what we have
      const textBlock = response.content.find(b => b.type === 'text')
      const reply = textBlock && textBlock.type === 'text' ? textBlock.text : ''
      return res.json({ reply, toolEvents })
    }
  }
}
