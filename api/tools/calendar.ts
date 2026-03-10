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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const body = req.body ?? {}
  const {
    action,
    calendarId = 'primary',
    start,
    end,
    summary,
    description,
    eventId,
    timeZone = 'America/Argentina/Buenos_Aires',
  } = body

  try {
    const token = await getAccessToken()
    const base = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}`
    let result: unknown

    switch (action) {
      case 'listEvents': {
        const params = new URLSearchParams({
          timeMin: start ?? new Date().toISOString(),
          timeMax: end ?? new Date(Date.now() + 7 * 86400000).toISOString(),
          singleEvents: 'true',
          orderBy: 'startTime',
          maxResults: '20',
        })
        const r = await fetch(`${base}/events?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        result = await r.json()
        break
      }

      case 'createEvent': {
        const r = await fetch(`${base}/events`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            summary,
            description,
            start: { dateTime: start, timeZone },
            end: { dateTime: end, timeZone },
          }),
        })
        result = await r.json()
        break
      }

      case 'updateEvent': {
        const r = await fetch(`${base}/events/${eventId}`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...(summary && { summary }),
            ...(description && { description }),
            ...(start && { start: { dateTime: start, timeZone } }),
            ...(end && { end: { dateTime: end, timeZone } }),
          }),
        })
        result = await r.json()
        break
      }

      case 'deleteEvent': {
        await fetch(`${base}/events/${eventId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        })
        result = { success: true }
        break
      }

      case 'findFreeTime': {
        const r = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timeMin: start,
            timeMax: end,
            timeZone,
            items: [{ id: calendarId }],
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
