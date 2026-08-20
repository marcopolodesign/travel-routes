import ContentBox from '../components/ContentBox'
import TwoColumnSection from '../components/TwoColumnSection'
import BoxedListSection from '../components/BoxedListSection'
import Timeline from '../components/Timeline'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'punto', label: 'Punto de partida' },
  { id: 'objetivo', label: 'Objetivo' },
  { id: 'campanas', label: 'Las campañas' },
  { id: 'creatividades', label: 'Creatividades' },
  { id: 'audiencia', label: 'Audiencia' },
  { id: 'inversion', label: 'Inversión' },
  { id: 'medicion', label: 'Qué medimos' },
  { id: 'alcance', label: 'Alcance' },
  { id: 'plan', label: 'Plan' },
  { id: 'senda', label: 'De Senda' },
]

const BASE = 'https://senda-arq.com'

/** Las cinco piezas visuales que entran en la rotación. */
const PIEZAS = [
  {
    id: 'movimiento',
    src: `${BASE}/obras/LARES%20DE%20CANNING%2069/IMG_3226-Post%201.webp`,
    obra: 'Lares de Canning 69',
    pie: 'Alguien subiendo la escalera — la casa en uso, no vacía',
  },
  {
    id: 'fachada',
    src: `${BASE}/obras/LOS%20LAGARTOS%20CC%20F42/DSC09934-Editar%20-%20Post%202.webp`,
    obra: 'Los Lagartos CC F42',
    pie: 'La casa entera, de afuera: hormigón, madera y vidrio',
  },
  {
    id: 'interior',
    src: `${BASE}/obras/LOS%20LAGARTOS%20CC%20F42/DSC00005-Editar%20-%20Post%202.webp`,
    obra: 'Los Lagartos CC F42',
    pie: 'El living y la escalera vistos desde el comedor',
  },
  {
    id: 'patio',
    src: `${BASE}/obras/PILARA,%20CALESA%20594/364A0525-Post1.webp`,
    obra: 'Pilará, Calesa 594',
    pie: 'El patio central con el árbol, desde el ingreso',
  },
] as const

const VIDEO = {
  src: `${BASE}/docs/ads-assets/senda-recorrido-15s.mp4`,
  poster: `${BASE}/docs/ads-assets/senda-recorrido-poster.jpg`,
  obra: 'Recorrido — 15 segundos',
  pie: 'Recorte vertical del video del sitio, sin audio',
}

const TITULOS = [
  { id: 'A', angulo: 'Conceptual', texto: 'Arquitectura que se habita, no se decora' },
  { id: 'B', angulo: 'Práctico', texto: 'Casas y reformas en Zona Norte' },
] as const

const TEXTOS = [
  {
    id: '1',
    texto:
      'Diseñamos casas donde la luz, la madera y el hormigón conviven. Cada proyecto pensado alrededor de un recorrido, no de un plano.',
  },
  {
    id: '2',
    texto:
      'Proyecto, dirección de obra y reformas integrales. Desde 2011 proyectando en countries de Zona Norte. Mirá las obras terminadas.',
  },
] as const

/** Anuncio completo, como se ve en el feed. */
function AdCard({
  pieza,
  titulo,
  texto,
  cta = 'Ver las obras →',
}: {
  pieza: { src: string; obra: string; pie?: string; poster?: string }
  titulo: (typeof TITULOS)[number]
  texto: (typeof TEXTOS)[number]
  cta?: string
}) {
  const esVideo = pieza.src.endsWith('.mp4')
  return (
    <div className="border border-[var(--marco-border)] rounded-lg overflow-hidden bg-white">
      {esVideo ? (
        <video
          className="w-full aspect-[1.91/1] object-cover bg-neutral-200"
          src={pieza.src}
          poster={pieza.poster}
          muted
          loop
          playsInline
          autoPlay
        />
      ) : (
        <div
          className="aspect-[1.91/1] bg-neutral-200 bg-cover bg-center"
          style={{ backgroundImage: `url("${pieza.src}")` }}
        />
      )}
      <div className="p-5">
        <span className="inline-block text-[11px] uppercase tracking-wide font-thunder text-[var(--marco-accent)] mb-2">
          {titulo.angulo}
        </span>
        <p className="font-thunder text-xl uppercase text-black leading-tight mb-2">
          {titulo.texto}
        </p>
        <p className="text-[15px] text-black/70 leading-relaxed mb-3">{texto.texto}</p>
        <p className="text-[13px] text-black/50">
          {pieza.obra} · <span className="text-black/80 font-medium">{cta}</span>
        </p>
      </div>
    </div>
  )
}

