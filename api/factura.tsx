import type { VercelRequest, VercelResponse } from '@vercel/node'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'
import React from 'react'
import { Document, Font, G, Image, Page, Path, Svg, Text, View, StyleSheet, renderToBuffer } from '@react-pdf/renderer'
import QRCode from 'qrcode'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fontPath = (name: string) => resolve(__dirname, 'fonts', name)

Font.register({ family: 'Thunder', src: fontPath('Thunder-BoldLC.ttf') })
Font.register({
  family: 'GT Pressura Mono',
  fonts: [
    { src: fontPath('GT-Pressura-Mono-Light.otf'), fontWeight: 300 },
    { src: fontPath('GT-Pressura-Mono-Regular.otf'), fontWeight: 400 },
  ],
})
Font.register({
  family: 'GT America',
  fonts: [
    { src: fontPath('GT-America-Regular.otf'), fontWeight: 400 },
    { src: fontPath('GTAmericaBold-Regular.otf'), fontWeight: 700 },
  ],
})

const RED = '#E85858'
const BLACK = '#111111'
const GRAY = '#888888'

const s = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    paddingTop: 32,
    paddingHorizontal: 40,
    paddingBottom: 60,
    fontFamily: 'GT Pressura Mono',
    fontSize: 9,
    color: BLACK,
  },
  // ── Top header band ──
  topBand: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    borderBottomColor: RED,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    paddingBottom: 12,
  },
  leftHeader: { flex: 1 },
  centerHeader: { alignItems: 'center', paddingHorizontal: 16 },
  rightHeader: { flex: 1, alignItems: 'flex-end' },
  // ── Letter box ──
  letterBox: {
    width: 40,
    height: 40,
    borderWidth: 1.5,
    borderColor: BLACK,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  letterBoxChar: { fontFamily: 'Thunder', fontSize: 28, color: BLACK, lineHeight: 1 },
  invoiceType: { fontFamily: 'Thunder', fontSize: 18, color: RED, lineHeight: 1 },
  // ── Emisor / receptor ──
  partySection: {
    flexDirection: 'row',
    marginBottom: 14,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 0.5,
    borderBottomStyle: 'solid',
    paddingBottom: 12,
  },
  partyBlock: { flex: 1 },
  partyTitle: { fontFamily: 'GT Pressura Mono', fontWeight: 400, fontSize: 7, color: RED, letterSpacing: 1, marginBottom: 4 },
  partyName: { fontFamily: 'GT America', fontWeight: 700, fontSize: 11, color: BLACK, marginBottom: 3 },
  partyLine: { fontFamily: 'GT Pressura Mono', fontWeight: 300, fontSize: 8.5, color: BLACK, lineHeight: 1.5 },
  partySeparator: { width: 1, backgroundColor: '#DDDDDD', marginHorizontal: 16 },
  // ── Invoice number row ──
  invoiceNumRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  invoiceNumLabel: { fontFamily: 'GT Pressura Mono', fontWeight: 300, fontSize: 8, color: GRAY },
  invoiceNum: { fontFamily: 'Thunder', fontSize: 22, color: BLACK, lineHeight: 1 },
  fechaLabel: { fontFamily: 'GT Pressura Mono', fontWeight: 300, fontSize: 8, color: GRAY, textAlign: 'right' },
  fechaVal: { fontFamily: 'GT Pressura Mono', fontWeight: 400, fontSize: 10, color: BLACK, textAlign: 'right' },
  // ── Detalle ──
  detalleSection: { marginBottom: 16 },
  detalleHeader: {
    flexDirection: 'row',
    borderBottomColor: RED,
    borderBottomWidth: 0.5,
    borderBottomStyle: 'solid',
    paddingBottom: 4,
    marginBottom: 6,
  },
  detalleHeaderText: { fontFamily: 'GT Pressura Mono', fontWeight: 300, fontSize: 7.5, color: RED, letterSpacing: 0.5 },
  detalleRow: { flexDirection: 'row', paddingVertical: 4 },
  detalleDesc: { flex: 1, fontFamily: 'GT America', fontWeight: 400, fontSize: 9.5, color: BLACK, lineHeight: 1.5 },
  detalleConcepto: { fontFamily: 'GT Pressura Mono', fontWeight: 300, fontSize: 8, color: GRAY, marginBottom: 2 },
  detalleImporte: { fontFamily: 'Thunder', fontSize: 22, color: BLACK, textAlign: 'right' },
  // ── Total box ──
  totalBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopColor: RED,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    paddingTop: 10,
    marginBottom: 20,
  },
  totalLabel: { fontFamily: 'GT Pressura Mono', fontWeight: 300, fontSize: 9, color: GRAY, marginRight: 16 },
  totalVal: { fontFamily: 'Thunder', fontSize: 36, color: RED, lineHeight: 1 },
  // ── CAE section ──
  caeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderTopColor: '#DDDDDD',
    borderTopWidth: 0.5,
    borderTopStyle: 'solid',
    paddingTop: 12,
    marginBottom: 12,
  },
  caeBlock: { flex: 1 },
  caeLabel: { fontFamily: 'GT Pressura Mono', fontWeight: 300, fontSize: 7.5, color: GRAY, marginBottom: 2 },
  caeVal: { fontFamily: 'GT Pressura Mono', fontWeight: 400, fontSize: 10, color: BLACK, letterSpacing: 0.5 },
  barcodeText: {
    fontFamily: 'GT Pressura Mono',
    fontWeight: 300,
    fontSize: 7,
    color: GRAY,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  // ── Footer ──
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: { fontFamily: 'GT Pressura Mono', fontWeight: 300, fontSize: 7.5, color: GRAY },
  footerRed: { fontFamily: 'GT Pressura Mono', fontWeight: 300, fontSize: 7.5, color: RED },
})

