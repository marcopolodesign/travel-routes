# Marco Polo — Catchup

## 2026-07-22 — TecnoFit TVs budget: restructuración completa (Fitness 2.0/Lista de espera/TVs/Admin) ✅
**Source:** Claude Code — Macbook Pro

### Qué se hizo
Mateo dio un brief detallado (texto) con 3 objetivos estratégicos (bajar churn, KPIs de staff,
franquiciar) y pidió reorganizar toda la página `src/pages/TecnoFitTVs.tsx` alrededor de ellos:

- Nueva `BoxedListSection` "Objetivos" arriba de todo, con los 3 objetivos estratégicos
- "Visión general" reescrita: control total en tiempo real para el dueño (no solo socios, también
  KPIs de coaches/recepción) + nuevo módulo de entrenamiento con variabilidad real (AMRAP/EMOM)
- Reestructurado en 4 pilares de "Stack de tecnología a crear":
  - **Fitness 2.0 — CMS de rutinas**: absorbe "personalización total del entrenamiento" y "edición
    de rutina desde la app" (secciones viejas eliminadas), suma optimización de video (compresión +
    resoluciones múltiples) y visualización en tiempo real de socios por línea
  - **Lista de espera**: reframeada con el ángulo franquicia (sin hardware, replicable) + control de
    acceso para que el staff detecte baja asistencia
  - **TVs**: nueva sección — links dinámicos por línea/box/sede para adopción rápida en franquicias
  - **Administrador — métricas de negocio**: contenido de la sesión anterior, sin cambios de fondo,
    solo retitulado y sin el cierre "scope nuevo, ver nota en Inversión" (ya no se trata como scope
    agregado, es parte del stack central)
- **Eliminada** la sección "Preguntas abiertas" (Mateo: "no va")
- **Reemplazado** el diagrama Mermaid técnico (con nombres de tablas `access_logs`, `pg_cron`, etc.)
  por una sección narrativa "Así se vive puertas adentro": 5 pasos contados desde el punto de vista
  de una socia (Sofía), sin jerga técnica, incluyendo el "motor" de riesgo de abandono como parte de
  la historia — pensado para que lo entienda el dueño del gym, no un desarrollador
- Inversión: agregada "Forma de pago — 4 cuotas de U$5.000"; sacada la nota de "scope agregado sin
  pricear" (ya no aplica con la nueva estructura, todo es una sola propuesta coherente)
- Verificado en browser (dev server) antes de deployar — layout, numeración de la historia y caja de
  Inversión revisados visualmente
- Commit `7e35d73`, push a `main` → deploy automático en Vercel

### Pendiente / próximo paso
Ninguno explícito — Mateo puede querer ajustar el Timeline (semanas) para reflejar los 4 pilares
nuevos (Administrador/métricas no tiene sprint asignado todavía), pero no lo pidió así que quedó
como estaba.

---

## 2026-07-22 — TecnoFit TVs budget ampliado: personalización total + métricas de negocio ✅
**Source:** Claude Code — Macbook Pro

### Qué se hizo
- Mateo dictó un brief por voz (Claude app voice mode) con scope nuevo para la propuesta de
  Fitness Central/TecnoFit: personalización total del entrenamiento (coach arma plan 1:1, EMOM/AMRAP)
  y capa de métricas de negocio para franquicias (conversión por recepción/coach, retención, churn)
- `src/pages/TecnoFitTVs.tsx`:
  - Nueva sección "Personalización total del entrenamiento"
  - Nueva sección "Capa de métricas de negocio"
  - Nueva `BoxedListSection` "Preguntas abiertas" (scope adentro o afuera del rango cotizado, timeline, benchmarks de churn)
  - Nota de Inversión actualizada para incluir ambas como scope agregado sin pricear
  - Copy de portada actualizado para reflejar el scope ampliado
- Verificado en browser (dev server localhost:5173) — secciones renderizan con el mismo estilo que el resto de la página
- Commit `8d53cbb`, push a `main` → deploy automático en Vercel

