import type { VercelRequest, VercelResponse } from '@vercel/node'

const BASE = 'https://api.vercel.com'
const TEAM = 'team_CpX3JXCtUSafj5b4en74AJSG'

async function vFetch(path: string, opts: RequestInit = {}) {
  const sep = path.includes('?') ? '&' : '?'
  const url = `${BASE}${path}${sep}teamId=${TEAM}`
  return fetch(url, {
    ...opts,
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
      ...(opts.headers ?? {}),
    },
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const body = req.body ?? {}
  const { action, projectId, deploymentId, limit = 20 } = body

  try {
    let result: unknown

    switch (action) {
      case 'listProjects': {
        const r = await vFetch(`/v9/projects?limit=${limit}`)
        result = await r.json()
        break
      }

      case 'getProject': {
        const r = await vFetch(`/v9/projects/${projectId}`)
        result = await r.json()
        break
      }

      case 'listDeployments': {
        const path = projectId
          ? `/v6/deployments?projectId=${projectId}&limit=${limit}`
          : `/v6/deployments?limit=${limit}`
        const r = await vFetch(path)
        result = await r.json()
        break
      }

      case 'getDeployment': {
        const r = await vFetch(`/v13/deployments/${deploymentId}`)
        result = await r.json()
        break
      }

      case 'getRuntimeLogs': {
        const r = await vFetch(`/v2/deployments/${deploymentId}/events?limit=100`)
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
