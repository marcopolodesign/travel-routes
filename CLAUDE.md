# Marco Polo — Project Context for Claude

## Payment Request PDF Generator

**Endpoint:** `POST /api/payment-request`  
**File:** `api/payment-request.tsx`

Generates a 3-page branded PDF payment request (matching the Marco Polo agency style) and returns it as a file download.

### How to generate a payment request

Call the endpoint with this JSON body:

```json
{
  "client": "NINJO",
  "amount": 4600,
  "month": "MAR",
  "services": "PLATFORM UX UI / BRANDING / DEVELOPMENT",
  "items": {
    "PLATFORM UX/UI": [
      "New platform flow",
      "New Follow Ups Flow",
      "New Creator Page",
      "Mobile App iteration"
    ],
    "COMMS": [
      "Sales Landing page iteration",
      "Beta page creation",
      "Video kickoff"
    ]
  }
}
```

**Required fields:** `client`, `amount`, `month`  
**Optional fields:**
- `date` — defaults to today formatted as `D | M | YYYY`
- `services` — cover page subtitle line, defaults to `PLATFORM UX UI / BRANDING / DEVELOPMENT`
- `items` — object where each key is a section heading and the value is an array of deliverable strings. Omit entirely if no breakdown needed.

**Amount formatting:** Pass a plain number (e.g. `4600`) and it will be formatted with a period as thousands separator (`4.600`) in the European/Argentine style, matching the original invoices.

### PDF structure

- **Page 1 — Cover:** Big red "PAYMENT REQUEST" heading, services description, total amount in a bordered box.
- **Page 2 — Overview:** Month overview with sections and their deliverable items.
- **Page 3 — Bank Details:** Hardcoded USD wire transfer details for Mateo Aldao Suaya (never changes).

### Fonts used

Fonts live in `api/fonts/` and are registered at module load time:

| Font | Usage |
|------|-------|
| `Thunder-BoldLC.ttf` | All display headings (PAYMENT REQUEST, TOTAL, BANK DETAILS, section titles) |
| `GT-Pressura-Mono-Regular.otf` | Header metadata, bank detail labels/values, footer contact info |
| `GT-Pressura-Mono-Light.otf` | Registered as weight 300, available if needed |
| `GT-America-Regular.otf` | Section items (deliverables list), logo mark |
| `GTAmericaBold-Regular.otf` | "USD account details." subtitle |

### Dev usage

Start the dev API server:
```
npm run dev:api
```

Then POST to `http://localhost:3001/api/payment-request` with the JSON body above. The response is a PDF binary — save it or open it directly.

Quick curl example:
```bash
curl -X POST http://localhost:3001/api/payment-request \
  -H "Content-Type: application/json" \
  -d '{
    "client": "NINJO",
    "amount": 4600,
    "month": "MAR",
    "items": {
      "PLATFORM UX/UI": ["New platform flow", "Mobile App iteration"],
      "COMMS": ["Sales Landing page", "Video kickoff"]
    }
  }' \
  --output payment-request.pdf
```

### Adding new sections or fields

To add a new section to the overview page, just add a new key to the `items` object. The section heading will be rendered in Thunder BoldLC (large black) and items in GT America (salmon/pink).

To add a new page type or modify the bank details, edit `api/payment-request.tsx` — the layout is built with `@react-pdf/renderer` JSX components.

---

## Verificación en browser (obligatorio)

Después de implementar cualquier cambio en un proyecto web o de UI, SIEMPRE verificar el resultado en el browser antes de reportar la tarea como completada. Usar el skill `/verify` o abrir el browser manualmente. No reportar "listo" sin haber visto el resultado funcionando.


## Actualizar AMBOS timelines (obligatorio)

Después de cada tarea completada, antes de reportar al usuario, actualizar:

1. **Timeline del proyecto** — mover el item a "Completado", actualizar "Ahora (en curso)" y "Próximo".
2. **Timeline global** — `~/Local/timeline.md` — actualizar la fila del proyecto en la tabla resumen + el bloque Estado/Próximo paso del proyecto.

No preguntar. No saltear aunque la tarea sea pequeña. El timeline global es la fuente de verdad que Alan usa para saber en qué está cada proyecto y qué sigue.
---

## Contexto global (`hq`) — leer al empezar

Las reglas de trabajo de Mateo (respuestas cortas, autonomía, Task Brief, entregables HTML,
Planner Sync, cara-al-cliente), el timeline de todos los proyectos y el sistema de marca
Marco Polo viven en un repo aparte: `github.com/marcopolodesign/hq`.

**En la MacBook** ya están en `~/Local/` — no hay que hacer nada.

**En un cloud agent**, al empezar la sesión:

```bash
gh repo clone marcopolodesign/hq /tmp/hq 2>/dev/null || git -C /tmp/hq pull -q
```

Y leer de ahí `CLAUDE.md`, `CLAUDE-global.md`, `timeline.md` y `repos.md`.

Para consultar otro proyecto ("mirá cómo lo hicimos en Ninjo"):

```bash
/tmp/hq/scripts/ref.sh <alias>     # → /tmp/ref/<alias>, sólo lectura
```

En cloud **no hay Chrome ni simulador de iOS**: la verificación se hace con Playwright
headless contra la preview de Vercel, y para móvil con `eas build` + `eas submit`.
Al terminar, commitear también `catchup.md` / `timeline.md` en `hq`.
