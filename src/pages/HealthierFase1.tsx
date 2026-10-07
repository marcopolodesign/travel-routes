import type { CSSProperties, ReactNode } from 'react'
import ContentBox from '../components/ContentBox'
import TwoColumnSection from '../components/TwoColumnSection'
import ScrollNav from '../components/ScrollNav'
import ScrollReveal from '../components/ScrollReveal'
import type { NavItem } from '../components/ScrollNav'

// Cierre de la Fase 1 de Healthier para United Health. Mismo modelo que el
// cierre de Picnic: cómo viaja una consulta, cada rol con sus pantallas reales,
// accesos, cómo operar sin nosotros, recorrido para la demo y qué falta de su
// lado. Farmacia (Fase 1.1) va aparte porque se cobró aparte.
// Las capturas son de staging, con datos de prueba (public/healthier-fase-1/).

const IMG = '/healthier-fase-1'
const GUIA = 'https://www.healthier.com.ar/guia'

// El acento es el verde de Healthier; el formato sigue siendo el de Marco Polo.
const ACENTO = {
  '--marco-accent': '#5f9c70',
  '--marco-accent-light': '#bfe0c8',
} as CSSProperties

const NAV: NavItem[] = [
  { id: 'viaje', label: 'Cómo viaja una consulta' },
  { id: 'roles', label: 'Los roles' },
  { id: 'paciente', label: 'El paciente' },
  { id: 'profesional', label: 'El profesional' },
  { id: 'administracion', label: 'La administración' },
  { id: 'emergencias', label: 'Emergencias' },
  { id: 'tiendas', label: 'Las apps' },
  { id: 'cumplimiento', label: 'Cumplimiento' },
  { id: 'farmacia', label: 'Fase 1.1 · Farmacia' },
  { id: 'accesos', label: 'Configuración y accesos' },
  { id: 'operar', label: 'Para operar sin nosotros' },
  { id: 'recorrido', label: 'Recorrido para la presentación' },
  { id: 'united', label: 'Qué necesitamos de United' },
  { id: 'sigue', label: 'Lo que sigue' },
]

// ── Piezas locales ──────────────────────────────────────────────────────────

function Seccion({
  id,
  n,
  title,
  bajada,
  children,
}: {
  id: string
  n: string
  title: string
  bajada?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="mb-20 md:mb-28 scroll-mt-28">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-thunder text-2xl md:text-4xl uppercase text-[var(--marco-accent)]">
          {n}
        </span>
        <h2 className="font-thunder text-2xl md:text-4xl uppercase text-black">{title}</h2>
      </div>
      {bajada && <p className="text-black/70 text-[15px] md:text-base max-w-2xl mb-8">{bajada}</p>}
      {children}
    </section>
  )
}

type Captura = { src: string; titulo: string; pie: string }

