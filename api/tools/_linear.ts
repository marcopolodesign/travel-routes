import type { VercelRequest, VercelResponse } from '@vercel/node'

const GRAPHQL = 'https://api.linear.app/graphql'
const DEFAULT_TEAM = '72f2ab1f-8e32-4a5b-83b1-ca8b8f196a35'

async function gql(query: string, variables: Record<string, unknown> = {}) {
  const res = await fetch(GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.LINEAR_API_KEY!,
    },
    body: JSON.stringify({ query, variables }),
  })
  return res.json()
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const body = req.body ?? {}
  const { action, title, description, teamId, issueId, status, priority } = body

  try {
    let result: unknown
    switch (action) {
      case 'listIssues':
        result = await gql(`
          query($teamId: String!) {
            issues(filter: { team: { id: { eq: $teamId } } }, first: 20) {
              nodes { id title state { name } priority assignee { name } createdAt }
            }
          }`, { teamId: teamId ?? DEFAULT_TEAM })
        break

      case 'createIssue':
        result = await gql(`
          mutation($title: String!, $description: String, $teamId: String!) {
            issueCreate(input: { title: $title, description: $description, teamId: $teamId }) {
              success issue { id title url }
            }
          }`, { title, description, teamId: teamId ?? DEFAULT_TEAM })
        break

      case 'updateIssue':
        result = await gql(`
          mutation($issueId: String!, $status: String, $priority: Int) {
            issueUpdate(id: $issueId, input: { stateId: $status, priority: $priority }) {
              success issue { id title }
            }
          }`, { issueId, status, priority })
        break

      case 'listProjects':
        result = await gql(`
          query($teamId: String!) {
            projects(filter: { members: { some: { id: {} } } }, first: 20) {
              nodes { id name description state }
            }
          }`, { teamId: teamId ?? DEFAULT_TEAM })
        break

      case 'getProject':
        result = await gql(`
          query($id: String!) {
            project(id: $id) { id name description state progress issues { nodes { id title } } }
          }`, { id: body.projectId })
        break

      default:
        return res.status(400).json({ error: `Unknown action: ${action}` })
    }
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}
