import type { VercelRequest, VercelResponse } from '@vercel/node'

const PROJECTS: Record<string, string> = {
  buntxbgjixlksffbscle: 'https://buntxbgjixlksffbscle.supabase.co',
  pxuemdkxdjuwxtupeqoa: 'https://pxuemdkxdjuwxtupeqoa.supabase.co',
  pyiypxvvruwvwfcsprrb: 'https://pyiypxvvruwvwfcsprrb.supabase.co',
  keevroiskubxjmrtoaur: 'https://keevroiskubxjmrtoaur.supabase.co',
}
const DEFAULT_PROJECT = 'buntxbgjixlksffbscle'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const body = req.body ?? {}
  const { action, projectRef, sql, table, data, filter } = body

  const ref = projectRef ?? DEFAULT_PROJECT
  const baseUrl = PROJECTS[ref]
  if (!baseUrl) return res.status(400).json({ error: `Unknown project ref: ${ref}` })

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const headers = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  }

  try {
    let result: unknown

    switch (action) {
      case 'executeSql': {
        const r = await fetch(`${baseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ sql }),
        })
        // Fallback: use pg REST proxy if exec_sql RPC not available
        if (!r.ok) {
          return res.status(r.status).json({ error: 'SQL execution failed', detail: await r.text() })
        }
        result = await r.json()
        break
      }

      case 'listTables': {
        const r = await fetch(
          `${baseUrl}/rest/v1/?apikey=${serviceKey}`,
          { headers }
        )
        result = await r.json()
        break
      }

      case 'selectRows': {
        const params = new URLSearchParams({ select: '*', limit: '50' })
        if (filter) params.set('filter', filter)
        const r = await fetch(`${baseUrl}/rest/v1/${table}?${params}`, { headers })
        result = await r.json()
        break
      }

      case 'insertRow': {
        const r = await fetch(`${baseUrl}/rest/v1/${table}`, {
          method: 'POST',
          headers,
          body: JSON.stringify(data),
        })
        result = await r.json()
        break
      }

      case 'updateRow': {
        const { match, ...updateData } = data
        const params = new URLSearchParams()
        if (match) params.set(Object.keys(match)[0], `eq.${Object.values(match)[0]}`)
        const r = await fetch(`${baseUrl}/rest/v1/${table}?${params}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(updateData),
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
