# Marco Polo — Catchup

## 2026-07-29 — TecnoFit: página de Sprint 1 para la reunión de kickoff ✅
**Source:** Claude Code — Macbook Pro

### Qué se hizo
Hoy es la primera reunión del roadmap nuevo de Tecno. Mateo pidió un documento del mismo estilo
que la propuesta `/budget/tecnofit-tvs`, pero más largo y explicando **sólo el Sprint 1**, con
gráficos que se puedan ver desde dos ángulos: el técnico y el del usuario.

- Nueva página `src/pages/TecnoFitSprint1.tsx`, ruta `/budget/tecnofit-sprint-1` en `App.tsx`
  (`BudgetTemplate` con `timeline="2 semanas · Sprint 1 de 4"`,
  `stack="Supabase Storage · Transcodificación · CDN"`, `whatLabel="Plan de Sprint"`).
  Agregada también como card en `Home.tsx`.
- **Componente nuevo `src/components/DualDiagram.tsx`** — es el pedido central. Cada gráfico es
  un card con un switcher segmentado arriba a la derecha: **Usuario** (lo que se ve en pantalla,
  sin tecnicismos) y **Desarrollo** (cómo se construye). Cada vista tiene su propio chart Mermaid,
  su propio párrafo de contexto y sus propios takeaways numerados. Envuelve `MermaidDiagram` con
  `key={view}` para forzar el re-render al cambiar de vista.
- Cinco diagramas duales: el recorrido de un ejercicio · el pipeline de carga · el catálogo y su
  modelo de datos · cómo llega el video a cada pantalla · convivencia con CENTRAL.
- Además: `ScrollNav` con 12 anclas, alcance entra/no-entra, tabla comparativa Storage integrado
  vs CDN dedicado, timeline día a día (10 días hábiles), dependencias del cliente con fecha,
  criterios de aceptación verificables y riesgos con mitigación.

### Iteración de Mateo — "Dónde estamos hoy" reencuadrada a nivel gym
Feedback: sacar YouTube de esa sección y hacerla **más general a nivel gimnasio** — la app puesta,
el administrador funcionando, y este sprint como el camino que une todo.

La sección abría con la limitación técnica del campo de link (YouTube/Vimeo), lo que la hacía
sonar a queja técnica y enterraba lo importante: TecnoFit ya tiene tres piezas funcionando en
producción. Reescrita para abrir desde el lado del gym — la app publicada y aprobada en el App
Store, el administrador como la herramienta con la que el gym realmente trabaja, y el piso ya
conectado (motor de cola, líneas, boxes, pantallas en vivo) — y cerrar con el encuadre pedido:
**lo que falta no es una pieza más, es el hilo que las une**, y ese hilo es el contenido, que es
justamente lo único que las tres comparten.

Efecto colateral: quedaron huérfanas 3 menciones a YouTube en otras secciones de cara al cliente
(objetivo, alcance "entra", riesgos) — reescritas sin nombrarlo, conservando la sustancia
("un solo video, un solo formato, todas las pantallas"). **La única mención que queda en toda la
página está dentro de la vista Desarrollo** del diagrama del recorrido, donde la audiencia es el
equipo técnico. Verificado recorriendo el DOM en las dos vistas: 0 menciones en vista Usuario.
`tsc` + build limpios, commit `9b9c9d1`.

### El contenido está anclado al código real de Tecno, no inventado
Se corrió un agente de exploración sobre `~/Local/Tecno` antes de escribir. Corrigió tres cosas
que había asumido mal, y todas terminaron siendo los mejores argumentos del documento:

1. **El catálogo de ejercicios YA existe** — `admin/src/components/Exercises.jsx` (960 líneas,
   ruta `/exercises`) con CRUD completo sobre `exercises`, `exercise_categories` y `body_zones`.
   Lo que falta no es el catálogo: es el video. El sprint le agrega la carga de archivo.