### Pendiente / próximo paso
Definir con el cliente si personalización total + métricas de negocio entran en el rango
U$20.000–25.000 ya cotizado o son fase aparte — las 3 preguntas abiertas quedan documentadas en la página.

---

## 2026-07-20 — Factura C 0003-00000004 BIGG (HEKTOR S.R.L.) $329.696,36 ✅
**Source:** Claude Code — Macbook Pro

### Qué se hizo
- Emitida Factura C vía WSFEv1 (API `travels.marcopolo.agency/api/chat` → `createInvoice`):
  - Número: 0003-00000004 · Pto. Vta. 3
  - Receptor: HEKTOR S.R.L. (BIGG) · CUIT 30-71401537-7
  - Importe: $329.696,36 · Concepto: Servicios (período jun 2026)
  - Descripción: Servicios de desarrollo — BIGG
  - CAE: 86294652692056 · Vencimiento: 30/07/2026
- PDF descargado en `~/Downloads/Factura C 0003-00000004 - BIGG (HEKTOR SRL) - $329.696,36.pdf` y verificado (receptor, importe y CAE correctos)
- `arca/monotributo-2026.md` actualizado: agregadas 0003-2 ($3.562.500 MOSERINI), 0003-3 ($1.000 CF) y 0003-4 que faltaban en la tabla; totales y sección "Situación" recalculados

### Total acumulado 2026
$12.722.074,60 (13 facturas) → superado límite Cat A ($10.277.988); quedan $2.336.373 para agotar Cat B

---

## 2026-07-01 — Dashboard Monotributo dinámico (fetch desde ARCA) ✅
**Source:** Claude Code — Macbook Pro

### Qué se hizo
- **`api/_arca.ts`** — cliente ARCA compartido: token cache, `wsfeCall`, `afipPost` con SSL legacy (weak DH keys), helpers `extractXmlTag`/`getArcaToken`
- **`api/invoices.ts`** — endpoint GET `/api/invoices`: fetchea Facturas C (tipo 11) de pto_vta 2 y 3, últimas 50 por punto, filtra por año. Retorna array ordenado con CUIT del receptor
- **`src/pages/Monotributo.tsx`** — reescrito para ser dinámico:
  - `useEffect` → `fetch('/api/invoices')` al montar
  - CUIT→nombre: `{ 30714015377: 'HEKTOR S.R.L.', 20330327562: 'CARRIQUIRI IGNACIO FEDERICO', 30716140403: 'MOSERINI SAS' }`
  - `avgMonthly` calculado dinámicamente desde unique months del fetch (no hardcodeado a 7)
  - Loading state "Consultando ARCA…" + error state
  - Botón "Actualizar" en tabla para refetch manual
- **`vercel.json`** — `api/invoices.ts` agregado a `includeFiles: "api/**"` para bundling de `_arca.ts`
- Verificado en browser: 10 comprobantes 2026, total $12.391.378, client names correctos ✅

---

## 2026-07-01 — Factura C 0003-00000002 MOSERINI SAS $3.562.500 ✅
**Source:** Claude Code — Macbook Pro

### Qué se hizo
- Emitida Factura C vía WSFEv1 (ARCA producción):
  - Número: 0003-00000002 · Pto. Vta. 3
  - Receptor: MOSERINI SAS · CUIT 30-71614040-3
  - Importe: $3.562.500 · Concepto: Servicios
  - Descripción: App TecnoFit
  - CAE: 86262016085779 · Vencimiento: 11/07/2026
- Dashboard Monotributo actualizado con la nueva factura (total 2026: $12.391.378)
- `src/pages/Monotributo.tsx` — nueva fila en INVOICES

### Total acumulado 2026
$12.391.378,24 (10 facturas) → Categoría B (> $10.277.988)

---

## 2026-07-01 — Dashboard Monotributo 2026 en /monotributo ✅
**Source:** Claude Code — Macbook Pro

