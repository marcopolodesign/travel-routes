import ContentBox from '../components/ContentBox'
import BoxedListSection from '../components/BoxedListSection'
import TwoColumnSection from '../components/TwoColumnSection'
import ScrollNav from '../components/ScrollNav'
import ScrollReveal from '../components/ScrollReveal'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'estado', label: 'Dónde estamos' },
  { id: 'andando', label: 'Lo que ya está andando' },
  { id: 'pendientes', label: 'Lo que falta para salir' },
  { id: 'alcance', label: 'Alcance del cierre' },
  { id: 'confirmar', label: 'A confirmar' },
]

type Pendiente = { t: string; donde: string; d: string }

function Bloque({
  id,
  n,
  title,
  meta,
  items,
}: {
  id: string
  n: string
  title: string
  meta?: string
  items: Pendiente[]
}) {
  return (
    <section id={id} className="mb-10 md:mb-14 scroll-mt-28">
      <div className="border border-[var(--marco-border)] rounded-lg p-6 md:p-8">
        <div className="flex items-baseline gap-3">
          <span className="font-thunder text-2xl md:text-3xl uppercase text-[var(--marco-accent)]">
            {n}
          </span>
          <h3 className="font-thunder text-2xl md:text-3xl uppercase text-black">{title}</h3>
        </div>
        {meta && <p className="text-sm text-black/60 mt-2 mb-4 max-w-2xl">{meta}</p>}
        <ul className={`divide-y divide-[var(--marco-border)] ${meta ? '' : 'mt-4'}`}>
          {items.map((it) => (
            <li key={it.t} className="py-4 last:pb-0">
              <div className="flex items-start justify-between gap-4">
                <p className="font-thunder uppercase text-black text-lg leading-tight">{it.t}</p>
                <span className="shrink-0 text-[11px] uppercase tracking-wide text-black/50 border border-[var(--marco-border)] rounded-full px-2.5 py-0.5">
                  {it.donde}
                </span>
              </div>
              <p className="text-black/70 text-[15px] mt-1.5 max-w-2xl">{it.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function HealthierCierre() {
  return (
    <>
      <ScrollNav items={NAV} />

      {/* Portada */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          Healthier · Alcance de cierre
        </span>
        <h1 className="font-thunder text-[13vw] md:text-[6.5vw] leading-[0.92] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Lo que ya está<br />andando y lo que<br />falta para salir
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          Healthier dejó de ser un MVP hace rato: hoy son dos productos vivos —la plataforma web
          para pacientes, profesionales, farmacia y administración, y la app de iPhone—. Este
          documento pone por escrito lo que está terminado y en producción, y la lista cerrada de
          lo que falta para el lanzamiento.
        </p>

        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Plataforma web</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">En producción</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">App iPhone</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">En pruebas</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">
              Profesionales verificados
            </span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">11</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">
              Puntos para cerrar
            </span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">29</p>
          </div>
        </div>
      </div>

      <ScrollReveal>
        <ContentBox title="Dónde estamos" id="estado" border={false}>
          <p>
            El alcance original era un MVP: una web para reservar y atender una consulta. Lo que
            hay hoy es bastante más grande. La plataforma web cubre el recorrido completo del
            paciente, el consultorio digital del profesional, un panel de farmacia y una
            administración con visibilidad sobre todo lo que pasa. En paralelo hay una app de
            iPhone con el mismo recorrido del paciente más un área de trabajo para el profesional.
          </p>
          <p>
            Todo eso está <strong>en producción y funcionando</strong>: se reservan turnos, se
            cobra con tarjeta, se atiende por videollamada, se escribe la historia clínica y se
            emiten recetas electrónicas con validez legal. Lo que falta no es construir el
            producto: es la última vuelta antes de abrirle la puerta al público.
          </p>
          <p>
            La lista de abajo es <strong>la lista completa</strong>. Está agrupada en siete
            bloques, con qué es cada cosa y dónde toca —web, app o las dos—. Con esos puntos
            entregados y verificados, el trabajo se da por terminado.
          </p>
        </ContentBox>

        {/* ── Lo que ya está andando ───────────────────────────────────── */}
        <section id="andando" className="mb-20 md:mb-28 scroll-mt-28">
          <h2 className="font-thunder text-2xl md:text-3xl lg:text-4xl uppercase text-[var(--marco-accent)] mb-8">
            Lo que ya está andando
          </h2>

          <TwoColumnSection title="El paciente" withBar={false}>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Alta y perfil.</strong> Cuenta con mail o con Google, datos personales,
                cobertura, contacto de emergencia y grupo familiar.
              </li>
              <li>
                <strong>Encontrar y reservar.</strong> Búsqueda por especialidad, por nombre y por
                mapa, ficha del profesional con calificaciones, elección de fecha y hora, y pago
                con tarjeta —que queda guardada para la próxima—.
              </li>
              <li>
                <strong>Consulta inmediata.</strong> "Hablá con un médico ahora": elige el
                profesional disponible, se autoriza el pago y entra a la sala de espera. El médico
                recibe el aviso en el teléfono.
              </li>
              <li>
                <strong>La consulta.</strong> Pre-consulta con un listado clínico de síntomas,
                sala de espera, videollamada propia (no una herramienta de terceros embebida), y
                al terminar un resumen con lo indicado y la receta.
              </li>
              <li>
                <strong>Historia clínica.</strong> Completa, con diagnósticos, medicación,
                alergias y evolución, descargable en PDF —cumpliendo la ley de derechos del
                paciente—.
              </li>
              <li>
                <strong>Bóveda.</strong> Documentos médicos, análisis y recetas en un solo lugar.
              </li>
              <li>
                <strong>Biovisor.</strong> Se sube el PDF o la foto de un análisis de sangre y la
                plataforma lo lee sola: cada valor con su rango, su semáforo y su evolución en el
                tiempo. Lo ve el paciente y lo ve el médico.
              </li>
              <li>
                <strong>Recetas electrónicas.</strong> Con validez legal, en PDF, listas para
                presentar en cualquier farmacia. Desde la receta se puede pasar directo al carrito.
              </li>
              <li>
                <strong>Farmacia.</strong> Catálogo con foto, carrito que sobrevive al cierre de la
                app, checkout y seguimiento del pedido paso a paso.
              </li>
              <li>
                <strong>Y además.</strong> Comprobantes, calificación del profesional, asistente de
                IA con el contexto clínico del paciente, notificaciones y recordatorios de turno.
              </li>
            </ul>
          </TwoColumnSection>

          <TwoColumnSection title="El profesional" withBar={false}>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Alta guiada.</strong> Onboarding paso a paso con carga de título,
                matrícula, seguro y documentación, y un checklist de lo que le falta completar.
              </li>
              <li>
                <strong>Agenda.</strong> Horarios semanales, franjas, turnos de 15 minutos y
                bloqueo de superposiciones. Presencial y por videollamada, con precio propio para
                cada modalidad y para cada tipo de consulta.
              </li>
              <li>
                <strong>Consultorio digital.</strong> Dentro de la videollamada tiene la historia
                clínica del paciente, los síntomas cargados, el copiloto clínico, signos vitales,
                diagnóstico presuntivo, indicaciones, evolución, órdenes de estudios y el
                recetario. Todo queda asentado en la historia clínica al cerrar.
              </li>
              <li>
                <strong>Nota clínica con IA.</strong> En la consulta presencial graba y arma la
                nota estructurada sola, para revisar y confirmar.
              </li>
              <li>
                <strong>Sus pacientes.</strong> Listado, ficha, historial de consultas y detalle de
                cada una.
              </li>
              <li>
                <strong>La plata.</strong> Cobro directo a su cuenta de Mercado Pago, con el neto
                real acreditado —no una estimación— y el detalle mes a mes.
              </li>
              <li>
                <strong>Y además.</strong> Link de referidos propio, centro de ayuda y soporte por
                WhatsApp.
              </li>
            </ul>
          </TwoColumnSection>

          <TwoColumnSection title="La administración" withBar={false}>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Todo lo que pasa, visible.</strong> Consultas, pagos, devoluciones y
                créditos, con la línea de tiempo de cada una.
              </li>
              <li>
                <strong>Profesionales.</strong> Alta, verificación, rechazo con motivo, estado de
                la cuenta de cobro y el recorrido completo de cada uno desde que se anotó.
              </li>
              <li>
                <strong>Palancas de negocio.</strong> Comisión, precio de la consulta inmediata por
                especialidad, ventana de devolución, piso de precio y qué especialidades están
                abiertas —todo se cambia desde el panel, sin tocar código—.
              </li>
              <li>
                <strong>Y además.</strong> Prospectos de pacientes y de profesionales, zonas,
                auditoría, referidos, farmacia y emergencias.
              </li>
              <li>
                <strong>Panel de farmacia.</strong> Catálogo, pedidos, cancelación con motivo y
                configuración, en un acceso propio.
              </li>
            </ul>
          </TwoColumnSection>

          <TwoColumnSection title="Detrás de escena" withBar={false}>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Entorno de pruebas separado.</strong> Con su propia base de datos: todo se
                prueba ahí antes de tocar producción, sin ensuciar los datos reales.
              </li>
              <li>
                <strong>Chequeos automáticos después de cada publicación</strong> sobre los cuatro
                circuitos que no pueden fallar: cobros, alta de cuenta, receta electrónica y
                consulta inmediata.
              </li>
              <li>
                <strong>Retención legal de la historia clínica</strong> a diez años, garantizada
                por la propia base de datos.
              </li>
              <li>
                <strong>Inscripción en el registro nacional de bases de datos</strong> ya
                completada, y términos y condiciones al día con la normativa de telesalud.
              </li>
            </ul>
          </TwoColumnSection>
        </section>

        {/* ── Lo que falta ─────────────────────────────────────────────── */}
        <section id="pendientes" className="mb-12 md:mb-16 scroll-mt-28">
          <h2 className="font-thunder text-2xl md:text-3xl lg:text-4xl uppercase text-[var(--marco-accent)] mb-4">
            Lo que falta para salir
          </h2>
          <p className="text-black/80 text-[15px] max-w-2xl mb-10">
            Veintinueve puntos, en siete bloques. Cada uno dice qué es y dónde toca. No hay nada
            fuera de esta lista.
          </p>
        </section>

        <Bloque
          id="b1"
          n="01"
          title="Salir al aire"
          meta="Lo que separa a la plataforma de estar públicamente disponible."
          items={[
            {
              t: 'Dominio definitivo',
              donde: 'Web',
              d: 'Hoy la plataforma vive en una dirección técnica. Falta elegir el dominio con el que sale al público y conectarlo, en la web y en las casillas de correo.',
            },
            {
              t: 'App en la App Store',
              donde: 'App',
              d: 'La app está terminada y hoy se instala por invitación. Falta pasar la revisión de Apple para que cualquiera pueda bajarla desde la tienda.',
            },
            {
              t: 'Versión de Android',
              donde: 'App',
              d: 'Hoy sólo hay iPhone. Falta compilar y publicar la versión de Android, con su cuenta de desarrollador y su ficha en Google Play.',
            },
            {
              t: 'Confirmaciones por mail',
              donde: 'Web + App',
              d: 'Los avisos hoy llegan como notificación al teléfono. Falta activar el servicio de correo para que la confirmación de turno y el recordatorio lleguen también por mail.',
            },
          ]}
        />

        <Bloque
          id="b2"
          n="02"
          title="Emergencias (S.O.S.)"
          meta="El bloque más grande. El recorrido está construido de punta a punta —triage por síntomas, ubicación en el mapa, despacho, seguimiento de estado y cierre—, y hoy está apagado a propósito hasta terminar de definirlo."
          items={[
            {
              t: 'Encender el servicio',
              donde: 'Web + App',
              d: 'Se prende desde el panel de administración, con un clic, cuando el resto de este bloque esté cerrado. Mientras tanto el paciente ve un mensaje claro y el teléfono del SAME.',
            },
            {
              t: 'El cobro del servicio',
              donde: 'Web + App',
              d: 'Hoy se toma la tarjeta y se guarda el precio acordado, pero falta el cobro efectivo cuando el servicio termina. Es lo que hay que definir y construir.',
            },
            {
              t: 'El precio',
              donde: 'Decisión',
              d: 'Hay un valor de prueba cargado. Falta definir cuánto vale el servicio y si es único o depende de la gravedad del caso.',
            },
            {
              t: 'Quién atiende',
              donde: 'Decisión',
              d: 'Hoy el pedido sale a los clínicos de guardia disponibles y se asigna uno. Falta definir zonas de cobertura, prioridad, y qué se le ofrece al paciente si en ese momento no hay nadie.',
            },
            {
              t: 'El aviso al profesional',
              donde: 'Web + App',
              d: 'Llega como notificación al teléfono. Conviene sumar WhatsApp, que es el canal que realmente se lee cuando el teléfono está en el bolsillo.',
            },
            {
              t: 'Emparejar la app con la web',
              donde: 'App',
              d: 'En la app, la pantalla de pago de la emergencia y el seguimiento del móvil en el mapa todavía son de demostración. Hay que unificarlas con el circuito real que ya corre en la web.',
            },
          ]}
        />

        <Bloque
          id="b3"
          n="03"
          title="Consultas"
          meta="El circuito principal funciona entero. Quedan cuatro cosas para redondearlo."
          items={[
            {
              t: 'Atención sin turno',
              donde: 'Web',
              d: 'La fila de espera para atenderse en el momento está construida de los dos lados y hoy está oculta. Falta la última vuelta de prueba para habilitarla.',
            },
            {
              t: 'Nota clínica con IA dentro de la videollamada',
              donde: 'Web',
              d: 'Ya funciona en la consulta presencial. Dentro de la videollamada está apagada hasta terminar de probarla con médicos reales — se enciende con un cambio de configuración.',
            },
            {
              t: 'Pre-consulta en la app',
              donde: 'App',
              d: 'La web le pregunta al paciente por un listado clínico de síntomas; la app todavía pide tres campos de texto libre. Falta emparejarlas para que el médico reciba la misma información en los dos lados.',
            },
            {
              t: 'Medicamentos dentro de la consulta',
              donde: 'Web',
              d: 'Que el profesional pueda armar el pedido de farmacia desde la misma pantalla en la que receta, sin cambiar de lugar. Es lo último que queda del módulo de farmacia.',
            },
          ]}
        />

        <Bloque
          id="b4"
          n="04"
          title="Oferta y especialidades"
          meta="La plataforma está lista para más especialidades de las que hoy están abiertas. Lo que falta es oferta, no software."
          items={[
            {
              t: 'Abrir el resto de las especialidades',
              donde: 'Decisión',
              d: 'Hoy están abiertas Clínica, Pediatría y Salud Mental. Nutrición, Kinesiología, Veterinaria y Preparador físico están construidas y esperando profesionales: se encienden desde el panel cuando haya con quién.',
            },
            {
              t: 'Sumar médicos de guardia',
              donde: 'Decisión',
              d: 'La consulta inmediata de Clínica hoy depende de un solo médico disponible. Tener varios es condición para salir: es la promesa que más se ve en el inicio de la app.',
            },
            {
              t: 'Cerrar los precios',
              donde: 'Decisión',
              d: 'Quedan perfiles verificados sin precio cargado, y falta definir si el piso de $15.000 también aplica a la consulta inmediata —hoy Salud Mental está en $10.000—.',
            },
          ]}
        />

        <Bloque
          id="b5"
          n="05"
          title="Bóveda y seguimiento"
          meta="Análisis, historia clínica y recetas ya son datos reales. El resto de la bóveda todavía muestra contenido de ejemplo."
          items={[
            {
              t: 'Plan Nutricional, Rehab y Físico, Amigo Peludo',
              donde: 'Web + App',
              d: 'Figuran como "Próximamente": las tarjetas están diseñadas y el contenido es de muestra. Hay que decidir cuáles entran al lanzamiento y cuáles se sacan de la vista hasta que tengan datos reales detrás.',
            },
            {
              t: 'El plan nutricional en la app',
              donde: 'App',
              d: 'En la web es real: el nutricionista arma el plan, el paciente marca lo que comió y el profesional ve la adherencia día a día. En la app todavía es una maqueta. Falta portarla.',
            },
            {
              t: 'Recetas de comidas con IA',
              donde: 'Web',
              d: 'Dentro del plan nutricional, sugerir una receta con los alimentos del día. Falta activar el servicio para que quede disponible.',
            },
            {
              t: 'Carga de archivos en el resto de las categorías',
              donde: 'Web + App',
              d: 'Análisis ya sube de verdad y va a parar a la historia clínica. En las demás categorías la carga todavía es demostrativa.',
            },
          ]}
        />

        <Bloque
          id="b6"
          n="06"
          title="Farmacia"
          meta="El circuito completo está construido y probado —catálogo, carrito, checkout, pago y seguimiento del pedido—. Lo que falta es el socio del otro lado del mostrador."
          items={[
            {
              t: 'La farmacia real',
              donde: 'Decisión',
              d: 'Hoy hay una ficha de prueba. Falta el convenio con la farmacia, sus datos y su cuenta de cobro conectada para que la plata le llegue.',
            },
            {
              t: 'La operación del pedido',
              donde: 'Decisión',
              d: 'Definir quién arma el pedido, en qué horarios y cómo se entrega. El seguimiento en la app ya está listo para reflejarlo.',
            },
            {
              t: 'Terminar el catálogo',
              donde: 'Web + App',
              d: '145 de 155 productos ya tienen su foto propia. Faltan 10 fotos y confirmar tres datos de presentación con el laboratorio.',
            },
            {
              t: 'Volver a mostrar la entrada',
              donde: 'Web + App',
              d: 'Farmacia está fuera del menú del paciente a propósito y hoy se llega desde la receta. Se vuelve a mostrar el día que haya farmacia real detrás.',
            },
          ]}
        />

        <Bloque
          id="b7"
          n="07"
          title="Confianza y cumplimiento"
          meta="Lo que hace que la plataforma resista una mirada de afuera."
          items={[
            {
              t: 'Verificación automática de matrícula',
              donde: 'Web',
              d: 'El cruce contra el padrón nacional de profesionales de la salud está construido y listo. Falta el alta institucional en el Ministerio para encenderlo. Hasta entonces la verificación la hace el equipo a mano, una por una.',
            },
            {
              t: 'Facturación',
              donde: 'Decisión',
              d: 'Hoy el profesional sube su factura en PDF y le queda al paciente. La emisión electrónica automática no está incluida: si se quiere, es un desarrollo aparte.',
            },
            {
              t: 'Acuerdo con el proveedor de videollamada',
              donde: 'Decisión',
              d: 'Firmar el acuerdo de confidencialidad de datos de salud con el proveedor de video antes de operar a escala con consultas reales.',
            },
            {
              t: 'Reposición de créditos al profesional',
              donde: 'Decisión',
              d: 'Cuando una consulta se devuelve como crédito para el paciente, la reposición al profesional se hace hoy por transferencia manual. Queda definir si se automatiza o se deja así.',
            },
          ]}
        />

        {/* ── Alcance ──────────────────────────────────────────────────── */}
        <section id="alcance" className="mb-20 md:mb-28 scroll-mt-28">
          <h2 className="font-thunder text-2xl md:text-3xl lg:text-4xl uppercase text-[var(--marco-accent)] mb-4">
            Alcance del cierre
          </h2>
          <p className="text-black/80 text-[15px] max-w-2xl mb-8">
            Con los 29 puntos de arriba entregados y verificados, el trabajo se da por terminado.
            Lo de la derecha no forma parte de la entrega: se puede sumar más adelante como una
            etapa aparte.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="border border-[var(--marco-border)] rounded-lg p-6">
              <p className="font-thunder uppercase text-[var(--marco-accent)] text-lg mb-3">
                Entra
              </p>
              <ul className="space-y-2 text-black/80 text-[15px]">
                <li>— Los 29 puntos de los siete bloques.</li>
                <li>— La plataforma web completa, ya en producción.</li>
                <li>— La app de iPhone, publicada en la App Store.</li>
                <li>— La versión de Android, publicada en Google Play.</li>
                <li>— Acompañamiento durante la salida y ajustes sobre uso real.</li>
              </ul>
            </div>
            <div className="border border-[var(--marco-border)] rounded-lg p-6">
              <p className="font-thunder uppercase text-black/40 text-lg mb-3">No entra</p>
              <ul className="space-y-2 text-black/60 text-[15px]">
                <li>— Obras sociales y prepagas: hoy el paciente paga de su bolsillo.</li>
                <li>— Facturación electrónica automática.</li>
                <li>— Integración con historias clínicas de otras instituciones.</li>
                <li>
                  — Despacho a varios médicos a la vez en la consulta inmediata: se justifica
                  cuando haya volumen, y los cimientos ya están puestos.
                </li>
                <li>— Datos de reloj o pulsera en tiempo real.</li>
                <li>— Odontología y órdenes especializadas.</li>
                <li>— Panel de escritorio dedicado para el paciente: hoy es la vista de celular.</li>
              </ul>
            </div>
          </div>
        </section>

        <BoxedListSection
          title="A confirmar"
          id="confirmar"
          subtitle="Cinco decisiones que dependen de Healthier y que definen la fecha de salida."
          border={false}
          items={[
            'El dominio definitivo con el que la plataforma sale al público.',
            'Si el lanzamiento incluye Android o arranca sólo con iPhone.',
            'Precio del servicio de emergencias, y si sale junto con el resto o en una segunda tanda.',
            'Con qué farmacia se firma, y si la farmacia entra al lanzamiento o queda para después.',
            'Qué especialidades se abren el día uno y cuántos profesionales hay detrás de cada una.',
          ]}
        />

        <BoxedListSection
          title="Costos recurrentes de terceros"
          subtitle="No están incluidos en el desarrollo. Se contratan a nombre de Healthier y se pagan mes a mes según consumo."
          border={false}
          items={[
            'Hosting y base de datos — escalan con la cantidad de consultas y de documentos guardados.',
            'Videollamadas — se pagan por minuto de consulta.',
            'Servicio de receta electrónica — abono mensual por médico habilitado.',
            'Correo transaccional y notificaciones al teléfono.',
            'Dominio y certificado.',
            'Consumo de los modelos de IA — lectura de análisis, nota clínica y asistente del paciente.',
            'Cuentas de desarrollador de App Store y Google Play, anuales.',
            'Comisión de la pasarela de cobro sobre cada consulta.',
          ]}
        />

        <ContentBox title="Cómo seguimos" border={false}>
          <p>
            La propuesta es simple: <strong>este documento es el acta de cierre</strong>. Se
            repasa junto, se ajusta lo que haya que ajustar —sacar algo, sumar algo— y se
            congela. A partir de ahí, cada punto entregado se marca, y cuando están todos, el
            trabajo se da por terminado.
          </p>
          <p>
            Los bloques no dependen entre sí: se pueden ordenar por prioridad. Si la intención es
            salir lo antes posible, el orden natural es{' '}
            <strong>salir al aire → oferta y especialidades → consultas</strong>, y dejar
            emergencias y farmacia para una segunda tanda, con la plataforma ya abierta y datos
            reales sobre la mesa.
          </p>
          <p>
            Lo que venga después de este cierre —nuevas funcionalidades, obras sociales, la
            evolución del producto— se plantea como una etapa nueva, con su propio alcance.
          </p>
        </ContentBox>
      </ScrollReveal>
    </>
  )
}
