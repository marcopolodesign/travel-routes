import { useState } from 'react'
import ContentBox from '../components/ContentBox'
import BoxedListSection from '../components/BoxedListSection'
import TwoColumnSection from '../components/TwoColumnSection'
import Timeline from '../components/Timeline'
import HealthResearch from './HealthResearch'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const RESEARCH_NAV: NavItem[] = [
  { id: 'panorama',          label: 'Panorama' },
  { id: 'landscape',         label: 'Competidores' },
  { id: 'hallazgos',         label: 'Hallazgos' },
  { id: 'pain-pacientes',    label: 'Pain Points — Pacientes' },
  { id: 'pain-profesionales',label: 'Pain Points — Profesionales' },
  { id: 'necesidades',       label: 'Oportunidades' },
  { id: 'personas',          label: 'Personas' },
  { id: 'resumen',           label: 'Resumen' },
]

const ROADMAP_STEPS = [
  {
    label: 'Fase 0',
    items: [
      'Research y definición de personas (Paciente, Profesional, Admin)',
      'User journeys, feature prioritization',
      'Definición legal / validaciones (SISA, MCO – exploratorio)',
    ],
  },
  {
    label: 'Fase 1',
    items: [
      'Arquitectura de información y flujos principales',
      'Wireframes y diseño visual MVP',
      'Prototipo navegable',
    ],
  },
  {
    label: 'Fase 2',
    items: [
      'Sprint 1: Auth, perfiles, panel admin base',
      'Sprint 2: Agenda, on-demand, algoritmo de asignación',
      'Sprint 3: Pagos, calificaciones, carga PDF',
      'Sprint 4: Notificaciones, seguridad básica, QA',
    ],
  },
  {
    label: 'Fase 3',
    items: [
      'Deploy y testing real con usuarios',
      'Ajustes post-MVP y definición detallada de roadmap fase 2',
    ],
  },
  {
    label: 'Fase 4',
    items: [
      'App mobile iOS/Android (Post-MVP)',
      'Tele-video consultas integradas',
    ],
  },
]

type Tab = 'mvp' | 'research'

export default function HealthMvp() {
  const [activeTab, setActiveTab] = useState<Tab>('mvp')

  return (
    <>
      {/* Tab navigation */}
      <div className="flex gap-0 border-b border-[var(--marco-border)]">
        {([
          { id: 'mvp', label: 'Propuesta MVP' },
          { id: 'research', label: 'Research & Diseño' },
        ] as { id: Tab; label: string }[]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={[
              'font-thunder uppercase tracking-wide text-base md:text-lg px-5 py-3 border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-[var(--marco-accent)] text-[var(--marco-accent)]'
                : 'border-transparent text-black/50 hover:text-black/80',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scroll index nav — research tab only, breaks out of main padding */}
      {activeTab === 'research' && (
        <div className="sticky top-[64px] z-20 -mx-[4vw] md:-mx-[10.5vw] mb-10">
          <ScrollNav items={RESEARCH_NAV} />
        </div>
      )}

      {/* Spacing for MVP tab */}
      {activeTab === 'mvp' && <div className="mb-10" />}

      {/* Tab 1: Propuesta MVP */}
      {activeTab === 'mvp' && (
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
              <li>Cierre de consulta: campo obligatorio "Requiere receta" / "No requiere receta"; en caso afirmativo, envío automático de receta o workflow de receta (nice to have)</li>
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

          {/* Roadmap y timeline – full width */}
          <section className="mb-20 md:mb-28">
            <h2 className="font-thunder text-2xl md:text-3xl lg:text-4xl uppercase text-[var(--marco-accent)] mb-8">
              Roadmap y timeline
            </h2>
            <div className="rounded-lg border border-[var(--marco-border)] bg-[var(--marco-bg)] p-6 md:p-10">
              <Timeline title="MVP Salud (2 a 3 meses)" steps={ROADMAP_STEPS} />
            </div>
          </section>

          {/* Cierre */}
          <ContentBox title="Cierre">
            <p>
              Proponemos comenzar con un MVP enfocado en validar el core del negocio: conectar pacientes con profesionales de la salud de forma simple, segura y escalable. El enfoque prioriza time-to-market, aprendizaje temprano y una base sólida para futuras integraciones como telemedicina y receta digital.
            </p>
          </ContentBox>
        </>
      )}

      {/* Tab 2: Research & Diseño */}
      {activeTab === 'research' && <HealthResearch />}
    </>
  )
}
