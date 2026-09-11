import { useEffect, useRef, useState } from 'react'
import MarcopoloLogo from '../components/MarcopoloLogo'

/**
 * Deck de Picnic — una presentación, no un documento.
 *
 * Scroll-snap vertical: en el teléfono se pasa con el dedo, en escritorio con
 * las flechas, la rueda o espacio. Cada lámina ocupa la pantalla entera.
 */

type Slide = {
  id: string
  eyebrow?: string
  titulo: string
  bajada?: string
  puntos?: string[]
  img?: string
  alt?: string
  pie?: string
  telefono?: boolean
  portada?: boolean
  cifras?: { n: string; l: string; acento?: boolean }[]
  tabla?: { a: string; b: string }[]
}

const SLIDES: Slide[] = [
  {
    id: 'portada',
    portada: true,
    eyebrow: 'Picnic BTL · Plataforma de campo',
    titulo: 'La etapa de\nseptiembre,\nadentro',
    bajada:
      'Las pantallas de la plataforma nueva, armadas con la etapa que Picnic está corriendo ahora mismo. No es una demostración con datos de ejemplo.',
    cifras: [
      { n: '83', l: 'Etapa · septiembre' },
      { n: '11', l: 'Zonas' },
      { n: '2.273', l: 'Colocaciones', acento: true },
      { n: '4', l: 'Roles' },
    ],
  },
  {
    id: 'etapa',
    eyebrow: '01',
    titulo: 'Lo primero que se ve\nes la etapa entera',
    bajada:
      'Las once zonas, cuánto tiene cada una y cómo viene. Nada de arrancar adentro de una zona sola y tener que salir para ver el resto.',
    puntos: [
      'Cuántas colocaciones tiene, cuántas de kit básico y cuántas de backlight',
      'Cuántas se cargaron y cuántas fueron efectivas',
      'Quién responde por ella: el coordinador y el colocador, siempre a la vista',
    ],
    img: '/picnic/zonas.webp',
    alt: 'Pantalla de zonas de la etapa',
    pie: 'Las once zonas, con su avance y sus responsables.',
  },
  {
    id: 'material',
    eyebrow: '02',
    titulo: 'El material es un filtro,\nno parte del nombre',
    bajada:
      'Arriba de todo, los tres botones grandes: todas, kit básico, backlight. Es el filtro que más se usa, así que ocupa el lugar más visible.',
    puntos: [
      'La zona se llama por su geografía — CABA Cordón 3, Tucumán',
      'Una zona sola en vez de una por material',
      'La misma pantalla sirve para mirar el kit básico o los backlights',
      'Debajo, los filtros finos y un buscador por nombre de local o por código',
    ],
  },
  {
    id: 'etapas',
    eyebrow: '03',
    titulo: 'El selector de etapa',
    bajada:
      'El nombre de la etapa abre las últimas diez, con el total de cada una. Desde ahí se crea una etapa nueva o se pasa al listado completo, con las sesenta.',
    img: '/picnic/etapas.webp',
    alt: 'Selector de etapa desplegado sobre el listado completo',
    pie: 'El selector abierto, y detrás el listado completo.',
  },
  {
    id: 'zona',
    eyebrow: '04',
    titulo: 'Entrar a una zona\nsin perder la etapa',
    bajada:
      'Al tocar una zona se abre un panel encima. La etapa queda atrás, atenuada pero visible: se cierra el panel y se sigue donde se estaba.',
    puntos: [
      'En el kit básico se ve cómo salió cada material por separado',
      'En un backlight, que es un material único, sólo si la visita fue efectiva',
      'Y quién tiene asignado cada local',
    ],
    img: '/picnic/zona.webp',
    alt: 'Panel de la zona CABA Cordón 1 abierto sobre la etapa',
    pie: 'CABA Cordón 1, con sus catorce colocaciones cargadas.',
  },
  {
    id: 'local',
    eyebrow: '05',
    titulo: 'Y de la zona al local,\nsin cambiar de pantalla',
    bajada:
      'El local abre un tercer panel, más angosto, encima de los dos anteriores. Los tres niveles quedan escalonados: se ve dónde se está parado y se vuelve un paso atrás con un clic.',
    img: '/picnic/cascada.webp',
    alt: 'Los tres paneles escalonados: etapa, zona y local',
    pie: 'Etapa, zona y local. El de adelante es el que se está mirando.',
  },
  {
    id: 'prueba',
    eyebrow: '06',
    titulo: 'La prueba, completa',
    bajada: 'Adentro del local está todo lo que hace falta para decidir.',
    puntos: [
      'Las dos fotos',
      'Qué verificó el servidor: cuándo se tomaron, a qué distancia del local, si esa imagen se usó antes',
      'El resultado de la visita y quién la controló',
      'El colocador puede corregirla durante 7 días hábiles desde que la sube',
    ],
  },
  {
    id: 'rebrand',
    eyebrow: '07',
    titulo: 'Y el mismo local,\nen las etapas anteriores',
    bajada:
      'Abajo de la prueba aparece qué había antes en ese punto, etapa por etapa, con su fecha.',
    puntos: [
      'Permite juzgar una colocación contra lo que había, no contra una foto suelta',
      'Y hace posible armarle a PedidosYa un informe de rebranding con el antes y el después, sin trabajo extra',
    ],
  },
  {
    id: 'colocaciones',
    eyebrow: '08',
    titulo: 'Todas las colocaciones,\nen una lista',
    bajada:
      'Para cuando la pregunta no es por zona: qué falta, qué se rechazó, qué cargó una persona, qué es rebranding y qué es local nuevo.',
    img: '/picnic/colocaciones.webp',
    alt: 'Listado de todas las colocaciones de la etapa',
    pie: 'La lista completa, con el motivo en las que no fueron efectivas.',
  },
  {
    id: 'revision',
    eyebrow: '09',
    titulo: 'Revisar de corrido',
    bajada:
      'Revisar es mirar fotos, así que la pantalla se corre del medio: el menú se reduce a íconos, el fondo se oscurece y la imagen ocupa todo lo que puede.',
    puntos: [
      'Se aprueba o se rechaza con el teclado, y pasa sola a la siguiente',
      'El motivo sale de la lista cerrada de once que nos pasaron',
      'Y un comentario libre para lo extraordinario',
    ],
    img: '/picnic/corrector.webp',
    alt: 'Modo de revisión con el menú colapsado y el fondo oscuro',
    pie: 'La cola a la derecha, la foto en el centro, los motivos a mano.',
  },
  {
    id: 'campo',
    eyebrow: '10',
    titulo: 'Lo que ve el colocador\nen la calle',
    bajada: 'Desde el celular, y sólo lo suyo.',
    puntos: [
      'Lo que tiene que hacer hoy',
      'Lo que está esperando revisión',
      'Lo que le devolvió el coordinador, con el comentario escrito',
      'Su propio avance, sin los totales de nadie más',
    ],
    img: '/picnic/colocador.webp',
    alt: 'Pantalla del colocador en el teléfono',
    telefono: true,
    pie: 'Arranca por lo que hay que rehacer.',
  },
  {
    id: 'cliente',
    eyebrow: '11',
    titulo: 'Lo que ve PedidosYa',
    bajada:
      'Una vista propia, con su marca. El dato duro completo: qué se coloca, cuándo y dónde.',
    puntos: [
      'Lo único que no ven es quién — ni el colocador ni el coordinador aparecen en ninguna pantalla',
      'Y no es un filtro que se pueda esquivar: el recorte vive en la base de datos',
      'Pueden buscar un local y descargar informes',
      'Nada más: no aprueban, no comentan y no editan',
    ],
    img: '/picnic/cliente.webp',
    alt: 'Vista del cliente con el avance de la etapa',
    pie: 'Con su marca, el buscador y la descarga de informes.',
  },
  {
    id: 'definido',
    eyebrow: '12',
    titulo: 'Lo que ya quedó definido',
    bajada: 'Entre la reunión de arranque y sus respuestas, diez decisiones cerradas.',
    tabla: [
      { a: 'Ventana de corrección', b: '7 días hábiles desde que se sube el dato' },
      { a: 'La foto', b: 'Se admite la galería. La verificación corre en el servidor' },
      {
        a: 'El formulario',
        b: 'Saliente y sticker son del kit básico; en backlight, bicicletero y sombrilla no se completan',
      },
      { a: 'Motivos', b: 'Lista cerrada de once, más un comentario abierto' },
      { a: 'Qué ve PedidosYa', b: 'Todo el dato duro, nunca quién' },
      { a: 'El link de una zona', b: 'Queda abierto, sin vencimiento' },
      { a: 'El tercer material', b: 'Saliente. Se suman bicicletero y sombrilla' },
      { a: 'El código del local', b: 'Obligatorio, seis caracteres' },
      { a: 'El estado', b: 'Efectivo / no efectivo, y en el kit básico por material' },
      { a: 'El branding', b: 'Panel interno de Picnic, vista de cliente de PedidosYa' },
    ],
  },
  {
    id: 'pendiente',
    eyebrow: '13',
    titulo: 'Lo que necesitamos\nde ustedes',
    bajada: 'Nada de esto frena el trabajo de esta semana.',
    puntos: [
      '“No quiere o puede perforable” no está en la lista de once motivos, y hoy es de los que más se usan. ¿Queda afuera a propósito?',
      'La clave de una zona es una sola para toda la zona. ¿Querés además una clave por persona?',
      'El coordinador: hasta dónde llega su territorio y si asigna él o Picnic central',
      'Rebranding y locales nuevos: ¿los quieren ver separados en los informes?',
      'Una casilla a nombre de Picnic, del tipo plataforma@wearepicnic.com',
      'Los colores de Picnic, para el panel interno',
    ],
  },
  {
    id: 'cierre',
    portada: true,
    eyebrow: 'Fase 1 · entrega el 13 de octubre',
    titulo: 'Seguimos',
    bajada:
      'Con las respuestas de arriba arranca el Sprint 3. Cualquier cosa que quieran ver distinto, mejor ahora que después.',
    cifras: [
      { n: '5', l: 'Sprints, uno por semana' },
      { n: '13/10', l: 'Entrega de la Fase 1', acento: true },
      { n: '5', l: 'Días hábiles para observar' },
    ],
  },
]