// Same Marco Polo SVG logo paths as payment-request.tsx
const LOGO_PATHS = [
  'M6.957,19.057 L6.212,22.04 C7.329,19.992 9.19,17.2 11.238,17.014 C11.6181151,16.9346892 12.0134268,17.0381671 12.3059328,17.2935451 C12.5984387,17.5489231 12.7543032,17.9266601 12.727,18.314 C12.5556656,19.3856544 12.3066765,20.4434404 11.982,21.479 C13.471,18.687 15.333,16.639 17.008,16.453 C17.8688177,16.350292 18.6697921,16.9095115 18.87,17.753 C18.9013596,18.5153505 18.7747068,19.2759479 18.498,19.987 C18.0907161,21.5651003 17.5935722,23.1186335 17.009,24.64 C16.823,25.012 17.009,25.198 17.195,25.198 C17.567,25.198 18.684,24.081 19.243,23.336 C19.429,23.336 19.801,23.522 19.801,23.708 C18.8745297,25.7284263 16.9777156,27.1334877 14.775,27.431 C14.2118798,27.4746886 13.716475,27.0617773 13.658,26.5 C13.6285182,26.0584318 13.6918793,25.6155851 13.844,25.2 C14.402,23.338 14.961,21.663 15.519,19.8 C15.6453681,19.4412861 15.7083081,19.0633073 15.705,18.683 C15.6914569,18.4834287 15.5325713,18.3245431 15.333,18.311 C15.147,18.311 14.402,18.87 13.658,20.173 C12.358,22.034 11.424,25.013 10.493,27.433 C10.307,27.991 10.121,27.991 9.562,27.991 C8.445,28.177 7.7,27.991 7.7,27.433 C7.7,27.061 8.817,23.152 9.562,20.359 C9.68836808,20.0002861 9.75130814,19.6223073 9.748,19.242 C9.73445688,19.0424287 9.57557131,18.8835431 9.376,18.87 C9.004,18.87 8.259,19.428 7.514,20.732 C6.26641782,23.0394188 5.2681216,25.473143 4.536,27.992 C4.3970593,28.3750798 4.00834059,28.6080605 3.605,28.55 C2.488,28.736 1.744,28.55 1.744,27.992 C1.744,27.62 3.233,21.849 3.605,20.732 C3.791,19.801 3.791,19.615 3.419,19.801 C2.488,19.801 1.93,20.918 1.557,21.476 C1.371,21.476 0.999,21.29 0.999,21.104 C1.70769384,19.2114765 3.45174319,17.9034395 5.467,17.753 C7.143,17.568 7.143,18.313 6.957,19.057 Z',
  'M29.295,16.265 L29.667,14.965 C29.853,14.779 30.039,14.779 30.412,14.779 L31.343,14.779 C31.7093956,14.84947 32.0391242,15.0470946 32.274,15.337 C31.529,17.757 30.785,20.737 30.04,23.528 C30.04,23.9 30.04,24.086 30.226,24.086 C31.1188753,23.6689865 31.8885296,23.0278375 32.46,22.225 C32.7605278,22.2427233 33.0002767,22.4824722 33.018,22.783 C32.0193471,24.5160365 30.3242893,25.7365218 28.364,26.134 C27.8255359,26.1079381 27.3696423,25.7279588 27.247,25.203 C27.2313347,24.8218256 27.2946606,24.4415299 27.433,24.086 L27.991,22.038 L27.809,22.038 C26.509,24.086 24.272,26.32 22.597,26.506 C21.852,26.506 20.922,25.948 20.922,25.206 C20.736,23.717 21.853,20.552 24.087,18.132 C25.1570084,16.779492 26.6760851,15.8549909 28.369,15.526 C28.364,15.707 28.923,15.893 29.295,16.265 Z M27.62,17.01 C27.248,17.01 26.875,17.382 26.131,18.499 C25.009,20.176 24.083,22.776 24.269,24.27 L24.269,24.456 C24.2825431,24.6555713 24.4414287,24.8144569 24.641,24.828 C25.199,24.828 26.503,23.153 27.061,22.036 C27.806,20.736 28.55,18.685 28.922,17.936 C28.364,17.01 27.992,16.824 27.62,17.01 Z',
  'M43.257,15.52 C43.443,17.009 42.512,18.126 41.768,18.126 C41.21,18.126 41.21,17.754 41.023,17.009 C40.837,16.637 40.837,16.451 40.651,16.451 C40.279,16.451 39.72,17.568 39.162,18.871 C38.3128847,20.8593645 37.6279315,22.9138894 37.114,25.014 C36.8883339,25.4083118 36.4478088,25.6283772 35.997,25.572 C35.439,25.572 34.322,25.572 34.508,24.641 C35.066,22.221 35.625,19.615 36.183,17.381 C36.369,16.823 36.369,16.636 35.997,16.636 C35.625,16.636 34.697,17.567 34.136,18.311 C33.9823939,18.3326088 33.8275579,18.2808129 33.7178725,18.1711275 C33.6081871,18.0614421 33.5563912,17.9066061 33.578,17.753 C34.1905386,16.1268301 35.5974381,14.9307955 37.301,14.588 C38.79,14.402 38.976,15.519 38.601,16.822 L37.856,19.614 L38.042,19.614 C38.787,18.125 39.342,17.008 39.717,16.077 C40.462,14.96 41.017,14.216 41.951,14.029 C42.698,14.031 43.257,14.403 43.257,15.52 Z',
  'M43.443,21.849 C43.4129394,19.859273 43.9979112,17.9087851 45.118,16.264 C46.0574459,14.7416954 47.6271445,13.717963 49.399,13.472 C50.888,13.286 52.005,13.844 52.191,15.147 C52.2685301,15.5773896 52.1441457,16.0195462 51.853596,16.3463901 C51.5630464,16.6732341 51.1385091,16.8485683 50.702,16.822 C50.1957787,16.8878271 49.7187335,16.5696546 49.585,16.077 C49.585,15.519 49.399,14.588 49.026,14.588 C48.653,14.588 48.095,15.146 47.726,16.263 C47.0889524,17.7266214 46.832663,19.3276563 46.981,20.917 C47.167,22.034 47.539,22.592 48.098,22.406 C48.657,22.406 49.587,21.848 50.518,20.544 C50.6718047,20.5223169 50.8268513,20.5742349 50.9365847,20.684165 C51.0463181,20.7940951 51.0979585,20.9492344 51.076,21.103 C50.1314646,22.884433 48.4108369,24.1240687 46.422,24.456 C44.56,24.641 43.63,23.524 43.443,21.849 Z',
  'M62.803,15.707 C62.9033164,17.7361098 62.2388869,19.7290414 60.941,21.292 C59.8999747,22.5209557 58.4380605,23.3175207 56.841,23.526 C54.235,23.712 53.118,22.226 52.932,20.361 C52.8091579,18.1838846 53.5443892,16.0453237 54.98,14.404 C55.9259226,13.3155523 57.264666,12.6463604 58.703,12.543 C61.5,12.17 62.617,13.845 62.803,15.707 Z M57.777,14.59 C57.032,15.89 55.729,18.871 55.916,21.29 C55.9006359,21.5413125 55.9937785,21.7871484 56.1718151,21.9651849 C56.3498516,22.1432215 56.5956875,22.2363641 56.847,22.221 C57.405,22.221 57.964,21.476 58.522,20.36 C59.3852289,18.4931193 59.828965,16.4597837 59.822,14.403 C59.822,13.844 59.636,13.286 59.077,13.472 C58.708,13.473 58.335,13.845 57.777,14.59 Z',
]

