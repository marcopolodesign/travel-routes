import ContentBox from '../components/ContentBox'
import TwoColumnSection from '../components/TwoColumnSection'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'boveda', label: 'Bóveda' },
  { id: 'planes', label: 'Planes y mascotas' },
  { id: 'perfil', label: 'Perfil' },
  { id: 'seguridad', label: 'Face ID' },
  { id: 'farmacia', label: 'Farmacia' },
  { id: 'profesional', label: 'Profesionales' },
  { id: 'campanas', label: 'Campañas' },
  { id: 'android', label: 'Android' },
  { id: 'decisiones', label: 'Qué sigue' },
]

const IMG = '/healthier-semana'

/** Dónde vive cada cosa y en qué estado está. */
function Estado({ donde, estado }: { donde: string; estado: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      <span className="text-[11px] uppercase tracking-wide text-black/50 border border-[var(--marco-border)] rounded-full px-2.5 py-0.5">
        {donde}
      </span>
      <span className="text-[13px] text-black/70">{estado}</span>
    </div>
  )
}

function Lista({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-black/80 text-[15px]">
      {items.map((it) => (
        <li key={it}>— {it}</li>
      ))}
    </ul>
  )
}

/** Capturas de la app, chicas y en grilla, como la vertical de Picnic. */
function Pantallas({ items }: { items: { src: string; alt: string; pie: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-3">
      {items.map((it) => (
        <figure key={it.src}>
          <img
            src={`${IMG}/${it.src}`}
            alt={it.alt}
            className="w-full rounded-lg border border-[var(--marco-border)]"
            style={{ maxWidth: 240 }}
          />
          <figcaption className="text-sm text-black/50 mt-2" style={{ maxWidth: 240 }}>
            {it.pie}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

function TambienWeb({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] text-black/70">
      <span className="font-thunder uppercase text-[var(--marco-accent)] text-lg mr-2">
        También en la web
      </span>
      {children}
    </p>
  )
}

export default function HealthierSemana() {
  return (
    <>
      <ScrollNav items={NAV} />

      {/* ── Portada ───────────────────────────────────────────── */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          Healthier · Semana del 18 al 24 de septiembre
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Healthier se siente
          <br />
          como una app
          <br />
          nativa
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          Inicio nuevo, Bóveda en carpetas, Face ID con pantalla de bloqueo y los pedidos de
          Nacho listos para salir. Esta semana nos enfocamos en la experiencia del paciente en la
          app y en la web, sumamos memoria clínica —mascotas, planes de actividad, estudios por
          especialidad— y dejamos lista la ficha de Google Play.
        </p>

        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">
              Versiones en TestFlight
            </span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">4</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">
              Plataformas actualizadas
            </span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">App y web</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">
              Pantallas con el diseño nuevo
            </span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">11</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">
              Teléfonos listos para WhatsApp
            </span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">178</p>
          </div>
        </div>
      </div>

      {/* ── 1. Inicio ─────────────────────────────────────────── */}
      <TwoColumnSection title="Inicio y consulta inmediata" id="inicio">
        <p className="text-lg">
          El inicio del paciente se rearmó alrededor de la consulta inmediata: un carrusel con
          las cuatro especialidades, cada una con su foto y su color, que muestra en vivo quién
          está en línea. Si en ese momento no hay nadie, la app lo explica y lleva directo a
          sacar un turno.
        </p>
        <p className="max-w-2xl">
          La app y la web usan ahora el mismo criterio para mostrar "disponible ahora", así que
          la información coincide en todas las pantallas.
        </p>
        <Lista
          items={[
            'Ver en el inicio qué especialidades tienen un profesional en línea y empezar la consulta con un toque.',
            'Sacar un turno al instante cuando no hay nadie conectado, desde una hoja que lo explica.',
            'Buscar profesionales por nombre y ver quién está disponible ahora y quién está en consulta.',
            'Recibir avisos en una campana nueva —recetas, pedidos, resúmenes de consulta, comprobantes—, aunque no tenga activadas las notificaciones del teléfono.',
            'Encontrar "Agendá tu consulta médica" en la pestaña Turnos, con una burbuja de color por especialidad.',
          ]}
        />
        <Estado
          donde="App y web"
          estado="App en TestFlight · web lista para salir · criterio único de “disponible ahora”: listo para salir"
        />
        <Pantallas
          items={[
            {
              src: '02-inicio.jpg',
              alt: 'Inicio del paciente con el carrusel de consulta inmediata',
              pie: 'El inicio, con el carrusel de consulta inmediata.',
            },
            {
              src: '03-buscar.jpg',
              alt: 'Búsqueda de profesionales por nombre',
              pie: 'Búsqueda por nombre: "Consulta ahora" sólo para quien está en línea.',
            },
            {
              src: '14-turnos.jpg',
              alt: 'Pestaña Turnos con las especialidades',
              pie: 'Turnos, con una burbuja de color por especialidad.',
            },
          ]}
        />
        <TambienWeb>
          el paciente ve el mismo inicio y la campana de avisos desde su panel.
        </TambienWeb>
      </TwoColumnSection>

      {/* ── 2. Bóveda ─────────────────────────────────────────── */}
      <TwoColumnSection title="Bóveda y estudios" id="boveda">
        <p className="text-lg">
          La Bóveda pasó a una pila de carpetas que se abren a medida que el paciente baja con
          el scroll. Los estudios por imágenes ahora se cargan con nombre y especialidad, y el
          profesional los ve ordenados en la historia clínica del paciente.
        </p>
        <p className="max-w-2xl">
          El historial de análisis de sangre muestra todos los marcadores en una sola página,
          con su último valor y su tendencia.
        </p>
        <Lista
          items={[
            'Recorrer la Bóveda en carpetas apiladas: análisis, NutriPlan, farmacia y planes.',
            'Subir un estudio desde el teléfono con nombre y especialidad: odontología, medicina, kinesiología, pediatría u otra.',
            'Ver todo el historial de análisis de sangre en una sola página, marcador por marcador.',
            'Como profesional, abrir la solapa "Estudios" del paciente, filtrada de entrada por su propia especialidad.',
          ]}
        />
        <Estado
          donde="App y web"
          estado="Carpetas: app en TestFlight, web lista para salir · estudios con especialidad e historial de sangre: listo para salir"
        />
        <Pantallas
          items={[
            {
              src: '04-boveda.jpg',
              alt: 'Bóveda con las carpetas apiladas',
              pie: 'La Bóveda, con las carpetas apiladas.',
            },
            {
              src: '05-estudio-datos.jpg',
              alt: 'Hoja para elegir especialidad y nombre al subir un estudio',
              pie: 'Al subir un estudio se elige su nombre y su especialidad.',
            },
            {
              src: '06-estudios-lista.jpg',
              alt: 'Lista de estudios con nombre, especialidad y fecha',
              pie: 'Cada estudio con su nombre, especialidad y fecha.',
            },
            {
              src: '07-historial-sangre.jpg',
              alt: 'Historial de análisis de sangre en una página',
              pie: 'Todos los marcadores en una página, con su tendencia.',
            },
          ]}
        />
        <TambienWeb>
          la Bóveda en carpetas, y el profesional ve la solapa "Estudios" en la historia clínica
          del paciente.
        </TambienWeb>
      </TwoColumnSection>

      {/* ── 3. Planes y mascotas ──────────────────────────────── */}
      <TwoColumnSection title="Planes de actividad y Amigo peludo" id="planes">
        <p className="text-lg">
          Salud Mental, Rehabilitación y Preparador Físico tienen ahora su plan, igual que el de
          nutrición: el profesional lo arma desde su panel y el paciente lo ve en la Bóveda, con
          su historial.
        </p>
        <p className="max-w-2xl">
          Las mascotas pasaron a ser parte del perfil del paciente: se cargan una vez, se eligen
          al reservar y guardan sus propios estudios.
        </p>
        <Lista
          items={[
            'Como profesional, armar un plan con indicaciones y ejercicios desde la consulta o desde el menú.',
            'Como paciente, ver el plan vigente y los anteriores en la Bóveda.',
            'Cargar, editar y dar de baja mascotas, y elegirlas al pedir un turno veterinario.',
            'Guardar los estudios de cada mascota en su propia ficha; el veterinario los ve en el detalle de la consulta.',
          ]}
        />
        <Estado
          donde="App y web"
          estado="Planes y mascotas: app en TestFlight, web lista para salir · estudios por mascota: listo para salir · la vertical veterinaria se enciende cuando la habiliten"
        />
        <Pantallas
          items={[
            {
              src: '08-amigo-peludo.jpg',
              alt: 'Ficha de mascota en Amigo peludo',
              pie: 'Amigo peludo: las mascotas, parte del perfil.',
            },
            {
              src: '09-mascota-estudios.jpg',
              alt: 'Estudios de la mascota',
              pie: 'Cada mascota guarda sus propios estudios.',
            },
          ]}
        />
        <TambienWeb>
          el profesional arma los planes de actividad desde su panel.
        </TambienWeb>
      </TwoColumnSection>

      {/* ── 4. Perfil ─────────────────────────────────────────── */}
      <TwoColumnSection title="Perfil, Apple Health y diseño" id="perfil">
        <p className="text-lg">
          El Perfil se rediseñó con una tarjeta de perfil clínico, acceso a Apple Health y listas
          agrupadas al estilo iOS, y ese mismo lenguaje se llevó a 11 pantallas más.
        </p>
        <p className="max-w-2xl">
          Toda la app usa ahora las hojas nativas de iOS y la escala tipográfica de Apple, y
          respeta la opción de texto en negrita del teléfono.
        </p>
        <Lista
          items={[
            'Ver grupo sanguíneo, edad y obra social de un vistazo, y editar los datos desde "Editar mis datos".',
            'Ver en la app los datos de Apple Health: frecuencia cardíaca, saturación, pasos, calorías, peso y altura.',
            'Llegar a Mis profesionales, Grupo familiar, Tarjetas, Recetas, Direcciones y Comprobantes con el mismo diseño.',
            'Cargar direcciones con autocompletado.',
          ]}
        />
        <Estado
          donde="App"
          estado="En TestFlight · datos de Apple Health visibles: listo para salir"
        />
        <Pantallas
          items={[
            {
              src: '10-perfil.jpg',
              alt: 'Perfil con la tarjeta de perfil clínico',
              pie: 'El Perfil, con la tarjeta de perfil clínico.',
            },
            {
              src: '11-editar-perfil.jpg',
              alt: 'Editar mis datos',
              pie: '"Editar mis datos", con el mismo diseño.',
            },
            {
              src: '12-apple-health.jpg',
              alt: 'Datos de Apple Health sincronizados',
              pie: 'El paciente ve sus datos de Apple Health.',
            },
          ]}
        />
      </TwoColumnSection>

      {/* ── 5. Seguridad ──────────────────────────────────────── */}
      <TwoColumnSection title="Face ID y pantalla de bloqueo" id="seguridad">
        <p className="text-lg">
          Si la app queda sin usar más de 30 minutos, al volver muestra una pantalla de bloqueo
          con el logo animado en lugar de entrar sola. Desde ahí se entra con Face ID o Touch
          ID, y se pueden ver las recetas o pedir una emergencia sin pasar por el desbloqueo.
        </p>
        <Lista
          items={[
            'Entrar con Face ID o Touch ID desde la primera pantalla, también después de cerrar sesión (cuentas con email).',
            'Ver las recetas o pedir una Emergencia S.O.S. directo desde la pantalla de bloqueo.',
            'Ver el logo de Healthier dibujándose letra por letra en el inicio, el bloqueo y el Face ID.',
            'Ver el nombre y el ícono que corresponden a cada teléfono: Face ID o Touch ID.',
          ]}
        />
        <Estado donde="App" estado="En TestFlight (versión 1.0.16)" />
        <figure className="pt-3">
          <img
            src={`${IMG}/00-logo-animado.gif`}
            alt="El logo de Healthier dibujándose letra por letra"
            className="w-full rounded-lg border border-[var(--marco-border)]"
            style={{ maxWidth: 360 }}
          />
          <figcaption className="text-sm text-black/50 mt-2">
            El logo se dibuja letra por letra al abrir la app.
          </figcaption>
        </figure>
        <Pantallas
          items={[
            {
              src: '13-bloqueo.jpg',
              alt: 'Pantalla de bloqueo con Face ID',
              pie: 'La pantalla de bloqueo, a los 30 minutos sin uso.',
            },
            {
              src: '01-inicio-logo.jpg',
              alt: 'Pantalla inicial de la app',
              pie: 'La pantalla inicial, con el logo nuevo.',
            },
          ]}
        />
      </TwoColumnSection>

      {/* ── 6. Farmacia ───────────────────────────────────────── */}
      <TwoColumnSection title="Farmacia" id="farmacia">
        <p className="text-lg">
          La farmacia de la app tiene una vitrina con banner, categorías y carruseles, filtros
          nativos y el catálogo completo. El carrito vive arriba y muestra qué profesional recetó
          cada producto.
        </p>
        <Lista
          items={[
            'Recorrer el catálogo completo, con fotos o etiquetas de color, y filtrar con menús nativos.',
            'Ver el carrito desde el encabezado, con "Recetado por" en cada producto.',
            'Elegir la dirección de entrega de una lista guardada.',
            'Confirmar un pedido bonificado sin cargar tarjeta.',
          ]}
        />
        <Estado donde="App" estado="En TestFlight" />
      </TwoColumnSection>

      {/* ── 7. Profesionales y registro ───────────────────────── */}
      <TwoColumnSection title="Web profesional y registro" id="profesional">
        <p className="text-lg">
          Los profesionales ven hasta qué hora siguen visibles para los pacientes en la consulta
          inmediata, y pueden renovarlo con un toque. En el registro, el teléfono se carga con
          selector de país, igual que en la app.
        </p>
        <Lista
          items={[
            'Ver "Visible para pacientes hasta las HH:MM" y renovar la disponibilidad con un toque, en la web y en la app.',
            'Recibir un aviso 10 minutos antes: "¿Seguís disponible?".',
            'Cargar el teléfono con selector de país al registrarse o editar el perfil.',
            'Como paciente, pedir turno y hablar con el profesional dentro de la plataforma, sin datos de contacto a la vista.',
          ]}
        />
        <Estado
          donde="App y web"
          estado="Listo para salir · disponibilidad en la app: en TestFlight"
        />
      </TwoColumnSection>

      {/* ── 8. Campañas ───────────────────────────────────────── */}
      <TwoColumnSection title="Datos para las campañas y las recetas" id="campanas">
        <p className="text-lg">
          Las campañas tienen ahora todo lo que pidió Hyppo: teléfonos en formato internacional,
          en qué paso quedó cada alta y qué le falta a una cuenta profesional para verificarse.
          Las recetas emitidas llegan también por mail y como aviso en la campana.
        </p>
        <Lista
          items={[
            'Enviar WhatsApp a 178 de los 187 teléfonos cargados, ya en formato internacional.',
            'Saber qué paso le falta a cada paciente o profesional para completar el alta.',
            'Saber qué documento le falta a cada profesional para verificarse.',
            'El paciente recibe su receta por mail y en la campana.',
          ]}
        />
        <Estado donde="App y web" estado="En producción" />
      </TwoColumnSection>

      {/* ── 9. Android ────────────────────────────────────────── */}
      <TwoColumnSection title="Android y Google Play" id="android">
        <p className="text-lg">
          La ficha de Healthier en Google Play está completa: textos, ícono, gráfico destacado,
          capturas y todas las declaraciones de contenido y datos. Con una cuenta de
          organización, la app se publica directo a producción, sin el período de prueba de 14
          días.
        </p>
        <Lista
          items={[
            'Ficha completa en español, con el eslogan "Tu salud, más cerca".',
            'Las 11 declaraciones de contenido y seguridad de datos, cargadas.',
            'Lista de testers internos armada: Healthier y Hyppo.',
          ]}
        />
        <Estado donde="App Android" estado="Lista para publicar con la cuenta de organización" />
      </TwoColumnSection>

      {/* ── Decisiones ────────────────────────────────────────── */}
      <ContentBox title="Qué sigue" id="decisiones">
        <p className="text-black/80 text-lg mb-5 max-w-2xl">
          Todo lo de esta semana está listo. Estas son las decisiones que quedan de su lado para
          que llegue a los pacientes.
        </p>
        <ul className="space-y-3 text-black/80 text-[15px]">
          <li>
            — <strong>Los pedidos de Nacho, a producción:</strong> "disponible ahora" único,
            Apple Health a la vista, historial de sangre en una página, estudios con especialidad
            y nombre, y estudios por mascota.
          </li>
          <li>
            — <strong>Publicar en la web</strong> el nuevo inicio, la Bóveda en carpetas, los
            planes de actividad, las mascotas y el selector de país.
          </li>
          <li>
            — <strong>La versión 1.0 en el App Store:</strong> Apple la aprobó y está lista para
            salir cuando decidan la fecha.
          </li>
          <li>
            — <strong>Android:</strong> crear la cuenta de desarrollador de organización a nombre
            de United (con número D-U-N-S, que es gratuito) y transferir la app. Con eso se
            publica directo a producción.
          </li>
          <li>
            — <strong>Veterinaria:</strong> decidir cuándo habilitar la vertical; las mascotas y
            sus estudios ya están listos.
          </li>
          <li>
            — <strong>Emergencias en la web:</strong> OK para publicar la pantalla del despacho;
            la base ya está lista en producción.
          </li>
        </ul>
      </ContentBox>

      <div className="mb-20 md:mb-28">
        <p className="text-black/60 text-[15px] max-w-2xl">
          Las capturas son de la app de iPhone con datos de demostración. Los nombres y las
          cifras que aparecen en pantalla son ilustrativos.
        </p>
      </div>
    </>
  )
}