function Cifras({ items }: { items: NonNullable<Slide['cifras']> }) {
  return (
    <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10 border-t border-[var(--marco-border)] pt-6 md:pt-8">
      {items.map((c) => (
        <div key={c.l}>
          <p
            className={`font-thunder text-3xl md:text-5xl leading-none ${
              c.acento ? 'text-[var(--marco-accent)]' : 'text-black'
            }`}
          >
            {c.n}
          </p>
          <span className="block text-xs uppercase tracking-wide text-black/50 mt-2">
            {c.l}
          </span>
        </div>
      ))}
    </div>
  )
}

function Lamina({ s, n, total }: { s: Slide; n: number; total: number }) {
  const conImagen = Boolean(s.img)
  return (
    <section
      id={s.id}
      className="deck-slide relative flex flex-col justify-center px-[7vw] md:px-[9vw] py-16 md:py-20"
    >
      {/* numeración */}
      <span className="absolute top-6 right-[7vw] md:right-[9vw] text-xs text-black/35 tabular-nums">
        {n} / {total}
      </span>

      {s.portada ? (
        <div className="max-w-4xl">
          {s.eyebrow && (
            <span className="font-thunder text-base md:text-2xl uppercase tracking-[0.08em] text-black">
              {s.eyebrow}
            </span>
          )}
          <h2 className="font-thunder text-[13vw] md:text-[7vw] leading-[0.88] uppercase text-[var(--marco-accent)] mt-3 whitespace-pre-line">
            {s.titulo}
          </h2>
          {s.bajada && (
            <p className="mt-6 md:mt-8 text-black/80 text-base md:text-xl max-w-2xl">
              {s.bajada}
            </p>
          )}
          {s.cifras && <Cifras items={s.cifras} />}
        </div>
      ) : (
        <div
          className={
            conImagen
              ? 'grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-8 lg:gap-12 items-center w-full'
              : 'max-w-3xl'
          }
        >
          <div>
            {s.eyebrow && (
              <span className="font-thunder text-sm uppercase tracking-[0.14em] text-[var(--marco-accent)]">
                {s.eyebrow}
              </span>
            )}
            <h2 className="font-thunder text-[8vw] md:text-4xl lg:text-[2.9rem] leading-[0.95] uppercase text-black mt-2 whitespace-pre-line">
              {s.titulo}
            </h2>
            {s.bajada && (
              <p className="mt-4 md:mt-5 text-black/80 text-[15px] md:text-lg max-w-xl">
                {s.bajada}
              </p>
            )}
            {s.puntos && (
              <ul className="mt-5 space-y-2 text-black/80 text-[14px] md:text-[15px] max-w-xl">
                {s.puntos.map((p) => (
                  <li key={p}>— {p}</li>
                ))}
              </ul>
            )}
            {s.tabla && (
              <div className="mt-5 border-t border-[var(--marco-border)]">
                {s.tabla.map((r) => (
                  <div
                    key={r.a}
                    className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] gap-4 py-2.5 border-b border-[var(--marco-border)]"
                  >
                    <span className="text-black/60 text-[13px] md:text-[14px]">{r.a}</span>
                    <span className="text-black text-[13px] md:text-[14px]">{r.b}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {conImagen && (
            <figure className={s.telefono ? 'justify-self-center' : ''}>
              <img
                src={s.img}
                alt={s.alt ?? ''}
                className={`w-full rounded-lg border border-[var(--marco-border)] ${
                  s.telefono ? 'deck-phone' : ''
                }`}
              />
              {s.pie && (
                <figcaption className="text-[12px] md:text-sm text-black/50 mt-3">
                  {s.pie}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      )}
    </section>
  )
}

export default function PicnicDeck() {
  const scroller = useRef<HTMLDivElement>(null)
  const [actual, setActual] = useState(0)

  // flechas, espacio, inicio y fin — para pasarlo en una pantalla
  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const ir = (i: number) => {
      const n = Math.max(0, Math.min(SLIDES.length - 1, i))
      el.scrollTo({ top: n * el.clientHeight, behavior: 'smooth' })
    }
    const onKey = (e: KeyboardEvent) => {
      const i = Math.round(el.scrollTop / el.clientHeight)
      if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault()
        ir(i + 1)
      } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        ir(i - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        ir(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        ir(SLIDES.length - 1)
      }
    }
    const onScroll = () => setActual(Math.round(el.scrollTop / el.clientHeight))
    window.addEventListener('keydown', onKey)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKey)
      el.removeEventListener('scroll', onScroll)
    }
  }, [])

  const avance = ((actual + 1) / SLIDES.length) * 100

  return (
    <div className="fixed inset-0 bg-[var(--marco-bg)]">
      {/* barra de avance */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-20 bg-black/5">
        <div
          className="h-full bg-[var(--marco-accent)] transition-[width] duration-300"
          style={{ width: `${avance}%` }}
        />
      </div>

      {/* firma */}
      <div className="absolute bottom-5 left-[7vw] md:left-[9vw] z-20 pointer-events-none">
        <MarcopoloLogo className="h-3 md:h-3.5 w-auto text-black/30" />
      </div>

      <div
        ref={scroller}
        className="deck-scroll h-full overflow-y-auto overscroll-y-contain"
      >
        {SLIDES.map((s, i) => (
          <Lamina key={s.id} s={s} n={i + 1} total={SLIDES.length} />
        ))}
      </div>

      <style>{`
        .deck-scroll { scroll-snap-type: y mandatory; -webkit-overflow-scrolling: touch; overflow-x: hidden; }
        /* en el teléfono cualquier palabra larga (un mail, un código) empuja la lámina
           a lo ancho y se pierde el margen derecho: que corte en vez de desbordar */
        .deck-slide { overflow-x: hidden; overflow-wrap: anywhere; }
        .deck-slide img { max-width: 100%; }
        /* la captura del teléfono es vertical: sin tope se come la lámina entera */
        .deck-slide img.deck-phone { max-width: 132px; }
        @media (min-width: 640px)  { .deck-slide img.deck-phone { max-width: 190px; } }
        @media (min-width: 1024px) { .deck-slide img.deck-phone { max-width: 240px; } }
        .deck-scroll::-webkit-scrollbar { width: 0; height: 0; }
        .deck-scroll { scrollbar-width: none; }
        .deck-slide {
          scroll-snap-align: start;
          scroll-snap-stop: always;
          height: 100%;
          min-height: 100%;
        }
        @media (max-height: 560px) and (orientation: landscape) {
          .deck-slide { padding-top: 3rem; padding-bottom: 3rem; }
        }
      `}</style>
    </div>
  )
}
