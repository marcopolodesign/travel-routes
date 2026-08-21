import ContentBox from '../components/ContentBox'
import BoxedListSection from '../components/BoxedListSection'
import TwoColumnSection from '../components/TwoColumnSection'
import PriceBlock from '../components/PriceBlock'
import Timeline from '../components/Timeline'
import ScrollReveal from '../components/ScrollReveal'

const ROADMAP_STEPS = [
  {
    label: 'Fase 1',
    items: [
      'Autenticación real y vistas por rol: súper admin, cliente final, colocador',
      'Carga desde el celular, con autoría y sello de cada foto',
      'Dashboard: desglose por tipo de material y estado, al momento',
      'Migración de la operación actual (opcional, aparte)',
    ],
  },
  {
    label: 'Fase 2',
    items: [
      'Claude conectado por MCP a la ingesta del archivo de Pedidos Ya',
      'División automática por zona, provincia y punto al subir',
      'Normalización de datos sucios y detección de inconsistencias',
      'Primeros agentes de control de calidad sobre la carga',
    ],
  },
  {
    label: 'Retainer',
    items: [
      'Control de evidencia y verificación de colocaciones, en evolución continua',
      'Adaptación de la plataforma a otros clientes de Job — alcance a definir',
      'Formularios dinámicos por cliente y app mobile opcional, según lo que se necesite',
      'Job posicionado como proveedor de datos y tecnología',
    ],
  },
]

