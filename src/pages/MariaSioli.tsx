import ContentBox from '../components/ContentBox'
import BoxedListSection from '../components/BoxedListSection'
import TwoColumnSection from '../components/TwoColumnSection'
import PriceBlock from '../components/PriceBlock'
import Timeline from '../components/Timeline'
import ScrollReveal from '../components/ScrollReveal'

const ROADMAP_STEPS = [
  {
    label: 'Semanas 1–2',
    items: [
      'Relevamiento de obras, fotos y textos del estudio',
      'Diseño de Home, Proyectos, ficha de proyecto, Estudio y Contacto',
      'Una ronda de ajustes sobre el diseño antes de construir',
    ],
  },
  {
    label: 'Semanas 3–4',
    items: [
      'Desarrollo del sitio, versión escritorio y celular',
      'Panel de administración para cargar y ordenar obras',
      'Animaciones de entrada y transiciones entre páginas',
    ],
  },
  {
    label: 'Semana 5',
    items: [
      'Carga de las obras con sus fotos optimizadas',
      'Posicionamiento en Google: títulos, descripciones y vista al compartir',
      'Revisión completa con el estudio',
    ],
  },
  {
    label: 'Semana 6',
    items: [
      'Salida al aire en el dominio del estudio',
      'Capacitación de 30 minutos para usar el panel',
      'Ajustes finos sobre el sitio publicado',
    ],
  },
]

const PAGES = [
  {
    name: 'Home',
    body: 'Presentación del estudio en una línea, un carrusel de obras a pantalla completa y la grilla de proyectos destacados. Todo editable desde el panel.',
  },
  {
    name: 'Proyectos',
    body: 'La grilla en mosaico que combina formatos verticales y horizontales, con filtro por tipología y por año.',
  },
  {
    name: 'Ficha de proyecto',
    body: 'Una página por obra: imagen principal, datos duros (ubicación, año, superficie, tipología, estado), texto y la secuencia de fotos. Al final, la obra siguiente.',
  },
  {
    name: 'Estudio',
    body: 'Quién está detrás del estudio y cómo trabaja. La voz del estudio contada con la misma calma que la obra.',
  },
  {
    name: 'Contacto',
    body: 'Formulario que llega por mail al instante, botón de WhatsApp, dirección y redes. Cada consulta queda registrada en el panel.',
  },
]

