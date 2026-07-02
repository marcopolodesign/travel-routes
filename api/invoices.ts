import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getArcaToken, wsfeCall, extractXmlTag } from './_arca'

export interface Invoice {
  num: string
  ptoVta: number
  nro: number
  date: string      // YYYY-MM-DD
  amount: number
  cae: string
  cuit: string      // receptor DocNro
}

const CUIT = process.env.ARCA_CUIT ?? '20372179369'
const TIPO = 11 // Factura C

// Puntos de venta a consultar
const PTOS_VTA = [2, 3]

// Pad invoice number to 8 digits
function fmtNum(pto: number, nro: number) {
  return `${String(pto).padStart(4, '0')}-${String(nro).padStart(8, '0')}`
}

// Parse YYYYMMDD → YYYY-MM-DD
function parseDate(s: string): string {
  if (!s || s.length !== 8) return ''
  return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' })

  const certPem = process.env.ARCA_CERT_BASE64
    ? Buffer.from(process.env.ARCA_CERT_BASE64, 'base64').toString('utf8') : ''
  const keyPem = process.env.ARCA_KEY_BASE64
    ? Buffer.from(process.env.ARCA_KEY_BASE64, 'base64').toString('utf8') : ''

  if (!certPem.includes('CERTIFICATE') || !keyPem.includes('PRIVATE KEY')) {
    return res.status(500).json({ error: 'ARCA credentials not configured' })
  }

  const production = process.env.ARCA_ENV !== 'homologacion'
  const { token, sign } = await getArcaToken('wsfe', certPem, keyPem, production)

  const year = req.query.year ? String(req.query.year) : String(new Date().getFullYear())
  const fromDate = `${year}0101`

  // For each pto: get last invoice number, then fetch all >= fromDate
  const allInvoices: Invoice[] = []

  await Promise.all(PTOS_VTA.map(async (pto) => {
    const lastXml = await wsfeCall(
      'FECompUltimoAutorizado',
      `<ar:PtoVta>${pto}</ar:PtoVta><ar:CbteTipo>${TIPO}</ar:CbteTipo>`,
      token, sign, CUIT, production
    )
    const lastNro = parseInt(extractXmlTag(lastXml, 'CbteNro') || '0', 10)
    if (!lastNro) return

    // Fetch last 50 per pto (enough to cover a full year), filter by date
    const startNro = Math.max(1, lastNro - 49)
    const nros = Array.from({ length: lastNro - startNro + 1 }, (_, i) => startNro + i)
    const results = await Promise.all(nros.map(nro =>
      wsfeCall(
        'FECompConsultar',
        `<ar:FeCompConsReq><ar:CbteTipo>${TIPO}</ar:CbteTipo><ar:PtoVta>${pto}</ar:PtoVta><ar:CbteNro>${nro}</ar:CbteNro></ar:FeCompConsReq>`,
        token, sign, CUIT, production
      )
    ))

    for (let i = 0; i < results.length; i++) {
      const xml = results[i]
      const fecha = extractXmlTag(xml, 'CbteFch')
      if (fecha < fromDate) continue // skip pre-year invoices
      allInvoices.push({
        num: fmtNum(pto, nros[i]),
        ptoVta: pto,
        nro: nros[i],
        date: parseDate(fecha),
        amount: parseFloat(extractXmlTag(xml, 'ImpTotal') || '0'),
        cae: extractXmlTag(xml, 'CodAutorizacion'),
        cuit: extractXmlTag(xml, 'DocNro') || '',
      })
    }
  }))

  // Sort by date asc, then by pto+nro
  allInvoices.sort((a, b) =>
    a.date !== b.date ? a.date.localeCompare(b.date)
      : a.ptoVta !== b.ptoVta ? a.ptoVta - b.ptoVta
        : a.nro - b.nro
  )

  res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=300')
  return res.json({ invoices: allInvoices, year })
}