2. **Hay una incompatibilidad real en producción hoy.** El form del admin ofrece sólo un campo
   para pegar un link de YouTube/Vimeo. La TV (`QueueTv.jsx`) lo resuelve con un `<iframe>` de
   YouTube, pero la app usa `expo-video`, que **sólo reproduce archivos directos** — así que un
   ejercicio cargado como el admin sugiere se ve en la TV y queda en blanco en el celular.
   Además el trigger `extract_video_info()` sólo genera thumbnail para YouTube: Vimeo y archivo
   directo quedan sin portada. Esto pasó a ser el argumento central de por qué el sprint existe.
3. **La TV no tiene fallback a CENTRAL.** La app sí (`supabaseRoutines.ts` → si no hay datos,
   `central-rutina-fallback`), pero `queueService.getCurrentExerciseForUser()` lee sólo de
   Supabase. Es la razón concreta de por qué el contenido va antes que las pantallas.
   El único bucket de Storage que existe hoy es `avatars`.

### Verificación
Verificado en Chrome sobre el dev server: los 5 cards renderizan, el switcher cambia chart +
caption + takeaways, los 10 diagramas (5 usuario + 5 desarrollo) compilan sin error de Mermaid,
y no hay overflow horizontal ni en desktop ni en ancho reducido. `tsc -b --noEmit` limpio,
`npm run build` OK. Commit `8c12ef2`, push a `main` → deploy automático en Vercel.

## 2026-07-24 — Nueva propuesta: Senda Arq — Meta Ads + Google Ads (gestión mensual) ✅
**Source:** Claude Code — Macbook Pro

### Qué se hizo
Mateo pidió una propuesta de pauta paga para Senda Arq (mismo approach que TAG en Meta, más
Google Ads que TAG no tiene), formato "documento tipo Fitness Central", con redes sociales como
add-on opcional. Contexto previo en la conversación: Senda Arq no tiene ninguna infraestructura
de ads hoy (sin Business Manager/cuenta de Meta, sin Google Ads, sin pixel) — a diferencia de TAG,
que ya tiene todo eso armado. Conversión objetivo confirmada por Mateo: WhatsApp.

- Nueva página `src/pages/SendaArqAds.tsx`, ruta `/budget/senda-arq-ads` en `App.tsx`
  (`BudgetTemplate` con `title="Senda Arq — Ads"`, `timeline="Mensual · renovable"`,
  `stack="Meta Ads · Google Ads"`, `whatLabel="Propuesta mensual"`)
- Reutiliza los mismos componentes que `TecnoFitTVs.tsx` (`ContentBox`, `TwoColumnSection`,
  `BoxedListSection`, `Timeline`, `MarcopoloLogo`) — mismo lenguaje visual que el resto de
  propuestas de Marco Polo
- Estructura: Objetivos → Visión general (Meta = top of funnel/marca, Google Search = intención
  de búsqueda) → qué incluye cada plataforma → Setup inicial (una vez) → Timeline (Semana 1 /
  Semana 2 / Mensual recurrente) → Inversión (setup + gestión mensual + presupuesto de pauta,
  separados) → Redes sociales como `BoxedListSection` "Add-on opcional", claramente separada de
  la gestión de pauta
- **Cifras de inversión son un punto de partida, no definitivas** — flaggeado explícitamente en
  la página y acá: Setup U$300–500, gestión mensual U$400–600, pauta recomendada U$300–500/mes.
  Ajustar con Mateo antes de mandar al cliente.
- Verificado en Chrome (dev server `localhost:5173/budget/senda-arq-ads`) — todas las secciones
  renderizan correctamente, mismo estilo que TecnoFitTVs, sin errores de `tsc --noEmit`

### Actualización — cifras de inversión confirmadas por Mateo
Setup inicial se mantiene (U$300–500). Gestión mensual pasa de un rango combinado
Meta+Google a un **flat fee de Meta: U$500/mes, 3 campañas corriendo en simultáneo** —
Google Ads deja de estar incluido por defecto y pasa a ser una extensión opcional
(**+U$200/mes, U$700/mes total con ambas plataformas**), en vez de encarecer el arranque
con las dos plataformas desde el día uno. Sección "Qué incluye Meta" actualizada para
mencionar las 3 campañas. Verificado en Chrome, `tsc` limpio, commit `a656ce0` pusheado.