export default function MariaSioli() {
  return (
    <>
      {/* Cover */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          María Sioli · Sitio web
        </span>
        <h1 className="font-thunder text-[13vw] md:text-[6.5vw] leading-[0.92] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Un sitio que se<br />recorre como<br />una obra
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          Un sitio nuevo para el estudio de María Sioli donde la fotografía de obra manda y el texto
          acompaña. Con un panel propio para que el estudio sume proyectos sin depender de nadie.
        </p>
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Plazo</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">5 a 6 semanas</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Páginas</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">5 + una por obra</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Panel de carga</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Incluido</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Versión</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Escritorio y celular</p>
          </div>
        </div>
      </div>

      <ScrollReveal>
        <ContentBox title="Visión general" border={false}>
          <p>
            Un estudio de arquitectura se muestra por su obra, y la obra ya habla sola.{' '}
            <strong>El sitio tiene que dejarla hablar</strong> — fotos grandes, mucho aire y una
            estructura que no compita con la arquitectura.
          </p>
          <p>
            La propuesta sigue la estructura que ya construimos para{' '}
            <strong>Senda Arquitectura</strong> (senda-arq.com): un sitio público rápido y cuidado
            en cada transición, y detrás un panel donde el estudio carga sus obras, ordena la
            grilla y cambia textos e imágenes sin tocar código.
          </p>
        </ContentBox>

        <section className="mb-20 md:mb-28 scroll-mt-28">
          <h2 className="font-thunder text-2xl md:text-3xl lg:text-4xl uppercase text-[var(--marco-accent)] mb-8">
            Estructura del sitio
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAGES.map((p, i) => (
              <div key={p.name} className="border border-[var(--marco-border)] rounded-lg p-6">
                <span className="text-xs uppercase tracking-wide text-black/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-thunder uppercase text-black text-2xl mt-1 mb-3">{p.name}</p>
                <p className="text-black/80 text-[15px]">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <TwoColumnSection title="El panel del estudio" withBar={false}>
          <p>
            El mismo panel que usa Senda, adaptado al estudio. Entra quien el estudio decida, con
            usuario y contraseña.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Obras.</strong> Alta de un proyecto nuevo con sus datos y fotos; se publica
              cuando el estudio lo decide.
            </li>
            <li>
              <strong>Orden de la grilla.</strong> Qué obras van en la Home y en qué orden, y qué
              formato toma cada una en el mosaico.
            </li>
            <li>
              <strong>Carrusel y textos.</strong> Las imágenes de portada y los textos de cada
              página se cambian desde ahí.
            </li>
            <li>
              <strong>Fotos livianas, sin pensar.</strong> Se suben tal cual salen del fotógrafo;
              el sistema las achica y las optimiza para que el sitio cargue rápido.
            </li>
            <li>
              <strong>Consultas.</strong> Todo lo que llega por el formulario queda guardado, con
              fecha y origen.
            </li>
          </ul>
        </TwoColumnSection>

        <section className="mb-20 md:mb-28">
          <h2 className="font-thunder text-2xl md:text-3xl lg:text-4xl uppercase text-[var(--marco-accent)] mb-8">
            Roadmap y timeline
          </h2>
          <div className="rounded-lg bg-[var(--marco-bg)] p-6 md:p-10">
            <Timeline title="Seis semanas, de la primera pantalla al aire" steps={ROADMAP_STEPS} />
          </div>
        </section>

        <ContentBox title="Cómo se lee este presupuesto" border={false}>
          <p>
            El valor se presenta con un <strong>piso y un techo</strong>. El piso es lo que cuesta
            el sitio con el alcance tal como está definido hoy; el techo es hasta dónde puede
            estirarse si aparecen más páginas o más obras de las previstas.
          </p>
          <p>
            Cuando nos acercamos al techo, <strong>avisamos antes de llegar</strong> y se decide en
            conjunto si se sigue o se recorta. Los adicionales se contratan por separado, en el
            momento o más adelante con el sitio ya publicado.
          </p>
        </ContentBox>

        <PriceBlock
          title="Sitio web + panel del estudio"
          meta="5 a 6 semanas · diseño, desarrollo, carga inicial y salida al aire"
          amount="$3,500 – $4,500"
          border={false}
        >
          <p>
            Diseño y desarrollo de las cinco páginas y la ficha de proyecto, versión escritorio y
            celular, con las animaciones y transiciones del sitio. Incluye el panel de
            administración, el formulario de contacto con aviso por mail y WhatsApp, y el
            posicionamiento básico en Google.
          </p>
          <p>
            Incluye la <strong>carga inicial de hasta 20 obras</strong> con el material que envíe el
            estudio, y una capacitación para que el equipo cargue las siguientes por su cuenta.
          </p>
        </PriceBlock>

        <section className="mb-20 md:mb-28 scroll-mt-28">
          <h2 className="font-thunder text-2xl md:text-3xl lg:text-4xl uppercase text-[var(--marco-accent)] mb-3">
            Dos formas de pago
          </h2>
          <p className="text-black/80 max-w-2xl mb-8">El estudio elige la que le quede más cómoda.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border border-[var(--marco-border)] rounded-lg p-6">
              <p className="font-thunder uppercase text-black text-2xl mb-1">En dos pagos</p>
              <p className="font-thunder text-4xl md:text-5xl text-[var(--marco-accent)] leading-none mt-3 mb-5">
                $3,500 – $4,500
              </p>
              <ul className="space-y-2 text-black/80 text-[15px]">
                <li>— 50% al inicio del proyecto</li>
                <li>— 50% a la salida al aire</li>
              </ul>
            </div>
            <div className="border border-[var(--marco-border)] rounded-lg p-6">
              <p className="font-thunder uppercase text-black text-2xl mb-1">En cuatro pagos</p>
              <p className="font-thunder text-4xl md:text-5xl text-[var(--marco-accent)] leading-none mt-3 mb-5">
                $3,850 – $4,950
              </p>
              <ul className="space-y-2 text-black/80 text-[15px]">
                <li>— 40% al inicio del proyecto</li>
                <li>— 60% restante en tres pagos mensuales de 20%</li>
                <li>— El último, dentro de los 30 días de la salida al aire</li>
              </ul>
            </div>
          </div>
        </section>

        <BoxedListSection
          title="Adicionales"
          subtitle="No están incluidos en el valor del sitio. Se pueden sumar al inicio o más adelante."
          border={false}
          items={[
            'Versión en inglés — el sitio completo en dos idiomas, con los textos de cada obra editables en ambos desde el panel. $600 – $800.',
            'Mapa de obras — las obras sobre un mapa, filtrables por tipología. $800 – $1,200.',
            'Carga de obras adicionales — por encima de las 20 incluidas, por bloque de 10 obras. $300.',
            'Redacción de textos — la descripción del estudio y de cada obra, escritos a partir de una charla con los socios. A cotizar según cantidad.',
          ]}
        />

        <ContentBox title="Acompañamiento mensual — opcional" border={false}>
          <p>
            Una vez publicado el sitio, el estudio puede manejarlo solo. Para quien prefiera no
            ocuparse, hay un acompañamiento mensual: cargamos las obras nuevas, mantenemos el sitio
            al día y sumamos mejoras chicas mes a mes.
          </p>
          <p>
            Es la puerta a lo que ya hacemos con Senda: <strong>contenido para redes y pauta en
            Meta y Google</strong> que lleva gente al sitio y convierte visitas en consultas. Su
            alcance y valor se definen con el estudio llegado el momento.
          </p>
        </ContentBox>

        <BoxedListSection
          title="Fuera de alcance"
          subtitle="No está cotizado y no forma parte de la entrega."
          border={false}
          items={[
            'Fotografía y video de obra — se trabaja con el material que ya tiene el estudio.',
            'Renders y modelos 3D.',
            'Rediseño del logo o de la identidad del estudio.',
            'Portal privado para clientes o seguimiento de obra.',
          ]}
        />

        <BoxedListSection
          title="Costos recurrentes de terceros"
          subtitle="No están incluidos en el valor de desarrollo. Se contratan a nombre del estudio."
          border={false}
          items={[
            'Dominio — renovación anual.',
            'Hosting y base de datos — en el volumen de un sitio de estudio, el plan gratuito o uno de bajo costo alcanza.',
            'Casilla de mail del dominio, si el estudio todavía no la tiene.',
          ]}
        />

        <BoxedListSection
          title="Puntos a confirmar"
          border={false}
          items={[
            'Listado de obras a publicar en el lanzamiento y en qué orden de importancia.',
            'Material de cada obra: fotos en alta y datos (ubicación, año, superficie, estado).',
            'Si el sitio sale en castellano solo o también en inglés.',
            'Dominio actual y quién lo administra, para la salida al aire.',
          ]}
        />

        <ContentBox title="Condiciones" border={false}>
          <p>
            Los valores expresados son <strong>netos, en dólares estadounidenses</strong>, y no
            incluyen IVA ni otros impuestos aplicables.
          </p>
          <p>
            La forma de pago se elige al inicio, entre las dos opciones de arriba. Cambios de
            alcance por fuera de lo definido en este documento se cotizan aparte.
          </p>
        </ContentBox>
      </ScrollReveal>
    </>
  )
}
