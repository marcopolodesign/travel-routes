import ScrollNav from '../components/ScrollNav'
import ContentBox from '../components/ContentBox'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'mes', label: 'El mes' },
  { id: 'comparativa', label: 'Julio vs agosto' },
  { id: 'campanas', label: 'Las tres campañas' },
  { id: 'writing', label: 'Garage Writing' },
  { id: 'demanda', label: 'Qué pidió la gente' },
  { id: 'embudo', label: 'Dónde está cada uno' },
  { id: 'inversion', label: 'La inversión' },
  { id: 'septiembre', label: 'Septiembre' },
  { id: 'tag', label: 'De TAG' },
]

/* ─────────────────────────────────────────────────────────────
   Piezas locales. Este documento va a columna completa: el
   título ocupa su propia fila y el contenido usa todo el ancho.
   ───────────────────────────────────────────────────────────── */

function Seccion({
  id,
  title,
  kicker,
  children,
}: {
  id: string
  title: string
  kicker?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mb-20 md:mb-28 scroll-mt-28">
      <div className="flex items-start gap-4 border-t border-[var(--marco-border)] pt-7 mb-7">
        <div
          className="w-1 self-stretch bg-[var(--marco-accent-light)] rounded flex-shrink-0"
          aria-hidden
        />
        <div>
          {kicker && (
            <span className="block text-xs uppercase tracking-wide text-black/50 mb-2">
              {kicker}
            </span>
          )}
          <h2 className="font-thunder text-3xl md:text-5xl uppercase text-[var(--marco-accent)] leading-[0.95] text-balance">
            {title}
          </h2>
        </div>
      </div>
      <div className="text-black space-y-5">{children}</div>
    </section>
  )
}

/** Párrafo de prosa: acotado para que se pueda leer, aunque la sección sea ancha. */
function P({ children, lead = false }: { children: React.ReactNode; lead?: boolean }) {
  return (
    <p className={`max-w-3xl text-black/80 ${lead ? 'text-lg md:text-xl' : 'text-[17px]'}`}>
      {children}
    </p>
  )
}

function Dato({
  label,
  valor,
  pie,
  acento = false,
}: {
  label: string
  valor: string
  pie?: string
  acento?: boolean
}) {
  return (
    <div className="border border-[var(--marco-border)] rounded-lg p-5">
      <span className="text-xs uppercase tracking-wide text-black/50">{label}</span>
      <p
        className={`font-thunder text-3xl md:text-4xl mt-1 leading-none ${
          acento ? 'text-[var(--marco-accent)]' : 'text-black'
        }`}
      >
        {valor}
      </p>
      {pie && <p className="text-[13px] text-black/50 mt-2">{pie}</p>}
    </div>
  )
}

/** Barra comparativa a todo el ancho — julio contra agosto. */
function Comparativa({
  label,
  julio,
  agosto,
  julioValor,
  agostoValor,
  max,
  variacion,
  mejor = 'mas',
}: {
  label: string
  julio: number
  agosto: number
  julioValor: string
  agostoValor: string
  max: number
  variacion: string
  mejor?: 'mas' | 'menos'
}) {
  const sube = mejor === 'mas' ? agosto > julio : agosto < julio
  return (
    <div className="border-t border-[var(--marco-border)] py-6 first:border-t-0">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <span className="font-thunder uppercase text-black text-lg">{label}</span>
        <span
          className={`font-thunder uppercase text-lg ${
            sube ? 'text-[var(--marco-accent)]' : 'text-black/40'
          }`}
        >
          {variacion}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <span className="w-14 text-xs uppercase tracking-wide text-black/40 flex-shrink-0">
            Julio
          </span>
          <div className="flex-1 h-6 bg-[var(--marco-bg)] rounded-sm overflow-hidden">
            <div
              className="h-full bg-[var(--marco-border)]"
              style={{ width: `${(julio / max) * 100}%` }}
            />
          </div>
          <span className="w-24 text-right text-[15px] text-black/60 flex-shrink-0 tabular-nums">
            {julioValor}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-14 text-xs uppercase tracking-wide text-black/60 flex-shrink-0">
            Agosto
          </span>
          <div className="flex-1 h-6 bg-[var(--marco-bg)] rounded-sm overflow-hidden">
            <div
              className="h-full bg-[var(--marco-accent)]"
              style={{ width: `${(agosto / max) * 100}%` }}
            />
          </div>
          <span className="w-24 text-right text-[15px] font-medium text-black flex-shrink-0 tabular-nums">
            {agostoValor}
          </span>
        </div>
      </div>
    </div>
  )
}