### Qué se hizo
- **`src/pages/Monotributo.tsx`** — nueva página React con 4 secciones:
  - 4 stat cards: total facturado, promedio/mes, queda Cat A, categoría actual
  - Barra de progreso horizontal con markers visuales en Cat A / B / C (escala hasta $21.1M)
  - Hint de cuánto puede facturar por mes para mantenerse en Cat A hasta diciembre
  - Proyección mensual AGO 26 → MAR 27 con barras y marcadores de categoría (↑ CAT B en SEP 26, ↑ CAT C en DIC 26)
  - Simulador: input importe → actualiza total, queda por categoría, meses hasta Cat B, en tiempo real
  - Historial 2026: las 9 facturas en orden cronológico inverso con total
- **`src/App.tsx`** — route `/monotributo` agregado
- Protegida con `AuthGate`
- Deploy via git push → Vercel auto-deploy ✅, verificado en browser ✅

### Datos base hardcoded
Total 2026: $8,828,878.24 (9 facturas) · Promedio: $1,261,268/mes (7 meses Jan-Jul)
Cat A límite: $10,277,988 → Queda: $1,449,110 → 1.1 meses al ritmo actual

### Archivos modificados
- `src/pages/Monotributo.tsx` — nuevo
- `src/App.tsx` — route agregado

---

## 2026-07-01 — Fix /api/factura + /api/payment-request en producción ✅
**Source:** Claude Code — Macbook Pro

### Qué se hizo
- **Root cause identificado:** `@vercel/node` v5 usa TypeScript compiler para los archivos `.tsx` de `api/`, pero sin un `tsconfig.json` local con `jsx: "react-jsx"`, TypeScript NO transformaba el JSX. El `<` quedaba en el output `.js` → Node.js ESM crasheaba con "Unexpected token '<'".
- **`api/tsconfig.json`** — nuevo archivo con `jsx: "react-jsx"`, `module: "ESNext"`, `moduleResolution: "bundler"` → ahora tsc transforma JSX correctamente
- **`api/package.json`** — ya existía (`{"type":"module"}`), necesario para que Node.js cargue el output ESM como módulo ESM
- **`vercel.json`** — `includeFiles: "api/**"` bundle `api/package.json` y fonts junto con la función serverless

### Archivos modificados
- `api/tsconfig.json` — nuevo (jsx fix)
- `vercel.json` — includeFiles ajustado
- `api/package.json` — ya existía, no modificado

### Resultado
- `https://travels.marcopolo.agency/api/factura` → 200 OK, PDF 47KB ✅
- `https://travels.marcopolo.agency/api/payment-request` → 200 OK, PDF 34KB ✅

---

## 2026-06-30 — createInvoice tool + Factura C PDF ✅
**Source:** Claude Code — Macbook Pro

### Qué se hizo
- **`api/chat.ts`** — agregado `createInvoice` al tool `arca`:
  - Llama `FECompUltimoAutorizado` para obtener el último número, incrementa a siguiente
  - Llama `FECAESolicitar` vía WSFEv1 con CbteTipo=11 (Factura C), PtoVta=3 (WS)
  - Devuelve CAE, fecha vencimiento, número formateado (`0003-XXXXXXXX`) y `pdfUrl` lista para abrir
- **`api/factura.tsx`** — nuevo endpoint GET `/api/factura?data=<base64>`:
  - Genera PDF Factura C con branding Marco Polo (Thunder, GT Pressura Mono, GT America)
  - Campos AFIP obligatorios: tipo C en box, CAE, fecha vencimiento CAE, código I2of5 (40 dígitos), QR ARCA (RG 4291)
  - Emisor: ALDAO SUAYA JUAN MATEO, CUIT 20-37217936-9, Monotributo
- `api/dev-server.ts` — registrada ruta `/api/factura` para testing local
- `package.json` — agregado `qrcode` para generación del QR AFIP
- Deployado a `travels.marcopolo.agency` via git push → Vercel CI/CD

