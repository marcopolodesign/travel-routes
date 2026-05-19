import ContentBox from '../components/ContentBox'
import BoxedListSection from '../components/BoxedListSection'
import TwoColumnSection from '../components/TwoColumnSection'
import BudgetRemainderSection from '../components/BudgetRemainderSection'
import MermaidDiagram from '../components/MermaidDiagram'

const ROADMAP_TIMELINE = `
timeline
  title Gin Lane – Timeline (1 semana)
  section Día 1
    Kick-off + Brief visual : día 1
  section Días 2-3
    Wireframes + Diseño visual : días 2-3
  section Días 4-5
    Desarrollo + Responsive : días 4-5
  section Días 6-7
    QA + Deploy : días 6-7
`.trim()

export default function GinLane() {
  return (
    <>
      <ContentBox title="Visión general">
        <p>
          Diseño y desarrollo de una landing one-pager para Gin Lane — un sitio de una sola página con navegación
          por anclas, estética editorial y minimalista, con foco en imagen y tipografía.
          El objetivo es tener presencia digital de alto nivel en 1 semana.
        </p>
      </ContentBox>

      <ContentBox title="¿Por qué una one-pager?">
        <p className="mb-3">
          El cliente tomó ceibogallery.com como referencia de estilo y tono.
          Ceibo Gallery es un sitio multi-página porque tiene volumen de contenido continuo:
          catálogo de artistas, archivo de exhibiciones, programas.
          Gin Lane, en esta etapa, no necesita eso.
        </p>
        <p className="mb-3">
          Una one-pager con scroll y navegación por anclas entrega <strong>la misma experiencia de marca</strong> —
          el scroll es la narrativa — con tres ventajas concretas:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><strong>Velocidad de salida:</strong> 1 semana vs. 4–6 semanas de un sitio multi-página.</li>
          <li><strong>Costo:</strong> una fracción del budget, sin perder calidad de diseño.</li>
          <li><strong>Escalabilidad:</strong> cada sección de la one-pager se convierte en una página independiente cuando el proyecto crezca.</li>
        </ul>
      </ContentBox>

      <TwoColumnSection title="Alcance — Diseño y Desarrollo" withBar={false}>
        <ul className="list-disc pl-5 space-y-2">
          <li>Wireframes de la estructura de secciones (desktop + mobile)</li>
          <li>Diseño visual de alta fidelidad — 2 breakpoints</li>
          <li>Sistema tipográfico y paleta de color</li>
          <li>Tratamiento de imágenes y composición editorial</li>
          <li>One-pager en React + Vite, deploy en Vercel</li>
          <li>Navegación por anclas con scroll suave</li>
          <li>Animaciones de entrada y transiciones de scroll</li>
          <li>Responsive completo (mobile-first)</li>
          <li>Formulario de contacto o CTA con integración de mail</li>
          <li>SEO básico: meta tags, OG, favicon</li>
          <li>Dominio custom + SSL</li>
        </ul>
      </TwoColumnSection>

      <BoxedListSection
        title="Secciones de la one-pager"
        items={[
          'Hero — full screen, statement de marca',
          'About — historia y concepto',
          'Work / Portfolio — galería o showcase',
          'Contact — CTA + links sociales',
        ]}
      />

      <ContentBox title="Refinamiento y evolución">
        <p>
          Esta primera versión es intencional y acotada. Una vez lanzada, la one-pager
          puede refinarse visualmente, incorporar nuevas secciones (servicios, prensa, equipo, etc.)
          o evolucionar a un sitio multi-página según las necesidades del cliente. La base de código
          y el sistema de diseño están pensados para escalar sin rehacer desde cero.
        </p>
      </ContentBox>

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
              className="min-h-[280px] rounded-xl border-2 border-[var(--marco-border)] bg-white p-6 md:p-8 shadow-sm [&_svg]:max-w-none [&_svg]:min-w-[760px] [&_svg]:h-auto"
            />
            <ul className="space-y-3 text-black font-interphases">
              <li><strong>Día 1 – Kick-off:</strong> Revisión del brief visual, referencias, estructura de secciones y alineación de objetivos.</li>
              <li><strong>Días 2–3 – Diseño:</strong> Wireframes y diseño visual de alta fidelidad en Figma.</li>
              <li><strong>Días 4–5 – Desarrollo:</strong> Implementación del diseño, animaciones, responsive y formulario de contacto.</li>
              <li><strong>Días 6–7 – QA + Deploy:</strong> Testing cross-browser, SEO básico, deploy en Vercel con dominio custom.</li>
            </ul>
          </div>
        </div>
      </section>

      <BudgetRemainderSection
        title="Gin Lane – Budget"
        total={2650}
        items={[
          {
            name: 'Landing Page',
            amount: 2650,
            status: 'pending',
          },
          {
            name: 'Urgency Fee',
            amount: 500,
            status: 'pending',
          },
          {
            name: 'Descuento',
            amount: '-$500',
            status: 'approved',
          },
        ]}
      />

      <ContentBox title="Notas">
        <p>
          El presupuesto total a abonar es de <strong>$2,650</strong> — incluye diseño y desarrollo completo
          más <strong>$500 de urgency fee</strong> por entrega en 1 semana, con un descuento de $500 aplicado.
          El timeline puede ajustarse según velocidad de feedback del cliente en cada fase.
        </p>
      </ContentBox>

      {/* Referencias */}
      <section className="mb-14 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          <div className="md:col-span-4">
            <h2 className="font-thunder text-2xl md:text-3xl lg:text-4xl uppercase text-[var(--marco-accent)]">
              Referencias
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-black/50 font-thunder mb-3">Referencia del cliente</p>
              <a
                href="https://www.ceibogallery.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-thunder text-lg uppercase text-black hover:text-[var(--marco-accent)] transition-colors"
              >
                ceibogallery.com ↗
              </a>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-black/50 font-thunder mb-3">Nuestro trabajo</p>
              <div className="space-y-2">
                <div>
                  <a
                    href="https://www.mcmcgaleria.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-thunder text-lg uppercase text-black hover:text-[var(--marco-accent)] transition-colors"
                  >
                    mcmcgaleria.com ↗
                  </a>
                </div>
                <div>
                  <a
                    href="https://art.mirandabosch.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-thunder text-lg uppercase text-black hover:text-[var(--marco-accent)] transition-colors"
                  >
                    art.mirandabosch.com ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