/** Versión compacta, para mostrar la grilla completa sin que sea interminable. */
function AdMini({
  pieza,
  titulo,
  texto,
}: {
  pieza: { src: string; obra: string; poster?: string }
  titulo: (typeof TITULOS)[number]
  texto: (typeof TEXTOS)[number]
}) {
  const esVideo = pieza.src.endsWith('.mp4')
  return (
    <div className="border border-[var(--marco-border)] rounded-md overflow-hidden bg-white">
      {esVideo ? (
        <video
          className="w-full aspect-[4/5] object-cover bg-neutral-200"
          src={pieza.src}
          poster={pieza.poster}
          muted
          loop
          playsInline
          autoPlay
        />
      ) : (
        <div
          className="aspect-[4/5] bg-neutral-200 bg-cover bg-center"
          style={{ backgroundImage: `url("${pieza.src}")` }}
        />
      )}
      <div className="p-3">
        <p className="font-thunder text-[13px] uppercase text-black leading-tight mb-1">
          {titulo.texto}
        </p>
        <p className="text-[12px] text-black/60 leading-snug line-clamp-3">{texto.texto}</p>
      </div>
    </div>
  )
}

export default function SendaAdsMes1() {
  return (
    <>
      <ScrollNav items={NAV} />

      {/* Cover */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          Meta Ads · Senda Arquitectura
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Mes 1<br />Salir a<br />la cancha
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          El primer mes no busca cerrar una obra — busca aprender dos cosas que después valen
          para todos los meses siguientes: por dónde entra mejor la gente de Zona Norte, y qué
          manera de contar a Senda le habla más. Todo lo demás se construye sobre eso.
        </p>
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Duración</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">4 semanas</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Inversión</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">
              U$8 / día
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Anuncios</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">20 versiones</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Zona</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Norte + CABA</p>
          </div>
        </div>
      </div>

      {/* Punto de partida */}
      <TwoColumnSection title="De dónde partimos" id="punto">
        <p className="text-lg">
          La infraestructura ya está lista. La cuenta publicitaria, el pixel midiendo en
          senda-arq.com, el perfil de Instagram conectado y el aviso automático por mail cada vez
          que alguien deja una consulta en la web.
        </p>
        <p>
          Eso importa más de lo que parece: significa que desde el primer peso invertido vamos a
          saber de dónde vino cada persona, qué obra miró y qué anuncio la trajo. Sin esa base,
          un mes de pauta deja impresiones y poco más.
        </p>
      </TwoColumnSection>

      {/* Objetivo */}
      <BoxedListSection
        id="objetivo"
        title="Qué resuelve este mes"
        subtitle="Tres preguntas concretas, en orden de valor para el estudio."
        items={[
          'Por dónde entra mejor la gente: ¿mirando las obras en la web, o conociendo el estudio desde Instagram? Los dos caminos corren en paralelo y con el mismo presupuesto.',
          'Qué manera de contar a Senda funciona: la mirada conceptual sobre cómo se habita un espacio, o la directa que nombra los servicios (casas, reformas, dirección de obra).',
          'Cuánto cuesta traer a una persona interesada de Zona Norte, que es el número sobre el que se decide todo lo que viene después.',
        ]}
      />

      {/* Las campañas */}
      <TwoColumnSection title="Las dos campañas" id="campanas">
        <p className="text-lg">
          Corren al mismo tiempo, con el mismo dinero y las mismas creatividades. La única
          diferencia es a dónde llevan a la persona que hace clic. Así la comparación es limpia.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-[var(--marco-accent)] text-lg mb-1">
              A · Las obras
            </p>
            <p className="text-sm text-black/50 mb-4">U$4 / día</p>
            <p className="text-black/80 text-[15px] leading-relaxed">
              Lleva al portfolio de senda-arq.com, a ver las siete casas terminadas con calma. Es
              el camino de quien está evaluando en serio: mira las obras, lee las superficies,
              entra a un proyecto y escribe.
            </p>
          </div>
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-[var(--marco-accent)] text-lg mb-1">
              B · El estudio
            </p>
            <p className="text-sm text-black/50 mb-4">U$4 / día</p>
            <p className="text-black/80 text-[15px] leading-relaxed">
              Lleva al perfil de Instagram, a que la persona conozca al estudio y lo siga. Es el
              camino largo: alguien que hoy no está para arrancar una obra, pero que ve el trabajo
              cada semana hasta que le llega el momento.
            </p>
          </div>
        </div>
        <p className="text-sm text-black/60">
          A fin de mes uno de los dos va a ser claramente más barato por persona interesada. Ese
          se queda con el presupuesto del mes siguiente.
        </p>
      </TwoColumnSection>

      {/* Creatividades */}
      <div id="creatividades" className="mb-20 md:mb-28 scroll-mt-28">
        <h3 className="font-thunder text-2xl md:text-3xl uppercase text-black mb-3">
          Las creatividades
        </h3>
        <p className="text-black/80 max-w-2xl mb-8 md:mb-10">
          Cinco piezas visuales y dos maneras de contar el estudio. Meta las combina entre sí y le
          muestra a cada persona la que mejor le responde — no hay que elegir una sola y descartar
          el resto.
        </p>

        {/* Las piezas */}
        <p className="font-thunder uppercase text-black text-lg mb-4">Las piezas</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {PIEZAS.map((p) => (
            <div key={p.id}>
              <div
                className="aspect-[4/5] rounded-md bg-neutral-200 bg-cover bg-center border border-[var(--marco-border)]"
                style={{ backgroundImage: `url("${p.src}")` }}
              />
              <p className="text-[12px] text-black/70 mt-2 leading-snug">{p.pie}</p>
              <p className="text-[11px] text-black/40">{p.obra}</p>
            </div>
          ))}
          <div>
            <video
              className="w-full aspect-[4/5] rounded-md object-cover bg-neutral-200 border border-[var(--marco-border)]"
              src={VIDEO.src}
              poster={VIDEO.poster}
              muted
              loop
              playsInline
              autoPlay
            />
            <p className="text-[12px] text-black/70 mt-2 leading-snug">{VIDEO.pie}</p>
            <p className="text-[11px] text-black/40">{VIDEO.obra}</p>
          </div>
        </div>

        {/* Los dos ángulos */}
        <p className="font-thunder uppercase text-black text-lg mb-4">Los dos ángulos</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {TITULOS.map((t, i) => (
            <div key={t.id} className="border border-[var(--marco-border)] rounded-lg p-6">
              <span className="inline-block text-[11px] uppercase tracking-wide font-thunder text-[var(--marco-accent)] mb-2">
                {t.angulo}
              </span>
              <p className="font-thunder text-xl uppercase text-black leading-tight mb-3">
                {t.texto}
              </p>
              <p className="text-[15px] text-black/70 leading-relaxed">{TEXTOS[i].texto}</p>
            </div>
          ))}
        </div>

        {/* Ejemplos en tamaño real */}
        <p className="font-thunder uppercase text-black text-lg mb-1">Cómo se ven en el feed</p>
        <p className="text-black/60 text-[15px] mb-4 max-w-2xl">
          Dos ejemplos en tamaño real: la misma foto puede salir con cualquiera de los dos ángulos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <AdCard pieza={PIEZAS[0]} titulo={TITULOS[0]} texto={TEXTOS[0]} />
          <AdCard pieza={PIEZAS[1]} titulo={TITULOS[1]} texto={TEXTOS[1]} />
        </div>

        {/* La grilla completa */}
        <p className="font-thunder uppercase text-black text-lg mb-1">
          Las veinte versiones que van a salir
        </p>
        <p className="text-black/60 text-[15px] mb-5 max-w-2xl">
          Cinco piezas × dos títulos × dos textos. Todas se cargan juntas y Meta reparte la
          inversión sola: en los primeros días muestra de todo, y a medida que aprende concentra
          el dinero en las que mejor responden.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {[...PIEZAS, VIDEO].map((pieza) =>
            TITULOS.map((titulo, i) => (
              <AdMini
                key={`${'id' in pieza ? pieza.id : 'video'}-${titulo.id}`}
                pieza={pieza}
                titulo={titulo}
                texto={TEXTOS[i]}
              />
            ))
          )}
        </div>
        <p className="text-sm text-black/60 mt-5 max-w-2xl">
          La grilla muestra las diez combinaciones de pieza y ángulo. Cada una además rota entre
          los dos textos, lo que da las veinte versiones finales.
        </p>
      </div>

      {/* Audiencia */}
      <ContentBox title="A quién le hablamos" id="audiencia">
        <p>
          Personas de 25 a 65 años en <strong>Pilar, Tigre, Escobar, San Isidro, Vicente López y
          Capital</strong>, con interés declarado en arquitectura, diseño de interiores,
          remodelaciones o mercado inmobiliario.
        </p>
        <p>
          Sobre esa base, Meta expande hacia perfiles parecidos a los que van respondiendo. Es
          decir: la audiencia del mes 2 va a estar afinada por lo que efectivamente pasó en el mes
          1, no por lo que supusimos al arrancar.
        </p>
        <p className="text-sm text-black/60">
          No segmentamos por barrio cerrado puntual: en Zona Norte hay demasiados y encasillaría
          la campaña antes de tener datos.
        </p>
      </ContentBox>

      {/* Inversión */}
      <ContentBox title="Inversión del mes" id="inversion">
        <div className="flex flex-col gap-6 mb-6">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/60">Pauta — Campaña A (obras)</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">U$4 / día</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/60">Pauta — Campaña B (estudio)</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">U$4 / día</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/60">Total del mes</span>
            <p className="font-thunder text-3xl md:text-5xl text-[var(--marco-accent)] mt-1">
              U$240 / mes
            </p>
            <p className="text-sm text-black/60 mt-1">
              Dentro del rango de arranque acordado (U$200–300), dejando margen para subir sobre
              lo que funcione sin renegociar el presupuesto.
            </p>
          </div>
        </div>
        <p>
          La pauta se paga directo a Meta y no está incluida en la gestión mensual. El presupuesto
          es diario: si un día no se gasta entero, no se pierde — se redistribuye.
        </p>
      </ContentBox>

      {/* Medición */}
      <TwoColumnSection title="Qué vamos a medir" id="medicion">
        <p className="text-lg">
          El informe de fin de mes responde estas preguntas, con números y no con impresiones.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-[var(--marco-accent)] text-lg mb-3">
              De la pauta
            </p>
            <ul className="space-y-2 text-black/80 text-[15px]">
              <li>— Cuánta gente vio y cuánta entró</li>
              <li>— Costo por persona que llega a las obras</li>
              <li>— Qué título y qué foto ganaron</li>
              <li>— Web contra Instagram, lado a lado</li>
            </ul>
          </div>
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-black/40 text-lg mb-3">Del estudio</p>
            <ul className="space-y-2 text-black/60 text-[15px]">
              <li>— Consultas recibidas por el formulario</li>
              <li>— Consultas por WhatsApp</li>
              <li>— Qué obra fue la más mirada</li>
              <li>— Seguidores nuevos en Instagram</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-black/60">
          Cada consulta que entra por la web llega al mail del estudio en el momento, con el
          nombre, el tipo de proyecto y el mensaje — no hay que entrar a ningún panel a buscarla.
        </p>
      </TwoColumnSection>

      {/* Alcance */}
      <TwoColumnSection title="Qué entra y qué no" id="alcance">
        <p className="text-lg">
          Para que el mes 1 sea una lectura limpia y no una mezcla de variables, el borde es
          explícito.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-[var(--marco-accent)] text-lg mb-3">Entra</p>
            <ul className="space-y-2 text-black/80 text-[15px]">
              <li>— Las dos campañas en paralelo</li>
              <li>— Las veinte versiones de anuncio</li>
              <li>— Medición punta a punta con el pixel</li>
              <li>— Aviso por mail de cada consulta</li>
              <li>— Informe de cierre con la recomendación del mes 2</li>
            </ul>
          </div>
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-black/40 text-lg mb-3">No entra</p>
            <ul className="space-y-2 text-black/60 text-[15px]">
              <li>— Los videos con dueños contando su obra (mes 2)</li>
              <li>— La campaña de reformas a WhatsApp (necesita el número conectado)</li>
              <li>— Google Ads (es la extensión opcional)</li>
              <li>— Contenido orgánico de Instagram (es otro servicio)</li>
            </ul>
          </div>
        </div>
      </TwoColumnSection>

      {/* Plan */}
      <div id="plan" className="mb-20 md:mb-28 scroll-mt-28">
        <p className="text-black/80 max-w-2xl mb-10 md:mb-14">
          Cuatro semanas. Las dos primeras son de aprendizaje del algoritmo — los números de esos
          días todavía no son representativos y conviene no sacar conclusiones. A partir de la
          tercera empieza a estabilizarse.
        </p>
        <Timeline
          title="Plan del mes"
          steps={[
            {
              label: 'Semana 1',
              items: [
                'Encendido de las dos campañas',
                'Control diario de entrega y primeros costos',
                'Ajuste de audiencia si algo entrega mal',
              ],
            },
            {
              label: 'Semana 2',
              items: [
                'Primera lectura de qué título y qué foto rinden',
                'Se apaga la combinación que claramente no funciona',
                'Revisión del recorrido en la web con datos reales',
              ],
            },
            {
              label: 'Semana 3',
              items: [
                'Comparación web contra Instagram con volumen suficiente',
                'Reasignación de presupuesto hacia el que rinde',
                'Preparación de las creatividades del mes 2',
              ],
            },
            {
              label: 'Semana 4',
              items: [
                'Informe de cierre con los números del mes',
                'Recomendación concreta para el mes 2',
                'Definición de la obra para el video de reformas',
              ],
            },
          ]}
        />
      </div>

      {/* De Senda */}
      <BoxedListSection
        id="senda"
        title="Lo que necesitamos de Senda"
        subtitle="Poco, pero destraba lo que hoy no puede arrancar."
        items={[
          'El número de WhatsApp del estudio conectado a la página de Facebook — es lo único que falta para que la campaña de reformas pueda salir.',
          'Definir qué obra usamos para el video de antes y después: el portfolio actual son casas nuevas, y para reformas necesitamos una remodelación que se pueda mostrar.',
          'Que alguien del estudio responda las consultas dentro de las 24 horas. En este rubro la velocidad de respuesta pesa más que el presupuesto de pauta.',
        ]}
      />
    </>
  )
}
