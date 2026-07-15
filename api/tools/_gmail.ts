import type { VercelRequest, VercelResponse } from '@vercel/node'

async function getAccessToken(): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  })
  const data = await res.json()
  return data.access_token
}

const BASE = 'https://gmail.googleapis.com/gmail/v1/users/me'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const body = req.body ?? {}
  const { action, query, messageId, to, subject, emailBody, draftId } = body

  try {
    const token = await getAccessToken()
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    let result: unknown

    switch (action) {
      case 'searchMessages': {
        const params = new URLSearchParams({ q: query ?? '', maxResults: '20' })
        const r = await fetch(`${BASE}/messages?${params}`, { headers })
        result = await r.json()
        break
      }

      case 'readMessage': {
        const r = await fetch(`${BASE}/messages/${messageId}?format=full`, { headers })
        result = await r.json()
        break
      }

      case 'createDraft': {
        const raw = btoa(
          `To: ${to}\r\nSubject: ${subject}\r\nContent-Type: text/plain\r\n\r\n${emailBody}`
        ).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
        const r = await fetch(`${BASE}/drafts`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ message: { raw } }),
        })
        result = await r.json()
        break
      }

      case 'sendDraft': {
        const r = await fetch(`${BASE}/drafts/send`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ id: draftId }),
        })
        result = await r.json()
        break
      }

      default:
        return res.status(400).json({ error: `Unknown action: ${action}` })
    }

    res.json(result)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}