/** Pantallas de teléfono: chicas, en grilla. */
function Telefonos({ items }: { items: Captura[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6">
      {items.map((it) => (
        <figure key={it.src} className="min-w-0">
          <img
            src={`${IMG}/${it.src}.webp`}
            alt={it.titulo}
            loading="lazy"
            className="w-full max-w-[240px] rounded-lg border border-[var(--marco-border)]"
          />
          <figcaption className="mt-3 max-w-[240px]">
            <p className="font-thunder uppercase text-black text-base leading-tight">{it.titulo}</p>
            <p className="text-sm text-black/60 mt-1">{it.pie}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

/** Pantallas de escritorio: de a dos. */
function Pantallas({ items }: { items: Captura[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
      {items.map((it) => (
        <figure key={it.src} className="min-w-0">
          <img
            src={`${IMG}/${it.src}.webp`}
            alt={it.titulo}
            loading="lazy"
            className="w-full rounded-lg border border-[var(--marco-border)]"
          />
          <figcaption className="mt-3">
            <p className="font-thunder uppercase text-black text-lg leading-tight">{it.titulo}</p>
            <p className="text-[15px] text-black/70 mt-1 max-w-xl">{it.pie}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

function Lista({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2 text-black/80 text-[15px]">
      {items.map((it, i) => (
        <li key={i}>— {it}</li>
      ))}
    </ul>
  )
}

function Recuadro({ title, children, apagado }: { title: string; children: ReactNode; apagado?: boolean }) {
  return (
    <div className="border border-[var(--marco-border)] rounded-lg p-6 min-w-0">
      <p
        className={`font-thunder uppercase text-lg mb-3 ${
          apagado ? 'text-black/40' : 'text-[var(--marco-accent)]'
        }`}
      >
        {title}
      </p>
      {children}
    </div>
  )
}

function Enlace({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline decoration-[var(--marco-accent)] underline-offset-4 break-words"
    >
      {children}
    </a>
  )
}

// ── Página ──────────────────────────────────────────────────────────────────

export default function HealthierFase1() {
  return (
    <div style={ACENTO}>
      <ScrollNav items={NAV} />

      {/* Portada */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          United Health · Healthier · Cierre de la Fase 1
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Healthier,<br />probada y<br />en uso
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          La Fase 1 dejó andando la plataforma completa: el paciente reserva o pide atención
          inmediata y paga con Mercado Pago, el profesional atiende por videollamada con la
          historia clínica y la receta electrónica a mano, la administración ve todo lo que pasa, y
          el servicio de emergencias tiene a cada actor en su pantalla. Todo probado de punta a
          punta, con profesionales reales ya trabajando. La Fase 1.1 suma la farmacia.
        </p>

        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">
              Profesionales verificados
            </span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">41</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">
              Cobran directo en Mercado Pago
            </span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">38</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Roles con su pantalla</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">6</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Guías de uso</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Una por rol</p>
          </div>
        </div>
      </div>

      <ScrollReveal>
        {/* Índice */}
        <section className="mb-20 md:mb-28">
          <h3 className="font-thunder text-2xl md:text-3xl uppercase text-black mb-5">
            En este documento
          </h3>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 text-[15px]">
            {NAV.map((it, i) => (
              <li key={it.id}>
                <a href={`#${it.id}`} className="text-black/80 hover:text-[var(--marco-accent)]">
                  <span className="font-thunder text-[var(--marco-accent)] mr-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {it.label}
                </a>
              </li>
            ))}
          </ol>
        </section>

        {/* 1 · Cómo viaja una consulta */}
        <Seccion
          id="viaje"
          n="01"
          title="Cómo viaja una consulta"
          bajada="El mismo circuito para todos. Cada rol ve su tramo, en la web o en la app."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              ['El paciente la pide', 'Saca un turno o pide atención inmediata, y paga con Mercado Pago.'],
              ['El profesional atiende', 'Lo hace pasar a la sala, carga la historia clínica y receta.'],
              ['Se cierra con un código', 'El paciente comparte su código y recibe el resumen y la receta.'],
              ['La plata llega sola', 'El cobro se acredita directo en la cuenta de Mercado Pago del profesional.'],
              ['Healthier lo sigue', 'Pagos, verificaciones y avisos, todo a la vista del equipo.'],
            ].map(([t, d], i) => (
              <div key={t} className="border border-[var(--marco-border)] rounded-lg p-5">
                <span className="font-thunder text-[var(--marco-accent)] text-xl">{i + 1}</span>
                <p className="font-thunder uppercase text-black text-lg leading-tight mt-1">{t}</p>
                <p className="text-[15px] text-black/70 mt-2">{d}</p>
              </div>
            ))}
          </div>
        </Seccion>

        {/* 2 · Los roles */}
        <Seccion
          id="roles"
          n="02"
          title="Los roles"
          bajada="Seis roles, cada uno con su entrada y sólo lo que le toca."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Recuadro title="Paciente">
              <p className="text-[15px] text-black/80">
                Desde la app o la web: reserva, consulta inmediata, videollamada, su historia clínica,
                recetas, Bóveda, grupo familiar y el botón de emergencia.
              </p>
            </Recuadro>
            <Recuadro title="Profesional">
              <p className="text-[15px] text-black/80">
                Se da de alta solo, pasa la verificación, arma su agenda y sus precios, atiende con el
                consultorio digital y cobra directo en su Mercado Pago.
              </p>
            </Recuadro>
            <Recuadro title="Administración">
              <p className="text-[15px] text-black/80">
                El equipo de Healthier: verifica profesionales, sigue consultas y pagos, y mueve las
                palancas del negocio desde el panel.
              </p>
            </Recuadro>
            <Recuadro title="Emergencias">
              <p className="text-[15px] text-black/80">
                Tres puntas: el coordinador de ambulancias asigna, la tripulación sale y el médico a
                bordo atiende en el lugar con el mismo panel clínico.
              </p>
            </Recuadro>
            <Recuadro title="Farmacia · Fase 1.1">
              <p className="text-[15px] text-black/80">
                Con usuario propio: catálogo, pedidos, preparación y entrega con un código.
              </p>
            </Recuadro>
            <div className="border border-[var(--marco-border)] rounded-lg p-6 bg-[var(--marco-accent-light)]/20">
              <p className="text-[15px] text-black/80">
                Los permisos viven en la base de datos, no en la pantalla: nadie ve lo que no le toca
                aunque entre por otro lado. Los documentos médicos se guardan con acceso privado.
              </p>
            </div>
          </div>
        </Seccion>

        {/* 3 · El paciente */}
        <Seccion
          id="paciente"
          n="03"
          title="El paciente"
          bajada="Todo el recorrido, desde que entra hasta que tiene su receta. Lo mismo en la app y en la web."
        >
          <Telefonos
            items={[
              { src: 'pac-app-inicio', titulo: 'El inicio', pie: 'Atención inmediata por especialidad, sus turnos y accesos rápidos.' },
              { src: 'pac-ondemand', titulo: 'Consulta inmediata', pie: 'Elige un profesional disponible ahora y entra a la sala.' },
              { src: 'pac-reservar', titulo: 'Sacar un turno', pie: 'Especialidad, modalidad, profesional, día y horario.' },
              { src: 'pac-pago', titulo: 'El pago', pie: 'Mercado Pago, con la tarjeta guardada para la próxima.' },
              { src: 'pac-sala', titulo: 'Sala de espera', pie: 'Pre-consulta con sus síntomas antes de entrar.' },
              { src: 'pac-videollamada', titulo: 'Videollamada', pie: 'Propia de Healthier, en la app y en la web.' },
              { src: 'pac-resumen', titulo: 'El resumen', pie: 'Lo indicado y la receta, al terminar.' },
              { src: 'pac-receta', titulo: 'Receta electrónica', pie: 'Con validez legal y la firma del profesional.' },
              { src: 'pac-app-historia', titulo: 'Historia clínica', pie: 'Diagnósticos, medicación, alergias y evolución, en PDF.' },
              { src: 'pac-app-boveda', titulo: 'Bóveda', pie: 'Análisis, estudios, recetas y planes en carpetas.' },
              { src: 'pac-biovisor', titulo: 'Biovisor', pie: 'Lee el análisis de sangre: cada valor con su rango y su evolución.' },
              { src: 'pac-nutriplan', titulo: 'Plan nutricional', pie: 'El que arma su nutricionista, comida por comida.' },
              { src: 'pac-familiar', titulo: 'Grupo familiar', pie: 'Cada familiar con su perfil, sus turnos y su historia.' },
              { src: 'pac-acceso-familiar', titulo: 'Acceso del familiar', pie: 'Entra con un código, sin contraseña.' },
              { src: 'pac-mascotas', titulo: 'Amigo peludo', pie: 'Sus mascotas, con sus estudios.' },
              { src: 'pac-sos', titulo: 'Emergencia S.O.S.', pie: 'Reserva el monto y pide la ambulancia con médico.' },
            ]}
          />
        </Seccion>

        {/* 4 · El profesional */}
        <Seccion
          id="profesional"
          n="04"
          title="El profesional"
          bajada="Su consultorio digital. Trabaja desde la web y sigue su día desde la app."
        >
          <Pantallas
            items={[
              { src: 'pro-onboarding', titulo: 'Alta guiada', pie: 'Título, matrícula, seguro y documentación, con lo que le falta a la vista.' },
              { src: 'pro-inicio', titulo: 'Su inicio', pie: 'Los turnos del día, la consulta inmediata y su link para traer pacientes.' },
              { src: 'pro-agenda', titulo: 'Agenda', pie: 'Horarios por semana, turnos de 15 minutos, presencial y por video.' },
              { src: 'pro-tarifas', titulo: 'Precios', pie: 'Uno por modalidad y por tipo de consulta.' },
              { src: 'pro-sala', titulo: 'La consulta', pie: 'Dentro de la videollamada: historia clínica, síntomas, copiloto clínico, indicaciones y estudios.' },
              { src: 'pro-receta', titulo: 'Recetario', pie: 'Receta electrónica con validez legal, desde la misma pantalla.' },
              { src: 'pro-firma', titulo: 'Su firma', pie: 'Se carga una vez y va en cada receta.' },
              { src: 'pro-presencial', titulo: 'Consulta presencial', pie: 'Con la nota clínica que arma la IA, para revisar y confirmar.' },
              { src: 'pro-pacientes', titulo: 'Sus pacientes', pie: 'Listado, ficha e historial de cada uno.' },
              { src: 'pro-ganancias', titulo: 'Ganancias', pie: 'Lo acreditado de verdad en su Mercado Pago, mes a mes.' },
            ]}
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-[minmax(0,240px)_1fr] gap-6 items-start">
            <img
              src={`${IMG}/pro-app-inicio.webp`}
              alt="El profesional en la app"
              loading="lazy"
              className="w-full max-w-[240px] rounded-lg border border-[var(--marco-border)]"
            />
            <div className="max-w-xl">
              <p className="font-thunder uppercase text-black text-lg">También en la app</p>
              <p className="text-[15px] text-black/70 mt-2">
                Su inicio, la agenda, sus pacientes y su perfil, y la videollamada con el mismo
                panel clínico de la web. Le llega el aviso al teléfono cuando un paciente entra a la
                sala.
              </p>
            </div>
          </div>
        </Seccion>

        {/* 5 · La administración */}
        <Seccion
          id="administracion"
          n="05"
          title="La administración"
          bajada="El panel del equipo de Healthier. Todo lo que pasa en la plataforma se ve acá."
        >
          <Pantallas
            items={[
              { src: 'sa-profesionales', titulo: 'Profesionales', pie: 'La cola de verificación y el estado de la cuenta de cobro de cada uno.' },
              { src: 'sa-profesional', titulo: 'La ficha de cada uno', pie: 'Documentos, matrícula, verificación o rechazo con motivo.' },
              { src: 'sa-consultas', titulo: 'Consultas', pie: 'Cada consulta con su línea de tiempo.' },
              { src: 'sa-pagos', titulo: 'Pagos', pie: 'Cobros, devoluciones y créditos, con la consulta asociada.' },
              { src: 'sa-settings', titulo: 'Palancas del negocio', pie: 'Comisión, ventana de devolución y duración del turno, sin tocar código.' },
              { src: 'sa-verticales', titulo: 'Especialidades', pie: 'Qué se abre al público y a qué precio la consulta inmediata.' },
              { src: 'sa-auditoria', titulo: 'Auditoría de la historia clínica', pie: 'Quién vio qué y cuándo.' },
              { src: 'sa-mails', titulo: 'Mails', pie: 'Lo que salió a cada persona y si llegó.' },
            ]}
          />
        </Seccion>

        {/* 6 · Emergencias */}
        <Seccion
          id="emergencias"
          n="06"
          title="Emergencias"
          bajada="El servicio completo, con una pantalla para cada uno: el paciente, el coordinador de ambulancias, la tripulación y el médico a bordo."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              ['El paciente pide', 'Reserva el monto en su tarjeta y cuenta qué le pasa.'],
              ['Coordinación asigna', 'Le llega el aviso y elige el móvil más conveniente.'],
              ['La tripulación sale', 'Acepta, navega y el paciente la ve llegar en el mapa.'],
              ['El médico atiende', 'En el lugar, con el panel clínico. Se cierra y se cobra.'],
            ].map(([t, d], i) => (
              <div key={t} className="border border-[var(--marco-border)] rounded-lg p-5">
                <span className="font-thunder text-[var(--marco-accent)] text-xl">{i + 1}</span>
                <p className="font-thunder uppercase text-black text-lg leading-tight mt-1">{t}</p>
                <p className="text-[15px] text-black/70 mt-2">{d}</p>
              </div>
            ))}
          </div>
          <Pantallas
            items={[
              { src: 'emg-cola', titulo: 'La cola del coordinador', pie: 'Cada pedido con su gravedad, sus síntomas y el tiempo de espera.' },
              { src: 'emg-asignar', titulo: 'Asignar un móvil', pie: 'Con la tripulación y la distancia de cada uno.' },
              { src: 'emg-mapa', titulo: 'El mapa', pie: 'Los pedidos y la flota, en vivo.' },
              { src: 'emg-ambulancias', titulo: 'La flota', pie: 'Móviles, patentes y tripulación de cada uno.' },
            ]}
          />
          <div className="mt-10">
            <Telefonos
              items={[
                { src: 'pac-sos', titulo: 'El pedido', pie: 'Se reserva el monto y se cobra sólo si la ambulancia sale.' },
                { src: 'em-pac-07-asignada', titulo: 'Asignada', pie: 'El paciente ve qué móvil va y lo sigue en el mapa.' },
                { src: 'emg-tripulacion', titulo: 'La tripulación', pie: 'Navega hasta el paciente y avisa al llegar.' },
                { src: 'em-tri-06-atencion', titulo: 'El médico a bordo', pie: 'Atiende con el panel clínico; queda en la historia clínica.' },
              ]}
            />
          </div>
        </Seccion>

        {/* 7 · Las apps */}
        <Seccion
          id="tiendas"
          n="07"
          title="Las apps en las tiendas"
          bajada="Una sola app para pacientes y profesionales, en iPhone y en Android."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Recuadro title="iPhone">
              <Lista
                items={[
                  'Publicada en la App Store.',
                  'Entrada con mail, Google o Apple, y Face ID.',
                  'Conectada a Apple Health: los signos vitales llegan a la consulta.',
                ]}
              />
            </Recuadro>
            <Recuadro title="Android">
              <Lista
                items={[
                  'Enviada a Google Play para su publicación.',
                  'Cuenta de desarrollador de organización a nombre de United Health S.A.',
                  'La misma app y el mismo recorrido que en iPhone.',
                ]}
              />
            </Recuadro>
          </div>
          <p className="text-[15px] text-black/70 max-w-2xl mt-6">
            Los cambios de pantalla y de contenido llegan a los teléfonos al instante, sin esperar
            una versión nueva en la tienda.
          </p>
        </Seccion>

        {/* 8 · Cumplimiento */}
        <Seccion
          id="cumplimiento"
          n="08"
          title="Cumplimiento"
          bajada="Lo que hace que la plataforma resista una mirada de afuera."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Recuadro title="Historia clínica">
              <Lista
                items={[
                  'Retención legal a diez años, garantizada por la propia base de datos.',
                  'Dar de baja a un usuario conserva su historia clínica entera; si vuelve, recupera su cuenta.',
                  'Registro de quién consultó cada historia y cuándo.',
                ]}
              />
            </Recuadro>
            <Recuadro title="Receta electrónica">
              <Lista
                items={[
                  'Con validez legal, emitida por el servicio de recetas habilitado.',
                  'Lleva la firma del profesional: sin firma cargada, no se emite.',
                  'Medicamentos y obras sociales elegidos del listado oficial, nunca a mano.',
                ]}
              />
            </Recuadro>
            <Recuadro title="Datos personales">
              <Lista
                items={[
                  'Base de datos inscripta en el registro nacional.',
                  'Términos y condiciones al día con la normativa de telesalud.',
                ]}
              />
            </Recuadro>
            <Recuadro title="Ministerio de Salud">
              <Lista
                items={[
                  'Healthier dada de alta en la Plataforma de Interoperabilidad del Ministerio, a nombre de United Health S.A.',
                  'Con la aprobación, la matrícula de cada profesional se valida sola contra el padrón nacional. Mientras tanto, el equipo la verifica una por una.',
                ]}
              />
            </Recuadro>
          </div>
        </Seccion>

        {/* Lo que se entrega con el cierre — puntos del acta que se terminan dentro de la Fase 1 */}
        <ContentBox title="Se entregan con el cierre" id="cierre" border={false}>
          <p className="text-[15px] text-black/80 max-w-2xl">
            Tres ajustes del acta de septiembre que forman parte de esta fase y se entregan con el
            cierre:
          </p>
          <Lista
            items={[
              'Aviso por WhatsApp al coordinador y a la tripulación cuando entra una emergencia, además del aviso al teléfono.',
              'Recetas de comidas con IA dentro del plan nutricional, con los alimentos del día.',
              'Subir archivos propios en las carpetas de Salud Mental, Rehabilitación y Preparador Físico de la Bóveda web, como ya se hace en Análisis y en la app.',
            ]}
          />
        </ContentBox>

        {/* 9 · Fase 1.1 — Farmacia */}
        <Seccion
          id="farmacia"
          n="09"
          title="Fase 1.1 · Farmacia"
          bajada="El circuito completo de la receta a la puerta de casa, con un panel propio para la farmacia."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {[
              ['El profesional receta', 'Emite la receta electrónica en la consulta.'],
              ['El paciente compra', 'Desde la receta o el catálogo, elige la dirección y paga.'],
              ['La farmacia prepara', 'Lo pasa a "En preparación" y después a "Enviado".'],
              ['Llega con un código', 'El paciente le dice su código de 4 números a quien entrega.'],
              ['Se cierra', 'La farmacia carga el código y el pedido queda entregado.'],
            ].map(([t, d], i) => (
              <div key={t} className="border border-[var(--marco-border)] rounded-lg p-5">
                <span className="font-thunder text-[var(--marco-accent)] text-xl">{i + 1}</span>
                <p className="font-thunder uppercase text-black text-lg leading-tight mt-1">{t}</p>
                <p className="text-[15px] text-black/70 mt-2">{d}</p>
              </div>
            ))}
          </div>
          <Pantallas
            items={[
              { src: 'far-pedidos', titulo: 'Pedidos', pie: 'Todos los pedidos con su estado y su pago, y la acción que sigue.' },
              { src: 'far-pedido', titulo: 'Un pedido', pie: 'Lo recetado, la dirección y la historia del pedido.' },
              { src: 'far-catalogo', titulo: 'Catálogo', pie: '169 productos. La farmacia sube o cambia cada foto desde acá.' },
              { src: 'far-entregar', titulo: 'Entrega con código', pie: 'Sólo se cierra con el código del paciente.' },
            ]}
          />
          <div className="mt-10">
            <Telefonos
              items={[
                { src: 'pac-farmacia', titulo: 'La farmacia en la app', pie: 'Catálogo con fotos, filtros y carrito.' },
                { src: 'pac-pedido', titulo: 'Su pedido', pie: 'El paciente lo sigue paso a paso.' },
              ]}
            />
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Recuadro title="Lo que quedó andando">
              <Lista
                items={[
                  'Catálogo con fotos, carrito que no se pierde al cerrar la app, checkout y pago.',
                  'De la receta al carrito con "Comprar todos".',
                  'Seguimiento del pedido y entrega con código de 4 números.',
                  'Panel de farmacia con usuario propio: pedidos, catálogo y configuración.',
                  'Cancelación con motivo, y todo a la vista de la administración.',
                ]}
              />
            </Recuadro>
            <Recuadro title="Cómo se abre al público">
              <p className="text-[15px] text-black/80">
                Hoy la farmacia está visible para las cuentas del equipo, para probarla de punta a
                punta. Se abre a todos los pacientes con un cambio, el día que la farmacia que la
                opera esté conectada.
              </p>
            </Recuadro>
          </div>
        </Seccion>

        {/* 10 · Configuración y accesos */}
        <Seccion
          id="accesos"
          n="10"
          title="Configuración y accesos"
          bajada="Lo que se maneja desde el panel, sin pedirle nada a nadie, y lo que está a nombre de United."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Recuadro title="Desde el panel">
              <Lista
                items={[
                  'La comisión de Healthier sobre cada consulta.',
                  'Qué especialidades se abren y el precio de la consulta inmediata de cada una.',
                  'Ventana de devolución y duración del turno.',
                  'Zonas, administradores y el coordinador de ambulancias.',
                  'Verificación de profesionales, con motivo cuando se rechaza.',
                ]}
              />
            </Recuadro>
            <Recuadro title="A nombre de United Health S.A.">
              <Lista
                items={[
                  'El dominio healthier.com.ar y los mails que salen de él.',
                  'La cuenta de Mercado Pago de la plataforma; cada profesional cobra en la suya.',
                  'Google Play, como cuenta de organización.',
                  'El número D-U-N-S de la empresa, que piden las tiendas.',
                  'El alta en la Plataforma de Interoperabilidad del Ministerio de Salud.',
                ]}
              />
            </Recuadro>
          </div>
        </Seccion>

        {/* 11 · Para operar sin nosotros */}
        <Seccion
          id="operar"
          n="11"
          title="Para operar sin nosotros"
          bajada="Cada rol tiene su guía de uso, con capturas reales, paso a paso. Se abren con un link, sin iniciar sesión, y desde el menú de cada uno."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Recuadro title="Guías de uso">
              <ul className="space-y-2 text-black/80 text-[15px]">
                <li>— Paciente: <Enlace href={`${GUIA}/paciente`}>healthier.com.ar/guia/paciente</Enlace></li>
                <li>— Profesional: <Enlace href={`${GUIA}/profesional`}>healthier.com.ar/guia/profesional</Enlace></li>
                <li>— Emergencias: <Enlace href={`${GUIA}/emergencias`}>healthier.com.ar/guia/emergencias</Enlace></li>
                <li>— Farmacia: <Enlace href={`${GUIA}/farmacia`}>healthier.com.ar/guia/farmacia</Enlace></li>
                <li>— Administración: <Enlace href={`${GUIA}/super-admin`}>healthier.com.ar/guia/super-admin</Enlace>, con su sesión.</li>
              </ul>
            </Recuadro>
            <Recuadro title="Y además">
              <Lista
                items={[
                  'Un recorrido guiado la primera vez, para el paciente y para el profesional.',
                  'Una consulta de práctica para que el profesional conozca el panel antes de su primer paciente.',
                  'Dos ambientes: producción para operar y uno de pruebas para probar y capacitar sin tocar datos reales.',
                  'Chequeos automáticos de los circuitos que no pueden fallar: cobros, alta de cuenta, receta y consulta inmediata.',
                ]}
              />
            </Recuadro>
          </div>
        </Seccion>

        {/* 12 · Recorrido para la presentación */}
        <Seccion
          id="recorrido"
          n="12"
          title="Recorrido para la presentación"
          bajada="En el ambiente de pruebas, con cuentas de demostración, unos 25 minutos. Las cuentas se pasan aparte."
        >
          <div className="space-y-3">
            {[
              ['1 · Paciente', '5 min', 'En el teléfono: el inicio, pedir una consulta inmediata, sacar un turno y pagarlo. Abrir la Bóveda y el Biovisor.'],
              ['2 · Profesional', '6 min', 'Su inicio y su agenda. Hacer pasar al paciente, cargar la nota, emitir la receta y cerrar con el código.'],
              ['3 · Paciente', '2 min', 'El resumen con la receta, y la historia clínica actualizada.'],
              ['4 · Emergencias', '6 min', 'El paciente pide S.O.S.; el coordinador asigna un móvil; la tripulación sale y el paciente la ve en el mapa; el médico atiende.'],
              ['5 · Farmacia', '4 min', 'De la receta al carrito, el pago, y la farmacia lo prepara, lo envía y lo entrega con el código.'],
              ['6 · Administración', '2 min', 'La consulta, el pago y la emergencia, cada uno con su línea de tiempo. Abrir una guía de uso.'],
            ].map(([rol, min, d]) => (
              <div
                key={rol}
                className="border border-[var(--marco-border)] rounded-lg p-5 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-6"
              >
                <div className="flex items-baseline gap-3 sm:block">
                  <p className="font-thunder uppercase text-black text-lg leading-tight">{rol}</p>
                  <p className="text-sm text-black/50 sm:mt-1">{min}</p>
                </div>
                <p className="text-[15px] text-black/80">{d}</p>
              </div>
            ))}
          </div>
        </Seccion>

        {/* 13 · Qué necesitamos de United */}
        <Seccion
          id="united"
          n="13"
          title="Qué necesitamos de United"
          bajada="Lo que está del lado de United para abrir cada parte al público."
        >
          <div className="border border-[var(--marco-border)] rounded-lg overflow-hidden">
            {[
              ['La entidad de ambulancias', 'Sus datos, sus móviles y su tripulación, para encender Emergencias para todos los pacientes.'],
              ['El precio de la emergencia', 'Cuánto vale el servicio y si es único o depende de la gravedad. Hoy hay un valor de prueba.'],
              ['Pasar la cuenta de Apple a organización', 'Con el D-U-N-S que ya tiene United; lo hace el titular de la cuenta.'],
              ['Profesionales para abrir más especialidades', 'Nutrición, Kinesiología, Preparador Físico y Veterinaria están listas y se encienden desde el panel.'],
              ['Firma y dirección de los profesionales', 'La firma para recetar y la dirección para aparecer en el mapa. Ya se les pidió por mail.'],
              ['El buscador de alimentos', 'Habilitar el acceso en la cuenta actual o elegir otro proveedor, para el catálogo completo del plan nutricional.'],
              ['El acuerdo con el proveedor de videollamada', 'Firmar el acuerdo de confidencialidad de datos de salud antes de operar a escala.'],
              ['Los créditos al profesional', 'Si la reposición cuando una consulta se devuelve en crédito sigue por transferencia o se automatiza.'],
              ['Farmacia · Fase 1.1', 'La farmacia que la opera, su cuenta de Mercado Pago, horarios y forma de entrega, y el día en que se abre a todos.'],
            ].map(([q, d]) => (
              <div
                key={q}
                className="grid grid-cols-1 sm:grid-cols-[minmax(0,280px)_1fr] gap-1 sm:gap-6 p-5 border-b border-[var(--marco-border)] last:border-b-0"
              >
                <p className="font-thunder uppercase text-black text-lg leading-tight">{q}</p>
                <p className="text-[15px] text-black/80">{d}</p>
              </div>
            ))}
          </div>
        </Seccion>

        {/* 14 · Lo que sigue */}
        <Seccion id="sigue" n="14" title="Lo que sigue">
          <TwoColumnSection title="Con el cierre" withBar={false}>
            <p>
              Con este documento repasado, la Fase 1 se da por cerrada y la Fase 1.1 queda lista para
              abrirse el día que la farmacia esté conectada. Emergencias se enciende para todos con la
              entidad de ambulancias cargada.
            </p>
          </TwoColumnSection>
          <TwoColumnSection title="Próxima etapa" withBar={false}>
            <p>Lo que ya tiene los cimientos puestos y se puede sumar como una etapa aparte:</p>
            <Lista
              items={[
                'Atención sin turno: una fila para atenderse en el momento con el primero que se libere.',
                'La nota clínica con IA también dentro de la videollamada.',
                'Armar el pedido de farmacia desde la misma pantalla en la que se receta.',
                'Despacho a varios médicos a la vez en la consulta inmediata, cuando haya volumen.',
                'Obras sociales y prepagas, y facturación electrónica automática.',
              ]}
            />
          </TwoColumnSection>
        </Seccion>
      </ScrollReveal>
    </div>
  )
}
