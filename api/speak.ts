import type { VercelRequest, VercelResponse } from '@vercel/node'

const DEFAULT_VOICE = '21m00Tcm4TlvDq8ikWAM' // Rachel

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { text, voiceId = DEFAULT_VOICE } = req.body ?? {}
  if (!text) return res.status(400).json({ error: 'text required' })

  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': process.env.ELEVENLABS_API_KEY!,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  })

  if (!r.ok) {
    const err = await r.text()
    return res.status(r.status).json({ error: err })
  }

  const audioBuffer = await r.arrayBuffer()
  res.setHeader('Content-Type', 'audio/mpeg')
  res.setHeader('Cache-Control', 'no-store')
  res.send(Buffer.from(audioBuffer))
}