/** Una campaña, a todo el ancho: qué hace, qué costó y qué dejó. */
function Campana({
  nombre,
  destino,
  que,
  inversion,
  metricas,
  nota,
}: {
  nombre: string
  destino: string
  que: string
  inversion: string
  metricas: { label: string; valor: string }[]
  nota?: string
}) {
  return (
    <div className="border border-[var(--marco-border)] rounded-lg p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
        <div>
          <h3 className="font-thunder text-2xl md:text-3xl uppercase text-black leading-none">
            {nombre}
          </h3>
          <span className="text-xs uppercase tracking-wide text-black/50">{destino}</span>
        </div>
        <span className="font-thunder text-2xl md:text-3xl uppercase text-[var(--marco-accent)] leading-none">
          {inversion}
        </span>
      </div>
      <p className="text-black/80 text-[17px] max-w-3xl mb-6">{que}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 border-t border-[var(--marco-border)] pt-5">
        {metricas.map(m => (
          <div key={m.label}>
            <span className="text-xs uppercase tracking-wide text-black/50">{m.label}</span>
            <p className="font-thunder text-2xl text-black mt-1 leading-none">{m.valor}</p>
          </div>
        ))}
      </div>
      {nota && <p className="text-[15px] text-black/60 mt-5 max-w-3xl">{nota}</p>}
    </div>
  )
}

/** Barra horizontal de demanda por curso. */
function Curso({ nombre, n, max }: { nombre: string; n: number; max: number }) {
  return (
    <div className="flex items-center gap-4 py-2.5 border-t border-[var(--marco-border)] first:border-t-0">
      <span className="w-44 md:w-56 flex-shrink-0 text-[15px] text-black/80">{nombre}</span>
      <div className="flex-1 h-5 bg-[var(--marco-bg)] rounded-sm overflow-hidden">
        <div
          className={`h-full ${n === max ? 'bg-[var(--marco-accent)]' : 'bg-[var(--marco-accent-light)]'}`}
          style={{ width: `${(n / max) * 100}%` }}
        />
      </div>
      <span className="w-10 text-right text-[15px] text-black/60 flex-shrink-0 tabular-nums">
        {n}
      </span>
    </div>
  )
}

/** Un tramo del embudo. */
function Tramo({
  label,
  n,
  total,
  descripcion,
  tono = 'abierto',
}: {
  label: string
  n: number
  total: number
  descripcion: string
  tono?: 'abierto' | 'caliente' | 'cerrado'
}) {
  const color =
    tono === 'caliente'
      ? 'bg-[var(--marco-accent)]'
      : tono === 'cerrado'
        ? 'bg-[var(--marco-border)]'
        : 'bg-[var(--marco-accent-light)]'
  return (
    <div className="border-t border-[var(--marco-border)] pt-5 pb-1 first:border-t-0 first:pt-0">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-thunder uppercase text-black text-lg">{label}</span>
        <span
          className={`font-thunder text-2xl leading-none ${
            tono === 'caliente' ? 'text-[var(--marco-accent)]' : 'text-black'
          }`}
        >
          {n}
        </span>
      </div>
      <div className="h-2 bg-[var(--marco-bg)] rounded-sm overflow-hidden my-3">
        <div className={`h-full ${color}`} style={{ width: `${(n / total) * 100}%` }} />
      </div>
      <p className="text-[15px] text-black/60 max-w-3xl">{descripcion}</p>
    </div>
  )
}

const CURSOS = [
  { nombre: 'Garage Hybrid', n: 20 },
  { nombre: 'Garage New Generation', n: 4 },
  { nombre: 'Garage Kids y Mini Kids', n: 3 },
  { nombre: 'Garage Writing', n: 3 },
  { nombre: 'Garage Cinema', n: 2 },
  { nombre: 'Garage Classic', n: 1 },
  { nombre: 'Garage Workshop', n: 1 },
] as const

