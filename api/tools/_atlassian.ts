import type { VercelRequest, VercelResponse } from '@vercel/node'

const DOMAIN = 'biggfit.atlassian.net'
const CLOUD_ID = '3aa70f0e-712b-4d6b-af4d-9a16b118ce59'

function authHeader() {
  const creds = Buffer.from(
    `${process.env.ATLASSIAN_EMAIL}:${process.env.ATLASSIAN_API_TOKEN}`
  ).toString('base64')
  return `Basic ${creds}`
}

async function jiraFetch(path: string, opts: RequestInit = {}) {
  return fetch(`https://${DOMAIN}/rest/api/3${path}`, {
    ...opts,
    headers: {
      Authorization: authHeader(),
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(opts.headers ?? {}),
    },
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const body = req.body ?? {}
  const { action, projectKey, issueKey, summary, description, comment, issueType = 'Task' } = body

  try {
    let result: unknown

    switch (action) {
      case 'getProjects': {
        const r = await jiraFetch('/project/search?maxResults=50')
        result = await r.json()
        break
      }

      case 'searchIssues': {
        const jql = body.jql ?? (projectKey ? `project = ${projectKey} ORDER BY updated DESC` : 'ORDER BY updated DESC')
        const r = await jiraFetch(`/search?jql=${encodeURIComponent(jql)}&maxResults=20&fields=summary,status,assignee,priority,created,updated`)
        result = await r.json()
        break
      }

      case 'getIssue': {
        const r = await jiraFetch(`/issue/${issueKey}`)
        result = await r.json()
        break
      }

      case 'createIssue': {
        const r = await jiraFetch('/issue', {
          method: 'POST',
          body: JSON.stringify({
            fields: {
              project: { key: projectKey },
              summary,
              description: description
                ? { type: 'doc', version: 1, content: [{ type: 'paragraph', content: [{ type: 'text', text: description }] }] }
                : undefined,
              issuetype: { name: issueType },
            },
          }),
        })
        result = await r.json()
        break
      }

      case 'updateIssue': {
        const r = await jiraFetch(`/issue/${issueKey}`, {
          method: 'PUT',
          body: JSON.stringify({
            fields: {
              ...(summary && { summary }),
              ...(description && {
                description: { type: 'doc', version: 1, content: [{ type: 'paragraph', content: [{ type: 'text', text: description }] }] },
              }),
            },
          }),
        })
        result = r.status === 204 ? { success: true } : await r.json()
        break
      }

      case 'addComment': {
        const r = await jiraFetch(`/issue/${issueKey}/comment`, {
          method: 'POST',
          body: JSON.stringify({
            body: { type: 'doc', version: 1, content: [{ type: 'paragraph', content: [{ type: 'text', text: comment }] }] },
          }),
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
