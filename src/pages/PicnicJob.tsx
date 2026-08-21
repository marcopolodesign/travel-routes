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
      'Arquitectura, modelo de datos y entornos',
      'Autenticación y perfiles para los tres tipos de usuario',
      'Carga en campo desde el celular, con autoría y sello de cada foto',
      'Panel de Picnic, panel de cliente y migración de la operación actual',
    ],
  },
  {
    label: 'Fase 2',
    items: [
      'Ingesta directa del archivo de Pedido Ya',
      'División automática por zona, provincia y punto de colocación',
      'Normalización, detección de inconsistencias y carga masiva',
      'De cuatro horas por etapa a minutos',
    ],
  },
  {
    label: 'Fase 3',
    items: [
      'App mobile con geolocalización y armado de rutas',
      'Plataforma multi-cliente: Branca, Morixe, Media Monks y los que sigan',
      'Panel de supervisión de rutas y tiempos reales',
      'Job opera su propio stack y lo ofrece como servicio',
    ],
  },
  {
    label: 'Continuo',
    items: [
      'Control de evidencia y verificación de colocaciones',
      'Leaderboard de efectividad por colocador y repositor',
      'Evolución del producto mes a mes',
      'Inteligencia de trade sobre los datos acumulados',
    ],
  },
]

export default function PicnicJob() {
  return (
    <>
      <ScrollReveal>
        <ContentBox title="Visión general">
          <p>
            Picnic gestiona la colocación de cartelería para Pedido Ya a escala nacional:
            del orden de <strong>3.000 puntos de colocación por mes</strong> repartidos en unas
            <strong> 80 etapas</strong>, entre backlights, salientes, sombrillas y bicicleteros.
            Es una operación grande corriendo sobre una herramienta que ya no le da abasto.
          </p>
          <p>
            La propuesta es construir la plataforma propia de Picnic y Job: una sola herramienta
            donde el colocador carga desde el campo, Picnic gestiona y el cliente consulta — cada
            uno con su acceso, su vista y su responsabilidad. Y hacerlo <strong>por etapas</strong>,
            arrancando por lo que hay que tener resuelto antes de la fecha de corte del sistema
            actual.
          </p>
          <p>
            El objetivo de fondo no es sólo reemplazar una herramienta. Es que la operación deje
            evidencia: quién colocó, dónde, cuándo y con qué material. Eso es lo que después
            convierte la operación en un dato vendible.
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
              <strong>El cliente ve lo que necesita ver.</strong> El buscador de locales muestra
              tipo de material y ubicación exacta: si es backlight, saliente o bicicletero, y dónde
              está puesto. Sin depender de un coordinador que lo confirme por teléfono.
            </li>
            <li>
              <strong>Los errores de criterio se detectan solos.</strong> Una colocación marcada
              como efectiva con los dos materiales en no efectivo deja de pasar desapercibida: la
              plataforma la marca en el momento, en lugar de aparecer después filtrando el Excel a
              mano.
            </li>
            <li>
              <strong>El equipo de campo entra al sistema.</strong> Repositores y promotoras dejan
              de depender de formularios externos: la ruta, la evidencia y el resultado viven en un
              solo lugar.
            </li>
          </ul>
        </TwoColumnSection>

        <TwoColumnSection title="Los tres accesos" withBar={false}>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Picnic / Job —</strong> gestión completa. Arma las etapas, asigna, revisa la
              evidencia que entra, corrige y exporta. Ve todo.
            </li>
            <li>
              <strong>Cliente —</strong> panel de consulta. Busca por local, provincia o tipo de
              material, ve la foto, la fecha y el estado de cada punto. No edita nada.
            </li>
            <li>
              <strong>Colocador / repositor —</strong> vista de campo, pensada para el celular.
              Ve sólo lo que tiene asignado, carga la foto y los datos del punto, y cierra. Rápido,
              con pocos toques y con mala señal.
            </li>
          </ul>
        </TwoColumnSection>

        {/* Roadmap y timeline */}
        <section className="mb-20 md:mb-28">
          <h2 className="font-thunder text-2xl md:text-3xl lg:text-4xl uppercase text-[var(--marco-accent)] mb-8">
            Roadmap y timeline
          </h2>
          <div className="rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-6 md:p-10">
            <Timeline title="Tres fases + acompañamiento continuo" steps={ROADMAP_STEPS} />
          </div>
        </section>

        <ContentBox title="Cómo se lee este presupuesto">
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
            Las tres fases son independientes. Se puede contratar la Fase 1 sola y decidir el resto
            más adelante, con la plataforma ya andando y datos reales sobre la mesa.
          </p>
        </ContentBox>

        {/* Fase 1 */}
        <PriceBlock
          title="Fase 1 — La plataforma nueva"
          meta="4 a 6 semanas hasta prueba estable · incluye diseño, desarrollo, migración, QA y puesta en producción"
          amount="$10,000 – $13,500"
        >
          <p>
            Reemplaza el sistema actual completo: autenticación real para los tres tipos de usuario,
            vistas diferenciadas, carga desde el celular con autoría y sello de cada foto, buscador
            de locales con tipo de material y ubicación, y panel de gestión para Picnic.
          </p>
          <p>
            Incluye la <strong>migración de la operación actual</strong> — los datos históricos y
            las etapas en curso pasan a la plataforma nueva sin cortar el servicio.
          </p>
          <p>
            El calendario es cómodo: arrancando en septiembre, la plataforma queda estable y probada
            con etapas reales <strong>bastante antes de la fecha de corte del sistema actual</strong>,
            con margen para ajustar sobre uso real en lugar de llegar justo.
          </p>
          <p className="text-sm text-black/70">
            Qué mueve el número dentro del rango: el volumen de datos históricos a migrar y cuántos
            formularios de carga distintos hay que contemplar además del de cartelería.
          </p>
        </PriceBlock>

        {/* Fase 2 */}
        <PriceBlock
          title="Fase 2 — La carga, automatizada"
          meta="2 a 3 semanas · se contrata con la Fase 1 en producción"
          amount="$4,500 – $6,500"
        >
          <p>
            El archivo de Pedido Ya entra directo a la plataforma. Se sube o se enlaza desde Drive,
            y el sistema hace solo la división por zona, provincia y punto: lo que hoy son cuatro
            horas de trabajo manual por etapa pasa a ser <strong>cuestión de minutos</strong>.
          </p>
          <p>
            Incluye normalización de los datos que vienen sucios y detección de inconsistencias
            antes de cargar, para que los errores se vean en el momento y no tres semanas después.
          </p>
          <p>
            El ahorro es directo y medible: unas <strong>80 etapas por mes</strong> a cuatro horas
            cada una es tiempo de gestión que vuelve al equipo para hacer otra cosa.
          </p>
        </PriceBlock>

        {/* Fase 3 */}
        <PriceBlock
          title="Fase 3 — Mobile y multi-cliente"
          meta="Orden de magnitud · alcance a cerrar cuando la Fase 2 esté entregada"
          amount="$15,000 – $22,000"
        >
          <p>
            App mobile con geolocalización y armado de rutas para el equipo de campo, más la
            adaptación de la plataforma para operar <strong>varios clientes en paralelo</strong> —
            Branca, Morixe, Media Monks y los que vengan — cada uno con sus datos separados.
          </p>
          <p>
            Es la fase que convierte la herramienta interna de Picnic en el producto de Job: el mismo
            stack, sirviendo a varias cuentas, con supervisión de rutas y tiempos reales.
          </p>
          <p className="text-sm text-black/70">
            El rango es amplio a propósito: falta definición y la fase está a varios meses. Se cierra
            con número firme cuando llegue el momento, con la Fase 2 andando y sabiendo qué clientes
            entran primero.
          </p>
        </PriceBlock>

        <ContentBox title="El acompañamiento mensual — y por qué el control va acá">
          <p>
            Además del build hay un <strong>contrato mensual</strong>. No es soporte: es el trabajo
            continuo sobre la plataforma — evolución del producto, ajustes sobre uso real y una
            reunión periódica para decidir prioridades.
          </p>
          <p>
            Y es donde vive <strong>el control de la evidencia</strong>. La verificación de que una
            colocación es real — cruzar la foto contra la ubicación declarada, detectar imágenes
            reutilizadas de etapas anteriores, marcar lo que no cierra — no es algo que se construye
            una vez y queda resuelto para siempre. Los métodos para esquivar un control cambian, y
            el control tiene que cambiar con ellos. Por eso se sostiene mes a mes en lugar de
            venderse como un módulo cerrado.
          </p>
          <p>
            Sobre el mismo eje se monta el <strong>leaderboard de efectividad</strong> por colocador
            y repositor. Planteado como beneficio y no como castigo: el que trabaja bien lo puede
            demostrar con números, y eso cambia la conversación con los supervisores respecto de
            imponerles un sistema de control.
          </p>
        </ContentBox>

        <PriceBlock
          title="Acompañamiento mensual — durante Fases 1 y 2"
          meta="Reunión quincenal · evolución continua · control de evidencia"
          amount="$1,500 / mes"
        >
          <p>
            Horas mensuales aplicadas a la plataforma según la prioridad del momento. Incluye la
            puesta en marcha del control de evidencia y su ajuste sobre los casos reales que vayan
            apareciendo.
          </p>
        </PriceBlock>

        <PriceBlock
          title="Acompañamiento mensual — plataforma multi-cliente"
          meta="Desde la Fase 3 · reunión semanal · varias cuentas en paralelo"
          amount="$2,500 – $3,500 / mes"
        >
          <p>
            Cuando la plataforma pasa a servir a varios clientes, el acompañamiento sube: más
            cuentas, más volumen de evidencia a verificar, más superficie de producto y cadencia
            semanal en lugar de quincenal.
          </p>
          <p>
            Es lo que le permite a Job ofrecer la plataforma como servicio propio sin montar un
            equipo técnico interno para sostenerla.
          </p>
        </PriceBlock>

        <BoxedListSection
          title="Oportunidades que abre"
          subtitle="No están cotizadas. Son consecuencia de tener la operación estructurada, y aparecen solas una vez que la plataforma está andando."
          items={[
            'Respuesta inmediata al cliente — cualquier consulta sobre un punto de colocación se contesta desde el panel, sin depender de coordinadores del interior.',
            'Inteligencia de trade — con los datos estructurados, Picnic y Job pueden ofrecerle a Pedido Ya lectura de mercado que hoy nadie le está dando.',
            'La plataforma como producto — el mismo stack sirve a cualquier empresa con gente en la calle; el modelo de fee por usuario se evalúa cuando haya un segundo cliente real.',
            'Reunión conjunta con Pedido Ya — mostrar la solución a medida y posicionar a Picnic como el socio tecnológico de la cuenta, no sólo como el proveedor de colocación.',
          ]}
        />

        <BoxedListSection
          title="Fuera de alcance"
          subtitle="No está cotizado y no forma parte de la entrega. Se puede sumar más adelante como fase aparte."
          items={[
            'Integración directa con los sistemas internos de Pedido Ya — el intercambio sigue siendo por archivo.',
            'Facturación y liquidación de pagos a colocadores.',
            'Migración de los formularios de Movistar Geogestión — se reemplazan en Fase 3, no se integran.',
            'Apps nativas en App Store y Google Play durante las Fases 1 y 2 — la carga en campo es web desde el celular.',
          ]}
        />

        <BoxedListSection
          title="Costos recurrentes de terceros"
          subtitle="No están incluidos en el valor de desarrollo. Se contratan a nombre del cliente y se pagan mes a mes según consumo."
          items={[
            'Hosting y base de datos — escalan con el volumen de etapas y puntos cargados.',
            'Almacenamiento y entrega de fotos — es el rubro que más pesa dado el volumen mensual.',
            'Servicio de mail transaccional para las notificaciones.',
            'Dominio y certificado.',
            'Consumo de los modelos de IA en la Fase 2 y en el control de evidencia.',
            'Cuentas de desarrollador de App Store y Google Play — sólo desde la Fase 3.',
          ]}
        />

        <BoxedListSection
          title="Puntos a confirmar"
          items={[
            'Fecha exacta de corte del sistema actual, para fijar la fecha de salida a producción hacia atrás desde ahí.',
            'Cuántos años de historial hay que migrar y en qué formato están hoy.',
            'Si el cliente que consulta es Pedido Ya directamente o el equipo comercial de Picnic.',
            'Qué formularios de campo hay además del de cartelería — precio, stock, reposición, ofertas y reacomodado de góndola.',
            'Cuántos colocadores y repositores activos hay que dar de alta en el arranque.',
            'A nombre de quién se contrata: Picnic, Job, o una figura conjunta.',
          ]}
        />

        <ContentBox title="Condiciones">
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
            El acompañamiento mensual se factura por mes adelantado y es cancelable con treinta días
            de aviso. Los costos recurrentes de infraestructura y servicios de terceros se contratan
            a nombre del cliente y no forman parte del valor de desarrollo.
          </p>
        </ContentBox>
      </ScrollReveal>
    </>
  )
}