export default function PicnicJob() {
  return (
    <>
      {/* Cover */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          Job para Picnic
        </span>
        <h1 className="font-thunder text-[13vw] md:text-[6.5vw] leading-[0.92] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Plataforma de<br />datos de campo<br />+ trazabilidad
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          Job construye para Picnic la herramienta que hoy le falta: una plataforma donde cada
          foto de colocación tiene un dueño. El mismo stack, después, sirve para cualquier otro
          cliente de Job con gente cargando datos desde la calle.
        </p>
        <div className="mt-10 md:mt-14 grid grid-cols-2 gap-6 md:gap-10 pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Fase 1</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">
              4 a 6 semanas
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Corte del sistema actual</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">1° de enero</p>
          </div>
        </div>
      </div>

      <ScrollReveal>
        <ContentBox title="Visión general" border={false}>
          <p>
            <strong>Job es prestador de servicios para Picnic</strong>: cartelería y reposición en
            el campo para cuentas como Pedidos Ya. Esta plataforma la construye y la posee Job,
            pensada primero para resolver la operación de Picnic — con la puerta abierta a que
            mañana sirva para cualquier otro cliente de Job.
          </p>
          <p>
            El problema de fondo es siempre el mismo: <strong>accountability de quien carga el
            dato desde la calle</strong>. Hoy son los colocadores de cartelería de Pedidos Ya. Job
            también trabaja con repositores de góndola en otras cuentas, y la idea es que la misma
            plataforma se adapte a ellos más adelante.
          </p>
          <p>
            La escala de Pedidos Ya sola ya lo justifica: del orden de <strong>3.000 puntos de
            colocación por mes</strong>, repartidos en <strong>83 etapas</strong>, sobre una
            herramienta que hoy no da abasto.
          </p>
        </ContentBox>

        <TwoColumnSection title="Qué resuelve" withBar={false}>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Cada foto tiene dueño.</strong> Hoy cualquiera con el link sube evidencia sin
              identificarse. Con usuario y contraseña, cada carga queda firmada por quien la hizo,
              con fecha y hora reales de subida.
            </li>
            <li>
              <strong>La carga deja de ser manual.</strong> El armado de una etapa hoy consume del
              orden de cuatro horas de filtrado provincia por provincia y local por local. Pasa a
              ser un archivo que se sube y se procesa solo.
            </li>
            <li>
              <strong>El número está a un click, no a un archivo.</strong> Hoy no se puede saber
              rápido cuántos backlights se pusieron en lo que va del mes sin revisar los archivos
              uno por uno. Con dashboard, es una consulta.
            </li>
            <li>
              <strong>Los errores de criterio se detectan solos.</strong> Una colocación marcada
              como efectiva con los dos materiales en no efectivo deja de pasar desapercibida.
            </li>
          </ul>
        </TwoColumnSection>

        <TwoColumnSection title="Los tres accesos" withBar={false}>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Súper admin — Picnic, Job y Paz —</strong> gestión completa. Arma las
              etapas, revisa la evidencia que entra, corrige y exporta. Ve todo.
            </li>
            <li>
              <strong>Cliente final — Pedidos Ya —</strong> panel de consulta. Busca por local,
              provincia o tipo de material, ve la foto, la fecha y el estado de cada punto.
            </li>
            <li>
              <strong>Colocador —</strong> vista de campo para el celular. Ve sólo lo asignado,
              carga la foto y los datos del punto, y cierra.
            </li>
          </ul>
          <p className="mt-4 text-sm text-black/70">
            Los repositores de góndola de otras cuentas de Job se suman en el retainer, cuando la
            plataforma se adapta a esos clientes — la Fase 1 es exclusiva del flujo de Pedidos Ya.
          </p>
        </TwoColumnSection>

        {/* Roadmap y timeline */}
        <section className="mb-20 md:mb-28">
          <h2 className="font-thunder text-2xl md:text-3xl lg:text-4xl uppercase text-[var(--marco-accent)] mb-8">
            Roadmap y timeline
          </h2>
          <div className="rounded-lg bg-[var(--marco-bg)] p-6 md:p-10">
            <Timeline title="Dos fases de build + retainer" steps={ROADMAP_STEPS} />
          </div>
        </section>

        <ContentBox title="Cómo se lee este presupuesto" border={false}>
          <p>
            Cada fase se presenta con un <strong>piso y un techo</strong>, no con un número único.
            El piso es lo que cuesta la fase con el alcance tal como está definido hoy; el techo es
            hasta dónde puede estirarse si aparece más de lo previsto.
          </p>
          <p>
            El compromiso es simple: <strong>cuando nos acercamos al techo, avisamos antes de
            llegar</strong>, con el detalle de qué lo empujó, y se decide en conjunto si se sigue o
            se recorta. Nunca hay una factura que sorprenda.
          </p>
          <p>
            Las dos fases de build son independientes: se puede contratar la Fase 1 sola y decidir
            la Fase 2 más adelante, con la plataforma ya andando y datos reales sobre la mesa. El
            retainer viene después, con su alcance a definir en conjunto — no es parte del build.
          </p>
        </ContentBox>

        {/* Fase 1 */}
        <PriceBlock
          title="Fase 1 — Plataforma & salir del apuro"
          meta="4 a 6 semanas hasta prueba estable · exclusivo para el flujo de Pedidos Ya"
          amount="$12,500 – $15,000"
          border={false}
        >
          <p>
            Renovación completa de la plataforma de carga: autenticación real con usuario y
            contraseña, vistas diferenciadas por rol, carga desde el celular con autoría y sello de
            cada foto, y dashboard con desglose inmediato de lo colocado — sin depender de abrir
            archivo por archivo.
          </p>
          <p>
            La Fase 1 es <strong>sólo para el flujo de Pedidos Ya</strong>: no incluye otros
            formularios de campo. Esos se contemplan cuando la plataforma se adapta a otros
            clientes, dentro del retainer.
          </p>
          <p>
            Calendario cómodo: arrancando ahora, la plataforma queda estable y probada con etapas
            reales bastante antes del <strong>1° de enero</strong>, con margen para ajustar sobre
            uso real en lugar de llegar justo.
          </p>
          <div className="rounded-lg bg-[var(--marco-accent-light)]/40 px-5 py-4 mt-2">
            <p className="mb-0">
              <strong>Migración de datos históricos — opcional, aparte: $1,500 – $2,000.</strong>{' '}
              Normaliza el historial de las 83 etapas y de cada provincia para que entre a la
              plataforma nueva sin perder registro de lo ya colocado.
            </p>
          </div>
        </PriceBlock>

        <BoxedListSection
          title="Nice to have — para más adelante"
          subtitle="No están cotizados en la Fase 1. Se evalúan una vez que la plataforma esté andando y haya datos reales para entrenar contra ellos."
          border={false}
          items={[
            'Mapa interactivo de colocación — ver los puntos del mes en un mapa, no en una lista.',
            'Agente entrenado que chequea las imágenes cargadas y detecta el tipo de colocación automáticamente.',
          ]}
        />

        {/* Fase 2 */}
        <PriceBlock
          title="Fase 2 — Enhancements"
          meta="2 a 3 semanas · se contrata con la Fase 1 en producción"
          amount="$4,500 – $6,500"
          border={false}
        >
          <p>
            <strong>Claude conectado por MCP</strong> a la ingesta del archivo de Pedidos Ya: se
            sube o se enlaza desde Drive, y el modelo hace la lectura, la división por zona,
            provincia y punto, y la carga — lo que hoy son cuatro horas de trabajo manual por etapa
            pasa a ser cuestión de minutos.
          </p>
          <p>
            Incluye normalización de los datos que vienen sucios, detección de inconsistencias
            antes de cargar, y los primeros agentes de control de calidad sobre lo que entra a la
            plataforma — para que los errores se vean en el momento y no tres semanas después.
          </p>
          <p>
            El MCP que se arma acá queda completo — no es sólo para la ingesta del archivo. Es la
            misma conexión la que después permite <strong>preguntarle a la plataforma en
            lenguaje natural</strong>: "¿cuántos backlights se colocaron en Buenos Aires este
            mes?", "¿cuál es el colocador con menor tasa de error?". Consultas que hoy no existen
            porque implicarían abrir archivo por archivo, acá son una pregunta.
          </p>
        </PriceBlock>

        <ContentBox title="Retainer — después de la Fase 2" border={false}>
          <p>
            Por fuera del build hay un <strong>retainer mensual</strong>: no es soporte, es trabajo
            continuo sobre la plataforma. Arranca cuando la Fase 2 está entregada, y su alcance se
            define en conjunto con Picnic y Job — <strong>no viene con un número cerrado</strong>,
            porque depende de qué tan rápido quieran avanzar y qué clientes suma Job en el camino.
          </p>
          <p>
            Ahí vive <strong>el control de la evidencia</strong>. La verificación de que una
            colocación es real — cruzar la foto contra la ubicación declarada, detectar imágenes
            reutilizadas, marcar lo que no cierra — no es algo que se construye una vez: los
            métodos para esquivar un control cambian, y el control tiene que cambiar con ellos. Por
            eso se sostiene mes a mes en lugar de venderse como un módulo cerrado.
          </p>
          <p>
            También es donde se aloja, <strong>a definir (TBD)</strong>, la adaptación de la
            plataforma a otros clientes de Job: formularios dinámicos configurables por cliente —
            cada cuenta nueva se da de alta con su propio formulario, sin que Marco Polo tenga que
            desarrollarlo caso por caso — y app mobile opcional con geolocalización y armado de
            rutas para el control más estricto que necesitan los repositores. Es el camino que
            convierte la herramienta interna de Picnic en el producto de Job: un proveedor de datos
            y tecnología para empresas parecidas a Job, que hoy no tienen la potencia técnica que
            esta herramienta les va a dar.
          </p>
          <p>
            Sobre el mismo eje se monta el <strong>leaderboard de efectividad</strong> por
            colocador y repositor — planteado como beneficio y no como castigo, algo que cambia la
            conversación con los supervisores que hoy resisten cualquier sistema de control.
          </p>
          <p className="text-sm text-black/70">
            Alcance y valor del retainer se definen con Picnic y Job llegado el momento, según qué
            clientes suma Job y los recursos que quieran alocar al proyecto.
          </p>
        </ContentBox>

        <BoxedListSection
          title="Oportunidades que abre"
          subtitle="No están cotizadas. Son consecuencia de tener la operación estructurada."
          border={false}
          items={[
            'Respuesta inmediata al cliente — cualquier consulta sobre un punto de colocación se contesta desde el panel, sin depender de coordinadores del interior.',
            'Job como proveedor de datos y tecnología — el mismo stack sirve a cualquier empresa con gente en la calle que hoy no tiene la potencia técnica para construirlo.',
            'Reunión conjunta con Pedidos Ya — mostrar la solución a medida y posicionar a Picnic y Job como el socio tecnológico de la cuenta.',
          ]}
        />

        <BoxedListSection
          title="Fuera de alcance"
          subtitle="No está cotizado y no forma parte de la entrega. Se puede sumar más adelante como fase aparte."
          border={false}
          items={[
            'Integración directa con los sistemas internos de Pedidos Ya — el intercambio sigue siendo por archivo.',
            'Facturación y liquidación de pagos a colocadores.',
            'Los formularios de Movistar Geogestión se reemplazan por el formulario dinámico propio de Job dentro del retainer, no se integran.',
            'Apps nativas en App Store y Google Play durante las Fases 1 y 2 — la carga en campo es web desde el celular.',
          ]}
        />

        <BoxedListSection
          title="Costos recurrentes de terceros"
          subtitle="No están incluidos en el valor de desarrollo. Se contratan a nombre del cliente y se pagan mes a mes según consumo."
          border={false}
          items={[
            'Hosting y base de datos — escalan con el volumen de etapas y puntos cargados.',
            'Almacenamiento y entrega de fotos — es el rubro que más pesa dado el volumen mensual.',
            'Servicio de mail transaccional para las notificaciones.',
            'Dominio y certificado.',
            'Consumo de los modelos de IA en la Fase 2 y en el control de evidencia del acompañamiento.',
            'Cuentas de desarrollador de App Store y Google Play — sólo si se avanza con la app mobile del retainer.',
          ]}
        />

        <BoxedListSection
          title="Puntos a confirmar"
          border={false}
          items={[
            'Fecha exacta de corte del sistema actual, para fijar la fecha de salida a producción hacia atrás desde ahí.',
            'Cuántos años de historial hay que migrar y en qué formato están hoy — dimensiona el alcance de la migración opcional.',
            'Si Pedidos Ya accede directo a la plataforma como cliente final, o si la consulta pasa siempre por el equipo comercial de Picnic.',
          ]}
        />

        <ContentBox title="Condiciones" border={false}>
          <p>
            Los valores expresados son <strong>netos, en dólares estadounidenses</strong>, y no
            incluyen IVA ni otros impuestos aplicables.
          </p>
          <p>
            Cada fase se presenta con piso y techo. Al acercarnos al techo de una fase, se avisa
            antes de llegar, con el detalle de qué lo empujó, y se decide en conjunto cómo seguir.
            Cambios de alcance por fuera de lo definido en este documento se cotizan aparte.
          </p>
          <p>
            El acompañamiento mensual se define con el cliente llegado el momento, según los
            recursos que quiera alocar al proyecto. Los costos recurrentes de infraestructura y
            servicios de terceros se contratan a nombre del cliente y no forman parte del valor de
            desarrollo.
          </p>
        </ContentBox>
      </ScrollReveal>
    </>
  )
}
