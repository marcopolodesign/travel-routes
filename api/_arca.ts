import forge from 'node-forge'
import https from 'node:https'
import crypto from 'node:crypto'

// AFIP uses weak DH keys — must use legacy SSL
const afipAgent = new https.Agent({
  ciphers: 'DEFAULT:@SECLEVEL=0',
  secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
})

export function afipPost(url: string, body: string, headers: Record<string, string>): Promise<string> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url)
    const req = https.request({
      hostname: parsed.hostname,
      port: parseInt(parsed.port || '443', 10),
      path: parsed.pathname + parsed.search,
      method: 'POST',
      headers: { ...headers, 'Content-Length': Buffer.byteLength(body, 'utf8') },
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

export function extractXmlTag(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<(?:[\\w-]+:)?${tag}[^>]*>([\\s\\S]*?)</(?:[\\w-]+:)?${tag}>`, 'i'))
  return m ? m[1].trim() : ''
}

export const WSAA_PROD = 'https://wsaa.afip.gov.ar/ws/services/LoginCms'
export const WSAA_TEST = 'https://wsaahomo.afip.gov.ar/ws/services/LoginCms'
export const WSFE_PROD = 'https://servicios1.afip.gov.ar/wsfev1/service.asmx'
export const WSFE_TEST = 'https://wswhomo.afip.gov.ar/wsfev1/service.asmx'

const tokenCache = new Map<string, { token: string; sign: string; expiresAt: number }>()

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

export async function getArcaToken(service: string, certPem: string, keyPem: string, production: boolean) {
  const cacheKey = `${service}-${production}-${certPem.slice(-20)}`
  const cached = tokenCache.get(cacheKey)
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached

  const cms = signTRA(buildTRA(service), certPem, keyPem)
  const xml = await afipPost(
    production ? WSAA_PROD : WSAA_TEST,
    `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsaa="http://wsaa.view.sua.dvadac.desein.afip.gov">
  <soapenv:Body><wsaa:loginCms><wsaa:in0>${cms}</wsaa:in0></wsaa:loginCms></soapenv:Body>
</soapenv:Envelope>`,
    { 'Content-Type': 'text/xml; charset=utf-8', SOAPAction: '' }
  )
  const inner = extractXmlTag(xml, 'loginCmsReturn')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
  const result = {
    token: extractXmlTag(inner, 'token'),
    sign: extractXmlTag(inner, 'sign'),
    expiresAt: new Date(extractXmlTag(inner, 'expirationTime')).getTime(),
  }
  tokenCache.set(cacheKey, result)
  return result
}

export async function wsfeCall(
  method: string, innerXml: string,
  token: string, sign: string, cuit: string, production: boolean
): Promise<string> {
  const url = production ? WSFE_PROD : WSFE_TEST
  const auth = `<ar:Auth><ar:Token>${token}</ar:Token><ar:Sign>${sign}</ar:Sign><ar:Cuit>${cuit}</ar:Cuit></ar:Auth>`
  return afipPost(
    url,
    `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ar="http://ar.gov.afip.dif.FEV1/">
  <soapenv:Body><ar:${method}>${auth}${innerXml}</ar:${method}></soapenv:Body>
</soapenv:Envelope>`,
    { 'Content-Type': 'text/xml; charset=utf-8', SOAPAction: `http://ar.gov.afip.dif.FEV1/${method}` }
  )
}
