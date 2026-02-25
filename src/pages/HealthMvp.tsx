import ContentBox from '../components/ContentBox'
import BoxedListSection from '../components/BoxedListSection'
import TwoColumnSection from '../components/TwoColumnSection'
import MermaidDiagram from '../components/MermaidDiagram'

const ROADMAP_TIMELINE = `
timeline
  title MVP Salud – Timeline (2 a 3 meses)
  section Fase 0
    Research y Definición : 2 sem
  section Fase 1
    Diseño UX/UI : 2-3 sem
  section Fase 2
    Sprint 1 Auth y perfiles : 2 sem
    Sprint 2 Agenda y on-demand : 2 sem
    Sprint 3 Pagos y calificaciones : 2 sem
    Sprint 4 Notificaciones y QA : 2 sem
  section Fase 3
    Lanzamiento e iteración : 2 sem
  section Fase 4 (Roadmap fase 2)
    App mobile + tele-video consultas : Post-MVP
`.trim()

export default function HealthMvp() {
  return (
    <>
      {/* Visión general – WHAT-style content box */}
      <ContentBox title="Visión general">
        <p>
          La aplicación busca conectar oferta y demanda de servicios de salud y bienestar, permitiendo
          consultas on-demand o programadas, sin integrar videollamadas en el MVP (el link se gestiona externamente).
        </p>
      </ContentBox>

      {/* Funcionalidades Usuario (Paciente) */}
      <TwoColumnSection title="Funcionalidades – Usuario (Paciente)" withBar={false}>
        <ul className="list-disc pl-5 space-y-2">
          <li>Registro e ingreso a la plataforma</li>
          <li>Solicitud de un servicio: on-demand (según disponibilidad) o programado mediante calendario</li>
          <li>Visualización de profesionales disponibles</li>
          <li>Pago del servicio con tarjeta de crédito</li>
          <li>Calificación de la experiencia post-consulta</li>
          <li>Historial de consultas</li>
          <li>Carga de estudios médicos (PDF) asociados al perfil del usuario</li>
          <li>Sistema de recordatorios / reactivación: si el usuario no realiza consultas durante X tiempo (ej. 3 meses), se envía un reminder automático</li>
        </ul>
      </TwoColumnSection>

      {/* Funcionalidades Profesionales */}
      <TwoColumnSection title="Funcionalidades – Profesionales" withBar={false}>
        <ul className="list-disc pl-5 space-y-2">
          <li>Registro con validación de identidad</li>
          <li>Carga de: título profesional, identificación</li>
          <li>Validaciones externas: SISA u organismo equivalente (a confirmar)</li>
          <li>Gestión de agenda y disponibilidad</li>
          <li>Atención de consultas: on-demand (notificación a profesionales disponibles) y programadas</li>
          <li>Sistema de asignación: algoritmo que prioriza profesionales con mejor calificación</li>
          <li>Seguridad: validación biométrica (ej. Face ID) al momento de atender una consulta</li>
          <li>Cierre de consulta: campo obligatorio “Requiere receta” / “No requiere receta”; en caso afirmativo, envío automático de receta o workflow de receta (nice to have)</li>
        </ul>
      </TwoColumnSection>

      {/* Tipos de profesionales */}
      <BoxedListSection
        title="Tipos de profesionales incluidos"
        items={[
          'Médicos (con especialidades)',
          'Nutricionistas',
          'Psicólogos',
          'Profesores de educación física',
          'Personal trainers',
        ]}
      />

      {/* Administración */}
      <TwoColumnSection title="Administración" withBar={false}>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Panel de Administrador</strong></li>
          <li><strong>Panel de Super Admin (cliente):</strong> visualización completa de usuarios y profesionales, gestión de validaciones, control general de la plataforma</li>
        </ul>
      </TwoColumnSection>

      {/* Propuesta – Estilo Marco Polo */}
      <ContentBox title="Propuesta – Estilo Marco Polo">
        <p className="font-medium mb-2">Objetivo del proyecto</p>
        <p className="mb-4">
          Diseñar y desarrollar un MVP con una única plataforma Web App que conecte a todos los usuarios
          (pacientes, profesionales y administradores), validando el modelo de servicio con foco en
          velocidad de salida a mercado, trazabilidad y escalabilidad futura.
        </p>
        <p className="font-medium mb-2">Alcance del MVP (fase 1)</p>
        <p className="mb-2"><strong>Incluye:</strong> una sola plataforma Web App responsive que centraliza la operación completa entre pacientes, profesionales y admins; sistema de usuarios y profesionales, lógica de demanda on-demand y programada, integración de pagos (tarjeta), sistema de calificaciones, carga de estudios en PDF, panel administrador + super admin, agenda externa (Calendly o similar), link externo de videollamada cargado desde admin, notificaciones básicas (mail / push simple).</p>
        <p><strong>No incluye (por ahora):</strong> Videollamada integrada dentro de la plataforma, receta digital integrada oficialmente (queda como nice to have), apps nativas (iOS / Android) — estas últimas quedan para la fase 2 del roadmap.</p>
      </ContentBox>

      {/* Supuestos y puntos a confirmar */}
      <BoxedListSection
        title="Supuestos y puntos a confirmar"
        items={[
          'SISA / organismo de validación: confirmar cuál aplica exactamente.',
          'MCO: validar alcance real (compliance tipo EE.UU.).',
          'Recetas: ¿workflow manual o integración oficial más adelante?',
          'Pagos: ¿Stripe / Mercado Pago / otro?',
          'Notificaciones: ¿mail alcanza para MVP o push también?',
        ]}
      />

      {/* Roadmap y timeline – Mermaid gantt */}
      <section className="mb-14 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          <div className="md:col-span-4 flex flex-col">
            <h2 className="font-thunder text-2xl md:text-3xl lg:text-4xl uppercase text-[var(--marco-accent)]">
              Roadmap y timeline
            </h2>
          </div>
          <div className="md:col-span-8 space-y-8">
            <MermaidDiagram
              chart={ROADMAP_TIMELINE}
              className="min-h-[280px] rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-6"
            />
            <ul className="space-y-3 text-black font-interphases">
              <li><strong>Fase 0 – Research & Definición (2 semanas):</strong> User research, definición de personas (Paciente, Profesional, Admin), user journeys, feature prioritization, definición legal / validaciones (SISA, MCO – exploratorio).</li>
              <li><strong>Fase 1 – Diseño UX/UI (2–3 semanas):</strong> Arquitectura de información, flujos principales, wireframes, diseño visual MVP, prototipo navegable.</li>
              <li><strong>Fase 2 – Desarrollo MVP (6–8 semanas):</strong> Sprint 1 (Auth, perfiles, panel admin base); Sprint 2 (Agenda, on-demand, algoritmo de asignación); Sprint 3 (Pagos, calificaciones, carga PDF); Sprint 4 (Notificaciones, seguridad básica, QA).</li>
              <li><strong>Fase 3 – Lanzamiento & Iteración:</strong> Deploy, testing real con usuarios, ajustes post-MVP, definición detallada de roadmap fase 2.</li>
              <li><strong>Fase 4 – Roadmap fase 2 (Post-MVP):</strong> Desarrollo de app mobile para iOS/Android, que será el canal para gestionar las tele-video comunicaciones.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <ContentBox title="Cierre">
        <p>
          Proponemos comenzar con un MVP enfocado en validar el core del negocio: conectar pacientes con profesionales de la salud de forma simple, segura y escalable. El enfoque prioriza time-to-market, aprendizaje temprano y una base sólida para futuras integraciones como telemedicina y receta digital.
        </p>
      </ContentBox>
    </>
  )
}
