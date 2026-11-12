import TwoColumnSection from '../components/TwoColumnSection'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'documentos', label: 'Documentos firmados' },
  { id: 'cobros', label: 'Cobros' },
  { id: 'turnos', label: 'Turnos' },
  { id: 'referidos', label: 'Referidos' },
  { id: 'panel', label: 'Super admin' },
  { id: 'medicion', label: 'Medición' },
  { id: 'sigue', label: 'Qué sigue' },
]

const WEB = 'https://www.healthier.com.ar'

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

/** Un documento que emite el profesional, en recuadro. */
function Documento({ titulo, quien, children }: { titulo: string; quien: string; children: React.ReactNode }) {
  return (
    <div className="border border-[var(--marco-border)] rounded-lg p-6 flex flex-col gap-3">
      <p className="font-thunder uppercase text-[var(--marco-accent)] text-2xl">{titulo}</p>
      <div className="text-black/80 text-[15px] space-y-2">{children}</div>
      <p className="mt-auto pt-2 text-[13px] text-black/60">{quien}</p>
    </div>
  )
}

export default function HealthierAvancesNoviembre() {
  return (
    <>
      <ScrollNav items={NAV} />

      {/* ── Portada ───────────────────────────────────────────── */}
      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          Healthier · Del 29 de octubre al 12 de noviembre
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Receta, certificado
          <br />y orden, firmados
          <br />y en el mail
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          El profesional ya emite desde la consulta los tres documentos que más se piden: la
          receta, el certificado y la orden de estudios. Salen con su firma y su matrícula, y le
          llegan al paciente por mail y a su Bóveda. En paralelo se activaron los referidos para
          todos, se ordenó el camino para sacar turno y el panel dejó de contar las cuentas de
          prueba.
        </p>

        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Documentos con firma</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">3 tipos</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Dónde</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Web y app</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Referidos</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Para todos</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Estado</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">En producción</p>
          </div>
        </div>
      </div>

      {/* ── Documentos firmados ───────────────────────────────── */}
      <div id="documentos" className="mb-20 md:mb-28 scroll-mt-28">
        <h3 className="font-thunder text-2xl md:text-3xl uppercase text-black mb-3">
          Tres documentos, desde la consulta
        </h3>
        <p className="text-black/80 max-w-2xl mb-6">
          Todo se emite desde el Recetario de la sala, con tres tarjetas: Medicamentos, Estudios
          y Certificado. Cada documento lleva la firma del profesional, su matrícula y el registro
          del recetario electrónico ante el Ministerio de Salud.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Documento titulo="Receta" quien="Profesional · Farmacia · Paciente">
            <p>
              La receta electrónica sigue las reglas actualizadas del servicio de recetas:
              matrícula provincial, domicilio del consultorio y obra social del paciente.
            </p>
            <p>
              Cuando la obra social tiene que autorizar un medicamento, la receta queda pendiente
              y la autoriza la farmacia desde su panel. El paciente recibe el aviso cuando puede
              comprarlo.
            </p>
          </Documento>
          <Documento titulo="Certificado" quien="Profesional · Paciente">
            <p>
              Tres modelos: constancia de atención, reposo laboral y certificado escolar con día
              de reintegro calculado solo.
            </p>
            <p>
              El profesional ve la hoja antes de emitirla. El diagnóstico es opcional y por
              defecto no se imprime. El paciente lo encuentra en la carpeta Certificados de la
              Bóveda, listo para compartir.
            </p>
          </Documento>
          <Documento titulo="Orden de estudios" quien="Profesional · Paciente · Laboratorio">
            <p>
              El profesional elige los estudios del listado oficial y toca "Guardar orden". La
              orden se emite firmada en el momento y le llega al paciente por mail, con su
              cobertura impresa.
            </p>
            <p>
              En la consulta queda la confirmación "Enviada a tu paciente por mail". Las órdenes
              que ya estaban guardadas también se emitieron y se enviaron.
            </p>
          </Documento>
        </div>
        <div className="mt-6">
          <Estado donde="Web y app" estado="En producción" />
        </div>
      </div>

      {/* ── Cobros ────────────────────────────────────────────── */}
      <TwoColumnSection title="Cobros más claros para el profesional" id="cobros">
        <p className="text-lg">
          Cada pago con Mercado Pago queda conciliado con los números reales: lo que cobró, la
          comisión de Mercado Pago, la de Healthier, el neto y la fecha en que se libera la plata.
        </p>
        <Lista
          items={[
            'El profesional ve el neto real y la fecha de liberación en cada consulta y en Ganancias, sin estimaciones.',
            'El super admin ve los mismos números en Pagos.',
          ]}
        />
        <Estado donde="Web y super admin" estado="En producción" />
      </TwoColumnSection>

      {/* ── Turnos ────────────────────────────────────────────── */}
      <TwoColumnSection title="Del inicio al turno, sin vueltas" id="turnos">
        <p className="text-lg">
          Si en una vertical no hay nadie en línea, la tarjeta del inicio lo dice y lleva directo
          a sacar turno para otro horario, con los profesionales y sus horarios disponibles.
        </p>
        <Lista
          items={[
            '"Sacá un turno" desde el inicio abre la agenda de esa vertical, en web y en la app.',
            'La consulta inmediata sólo ofrece profesionales que de verdad están conectados: la disponibilidad se apaga sola si el profesional deja de usar la app.',
            'Un turno presencial sólo se puede pedir con quien atiende presencial, y la dirección del consultorio se pide con calle y número.',
            'La matrícula y el DNI de cada profesional se validan contra los registros nacionales.',
          ]}
        />
        <Estado donde="Web y app" estado="En producción" />
      </TwoColumnSection>

      {/* ── Referidos ─────────────────────────────────────────── */}
      <TwoColumnSection title="Referidos para todos" id="referidos">
        <p className="text-lg">
          Cada paciente y cada profesional tiene su código y su link para invitar. Quien se
          registra con un código queda vinculado a quien lo invitó, en la web y en la app.
        </p>
        <Lista
          items={[
            '"Invitá a alguien" en el perfil, con el código, el link y la lista de quienes se sumaron.',
            'El código se puede cargar al crear la cuenta; el link lo trae ya cargado.',
            'El super admin ve los referidos por tipo, de pacientes y de profesionales.',
          ]}
        />
        <Estado donde="Web y app" estado="En producción, sin descuentos ni premios todavía" />
      </TwoColumnSection>

      {/* ── Super admin ───────────────────────────────────────── */}
      <TwoColumnSection title="Un panel con números limpios" id="panel">
        <p className="text-lg">
          Las cuentas de prueba ya no cuentan en ninguna métrica ni listado del super admin. Un
          interruptor, "Incluir cuentas de prueba", las vuelve a mostrar cuando hace falta
          revisarlas.
        </p>
        <Lista
          items={[
            'Las cuentas del equipo de marketing quedan marcadas como de prueba y no se mezclan con pacientes ni profesionales reales.',
            'Cada administrador cambia su contraseña desde "Mi contraseña", y el cambio queda registrado en Auditoría.',
            'El panel de farmacia importa el catálogo completo desde Excel, con fotos de cada producto.',
          ]}
        />
        <Estado donde="Super admin y farmacia" estado="En producción" />
      </TwoColumnSection>

      {/* ── Medición ──────────────────────────────────────────── */}
      <TwoColumnSection title="Medición de punta a punta" id="medicion">
        <p className="text-lg">
          Ahora se sabe por dónde entró cada persona, qué recorrió y en qué paso del turno quedó.
          Es la base para medir las campañas y los mensajes a pacientes.
        </p>
        <Lista
          items={[
            'Cada paso de sacar turno y de la consulta inmediata queda registrado como evento, incluida la compra.',
            'El recorrido de navegación de cada alta se guarda junto con la campaña de origen.',
            'La herramienta de mensajes a pacientes recibe sólo datos de producción.',
            'Monitoreo de errores nuevo en la web y en la app, con aviso inmediato al equipo.',
          ]}
        />
        <Estado donde="Web y app" estado="En producción" />
      </TwoColumnSection>

      {/* ── Qué sigue ─────────────────────────────────────────── */}
      <TwoColumnSection title="Qué sigue" id="sigue" withBar>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-[var(--marco-accent)] text-lg mb-3">De Healthier</p>
            <ul className="space-y-2 text-black/80 text-[15px]">
              <li>— Definir si los referidos tienen descuento o premio, y cuál, para encenderlo.</li>
              <li>— Avanzar con la certificación de firmas del convenio con RENAPER, con la documentación ya firmada y entregada.</li>
            </ul>
          </div>
          <div className="border border-[var(--marco-border)] rounded-lg p-6">
            <p className="font-thunder uppercase text-black text-lg mb-3">De Marco Polo</p>
            <ul className="space-y-2 text-black/80 text-[15px]">
              <li>— La carpeta "Órdenes de estudios" llega a la Bóveda de la app con la próxima actualización. Mientras tanto, la orden llega por mail y se ve en la web.</li>
              <li>— Guías de uso actualizadas con todo lo de estas dos semanas.</li>
              <li>— Sellos de la AAIP, RENAPDIS y SISA en el pie de la web y de la app.</li>
            </ul>
          </div>
        </div>
        <p className="max-w-2xl text-black/60 text-[15px]">
          Salvo lo que figura en esta sección, todo lo de este documento ya está publicado en{' '}
          <a href={WEB} target="_blank" rel="noreferrer" className="text-[var(--marco-accent)] underline underline-offset-2">
            healthier.com.ar
          </a>{' '}
          y en la app.
        </p>
      </TwoColumnSection>
    </>
  )
}
