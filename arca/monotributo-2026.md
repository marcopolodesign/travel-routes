# Monotributo & Facturación 2026 — Mateo Aldao Suaya
**CUIT:** 20-37217936-9  
**Actualizado:** 2026-06-30  
**Fuente límites:** arca.gob.ar/monotributo/categorias.asp (vigentes desde 1/02/2026)

---

## Facturación 2026 — Punto de venta 002 (Factura en Línea)

| Comp | Fecha | Razón Social | CUIT Receptor | Importe |
|------|-------|--------------|---------------|---------|
| 0002-00000157 | 19/01/2026 | HEKTOR S.R.L. | 30-71401537-7 | $408.851,00 |
| 0002-00000158 | 23/02/2026 | HEKTOR S.R.L. | 30-71401537-7 | $261.308,00 |
| 0002-00000159 | 10/03/2026 | CARRIQUIRI IGNACIO FEDERICO | 20-33032756-2 | $2.830.000,00 |
| 0002-00000160 | 20/03/2026 | HEKTOR S.R.L. | 30-71401537-7 | $317.147,24 |
| 0002-00000161 | 15/04/2026 | HEKTOR S.R.L. | 30-71401537-7 | $282.330,00 |
| 0002-00000162 | 29/04/2026 | CARRIQUIRI IGNACIO FEDERICO | 20-33032756-2 | $2.840.000,00 |
| 0002-00000163 | 21/05/2026 | HEKTOR S.R.L. | 30-71401537-7 | $381.446,00 |
| 0002-00000164 | 22/06/2026 | HEKTOR S.R.L. | 30-71401537-7 | $454.296,00 |
| **TOTAL** | | | | **$7.775.378,24** |

### Por cliente
| Razón Social | Facturas | Total |
|--------------|---------|-------|
| HEKTOR S.R.L. | 6 | $2.105.378,24 |
| CARRIQUIRI IGNACIO FEDERICO | 2 | $5.670.000,00 |

---

## Categorías Monotributo — Vigentes desde 1/02/2026
*(Locaciones y prestaciones de servicios)*

| Cat | Ingresos brutos anuales | Cuota mensual total* |
|-----|------------------------|----------------------|
| A | $10.277.988 | $42.387 |
| B | $15.058.448 | $48.251 |
| C | $21.113.697 | $56.502 |
| D | $26.212.853 | $72.414 |
| E | $30.833.964 | $102.538 |
| F | $38.642.048 | $129.045 |
| G | $46.211.109 | $197.108 |
| H | $70.113.407 | $447.347 |
| I | $78.479.212 | $824.802 |
| J | $89.872.640 | $999.008 |
| K | $108.357.084 | $1.381.688 |

*\* Total = Impuesto integrado + Aportes SIPA + Aportes obra social*

---

## Situación al 30/06/2026

| | |
|---|---|
| **Facturado ene–jun 2026** | $7.775.378,24 |
| **Límite Cat A** | $10.277.988 |
| **Queda para agotar Cat A** | $2.502.610 |
| **Promedio mensual (6 meses)** | ~$1.296.000 |
| **Proyección anual (× 2)** | ~$15.550.756 |

### Proyección a fin de año
A ritmo constante de ~$1.296.000/mes:
- **Agosto 2026** → superaría límite Cat A ($10.28M)
- **Noviembre 2026** → superaría límite Cat B ($15.06M)
- **Cierre 2026** → ~$15.55M → necesita **Cat C** para el año completo

---

## Recategorización semestral — Julio 2026

- **Vencimiento:** 20 de julio de 2026
- **Qué evalúa ARCA:** ingresos brutos de los últimos 12 meses
- **Situación semestral ene–jun:** $7.775.378 < $10.277.988 (Cat A) → **no hay obligación de subir en julio**
- **Recomendación:** monitorear el acumulado en agosto. Si se proyecta superar $10.28M antes de fin de año, recategorizar preventivamente a Cat B.

---

## Puntos de venta

| Nro | Tipo | Sistema | Queryable via API |
|-----|------|---------|-------------------|
| 002 | Factura en Línea - Monotributo | RCEL (web) | ❌ No |
| 003 | Factura Electrónica - Monotributo - Web Services | WSFEv1 | ✅ Sí |

> **Nota:** Pto 003 fue creado el 30/06/2026. Las facturas emitidas desde travels.marcopolo.agency saldrán por pto 3 y serán consultables via `getBillingSummary` en la API.

---

## API de consulta

```
POST https://travels.marcopolo.agency/api/chat
{ "messages": [{ "role": "user", "content": "Cuánto facturé en 2026?" }] }
```

Herramientas disponibles en el asistente:
- `getBillingSummary` — total facturado por año y punto de venta (solo pto 3 via API)
- `getLastInvoices` — últimas facturas emitidas por el punto de venta WS
- `getMonotributoLimits` — categorías y límites vigentes (actualizados 1/02/2026)
