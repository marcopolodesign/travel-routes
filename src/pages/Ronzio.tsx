import ContentBox from '../components/ContentBox'
import BoxedListSection from '../components/BoxedListSection'
import TwoColumnSection from '../components/TwoColumnSection'
import BudgetRemainderSection from '../components/BudgetRemainderSection'
import MermaidDiagram from '../components/MermaidDiagram'

const ROADMAP_TIMELINE = `
timeline
  title Ronzio – Timeline (45-60 días)
  section Fase 0
    Auditoría Landing Actual : 1 sem
  section Fase 1
    Rediseño Landing + CRM Setup : 2-3 sem
  section Fase 2
    CRM Dev + Integraciones : 2-3 sem
  section Fase 3
    UTM, Analytics + QA : 1 sem
  section Fase 4
    Launch + Iteración : 1 sem
`.trim()

export default function Ronzio() {
  return (
    <>
      <ContentBox title="Visión general">
        <p>
          Revisión integral de la landing page actual de Ronzio, optimización de conversión,
          y desarrollo de un CRM a medida para trackear leads, UTMs y ciclo de vida del usuario.
          El panel de administración se diseña específicamente para las necesidades de Ronzio.
        </p>
      </ContentBox>

      <TwoColumnSection title="Landing Page – Revisión y Mejora" withBar={false}>
        <ul className="list-disc pl-5 space-y-2">
          <li>Auditoría de la landing actual: performance, UX, copy, SEO on-page</li>
          <li>Rediseño orientado a conversión (CTA claros, formulario optimizado)</li>
          <li>Mobile-first responsive</li>
          <li>Integración con analytics y tracking de UTMs</li>
          <li>A/B testing setup para iteraciones post-launch</li>
        </ul>
      </TwoColumnSection>

      <TwoColumnSection title="CRM – Lead Management" withBar={false}>
        <ul className="list-disc pl-5 space-y-2">
          <li>Panel admin diseñado para el flujo operativo de Ronzio</li>
          <li>Captura de leads desde formulario de landing</li>
          <li>Tracking de UTMs por cada lead (source, medium, campaign)</li>
          <li>Pipeline de estados: nuevo → contactado → en negociación → cerrado</li>
          <li>Ciclo de vida del usuario: seguimiento de interacciones y tiempos</li>
          <li>Dashboard con métricas: leads por fuente, tasa de conversión, tiempo promedio de cierre</li>
          <li>Notificaciones por mail para nuevos leads</li>
          <li>Exportación de datos (CSV)</li>
        </ul>
      </TwoColumnSection>

      <BoxedListSection
        title="Integraciones"
        items={[
          'Google Analytics 4 + Google Tag Manager',
          'UTM parameter capture y storage',
          'Email notifications (nuevos leads)',
          'Formulario de contacto → CRM pipeline automático',
        ]}
      />

      {/* Roadmap */}
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
              <li><strong>Fase 0 – Auditoría (1 semana):</strong> Revisión de la landing actual, análisis de métricas existentes, definición de objetivos de conversión y requerimientos del CRM.</li>
              <li><strong>Fase 1 – Rediseño Landing + CRM Setup (2–3 semanas):</strong> Rediseño de la landing orientado a conversión, setup de infraestructura del CRM y modelo de datos para leads y UTMs.</li>
              <li><strong>Fase 2 – CRM Dev + Integraciones (2–3 semanas):</strong> Desarrollo del panel admin, pipeline de leads, tracking de UTMs, dashboard de métricas, integración con GA4/GTM.</li>
              <li><strong>Fase 3 – UTM, Analytics + QA (1 semana):</strong> Testing end-to-end del flujo landing → form → CRM, validación de UTM tracking, QA general.</li>
              <li><strong>Fase 4 – Launch + Iteración (1 semana):</strong> Deploy, monitoreo inicial, ajustes post-launch, setup de A/B testing.</li>
            </ul>
          </div>
        </div>
      </section>

      <BudgetRemainderSection
        title="Ronzio – Budget & Remainder"
        total={27500}
        items={[
          {
            name: 'Landing Page – Auditoría y Rediseño',
            amount: 5000,
            status: 'pending',
          },
          {
            name: 'CRM – Admin Panel',
            amount: 12000,
            status: 'pending',
          },
          {
            name: 'Integraciones (UTM, GA4, GTM, Emails)',
            amount: 4500,
            status: 'pending',
          },
          {
            name: 'Dashboard + Analytics',
            amount: 3500,
            status: 'pending',
          },
          {
            name: 'QA, Deploy + Iteración',
            amount: 2500,
            status: 'pending',
          },
        ]}
      />

      <ContentBox title="Notas">
        <p>
          El presupuesto estimado es de <strong>$25,000 – $30,000</strong> (estimado final: $27,500).
          El timeline estimado es de <strong>45 a 60 días</strong>. El CRM se desarrolla a medida para Ronzio,
          priorizando velocidad de implementación y escalabilidad con asistencia de AI.
          Ajustes de scope pueden impactar el presupuesto final dentro del rango estimado.
        </p>
      </ContentBox>
    </>
  )
}