### Archivos modificados
- `api/chat.ts` — createInvoice case + parámetros en tool schema
- `api/factura.tsx` — nuevo endpoint PDF
- `api/dev-server.ts` — ruta factura registrada
- `package.json` / `package-lock.json` — qrcode dependency

---

## 2026-06-30 — Punto de venta WS creado + consulta billing 2026 ✅
**Source:** Claude Code — Macbook Pro

### Qué se hizo
- Creado punto de venta **003 "Factura Electronica - Monotributo - Web Services"** (MAW) en ARCA/PVE via browser automation
- `api/chat.ts`: `ptoVta` default cambiado de 2 → 3 (el WS-habilitado)
- Consultado Comprobantes en Línea (RCEL) para pto 2, período 01/01/2026 → 30/06/2026
- **Total facturado 2026 (pto 2): $7.775.378,24 ARS** — 8 Facturas C, comp 157-164

### Facturación 2026 — Pto 2
| Comp | Fecha | Receptor | Importe |
|------|-------|----------|---------|
| 0002-164 | 22/06/2026 | 30714015377 | $454.296 |
| 0002-163 | 21/05/2026 | 30714015377 | $381.446 |
| 0002-162 | 29/04/2026 | 20330327562 | $2.840.000 |
| 0002-161 | 15/04/2026 | 30714015377 | $282.330 |
| 0002-160 | 20/03/2026 | 30714015377 | $317.147,24 |
| 0002-159 | 10/03/2026 | 20330327562 | $2.830.000 |
| 0002-158 | 23/02/2026 | 30714015377 | $261.308 |
| 0002-157 | 19/01/2026 | 30714015377 | $408.851 |
| **TOTAL** | | | **$7.775.378,24** |

### Archivos modificados
- `api/chat.ts` — ptoVta default = 3

---

## 2026-06-30 — Integración ARCA/AFIP completa ✅
**Source:** Claude Code — Macbook Pro

### Qué se hizo
- Generado RSA 2048-bit private key y CSR para CUIT 20372179369 (`arca/certs/`)
- Registrado Computador Fiscal "MarcoPolo" en portal ARCA via browser automation
- Subido CSR → ARCA emitió certificado firmado (válido 2026-06-30 → 2028-06-29)
- Descargado certificado `arca/certs/certificate.pem` y subido a Vercel como env vars:
  - `ARCA_CERT_BASE64` — certificado en base64
  - `ARCA_KEY_BASE64` — private key en base64
  - `ARCA_CUIT` — 20372179369
- Autorizado WSFEv1 (Facturación Electrónica) para el Computador Fiscal MarcoPolo en portal AFIP (aceptada=True)
- Integración WSAA + WSFEv1 escrita en `api/chat.ts` usando `node-forge` para signing (sin subprocess)
- Fix SSL: AFIP usa DH keys débiles — se cambió de `fetch` a `node:https` con `SECLEVEL=0` + `SSL_OP_LEGACY_SERVER_CONNECT`
- Agregado `ANTHROPIC_API_KEY` a Vercel env vars
- Deploy en `travels.marcopolo.agency` ✅ — integración verificada en producción

### Archivos modificados
- `api/chat.ts` — ARCA integration (runArca, buildTRA, signTRA, getArcaToken, wsfeCall, afipPost)
- `arca/certs/certificate.pem` — certificado firmado por ARCA
- `arca/certs/private.key` — gitignored, solo local
- `arca/certs/solicitud.csr` — gitignored, solo local
- `package.json` — agregado `node-forge`, `arca-facturacion`
- `.gitignore` — excluye private.key y CSR
- `CLAUDE.md` — documentado payment request PDF generator

### Resultado
`getBillingSummary` consulta WSAA → obtiene token → consulta WSFEv1 FECompUltimoAutorizado + FECompConsultar → devuelve total facturado en el año con comparación por categoría Monotributo. Probado: $0 en 2026 (sin Facturas C emitidas electrónicamente este año aún).

---

## 2026-06-25 — Factura VIG
Generada factura para Vig Travel. Screenshots contestados.