export default function TagAgostoCierre() {
  return (
    <>
      <ScrollNav items={NAV} />

      {/* ── Portada ───────────────────────────────────────────── */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          The Acting Garage · Meta · Agosto 2026
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Uno de cada dos
          <br />
          prospectos del mes
          <br />
          llegó por Meta
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-3xl">
          Agosto cerró con 57 personas nuevas hablando con la escuela desde los anuncios —
          más del doble que en julio— y con el coste de cada una a la mitad. La inversión
          subió un 25 %; los prospectos, un 148 %.
        </p>

        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Inversión</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">€441</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Personas alcanzadas</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">72.579</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Prospectos nuevos</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">57</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Coste por prospecto</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">€7,74</p>
          </div>
        </div>
      </div>

      {/* ── El mes ────────────────────────────────────────────── */}
      <Seccion id="mes" kicker="El resumen" title="Agosto en una línea: mismo dinero, el doble de gente">
        <P lead>
          En agosto la escuela recibió <strong>113 prospectos</strong> por todos los canales.
          De esos, <strong>57 llegaron por los anuncios de Meta</strong>: exactamente la mitad
          del mes. En julio habían sido 23.
        </P>
        <P>
          El salto no vino de gastar mucho más, sino de que las tres campañas encontraron su
          audiencia. Los anuncios se mostraron 200.209 veces a 72.579 personas distintas de
          Barcelona y alrededores —cada una los vio 2,8 veces de media— y generaron 4.603
          clics. Dos de cada cien personas que vieron un anuncio hicieron clic, cuando la
          referencia habitual del sector está en torno a uno.
        </P>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <Dato label="Impresiones" valor="200.209" pie="Veces que se mostró un anuncio" />
          <Dato label="Clics" valor="4.603" pie="CTR del 2,3 %" />
          <Dato label="Visitas a la web" valor="1.370" pie="A €0,08 cada una" />
          <Dato
            label="Coste por clic"
            valor="€0,10"
            pie="Se mantuvo bajo todo el mes"
            acento
          />
        </div>
        <P>
          A eso se suma lo que no se paga: 24.306 reproducciones del vídeo de la escuela, 790
          reacciones y 88 guardados. Gente que no hizo clic hoy, pero que vio el nombre de
          The Acting Garage y se lo guardó para después.
        </P>
      </Seccion>

      {/* ── Comparativa ───────────────────────────────────────── */}
      <Seccion id="comparativa" kicker="Julio contra agosto" title="El mes anterior, para tener con qué comparar">
        <P>
          Julio fue el primer mes completo de las campañas de adultos. Agosto es el primero
          con el presupuesto ya reordenado y con Garage Writing sumado. Esta es la diferencia.
        </P>
        <div className="mt-4">
          <Comparativa
            label="Inversión"
            julio={351.73}
            agosto={441.09}
            julioValor="€351,73"
            agostoValor="€441,09"
            max={441.09}
            variacion="+25 %"
          />
          <Comparativa
            label="Personas alcanzadas"
            julio={64920}
            agosto={72579}
            julioValor="64.920"
            agostoValor="72.579"
            max={72579}
            variacion="+12 %"
          />
          <Comparativa
            label="Prospectos nuevos"
            julio={23}
            agosto={57}
            julioValor="23"
            agostoValor="57"
            max={57}
            variacion="+148 %"
          />
          <Comparativa
            label="Coste por prospecto"
            julio={15.29}
            agosto={7.74}
            julioValor="€15,29"
            agostoValor="€7,74"
            max={15.29}
            variacion="−49 %"
            mejor="menos"
          />
        </div>
        <P>
          Es el dato que más importa del mes: cada persona nueva que se acercó a la escuela
          costó la mitad que en julio. Con el mismo presupuesto, agosto compró el doble de
          conversaciones.
        </P>
      </Seccion>

      {/* ── Las campañas ──────────────────────────────────────── */}
      <Seccion id="campanas" kicker="El detalle" title="Las tres campañas, una por una">
        <P>
          Cada una hace un trabajo distinto y se mide distinto. Juntas cubren los dos caminos
          por los que alguien entra a la escuela: escribir por WhatsApp o leer la web.
        </P>
        <div className="space-y-6 pt-2">
          <Campana
            nombre="Adultos · WhatsApp"
            destino="Barcelona y 20 km · Del anuncio a la conversación"
            inversion="€280,93"
            que="El anuncio abre directamente un chat con la escuela. Es el camino más corto que existe: la persona pregunta y alguien del equipo le responde. Por eso es la campaña que más presupuesto lleva y la que alimenta la mayor parte de la agenda de Florencia."
            metricas={[
              { label: 'Personas', valor: '48.169' },
              { label: 'Impresiones', valor: '135.956' },
              { label: 'Clics', valor: '2.822' },
              { label: 'Coste por clic', valor: '€0,10' },
            ]}
            nota="Las conversaciones que abre esta campaña se cuentan en el CRM de la escuela, que es donde se trabajan una por una — por eso el número que vale es el de prospectos, no el del panel de anuncios."
          />
          <Campana
            nombre="Adultos · Web"
            destino="Barcelona y 20 km · A la página de iniciación"
            inversion="€100,28"
            que="Lleva a la página de los cursos de iniciación, que es la puerta de entrada natural para alguien que nunca hizo teatro. Es la campaña más eficiente de las tres: consiguió 1.209 visitas a la web por poco más de cien euros."
            metricas={[
              { label: 'Personas', valor: '23.794' },
              { label: 'Visitas a la web', valor: '1.209' },
              { label: 'Coste por visita', valor: '€0,08' },
              { label: 'CTR', valor: '2,96 %' },
            ]}
            nota="Casi todos los que hacen clic llegan a ver la página: de 1.316 clics, 1.209 terminaron en una visita completa. La web carga rápido y la gente se queda."
          />
          <Campana
            nombre="Garage Writing"
            destino="Toda España · Online · Desde el 20 de agosto"
            inversion="€59,88"
            que="La campaña nueva del mes, para el curso de escritura de comedia. Al ser online se puede anunciar en toda España, no sólo en Barcelona, y eso abre un público que las otras dos no tocan."
            metricas={[
              { label: 'Personas', valor: '6.465' },
              { label: 'Solicitudes', valor: '5' },
              { label: 'Coste por solicitud', valor: '€11,98' },
              { label: 'Días activa', valor: '12' },
            ]}
            nota="Cinco solicitudes en doce días, con sesenta euros. Es la primera campaña de la escuela cuya conversión se cuenta sola, sin tener que cruzar nada a mano."
          />
        </div>
      </Seccion>

      {/* ── Writing ───────────────────────────────────────────── */}
      <ContentBox title="Garage Writing dejó algo más que cinco solicitudes" id="writing">
        <p className="text-black/80 text-[17px] max-w-3xl">
          Para lanzar esta campaña se puso un formulario en la propia página del curso. Quien
          lo rellena queda registrado con el curso que le interesa y con el anuncio del que
          vino, sin que nadie tenga que copiar nada.
        </p>
        <p className="text-black/80 text-[17px] max-w-3xl">
          Eso convierte a Garage Writing en el banco de pruebas de la escuela: es el primer
          curso donde se sabe, sin margen de duda, cuánto cuesta que alguien levante la mano.{' '}
          <strong>€11,98 por solicitud</strong> es la primera cifra real de esa serie, y es la
          referencia contra la que se van a medir los cursos que vengan.
        </p>
        <p className="text-[var(--marco-accent)] font-medium">
          El mismo formulario ya está montado en la ficha de Expert Cinema, la campaña de
          septiembre.
        </p>
      </ContentBox>

      {/* ── Demanda ───────────────────────────────────────────── */}
      <Seccion id="demanda" kicker="Qué pidieron" title="La demanda se concentra en Garage Hybrid">
        <P>
          De las 57 personas que llegaron por los anuncios, 34 dijeron desde el principio qué
          curso buscaban. Veinte de ellas preguntaron por Garage Hybrid — seis de cada diez.
        </P>
        <div className="border border-[var(--marco-border)] rounded-lg p-6 md:p-8 mt-2">
          {CURSOS.map(c => (
            <Curso key={c.nombre} nombre={c.nombre} n={c.n} max={20} />
          ))}
        </div>
        <P>
          Es una señal clara para septiembre: el anuncio que hable de Hybrid tiene el público
          ya formado, y los cursos de niños y adolescentes —New Generation, Kids— aparecen sin
          que ninguna campaña los esté empujando todavía. Hay demanda ahí esperando a que
          alguien la recoja.
        </P>
      </Seccion>

      {/* ── Embudo ────────────────────────────────────────────── */}
      <Seccion id="embudo" kicker="El estado de cada conversación" title="Dónde está hoy cada una de las 57">
        <P>
          Los cursos anuales arrancan en septiembre, así que agosto es el mes en el que la
          gente pregunta y compara. Las matrículas se firman después. Esta es la foto de esas
          57 conversaciones a día de hoy.
        </P>
        <div className="border border-[var(--marco-border)] rounded-lg p-6 md:p-8 space-y-5 mt-2">
          <Tramo
            label="En conversación"
            n={39}
            total={57}
            descripcion="Ya hablaron con la escuela y siguen el hilo abierto. Es el grueso del mes."
          />
          <Tramo
            label="Interesados"
            n={5}
            total={57}
            tono="caliente"
            descripcion="Pidieron precio, horario o plaza concreta. Son los que están a un paso de la matrícula: Garage Cinema, Garage Hybrid, Garage Kids y Hybrid Plus."
          />
          <Tramo
            label="Descartados"
            n={13}
            total={57}
            tono="cerrado"
            descripcion="No encajaban por horario, edad o ciudad. Sirven igual: marcan a quién conviene no mostrarle el anuncio."
          />
        </div>
        <P>
          <strong>44 de las 57 siguen vivas</strong>, que es lo que uno quiere ver al entrar en
          septiembre. Y el circuito ya cerró: las dos primeras matrículas de alumnos llegados
          por Meta se firmaron en los primeros días de septiembre, una de ellas de Garage
          Writing, el curso que se lanzó en agosto.
        </P>
      </Seccion>

      {/* ── Inversión ─────────────────────────────────────────── */}
      <Seccion id="inversion" kicker="En qué se fue el dinero" title="€441,09 repartidos entre tres frentes">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Dato label="Adultos · WhatsApp" valor="€280,93" pie="64 % del mes" />
          <Dato label="Adultos · Web" valor="€100,28" pie="23 % del mes" />
          <Dato label="Garage Writing" valor="€59,88" pie="13 % — sólo 12 días" />
        </div>
        <P>
          El reparto responde a lo que cada camino aporta: WhatsApp es el que trae volumen de
          conversaciones, la web es el más barato por visita, y Writing entró a mitad de mes
          con un presupuesto de prueba deliberadamente chico hasta ver cómo respondía.
        </P>
        <P>
          Puesto en relación con lo que la escuela cobra por un curso anual, el mes se paga
          con una sola matrícula. Agosto dejó 44 conversaciones abiertas por debajo de ocho
          euros cada una.
        </P>
      </Seccion>

      {/* ── Septiembre ────────────────────────────────────────── */}
      <Seccion id="septiembre" kicker="Lo que viene" title="Septiembre: entra Expert Cinema, presencial en Barcelona">
        <P>
          El plan para el mes que arranca mantiene las dos campañas de adultos, que son las que
          sostienen el volumen, y cambia la tercera.
        </P>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-[var(--marco-accent)] text-lg mb-3">
              Entra
            </p>
            <ul className="space-y-2 text-black/80 text-[15px]">
              <li>— Garage Expert Cinema, el curso anual para actores con formación, anunciado sólo en Barcelona porque es presencial.</li>
              <li>— Su propio formulario en la web, igual que el de Writing, para medir el coste por solicitud desde el primer día.</li>
              <li>— Se sostienen Adultos · WhatsApp y Adultos · Web, sin tocar presupuesto.</li>
            </ul>
          </div>
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-black/40 text-lg mb-3">No entra</p>
            <ul className="space-y-2 text-black/60 text-[15px]">
              <li>— Garage Writing deja de anunciarse: el curso ya arrancó y el presupuesto pasa a Expert Cinema.</li>
              <li>— No se sube la inversión total del mes.</li>
              <li>— Los cursos de niños y adolescentes quedan para más adelante, aunque la demanda ya asome.</li>
            </ul>
          </div>
        </div>
        <P>
          La decisión de fondo es la misma de agosto: una campaña ancha que trae conversaciones
          y una campaña de curso concreto que se puede medir al céntimo. Lo que se aprende con
          la segunda es lo que después afina a la primera.
        </P>
      </Seccion>

      {/* ── De TAG ────────────────────────────────────────────── */}
      <Seccion id="tag" kicker="Lo que necesitamos" title="Lo que hace falta de TAG">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-black text-lg mb-3">Los 5 interesados</p>
            <p className="text-[15px] text-black/80">
              Son los que están a un paso. Cerrarlos esta semana es lo que convierte agosto en
              matrículas de septiembre.
            </p>
          </div>
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-black text-lg mb-3">Material de Expert Cinema</p>
            <p className="text-[15px] text-black/80">
              Una o dos fotos o un vídeo corto de una clase o un rodaje del curso. El anuncio
              rinde bastante más con material propio que con una imagen general.
            </p>
          </div>
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-black text-lg mb-3">Marcar el estado en el CRM</p>
            <p className="text-[15px] text-black/80">
              Cada prospecto que se matricula o se descarta, anotado. Es lo que permite decir
              cuánto cuesta un alumno, no sólo una conversación.
            </p>
          </div>
        </div>
        <P>
          Con eso, el informe de septiembre ya no habla de coste por prospecto sino de coste
          por alumno matriculado, que es la cifra que de verdad decide cuánto conviene invertir.
        </P>
      </Seccion>
    </>
  )
}
