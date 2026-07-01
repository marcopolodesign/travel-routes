# Marco Polo — Catchup

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