### Segunda actualización — setup fee flat + compromiso mínimo de 6 meses
Setup inicial pasa de rango (U$300–500) a **flat U$500**. Agregada nota en la caja de Inversión
explicando por qué se pide un **compromiso mínimo de 6 meses**: con el volumen de consultas
esperado para un estudio de arquitectura (bajo, ticket alto), los primeros 1-2 meses son de
aprendizaje del algoritmo y no alcanzan para medir bien CAC/CPC — recién con 6 meses se puede
optimizar con confianza en vez de reaccionar a ruido estadístico. Verificado en Chrome, `tsc`
limpio, commit `bbb8dfe` pusheado.

### Tercera actualización — alineado contra la reunión real con Senda (Granola "Senda redes", 24/07)
Mateo pidió chequear Granola por la última reunión con Senda para ver qué mejorar del budget.
Encontrada la reunión de esa misma mañana con el detalle completo de lo charlado — la propuesta
tenía varios placeholders genéricos que no coincidían con lo acordado. Reescrito contra la reunión:

- **3 campañas ahora nombradas y específicas** (antes: bullet genérico "3 campañas corriendo en
  simultáneo"): **Awareness** (alcance masivo Buenos Aires, foco diseño/arquitectura, objetivo
  seguidores), **Reformas/ticket bajo** (landing + form/WhatsApp, segmentado a obra activa hoy),
  **Casa nueva** (video UGC antes/después + testimonio de dueños)
- **Presupuesto de pauta**: de "U$300–500/mes" a **arranca U$200–300/mes, escala a U$500 según
  performance** (cifra real que se charló en la reunión)
- **Ventana Meta-first explícita**: 2–3 meses solo Meta antes de sumar Google (razón: Meta capta
  perfil pasivo de diseño, Google intención activa y necesita menos optimización continua)
- **Forma de pago agregada** (no estaba en la página): inicialmente 70% al confirmar + resto
  progresivo, corregido después por Mateo a **mensual por adelantado, del 1 al 5 de cada mes**
  (commit `90d79f3`)
- **Nueva sección "Métricas, conversión y CRM"** — no existía antes, es valor real que faltaba
  mostrar: embudo esperado de ticket alto (2.000 interacciones → 200 escriben → 20 interesados →
  1 convierte), ciclo de nurturing 1–2 años, herramientas incluidas sin costo extra (dashboard de
  fuente de leads, pipeline de estado del cliente, feed de conversión a Meta), agente conversacional
  en desarrollo
- **Redes sociales add-on**: antes no tenía precio — agregado **U$750/mes con motor de IA** +
  nota de que Instagram necesita actividad orgánica de base antes de lanzar campañas pagas

No se tocaron: setup inicial (U$500 flat, no discutido en la reunión — decisión de Mateo se
mantiene) ni el compromiso mínimo de 6 meses (tampoco mencionado en la reunión, pero no contradice
nada de lo charlado). Verificado en Chrome, `tsc` limpio, commit `7c5c6a4` pusheado.

### Pendiente / próximo paso
Enviar la propuesta actualizada a Senda Arquitectura (Juan recibiría "presupuesto detallado de
campañas" per la reunión — esta página ya cubre eso). Una vez aprobada, falta armar toda
la infraestructura real (Business Manager + cuenta Meta + pixel/CAPI, y Google Ads solo si
suman la extensión) que hoy no existe — ver contexto en `senda-website/catchup.md`. Pendiente sin
relación directa con el budget pero mencionado en la misma reunión: pedir fotos en alta resolución
para el sitio de Senda (las actuales están pixeladas/cortadas) y decisión pendiente sobre separar
marca "Senda" vs "Senda Industrial" (investigar competencia antes de decidir).

---

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
