import { useEffect, useRef, useState } from 'react'
import MarcopoloLogo from '../components/MarcopoloLogo'

/**
 * Deck de Picnic — la misma propuesta de Fase 1, en formato presentación.
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
    eyebrow: 'Picnic BTL · Fase 1',
    titulo: 'Plataforma de\ngestión de campo',
    bajada:
      'El diseño de la plataforma, pantalla por pantalla. Está armado sobre la información que nos enviaron y se presenta para revisarlo antes de construirlo.',
    cifras: [
      { n: 'Fase 1', l: 'Alcance' },
      { n: 'Ocho', l: 'Pantallas' },
      { n: 'Cuatro', l: 'Roles' },
      { n: '13/10', l: 'Entrega', acento: true },
    ],
  },
  {
    id: 'etapa',
    eyebrow: '01',
    titulo: 'Vista general\nde la etapa',
    bajada:
      'La pantalla de inicio muestra la etapa completa, con todas sus zonas y el avance de cada una. No hace falta entrar y salir de una zona para entender cómo viene el conjunto.',
    puntos: [
      'Cuántas colocaciones tiene, cuántas de kit básico y cuántas de backlight',
      'Cuántas se cargaron y cuántas resultaron efectivas',
      'Quién responde por ella: coordinador y colocador, siempre visibles',
    ],
    img: '/picnic/zonas.webp',
    alt: 'Pantalla de zonas de la etapa',
    pie: 'Cada zona, con su avance y sus responsables.',
  },
  {
    id: 'material',
    eyebrow: '02',
    titulo: 'El material,\ncomo filtro',
    bajada:
      'Los tres botones principales —todas, kit básico, backlight— están arriba de todo, con el total de cada uno. Es el filtro de uso más frecuente.',
    puntos: [
      'La zona se identifica por su geografía: CABA Cordón 3, Tucumán',
      'Se trabaja con una zona en lugar de una por material',
      'La misma pantalla sirve para revisar kit básico o backlights',
      'Debajo, los filtros secundarios y un buscador por nombre o código de local',
    ],
  },
  {
    id: 'etapas',
    eyebrow: '03',
    titulo: 'Selector de etapa',
    bajada:
      'El nombre de la etapa despliega las últimas diez con su total. Desde ahí se crea una etapa nueva o se accede al listado completo.',
    img: '/picnic/etapas.webp',
    alt: 'Selector de etapa desplegado sobre el listado completo',
    pie: 'El selector desplegado, con el listado completo detrás.',
  },
  {
    id: 'zona',
    eyebrow: '04',
    titulo: 'Detalle de zona',
    bajada:
      'Al seleccionar una zona se abre un panel sobre la pantalla anterior. La vista de etapa queda atenuada detrás: al cerrar el panel se retoma en el mismo punto.',
    puntos: [
      'Los filtros principales son los de las colocaciones: estado y material',
      'Una zona puede tener varios colocadores: el desplegable es de selección múltiple',
      'En el kit básico se registra cada material por separado',
      'En backlight, que es un material único, sólo si la visita fue efectiva',
    ],
    img: '/picnic/zona.webp',
    alt: 'Panel de detalle de zona abierto sobre la vista de etapa',
    pie: 'Filtros de colocaciones arriba, y el desplegable de colocadores abierto.',
  },
  {
    id: 'local',
    eyebrow: '05',
    titulo: 'Detalle de local',
    bajada:
      'El local abre un tercer panel sobre los dos anteriores. Los tres niveles quedan escalonados, de modo que siempre se ve en qué punto de la jerarquía se está y se vuelve atrás con un clic.',
    img: '/picnic/cascada.webp',
    alt: 'Los tres paneles escalonados: etapa, zona y local',
    pie: 'Etapa, zona y local; adelante, el nivel activo.',
  },
  {
    id: 'prueba',
    eyebrow: '06',
    titulo: 'La acreditación,\ncompleta',
    bajada: 'Dentro del local está todo lo necesario para resolver la revisión.',
    puntos: [
      'Las dos fotos',
      'Las verificaciones del servidor: fecha de captura, distancia al local, si esa imagen se utilizó antes',
      'El resultado de la visita y quién lo controló',
      'El colocador puede corregir su carga durante 7 días hábiles desde que la sube',
    ],
  },
  {
    id: 'rebrand',
    eyebrow: '07',
    titulo: 'El mismo local,\nen etapas anteriores',
    bajada:
      'Debajo de la acreditación se listan las etapas previas de ese punto, con su fecha.',
    puntos: [
      'Permite evaluar una colocación contra su antecedente, no contra una foto aislada',
      'Y generar informes de rebranding con el antes y el después, sin trabajo adicional',
    ],
  },
  {
    id: 'colocaciones',
    eyebrow: '08',
    titulo: 'Listado\nde colocaciones',
    bajada:
      'Para las consultas que no se organizan por zona: qué falta, qué se rechazó, qué cargó una persona, qué corresponde a rebranding y qué a local nuevo.',
    img: '/picnic/colocaciones.webp',
    alt: 'Listado de todas las colocaciones de la etapa',
    pie: 'Listado completo, con el motivo en las colocaciones no efectivas.',
  },
  {
    id: 'revision',
    eyebrow: '09',
    titulo: 'Revisión\nde colocaciones',
    bajada:
      'La pantalla se reorganiza para mirar fotos: el menú se reduce a íconos, el fondo se oscurece y la imagen ocupa el máximo espacio disponible.',
    puntos: [
      'Se aprueba o se rechaza desde el teclado, y avanza automáticamente',
      'El motivo se toma de la lista cerrada de once que nos enviaron',
      'Más un campo de comentario libre para los casos excepcionales',
    ],
    img: '/picnic/corrector.webp',
    alt: 'Pantalla de revisión con el menú colapsado',
    pie: 'La cola a la derecha, la imagen en el centro, los motivos disponibles.',
  },
  {
    id: 'campo',
    eyebrow: '10',
    titulo: 'Aplicación\ndel colocador',
    bajada: 'Desde el celular, y acotada a su propio trabajo.',
    puntos: [
      'Las visitas del día',
      'Las que están esperando revisión',
      'Las que el coordinador devolvió, con su comentario',
      'Su propio avance, sin los totales de otros colocadores',
    ],
    img: '/picnic/colocador.webp',
    alt: 'Pantalla del colocador en el teléfono',
    telefono: true,
    pie: 'Ordena primero lo que hay que rehacer.',
  },
  {
    id: 'cliente',
    eyebrow: '11',
    titulo: 'Vista de PedidosYa',
    bajada:
      'Una vista propia, con su marca. Acceden al dato completo: qué se coloca, cuándo y dónde.',
    puntos: [
      'Lo único que no ven es quién: ni el colocador ni el coordinador aparecen en esta vista',
      'No es un filtro que pueda esquivarse: la restricción está en la base de datos',
      'Pueden buscar un local y descargar informes',
      'No aprueban, no comentan y no editan',
    ],
    img: '/picnic/cliente.webp',
    alt: 'Vista del cliente con el avance de la etapa',
    pie: 'Con su marca, buscador y descarga de informes.',
  },
  {
    id: 'definido',
    eyebrow: '12',
    titulo: 'Lo que ya quedó definido',
    bajada: 'Entre la reunión de arranque y sus respuestas, doce decisiones cerradas.',
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
      {
        a: 'El coordinador',
        b: 'Asigna colocadores a los locales de su célula. Las zonas las asigna Picnic',
      },
      { a: 'Rebranding y locales nuevos', b: 'Se distinguen en los informes' },
    ],
  },
  {
    id: 'pendiente',
    eyebrow: '13',
    titulo: 'Puntos a definir',
    bajada: 'Ninguno frena el trabajo de esta semana.',
    puntos: [
      'Motivos: “No quiere o puede perforable” no figura en la lista de once, y es de los que más aparecen en los registros anteriores. ¿Queda afuera a propósito o lo sumamos?',
      'El acceso para cargar hoy es un link por zona, no por persona: quien lo tiene abre todos los locales de esa zona y no queda registrado quién cargó. ¿Alcanza así, o cada colocador tiene su propio acceso y cada carga queda firmada?',
      'En saliente y sticker aparece un tercer valor, PENDIENTE, además de sí y no. ¿Qué significa en la operación?',
      'La etapa que está corriendo tiene locales cargados dos veces y filas con las columnas corridas. ¿Con cuál nos quedamos al importar?',
    ],
  },
  {
    id: 'cierre',
    portada: true,
    eyebrow: 'Fase 1 · entrega el 13 de octubre',
    titulo: 'Próximos pasos',
    bajada:
      'Con estas definiciones arranca el Sprint 3. Cualquier ajuste sobre lo presentado conviene plantearlo ahora.',
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
  // el índice también en un ref: si se pulsa la flecha mientras el scroll suave
  // todavía corre, calcularlo de scrollTop devuelve la lámina vieja y no avanza
  const indice = useRef(0)
  const respaldo = useRef(0)

  const irA = (i: number) => {
    const el = scroller.current
    if (!el) return
    const n = Math.max(0, Math.min(SLIDES.length - 1, i))
    const lamina = el.children[n] as HTMLElement | undefined
    if (!lamina) return
    indice.current = n
    setActual(n)

    // offsetTop real, no n * clientHeight: las láminas no miden todas lo mismo
    // —la de decisiones es más alta que la pantalla— y en el teléfono la barra
    // de Safari cambia la altura, así que el múltiplo deja de coincidir.
    const destino = lamina.offsetTop
    if (Math.abs(destino - el.scrollTop) < 2) return
    el.scrollTo({ top: destino, behavior: 'smooth' })

    // Red de seguridad: si el scroll suave no llegó —lo cancela un gesto, o el
    // navegador no lo anima—, se salta sin animación. Sin esto el índice avanza
    // y la pantalla no, que es justo cómo se ve una flecha muerta.
    window.clearTimeout(respaldo.current)
    respaldo.current = window.setTimeout(() => {
      if (indice.current === n && Math.abs(el.scrollTop - destino) > 4) {
        el.scrollTop = destino
      }
    }, 600)
  }

  useEffect(() => {
    const el = scroller.current
    if (!el) return

    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault()
        irA(indice.current + 1)
      } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        irA(indice.current - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        irA(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        irA(SLIDES.length - 1)
      }
    }

    // la lámina activa es la que está más cerca del borde de arriba, medida sobre
    // las posiciones reales — con láminas más altas que la pantalla no hay múltiplo
    let pedido = 0
    const onScroll = () => {
      if (pedido) return
      pedido = requestAnimationFrame(() => {
        pedido = 0
        const y = el.scrollTop
        let cerca = 0
        let dist = Infinity
        for (let k = 0; k < el.children.length; k++) {
          const d = Math.abs((el.children[k] as HTMLElement).offsetTop - y)
          if (d < dist) {
            dist = d
            cerca = k
          }
        }
        indice.current = cerca
        setActual(cerca)
      })
    }

    window.addEventListener('keydown', onKey)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKey)
      el.removeEventListener('scroll', onScroll)
      if (pedido) cancelAnimationFrame(pedido)
      window.clearTimeout(respaldo.current)
    }
  }, [])

  const avance = ((actual + 1) / SLIDES.length) * 100

  return (
    <div className="deck-marco bg-[var(--marco-bg)]">
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

      {/* flechas: la salida segura si un gesto no se registra */}
      <div className="absolute bottom-4 right-[7vw] md:right-[9vw] z-30 flex gap-2">
        <button
          type="button"
          aria-label="Lámina anterior"
          onClick={() => irA(indice.current - 1)}
          disabled={actual === 0}
          className="deck-nav"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
        </button>
        <button
          type="button"
          aria-label="Lámina siguiente"
          onClick={() => irA(indice.current + 1)}
          disabled={actual === SLIDES.length - 1}
          className="deck-nav"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </button>
      </div>

      <div ref={scroller} className="deck-scroll overscroll-y-contain">
        {SLIDES.map((s, i) => (
          <Lamina key={s.id} s={s} n={i + 1} total={SLIDES.length} />
        ))}
      </div>

      <style>{`
        /* El marco ocupa la pantalla visible. En el teléfono 100vh es la ventana
           "grande" (sin la barra de Safari), así que las láminas quedaban corridas
           respecto de lo que se ve: 100dvh sigue a la barra cuando aparece y se va. */
        .deck-marco { position: fixed; inset: 0; height: 100vh; height: 100dvh; }
        .deck-scroll {
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          scroll-snap-type: y proximity;
          -webkit-overflow-scrolling: touch;
        }
        .deck-scroll::-webkit-scrollbar { width: 0; height: 0; }
        .deck-scroll { scrollbar-width: none; }

        /* 🔴 La lámina NO lleva overflow propio. Poner overflow-x:hidden fuerza
           overflow-y a auto (regla de CSS: si uno no es visible, el otro deja de
           serlo), y entonces cada lámina más alta que la pantalla se convertía en
           su propio contenedor de scroll — el dedo movía ese, no el deck, y al
           llegar al final no encadenaba: ahí se trababa y no avanzaba ni volvía.
           Con height:auto la lámina crece y el scroll es siempre el del deck. */
        .deck-slide {
          scroll-snap-align: start;
          min-height: 100%;
          height: auto;
          overflow-wrap: anywhere;
        }
        .deck-slide img { max-width: 100%; }
        /* la captura del teléfono es vertical: sin tope se come la lámina entera */
        .deck-slide img.deck-phone { max-width: 132px; }
        @media (min-width: 640px)  { .deck-slide img.deck-phone { max-width: 190px; } }
        @media (min-width: 1024px) { .deck-slide img.deck-phone { max-width: 240px; } }

        .deck-nav {
          width: 34px; height: 34px; border-radius: 9999px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,.82); color: #1f2937;
          border: 1px solid rgba(0,0,0,.09);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .deck-nav:disabled { opacity: .3; }

        @media (max-height: 560px) and (orientation: landscape) {
          .deck-slide { padding-top: 3rem; padding-bottom: 3rem; }
        }
      `}</style>
    </div>
  )
}
