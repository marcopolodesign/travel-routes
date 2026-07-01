import express from 'express'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local then .env
config({ path: resolve(process.cwd(), '.env.local') })
config({ path: resolve(process.cwd(), '.env') })

import chatHandler from './chat.js'
import speakHandler from './speak.js'
import paymentRequestHandler from './payment-request.js'
import facturaHandler from './factura.js'
import figmaHandler from './tools/figma.js'
import linearHandler from './tools/linear.js'
import calendarHandler from './tools/calendar.js'
import gmailHandler from './tools/gmail.js'
import supabaseHandler from './tools/supabase.js'
import vercelHandler from './tools/vercel.js'
import atlassianHandler from './tools/atlassian.js'

const app = express()
app.use(express.json())

app.post('/api/chat', (req, res) => chatHandler(req as never, res as never))
app.post('/api/speak', (req, res) => speakHandler(req as never, res as never))
app.post('/api/payment-request', (req, res) => paymentRequestHandler(req as never, res as never))
app.all('/api/factura', (req, res) => facturaHandler(req as never, res as never))
app.all('/api/tools/figma', (req, res) => figmaHandler(req as never, res as never))
app.all('/api/tools/linear', (req, res) => linearHandler(req as never, res as never))
app.all('/api/tools/calendar', (req, res) => calendarHandler(req as never, res as never))
app.all('/api/tools/gmail', (req, res) => gmailHandler(req as never, res as never))
app.all('/api/tools/supabase', (req, res) => supabaseHandler(req as never, res as never))
app.all('/api/tools/vercel', (req, res) => vercelHandler(req as never, res as never))
app.all('/api/tools/atlassian', (req, res) => atlassianHandler(req as never, res as never))

const PORT = 3001
app.listen(PORT, () => console.log(`API dev server running on http://localhost:${PORT}`))
