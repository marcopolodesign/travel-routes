// CLI para operar ARCA sin pasar por el LLM de /api/chat.
// Uso: tsx scripts/arca-cli.ts '<json de args del tool arca>'
import { config } from 'dotenv'
import { resolve } from 'path'
import { readFileSync } from 'fs'

config({ path: resolve(process.cwd(), '.env.local') })
config({ path: resolve(process.cwd(), '.env') })

// Certificados locales (los mismos que en Vercel) si no vienen por env
if (!process.env.ARCA_CERT_BASE64) {
  process.env.ARCA_CERT_BASE64 = readFileSync('arca/certs/certificate.pem').toString('base64')
}
if (!process.env.ARCA_KEY_BASE64) {
  process.env.ARCA_KEY_BASE64 = readFileSync('arca/certs/private.key').toString('base64')
}

const { runArca } = await import('../api/chat.js')
const args = JSON.parse(process.argv[2] ?? '{}')
console.log(JSON.stringify(await runArca(args), null, 2))