const MarcopoloLogo = ({ color = RED, width = 70 }: { color?: string; width?: number }) => {
  const height = Math.round(width * (28 / 106))
  return (
    <Svg viewBox="0 0 106 28" width={width} height={height}>
      <G fill={color} fillRule="evenodd">
        <G transform="translate(-1, -1)">
          {LOGO_PATHS.map((d, i) => <Path key={i} d={d} />)}
        </G>
      </G>
    </Svg>
  )
}

function formatDate(yyyymmdd: string): string {
  if (!yyyymmdd || yyyymmdd.length < 8) return yyyymmdd
  return `${yyyymmdd.slice(6, 8)}/${yyyymmdd.slice(4, 6)}/${yyyymmdd.slice(0, 4)}`
}

function formatCuit(cuit: string): string {
  const c = cuit.replace(/\D/g, '')
  if (c.length === 11) return `${c.slice(0, 2)}-${c.slice(2, 10)}-${c.slice(10)}`
  return cuit
}

function formatAmount(n: number): string {
  return n.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function i2of5CheckDigit(digits39: string): string {
  let sum = 0
  for (let i = 0; i < 39; i++) {
    sum += parseInt(digits39[i], 10) * (i % 2 === 0 ? 3 : 1)
  }
  return String((10 - (sum % 10)) % 10)
}

function buildBarcodeString(cuit: string, tipoCmp: number, ptoVta: number, cae: string, vtoCae: string): string {
  const digits39 =
    cuit.replace(/\D/g, '').padStart(11, '0') +
    String(tipoCmp).padStart(2, '0') +
    String(ptoVta).padStart(4, '0') +
    cae.padStart(14, '0') +
    vtoCae.replace(/-/g, '').slice(0, 8)
  return digits39 + i2of5CheckDigit(digits39)
}

function buildAfipQrUrl(data: InvoiceData): string {
  const fecha = data.fecha.length === 8
    ? `${data.fecha.slice(0, 4)}-${data.fecha.slice(4, 6)}-${data.fecha.slice(6, 8)}`
    : data.fecha
  const payload = {
    ver: 1,
    fecha,
    cuit: parseInt(data.cuit.replace(/\D/g, ''), 10),
    ptoVta: data.ptoVta,
    tipoCmp: data.tipo,
    nroCmp: data.numero,
    importe: data.importe,
    moneda: 'PES',
    ctz: 1,
    tipoDocRec: data.receptorCuit && data.receptorCuit !== '0' ? 80 : 99,
    nroDocRec: parseInt(data.receptorCuit?.replace(/\D/g, '') || '0', 10),
    tipoCodAut: 'E',
    codAut: parseInt(data.cae, 10),
  }
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `https://www.afip.gob.ar/fe/qr/?p=${encoded}`
}

interface InvoiceData {
  numero: number
  ptoVta: number
  tipo: number
  tipoNombre: string
  fecha: string
  cuit: string
  receptorCuit: string
  receptorRazonSocial: string
  importe: number
  concepto: number
  descripcion: string
  cae: string
  caeFchVto: string
}

const CONCEPTO_NAMES: Record<number, string> = {
  1: 'Productos',
  2: 'Servicios',
  3: 'Productos y Servicios',
}

interface FacturaDocProps {
  data: InvoiceData
  qrDataUrl: string
}

const FacturaDoc = ({ data, qrDataUrl }: FacturaDocProps) => {
  const invoiceNum = `${String(data.ptoVta).padStart(4, '0')}-${String(data.numero).padStart(8, '0')}`
  const barcodeStr = buildBarcodeString(data.cuit, data.tipo, data.ptoVta, data.cae, data.caeFchVto)
  const fechaEmision = formatDate(data.fecha)
  const caeFchVtoFormatted = data.caeFchVto.length === 8 ? formatDate(data.caeFchVto) : data.caeFchVto
  const conceptoLabel = CONCEPTO_NAMES[data.concepto] ?? 'Servicios'

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* ── Header band ── */}
        <View style={s.topBand}>
          <View style={s.leftHeader}>
            <MarcopoloLogo color={RED} width={70} />
            <Text style={{ fontFamily: 'GT Pressura Mono', fontWeight: 300, fontSize: 7.5, color: GRAY, marginTop: 6 }}>
              Marco Polo Design Studio SAS
            </Text>
            <Text style={{ fontFamily: 'GT Pressura Mono', fontWeight: 300, fontSize: 7.5, color: GRAY }}>
              {formatCuit('20372179369')}
            </Text>
          </View>

          <View style={s.centerHeader}>
            <Text style={s.invoiceType}>{data.tipoNombre.toUpperCase()}</Text>
            <View style={s.letterBox}>
              <Text style={s.letterBoxChar}>C</Text>
            </View>
            <Text style={{ fontFamily: 'GT Pressura Mono', fontWeight: 300, fontSize: 7, color: GRAY, textAlign: 'center' }}>
              Monotributo
            </Text>
          </View>

          <View style={s.rightHeader}>
            <Text style={{ fontFamily: 'Thunder', fontSize: 18, color: BLACK, lineHeight: 1, textAlign: 'right' }}>
              N° {invoiceNum}
            </Text>
            <Text style={{ fontFamily: 'GT Pressura Mono', fontWeight: 300, fontSize: 7.5, color: GRAY, marginTop: 4, textAlign: 'right' }}>
              Fecha de emisión
            </Text>
            <Text style={{ fontFamily: 'GT Pressura Mono', fontWeight: 400, fontSize: 10, color: BLACK, textAlign: 'right' }}>
              {fechaEmision}
            </Text>
            <Text style={{ fontFamily: 'GT Pressura Mono', fontWeight: 300, fontSize: 7.5, color: GRAY, marginTop: 6, textAlign: 'right' }}>
              Concepto
            </Text>
            <Text style={{ fontFamily: 'GT Pressura Mono', fontWeight: 400, fontSize: 9, color: BLACK, textAlign: 'right' }}>
              {conceptoLabel}
            </Text>
          </View>
        </View>

        {/* ── Emisor / Receptor ── */}
        <View style={s.partySection}>
          <View style={s.partyBlock}>
            <Text style={s.partyTitle}>EMISOR</Text>
            <Text style={s.partyName}>ALDAO SUAYA JUAN MATEO</Text>
            <Text style={s.partyLine}>CUIT: {formatCuit('20372179369')}</Text>
            <Text style={s.partyLine}>Juncal 1699 Piso 3 Dpto B, CABA</Text>
            <Text style={s.partyLine}>Monotributo</Text>
            <Text style={s.partyLine}>Inicio de actividades: 01/01/2020</Text>
          </View>
          <View style={s.partySeparator} />
          <View style={[s.partyBlock, { paddingLeft: 16 }]}>
            <Text style={s.partyTitle}>RECEPTOR</Text>
            <Text style={s.partyName}>{data.receptorRazonSocial}</Text>
            {data.receptorCuit && data.receptorCuit !== '0' ? (
              <Text style={s.partyLine}>CUIT: {formatCuit(data.receptorCuit)}</Text>
            ) : (
              <Text style={s.partyLine}>Consumidor Final</Text>
            )}
          </View>
        </View>

        {/* ── Detalle ── */}
        <View style={s.detalleSection}>
          <View style={s.detalleHeader}>
            <Text style={[s.detalleHeaderText, { flex: 1 }]}>DESCRIPCIÓN</Text>
            <Text style={[s.detalleHeaderText, { width: 120, textAlign: 'right' }]}>IMPORTE</Text>
          </View>
          <View style={s.detalleRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.detalleConcepto}>{conceptoLabel.toUpperCase()}</Text>
              <Text style={s.detalleDesc}>
                {data.descripcion || 'Prestación de servicios'}
              </Text>
            </View>
            <Text style={[s.detalleImporte, { width: 120 }]}>
              $ {formatAmount(data.importe)}
            </Text>
          </View>
        </View>

        {/* ── Total ── */}
        <View style={s.totalBox}>
          <Text style={s.totalLabel}>TOTAL</Text>
          <Text style={s.totalVal}>$ {formatAmount(data.importe)}</Text>
        </View>

        {/* ── CAE + QR ── */}
        <View style={s.caeSection}>
          <View style={s.caeBlock}>
            <Text style={s.caeLabel}>CAE Nº</Text>
            <Text style={s.caeVal}>{data.cae}</Text>
            <Text style={[s.caeLabel, { marginTop: 8 }]}>Fecha de vencimiento del CAE</Text>
            <Text style={s.caeVal}>{caeFchVtoFormatted}</Text>
            <Text style={s.barcodeText}>{barcodeStr}</Text>
          </View>
          <View style={{ alignItems: 'center', marginLeft: 16 }}>
            <Image src={qrDataUrl} style={{ width: 80, height: 80 }} />
            <Text style={{ fontFamily: 'GT Pressura Mono', fontWeight: 300, fontSize: 6.5, color: GRAY, marginTop: 4, textAlign: 'center' }}>
              Verificar en ARCA
            </Text>
          </View>
        </View>

        {/* ── Footer ── */}
        <View style={s.footer}>
          <MarcopoloLogo color="#CCCCCC" width={50} />
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={s.footerRed}>hi@marcopolo.agency</Text>
            <Text style={s.footerText}>www.marcopolo.agency</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  let data: InvoiceData

  if (req.method === 'GET') {
    const raw = req.query.data as string
    if (!raw) return res.status(400).json({ error: 'Missing data parameter' })
    try {
      data = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8'))
    } catch {
      return res.status(400).json({ error: 'Invalid data parameter' })
    }
  } else if (req.method === 'POST') {
    data = req.body
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!data?.cae || !data?.numero) {
    return res.status(400).json({ error: 'Missing required fields: cae, numero' })
  }

  const qrUrl = buildAfipQrUrl(data)
  const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1, width: 200 })

  const buf = await renderToBuffer(<FacturaDoc data={data} qrDataUrl={qrDataUrl} />)

  const filename = `factura-${String(data.ptoVta).padStart(4, '0')}-${String(data.numero).padStart(8, '0')}.pdf`
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `inline; filename="${filename}"`)
  res.setHeader('Content-Length', buf.length)
  res.status(200).send(buf)
}
