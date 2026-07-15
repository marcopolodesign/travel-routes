import type { VercelRequest, VercelResponse } from '@vercel/node'

const BASE = 'https://api.figma.com/v1'
const token = () => process.env.FIGMA_ACCESS_TOKEN!

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { action, fileKey, nodeId, projectId } = req.body ?? req.query

  try {
    let url: string
    switch (action) {
      case 'getFile':
        url = `${BASE}/files/${fileKey}`
        break
      case 'getNode':
        url = `${BASE}/files/${fileKey}/nodes?ids=${nodeId}`
        break
      case 'getFileComponents':
        url = `${BASE}/files/${fileKey}/components`
        break
      case 'listProjects':
        url = `${BASE}/projects/${projectId}/files`
        break
      default:
        return res.status(400).json({ error: `Unknown action: ${action}` })
    }

    const response = await fetch(url, {
      headers: { 'X-Figma-Token': token() },
    })
    const data = await response.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}
