import type { VercelRequest, VercelResponse } from '@vercel/node'
import figma from './_figma.js'
import linear from './_linear.js'
import calendar from './_calendar.js'
import gmail from './_gmail.js'
import supabase from './_supabase.js'
import vercel from './_vercel.js'
import atlassian from './_atlassian.js'

const handlers: Record<string, (req: VercelRequest, res: VercelResponse) => unknown> = {
  figma,
  linear,
  calendar,
  gmail,
  supabase,
  vercel,
  atlassian,
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const tool = req.query.tool as string
  const h = handlers[tool]
  if (!h) return res.status(404).json({ error: `Unknown tool: ${tool}` })
  return h(req, res)
}
