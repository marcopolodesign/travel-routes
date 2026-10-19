import ContentBox from '../components/ContentBox'
import TwoColumnSection from '../components/TwoColumnSection'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'produccion', label: 'En producción' },
  { id: 'verticales', label: 'Verticales' },
  { id: 'carrusel', label: 'Carrusel' },
  { id: 'herramientas', label: 'Herramientas' },
  { id: 'historia', label: 'Historia clínica' },
  { id: 'registro', label: 'Registro' },
  { id: 'decisiones', label: 'Qué sigue' },
]

const WEB = 'https://www.healthier.com.ar'

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

/** Un cambio ya publicado, en recuadro. */
function Publicado({
  titulo,
  children,
  donde,
  link,
}: {
  titulo: string
  children: React.ReactNode
  donde: string
  link?: { href: string; label: string }
}) {
  return (
    <div className="border border-[var(--marco-border)] rounded-lg p-6 flex flex-col gap-3">
      <p className="font-thunder uppercase text-black text-lg">{titulo}</p>
      <div className="text-black/80 text-[15px] space-y-2">{children}</div>
      <div className="mt-auto pt-2 flex flex-wrap items-center gap-3">
        <span className="text-[11px] uppercase tracking-wide text-black/50 border border-[var(--marco-border)] rounded-full px-2.5 py-0.5">
          {donde}
        </span>
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-[var(--marco-accent)] underline underline-offset-2 break-all"
          >
            {link.label}
          </a>
        )}
      </div>
    </div>
  )
}

/** Las verticales, con el color que tienen en la plataforma. */
const VERTICALES = [
  { nombre: 'Clínica', color: '#7CB38B' },
  { nombre: 'Pediatría', color: '#D9699C' },
  { nombre: 'Nutrición', color: '#E8927C' },
  { nombre: 'Psicología', color: '#9B8EC4' },
  { nombre: 'Psiquiatría', color: '#7E5A90', nueva: true },
  { nombre: 'Kinesiología', color: '#4F8A9B' },
  { nombre: 'Preparación física', color: '#3F8A7C' },
  { nombre: 'Odontología', color: '#5B95C9', nueva: true },
  { nombre: 'Veterinaria', color: '#A8803A' },
]

function Paleta() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
      {VERTICALES.map((v) => (
        <div
          key={v.nombre}
          className="border border-[var(--marco-border)] rounded-lg p-3 flex items-center gap-3"
        >
          <span
            className="w-8 h-8 rounded-md shrink-0"
            style={{ backgroundColor: v.color }}
            aria-hidden
          />
          <div className="min-w-0">
            <p className="text-[14px] text-black truncate">{v.nombre}</p>
            {v.nueva && (
              <p className="text-[11px] uppercase tracking-wide text-[var(--marco-accent)]">Nueva</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function HealthierAvancesOctubre() {
  return (
    <>
      <ScrollNav items={NAV} />

      {/* ── Portada ───────────────────────────────────────────── */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          Healthier · Del 16 al 18 de octubre
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Las verticales
          <br />
          se manejan
          <br />
          desde el panel
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          Desde el super admin ahora se crea una vertical con su nombre, precio, foto, color e
          ícono, y aparece sola en el inicio del paciente y en el registro del profesional. Se
          suman Odontología y Psiquiatría, cada vertical define qué herramientas usa, y la
          historia clínica se firma siempre con la matrícula real de quien atiende.
        </p>

        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Ya en producción</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">4 mejoras</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Listo para publicar</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">
              7 mejoras
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Verticales nuevas</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">2</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">App 1.1.2</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Aprobada</p>
          </div>
        </div>
      </div>

      {/* ── Ya en producción ──────────────────────────────────── */}
      <div id="produccion" className="mb-20 md:mb-28 scroll-mt-28">
        <h3 className="font-thunder text-2xl md:text-3xl uppercase text-black mb-3">
          Ya en producción
        </h3>
        <p className="text-black/80 max-w-2xl mb-6">
          Publicado en {WEB.replace('https://', '')} y en la app, disponible hoy para pacientes,
          profesionales y administración.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Publicado
            titulo="Verificación con REFEPS más clara"
            donde="Super admin"
            link={{ href: `${WEB}/super-admin/profesionales`, label: 'Profesionales' }}
          >
            <p>
              En la ficha REFEPS de cada profesional, la matrícula que declaró aparece primero y
              marcada como "la que declaró". Debajo siguen las demás, cada una con su colegio y
              el año desde el que está registrada.
            </p>
            <p>Verificar a alguien con varias matrículas lleva una sola mirada.</p>
          </Publicado>

          <Publicado
            titulo="Profesionales extranjeros identificados"
            donde="Super admin y campañas"
            link={{ href: `${WEB}/super-admin/profesionales`, label: 'Filtro "Extranjeros"' }}
          >
            <p>
              Cada profesional queda marcado como extranjero o no a partir de su documento, de
              forma automática. En el panel se ve una chapa junto al nombre y un filtro
              "Extranjeros".
            </p>
            <p>
              El dato también llega a la herramienta de campañas, para medir el grupo de anuncios
              dirigido a médicos que vivieron afuera.
            </p>
          </Publicado>

          <Publicado
            titulo="Inteligencia artificial desde nuestros servidores"
            donde="Web y app"
            link={{ href: `${WEB}/paciente/dashboard`, label: 'NutriPlan en la Bóveda' }}
          >
            <p>
              La receta sugerida del NutriPlan y la lectura automática de análisis de sangre en
              la Bóveda de la app se procesan ahora desde los servidores de Healthier, con la
              sesión del paciente.
            </p>
            <p>
              Ninguna credencial de inteligencia artificial viaja en el teléfono ni en el sitio,
              en línea con lo presentado ante RENAPER.
            </p>
          </Publicado>

          <Publicado titulo="Versión 1.1.2 de la app" donde="App Store">
            <p>
              Apple aprobó la versión 1.1.2 de la app de iPhone. Está lista para publicarse
              cuando se decida la fecha.
            </p>
            <p>
              Para la presentación ante RENAPER quedó redactado además el procedimiento de
              respuesta ante incidentes de seguridad, con roles, pasos y plazos.
            </p>
          </Publicado>
        </div>
      </div>

      {/* ── 1. Verticales administrables ──────────────────────── */}
      <TwoColumnSection title="Verticales desde el super admin" id="verticales">
        <p className="text-lg">
          Las verticales dejan de ser una lista fija. Desde Configuración, en el super admin, se
          crea una vertical nueva con su nombre, precio base, foto, color e ícono, y se ordena
          con flechas. Al crearla, la plataforma arma también su especialidad, así que queda
          lista para que se registren profesionales.
        </p>
        <p className="max-w-2xl">
          El primer paso del registro del profesional pregunta "¿En qué área atendés?" y muestra
          las verticales activas. Una vertical nueva aparece ahí sin tocar nada más.
        </p>
        <Lista
          items={[
            'Crear y editar una vertical: nombre, precio base, foto, color e ícono.',
            'Elegir entre diez colores sugeridos o uno propio; si un color no se lee bien con texto blanco, el panel lo avisa y propone un tono más oscuro.',
            'Ver la tarjeta tal como la verá el paciente, encendida y apagada, antes de guardar.',
            'Cambiar el orden de las verticales con flechas.',
            'Odontología y Psiquiatría ya creadas. Psiquiatría tiene el mismo precio que Clínica; Odontología espera precio y profesionales para encenderse.',
            'Preparación física reúne al entrenamiento físico, y Kinesiología queda con su propia especialidad.',
          ]}
        />
        <Paleta />
        <Estado donde="Web y app" estado="Listo para publicar" />
      </TwoColumnSection>

      {/* ── 2. Carrusel ───────────────────────────────────────── */}
      <TwoColumnSection title="Primero, lo que está disponible" id="carrusel">
        <p className="text-lg">
          El carrusel de consulta inmediata en el inicio del paciente muestra todas las
          verticales habilitadas y pone primero las que tienen un profesional en línea en ese
          momento. El paciente ve de entrada dónde lo pueden atender ya.
        </p>
        <Lista
          items={[
            'Las verticales con alguien conectado van primero, con el botón "Empezar".',
            'Las demás se ven apagadas, con su color y su foto, y llevan a sacar turno.',
            'Cada tarjeta toma el color y la foto que se cargaron en el panel.',
            'Al reordenarse, el carrusel vuelve a la primera tarjeta.',
          ]}
        />
        <Estado donde="Web y app" estado="Listo para publicar" />
      </TwoColumnSection>

      {/* ── 3. Herramientas por vertical ──────────────────────── */}
      <TwoColumnSection title="Herramientas por vertical" id="herramientas">
        <p className="text-lg">
          Cada vertical define qué herramientas usa el profesional durante la consulta. Historia
          clínica y receta electrónica se encienden o se apagan por vertical, desde el mismo
          editor.
        </p>
        <p className="max-w-2xl">
          Odontología atiende sin historia clínica ni receta: en la videollamada el odontólogo ve
          notas, derivación y cierre. Clínica, Pediatría y el resto siguen con todas sus
          herramientas.
        </p>
        <Lista
          items={[
            'Dos interruptores por vertical: historia clínica y receta electrónica.',
            'El editor muestra en cuántas especialidades de esa vertical está habilitada la receta.',
            'La lista de verticales indica en cada fila qué herramientas tiene apagadas.',
            'Las derivaciones a Psiquiatría o Preparación física las toma un profesional de esa especialidad.',
          ]}
        />
        <Estado donde="Web y app" estado="Listo para publicar" />
      </TwoColumnSection>

      {/* ── 4. Historia clínica ───────────────────────────────── */}
      <TwoColumnSection title="Historia clínica firmada" id="historia">
        <p className="text-lg">
          Todo lo que un profesional asienta en la historia clínica queda firmado con su
          matrícula real y su especialidad, tomadas de su perfil verificado en el momento de
          guardar.
        </p>
        <Lista
          items={[
            'Notas, alergias, condiciones, mediciones, medicación, recetas y nota de cierre, firmadas con la matrícula de quien atiende.',
            'Las alergias se registran desde el detalle de la consulta, con su estado y fecha a la vista apenas se guardan.',
            'Si al perfil le falta un dato, el profesional lo ve en pantalla con un aviso claro.',
            'Desde el Recetario se completan DNI y sexo sin salir de la consulta.',
          ]}
        />
        <Estado donde="Web y videollamada de la app" estado="Listo para publicar" />
      </TwoColumnSection>

      {/* ── 5. Registro ───────────────────────────────────────── */}
      <TwoColumnSection title="Registro del profesional y del paciente" id="registro">
        <p className="text-lg">
          El registro del profesional pide el DNI desde el primer paso, con la aclaración
          "Necesario para emitir recetas electrónicas.", y lo trae ya cargado en el alta del
          legajo.
        </p>
        <Lista
          items={[
            'Acepta el DNI con o sin puntos, y si se pega un CUIT o CUIL toma el DNI.',
            'Vale para el registro con mail y con Google.',
            'En desarrollo: el registro del paciente en pasos cortos, uno por pantalla.',
          ]}
        />
        <Estado
          donde="Web"
          estado="DNI en el registro: listo para publicar · registro del paciente por pasos: en desarrollo"
        />
      </TwoColumnSection>

      {/* ── Decisiones ────────────────────────────────────────── */}
      <ContentBox title="Qué sigue" id="decisiones">
        <p className="text-black/80 text-lg mb-5 max-w-2xl">
          Lo listo para publicar está terminado y probado. Estas son las decisiones que quedan
          para que llegue a pacientes y profesionales.
        </p>
        <ul className="space-y-3 text-black/80 text-[15px]">
          <li>
            — <strong>Publicar las verticales:</strong> panel, carrusel, Odontología,
            Psiquiatría, herramientas por vertical y firma de la historia clínica salen juntas.
          </li>
          <li>
            — <strong>Odontología:</strong> definir el precio base y encenderla cuando haya
            odontólogos verificados.
          </li>
          <li>
            — <strong>Fotos:</strong> Odontología y Veterinaria se muestran con su color y su
            ícono; con una foto de cada una, se carga desde el panel.
          </li>
          <li>
            — <strong>App 1.1.2:</strong> elegir la fecha de publicación en el App Store.
          </li>
          <li>
            — <strong>RENAPER:</strong> completar en el procedimiento de incidentes los
            responsables y contactos de United.
          </li>
        </ul>
      </ContentBox>
    </>
  )
}
